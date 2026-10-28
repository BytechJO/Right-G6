/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit5AudioText, {
  stopWorkbookUnit5Audio,
  workbookUnit5Audio,
} from "./WorkbookUnit5AudioText";

// بدّل المسار للصورة الفعلية
import booksImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/2-cropped (2).svg";

const BLANKS = {
  1: { answer: "bookworm",       width: "180px" },
  2: { answer: "opinion",        width: "180px" },
  3: { answer: "science fiction",width: "180px" },
  4: { answer: "comedy",         width: "180px" },
  5: { answer: "boss",           width: "180px" },
};

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "", 5: "" });

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
    <input
      className="wb-unit5-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(bId, e.target.value)}
      placeholder="Vocabulary word"
      title="Enter the vocabulary word that completes the rhyme"
      aria-label={`Rhyme blank ${bId}`}
      style={{
        width,
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
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
        width: "16px", height: "16px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit5_Rhyme_B = () => {
  const audioFolder = "Page 27 - Exercise B";
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
    const hasEmpty = Object.values(answers).some((v) => !v.trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    Object.entries(BLANKS).forEach(([id, { answer }]) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = Object.keys(BLANKS).length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    Object.entries(BLANKS).forEach(([id, { answer }]) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit5Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  const audioLine = (prefix, text, label) => (
    <WorkbookUnit5AudioText
      src={workbookUnit5Audio(audioFolder, prefix)}
      ariaLabel={label}
    >
      {text}
    </WorkbookUnit5AudioText>
  );

  // shorthand
  const B = (id) => (
    <InlineInput
      bId={id}
      value={answers[id]}
      onChange={handleChange}
      isCorrect={result[id] === true}
      isWrong={result[id] === false}
      disabled={locked || result[id] === true}
      width={BLANKS[id].width}
    />
  );

  const lineStyle = { fontSize: "18px", lineHeight: "1.5", color: "#333" };
  const numStyle  = { fontWeight: "bold", fontSize: "18px", minWidth: "22px", marginTop: "2px" };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="B"
          title="Use a vocabulary word to finish each rhyme."
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* Body: rhymes + image */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", margin: "1em 0" }}>

          {/* Rhymes */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Rhyme 1 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>1</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  {audioLine("Item_001_", "I love books, so I'm a", "Play rhyme 1 first line")} {B(1)},
                </div>
                <div style={lineStyle}>
                  {audioLine("Item_002_", "But if I read for too long, I'll start to squirm.", "Play rhyme 1 second line")}
                </div>
              </div>
            </div>

            {/* Rhyme 2 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>2</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  {audioLine("Item_003_", "If you ask Jessica for her", "Play rhyme 2 first line")} {B(2)},
                </div>
                <div style={lineStyle}>
                  {audioLine("Item_004_", "About which kind of books are the best.", "Play rhyme 2 second line")}
                </div>
                <div style={lineStyle}>
                  {audioLine("Item_005_", "She'll undoubtedly tell you", "Play rhyme 2 third line")} {B(3)},
                </div>
                <div style={lineStyle}>
                  {audioLine("Item_006_", "She doesn't care for all the rest.", "Play rhyme 2 fourth line")}
                </div>
              </div>
            </div>

            {/* Rhyme 3 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>3</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  {audioLine("Item_007_", "If you can sing a melody,", "Play rhyme 3 first line")}
                </div>
                <div style={lineStyle}>
                  {audioLine("Item_008_", "Then I'll do a funny", "Play rhyme 3 second line")} {B(4)},
                </div>
              </div>
            </div>

            {/* Rhyme 4 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>4</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  {audioLine("Item_009_", "First I'll have to ask my", "Play rhyme 4 first line")} {B(5)},
                </div>
                <div style={lineStyle}>
                  {audioLine("Item_010_", "And I hope he doesn't get very mad, or cross.", "Play rhyme 4 second line")}
                </div>
              </div>
            </div>

          </div>

          {/* Books Image */}
          <div style={{ flexShrink: 0 , alignSelf : "end" }}>
            <img
              src={booksImg}
              alt="A tall stack of books"
              style={{ width: "60%", height: "auto", objectFit: "contain" }}
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

export default WB_Unit5_Rhyme_B;
