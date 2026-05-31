import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية
import blocksImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/1.svg";

const EQUATIONS = [
  {
    id: 1,
    equation: "L E S S O N S − ON + US − LS + CC =",
    answer: "success",
    prefilled: false,
  },
  {
    id: 2,
    equation: "F A M I L I A R − RAM + LESS − II + W =",
    answer: "flawless",
    prefilled: false,
  },
  {
    id: 3,
    equation: "C E L E B R A T I O N + TIN − COB + NG − L =",
    answer: "entertaining",
    prefilled: false,
  },
  {
    id: 4,
    equation: "P E R F E C T L Y − YEP + DENT − CRF + A =",
    answer: "talented",
    prefilled: false,
  },
  {
    id: 5,
    equation: "P R O U D + MESS − DP + MOLCH =",
    answer: "summer school",
    prefilled: false,
  },
];

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  EQUATIONS.forEach(({ id, answer, prefilled }) => {
    a[id] = prefilled ? answer : "";
  });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({ eId, value, onChange, isCorrect, isWrong, disabled, prefilled }) => (
  <span style={{ position: "relative", display: "inline-block", minWidth: "160px" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(eId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: prefilled ? "#333" : isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect || prefilled ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
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
const WB_Unit6_WordMath_A = () => {
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
    const hasEmpty = EQUATIONS.filter((e) => !e.prefilled)
      .some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    EQUATIONS.forEach(({ id, answer, prefilled }) => {
      if (prefilled) { nr[id] = true; return; }
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = EQUATIONS.filter((e) => !e.prefilled).length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    EQUATIONS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          Word math! Start with the words given. By adding or subtracting letters, make another vocabulary word.
        </h5>

        {/* Body: image + equations */}
        <div style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
          margin: "3.5em 0",
          flexWrap: "wrap",
        }}>

          {/* Blocks Image */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={blocksImg}
              alt="math blocks"
              style={{ width: "180px", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* Equations */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", minWidth: "300px" }}>
            {EQUATIONS.map(({ id, equation, prefilled }) => {
              const isCorrect = result[id] === true;
              const isWrong   = result[id] === false;
              return (
                <div key={id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "17px",
                  flexWrap: "wrap",
                }}>
                  {/* Equation */}
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: "16px",
                    color: "#333",
                    letterSpacing: "1px",
                    flex: 1,
                    minWidth: "260px",
                  }}>
                    {equation}
                  </span>

                  {/* Answer input */}
                  <AnswerInput
                    eId={id}
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

export default WB_Unit6_WordMath_A;