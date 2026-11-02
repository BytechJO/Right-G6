/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit7AudioText, {
  stopWorkbookUnit7Audio,
  workbookUnit7Audio,
} from "./WorkbookUnit7AudioText";

const ITEMS = [
  {
    id: 1,
    incomplete: "It's been long ...",
    answer: "It's been too long.",
    prefilled: false,
  },
  {
    id: 2,
    incomplete: "Now your chance.",
    answer: "Now is your chance.",
    prefilled: false,
  },
  {
    id: 3,
    incomplete: "up",
    answer: "catch up",
    prefilled: false,
  },
  {
    id: 4,
    incomplete: "a natural!",
    answer: "You're a natural!",
    prefilled: false,
  },
  {
    id: 5,
    incomplete: "Here go.",
    answer: "Here I go.",
    prefilled: false,
  },
];

const inputItems = ITEMS.filter((i) => !i.prefilled);

const initAnswers = () => {
  const a = {};
  inputItems.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'']/g, "")
    .replace(/\s+/g, " ")
    .trim();

// ── Sub-components OUTSIDE parent ──

const AnswerInput = ({
  value,
  onChange,
  disabled,
  isWrong,
  isCorrect,
  itemId,
}) => (
  <div style={{ position: "relative", flex: 1 }}>
    <input
      className="wb-unit7-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rewrite the expression"
      title="Rewrite the complete expression with the missing word"
      aria-label={`Correct expression ${itemId}`}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        paddingBottom: "2px",
        fontFamily: "inherit",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: "-8px",
          transform: "translateY(-50%)",
          width: "20px",
          height: "20px",
          background: "red",
          color: "white",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        ✕
      </span>
    )}
  </div>
);

// ── Main Component ──

const WB_Unit_MissingWord_J = () => {
  const audioFolder = "Page 44 - Exercise J";
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = inputItems.some(({ id }) => !answers[id].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    inputItems.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = inputItems.length;
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
    inputItems.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit7Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="J"
          title="One word is missing from each expression. Rewrite each expression correctly."
          subTitle="Read the expression as a whole, replace only the incorrect part, then reread the corrected expression."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            margin: "2em 0",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr 40px 1fr",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Number */}
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {item.id}
              </span>

              {/* Incomplete expression */}
              <WorkbookUnit7AudioText
                src={workbookUnit7Audio(
                  audioFolder,
                  `Item_${String(item.id).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play expression ${item.id}`}
                style={{ fontSize: "18px", color: "#333" }}
              >
                {item.incomplete}
              </WorkbookUnit7AudioText>

              {/* Arrow */}
              <span
                style={{ fontSize: "20px", color: "#555", textAlign: "center" }}
              >
                →
              </span>

              {/* Answer */}
              {item.prefilled ? (
                <span
                  style={{
                    fontSize: "18px",
                    color: "#333",
                    borderBottom: "1px solid #555",
                    paddingBottom: "2px",
                    textDecoration: "underline",
                  }}
                >
                  {item.answer}
                </span>
              ) : (
                <AnswerInput
                  value={answers[item.id]}
                  onChange={(val) => handleChange(item.id, val)}
                  disabled={locked || result[item.id] === true}
                  isWrong={result[item.id] === false}
                  isCorrect={result[item.id] === true}
                  itemId={item.id}
                />
              )}
            </div>
          ))}
        </div>
      </div>

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

export default WB_Unit_MissingWord_J;
