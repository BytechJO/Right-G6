/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit8AudioText, {
  workbookUnit8Audio,
  stopWorkbookUnit8Audio,
} from "./WorkbookUnit8AudioText";

const audioFolder = "Page 49 - Exercise H";

const BORDER = "#84ad40";

// الكلمات — correct: true = يمكن استخدامها بدلاً من said
const WORDS = [
  { id: 1, word: "told", correct: true, audio: "Item_001_" },
  { id: 2, word: "spoke (speak)", correct: true, audio: "Item_002_" },
  { id: 3, word: "spotted", correct: false, audio: "Item_003_" },
  { id: 4, word: "saw", correct: false, audio: "Item_005_" },
  { id: 5, word: "asked", correct: false, audio: "Item_004_" },
  { id: 6, word: "came", correct: false, audio: "Item_010_" },
  { id: 7, word: "typed", correct: false, audio: "Item_006_" },
  { id: 8, word: "questioned", correct: true, audio: "Item_007_" },
  { id: 9, word: "stated", correct: true, audio: "Item_008_" },
  { id: 10, word: "replied", correct: true, audio: "Item_009_" },
  { id: 11, word: "did", correct: false, audio: "Item_011_" },
  { id: 12, word: "exclaimed", correct: true, audio: "Item_012_" },
  { id: 13, word: "skipped", correct: false, audio: "Item_013_" },
  { id: 14, word: "shouted", correct: true, audio: "Item_014_" },
  { id: 15, word: "made", correct: false, audio: "Item_015_" },
  { id: 16, word: "rode", correct: false, audio: "Item_017_" },
  { id: 17, word: "talked", correct: true, audio: "Item_016_" },
  { id: 18, word: "thought", correct: false, audio: "Item_018_" },
  { id: 19, word: "dreamed", correct: false, audio: "Item_019_" },
  { id: 20, word: "knew", correct: false, audio: "Item_020_" },
];

// ترتيب الجدول: 5 أعمدة × 4 صفوف
const ROWS = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

const initSelected = () => {
  const s = {};
  WORDS.forEach(({ id }) => {
    s[id] = false;
  });
  return s;
};

// ── WordCircle — OUTSIDE parent ──
const WordCircle = ({
  word,
  audio,
  selected,
  isWrong,
  isDisabled,
  onToggle,
}) => (
  <span
    onClick={(event) => {
      if (!isDisabled && event.detail !== 0) onToggle();
    }}
    onKeyDownCapture={(event) => {
      if (
        !isDisabled &&
        !event.repeat &&
        (event.key === "Enter" || event.key === " ")
      )
        onToggle();
    }}
    style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "5px 14px",
      borderRadius: "50px",
      border: selected
        ? `2px solid ${isWrong ? "#D1232A" : BORDER}`
        : "2px solid transparent",
      fontSize: "17px",
      color: "#333",
      cursor: isDisabled ? "default" : "pointer",
      userSelect: "none",
      transition: "border 0.15s",
      whiteSpace: "nowrap",
    }}
  >
    <WorkbookUnit8AudioText
      src={workbookUnit8Audio(audioFolder, audio)}
      ariaLabel={`Play and select ${word}`}
      focusable={!isDisabled}
    >
      {word}
    </WorkbookUnit8AudioText>
    {/* Wrong badge */}
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-7px",
          right: "-7px",
          width: "20px",
          height: "20px",
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          pointerEvents: "none",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit8_CircleWords_H = () => {
  const [selected, setSelected] = useState(initSelected);
  const [result, setResult] = useState({}); // { id: true|false }
  const [locked, setLocked] = useState(false);

  const handleToggle = (id) => {
    if (locked || result[id] === true) return;
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;

    // تحقق: كل الكلمات الصحيحة مُحددة، وأي كلمة غلط محددة = خطأ
    const nr = {};
    let correct = 0;
    let total = WORDS.filter((w) => w.correct).length;

    WORDS.forEach(({ id, correct: isRight }) => {
      const sel = selected[id];
      if (isRight && sel) {
        nr[id] = true;
        correct++;
      } else if (isRight && !sel) {
        nr[id] = false;
      } // صحيحة لم تُحدد
      else if (!isRight && sel) {
        nr[id] = false;
      } // خاطئة وُحددت
      else {
        nr[id] = undefined;
      } // خاطئة ولم تُحدد (صواب)
    });

    setResult(nr);
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    const hasWrongSelection = WORDS.some(
      ({ id, correct: isRight }) => !isRight && selected[id],
    );
    if (correct === total && !hasWrongSelection) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const s = {};
    const r = {};
    WORDS.forEach(({ id, correct: isRight }) => {
      s[id] = isRight;
      r[id] = isRight ? true : undefined;
    });
    setSelected(s);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit8Audio();
    setSelected(initSelected());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="H"
          title={
            <>
              Circle each word that could be used instead of{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>said</span>{" "}
              in a dialog.
            </>
          }
          subTitle="Scan one row or line at a time and select only the complete target word or expression."
        />

        {/* Word Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "18px 8px",
            margin: "10% 0 ",
          }}
        >
          {ROWS.flat().map((id) => {
            const word = WORDS.find((w) => w.id === id);
            const sel = selected[id];
            const isWrong = result[id] === false && sel;
            const isDisabled = locked || result[id] === true;

            return (
              <div
                key={id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <WordCircle
                  word={word.word}
                  audio={word.audio}
                  selected={sel}
                  isWrong={isWrong}
                  isDisabled={isDisabled}
                  onToggle={() => handleToggle(id)}
                />
              </div>
            );
          })}
        </div>
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

export default WB_Unit8_CircleWords_H;
