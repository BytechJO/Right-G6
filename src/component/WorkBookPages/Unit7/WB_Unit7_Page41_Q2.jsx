/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit7AudioText, {
  stopWorkbookUnit7Audio,
  workbookUnit7AudioSequence,
} from "./WorkbookUnit7AudioText";

// بدّل المسارات للصور الفعلية
import imgA from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/9.svg";
import imgB from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/10.svg";
const BORDER = "#84ad40";

const CARDS = [
  {
    id: "A",
    img: imgA,
    example:
      "If we had planted more trees in our yard, we would have had more trees.",
  },
  {
    id: "B",
    img: imgB,
    example: "If I had more time this weekend, I would have watched a movie.",
  },
];

const LINES_PER_CARD = 4;

const initAnswers = () => {
  const a = {};
  CARDS.forEach(({ id }) => {
    for (let i = 0; i < LINES_PER_CARD; i++) {
      a[`${id}-${i}`] = "";
    }
  });
  return a;
};

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ fieldKey, value, onChange }) => (
  <input
    className="wb-unit7-input"
    type="text"
    value={value}
    onChange={(e) => onChange(fieldKey, e.target.value)}
    placeholder="Write your sentence"
    title="Write a third conditional sentence about the picture"
    aria-label={`Writing line ${fieldKey}`}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1.5px solid #aaa",
      outline: "none",
      background: "transparent",
      fontSize: "15px",
      color: "#333",
      paddingBottom: "3px",
      fontFamily: "inherit",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit7_ThirdConditional_E = () => {
  const audioFolder = "Page 41 - Exercise E";
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit7Audio();
    setAnswers(initAnswers());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Look at each picture and write a{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                third conditional
              </span>{" "}
              sentence.
            </>
          }
          subTitle="Check that the condition and result logically belong together, then write the full conditional sentence."
        />

        {/* Two Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "3em",
          }}
        >
          {CARDS.map(({ id, img, example }) => (
            <div
              key={id}
              style={{
                border: `2px solid ${BORDER}`,
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card label */}
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#000000ff",
                  margin: "10px 10px 0",
                  flexShrink: 0,
                  border: `2px solid ${BORDER}`,
                }}
              >
                {id}
              </div>

              {/* Image */}
              <div
                style={{
                  padding: "8px 12px",
                  width: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                }}
              >
                <img
                  src={img}
                  alt={
                    id === "A"
                      ? "A healthy tree growing in a yard"
                      : "A person checking a wristwatch"
                  }
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Example */}
              <div
                style={{
                  padding: "8px 14px",
                  fontSize: "14px",
                  color: "#333",
                  lineHeight: "1.5",
                }}
              >
                <WorkbookUnit7AudioText
                  src={workbookUnit7AudioSequence(
                    audioFolder,
                    id === "A"
                      ? ["Item_004_", "Item_006_"]
                      : ["Item_005_", "Item_007_"],
                  )}
                  ariaLabel={`Play example ${id}`}
                  style={{ display: "inline" }}
                  flowText
                >
                  <span style={{ fontWeight: "bold" }}>Example: </span>

                  {example}
                </WorkbookUnit7AudioText>
              </div>

              {/* 4 writing lines */}
              <div
                style={{
                  padding: "8px 14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  flex: 1,
                }}
              >
                {Array.from({ length: LINES_PER_CARD }).map((_, i) => (
                  <LineInput
                    key={i}
                    fieldKey={`${id}-${i}`}
                    value={answers[`${id}-${i}`]}
                    onChange={handleChange}
                  />
                ))}
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

export default WB_Unit7_ThirdConditional_E;
