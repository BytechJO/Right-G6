import React, { useState } from "react";

// بدّل المسار للصورة الفعلية (الفقرة + الصورة كاملة)
import pancakeImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 24 (3).svg";

const LINES = 6;

const initAnswers = () => {
  const a = {};
  for (let i = 1; i <= LINES; i++) {
    a[i] = i === 1 ? "": "";
  }
  return a;
}

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ lineId, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(lineId, e.target.value)}
    style={{
      flex: 1,
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      textDecoration: disabled ? "underline" : "none",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit8_ReportedSpeechI = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>I</span>
          Read the directions below. Then write what was said, using{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>reported speech</span>.
        </h5>

        {/* Article image (paragraph + pancake photo as one image) */}
        <div style={{ marginBottom: "24px" }}>
          <img
            src={pancakeImg}
            alt="How to Make Pancakes article"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Answer lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "3em" }}>
          {Array.from({ length: LINES }, (_, i) => i + 1).map((id) => (
            <div key={id} style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              fontSize: "17px",
            }}>
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
              <LineInput
                lineId={id}
                value={answers[id]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Reset only */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit8_ReportedSpeechI;