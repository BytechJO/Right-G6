import React, { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    info: "The Statue of Liberty's index finger is eight feet long.",
    prefilled: null,
  },
  {
    id: 2,
    info: "Most 75-year-old people will have slept about 23 years.",
    prefilled: null,
  },
  {
    id: 3,
    info: 'The word "set" has the most number of definitions in the English language.',
    prefilled: null,
  },
  {
    id: 4,
    info: "Sharks can live up to 100 years.",
    prefilled: null,
  },
  {
    id: 5,
    info: "Mosquitos are more attracted to the color blue than any other color.",
    prefilled: null,
  },
  {
    id: 6,
    info: "The largest recorded snowflake fell in Montana in 1887.",
    prefilled: null,
  },
];

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, prefilled }) => { a[id] = prefilled || ""; });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({ qId, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(qId, e.target.value)}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      fontFamily: "inherit",
      textDecoration: disabled ? "underline" : "none",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit5_QuestionTagD = () => {
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
          <span className="ex-A" style={{ marginRight: "10px" }}>D</span>
          Read the information given in each number and then use it to make a statement and a{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>question tag</span>.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "45px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, info, prefilled }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

              {/* Info sentence */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "18px" }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                <span style={{ color: "#333" }}>{info}</span>
              </div>

              {/* Answer input */}
              <div style={{ paddingLeft: "32px" }}>
                <AnswerInput
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

export default WB_Unit5_QuestionTagD;