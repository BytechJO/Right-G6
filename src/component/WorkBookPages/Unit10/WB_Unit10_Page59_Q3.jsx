import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit10AudioText, {
  workbookUnit10Audio,
} from "./WorkbookUnit10AudioText";

const QUESTIONS = [
  { id: 1, keywords: "love / learn / students", prefilled: null },
  { id: 2, keywords: "enjoy / go / museum", prefilled: null },
  { id: 3, keywords: "prefer / rent / movies", prefilled: null },
  { id: 4, keywords: "hate / cross / busy street", prefilled: null },
];

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, prefilled }) => {
    a[id] = prefilled || "";
  });
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
      <div className="div-forall gap-7">
        {/* Title */}
        <ExerciseHeader
          sectionLetter="G"
          title="Change each verb into a gerund and use it in a sentence after the stative verb."
          subTitle="Identify the stative verb first, then change the activity to a gerund without changing the original meaning."
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {QUESTIONS.map(({ id, keywords, prefilled }) => (
            <div
              key={id}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {/* Keywords line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "18px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>
                  {id}
                </span>
                <WorkbookUnit10AudioText
                  src={workbookUnit10Audio(
                    "Page 59 - Exercise G",
                    `Item_${String(id).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play prompt ${id}`}
                  style={{ color: "#333" }}
                >
                  {keywords}
                </WorkbookUnit10AudioText>
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
