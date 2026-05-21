import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WORD_BANK = ["a while", "I guess", "after all", "if you say so", "suit yourself"];

const BLANKS = {
  1: { answer: "I guess",        width: "140px" },
  2: { answer: "If you say so",  width: "150px" },
  3: { answer: "After all",      width: "110px" },
  4: { answer: "a while",        width: "110px" },
  5: { answer: "Suit yourself",  width: "150px" },
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,'''""]/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "", 5: "" });

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative",  verticalAlign: "bottom" }}>
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
const WB_Unit5_CompleteParagraph_J = () => {
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

  const pStyle = { fontSize: "18px", lineHeight: "2.4", color: "#333", marginBottom: "16px", textIndent: "2em" };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>J</span>
          Complete the paragraph by writing the correct expression.
        </h5>

        {/* Word Bank */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "24px",
          marginTop: "24px",

        }}>
          {WORD_BANK.map((w) => (
            <span key={w} style={{
              border: "1.5px solid #84ad40",
              borderRadius: "8px",
              padding: "5px 16px",
              fontSize: "16px",
              fontWeight: "500",
              color: "#333",
            }}>{w}</span>
          ))}
        </div>

        {/* Paragraph */}
        <div style={{ marginBottom: "3em" }}>
          <p style={pStyle}>
            Jessica and her brother Kyle are waiting for the school bus. Jessica is tired
            of waiting because the bus is late. "{B(1)} we should leave
            the house later, shouldn't we?" Jessica asks.
          </p>

          <p style={pStyle}>
            "{B(2)}," replies her brother, "but then we might miss the
            bus. Usually it's here on time. It's just today that it's late.{" "}
            {B(3)}, it is snowing hard today. The driver probably has to drive
            more slowly."
          </p>

          <p style={pStyle}>
            Jessica says, "Yes, it's a stormy day, isn't it? Well, if the bus isn't here
            in {B(4)}, I might walk home and see if Mom can take us to school.
            I don't want to wait in the cold much longer, do you?"
          </p>

          <p style={pStyle}>
            "{B(5)}," answers Kyle. "I'm fine waiting here. I think
            the bus will come in a few minutes."
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

export default WB_Unit5_CompleteParagraph_J;