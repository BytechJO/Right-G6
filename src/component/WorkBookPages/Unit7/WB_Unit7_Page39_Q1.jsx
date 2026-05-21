import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const WORD_BANK = [
  "silly", "aware", "previously", "advice", "combinations",
  "background", "stencils", "ability", "flatter", "strokes",
];

const CORRECT = {
  Noun:      ["background", "advice", "stencils", "ability", "combinations", "strokes"],
  Verb:      ["flatter"],
  Adjective: ["silly", "aware"],
  Adverb:    ["previously"],
};

const COLS = ["Noun", "Verb", "Adjective", "Adverb"];
const MAX_ROWS = Math.max(...Object.values(CORRECT).map((a) => a.length));

const initAnswers = () => {
  const a = {};
  COLS.forEach((col) => {
    for (let r = 0; r < MAX_ROWS; r++) {
      a[`${col}-${r}`] = "";
    }
  });
  return a;
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

// ── CellInput — OUTSIDE parent ──
const CellInput = ({ cellKey, value, onChange, isCorrect, isWrong, disabled }) => (
  <div style={{ position: "relative" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(cellKey, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "15px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        fontFamily: "inherit",
        textAlign: "center",
        padding: "6px 4px",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-6px", right: "-6px",
        width: "14px", height: "14px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </div>
);

// ── MAIN COMPONENT ──
const WB_Unit7_WordGroups_A = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev)  => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = COLS.some((col) =>
      CORRECT[col].some((_, ri) => !answers[`${col}-${ri}`].trim())
    );
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0; let total = 0;
    const nr = {};
    COLS.forEach((col) => {
      CORRECT[col].forEach((ans, ri) => {
        total++;
        const key = `${col}-${ri}`;
        const ok = normalize(answers[key]) === normalize(ans);
        if (ok) correct++;
        nr[key] = ok;
      });
    });
    setResult(nr);
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    COLS.forEach((col) => {
      for (let ri = 0; ri < MAX_ROWS; ri++) {
        const key = `${col}-${ri}`;
        a[key] = CORRECT[col][ri] || "";
        if (CORRECT[col][ri]) r[key] = true;
      }
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          Put the words in the correct groups.
        </h5>

        {/* Word Bank — 2 rows of pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {[WORD_BANK.slice(0, 5), WORD_BANK.slice(5)].map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: "10px", justifyContent: "space-around" }}>
              {row.map((w) => (
                <span key={w} style={{
                  width : "120px",
                  border: "2px solid #b6d584ff",
                  borderRadius: "10px",
                  padding: "5px 18px",
                  fontSize: "15px",
                  color: "#333",
                  background: "#fff",
                  whiteSpace: "nowrap",
                  alignSelf :"center"
                }}>{w}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ marginBottom: "3em" }}>

          {/* Header row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            marginBottom: "8px",
          }}>
            {COLS.map((col) => (
              <div key={col} style={{
                background: "#d6e8a0",
                border: `2px solid #84ad40`,
                borderRadius: "6px",
                padding: "8px 4px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "15px",
                color: "#333",
              }}>
                {col}
              </div>
            ))}
          </div>

          {/* Data rows — each cell is an independent bordered box */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
          }}>
            {COLS.map((col) => (
              <div key={col} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {Array.from({ length: MAX_ROWS }).map((_, ri) => {
                  const key     = `${col}-${ri}`;
                  const hasSlot = ri < CORRECT[col].length;
                  const isCorrect = result[key] === true;
                  const isWrong   = result[key] === false;

                  if (!hasSlot) {
                    // خلية فارغة بدون border عشان المحاذاة
                    return <div key={ri} style={{ height: "38px" }} />;
                  }

                  return (
                    <div key={ri} style={{
                      border: `2px solid #84ad40`,
                      borderRadius: "8px",
                      background: isCorrect ? "#fff" : isWrong ? "#fff" : "#fff",
                      minHeight: "38px",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 4px",
                    }}>
                      <CellInput
                        cellKey={key}
                        value={answers[key]}
                        onChange={handleChange}
                        isCorrect={isCorrect}
                        isWrong={isWrong}
                        disabled={locked || isCorrect}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
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

export default WB_Unit7_WordGroups_A;