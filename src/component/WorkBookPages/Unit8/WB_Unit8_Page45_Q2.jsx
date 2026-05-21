import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import helicopterImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 17.svg";

const WORD_BANK = ["peculiar", "glows", "remote control", "helicopter", "timer", "tablet", "skills"];

const BLANKS = {
  1: { answer: "timer",      width: "160px" },
  2: { answer: "helicopter", width: "160px" },
  3: { answer: "skills",     width: "160px" },
  4: { answer: "peculiar",   width: "160px" },
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "" });

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
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
        fontSize: "18px",
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
const WB_Unit8_Rhyme_B = () => {
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

  const lineStyle = { fontSize: "18px", lineHeight: "1.6", color: "#333" };
  const numStyle  = { fontWeight: "bold", fontSize: "18px", minWidth: "22px" };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>B</span>
          Put the correct word in the blank to finish the rhyme.
        </h5>

        {/* Word Bank */}
        <div style={{
          border: "1px solid #84ad40",
          borderRadius: "8px",
          padding: "10px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 28px",
          marginBottom: "28px",
          marginTop: "28px",

          fontSize: "17px",
          color: "#333",
          justifyContent :"space-around"
        }}>
          {WORD_BANK.map((w) => <span key={w}>{w}</span>)}
        </div>

        {/* Body: rhymes + image */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "3em" }}>

          {/* Rhymes */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Rhyme 1 */}
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={numStyle}>1</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  I'll put on the {B(1)} so we can hear.
                </div>
                <div style={lineStyle}>
                  That in one more hour will come my aunt so dear!
                </div>
              </div>
            </div>

            {/* Rhyme 2 */}
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={numStyle}>2</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  I can hear the {B(2)} flying overhead,
                </div>
                <div style={lineStyle}>
                  "I think it's going to the air show," my dad said.
                </div>
              </div>
            </div>

            {/* Rhyme 3 */}
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={numStyle}>3</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  As a soccer player I need lots of {B(3)}.
                </div>
                <div style={lineStyle}>
                  It takes lots of hard work, but then the goals are the thrills!
                </div>
              </div>
            </div>

            {/* Rhyme 4 */}
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={numStyle}>4</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  To school he brought a pencil, tablet, and ruler,
                </div>
                <div style={lineStyle}>
                  But he also brought a turtle and that was {B(4)}.
                </div>
              </div>
            </div>

          </div>

          {/* Helicopter Image */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={helicopterImg}
              alt="helicopter"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
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

export default WB_Unit8_Rhyme_B;