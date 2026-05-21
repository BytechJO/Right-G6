import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// صورة الهدف — بدّل المسار
import targetImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U4 Folder/SVG/1.svg";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const WORDS = [
  // عمود يسار
  { id: "qanutei",   scrambled: "QANUTEI",    answer: "antique",    groups: [7] },
  { id: "loecoc",    scrambled: "LOECOCTILN", answer: "collection", groups: [10] },
  { id: "reisnktt",  scrambled: "REISNKTT",   answer: "trinkets",   groups: [8] },
  { id: "cyhraer",   scrambled: "CYHRAER",    answer: "archery",    groups: [7] },
  { id: "svnoerius", scrambled: "SVNOERIUS",  answer: "souvenirs",  groups: [9] },
  { id: "seatlvr",   scrambled: "SEATLVR",    answer: "travels",    groups: [7] },
  // عمود يمين
  { id: "sutff",     scrambled: "SUTFF",      answer: "stuff",      groups: [5] },
  { id: "geiwsn",    scrambled: "GEIWSN",     answer: "sewing",     groups: [6] },
  { id: "rhrace",    scrambled: "RHRACE",     answer: "archer",     groups: [6] },
  { id: "redcav",    scrambled: "REDCAV",     answer: "carved",     groups: [6] },
  { id: "grane",     scrambled: "GRANE",      answer: "range",      groups: [5] },
  // كلمة متعددة: bow and arrow → groups [3, 3, 5]
  { id: "bwonad",    scrambled: "BWO NAD ROWRA", answer: "bow and arrow", groups: [3, 3, 5] },
];

const LEFT_IDS  = ["qanutei","loecoc","reisnktt","cyhraer","svnoerius","seatlvr"];
const RIGHT_IDS = ["sutff","geiwsn","rhrace","redcav","grane","bwonad"];

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().replace(/\s+/g, " ").trim();

// بناء initial state: { wordId: ["","","", ...] }
const initAnswers = () => {
  const a = {};
  WORDS.forEach(({ id, answer }) => {
    a[id] = answer.split("").map(() => "");
  });
  return a;
};

// ─────────────────────────────────────────────
//  LetterBox — OUTSIDE parent (no remount)
// ─────────────────────────────────────────────
const LetterBox = ({
  value, onChange, onKeyDown, inputRef,
  isCorrect, isWrong, disabled,
}) => (
  <input
    ref={inputRef}
    type="text"
    maxLength={2}
    value={value}
    disabled={disabled}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={(e) => e.target.select()}
    style={{
      width: "28px",
      height: "28px",
      border: `1.5px solid ${isWrong ? "#D1232A" : isCorrect ? "#84ad40" : "#84ad40"}`,
      borderRadius: "4px",
      background: isCorrect ? "#e8f5d0" : isWrong ? "#ffeaea" : "#fff",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "700",
      color: isCorrect ? "#2d6a0f" : isWrong ? "#D1232A" : "#333",
      outline: "none",
      padding: 0,
      textTransform: "lowercase",
      caretColor: "transparent",
    }}
  />
);

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const WB_Unit4_Unscramble_A = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});   // { wordId: true|false }
  const [locked,  setLocked]  = useState(false);

  // refs: { "wordId-letterIndex": inputEl }
  const refs = useRef({});
  const refKey = (id, i) => `${id}-${i}`;

  // ── handlers ──
  const handleChange = (id, idx, raw) => {
    if (locked || result[id] === true) return;
    const ch = raw.slice(-1).toLowerCase().replace(/[^a-z]/, "");
    setAnswers((prev) => {
      const arr = [...prev[id]];
      arr[idx] = ch;
      return { ...prev, [id]: arr };
    });
    setResult((prev) => ({ ...prev, [id]: undefined }));
    // auto-advance
    if (ch) {
      const next = refs.current[refKey(id, idx + 1)];
      if (next) { next.focus(); next.select(); }
    }
  };

  const handleKeyDown = (id, idx, e) => {
    if (e.key === "Backspace") {
      if (!answers[id][idx] && idx > 0) {
        const prev = refs.current[refKey(id, idx - 1)];
        if (prev) { prev.focus(); prev.select(); }
      }
    }
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = WORDS.some(({ id, answer }) =>
      answers[id].slice(0, answer.replace(/\s/g,"").length).some((c) => !c)
    );
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    WORDS.forEach(({ id, answer }) => {
      const userStr = answers[id].join("").toLowerCase();
      const ansStr  = answer.replace(/\s/g, "").toLowerCase();
      const ok = userStr === ansStr;
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = WORDS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {};
    const r = {};
    WORDS.forEach(({ id, answer }) => {
      a[id] = answer.replace(/\s/g, "").split("");
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  // ── render one word row ──
  const renderWord = (wordObj) => {
    const { id, scrambled, answer, groups } = wordObj;
    const isCorrect = result[id] === true;
    const isWrong   = result[id] === false;
    const letters   = answers[id];
    // انشاء مجموعات الخانات حسب groups
    let letterIdx = 0;
    const boxes = groups.map((groupLen, gi) => {
      const groupBoxes = [];
      for (let j = 0; j < groupLen; j++) {
        const li = letterIdx;
        groupBoxes.push(
          <LetterBox
            key={li}
            value={letters[li] || ""}
            isCorrect={isCorrect}
            isWrong={isWrong}
            disabled={locked || isCorrect}
            inputRef={(el) => (refs.current[refKey(id, li)] = el)}
            onChange={(e) => handleChange(id, li, e.target.value)}
            onKeyDown={(e) => handleKeyDown(id, li, e)}
          />
        );
        letterIdx++;
      }
      return (
        <div key={gi} style={{ display: "flex", gap: "3px" }}>
          {groupBoxes}
        </div>
      );
    });

    return (
      <div key={id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* الكلمة المشوشة */}
        <span style={{
          fontSize: "13px",
          fontWeight: "700",
          color: "#555",
          minWidth: "90px",
          whiteSpace  : "nowrap"
        }}>
          {scrambled}
        </span>
        {/* الخانات */}
        <div style={{ display: "flex", gap: "6px", }}>
          {boxes}
        </div>
        {/* badge خطأ */}
        {isWrong && (
          <span style={{
            width: "16px", height: "16px", background: "#ef4444", color: "white",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", fontWeight: "bold", flexShrink: 0,
          }}>✕</span>
        )}
      </div>
    );
  };

  const leftWords  = WORDS.filter((w) => LEFT_IDS.includes(w.id));
  const rightWords = WORDS.filter((w) => RIGHT_IDS.includes(w.id));

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          Unscramble each vocabulary word.
        </h5>

        {/* Two columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px 40px",
          marginBottom: "28px",
        }}>
          {/* عمود يسار */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {leftWords.map(renderWord)}
          </div>
          {/* عمود يمين */}
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {rightWords.map(renderWord)}
          </div>
        </div>

        {/* Target Image */}
        <div style={{ display: "flex", justifyContent: "center" , position : "relative" , top :"-50px"}}>
          <img
            src={targetImg}
            alt="target"
            style={{ width: "55%",height: "auto", objectFit: "contain" }}
          />
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

export default WB_Unit4_Unscramble_A;