import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const QUESTIONS = [
  {
    id: 1,
    scrambled: " Mary/walk/two kilometers/to school",
    answer1: "Mary used to walk two kilometers to school.",
    prefilled: false,
  },
  {
    id: 2,
    scrambled: "The soccer players/practice/every day",
    answer1: "The soccer players used to practice every day.",
    prefilled: false,
  },
  {
    id: 3,
    scrambled: "My grandma/sew/all her clothes",
    answer1: "My grandma used to sew all her own clothes.",
    prefilled: false,
  },
  {
    id: 4,
    scrambled: "Steven/ride/a horse/to town",
    answer1: "Steven used to ride a horse to town.",
    prefilled: false,
  },
  {
    id: 5,
    scrambled: "Fran/have/a puppy/named/Spot",
    answer1: "Fran used to have a puppy named Spot.",
    prefilled: false,
  },

];

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,'''’]/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, answer1, answer2, prefilled }) => {
    a[`${id}-1`] = prefilled ? answer1 : "";
    a[`${id}-2`] = prefilled ? answer2 : "";
  });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({ fKey, value, onChange, isCorrect, isWrong, disabled, prefilled }) => (
  <span style={{ position: "relative", display: "block" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(fKey, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: prefilled ? "#333" : isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
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
const WB_Unit5_Unscramble_I = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev)  => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const inputQs = QUESTIONS.filter((q) => !q.prefilled);
    const hasEmpty = inputQs.some(({ id }) =>
      !answers[`${id}-1`].trim() || !answers[`${id}-2`].trim()
    );
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer1, answer2, prefilled }) => {
      if (prefilled) {
        nr[`${id}-1`] = true; nr[`${id}-2`] = true;
        correct += 2; return;
      }
      const ok1 = normalize(answers[`${id}-1`]) === normalize(answer1);
      const ok2 = normalize(answers[`${id}-2`]) === normalize(answer2);
      if (ok1) correct++;
      if (ok2) correct++;
      nr[`${id}-1`] = ok1;
      nr[`${id}-2`] = ok2;
    });
    setResult(nr);
    const total = QUESTIONS.filter((q) => !q.prefilled).length * 2;
    const scored = correct - 2; // -2 للـ prefilled
    const color = scored === total ? "green" : scored === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${scored} / ${total}</span></div>`;
    if (scored === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (scored === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, answer1, answer2 }) => {
      a[`${id}-1`] = answer1; a[`${id}-2`] = answer2;
      r[`${id}-1`] = true;   r[`${id}-2`] = true;
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8" style={{ whiteSpace : "nowrap"}}>
          <span className="ex-A" style={{ marginRight: "10px" }}>I</span>
Use the following sentence parts to make a sentence with <span style={ { color : "orange"}}>used to</span>.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, scrambled, prefilled }) => {
            const k1 = `${id}-1`;
            const k2 = `${id}-2`;
            return (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

                {/* Scrambled words */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px" }}>
                  <span style={{ fontWeight: "bold", minWidth: "20px" }}>{id}</span>
                  <span style={{ color: "#444", letterSpacing: "0.3px" }}>{scrambled}</span>
                </div>

                {/* Answer 1 */}
                <div style={{ paddingLeft: "28px" }}>
                  <AnswerInput
                    fKey={k1}
                    value={answers[k1]}
                    onChange={handleChange}
                    isCorrect={result[k1] === true}
                    isWrong={result[k1] === false}
                    disabled={locked || result[k1] === true || prefilled}
                    prefilled={prefilled}
                  />
                </div>


              </div>
            );
          })}
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

export default WB_Unit5_Unscramble_I;