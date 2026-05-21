import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/4.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/5.svg";
import img3 from  "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/6.svg";
import img4 from  "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/7.svg";
import img5 from  "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/8.svg";

const BORDER = "#84ad40";

const ROWS = [
  { id: 1, img: img1, answer: "Stella isn't used to planting flowers." },
  { id: 2, img: img2, answer: "Stella is used to helping Sarah."        },
  { id: 3, img: img3, answer: "Stella is used to riding her bike."      },
  { id: 4, img: img4, answer: "Stella isn't used to riding a camel."    },
  { id: 5, img: img5, answer: "Stella isn't used to riding on an airplane." },
];

const initAnswers = () => {
  const a = {};
  ROWS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,'''’]/g, "").replace(/\s+/g, " ").trim();

// ── Sub-components OUTSIDE parent ──

const RowInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
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
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
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

const WB_Unit_StellaUsedTo_E = () => {
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
    const hasEmpty = ROWS.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { alert("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    ROWS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = ROWS.length;
    if (correct === total) { setLocked(true); }
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    ROWS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers()); setResult({}); setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>E</span>
          Look at the picture and write a sentence that tells what Stella{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>used to</span> or{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>didn't use to</span> do.
        </h5>

        {/* Table */}
        <div style={{
          border: `2px solid ${BORDER}`,
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "3em",
        }}>
          {ROWS.map((row, i) => (
            <div
              key={row.id}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                borderBottom: i < ROWS.length - 1 ? `1.5px solid ${BORDER}` : "none",
                minHeight: "120px",
              }}
            >
              {/* Left: image only — badge is part of the image */}
              <div style={{
                borderRight: `1.5px solid ${BORDER}`,
                overflow: "hidden",
              }}>
                <img
                  src={row.img}
                  alt={`scene ${row.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Right: number + input */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
              }}>
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "18px" }}>
                  {row.id}
                </span>
                <RowInput
                  value={answers[row.id]}
                  onChange={(val) => handleChange(row.id, val)}
                  disabled={locked || result[row.id] === true}
                  isWrong={result[row.id] === false}
                  isCorrect={result[row.id] === true}
                />
              </div>

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

export default WB_Unit_StellaUsedTo_E;