import React, { useState } from "react";

const QUESTIONS = [
  { id: 1, tag: "doesn't he?", prefilled:null},
  { id: 2, tag: "won't he?",   prefilled: null },
  { id: 3, tag: "can't she?",  prefilled: null },
  { id: 4, tag: "are they?",   prefilled: null },
  { id: 5, tag: "couldn't you?", prefilled: null },
  { id: 6, tag: "will she?",   prefilled: null },
];

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, prefilled }) => { a[id] = prefilled || ""; });
  return a;
};

// ── FreeInput — OUTSIDE parent ──
const FreeInput = ({ qId, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(qId, e.target.value)}
    style={{
      flex: 1,
      border: "none",
      borderBottom: "1px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "18px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      minWidth: 0,
      textDecoration: disabled ? "underline" : "none",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit5_QuestionTag_C = () => {
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
          <span className="ex-A" style={{ marginRight: "10px" }}>C</span>
          Write a sentence that matches with the{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>question tag</span>{" "}
          that is given.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "45px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, tag, prefilled }) => (
            <div key={id} style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "6px",
              fontSize: "18px",
            }}>
              {/* Number */}
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>

              {/* Input */}
              <FreeInput
                qId={id}
                value={answers[id]}
                onChange={handleChange}
                disabled={!!prefilled}
              />

              {/* Tag ثابت */}
              <span style={{ whiteSpace: "nowrap", color: "#333" }}>, {tag}</span>
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

export default WB_Unit5_QuestionTag_C;