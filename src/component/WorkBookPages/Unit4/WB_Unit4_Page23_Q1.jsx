import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// صورة الولد — بدّل المسار
import boyImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U4 Folder/SVG/2.svg";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    sentence: "Bruce sits in the chair.",
    answer: "simple present",
    prefilled: false,
  },
  {
    id: 2,
    sentence: "The light is fixed by the electrician.",
    answer: "present simple passive",
    prefilled: false,
  },
  {
    id: 3,
    sentence: "Natalie programs the computer.",
    answer: "simple present",
    prefilled: false,
  },
  {
    id: 4,
    sentence: "The letter is written by my grandpa.",
    answer: "present simple passive",
    prefilled: false,
  },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, answer, prefilled }) => {
    a[id] = prefilled ? answer : "";
  });
  return a;
};

// ─────────────────────────────────────────────
//  InlineInput — OUTSIDE parent
// ─────────────────────────────────────────────
const InlineInput = ({ qId, value, onChange, isCorrect, isWrong, disabled, prefilled }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "220px",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        fontWeight: prefilled ? "600" : isCorrect ? "600" : "400",
        color: prefilled
          ? "#333"
          : isCorrect
          ? "#c0392b"
          : isWrong
          ? "#D1232A"
          : "#333",
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

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const WB_Unit4_SimplePassive_D = () => {
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
    const hasEmpty = QUESTIONS.filter((q) => !q.prefilled)
      .some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer, prefilled }) => {
      if (prefilled) { nr[id] = true; correct++; return; }
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.filter((q) => !q.prefilled).length;
    const scored = Object.values(nr).filter(Boolean).length - 1; // -1 للـ prefilled
    const color = scored === total ? "green" : scored === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${scored} / ${total}</span></div>`;
    if (scored === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (scored === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>D</span>
          Read each sentence. Write{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>simple present</span>{" "}
          or{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>present simple passive</span>.
        </h5>

        {/* Questions + Image */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          margin: "4% 0",
        }}>
          {/* Questions list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1 }}>
            {QUESTIONS.map(({ id, sentence, answer, prefilled }) => {
              const isCorrect = result[id] === true;
              const isWrong   = result[id] === false;
              return (
                <div key={id} style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                  fontSize: "18px",
                  flexWrap: "wrap",
                }}>
                  <span style={{ fontWeight: "bold", minWidth: "20px" }}>{id}</span>
                  <span>{sentence}</span>
                  <InlineInput
                    qId={id}
                    value={answers[id]}
                    onChange={handleChange}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    disabled={locked || isCorrect || prefilled}
                    prefilled={prefilled}
                  />
                </div>
              );
            })}
          </div>

          {/* Boy image */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={boyImg}
              alt="boy sitting on chair"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
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

export default WB_Unit4_SimplePassive_D;