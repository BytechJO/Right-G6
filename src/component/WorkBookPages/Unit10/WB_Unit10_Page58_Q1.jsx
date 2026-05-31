import React, { useState } from "react";

const QUESTIONS = [
  { id: 1, sentence: "They are walking to the park." },
  { id: 2, sentence: "Fred is having a picnic."      },
  { id: 3, sentence: "We are waiting in line."       },
];

const initAnswers = () => ({ 1: "", 2: "", 3: "" });

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({ qId, value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(qId, e.target.value)}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "18px",
      color: "#333",
      paddingBottom: "3px",
      fontFamily: "inherit",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit10_GerundRewrite_C = () => {
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
          For each sentence, change the{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>present progressive</span>{" "}
          verb into a{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>gerund</span>{" "}
          by adding a stative verb. Rewrite the new sentence.{" "}
    
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px", margin: "2em 0" }}>
          {QUESTIONS.map(({ id, sentence }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Original sentence */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "19px" }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                <span>{sentence}</span>
              </div>
              {/* Answer line */}
              <div style={{ paddingLeft: "32px" }}>
                <AnswerInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
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

export default WB_Unit10_GerundRewrite_C;