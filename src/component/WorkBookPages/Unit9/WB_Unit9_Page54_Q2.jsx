/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";

// بدّل المسار للصورة الفعلية (الجدول + صورة الكرات)
import chartImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 27 (4).svg";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit9AudioText, {
  stopWorkbookUnit9Audio,
  workbookUnit9Audio,
} from "./WorkbookUnit9AudioText";

const audioFolder = "Page 54 - Exercise G";

const initAnswers = () => ({
  // جملة 1 prefilled — سطرين
  "1a": "",
  "1b": "",
  // جمل 2,3,4 — سطرين لكل
  "2a": "",
  "2b": "",
  "3a": "",
  "3b": "",
  "4a": "",
  "4b": "",
});

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ fKey, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(fKey, e.target.value)}
    placeholder="Write a sentence"
    title={`Complete ${fKey.startsWith("1") ? "Stuart" : fKey.startsWith("2") ? "Amanda" : fKey.startsWith("3") ? "Beth" : "Joe"}'s sentence`}
    aria-label={`Sentence line ${fKey}`}
    className="workbook-unit9-input"
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
      textDecoration: disabled ? "underline" : "none",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit9_SurveyChart_G = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit9Audio();
    setAnswers(initAnswers());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="G"
          title={
            <>
              Use the survey chart to write a sentence about each classmate in
              the{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                present perfect progressive
              </span>
              .
            </>
          }
          subTitle="Read the survey row by row and write one present-perfect-progressive sentence for each classmate using the checked sports."
        />

        {/* Chart + balls image */}
        <div style={{ marginBottom: "24px", position: "relative" }}>
          <img
            src={chartImg}
            alt="Sports survey chart for Stuart, Amanda, Beth, and Joe covering soccer, volleyball, baseball, and basketball"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
          {[
            ["Item_001_", "Play soccer ", 14, 9, 11, 20],
            ["Item_008_", "Play volleyball", 25, 9, 14, 20],
            ["Item_002_", "Play baseball", 40, 9, 13, 20],
            ["Item_003_", "Play basketball", 55, 9, 14, 20],
            ["Item_006_", "Play Stuart", 1, 32, 14, 14],
            ["Item_007_", "Play Amanda", 1, 46, 14, 14],
            ["Item_004_", "Play Beth", 1, 61, 14, 14],
            ["Item_005_", "Play Joe", 1, 75, 14, 14],
          ].map(([prefix, label, left, top, width, height]) => (
            <WorkbookUnit9AudioText
              key={label}
              src={workbookUnit9Audio(audioFolder, prefix)}
              ariaLabel={label}
              className="workbook-unit9-choice"
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
                borderRadius: 8,
              }}
            >
              <span className="sr-only">{label}</span>
            </WorkbookUnit9AudioText>
          ))}
        </div>

        {/* Sentences */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginBottom: "3em",
          }}
        >
          {/* Sentence 1 — prefilled two lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                fontSize: "17px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>1</span>
              <span style={{ whiteSpace: "nowrap" }}>
                <WorkbookUnit9AudioText
                  src={workbookUnit9Audio(audioFolder, "Item_006_")}
                  ariaLabel="Play Stuart"
                  className="workbook-unit9-choice"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Stuart
                </WorkbookUnit9AudioText>
              </span>

              <LineInput
                fKey="1a"
                value={answers["1a"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput
                fKey="1b"
                value={answers["1b"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
          </div>

          {/* Sentence 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                fontSize: "17px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>2</span>
              <span style={{ whiteSpace: "nowrap" }}>
                <WorkbookUnit9AudioText
                  src={workbookUnit9Audio(audioFolder, "Item_007_")}
                  ariaLabel="Play Amanda"
                  className="workbook-unit9-choice"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Amanda
                </WorkbookUnit9AudioText>
              </span>
              <LineInput
                fKey="2a"
                value={answers["2a"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput
                fKey="2b"
                value={answers["2b"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
          </div>

          {/* Sentence 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                fontSize: "17px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>3</span>
              <span style={{ whiteSpace: "nowrap" }}>
                <WorkbookUnit9AudioText
                  src={workbookUnit9Audio(audioFolder, "Item_004_")}
                  ariaLabel="Play Beth"
                  className="workbook-unit9-choice"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Beth
                </WorkbookUnit9AudioText>
              </span>
              <LineInput
                fKey="3a"
                value={answers["3a"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput
                fKey="3b"
                value={answers["3b"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
          </div>

          {/* Sentence 4 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                fontSize: "17px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>4</span>
              <span style={{ whiteSpace: "nowrap" }}>
                <WorkbookUnit9AudioText
                  src={workbookUnit9Audio(audioFolder, "Item_005_")}
                  ariaLabel="Play Joe"
                  className="workbook-unit9-choice"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  Joe
                </WorkbookUnit9AudioText>
              </span>
              <LineInput
                fKey="4a"
                value={answers["4a"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
            <div style={{ paddingLeft: "30px" }}>
              <LineInput
                fKey="4b"
                value={answers["4b"]}
                onChange={handleChange}
                disabled={false}
              />
            </div>
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

export default WB_Unit9_SurveyChart_G;
