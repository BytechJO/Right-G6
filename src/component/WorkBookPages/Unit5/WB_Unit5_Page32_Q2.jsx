import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسارات للصور الفعلية
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/4.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/5.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/7.svg";

const ITEMS = [
  { id: 1, img: img1, answer: "comedy" },
  { id: 2, img: img2, answer: "persuade" },
  { id: 3, img: img3, answer: "science fiction" },
  { id: 4, img: img4, answer: "active" },
];

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── PicInput — OUTSIDE parent ──
const PicInput = ({ itemId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "block" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(itemId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
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
        width: "16px", height: "16px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit5_VocabPictures_K = () => {
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

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>K</span>
          Write a vocabulary word that matches each picture.
        </h5>

        {/* 2×2 Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px 40px",
          marginBottom: "3em",
        }}>
          {ITEMS.map(({ id, img }) => (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: "16px" }}>

              {/* Number + Image */}
              <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>{id}</span>
                <img
                  src={img}
                  alt={`picture ${id}`}
                  style={{
                    width: "40%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              <div style={{ flex: 1 , alignSelf :"end" }}>
                <PicInput
                  itemId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  isCorrect={result[id] === true}
                  isWrong={result[id] === false}
                  disabled={locked || result[id] === true}
                />
              </div>
              </div>

              {/* Input */}

            </div>
          ))}
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

export default WB_Unit5_VocabPictures_K;