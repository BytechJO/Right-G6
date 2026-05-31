import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

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
  inputItems.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

// ── Sub-components OUTSIDE parent ──

const AnswerInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <div style={{ position: "relative", flex: 1 }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
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
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "18px", height: "18px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </div>
);

// ── Main Component ──

const WB_Unit_MissingWord_J = () => {
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
    const hasEmpty = inputItems.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    inputItems.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = inputItems.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    inputItems.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers()); setResult({}); setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>J</span>
          One word is missing from each expression. Rewrite each expression correctly.
        </h5>

        <div style={{ display: "flex", flexDirection: "column", gap: "60PX", margin: "2em 0" }}>
          {ITEMS.map((item) => (
            <div key={item.id} style={{
              display: "grid",
              gridTemplateColumns: "20px 1fr 40px 1fr",
              alignItems: "center",
              gap: "10px",
            }}>

              {/* Number */}
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>{item.id}</span>

              {/* Incomplete expression */}
              <span style={{ fontSize: "18px", color: "#333" }}>{item.incomplete}</span>

              {/* Arrow */}
              <span style={{ fontSize: "20px", color: "#555", textAlign: "center" }}>→</span>

              {/* Answer */}
              {item.prefilled ? (
                <span style={{
                  fontSize: "18px",
                  color: "#333",
                  borderBottom: "1px solid #555",
                  paddingBottom: "2px",
                  textDecoration: "underline",
                }}>
                  {item.answer}
                </span>
              ) : (
                <AnswerInput
                  value={answers[item.id]}
                  onChange={(val) => handleChange(item.id, val)}
                  disabled={locked || result[item.id] === true}
                  isWrong={result[item.id] === false}
                  isCorrect={result[item.id] === true}
                />
              )}

            </div>
          ))}
        </div>

      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit_MissingWord_J;