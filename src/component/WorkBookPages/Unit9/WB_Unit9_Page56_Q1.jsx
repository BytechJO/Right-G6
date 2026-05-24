import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import soccerImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 12.svg";
import micImg    from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 13.svg";

const WORD_BANK = [
  "I have been dying to ...",
  "Too bad!",
  "... in no time",
  "What are your plans?",
  "You only have ... more ... to go.",
];

const QUESTIONS = [
  {
    id: 1,
    text: "When will you be finished with your homework? I want to play soccer.",
    answer: "In no time.",
  },
  {
    id: 2,
    text: "I'm getting nervous about singing in the concert on May 25th. How much longer until then?",
    answer: "You only have three more days to go.",
  },
  {
    id: 3,
    text: "I can't wait for the weekend because my family and I are going to have fun!",
    answer: "What are your plans?",
  },
  {
    id: 4,
    text: "Oh no, I missed a problem on my homework because I numbered the answers wrong.",
    answer: "Too Bad!",
  },
  {
    id: 5,
    text: "I can't wait to go swimming. What do you want to do?",
    answer: "I have been dying to....",
  },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,'''…]/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({ qId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "block" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
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
const WB_Unit9_ExpressionAnswer_I = () => {
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
    QUESTIONS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A" style={{ marginRight: "10px" }}>I</span>
          Use and write the correct expression to answer.
        </h5>

        {/* Word Bank */}
        <div style={{
          border: "2px solid #84ad40",
          borderRadius: "6px",
          padding: "10px 16px",
          marginBottom: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px 24px",
          fontSize: "18px",
          color: "#333",
        }}>
          {WORD_BANK.map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "20px" }}>
          {QUESTIONS.map(({ id, text }) => {
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Question text */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "18px" }}>
                  <span style={{ fontWeight: "bold", minWidth: "18px" }}>{id}</span>
                  <span style={{ color: "#333", lineHeight: "1.5" }}>{text}</span>
                </div>
                {/* Answer input */}
                <div style={{ paddingLeft: "26px" }}>
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

        {/* Two images */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "3em",
        }}>
          {[soccerImg, micImg].map((src, i) => (
            <div key={i} style={{
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
            }}>
              <img
                src={src}
                alt={i === 0 ? "soccer player" : "microphone"}
                style={{ width: "100%", maxHeight: "160px", objectFit: "contain" }}
              />
            </div>
          ))}
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

export default WB_Unit9_ExpressionAnswer_I;