import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const QUESTIONS = [
  { id: 1, text: "Tom hates riding his bike to the park.",              answer: "false" },
  { id: 2, text: "Stella loves playing board games with Helen.",        answer: "true"  },
  { id: 3, text: "Stella enjoys drinking cold shakes.",                 answer: "false" },
  { id: 4, text: "Harley hates watching movies at home.",               answer: "false" },
  { id: 5, text: "Hansel hates waiting in long lines for his turn on the rides.", answer: "true" },
];

const normalize = (str) => str.toLowerCase().trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── TFInput — OUTSIDE parent ──
const TFInput = ({ qId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "inline-block", minWidth: "120px" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "120px",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "16px", height: "16px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit10_TrueFalse_F = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev)  => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    if (Object.values(answers).some((v) => !v.trim())) {
      ValidationAlert.info("Please complete all answers."); return;
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
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, answer }) => {
      a[id] = answer.charAt(0).toUpperCase() + answer.slice(1);
      r[id] = true;
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>F</span>
          Look at Exercise E. Write{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>true</span> or{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>false</span>.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "67px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, text }) => {
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <div key={id} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                fontSize: "18px",
              }}>
                {/* Question */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                  <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                  <span style={{ color: "#333" }}>{text}</span>
                </div>
                {/* Input on the right */}
                <TFInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  disabled={locked || isCorrect}
                />
              </div>
            );
          })}
        </div>

      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit10_TrueFalse_F;