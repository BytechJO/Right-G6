import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit10AudioText, { workbookUnit10Audio } from "./WorkbookUnit10AudioText";

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
        <ExerciseHeader sectionLetter="C" title="Rewrite each sentence by changing the present progressive verb into a gerund after a stative verb." subTitle="Identify the stative verb first, then change the activity to a gerund without changing the original meaning." />

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px", margin: "2em 0" }}>
          {QUESTIONS.map(({ id, sentence }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Original sentence */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "19px" }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                <WorkbookUnit10AudioText src={workbookUnit10Audio("Page 58 - Exercise C", `Item_${String(id).padStart(3, "0")}_`)} ariaLabel={`Play sentence ${id}`} flowText>{sentence}</WorkbookUnit10AudioText>
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
