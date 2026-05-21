import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية
import mapImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U4 Folder/SVG/3-cropped.svg";

const QUESTIONS = [
  {
    id: 1,
    prompt: "(maple syrup, Canada)",
    answer: "Maple syrup is made in Canada.",
    prefilled: false,
  },
  {
    id: 2,
    prompt: "(oil, Russia)",
    answer: "Oil is drilled (found) in Russia.",
    prefilled: false,
  },
  {
    id: 3,
    prompt: "(rice, Vietnam)",
    answer: "Rice is grown in Vietnam.",
    prefilled: false,
  },
  {
    id: 4,
    prompt: "(chocolate, Venezuela)",
    answer: "Chocolate is made in Venezuela.",
    prefilled: false,
  },
  {
    id: 5,
    prompt: "(diamonds, South Africa)",
    answer: "Diamonds are found in South Africa.",
    prefilled: false,
  },
  {
    id: 6,
    prompt: "(textiles, India)",
    answer: "Textiles are made in India.",
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

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ qId, value, onChange, isCorrect, isWrong, disabled, prefilled }) => (
  <span style={{ position: "relative", display: "inline-block", flex: 1 }}>
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
        fontSize: "17px",
        color: prefilled ? "#333" : isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
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
const WB_Unit4_CountriesMap_J = () => {
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
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>J</span>
          Some countries are known for what they make, eat, or do. Look at the map below, and
          then write{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>present simple passive</span>{" "}
          sentences about what each country is famous for.
        </h5>

        {/* Map Image */}
        <div style={{
          overflow: "hidden",
          marginBottom: "24px",
        }}>
          <img
            src={mapImg}
            alt="world map"
            style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, prompt, prefilled }) => {
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <div key={id} style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                fontSize: "17px",
              }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                <span style={{ whiteSpace: "nowrap", color: "#444" }}>{prompt}</span>
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

export default WB_Unit4_CountriesMap_J;