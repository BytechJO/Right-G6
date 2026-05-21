import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const WORD_BANK = ["go ahead", "speaking of", "years ago", "to my liking", "by the way"];

const ITEMS = [
  {
    id: 1,
    before: "",
    after: ", I saw you yesterday waiting for the school bus, but you didn't see me.",
    answer: "By the way",
  },
  {
    id: 2,
    before: "Student One: My uncle, believe it or not, used to be a clown in the circus!\nStudent Two:",
    after: "circuses, did you know there's one coming to town next week?",
    answer: "Speaking of",
  },
  {
    id: 3,
    before: "Snowboarding isn't really",
    after: ". I'm not the adventurous type.",
    answer: "to my liking",
  },
  {
    id: 4,
    before: "Please",
    after: "and help yourself to the cookies and milk. I put it there so you could have some when you got hungry or thirsty.",
    answer: "go ahead",
  },
  {
    id: 5,
    before: "Oh, we moved to this house",
    after: ".",
    answer: "years ago",
  },
];

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
        width: "180px",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
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
        width: "18px", height: "18px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── Main Component ──

const WB_Unit_Expressions_K = () => {
  const [answers, setAnswers] = useState(() => {
    const a = {};
    ITEMS.forEach(({ id }) => { a[id] = ""; });
    return a;
  });
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev)  => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = ITEMS.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    ITEMS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = ITEMS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    ITEMS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    const a = {};
    ITEMS.forEach(({ id }) => { a[id] = ""; });
    setAnswers(a); setResult({}); setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>K</span>
          Complete each sentence by writing the correct expression.
        </h5>

        {/* Word Bank */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          margin: "2em 0",
        }}>
          {WORD_BANK.map((w) => (
            <span key={w} style={{
              border: `1.5px solid ${BORDER}`,
              borderRadius: "10px",
              padding: "6px 18px",
              fontSize: "15px",
              fontWeight: "500",
              color: "#333",
            }}>
              {w}
            </span>
          ))}
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "3em" }}>
          {ITEMS.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>
                {item.id}
              </span>
              <span style={{ fontSize: "16px", color: "#333", whiteSpace: "pre-line" }}>
                {item.before && item.before + " "}
              </span>
              <InlineInput
                value={answers[item.id]}
                onChange={(val) => handleChange(item.id, val)}
                disabled={locked || result[item.id] === true}
                isWrong={result[item.id] === false}
                isCorrect={result[item.id] === true}
              />
              <span style={{ fontSize: "16px", color: "#333" }}>
                {item.after && " " + item.after}
              </span>
            </div>
          ))}
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

export default WB_Unit_Expressions_K;