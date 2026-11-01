/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit8AudioText, {
  workbookUnit8Audio,
  stopWorkbookUnit8Audio,
} from "./WorkbookUnit8AudioText";

// بدّل المسار للصورة الفعلية
import boyImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 19.svg";
const audioFolder = "Page 50 - Exercise K";

const WORD_BANK = ["come in handy", "a great idea", "show up", "in ages", "Here you are!"];

const QUESTIONS = [
  { id: 1, prompt: "a late idea", answer: "a great idea", width: "200px", audio: "Item_001_" },
  { id: 2, prompt: "Come in, Sandy.", answer: "come in handy", width: "190px", audio: "Item_003_" },
  { id: 3, prompt: "blow up", answer: "show up", width: "160px", audio: "Item_004_" },
  { id: 4, prompt: "on pages", answer: "in ages", width: "160px", audio: "Item_006_" },
  { id: 5, prompt: "We're too far!", answer: "Here you are!", width: "190px", audio: "Item_007_" },
];


const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ qId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      placeholder="Type the expression"
      title="Type the vocabulary expression that sounds like the prompt"
      aria-label={`Prompt ${qId}: type the matching vocabulary expression`}
      style={{
        width,
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "20px", height: "20px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit8_VocabExpression_K = () => {
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
    if (Object.values(answers).some((v) => !v.trim())) {
      ValidationAlert.info("Please complete all answers."); return;
    }
    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { stopWorkbookUnit8Audio(); setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="K"
          title="Write the vocabulary expression that sounds like each prompt."
          subTitle="Read the full phrase or sentence first, then choose the expression that sounds natural in that context."
        />

      
        {/* Body: questions + image */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", margin: "13vh 0" }}>

          {/* Questions */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "28px" }}>
            {QUESTIONS.map(({ id, prompt, width, audio }) => {
              const isCorrect = result[id] === true;
              const isWrong   = result[id] === false;
              return (
                <div key={id} style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                  fontSize: "18px",
                }}>
                  <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, audio)} ariaLabel={`Play ${prompt}`} style={{ whiteSpace: "nowrap" }}>
                    {prompt}
                  </WorkbookUnit8AudioText>
                  <InlineInput
                    qId={id}
                    value={answers[id]}
                    onChange={handleChange}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    disabled={locked || isCorrect}
                    width={width}
                  />
                </div>
              );
            })}
          </div>

          {/* Boy Image */}
          <div style={{ flexShrink: 0 , width: "40%" }}>
            <img
              src={boyImg}
              alt="A girl thinking of an idea"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
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

export default WB_Unit8_VocabExpression_K;
