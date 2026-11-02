/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useRef, useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import { stopWorkbookUnit7Audio } from "./WorkbookUnit7AudioText";

const BORDER = "#84ad40";
const ROWS = 19;
const COLS = 18;

const WORDS = [
  { id: "1D", word: "silly", row: 0, col: 4, direction: "D", number: 1 },
  { id: "2A", word: "previously", row: 1, col: 0, direction: "A", number: 2 },
  { id: "3D", word: "strokes", row: 1, col: 7, direction: "D", number: 3 },
  { id: "4A", word: "combinations", row: 4, col: 6, direction: "A", number: 4 },
  { id: "5A", word: "aware", row: 6, col: 3, direction: "A", number: 5 },
  { id: "5D", word: "ability", row: 6, col: 3, direction: "D", number: 5 },
  { id: "6A", word: "advice", row: 8, col: 0, direction: "A", number: 6 },
  { id: "7D", word: "background", row: 9, col: 6, direction: "D", number: 7 },
  { id: "8D", word: "flatter", row: 10, col: 8, direction: "D", number: 8 },
  { id: "9A", word: "stencils", row: 11, col: 2, direction: "A", number: 9 },
];

const CLUES = {
  Down: [
    ["1D", 1, "funny or foolish"],
    ["3D", 3, "movements of the brush while painting"],
    ["5D", 5, "being able to do something"],
    ["7D", 7, "the scenery; back part of a picture"],
    ["8D", 8, "to say good things about a person"],
  ],
  Across: [
    ["2A", 2, "before"],
    ["4A", 4, "the result of putting two or more things together"],
    ["5A", 5, "knowing; understanding"],
    ["6A", 6, "something you tell somebody to help them with their problems"],
    ["9A", 9, "a pattern to make several of the same design"],
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
        width: "var(--wb-u7-cell)",
        height: "var(--wb-u7-cell)",
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
        className="wb-unit7-crossword-input"
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

const WB_Unit7_Crossword_C = () => {
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
      const next = `${row + dr},${col + dc}`;
      if (!CELL_MAP[next]) return;
      const wordId = CELL_MAP[next].wordIds.find((id) =>
        id.endsWith(direction),
      );
      if (wordId) setActiveWord(wordId);
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
    stopWorkbookUnit7Audio();
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
          .wb-unit7-crossword-input:focus-visible {
            outline: 3px solid #2563eb !important;
            outline-offset: -2px;
            border-radius: 2px;
          }
        `}</style>
        <ExerciseHeader
          sectionLetter="C"
          title="Complete the puzzle. Use the vocabulary words."
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
            "--wb-u7-cell": "clamp(23px,2.45vw,31px)",
          }}
        >
          <div
            role="group"
            aria-label="Vocabulary crossword. Tab enters the puzzle and arrow keys move between cells."
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, var(--wb-u7-cell))`,
              gridTemplateRows: `repeat(${ROWS}, var(--wb-u7-cell))`,
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
                  {heading}
                </h6>
                {clues.map(([wordId, number, text]) => {
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
                      <span>{text}</span>
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

export default WB_Unit7_Crossword_C;
