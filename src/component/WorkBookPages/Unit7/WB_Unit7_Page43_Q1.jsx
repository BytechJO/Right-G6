import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const STORY = `\tWhy did the dinosaurs disappear? Different scientists have different ideas. Some think that there was another Ice Age. If another Ice Age would have happened, the weather would have changed so much that most plants wouldn't have grown. The plant-eating animals wouldn't have been able to get enough food, and they would have died. If the plant-eating animals had all been dead, there wouldn't have been enough food for the meat-eating animals to eat, either. If there had been another Ice Age, that could have been the reason for the dinosaurs disappearing.
\tA more recent and popular idea that some scientists have about the dinosaurs disappearing is that a large asteroid might have hit the Earth. If an asteroid had hit the Earth, it could have changed many things. Tidal waves could have happened. Dust could have filled the skies and made the Earth colder. Fires could have been started, and the air could have been poisoned. If all of these things had happened, the dinosaurs could have died.`;

const QUESTIONS = [
  {
    id: 1,
    question: "What is one idea about how the dinosaurs might have disappeared?",
    answer: "If another Ice Age had happened, the dinosaurs could have died then.",
  },
  {
    id: 2,
    question: "What kinds of things would an Ice Age have caused?",
    answer: "The weather would have changed so much that most plants wouldn't have grown.",
  },
  {
    id: 3,
    question: "What is a second idea about how all of the dinosaurs died?",
    answer: "An asteroid might have hit the Earth causing dust to make the Earth colder, fires could have started, and the air could have been poisoned.",
  },
];

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

// ── Sub-components OUTSIDE parent ──

const AnswerInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <div style={{ position: "relative" }}>
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
  </div>
);

// ── Main Component ──

const WB_Unit_Dinosaurs_H = () => {
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
    const hasEmpty = QUESTIONS.some(({ id }) => !answers[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
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
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
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
          <span className="ex-A" style={{ marginRight: "10px" }}>H</span>
          Read the story and answer the questions.
        </h5>

        {/* Story box */}
        <div style={{
          border: `2px solid ${BORDER}`,
          borderRadius: "10px",
          padding: "16px 20px",
          fontSize: "15px",
          lineHeight: "1.85",
          color: "#333",
          marginBottom: "28px",
          whiteSpace: "pre-line",
        }}>
          {STORY}
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "3em" }}>
          {QUESTIONS.map((q) => (
            <div key={q.id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Question text */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>{q.id}</span>
                <span style={{ fontSize: "16px", color: "#333" }}>{q.question}</span>
              </div>

              {/* Answer input */}
              <div style={{ paddingLeft: "30px" }}>
                <AnswerInput
                  value={answers[q.id]}
                  onChange={(val) => handleChange(q.id, val)}
                  disabled={locked || result[q.id] === true}
                  isWrong={result[q.id] === false}
                  isCorrect={result[q.id] === true}
                />
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

export default WB_Unit_Dinosaurs_H;