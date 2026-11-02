import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

import spainImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U2 Folder/SVG/13-cropped.svg";
/*
  CROSSWORD LAYOUT  (row, col) — zero-based
  ─────────────────────────────────────────
  ACROSS:
    terrified   row=2,  col=4   sum=94
    nervous     row=4,  col=0   sum=114
    slope       row=6,  col=2   sum=67
    adventure   row=10, col=2   sum=110
    experience  row=13, col=0   sum=104

  DOWN:
    faint       row=0,  col=12  sum=50
    thrilling   row=3,  col=8   sum=109[]
    courage     row=8,  col=12  sum=70

  Verified letter-value sums (a=1..z=26):
    terrified   20+5+18+18+9+6+9+5+4        = 94  ✓
    nervous     14+5+18+22+15+21+19          = 114 ✓
    slope       19+12+15+16+5               = 67  ✓
    adventure   1+4+22+5+14+20+21+18+5      = 110 ✓
    experience  5+24+16+5+18+9+5+14+3+5     = 104 ✓
    faint       6+1+9+14+20                 = 50  ✓
    thrilling   20+8+18+9+12+12+9+14+7      = 109 ✓
    courage     3+15+21+18+1+7+5            = 70  ✓

  Shared cells (intersections):
    terrified[4]='i' (2,8)  ↔  thrilling[0] … thrilling starts (3,8) → NO shared cell with terrified
    adventure[6]='u' (10,8) ↔  thrilling[7]  … thrilling[7]='n' ≠ 'u'
    → thrilling is standalone vertical column 8, rows 3-11
    faint is standalone vertical column 12, rows 0-4
    courage is standalone vertical column 12, rows 8-14
    NOTE: faint & courage both use col=12 but don't overlap (rows 0-4 and 8-14)
*/

const BORDER = "#84ad40";
const CELL = 38;

const WORDS = [
  { id: "terrified", word: "terrified", dir: "across", row: 3, col: 10 },
  { id: "thrilling", word: "thrilling", dir: "down", row: 3, col: 10 },
  { id: "faint", word: "faint", dir: "down", row: 1, col: 16 },
  { id: "nervous", word: "nervous", dir: "across", row: 4, col: 2 },
  { id: "comfortable", word: "comfortable", dir: "down", row: 3, col: 6 },

  { id: "slope", word: "slope", dir: "across", row: 7, col: 4 },
  { id: "adventure", word: "adventure", dir: "across", row: 10, col: 6 },
  { id: "experience", word: "experience", dir: "across", row: 13, col: 0 },
  { id: "courage", word: "courage", dir: "down", row: 8, col: 12 },
];

const SUMS = {
  terrified: 94,
  nervous: 114,
  slope: 67,
  adventure: 110,
  experience: 104,
  faint: 50,
  thrilling: 109,
  comfortable: 110,
  courage: 70,
};

// Build cell → [{wordId, letterIndex}] map
const buildCellMap = () => {
  const map = {};
  WORDS.forEach(({ id, word, dir, row, col }) => {
    [...word].forEach((_, i) => {
      const r = dir === "across" ? row : row + i;
      const c = dir === "across" ? col + i : col;
      const k = `${r},${c}`;
      if (!map[k]) map[k] = [];
      map[k].push({ wordId: id, idx: i });
    });
  });
  return map;
};
const CELL_MAP = buildCellMap();
const FIRST_ACTIVE_CELL = Object.keys(CELL_MAP)[0];

// Sum-box positions (just after last letter)
const SUM_BOXES = WORDS.map(({ id, word, dir, row, col }) => ({
  id,
  sum: SUMS[id],
  r: dir === "across" ? row : row + word.length,
  c: dir === "across" ? col + word.length : col,
}));

const WB_Unit2_Page9_A_Crossword = () => {
  const allCells = Object.keys(CELL_MAP).map((k) => {
    const [r, c] = k.split(",").map(Number);
    return { r, c };
  });
  const maxR = Math.max(
    ...allCells.map((x) => x.r),
    ...SUM_BOXES.map((s) => s.r),
  );
  const maxC = Math.max(
    ...allCells.map((x) => x.c),
    ...SUM_BOXES.map((s) => s.c),
  );

  // ── state ──
  const init = () => {
    const a = {};
    WORDS.forEach(({ id, word }) => {
      a[id] = Array(word.length).fill("");
    });
    return a;
  };
  const [answers, setAnswers] = useState(init);
  const [result, setResult] = useState({});
  const [cellResult, setCellResult] = useState({});
  const [locked, setLocked] = useState(false);
  const refs = useRef({});

  const cellKeyFor = (wid, i) => {
    const word = WORDS.find((item) => item.id === wid);
    const row = word.dir === "across" ? word.row : word.row + i;
    const col = word.dir === "across" ? word.col + i : word.col;
    return `${row},${col}`;
  };

  const setLetter = (wid, i, ch) => {
    if (locked || result[wid] === true) return;
    setAnswers((prev) => {
      const arr = [...prev[wid]];
      arr[i] = ch;
      return { ...prev, [wid]: arr };
    });
    setResult((prev) => ({ ...prev, [wid]: undefined }));
  };

  const handleChange = (cellEntries, value) => {
    const currentCellKey = cellKeyFor(
      cellEntries[0].wordId,
      cellEntries[0].idx,
    );
    if (locked || cellResult[currentCellKey] === true) return;
    const ch = value
      .slice(-1)
      .toLowerCase()
      .replace(/[^a-z]/, "");
    // update all words sharing this cell
    cellEntries.forEach(({ wordId, idx }) => setLetter(wordId, idx, ch));
    setCellResult((prev) => ({ ...prev, [currentCellKey]: undefined }));
    // auto-advance in the primary word (first entry)
    if (ch) {
      const { wordId, idx } = cellEntries[0];
      const word = WORDS.find((w) => w.id === wordId);
      const nextRef = refs.current[cellKeyFor(wordId, idx + 1)];
      if (nextRef && idx + 1 < word.word.length) {
        nextRef.focus();
        nextRef.select();
      }
    }
  };

  const handleKeyDown = (cellEntries, row, col, e) => {
    const directions = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    const movement = directions[e.key];
    if (movement) {
      e.preventDefault();
      let nextRow = row + movement[0];
      let nextCol = col + movement[1];
      while (
        nextRow >= 0 &&
        nextRow <= maxR &&
        nextCol >= 0 &&
        nextCol <= maxC
      ) {
        const nextInput = refs.current[`${nextRow},${nextCol}`];
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
          return;
        }
        nextRow += movement[0];
        nextCol += movement[1];
      }
      return;
    }

    if (e.key === "Backspace") {
      const { wordId, idx } = cellEntries[0];
      if (!answers[wordId][idx] && idx > 0) {
        const prevRef = refs.current[cellKeyFor(wordId, idx - 1)];
        if (prevRef) {
          prevRef.focus();
          prevRef.select();
        }
      }
    }
  };

  const checkAnswers = () => {
    if (locked) return;
    const empty = WORDS.some(({ id }) => answers[id].some((c) => !c));
    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const nr = {};
    WORDS.forEach(({ id, word }) => {
      const ok = answers[id].join("") === word;
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const nextCellResult = {};
    Object.entries(CELL_MAP).forEach(([key, entries]) => {
      const { wordId, idx } = entries[0];
      const word = WORDS.find((item) => item.id === wordId);
      nextCellResult[key] = answers[wordId][idx] === word.word[idx];
    });
    setCellResult(nextCellResult);
    const total = WORDS.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {};
    const r = {};
    WORDS.forEach(({ id, word }) => {
      a[id] = [...word];
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setCellResult(
      Object.fromEntries(Object.keys(CELL_MAP).map((key) => [key, true])),
    );
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(init());
    setResult({});
    setCellResult({});
    setLocked(false);
  };

  // ── render grid ──
  const renderGrid = () => {
    const rows = [];
    for (let r = 0; r <= maxR; r++) {
      const cells = [];
      for (let c = 0; c <= maxC; c++) {
        const k = `${r},${c}`;
        const entries = CELL_MAP[k];
        const sumBox = SUM_BOXES.find((s) => s.r === r && s.c === c);

        if (sumBox) {
          cells.push(
            <td key={c} style={{ padding: 1 }}>
              <div
                style={{
                  width: CELL,
                  height: CELL,
                  border: `1.5px solid ${BORDER}`,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#333",
                  background: "#f0f7e0",
                }}
              >
                {sumBox.sum}
              </div>
            </td>,
          );
        } else if (entries) {
          const primary = entries[0];
          const { wordId, idx } = primary;
          const isWrong = cellResult[k] === false;
          const isCorrect = cellResult[k] === true;
          const val = answers[wordId]?.[idx] || "";

          cells.push(
            <td key={c} style={{ padding: 1 }}>
              <div style={{ position: "relative", width: CELL, height: CELL }}>
                <input
                  ref={(el) => (refs.current[k] = el)}
                  type="text"
                  maxLength={2}
                  value={val.toUpperCase()}
                  readOnly={locked || isCorrect}
                  aria-readonly={locked || isCorrect}
                  tabIndex={k === FIRST_ACTIVE_CELL ? 0 : -1}
                  title={`Enter a letter for ${wordId}`}
                  aria-label={`Crossword cell row ${r + 1}, column ${c + 1}`}
                  className="wb-unit2-answer-input"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => handleChange(entries, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(entries, r, c, e)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: `1.5px solid ${isWrong ? "#D1232A" : BORDER}`,
                    background: isCorrect
                      ? "#e8f5d0"
                      : isWrong
                        ? "#ffeaea"
                        : "#fff",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "600",
                    color: isCorrect ? "#2d6a0f" : isWrong ? "#D1232A" : "#333",
                    outline: "none",
                    cursor: locked || isCorrect ? "default" : "text",
                    borderRadius: 2,
                    textTransform: "uppercase",
                  }}
                />
                {isWrong && (
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      width: 16,
                      height: 16,
                      background: "#ef4444",
                      color: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 4px rgba(0,0,0,.2)",
                      zIndex: 10,
                      pointerEvents: "none",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </td>,
          );
        } else {
          cells.push(
            <td key={c} style={{ padding: 1 }}>
              <div style={{ width: CELL, height: CELL }} />
            </td>,
          );
        }
      }
      rows.push(<tr key={r}>{cells}</tr>);
    }
    return rows;
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="A"
          title="Write the vocabulary words in the correct squares. Use the chart to find the value for each letter."
          subTitle="Solve the clearest clues first, then use crossing letters to confirm the remaining vocabulary."
        />

        {/* Grid */}
        <div style={{ overflowX: "auto", marginBottom: "24px" }}>
          <table style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
            <tbody>{renderGrid()}</tbody>
          </table>
        </div>

        {/* Letter chart */}
        <div
          style={{
            border: `1.5px solid ${BORDER}`,
            borderRadius: 8,
            padding: "12px 16px",
            fontSize: 14,
            color: "#444",
            lineHeight: "1.9",
            marginBottom: "2em",
          }}
        >
          <div>
            a=1 &nbsp; b=2 &nbsp; c=3 &nbsp; d=4 &nbsp; e=5 &nbsp; f=6 &nbsp;
            g=7 &nbsp; h=8 &nbsp; i=9 &nbsp; j=10 &nbsp; k=11
          </div>
          <div>
            l=12 &nbsp; m=13 &nbsp; n=14 &nbsp; o=15 &nbsp; p=16 &nbsp; q=17
            &nbsp; r=18 &nbsp; s=19 &nbsp; t=20 &nbsp; u=21 &nbsp; v=22
          </div>
          <div>w=23 &nbsp; x=24 &nbsp; y=25 &nbsp; z=26</div>
        </div>
        {/* Image */}
        <img
          src={spainImg}
          alt="Decorative workbook illustration"
          style={{
            width: "50%",
            height: "30%",
            objectFit: "cover",
            alignSelf: "center",
            marginBottom: "4em",
          }}
        />
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page9_A_Crossword;
