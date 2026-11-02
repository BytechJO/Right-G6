/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

const QUESTIONS = [
  { id: 1, answer: "Have the workers been moving the furniture?" },
  { id: 2, answer: "Has Melissa been organizing the closet?" },
  { id: 3, answer: "Has Greg been practicing basketball?" },
  { id: 4, answer: "Have the doctors been studying medicine?" },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'']/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "" });

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({
  qId,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
}) => (
  <div style={{ position: "relative" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      placeholder="Rewrite as a question"
      title={`Question ${qId}: rewrite Exercise E as a question`}
      aria-label={`Question ${qId}: present perfect progressive question`}
      className="workbook-unit9-input"
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "500" : "400",
        paddingBottom: "3px",
        fontFamily: "inherit",
        textDecoration: isCorrect ? "underline" : "none",
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
  </div>
);

// ── MAIN COMPONENT ──
const WB_Unit9_RewriteQuestion_F = () => {
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
    if (Object.values(answers).some((v) => !v.trim())) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.length;
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
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="F"
          title="Rewrite each sentence from Exercise E as a question."
          subTitle="Use has/have been + verb-ing and make the duration or continuing action clear in the sentence."
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "60px",
            margin: "5% 0",
          }}
        >
          {QUESTIONS.map(({ id }) => {
            const isCorrect = result[id] === true;
            const isWrong = result[id] === false;
            return (
              <div
                key={id}
                style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    minWidth: "22px",
                  }}
                >
                  {id}
                </span>
                <div style={{ flex: 1 }}>
                  <AnswerInput
                    qId={id}
                    value={answers[id]}
                    onChange={handleChange}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    disabled={locked || isCorrect}
                  />
                </div>
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

export default WB_Unit9_RewriteQuestion_F;
