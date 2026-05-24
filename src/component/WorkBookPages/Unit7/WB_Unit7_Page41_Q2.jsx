import React, { useState } from "react";

// بدّل المسارات للصور الفعلية
import imgA from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/9.svg";
import imgB from  "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/10.svg";
const BORDER = "#84ad40";

const CARDS = [
  {
    id: "A",
    img: imgA,
    example: "If we had planted more trees in our yard, we would have had more trees.",
  },
  {
    id: "B",
    img: imgB,
    example: "If I had more time this weekend, I would have watched a movie.",
  },
];

const LINES_PER_CARD = 4;

const initAnswers = () => {
  const a = {};
  CARDS.forEach(({ id }) => {
    for (let i = 0; i < LINES_PER_CARD; i++) {
      a[`${id}-${i}`] = "";
    }
  });
  return a;
};

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ fieldKey, value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(fieldKey, e.target.value)}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1.5px solid #aaa",
      outline: "none",
      background: "transparent",
      fontSize: "15px",
      color: "#333",
      paddingBottom: "3px",
      fontFamily: "inherit",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit7_ThirdConditional_E = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8" style={{whiteSpace : "nowrap"}}>
          <span className="ex-A" style={{ marginRight: "10px" }}>E</span>
          Look at the pictures below, and then write a{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>third conditional</span>{" "}
          sentence about each one.
        </h5>

        {/* Two Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "3em",
        }}>
          {CARDS.map(({ id, img, example }) => (
            <div key={id} style={{
              border: `2px solid ${BORDER}`,
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Card label */}
              <div style={{
                width: "32px", height: "32px",
                background: "white",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: "bold", fontSize: "16px", color: "#000000ff",
                margin: "10px 10px 0",
                flexShrink: 0,
              border: `2px solid ${BORDER}`,

              }}>
                {id}
              </div>

              {/* Image */}
              <div style={{ padding: "8px 12px"    ,   width: "300px",   display: "flex", alignItems: "center", justifyContent: "center",
                    height: "300px",}}>
                <img
                  src={img}
                  alt={`card ${id}`}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Example */}
              <div style={{
                padding: "8px 14px",
                fontSize: "14px",
                color: "#333",
                lineHeight: "1.5",
              }}>
                <span style={{ fontWeight: "bold" }}>Example: </span>
                {example}
              </div>

              {/* 4 writing lines */}
              <div style={{
                padding: "8px 14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                flex: 1,
              }}>
                {Array.from({ length: LINES_PER_CARD }).map((_, i) => (
                  <LineInput
                    key={i}
                    fieldKey={`${id}-${i}`}
                    value={answers[`${id}-${i}`]}
                    onChange={handleChange}
                  />
                ))}
              </div>
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

export default WB_Unit7_ThirdConditional_E;