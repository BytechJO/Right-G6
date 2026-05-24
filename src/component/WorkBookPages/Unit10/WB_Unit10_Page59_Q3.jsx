import React, { useState } from "react";

const QUESTIONS = [
  { id: 1, keywords: "love / learn / students",     prefilled: null },
  { id: 2, keywords: "enjoy / go / museum",          prefilled: null },
  { id: 3, keywords: "prefer / rent / movies",       prefilled: null },
  { id: 4, keywords: "hate / cross / busy street",   prefilled: null },
];

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, prefilled }) => { a[id] = prefilled || ""; });
  return a;
};

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ qId, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(qId, e.target.value)}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1.5px solid #555",
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
const WB_Unit10_GerundSentence_G = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          Change each verb into a{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>gerund</span>{" "}
          and put it in a sentence after the stative verb.{" "}

        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "57px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, keywords, prefilled }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* Keywords line */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                <span style={{ color: "#333" }}>{keywords}</span>
              </div>
              {/* Answer line */}
              <div style={{ paddingLeft: "32px" }}>
                <LineInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  disabled={!!prefilled}
                />
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

export default WB_Unit10_GerundSentence_G;