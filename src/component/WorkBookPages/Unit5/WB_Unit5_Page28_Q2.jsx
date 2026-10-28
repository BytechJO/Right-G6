/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit5AudioText, {
  stopWorkbookUnit5Audio,
  workbookUnit5Audio,
} from "./WorkbookUnit5AudioText";

const QUESTIONS = [
  {
    id: 1,
    info: "The Statue of Liberty's index finger is eight feet long.",
    audio: [],
    prefilled: null,
  },
  {
    id: 2,
    info: "Most 75-year-old people will have slept about 23 years.",
    audio: ["Item_001_"],
    prefilled: null,
  },
  {
    id: 3,
    info: 'The word "set" has the most number of definitions in the English language.',
    audio: ["Item_003_", "Item_002_"],
    prefilled: null,
  },
  {
    id: 4,
    info: "Sharks can live up to 100 years.",
    audio: ["Item_004_"],
    prefilled: null,
  },
  {
    id: 5,
    info: "Mosquitos are more attracted to the color blue than any other color.",
    audio: ["Item_005_"],
    prefilled: null,
  },
  {
    id: 6,
    info: "The largest recorded snowflake fell in Montana in 1887.",
    audio: ["Item_006_"],
    prefilled: null,
  },
];

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, prefilled }) => {
    a[id] = prefilled || "";
  });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({ qId, value, onChange, disabled }) => (
  <input
    className="wb-unit5-input"
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(qId, e.target.value)}
    placeholder="Write the statement and question tag"
    title="Use the fact to make a statement and a question tag"
    aria-label={`Statement and question tag ${qId}`}
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
  const audioFolder = "Page 28 - Exercise D";
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit5Audio();
    setAnswers(initAnswers());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-10">
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Use each fact to make a statement and a{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                question tag
              </span>
              .
            </>
          }
          subTitle="Build the statement first, then choose the opposite-polarity tag with the correct auxiliary and pronoun."
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, info, audio, prefilled }) => (
            <div
              key={id}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {/* Info sentence */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "18px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>
                  {id}
                </span>
                <WorkbookUnit5AudioText
                  src={audio.map((prefix) =>
                    workbookUnit5Audio(audioFolder, prefix),
                  )}
                  ariaLabel={`Play fact ${id}`}
                  style={{ color: "#333" }}
                >
                  {info}
                </WorkbookUnit5AudioText>
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
