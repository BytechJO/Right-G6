/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit5AudioText, {
  stopWorkbookUnit5Audio,
  workbookUnit5Audio,
} from "./WorkbookUnit5AudioText";

const QUESTIONS = [
  { id: 1, tag: "doesn't he?", audio: "Item_001_", prefilled: null },
  { id: 2, tag: "won't he?", audio: "Item_002_", prefilled: null },
  { id: 3, tag: "can't she?", audio: "Item_003_", prefilled: null },
  { id: 4, tag: "are they?", audio: "Item_004_", prefilled: null },
  { id: 5, tag: "couldn't you?", audio: "Item_005_", prefilled: null },
  { id: 6, tag: "will she?", audio: "Item_006_", prefilled: null },
];

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, prefilled }) => {
    a[id] = prefilled || "";
  });
  return a;
};

// ── FreeInput — OUTSIDE parent ──
const FreeInput = ({ qId, value, onChange, disabled }) => (
  <input
    className="wb-unit5-input"
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(qId, e.target.value)}
    placeholder="Write a matching statement"
    title="Write a statement that matches the question tag"
    aria-label={`Statement ${qId}`}
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
  const audioFolder = "Page 28 - Exercise C";
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
          sectionLetter="C"
          title={
            <>
              Write a sentence that matches the given{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                question tag
              </span>
              .
            </>
          }
          subTitle="Write the full statement before adding the tag, then check that the auxiliary and pronoun match the statement."
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, tag, audio, prefilled }) => (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                fontSize: "18px",
              }}
            >
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
              <WorkbookUnit5AudioText
                src={workbookUnit5Audio(audioFolder, audio)}
                ariaLabel={`Play question tag ${id}`}
                style={{ whiteSpace: "nowrap", color: "#333" }}
              >
                , {tag}
              </WorkbookUnit5AudioText>
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
