import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page7_G = () => {
  const questions = [
    { id: 1, before: "The taxi driver", verb: "drive", after: "the car.", answer: "has driven" },
    { id: 2, before: "Alicia",          verb: "give",  after: "a gift to her friend.", answer: "has given" },
    { id: 3, before: "Tommy",           verb: "play",  after: "the game very well.", answer: "has played" },
    { id: 4, before: "They",            verb: "bring", after: "a lovely cake.", answer: "have brought" },
    { id: 5, before: "I",               verb: "write", after: "a letter to Nancy.", answer: "have written" },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [result, setResult]   = useState([]);
  const [locked, setLocked]   = useState(false);

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    setResult((prev) => { const c = [...prev]; c[i] = undefined; return c; });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const newResult = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);
      if (ok) correct++;
      return ok;
    });
    setResult(newResult);
    const total = questions.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(questions.map(() => ""));
    setResult([]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          Complete each sentence using the <span style={ {color :"orange"}}>  present perfect</span>  tense.
        </h5>

        {/* Questions */}
        <div className="flex flex-col gap-17 text-[19px]">
          {questions.map((q, i) => {
            const isWrong   = result[i] === false;
            const isCorrect = result[i] === true;
            return (
              <div key={q.id} className="flex items-center gap-3 flex-wrap">
                <span className="font-bold min-w-[20px]">{q.id}</span>
                <span>{q.before}</span>

                {/* Input */}
                <span className="relative inline-block">
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || isCorrect}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                      w-[220px] border-0 border-b outline-none bg-transparent
                      text-[19px] px-1
                      ${isWrong ? "border-[#D1232A]" : "border-black"}
                    `}
                  />
                  {isWrong && (
                    <span style={{
                      position: "absolute", top: "-8px", right: "-8px",
                      width: "20px", height: "20px", background: "#ef4444", color: "white",
                      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: "bold", border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}>✕</span>
                  )}
                </span>

                {/* Verb hint */}
                <span style={{ color: "#555" }}>({q.verb})</span>
                <span>{q.after}</span>
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

export default WB_Unit1_Page7_G;