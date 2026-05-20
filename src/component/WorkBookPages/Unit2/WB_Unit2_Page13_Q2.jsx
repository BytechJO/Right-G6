import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const questions = [
  { id: 1, before: "Come", after: "!", answer: "along", prefilled: true },
  { id: 2, before: "It looks", after: "so ...", answer: "It looks", prefilled: true },
  { id: 3, before: "I am still not", after: "sure ...", answer: "I am still not", prefilled: true },
  { id: 4, before: "Where's your", after: "?", answer: "sense of adventure", prefilled: true },
];


const QUESTIONS = [
  { id: 1, before: "Come", after: "!", answer: "along" },
  { id: 2, before: "", after: "so ...", answer: "It looks" },
  { id: 3, before: "", after: "sure ...", answer: "I am still not" },
  { id: 4, before: "Where's your", after: "?", answer: "sense of adventure" },
];

const WB_Unit2_Page12_G = () => {
  const init = () => QUESTIONS.map(() => "");
  const [answers, setAnswers] = useState(init);
  const [result,  setResult]  = useState([]);
  const [locked,  setLocked]  = useState(false);

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((prev) => { const a = [...prev]; a[i] = value; return a; });
    setResult((prev)  => { const r = [...prev]; r[i] = undefined; return r; });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const nr = answers.map((a, i) => {
      const ok = normalize(a) === normalize(QUESTIONS[i].answer);
      if (ok) correct++;
      return ok;
    });
    setResult(nr);
    const total = QUESTIONS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(QUESTIONS.map((q) => q.answer));
    setResult(QUESTIONS.map(() => true));
    setLocked(true);
  };

  const handleReset = () => { setAnswers(init()); setResult([]); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          Complete each expression.
        </h5>

        {/* Questions */}
        <div className="flex flex-col gap-16 my-10">
          {QUESTIONS.map((q, i) => {
            const isWrong   = result[i] === false;
            const isCorrect = result[i] === true;
            return (
              <div key={q.id} className="flex items-center gap-3" style={{ fontSize: "20px" }}>
                <span className="font-bold" style={{ minWidth: "24px" }}>{q.id}</span>

                {q.before && <span>{q.before}</span>}

                {/* Input */}
                <span className="relative" style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || isCorrect}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#999"}`,
                      outline: "none",
                      background: "transparent",
                      fontSize: "20px",
                      color: "#333",
                      paddingBottom: "3px",
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

                {q.after && <span style={{ whiteSpace: "nowrap" }}>{q.after}</span>}
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

export default WB_Unit2_Page12_G;