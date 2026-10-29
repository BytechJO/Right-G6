/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit7AudioText, {
  stopWorkbookUnit7Audio,
  workbookUnit7Audio,
  workbookUnit7AudioSequence,
} from "./WorkbookUnit7AudioText";

import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/6.svg";
import img7 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U7 Folder/SVG/7.svg";

const BORDER = "#84ad40";

const CELLS = [
  {
    id: 1, img: img1, answer: "background", prefilled: false,
    specialLabel: true, // عرض النص الخاص مع input للطالب
  },
  { id: 2, img: img2, answer: "stencils",     prefilled: false },
  { id: 3, img: img3, answer: "strokes",      prefilled: false },
  { id: 4, img: img4, answer: "combinations", prefilled: false },
  { id: 5, img: img5, answer: "silly",        prefilled: false },
  { id: 6, img: img6, answer: "flatter",      prefilled: false },
  { id: 7, img: img7, answer: "ability",      prefilled: false },
];

const IMAGE_ALTS = {
  1: "A colorful painted background for a picture",
  2: "Hands using stencils to make a design",
  3: "A paintbrush making green strokes",
  4: "The numbers one and two combined",
  5: "A child making a silly face",
  6: "Friends giving someone a compliment",
  7: "A climber saying that she can do it",
};

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  CELLS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── PicInput — OUTSIDE parent ──
const PicInput = ({ cellId, value, onChange, isCorrect, isWrong, disabled, prefilled }) => (
  <span style={{ position: "relative", display: "block" }}>
    <input
      className="wb-unit7-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(cellId, e.target.value)}
      placeholder="Type the word"
      title="Type the vocabulary word shown by the picture"
      aria-label={`Vocabulary word for picture ${cellId}`}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#888"}`,
        outline: "none",
        background: "transparent",
        fontSize: "15px",
        color: prefilled ? "#c0392b" : isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: prefilled || isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "50%", right: "-8px", transform: "translateY(-50%)",
        width: "20px", height: "20px", background: "red", color: "white",
        borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit7_VocabPictures_B = () => {
  const audioFolder = "Page 39 - Exercise B";
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev)  => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = CELLS.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    CELLS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = CELLS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    CELLS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit7Audio();
    setAnswers(initAnswers()); setResult({}); setLocked(false);
  };

  // صفين: [1,2,3,4] و [5,6,7]
  const row1 = CELLS.slice(0, 4);
  const row2 = CELLS.slice(4);

  const renderCell = (cell) => {
    const { id, img, prefilled, specialText, specialLabel } = cell;
    const isCorrect = result[id] === true;
    const isWrong   = result[id] === false;
    return (
      <div key={id} style={{
        border: `1.5px solid ${BORDER}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 8px 10px",
        gap: "8px",
        background: "#fff",
        minWidth: 0,
      }}>
        {/* Image */}
        <img
          src={img}
          alt={IMAGE_ALTS[id]}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
            display: "block",
          }}
        />

        {/* Cell 1: special label with student input */}
        {specialLabel && (
          <div style={{ textAlign: "center", fontSize: "15px", color: "#333", width: "100%", lineHeight: "1.8" }}>
            <WorkbookUnit7AudioText
              src={workbookUnit7Audio(audioFolder, "Item_001_")}
              ariaLabel="Play This would be the"
            >
              This would be the
            </WorkbookUnit7AudioText>
            <PicInput
              cellId={id}
              value={answers[id]}
              onChange={handleChange}
              isCorrect={isCorrect}
              isWrong={isWrong}
              disabled={locked || isCorrect}
              prefilled={false}
            />
            <WorkbookUnit7AudioText
              src={workbookUnit7Audio(audioFolder, "Item_002_")}
              ariaLabel="Play for a picture"
            >
              for a picture.
            </WorkbookUnit7AudioText>
          </div>
        )}

        {/* Special static text */}
        {specialText && !specialLabel && (
          <div style={{ textAlign: "center", lineHeight: "1.6" }}>
            {specialText}
          </div>
        )}

        {/* Normal input */}
        {!specialText && !specialLabel && (
          <div style={{ width: "100%", paddingTop: "4px" }}>
            <PicInput
              cellId={id}
              value={answers[id]}
              onChange={handleChange}
              isCorrect={isCorrect}
              isWrong={isWrong}
              disabled={locked || isCorrect || prefilled}
              prefilled={prefilled}
            />
          </div>
        )}
        {id === 5 && (
          <WorkbookUnit7AudioText
            src={workbookUnit7Audio(audioFolder, "Item_003_")}
            ariaLabel="Play You're so nice"
            style={{ fontSize: "14px" }}
          >
            Play the picture text
          </WorkbookUnit7AudioText>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="B"
          title="Write the vocabulary word for each picture."
          subTitle="Name the picture first, then type the exact unit vocabulary word and check the spelling."
        />

        {/* Grid */}
        <div style={{
          border: `1.5px solid ${BORDER}`,
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "3em",
        }}>
          {/* Row 1 — 4 cells */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: `1.5px solid ${BORDER}`,
          }}>
            {row1.map(renderCell)}
          </div>

          {/* Row 2 — silly(1) | flatter(2) | ability(1) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}>
            {/* Cell 5: silly */}
            {renderCell(row2[0])}

            {/* Cell 6: flatter — spans 2 columns */}
            {(() => {
              const cell = row2[1];
              const { id, img, prefilled, specialText } = cell;
              const isCorrect = result[id] === true;
              const isWrong   = result[id] === false;
              return (
                <div key={id} style={{
                  gridColumn: "span 2",
                  border: `1.5px solid ${BORDER}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 8px",
                  gap: "8px",
                  background: "#fff",
                  minWidth: 0,
                }}>
                  <img
                    src={img}
                    alt={IMAGE_ALTS[id]}
                    style={{
                      width: "60%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "4px",
                      display: "block",
                    }}
                  />
                  {specialText && (
                    <div style={{ textAlign: "center", lineHeight: "1.6" }}>{specialText}</div>
                  )}
                  {!specialText && (
                    <div style={{ width: "60%", paddingTop: "4px" }}>
                      <PicInput
                        cellId={id}
                        value={answers[id]}
                        onChange={handleChange}
                        isCorrect={isCorrect}
                        isWrong={isWrong}
                        disabled={locked || isCorrect || prefilled}
                        prefilled={prefilled}
                      />
                    </div>
                  )}
                  <WorkbookUnit7AudioText
                    src={workbookUnit7AudioSequence(audioFolder, ["Item_004_", "Item_005_"])}
                    ariaLabel="Play the compliments in this picture"
                    style={{ fontSize: "14px" }}
                  >
                    Play the picture text
                  </WorkbookUnit7AudioText>
                </div>
              );
            })()}

            {/* Cell 7: ability */}
            {renderCell(row2[2])}
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit7_VocabPictures_B;
