import React, { useState } from "react";

// بدّل المسار للصورة الفعلية (الجدول + صورة الكرات)
import chartImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 27 (4).svg";

const initAnswers = () => ({
  // جملة 1 prefilled — سطرين
  "1a": "",
  "1b": "",
  // جمل 2,3,4 — سطرين لكل
  "2a": "", "2b": "",
  "3a": "", "3b": "",
  "4a": "", "4b": "",
});

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ fKey, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(fKey, e.target.value)}
    style={{
      width: "100%",
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
const WB_Unit9_SurveyChart_G = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  const note = "(Not all the ✓s need to be used, but include a positive and a negative.)";

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          Mark took a survey of his classmates to find out the different school sports they have
          been playing for a while. Read the chart, and then write a sentence about each classmate,
          using the{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>present perfect progressive</span>.
        </h5>

        {/* Chart + balls image */}
        <div style={{ marginBottom: "24px" }}>
          <img
            src={chartImg}
            alt="sports survey chart"
            style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        {/* Sentences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "3em" }}>

          {/* Sentence 1 — prefilled two lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", fontSize: "17px" }}>
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>1</span>
              <span style={{ whiteSpace: "nowrap" }}>Stuart</span>

              <LineInput fKey="1a" value={answers["1a"]} onChange={handleChange} disabled />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput fKey="1b" value={answers["1b"]} onChange={handleChange} disabled />
            </div>
    
          </div>

          {/* Sentence 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", fontSize: "17px" }}>
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>2</span>
              <span style={{ whiteSpace: "nowrap" }}>Amanda</span>
              <LineInput fKey="2a" value={answers["2a"]} onChange={handleChange} disabled={false} />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput fKey="2b" value={answers["2b"]} onChange={handleChange} disabled={false} />
            </div>
          </div>

          {/* Sentence 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", fontSize: "17px" }}>
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>3</span>
              <span style={{ whiteSpace: "nowrap" }}>Beth</span>
              <LineInput fKey="3a" value={answers["3a"]} onChange={handleChange} disabled={false} />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput fKey="3b" value={answers["3b"]} onChange={handleChange} disabled={false} />
            </div>
          </div>

          {/* Sentence 4 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", fontSize: "17px" }}>
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>4</span>
              <span style={{ whiteSpace: "nowrap" }}>Joe</span>
              <LineInput fKey="4a" value={answers["4a"]} onChange={handleChange} disabled={false} />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput fKey="4b" value={answers["4b"]} onChange={handleChange} disabled={false} />
            </div>
          </div>

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

export default WB_Unit9_SurveyChart_G;