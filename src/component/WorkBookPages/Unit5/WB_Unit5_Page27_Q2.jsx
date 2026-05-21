import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

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
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "", 5: "" });

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(bId, e.target.value)}
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

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

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

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>B</span>
          Use a vocabulary word to finish the rhyme.
        </h5>

        {/* Body: rhymes + image */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", margin: "1em 0" }}>

          {/* Rhymes */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Rhyme 1 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>1</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  I love books, so I'm a {B(1)},
                </div>
                <div style={lineStyle}>
                  But if I read for too long, I'll start to squirm.
                </div>
              </div>
            </div>

            {/* Rhyme 2 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>2</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  If you ask Jessica for her {B(2)},
                </div>
                <div style={lineStyle}>
                  About which kind of books are the best.
                </div>
                <div style={lineStyle}>
                  She'll undoubtedly tell you {B(3)},
                </div>
                <div style={lineStyle}>
                  She doesn't care for all the rest.
                </div>
              </div>
            </div>

            {/* Rhyme 3 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>3</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  If you can sing a melody,
                </div>
                <div style={lineStyle}>
                  Then I'll do a funny {B(4)},
                </div>
              </div>
            </div>

            {/* Rhyme 4 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={numStyle}>4</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={lineStyle}>
                  First I'll have to ask my {B(5)},
                </div>
                <div style={lineStyle}>
                  And I hope he doesn't get very mad, or cross.
                </div>
              </div>
            </div>

          </div>

          {/* Books Image */}
          <div style={{ flexShrink: 0 , alignSelf : "end" }}>
            <img
              src={booksImg}
              alt="stack of books"
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