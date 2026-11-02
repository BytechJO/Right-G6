/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";

// بدّل المسار للصورة الفعلية
import notebookImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 1.svg";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit9AudioText, {
  stopWorkbookUnit9Audio,
  workbookUnit9Audio,
} from "./WorkbookUnit9AudioText";

const audioFolder = "Page 51 - Exercise A";

const WORD_BANK = ["discuss", "classmates", "novel", "perhaps"];

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "" });

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ lineId, value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(lineId, e.target.value)}
    placeholder={`Write a sentence using ${WORD_BANK[lineId - 1]}`}
    title={`Write a complete sentence using ${WORD_BANK[lineId - 1]}`}
    aria-label={`Sentence ${lineId} using ${WORD_BANK[lineId - 1]}`}
    className="workbook-unit9-input"
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
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit9_VocabSentences_A = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit9Audio();
    setAnswers(initAnswers());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="A"
          title="Use each vocabulary word in a sentence."
          subTitle="Use each vocabulary word in a complete sentence that clearly shows you understand its meaning."
        />

        {/* Word Bank */}
        <div style={{
          border: "2px solid #84ad40",
          borderRadius: "8px",
          padding: "10px 24px",
          display: "flex",
          gap: "32px",
          marginBottom: "28px",
          fontSize: "17px",
          color: "#333",
          justifyContent: "space-around",
        }}>
          {WORD_BANK.map((word, index) => (
            <WorkbookUnit9AudioText
              key={word}
              src={workbookUnit9Audio(audioFolder, `Item_${String(index + 1).padStart(3, "0")}_`)}
              ariaLabel={`Play ${word}`}
              flowText
            >
              {word}
            </WorkbookUnit9AudioText>
          ))}
        </div>

        {/* Lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "20px" }}>
          {[1, 2, 3, 4].map((id) => (
            <div key={id} style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              fontSize: "17px",
            }}>
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
              <LineInput lineId={id} value={answers[id]} onChange={handleChange} />
            </div>
          ))}
        </div>

        {/* Notebook image */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3em" }}>
          <img
            src={notebookImg}
            alt="An orange notebook with a black elastic band"
            style={{
              width: "280px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
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

export default WB_Unit9_VocabSentences_A;
