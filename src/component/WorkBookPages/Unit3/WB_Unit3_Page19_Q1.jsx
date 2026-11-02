/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3WorkbookAudioText, {
  stopWorkbookUnit3Audio,
  workbookUnit3Audio,
} from "./Unit3WorkbookAudioText";

const SENTENCES = [
  { id: 1, prefix: "If I had", prefilled: null},
  { id: 2, prefix: "If I went to",  prefilled: null },
  { id: 3, prefix: "If I had",      prefilled: null },
  { id: 4, prefix: "If I saw",      prefilled: null },
  { id: 5, prefix: "If I didn't have to", prefilled: null },
];

const initAnswers = () => {
  const a = {};
  SENTENCES.forEach(({ id, prefilled }) => {
    a[`${id}-line1`] = prefilled || "";
    a[`${id}-line2`] = "";
  });
  return a;
};

// ── Sub-components defined OUTSIDE parent to prevent remount on render ──

const LineInput = ({ value, onChange, disabled, style = {} }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    placeholder="complete the sentence"
    title="Complete the second conditional sentence"
    aria-label="Complete the sentence starter"
    className="wb-unit3-answer"
    onChange={(e) => onChange(e.target.value)}
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
      minWidth: 0,
      ...style,
    }}
  />
);

const FullLineInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="continue your answer"
    title="Continue your second conditional sentence"
    aria-label="Continue the sentence"
    className="wb-unit3-answer"
    style={{
      width: "100%",
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

// ── Main Component ──

const WB_Unit_SecondConditional_G = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit3Audio();
    setAnswers(initAnswers());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <ExerciseHeader
          sectionLetter="G"
          title={<>Complete each sentence starter with a <span style={{ color: "orange" }}>second conditional</span> sentence about what you might do.</>}
          subTitle="Check that the condition and result logically belong together, then write the full conditional sentence."
        />

        {/* Sentences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "3em" }}>
          {SENTENCES.map(({ id, prefix, prefilled }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Line 1: prefix + input */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>
                  {id}
                </span>
                <Unit3WorkbookAudioText
                  src={workbookUnit3Audio(
                    "Page 19 - Exercise G",
                    `Item_${String(id).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play sentence starter ${id}`}
                  style={{ fontSize: "17px", whiteSpace: "nowrap" }}
                >
                  {prefix}
                </Unit3WorkbookAudioText>
                <LineInput
                  value={answers[`${id}-line1`]}
                  disabled={!!prefilled}
                  onChange={(val) => handleChange(`${id}-line1`, val)}
                  style={{ color: prefilled ? "#c0392b" : "#333" }}
                />
              </div>

              {/* Line 2: full blank line */}
              <div style={{ paddingLeft: "28px" }}>
                <FullLineInput
                  value={answers[`${id}-line2`]}
                  onChange={(val) => handleChange(`${id}-line2`, val)}
                />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reset only — Students' answers will vary */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit_SecondConditional_G;
