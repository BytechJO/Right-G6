import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const QUESTIONS = [
  {
    id: 1,
    sentence: "My dad told me he was going to the store today.",
    answer: `Dad said, "I am going to the store today."`,
    prefilled: false,
  },
  {
    id: 2,
    sentence: "My brother said he would be going with us on the hike.",
    answer: `"I will go with you on the hike," he said.`,
    prefilled: false,
  },
  {
    id: 3,
    sentence: "Carly told us she will visit Grandma soon.",
    answer: `"I will visit Grandma soon," said Carly.`,
    prefilled: false,
  },
  {
    id: 4,
    sentence: "Sarah told him that she wasn't studying at the library today.",
    answer: `"I'm not studying at the library today," said Sarah.`,
    prefilled: false,
  },
];


const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();


const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, answer, prefilled }) => {
    a[id] = prefilled ? answer : "";
  });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({ qId, value, onChange, isCorrect, isWrong, disabled, prefilled }) => (
  <div style={{ position: "relative" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: prefilled ? "#333" : isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect || prefilled ? "500" : "400",
        paddingBottom: "3px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "18px", height: "18px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </div>
);

// ── MAIN COMPONENT ──
const WB_Unit8_ReportedToDirectSpeech_F = () => {
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
      if (prefilled) { nr[id] = true; return; }
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.filter((q) => !q.prefilled).length;
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

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>F</span>
          Change each{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>reported speech</span>{" "}
          given below to a{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>direct speech</span>.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "55px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, sentence, prefilled }) => {
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Original sentence */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "19px" }}>
                  <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                  <span>{sentence}</span>
                </div>
                {/* Answer input */}
                <div style={{ paddingLeft: "32px" }}>
                  <AnswerInput
                    qId={id}
                    value={answers[id]}
                    onChange={handleChange}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    disabled={locked || isCorrect || prefilled}
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

export default WB_Unit8_ReportedToDirectSpeech_F;