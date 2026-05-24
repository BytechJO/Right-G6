import React, { useState } from "react";

// بدّل المسار للصورة الفعلية
import notebookImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 1.svg";

const WORD_BANK = ["discuss", "classmates", "novel", "perhaps"];

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "" });

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ lineId, value, onChange }) => (
  <input
    type="text"
    value={value}
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
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit9_VocabSentences_A = () => {
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
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          Use each of these vocabulary words in a sentence.
        </h5>

        {/* Word Bank */}
        <div style={{
          border: "2px solid #84ad40",
          borderRadius: "8px",
          padding: "10px 24px",
          display: "flex",
          gap: "32px",
          marginBottom: "28px",
          fontSize: "17px",
          color: "#333",
          justifyContent: "space-around",
        }}>
          {WORD_BANK.map((w) => <span key={w}>{w}</span>)}
        </div>

        {/* Lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "20px" }}>
          {[1, 2, 3, 4].map((id) => (
            <div key={id} style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              fontSize: "17px",
            }}>
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
              <LineInput lineId={id} value={answers[id]} onChange={handleChange} />
            </div>
          ))}
        </div>

        {/* Notebook image */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3em" }}>
          <img
            src={notebookImg}
            alt="notebook"
            style={{
              width: "280px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
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

export default WB_Unit9_VocabSentences_A;