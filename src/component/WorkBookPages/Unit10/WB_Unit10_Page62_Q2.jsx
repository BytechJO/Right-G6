import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U10 Folder/SVG/Asset 13.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U10 Folder/SVG/Asset 16.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U10 Folder/SVG/Asset 15.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U10 Folder/SVG/Asset 14.svg";

const ITEMS = [
  { id: 1, img: img1, answer: "sandcastle"  },
  { id: 2, img: img2, answer: "seashells"   },
  { id: 3, img: img3, answer: "sunscreen"   },
  { id: 4, img: img4, answer: "surfing"     },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

// ── Sub-components OUTSIDE parent ──

const PicInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
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

const WB_Unit_VocabPictures_M = () => {
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
    const hasEmpty = ITEMS.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    ITEMS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = ITEMS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    ITEMS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers()); setResult({}); setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>M</span>
          Write a vocabulary word for each picture.
        </h5>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          margin: "10vh 0",
        }}>
          {ITEMS.map((item) => (
            <div key={item.id} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "25px",
            }}>

              {/* Image */}
              <img
                src={item.img}
                alt={`picture ${item.id}`}
                style={{
                  width: "100%",
                  height :"auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Input */}
              <PicInput
                value={answers[item.id]}
                onChange={(val) => handleChange(item.id, val)}
                disabled={locked || result[item.id] === true}
                isWrong={result[item.id] === false}
                isCorrect={result[item.id] === true}
              />

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

export default WB_Unit_VocabPictures_M;