import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit10AudioText, {
  workbookUnit10Audio,
} from "./WorkbookUnit10AudioText";

const ITEMS = [
  { id: 1, prefix: "I like" },
  { id: 2, prefix: "I prefer" },
  { id: 3, prefix: "I dislike" },
  { id: 4, prefix: "I enjoy" },
  { id: 5, prefix: "I hate" },
  { id: 6, prefix: "I don't mind" },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

// ── Sub-components OUTSIDE parent ──

const LineInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      flex: 1,
      border: "none",
      borderBottom: "1.5px solid #555",
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

// ── Main Component ──

const WB_Unit_LikesDisikes_J = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="J"
          title="Complete each sentence with what you like and dislike. Use stative verbs and gerunds."
          subTitle="After each stative verb, write an activity as a gerund and make sure the sentence expresses your own preference clearly."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "45px",
          }}
        >
          {ITEMS.map(({ id, prefix }) => (
            <div
              key={id}
              style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
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
              <WorkbookUnit10AudioText
                src={workbookUnit10Audio(
                  "Page 61 - Exercise J",
                  `Item_${String(id).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play ${prefix}`}
                style={{
                  fontSize: "18px",
                  color: "#333",
                  whiteSpace: "nowrap",
                }}
              >
                {prefix}
              </WorkbookUnit10AudioText>
              <LineInput
                value={answers[id]}
                onChange={(val) => handleChange(id, val)}
              />
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

export default WB_Unit_LikesDisikes_J;
