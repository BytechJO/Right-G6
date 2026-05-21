import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  "for a living",
  "spare time",
  "extra money",
  "bow and arrow",
  "world-class",
];

const BLANKS = {
  1: { answer: "for a living",  width: "160px" },
  2: { answer: "world-class",   width: "140px" },
  3: { answer: "spare time",    width: "130px" },
  4: { answer: "bow and arrow", width: "150px" },
  5: { answer: "extra money",   width: "140px" },
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "", 5: "" });

// ─────────────────────────────────────────────
//  InlineInput — OUTSIDE parent
// ─────────────────────────────────────────────
const InlineInput = ({ blankId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(blankId, e.target.value)}
      style={{
        width,
        border: "none",
        borderBottom: `2px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        fontWeight: isCorrect ? "700" : "400",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
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

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const WB_Unit4_FillBlank_C = () => {
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
    const hasEmpty = Object.values(answers).some((v) => !v.trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

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
    Object.entries(BLANKS).forEach(([id, { answer }]) => {
      a[id] = answer; r[id] = true;
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  // shorthand
  const B = (id) => (
    <InlineInput
      blankId={id}
      value={answers[id]}
      onChange={handleChange}
      isCorrect={result[id] === true}
      isWrong={result[id] === false}
      disabled={locked || result[id] === true}
      width={BLANKS[id].width}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>C</span>
          Fill in each blank with the correct expression.
        </h5>

        {/* Word Bank */}
        <div style={{
          border: "1.5px solid #84ad40",
          borderRadius: "8px",
          padding: "10px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 32px",
          justifyContent: "center",
          fontSize: "17px",
          fontWeight: "500",
          color: "#333",
          marginBottom: "28px",
          marginTop: "2em",

        }}>
          {WORD_BANK.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        {/* Paragraph with inline blanks */}
        <div style={{
          fontSize: "18px",
          lineHeight: "2.6",
          color: "#333",
          marginBottom: "3em",
        }}>
          My dad does something unusual {B(1)}. He's a{" "}
          {B(2)} hockey player. Yes, hockey can be very dangerous,
          but when he's not playing, my dad is actually very gentle and careful. He says
          he has plenty of adventure playing hockey, so he likes to do quiet, fun things
          when he's home. In his {B(3)} he also likes to do target
          practice with his {B(4)} because his hobby is archery. He
          and I are both archers, so we spend lots of time together doing our hobby.
          Although he makes a lot of money with his job, he isn't careless with the{" "}
          {B(5)}, and he has taught me to do the same. He saves
          his money so he can retire early. I appreciate my dad very much!
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

export default WB_Unit4_FillBlank_C;