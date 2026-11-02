import React, { useCallback, useRef, useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import WorkbookUnit10AudioText, {
  workbookUnit10Audio,
  workbookUnit10AudioSequence,
  stopWorkbookUnit10Audio,
} from "./WorkbookUnit10AudioText";

const BORDER = "#84ad40";
const ROWS = 15;
const COLS = 14;

const WORDS = [
  { id: "1D", word: "sandcastles", row: 0, col: 13, direction: "D", number: 1 },
  { id: "2D", word: "dozens", row: 3, col: 7, direction: "D", number: 2 },
  { id: "3D", word: "surfboard", row: 3, col: 10, direction: "D", number: 3 },
  { id: "4A", word: "occupied", row: 4, col: 6, direction: "A", number: 4 },
  { id: "5A", word: "sunscreen", row: 6, col: 0, direction: "A", number: 5 },
  { id: "5D", word: "seashells", row: 6, col: 0, direction: "D", number: 5 },
  { id: "6D", word: "sunburn", row: 8, col: 3, direction: "D", number: 6 },
  { id: "7A", word: "necessary", row: 10, col: 3, direction: "A", number: 7 },
];

const CLUES = {
  Down: [
    [
      "1D",
      1,
      "small models of castles or buildings made with sand",
      ["Item_002_"],
    ],
    ["2D", 2, "large number of people or things", ["Item_003_"]],
    ["3D", 3, "a long and light board used for surfing", ["Item_004_"]],
    ["5D", 5, "the hard, empty shells of small sea creatures", ["Item_005_"]],
    [
      "6D",
      6,
      "a state in which your body becomes red and sore from too much sunlight",
      ["Item_006_", "Item_007_"],
    ],
  ],
  Across: [
    ["4A", 4, "full; in use", ["Item_009_"]],
    [
      "5A",
      5,
      "something that you put on your skin to protect it from the sun",
      ["Item_010_", "Item_011_"],
    ],
    ["7A", 7, "so important that you must do it or have it", ["Item_012_"]],
  ],
};

const buildGrid = () => {
  const cells = {};
  const wordCells = {};
  WORDS.forEach(({ id, word, row, col, direction, number }) => {
    wordCells[id] = [];
    [...word].forEach((letter, index) => {
      const r = direction === "D" ? row + index : row;
      const c = direction === "A" ? col + index : col;
      const key = `${r},${c}`;
      wordCells[id].push(key);
      if (!cells[key]) cells[key] = { letter, wordIds: [], number: null };
      cells[key].wordIds.push(id);
      if (index === 0 && !cells[key].number) cells[key].number = number;
    });
  });
  return { cells, wordCells };
};

const { cells: CELL_MAP, wordCells: WORD_CELLS } = buildGrid();
const CELL_KEYS = Object.keys(CELL_MAP).sort((a, b) => {
  const [ar, ac] = a.split(",").map(Number);
  const [br, bc] = b.split(",").map(Number);
  return ar - br || ac - bc;
});
const initialAnswers = () =>
  Object.fromEntries(CELL_KEYS.map((key) => [key, ""]));

const CrosswordInput = ({
  cellKey,
  cell,
  value,
  result,
  locked,
  active,
  tabIndex,
  inputRef,
  onFocus,
  onClick,
  onChange,
  onKeyDown,
}) => {
  const correct = result === true;
  const wrong = result === false;
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: "var(--wb-u10-cell)",
        height: "var(--wb-u10-cell)",
        boxSizing: "border-box",
        border: `1px solid ${BORDER}`,
        background: correct ? "#dff1c8" : active ? "#f1f8e8" : "#fff",
      }}
    >
      {cell.number && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 1,
            left: 2,
            zIndex: 2,
            fontSize: "clamp(6px,.65vw,9px)",
            fontWeight: 700,
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          {cell.number}
        </span>
      )}
      <input
        ref={inputRef}
        className="wb-unit10-crossword-input"
        value={value.toUpperCase()}
        maxLength={1}
        readOnly={locked || correct}
        tabIndex={tabIndex}
        aria-label={`Crossword row ${Number(cellKey.split(",")[0]) + 1}, column ${Number(cellKey.split(",")[1]) + 1}`}
        aria-invalid={wrong || undefined}
        aria-readonly={locked || correct}
        title={correct ? "Correct letter" : "Type one letter"}
        onFocus={onFocus}
        onChange={(event) => onChange(cellKey, event.target.value)}
        onKeyDown={(event) => onKeyDown(cellKey, event)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          outline: 0,
          background: "transparent",
          padding: 0,
          textAlign: "center",
          textTransform: "uppercase",
          fontFamily: "inherit",
          fontSize: "clamp(11px,1.2vw,16px)",
          fontWeight: 700,
          color: wrong ? "#D1232A" : "#263238",
          caretColor: locked || correct ? "transparent" : "auto",
        }}
      />
      {wrong && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "0%",
            right: "0px",
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "11px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
};

const WB_Unit10_Crossword_A = () => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [results, setResults] = useState({});
  const [locked, setLocked] = useState(false);
  const [correctWords, setCorrectWords] = useState([]);
  const [activeWord, setActiveWord] = useState(WORDS[0].id);
  const [focusKey, setFocusKey] = useState(CELL_KEYS[0]);
  const refs = useRef({});

  const focusCell = useCallback((key) => {
    if (!refs.current[key]) return;
    setFocusKey(key);
    refs.current[key].focus();
    refs.current[key].select();
  }, []);

  const switchWordAtIntersection = (key) => {
    const ids = CELL_MAP[key].wordIds;
    if (ids.length === 1) setActiveWord(ids[0]);
    else {
      setActiveWord((current) => {
        const index = ids.indexOf(current);
        return ids[(index + 1 + ids.length) % ids.length];
      });
    }
  };

  const nextEditable = (wordId, key, step) => {
    const path = WORD_CELLS[wordId] || [];
    let index = path.indexOf(key) + step;
    while (index >= 0 && index < path.length) {
      if (results[path[index]] !== true) return path[index];
      index += step;
    }
    return null;
  };

  const handleChange = (key, rawValue) => {
    if (locked || results[key] === true) return;
    const value = rawValue
      .slice(-1)
      .toLowerCase()
      .replace(/[^a-z]/g, "");
    setAnswers((current) => ({ ...current, [key]: value }));
    setResults((current) => ({ ...current, [key]: undefined }));
    if (!value) return;
    const wordId = CELL_MAP[key].wordIds.includes(activeWord)
      ? activeWord
      : CELL_MAP[key].wordIds[0];
    const next = nextEditable(wordId, key, 1);
    if (next) setTimeout(() => focusCell(next), 0);
  };

  const handleKeyDown = (key, event) => {
    const directions = {
      ArrowUp: [-1, 0, "D"],
      ArrowDown: [1, 0, "D"],
      ArrowLeft: [0, -1, "A"],
      ArrowRight: [0, 1, "A"],
    };
    if (directions[event.key]) {
      event.preventDefault();
      const [row, col] = key.split(",").map(Number);
      const [dr, dc, direction] = directions[event.key];
      let nextRow = row + dr;
      let nextCol = col + dc;
      let next = null;

      while (nextRow >= 0 && nextRow < ROWS && nextCol >= 0 && nextCol < COLS) {
        const candidate = `${nextRow},${nextCol}`;
        if (CELL_MAP[candidate]) {
          next = candidate;
          break;
        }
        nextRow += dr;
        nextCol += dc;
      }

      if (!next) return;
      const wordId =
        CELL_MAP[next].wordIds.find((id) => id.endsWith(direction)) ||
        CELL_MAP[next].wordIds[0];
      setActiveWord(wordId);
      focusCell(next);
      return;
    }

    if (event.key === "Backspace" && !answers[key]) {
      const wordId = CELL_MAP[key].wordIds.includes(activeWord)
        ? activeWord
        : CELL_MAP[key].wordIds[0];
      const previous = nextEditable(wordId, key, -1);
      if (previous) {
        event.preventDefault();
        focusCell(previous);
      }
    }
  };

  const checkAnswers = () => {
    if (locked) return;
    if (CELL_KEYS.some((key) => !answers[key])) {
      ValidationAlert.info("Please complete the puzzle first.");
      return;
    }
    const nextCorrectWords = WORDS.filter(({ id }) =>
      WORD_CELLS[id].every((key) => answers[key] === CELL_MAP[key].letter),
    ).map(({ id }) => id);
    const nextResults = {};
    CELL_KEYS.forEach((key) => {
      nextResults[key] = answers[key] === CELL_MAP[key].letter;
    });
    setResults(nextResults);
    setCorrectWords(nextCorrectWords);
    const correct = nextCorrectWords.length;
    const total = WORDS.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const message = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(message);
    } else if (correct === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };

  const showAnswers = () => {
    setAnswers(
      Object.fromEntries(CELL_KEYS.map((key) => [key, CELL_MAP[key].letter])),
    );
    setResults(Object.fromEntries(CELL_KEYS.map((key) => [key, true])));
    setCorrectWords(WORDS.map(({ id }) => id));
    setLocked(true);
  };

  const reset = () => {
    stopWorkbookUnit10Audio();
    setAnswers(initialAnswers());
    setResults({});
    setLocked(false);
    setCorrectWords([]);
    setActiveWord(WORDS[0].id);
    setFocusKey(CELL_KEYS[0]);
  };

  const activeCells = new Set(WORD_CELLS[activeWord] || []);

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <style>{`
          .wb-unit10-crossword-input:focus-visible {
            outline: 3px solid #2563eb !important;
            outline-offset: -2px;
            border-radius: 2px;
          }
        `}</style>
        <ExerciseHeader
          sectionLetter="A"
          title="Complete the puzzle. Use the vocabulary words."
          subTitle="Solve the clearest clues first, then use crossing letters to confirm the remaining vocabulary."
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            marginTop: "18px",
            marginBottom: "2em",
            "--wb-u10-cell": "clamp(23px,2.45vw,31px)",
          }}
        >
          <div
            role="group"
            aria-label="Vocabulary crossword. Tab enters the puzzle and arrow keys move between cells."
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, var(--wb-u10-cell))`,
              gridTemplateRows: `repeat(${ROWS}, var(--wb-u10-cell))`,
              padding: "12px",
              flex: "0 0 auto",
            }}
          >
            {Array.from({ length: ROWS }, (_, row) =>
              Array.from({ length: COLS }, (_, col) => {
                const key = `${row},${col}`;
                const cell = CELL_MAP[key];
                if (!cell) return <div key={key} aria-hidden="true" />;
                return (
                  <CrosswordInput
                    key={key}
                    cellKey={key}
                    cell={cell}
                    value={answers[key]}
                    result={results[key]}
                    locked={locked}
                    active={activeCells.has(key)}
                    tabIndex={focusKey === key ? 0 : -1}
                    inputRef={(element) => {
                      refs.current[key] = element;
                    }}
                    onFocus={() => {
                      setFocusKey(key);
                      if (!cell.wordIds.includes(activeWord))
                        setActiveWord(cell.wordIds[0]);
                    }}
                    onClick={() => {
                      switchWordAtIntersection(key);
                      focusCell(key);
                    }}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                );
              }),
            )}
          </div>

          <div
            style={{
              flex: "1 1 265px",
              maxWidth: "330px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {Object.entries(CLUES).map(([heading, clues]) => (
              <section
                key={heading}
                aria-label={`${heading} clues`}
                style={{
                  border: `1.5px solid ${BORDER}`,
                  borderRadius: "10px",
                  padding: "12px 16px",
                  background: "#fff",
                }}
              >
                <h6
                  style={{
                    margin: "0 0 8px",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  <WorkbookUnit10AudioText
                    src={workbookUnit10Audio(
                      "Page 57 - Exercise A",
                      heading === "Down" ? "Item_001_" : "Item_008_",
                    )}
                    ariaLabel={`Play ${heading}`}
                  >
                    {heading}
                  </WorkbookUnit10AudioText>
                </h6>
                {clues.map(([wordId, number, text, audioPrefixes]) => {
                  const isCorrect = correctWords.includes(wordId);
                  return (
                    <div
                      key={wordId}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "9px",
                        marginBottom: "7px",
                        fontSize: "14px",
                        lineHeight: 1.35,
                        textAlign: "left",
                        color: isCorrect ? "#6b7280" : "inherit",
                        textDecoration: isCorrect ? "line-through" : "none",
                        textDecorationThickness: isCorrect ? "2px" : undefined,
                      }}
                    >
                      <strong style={{ minWidth: "16px" }}>{number}</strong>
                      <WorkbookUnit10AudioText
                        src={workbookUnit10AudioSequence(
                          "Page 57 - Exercise A",
                          audioPrefixes,
                        )}
                        ariaLabel={`Play ${heading.toLowerCase()} clue ${number}`}
                        flowText
                      >
                        {text}
                      </WorkbookUnit10AudioText>
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
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

export default WB_Unit10_Crossword_A;
