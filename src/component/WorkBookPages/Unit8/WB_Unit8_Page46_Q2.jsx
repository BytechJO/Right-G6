/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit8AudioText, {
  workbookUnit8Audio,
  stopWorkbookUnit8Audio,
} from "./WorkbookUnit8AudioText";

const audioFolder = "Page 46 - Exercise D";

const ITEMS = [
  {
    id: 1,
    scrambled: "Mary that she today said come would .",
    answer: "Mary said that she would come today.",
  },
  {
    id: 2,
    scrambled: "to sooner told he time jump next me .",
    answer: "He told me to jump sooner next time.",
  },
  {
    id: 3,
    scrambled: "player is exclaimed this great the exercise a .",
    answer: "The player exclaimed this is a great exercise.",
  },
  {
    id: 4,
    scrambled: "here the wait told bus to for me the man .",
    answer: "The man told me to wait for the bus here.",
  },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => {
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

const AnswerInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <div style={{ position: "relative" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write the sentence"
      title="Write the unscrambled sentence"
      aria-label="Write the unscrambled sentence"
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "19px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
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
        }}
      >
        ✕
      </span>
    )}
  </div>
);

// ── Main Component ──

const WB_Unit_Unscramble_D = () => {
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
    const hasEmpty = ITEMS.some(({ id }) => !answers[id].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    ITEMS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = ITEMS.length;
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
    ITEMS.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit8Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-5">
        <ExerciseHeader
          sectionLetter="D"
          title="Unscramble and write each sentence."
          subTitle="Say the correct sentence first, then reorder the words and check capitalization and punctuation."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "45px",
            marginBottom: "3em",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Scrambled */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "19px",
                    minWidth: "20px",
                  }}
                >
                  {item.id}
                </span>
                <WorkbookUnit8AudioText
                  src={workbookUnit8Audio(audioFolder, `Item_00${item.id}_`)}
                  ariaLabel={`Play scrambled sentence ${item.id}`}
                  style={{ fontSize: "19px", color: "#333" }}
                >
                  {item.scrambled}
                </WorkbookUnit8AudioText>
              </div>

              {/* Answer */}
              <div style={{ paddingLeft: "30px" }}>
                <AnswerInput
                  value={answers[item.id]}
                  onChange={(val) => handleChange(item.id, val)}
                  disabled={locked || result[item.id] === true}
                  isWrong={result[item.id] === false}
                  isCorrect={result[item.id] === true}
                />
              </div>
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

export default WB_Unit_Unscramble_D;
