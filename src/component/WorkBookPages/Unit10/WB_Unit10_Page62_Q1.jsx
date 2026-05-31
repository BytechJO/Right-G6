import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import beachImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U10 Folder/SVG/Asset 12.svg";

const BORDER = "#84ad40";

const WORD_BANK = [
  "seashells", "sunscreen", "sandcastles", "dozens", "occupied",
];
const WORD_BANKq = [
  "necessary", "surfboard", "surfing", "sunburn", "rent",
];
// Paragraph split into segments — blank: true means input field
const SEGMENTS = [
  { id: null,  text: "Do you like going to the beach? Do you like to stay on the sand and collect ", blank: false },
  { id: 1,     answer: "seashells",   blank: true },
  { id: null,  text: " and build ",                                                                  blank: false },
  { id: 2,     answer: "sandcastles", blank: true },
  { id: null,  text: ", or do you like to play water sports? There are ",                            blank: false },
  { id: 3,     answer: "dozens",      blank: true },
  { id: null,  text: " of things you can do to keep yourself ",                                      blank: false },
  { id: 4,     answer: "occupied",    blank: true },
  { id: null,  text: " at the beach. You can try fun water sports, like waterskiing, ",              blank: false },
  { id: 5,     answer: "surfing",     blank: true },
  { id: null,  text: ", and sailing. You can ",                                                      blank: false },
  { id: 6,     answer: "rent",        blank: true },
  { id: null,  text: " all the ",                                                                    blank: false },
  { id: 7,     answer: "necessary",   blank: true },
  { id: null,  text: " equipment, like a sailboat or a ",                                            blank: false },
  { id: 8,     answer: "surfboard",   blank: true },
  { id: null,  text: " from a rental place at the beach. Don't forget to put on lots of ",           blank: false },
  { id: 9,     answer: "sunscreen",   blank: true },
  { id: null,  text: "! You wouldn't want to go back home with a ",                                  blank: false },
  { id: 10,    answer: "sunburn",     blank: true },
  { id: null,  text: " from the hot sun.",                                                           blank: false },
];

const blankSegments = SEGMENTS.filter((s) => s.blank);

const initAnswers = () => {
  const a = {};
  blankSegments.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

// ── Sub-components OUTSIDE parent ──

const InlineInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "130px",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
        margin: "0 2px",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "16px", height: "16px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)", zIndex: 2,
      }}>✕</span>
    )}
  </span>
);

// ── Main Component ──

const WB_Unit_FillBlank_L = () => {
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
    const hasEmpty = blankSegments.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    blankSegments.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = blankSegments.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    blankSegments.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers()); setResult({}); setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>L</span>
          Fill in each blank with the correct vocabulary word.
        </h5>

        {/* Word Bank */}
        <div style={{
          margin: "5vh 0 2vh 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "24px",
          justifyContent: "space-between",
        }}>
          {WORD_BANK.map((w) => (
            <span key={w} style={{
              border: `1.5px solid ${BORDER}`,
              borderRadius: "6px",
              padding: "5px 14px",
              fontSize: "15px",
              color: "#333",
              
              width : "100px",
              justifyContent:"center",
            }}>
              {w}
            </span>
          ))}
        </div>
    {/* Word Bank */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "24px",
          justifyContent: "space-between",

        }}>
          {WORD_BANKq.map((w) => (
            <span key={w} style={{
              display:"flex"  ,
              border: `1.5px solid ${BORDER}`,
              borderRadius: "6px",
              padding: "5px 14px",
              fontSize: "15px",
              color: "#333",
              width : "100px",
              justifyContent:"center",
            }}>
              {w}
            </span>
          ))}
        </div>

        {/* Paragraph + image */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "3em" }}>

          {/* Text paragraph */}
          <div style={{
            flex: 1,
            fontSize: "16px",
            lineHeight: "2.2",
            color: "#333",
          }}>
            {SEGMENTS.map((seg, i) =>
              seg.blank ? (
                <InlineInput
                  key={i}
                  value={answers[seg.id]}
                  onChange={(val) => handleChange(seg.id, val)}
                  disabled={locked || result[seg.id] === true}
                  isWrong={result[seg.id] === false}
                  isCorrect={result[seg.id] === true}
                />
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </div>

          {/* Beach image */}
          <img
            src={beachImg}
            alt="beach"
            style={{
              width: "220px",
              height: "auto",
              objectFit: "contain",
              flexShrink: 0,
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />

        </div>

      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit_FillBlank_L;