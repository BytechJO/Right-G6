import React, { useState } from "react";

const initAnswers = () => ({ 1: "", 2: "", 3: "" });

// ── FreeInput — OUTSIDE parent ──
const FreeInput = ({ qId, value, onChange, flex = true }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(qId, e.target.value)}
    style={{
      flex: flex ? 1 : undefined,
      width: flex ? undefined : "100%",
      border: "none",
      borderBottom: "1px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "18px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      minWidth: 0,
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit5_StatementOrTag_G = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  const rowStyle = {
    display: "flex",
    alignItems: "flex-end",
    gap: "6px",
    fontSize: "18px",
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          Write either a statement or a question tag.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px", margin: "8% 0 " }}>

          {/* 1: prefix + input + ? */}
          <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>1</span>
            <span style={{ whiteSpace: "nowrap" }}>Her mother is very kind,</span>
            <FreeInput qId={1} value={answers[1]} onChange={handleChange} />
            <span>?</span>
          </div>

          {/* 2: input + suffix */}
          <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>2</span>
            <FreeInput qId={2} value={answers[2]} onChange={handleChange} />
            <span style={{ whiteSpace: "nowrap" }}>, aren't they?</span>
          </div>

          {/* 3: prefix + input + ? */}
          <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>3</span>
            <span style={{ whiteSpace: "nowrap" }}>Peter does not like pizza,</span>
            <FreeInput qId={3} value={answers[3]} onChange={handleChange} />
            <span>?</span>
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

export default WB_Unit5_StatementOrTag_G;