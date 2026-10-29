/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit7AudioText, {
  stopWorkbookUnit7Audio,
  workbookUnit7Audio,
} from "./WorkbookUnit7AudioText";

const ITEMS = [
  { id: 1, prompt: "If I had been born 100 years ago," },
  { id: 2, prompt: "If I had lived in Antarctica," },
  { id: 3, prompt: "If I had gone to college when I was eight," },
  { id: 4, prompt: "If I had ordered a 10-scoop ice cream cone," },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

const LineInput = ({ value, onChange, itemId }) => (
  <input
    className="wb-unit7-input"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Write what you might do"
    title="Write a complete conditional sentence"
    aria-label={`Your response for item ${itemId}`}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "16px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
    }}
  />
);

const WB_Unit_ThirdConditional_D = () => {
  const audioFolder = "Page 41 - Exercise D";
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit7Audio();
    setAnswers(initAnswers());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-7">
        <ExerciseHeader
          sectionLetter="D"
          title="If the following things happened to you, write what you might do."
          subTitle="Check that the condition and result logically belong together, then write the full conditional sentence."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "45px",
            marginBottom: "3em",
          }}
        >
          {ITEMS.map(({ id, prompt }) => (
            <div
              key={id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Prompt */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    minWidth: "20px",
                  }}
                >
                  {id}
                </span>
                <WorkbookUnit7AudioText
                  src={workbookUnit7Audio(
                    audioFolder,
                    `Item_${String(id).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play sentence ${id}`}
                  style={{ fontSize: "16px", color: "#333" }}
                >
                  {prompt}
                </WorkbookUnit7AudioText>
              </div>

              {/* Answer line */}
              <div style={{ paddingLeft: "30px" }}>
                <LineInput
                  value={answers[id]}
                  onChange={(val) => handleChange(id, val)}
                  itemId={id}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit_ThirdConditional_D;
