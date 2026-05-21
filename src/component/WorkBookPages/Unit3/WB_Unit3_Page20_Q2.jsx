import React, { useState } from "react";

// ── صور وهمية — بدّل المسارات للمسارات الفعلية ──
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U3 Folder/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U3 Folder/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U3 Folder/SVG/Asset 3.svg";

// ─────────────────────────────────────────────
//  SVG Wave Arrow — defined OUTSIDE parent
// ─────────────────────────────────────────────
const WaveArrow = () => (
  <svg
    width="100%"
    height="32"
    viewBox="0 0 500 32"
    preserveAspectRatio="none"
    style={{ display: "block", overflow: "visible" }}
  >
    {/* موجة خضراء */}
    <path
      d="M 490 20 Q 420 4, 350 20 Q 280 36, 210 20 Q 140 4, 70 20 Q 35 28, 10 18"
      fill="none"
      stroke="#84ad40"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* سهم صغير في النهاية — جهة اليسار */}
    <polyline
      points="17,13 8,18 17,27"
      fill="none"
      stroke="#84ad40"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─────────────────────────────────────────────
//  Free Input — defined OUTSIDE parent
// ─────────────────────────────────────────────
const FreeInput = ({ value, onChange, flex = true }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      flex: flex ? 1 : undefined,
      width: flex ? undefined : "100%",
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      minWidth: 0,
    }}
  />
);

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const WB_Unit3_ChainConditional_J = () => {
  const [answers, setAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () =>
    setAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "" });

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>J</span>
          Use the{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>"then"</span>{" "}
          clause from the sentence before to make the next{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>"if"</span>{" "}
          clause.{" "}

        </h5>

        {/* Sentences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px", marginBottom: "2em" }}>

          {/* ── Sentence 1 — full input ── */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", paddingBottom: "6px" }}>
            <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "22px" }}>1</span>
            <FreeInput
              value={answers[1]}
              onChange={(val) => handleChange(1, val)}
            />
          </div>

          {/* wave */}
          <div style={{ paddingLeft: "28px", margin: "2px 0 2px" }}>
            <WaveArrow />
          </div>

          {/* ── Sentence 2 — full input ── */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", paddingBottom: "6px" }}>
            <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "22px" }}>2</span>
            <FreeInput
              value={answers[2]}
              onChange={(val) => handleChange(2, val)}
            />
          </div>

          {/* wave */}
          <div style={{ paddingLeft: "28px", margin: "2px 0 2px" }}>
            <WaveArrow />
          </div>

          {/* ── Sentence 3 — full input ── */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", paddingBottom: "6px" }}>
            <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "22px" }}>3</span>
            <FreeInput
              value={answers[3]}
              onChange={(val) => handleChange(3, val)}
            />
          </div>

          {/* wave */}
          <div style={{ paddingLeft: "28px", margin: "2px 0 2px" }}>
            <WaveArrow />
          </div>

          {/* ── Sentence 4 — full input ── */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", paddingBottom: "6px" }}>
            <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "22px" }}>4</span>
            <FreeInput
              value={answers[4]}
              onChange={(val) => handleChange(4, val)}
            />
          </div>

          {/* wave */}
          <div style={{ paddingLeft: "28px", margin: "2px 0 2px" }}>
            <WaveArrow />
          </div>

          {/* ── Sentence 5 — full input ── */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", paddingBottom: "6px" }}>
            <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "22px" }}>5</span>
            <FreeInput
              value={answers[5]}
              onChange={(val) => handleChange(5, val)}
            />
          </div>

        </div>

        {/* ── 3 Beach Images ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          marginBottom: "3em",
        }}>
          {[img1, img2, img3].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`beach ${i + 1}`}
              style={{
                width: "100%",
                height: "AUTO",
                objectFit: "cover",
              }}
            />
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

export default WB_Unit3_ChainConditional_J;