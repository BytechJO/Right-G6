import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#333";

const QUESTIONS = [
  {
    id: 1,
    text: "Vince, what happened? You're an hour late. We were getting worried about you.",
    answer: "b",
  },
  {
    id: 2,
    text: "Mandy, you're all wet! Did you fall in the pool?",
    answer: "c",
  },
  {
    id: 3,
    text: "John, you haven't eaten very much! Are you feeling okay?",
    answer: "a",
  },
];

const RESPONSES = [
  {
    label: "a",
    text: "Not really. If I hadn't eaten those two candy bars, my stomach wouldn't be hurting right now.",
  },
  {
    label: "b",
    text: "I'm sorry. If my alarm clock hadn't broken, I would have woken up on time.",
  },
  {
    label: "c",
    text: "No. If I had seen the fireman with the hose, I wouldn't have walked right in front of it!",
  },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();


const initAnswers = () => ({ 1: "", 2: "", 3: "" });

// ── MatchInput — OUTSIDE parent ──
const MatchInput = ({ qId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <input
      type="text"
      maxLength={1}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value.toLowerCase())}
      style={{
        width: "44px",
        border: "none",
        borderBottom: `2px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        fontWeight: "700",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        textAlign: "center",
        fontFamily: "inherit",
        paddingBottom: "1px",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-6px",
        width: "15px", height: "15px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// SVG arrow decoration (matches book style)
const ArrowDeco = () => (
  <svg width="60" height="24" viewBox="0 0 60 24" style={{ display: "block", margin: "0 auto" }}>
    <line x1="0" y1="4" x2="28" y2="20" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="60" y1="4" x2="32" y2="20" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── MAIN COMPONENT ──
const WB_Unit7_Match_I = () => {
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

  const cardStyle = {
    border: `1.5px solid ${BORDER}`,
    borderRadius: "4px",
    padding: "14px 16px",
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.55",
    background: "#fff",
    minHeight: "90px",
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>I</span>
          Match each question to its correct answer.
        </h5>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px 16px",
          margin: "2em 0",
        }}>
          {QUESTIONS.map(({ id, text }, qi) => {
            const resp = RESPONSES[qi];
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <React.Fragment key={id}>
                {/* Left: question card */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>{id}</span>
                    <div style={{ ...cardStyle, flex: 1, display: "flex", alignItems: "flex-start", gap: "4px" }}>
                      {/* Input at start */}
                      <MatchInput
                        qId={id}
                        value={answers[id]}
                        onChange={handleChange}
                        isCorrect={isCorrect}
                        isWrong={isWrong}
                        disabled={locked || isCorrect}
                      />
                      <span>{text}</span>
                    </div>
                  </div>
                  {/* Spacer between rows */}
                  <div style={{ height: "12px" }} />
                </div>

                {/* Right: response card */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  <div style={{ ...cardStyle, display: "flex", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontWeight: "bold", fontSize: "16px", minWidth: "18px" }}>{resp.label}</span>
                    <span>{resp.text}</span>
                  </div>
                  <div style={{ height: "12px" }} />
                </div>
              </React.Fragment>
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

export default WB_Unit7_Match_I;