/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4WorkbookAudioText, {
  stopWorkbookUnit4Audio,
  workbookUnit4Audio,
} from "./Unit4WorkbookAudioText";

const QUESTIONS = [
  {
    id: 1,
    prompt: "wallet/lost",
    answer: "My wallet is lost.",
    prefilled: false,
    audio: "Item_001_",
  },
  {
    id: 2,
    prompt: "goat milked/every morning",
    answer: "The goat is milked every morning.",
    prefilled: false,
    audio: "Item_002_",
  },
  {
    id: 3,
    prompt: "dog/walked/daily",
    answer: "The dog is walked daily.",
    prefilled: false,
    audio: "Item_003_",
  },
  {
    id: 4,
    prompt: "friend/tutored/in math",
    answer: "My friend is tutored in math.",
    prefilled: false,
    audio: "Item_004_",
  },
  {
    id: 5,
    prompt: "flag/raised/when it's sunny",
    answer: "The flag is raised when it's sunny.",
    prefilled: false,
    audio: "Item_005_",
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, answer, prefilled }) => {
    a[id] = prefilled ? answer : "";
  });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({
  qId,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
  prefilled,
}) => (
  <span style={{ position: "relative", display: "inline-block", flex: 1 }}>
    <input
      type="text"
      value={value}
      placeholder="Write the sentence"
      title={`Answer for sentence ${qId}`}
      aria-label={`Answer for sentence ${qId}`}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: prefilled
          ? "#333"
          : isCorrect
            ? "#c0392b"
            : isWrong
              ? "#D1232A"
              : "#333",
        paddingBottom: "3px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "18px",
          height: "18px",
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
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit4_WritePassive_G = () => {
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
    const hasEmpty = QUESTIONS.filter((q) => !q.prefilled).some(
      ({ id }) => !answers[id].trim(),
    );
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer, prefilled }) => {
      if (prefilled) {
        nr[id] = true;
        return;
      }
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.filter((q) => !q.prefilled).length;
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
    QUESTIONS.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit4Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall"
        style={{
          gap: "3em",
        }}
      >
        <ExerciseHeader
          sectionLetter="G"
          title={
            <>
              Write each sentence as{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                present simple passive
              </span>
              .
            </>
          }
          subTitle="Use the subject and time clue to choose the correct verb form, then reread the whole sentence."
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "45px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, prompt, prefilled, audio }) => {
            const isCorrect = result[id] === true;
            const isWrong = result[id] === false;
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "12px",
                  fontSize: "19px",
                }}
              >
                {/* Number */}
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>
                  {id}
                </span>

                {/* Prompt */}
                <Unit4WorkbookAudioText
                  src={workbookUnit4Audio("Page 24 - Exercise G", audio)}
                  ariaLabel={`Play prompt ${id}`}
                  style={{ whiteSpace: "nowrap", color: "#333" }}
                >
                  {prompt}
                </Unit4WorkbookAudioText>

                {/* Input */}
                <AnswerInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  disabled={locked || isCorrect || prefilled}
                  prefilled={prefilled}
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

export default WB_Unit4_WritePassive_G;
