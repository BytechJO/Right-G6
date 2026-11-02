/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";

const BORDER = "#84ad40";

// بدّل المسارات للصور الفعلية
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 3.svg";
import img2 from  "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 4.svg";
import img3 from  "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 6.svg";
import img4 from  "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 5.svg";
import ExerciseHeader from "../../ExerciseHeader";

const imageDescriptions = [
  "Workers moving furniture", "Melissa organizing a closet",
  "Greg practicing basketball", "Doctors studying medicine",
];

const ROWS = [
  { id: 1, img: img1, prefilled: null },
  { id: 2, img: img2, prefilled: null },
  { id: 3, img: img3, prefilled: null },
  { id: 4, img: img4, prefilled: null },
];

const initAnswers = () => {
  const a = {};
  ROWS.forEach(({ id, prefilled }) => { a[id] = prefilled || ""; });
  return a;
};

// ── RowInput — OUTSIDE parent ──
const RowInput = ({ rowId, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(rowId, e.target.value)}
    placeholder="Write a present perfect progressive sentence"
    title={`Picture ${rowId}: write a present perfect progressive sentence`}
    aria-label={`Picture ${rowId}: present perfect progressive sentence`}
    className="workbook-unit9-input"
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "3px",
      fontFamily: "inherit",
      textDecoration: disabled ? "underline" : "none",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit9_PresentPerfectProg_D = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="D"
          title={<>Write sentences in the <span style={{ color: "orange", fontWeight: "bold" }}>present perfect progressive</span> about each picture.</>}
          subTitle="Use has/have been + verb-ing and make the duration or continuing action clear in the sentence."
        />

        {/* Picture-sentence grid */}
        <div style={{
          border: `2px solid ${BORDER}`,
          borderRadius: "8px",
          overflow: "hidden",
          margin: "3% 0",

        }}>
          {ROWS.map(({ id, img, prefilled }, i) => (
            <div key={id} style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px 16px",
              borderBottom: i < ROWS.length - 1 ? `1px solid ${BORDER}` : "none",
              minHeight: "100px",
            }}>
              {/* Image */}
              <img
                src={img}
                alt={imageDescriptions[id - 1]}
                style={{
                  width: "10%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "6px",
                  flexShrink: 0,
                }}
              />

              {/* Input */}
              <RowInput
                rowId={id}
                value={answers[id]}
                onChange={handleChange}
                disabled={!!prefilled}
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

export default WB_Unit9_PresentPerfectProg_D;
