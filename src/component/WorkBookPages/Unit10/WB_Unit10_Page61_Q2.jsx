import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const WORD_BANK = ["seashells", "occupied", "sandcastles", "surfing", "sunscreen", "sunburn"];

const LINES = [
  { id: 0,  text: "Susan likes going to the beach.",                                        blank: false },
  { id: 1,  before: "She loves picking up the",     after: "within her reach.",             blank: true, answer: "seashells"   },
  { id: 2,  before: "She loves building",           after: "with sand on the beach.",       blank: true, answer: "sandcastles" },
  { id: 3,  before: "She dislikes",                 after: "in the ocean because she likes to stay on land.", blank: true, answer: "surfing" },
  { id: 4,  before: "She always put on",            after: "to protect herself from the sun,", blank: true, answer: "sunscreen" },
  { id: 5,  before: "She doesn't want to get a",   after: "because she would miss so much fun.", blank: true, answer: "sunburn" },
  { id: 6,  before: "Being at the beach keeps Susan", after: ".",                           blank: true, answer: "occupied"   },
  { id: 7,  text: "She can play in the sand or go on a boat ride.",                         blank: false },
];

const blankLines = LINES.filter((l) => l.blank);

const initAnswers = () => {
  const a = {};
  blankLines.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

// ── Sub-components OUTSIDE parent ──

const InlineInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "200px",
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
        margin: "0 6px",
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
  </span>
);

// ── Main Component ──

const WB_Unit_Rhyme_K = () => {
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
    const hasEmpty = blankLines.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    blankLines.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = blankLines.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    blankLines.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
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
          <span className="ex-A" style={{ marginRight: "10px" }}>K</span>
          Use a vocabulary word to complete the rhyme.
        </h5>

        {/* Word Bank */}
        <div style={{
          border: `1.5px solid ${BORDER}`,
          borderRadius: "8px",
          padding: "12px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "28px",
        }}>
          {WORD_BANK.map((w) => (
            <span key={w} style={{ fontSize: "16px", color: "#333" }}>{w}</span>
          ))}
        </div>

        {/* Poem lines */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "3em",
          fontSize: "16px",
          lineHeight: "1.8",
          color: "#333",
        }}>
          {LINES.map((line) => {
            if (!line.blank) {
              return (
                <p key={line.id} style={{ margin: 0 }}>{line.text}</p>
              );
            }
            return (
              <p key={line.id} style={{ margin: 0 }}>
                {line.before}
                <InlineInput
                  value={answers[line.id]}
                  onChange={(val) => handleChange(line.id, val)}
                  disabled={locked || result[line.id] === true}
                  isWrong={result[line.id] === false}
                  isCorrect={result[line.id] === true}
                />
                {line.after}
              </p>
            );
          })}
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

export default WB_Unit_Rhyme_K;