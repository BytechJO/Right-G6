/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit5AudioText, {
  stopWorkbookUnit5Audio,
  workbookUnit5Audio,
} from "./WorkbookUnit5AudioText";

const initAnswers = () => ({ 1: "", 2: "", 3: "" });

// ── FreeInput — OUTSIDE parent ──
const FreeInput = ({ qId, value, onChange, flex = true }) => (
  <input
    className="wb-unit5-input"
    type="text"
    value={value}
    onChange={(e) => onChange(qId, e.target.value)}
    placeholder="Complete the item"
    title="Write the missing statement or question tag"
    aria-label={`Missing statement or question tag ${qId}`}
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
  const audioFolder = "Page 29 - Exercise G";
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit5Audio();
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
          sectionLetter="G"
          title="Write either a statement or a question tag to complete each item."
          subTitle="Build the statement first, then choose the opposite-polarity tag with the correct auxiliary and pronoun."
        />

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px", margin: "10% 0 " }}>

          {/* 1: prefix + input + ? */}
          <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>1</span>
            <WorkbookUnit5AudioText
              src={workbookUnit5Audio(audioFolder, "Item_001_")}
              ariaLabel="Play Her mother is very kind"
              style={{ whiteSpace: "nowrap" }}
            >
              Her mother is very kind,
            </WorkbookUnit5AudioText>
            <FreeInput qId={1} value={answers[1]} onChange={handleChange} />
            <span>?</span>
          </div>

          {/* 2: input + suffix */}
          <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>2</span>
            <FreeInput qId={2} value={answers[2]} onChange={handleChange} />
            <WorkbookUnit5AudioText
              src={workbookUnit5Audio(audioFolder, "Item_002_")}
              ariaLabel="Play aren't they"
              style={{ whiteSpace: "nowrap" }}
            >
              , aren't they?
            </WorkbookUnit5AudioText>
          </div>

          {/* 3: prefix + input + ? */}
          <div style={rowStyle}>
            <span style={{ fontWeight: "bold", minWidth: "22px" }}>3</span>
            <WorkbookUnit5AudioText
              src={workbookUnit5Audio(audioFolder, "Item_003_")}
              ariaLabel="Play Peter does not like pizza"
              style={{ whiteSpace: "nowrap" }}
            >
              Peter does not like pizza,
            </WorkbookUnit5AudioText>
            <FreeInput qId={3} value={answers[3]} onChange={handleChange} />
            <span>?</span>
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
