/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit6AudioText, {
  stopWorkbookUnit6Audio,
  workbookUnit6Audio,
} from "./WorkbookUnit6AudioText";

const initAnswers = () => ({ 1: "", 2: "", 3: "" });

// ── FreeInput — OUTSIDE parent ──
const FreeInput = ({ qId, value, onChange, flex = true }) => (
  <input
    type="text"
    className="wb-unit6-input"
    value={value}
    onChange={(e) => onChange(qId, e.target.value)}
    placeholder="Write a complete sentence"
    title="Write a complete sentence using the vocabulary word"
    aria-label={`Sentence ${qId}`}
    style={{
      flex: flex ? 1 : undefined,
      width: flex ? undefined : "100%",
      border: "none",
      borderBottom: "1px solid #555",
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

// ── MAIN COMPONENT ──
const WB_Unit5_StatementOrTag_G = () => {
  const audioFolder = "Page 33 - Exercise C";
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit6Audio();
    setAnswers(initAnswers());
  };

  const rowStyle = {
    display: "flex",
    alignItems: "flex-end",
    gap: "6px",
    fontSize: "18px",
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="C"
          title="Use each vocabulary word in a sentence."
          subTitle="Use each vocabulary word in a complete sentence that clearly shows you understand its meaning."
        />

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px", margin: "15% 0 " }}>

          {/* 1: prefix + input + ? */}
          <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>1</span>
            <WorkbookUnit6AudioText
              src={workbookUnit6Audio(audioFolder, "Item_001_")}
              ariaLabel="Play familiar"
            >
              familiar:
            </WorkbookUnit6AudioText>
            <FreeInput qId={1} value={answers[1]} onChange={handleChange} />
          </div>

          {/* 2: input + suffix */}
       <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>2</span>
            <WorkbookUnit6AudioText
              src={workbookUnit6Audio(audioFolder, "Item_002_")}
              ariaLabel="Play success"
            >
              success:
            </WorkbookUnit6AudioText>
            <FreeInput qId={2} value={answers[2]} onChange={handleChange} />
          </div>


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

export default WB_Unit5_StatementOrTag_G;
