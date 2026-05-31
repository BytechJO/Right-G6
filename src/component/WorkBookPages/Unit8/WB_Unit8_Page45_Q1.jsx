import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ── بدّل المسارات للصور الفعلية ──
import imgNighttime    from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/1.svg";
import imgHelicopter   from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/2.svg";
import imgTableLamp    from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/3.svg";
import imgGlows        from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/4.svg";
import imgTablet       from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/5.svg";
import imgTimer        from"../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 6.svg";
import imgRemote       from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 7.svg";
import imgMemo         from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 8.svg";
import imgCanOpener    from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 9.svg";
import imgWireless     from"../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 10.svg";
import imgGadget       from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 11.svg";
import imgElectric     from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 12.svg";

const BORDER = "#84ad40";

const WORD_BANK = [
  { label: "a", word: "timer" },
  { label: "b", word: "table lamp" },
  { label: "c", word: "glows" },
  { label: "d", word: "tablet" },
  { label: "e", word: "helicopter" },
  { label: "f", word: "nighttime" },
  { label: "g", word: "gadget" },
  { label: "h", word: "can opener" },
  { label: "i", word: "remote control" },
  { label: "j", word: "electric" },
  { label: "k", word: "memo holder" },
  { label: "l", word: "wireless" },
];

// 12 صور في صفين (6×2)
const PICS = [
  { id: 1,  img: imgNighttime,  answer: "f" },
  { id: 2,  img: imgHelicopter, answer: "e" },
  { id: 3,  img: imgTableLamp,  answer: "b" },
  { id: 4,  img: imgGlows,      answer: "c" },
  { id: 5,  img: imgTablet,     answer: "d" },
  { id: 6,  img: imgTimer,      answer: "a" },
  { id: 7,  img: imgRemote,     answer: "i" },
  { id: 8,  img: imgMemo,       answer: "k" },
  { id: 9,  img: imgCanOpener,  answer: "h" },
  { id: 10, img: imgWireless,   answer: "l" },
  { id: 11, img: imgGadget,     answer: "g" },
  { id: 12, img: imgElectric,   answer: "j" },
];


const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  PICS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── PicInput — OUTSIDE parent ──
const PicInput = ({ picId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "block" }}>
    <input
      type="text"
      maxLength={1}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(picId, e.target.value.toLowerCase())}
      style={{
        width: "100%",
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        fontWeight: "700",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        textAlign: "center",
        fontFamily: "inherit",
        padding: "4px 0",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-6px", right: "4px",
        width: "14px", height: "14px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit8_ReadChooseMatch_A = () => {
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
    PICS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = PICS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    PICS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  const row1 = PICS.slice(0, 6);
  const row2 = PICS.slice(6);

  const renderCell = ({ id, img }) => {
    const isCorrect = result[id] === true;
    const isWrong   = result[id] === false;
    return (
      <div key={id} style={{
        border: `1px solid ${BORDER}`,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}>
        {/* Image */}
        <img
          src={img}
          alt={`pic ${id}`}
          style={{
            width: "100%",
            height: "110px",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Input area */}
        <div style={{
          borderTop: `1px solid ${BORDER}`,
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
        }}>
          <PicInput
            picId={id}
            value={answers[id]}
            onChange={handleChange}
            isCorrect={isCorrect}
            isWrong={isWrong}
            disabled={locked || isCorrect}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          Read, choose, and match.
        </h5>

        {/* Word Bank */}
        <div style={{
          border: `2px solid #84ad40`,
          borderRadius: "6px",
          padding: "12px 16px",
          marginBottom: "16px",
          marginTop: "16px",

          fontSize: "16px",
          color: "#333",
        }}>
          <div style={{ display: "flex", justifyContent :"flex-start", flexWrap: "wrap", gap: "4px 32px", marginBottom: "4px" }}>
            {WORD_BANK.map(({ label, word }) => (
              <span key={label}><strong>{label}</strong> {word}</span>
            ))}
          </div>

        </div>

        {/* Picture Grid */}
        <div style={{
          border: `1.5px solid ${BORDER}`,
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "3em",
        }}>
          {/* Row 1 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            borderBottom: `1.5px solid ${BORDER}`,
          }}>
            {row1.map(renderCell)}
          </div>
          {/* Row 2 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
          }}>
            {row2.map(renderCell)}
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

export default WB_Unit8_ReadChooseMatch_A;