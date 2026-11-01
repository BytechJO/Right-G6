/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit8AudioText, {
  workbookUnit8Audio,
  stopWorkbookUnit8Audio,
} from "./WorkbookUnit8AudioText";

import helicopterImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 17.svg";

const audioFolder = "Page 45 - Exercise B";
const WORD_BANK = [
  ["peculiar", "Item_001_"], ["glows", "Item_002_"],
  ["remote control", "Item_003_"], ["helicopter", "Item_004_"],
  ["timer", "Item_007_"], ["tablet", "Item_005_"], ["skills", "Item_006_"],
];

const BLANKS = {
  1: { answer: "timer",      width: "160px" },
  2: { answer: "helicopter", width: "160px" },
  3: { answer: "skills",     width: "160px" },
  4: { answer: "peculiar",   width: "160px" },
};

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "" });

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(bId, e.target.value)}
      placeholder="Type the word"
      title="Type the word that completes the rhyme"
      aria-label={`Blank ${bId}: type the word that completes the rhyme`}
      style={{
        width,
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "1px",
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
const WB_Unit8_Rhyme_B = () => {
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

  const handleReset = () => { stopWorkbookUnit8Audio(); setAnswers(initAnswers()); setResult({}); setLocked(false); };

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

  const lineStyle = { fontSize: "18px", lineHeight: "1.6", color: "#333" };
  const numStyle  = { fontWeight: "bold", fontSize: "18px", minWidth: "22px" };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="B"
          title="Put the correct word in the blank to finish the rhyme."
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* Word Bank */}
        <div style={{
          border: "1px solid #84ad40",
          borderRadius: "8px",
          padding: "10px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 28px",
          marginBottom: "28px",
          marginTop: "28px",

          fontSize: "17px",
          color: "#333",
          justifyContent :"space-around"
        }}>
          {WORD_BANK.map(([word, audio]) => (
            <WorkbookUnit8AudioText key={word} src={workbookUnit8Audio(audioFolder, audio)} ariaLabel={`Play ${word}`}>
              {word}
            </WorkbookUnit8AudioText>
          ))}
        </div>

        {/* Body: rhymes + image */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "3em" }}>

          {/* Rhymes */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Rhyme 1 */}
            <WorkbookUnit8AudioText
              src={result[1] === true ? workbookUnit8Audio(audioFolder, "full1") : null}
              ariaLabel="Play the complete first rhyme"
              fullAudio
              style={{ display: "flex", gap: "8px", width: "fit-content", padding: "6px", borderRadius: "8px" }}
            >
              <span style={numStyle}>1</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_008_")} disabled={result[1] === true} flowText>I'll put on the </WorkbookUnit8AudioText>{B(1)}
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_009_")} disabled={result[1] === true} flowText> so we can hear.</WorkbookUnit8AudioText>
                </div>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_010_")} disabled={result[1] === true} flowText>That in one more hour will come my aunt so dear!</WorkbookUnit8AudioText>
                </div>
              </div>
            </WorkbookUnit8AudioText>

            {/* Rhyme 2 */}
            <WorkbookUnit8AudioText
              src={result[2] === true ? workbookUnit8Audio(audioFolder, "full2") : null}
              ariaLabel="Play the complete second rhyme"
              fullAudio
              style={{ display: "flex", gap: "8px", width: "fit-content", padding: "6px", borderRadius: "8px" }}
            >
              <span style={numStyle}>2</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_011_")} disabled={result[2] === true} flowText>I can hear the </WorkbookUnit8AudioText>{B(2)}
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_012_")} disabled={result[2] === true} flowText> flying overhead,</WorkbookUnit8AudioText>
                </div>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_013_")} disabled={result[2] === true} flowText>"I think it's going to the air show," my dad said.</WorkbookUnit8AudioText>
                </div>
              </div>
            </WorkbookUnit8AudioText>

            {/* Rhyme 3 */}
            <WorkbookUnit8AudioText
              src={result[3] === true ? workbookUnit8Audio(audioFolder, "full3") : null}
              ariaLabel="Play the complete third rhyme"
              fullAudio
              style={{ display: "flex", gap: "8px", width: "fit-content", padding: "6px", borderRadius: "8px" }}
            >
              <span style={numStyle}>3</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_014_")} disabled={result[3] === true} flowText>As a soccer player I need lots of </WorkbookUnit8AudioText>{B(3)}.
                </div>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_015_")} disabled={result[3] === true} flowText>It takes lots of hard work, but then the goals are the thrills!</WorkbookUnit8AudioText>
                </div>
              </div>
            </WorkbookUnit8AudioText>

            {/* Rhyme 4 */}
            <WorkbookUnit8AudioText
              src={result[4] === true ? workbookUnit8Audio(audioFolder, "full4") : null}
              ariaLabel="Play the complete fourth rhyme"
              fullAudio
              style={{ display: "flex", gap: "8px", width: "fit-content", padding: "6px", borderRadius: "8px" }}
            >
              <span style={numStyle}>4</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_016_")} disabled={result[4] === true} flowText>To school he brought a pencil, tablet, and ruler,</WorkbookUnit8AudioText>
                </div>
                <div style={lineStyle}>
                  <WorkbookUnit8AudioText src={workbookUnit8Audio(audioFolder, "Item_017_")} disabled={result[4] === true} flowText>But he also brought a turtle and that was </WorkbookUnit8AudioText>{B(4)}.
                </div>
              </div>
            </WorkbookUnit8AudioText>

          </div>

          {/* Helicopter Image */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={helicopterImg}
              alt="A helicopter flying in the sky"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
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

export default WB_Unit8_Rhyme_B;
