import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BLANKS = {
  1: { answer: "it's been too long", width: "190px" },
  2: { answer: "catch up",           width: "130px" },
  3: { answer: "Now is your chance", width: "190px" },
  4: { answer: "Here I go",          width: "130px" },
  5: { answer: "stand out",          width: "150px" },
  6: { answer: "You're a natural.",  width: "180px" },
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", verticalAlign: "bottom" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(bId, e.target.value)}
      style={{
        width,
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "1px",
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
const WB_Unit8_Expressions_K = () => {
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
    Object.entries(BLANKS).forEach(([id, { answer }]) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = Object.keys(BLANKS).length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    Object.entries(BLANKS).forEach(([id, { answer }]) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  const B = (id) => (
    <InlineInput
      bId={id}
      value={answers[id]}
      onChange={handleChange}
      isCorrect={result[id] === true}
      isWrong={result[id] === false}
      disabled={locked || result[id] === true}
      width={BLANKS[id].width}
    />
  );

  const pStyle = {
    fontSize: "17px",
    lineHeight: "2.2",
    color: "#333",
    marginBottom: "10px",
    textIndent: "2em",
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>K</span>
          Write the correct expression in each blank.
        </h5>

        {/* Dialogue paragraphs */}
        <div style={{ marginBottom: "3em" }}>

          <p style={pStyle}>
            "Jamie, {B(1)}! I don't think I've seen you for months!" exclaimed Elaine.
          </p>

          <p style={pStyle}>
            "Yes, I've been out of the country now for three months! We need to{" "}
            {B(2)} since we haven't talked for so long. I want to hear what you've been doing," Jamie said.
          </p>

          <p style={pStyle}>
            "Where did you go, anyway?" asked Elaine.
          </p>

          <p style={pStyle}>
            Jamie said she didn't know until the day before that her whole family was going! Her father had to go to Australia, and Jamie had always wanted to try scuba diving, so her dad took the whole family along to dive at the Great Barrier Reef.
          </p>

          <p style={pStyle}>
            "{B(3)}," he had told Jamie. Her parents and older brothers already knew how to dive, so Jamie just had to take some classes. Then she could dive with her family.
          </p>

          <p style={pStyle}>
            Jamie told Elaine about her first dive. "I stood on the edge of the boat and just said, '{B(4)}!' Then I was in the water before I could think! I didn't want to {B(5)}, but everyone was watching me because they knew it was my first dive."
          </p>

          <p style={pStyle}>
            "I don't know if scuba diving would suit me very well, but I can tell{" "}
            {B(6)} Jamie. We should go to the ocean sometime together, though. I can teach you how to surf, and you can show me some things about diving!" said Elaine.
          </p>

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

export default WB_Unit8_Expressions_K;