import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    prompt: "we/see/Eiffel Tower",
    before: "If we had traveled to Paris,",
    after: null,
    answer: "we would have seen the Eiffel Tower.",
    prefilled: false,
  },
  {
    id: 2,
    prompt: "he/make/cookies",
    before: "If Warren had known the party was tomorrow,",
    after: null,
    answer: "he would have made cookies.",
    prefilled: false,
  },
  {
    id: 3,
    prompt: "police/not/let/him/go",
    before: null,
    after: "if they had known he was guilty.",
    answer: "The police wouldn't have let him go,",
    prefilled: false,
  },
  {
    id: 4,
    prompt: "I/do/better",
    before: null,
    after: "if I had studied more.",
    answer: "I would have done better,",
    prefilled: false,
  },
];

const inputItems = ITEMS.filter((i) => !i.prefilled);

const initAnswers = () => {
  const a = {};
  inputItems.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

// ── Sub-components OUTSIDE parent ──

const AnswerInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <span style={{ position: "relative", display: "inline-block", flex: 1, minWidth: "180px" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
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

const WB_Unit_ThirdConditional_G = () => {
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
    const hasEmpty = inputItems.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    inputItems.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = inputItems.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    inputItems.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers()); setResult({}); setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          The "if" clause is given for the sentences. Complete each sentence to make it{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>third conditional</span>.
        </h5>

        <div style={{ display: "flex", flexDirection: "column", gap: "45px", marginBottom: "3em" }}>
          {ITEMS.map((item) => (
            <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Prompt */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>{item.id}</span>
                <span style={{ fontSize: "16px", color: "#333" }}>{item.prompt}</span>
              </div>

              {/* Answer row */}
              <div style={{
                paddingLeft: "30px",
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                flexWrap: "wrap",
              }}>
                {/* before text */}
                {item.before && (
                  <span style={{ fontSize: "16px", color: "#333", whiteSpace: "nowrap" }}>
                    {item.before}
                  </span>
                )}

                {/* input or prefilled */}
                {item.prefilled ? (
                  <span style={{
                    fontSize: "16px",
                    color: "#333",
                    borderBottom: "1.5px solid #555",
                    textDecoration: "underline",
                    paddingBottom: "2px",
                  }}>
                    {item.answer}
                  </span>
                ) : (
                  <AnswerInput
                    value={answers[item.id]}
                    onChange={(val) => handleChange(item.id, val)}
                    disabled={locked || result[item.id] === true}
                    isWrong={result[item.id] === false}
                    isCorrect={result[item.id] === true}
                  />
                )}

                {/* after text */}
                {item.after && (
                  <span style={{ fontSize: "16px", color: "#333", whiteSpace: "nowrap" }}>
                    {item.after}
                  </span>
                )}
              </div>

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

export default WB_Unit_ThirdConditional_G;