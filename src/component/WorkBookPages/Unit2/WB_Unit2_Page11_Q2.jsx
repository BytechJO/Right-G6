import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const story = `We had such a noisy but delightful celebration on Independence Day! First, our town had such an exciting parade that everyone who saw it thought it was the best ever. So many groups entered the parade that the police had to block off twice as many streets as last year! The parade was in the morning. In the afternoon, everyone met at the town park for such a fun picnic and barbecue that no one wanted to leave. Finally when it got dark, we left the park. We drove to the stadium for a fireworks show. It was so beautiful that we wanted to remember it forever. By the time we got home that night, I was so tired but thankful for such a great day. I think Independence Day might be my favorite holiday!`;

const questions = [
  {
    id: 1,
    question: "Which two adjectives does the writer use to tell about their celebration?",
    answer: "noisy, delightful.",
    prefilled: false,
  },
  {
    id: 2,
    question: "Why did the police have to block off extra streets?",
    answer: "There were so many groups that entered the parade.",
    prefilled: false,
  },
  {
    id: 3,
    question: "How did the writer feel when they got home?",
    answer: "She was very tired but thankful for the fun time.",
    prefilled: false,
  },
];

const WB_Unit2_Page11_D = () => {
  const init = () => ({ 1: "", 2: "", 3: "" });
  const [answers, setAnswers] = useState(init);
  const [result, setResult]   = useState({});
  const [locked, setLocked]   = useState(false);

 const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();
  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    if (!answers[1].trim() ||!answers[2].trim() || !answers[3].trim()) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const nr = {};
    [1 ,2, 3].forEach((id) => {
      const q = questions.find((q) => q.id === id);
      const ok = normalize(answers[id]) === normalize(q.answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = questions.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers({ 1: questions[0].answer ,2: questions[1].answer, 3: questions[2].answer });
    setResult({1:true  , 2: true, 3: true });
    setLocked(true);
  };

  const handleReset = () => { setAnswers(init()); setResult({}); setLocked(false); };

  const inputLine = (id) => {
    const isWrong   = result[id] === false;
    const isCorrect = result[id] === true;
    return (
      <span className="relative " style={{ flex: 1 }}>
        <input
          type="text"
          value={answers[id]}
          disabled={locked || isCorrect}
          onChange={(e) => handleChange(id, e.target.value)}
          autoComplete="false"
          style={{
            width: "100%", border: "none",
            borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#999"}`,
            outline: "none", background: "transparent",
            fontSize: "17px", color: "#333", paddingBottom: "3px",
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
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A" style={{ marginRight: "10px" }}>D</span>
          Read the story carefully. Then answer the questions that follow.
        </h5>

        {/* Story */}
        <div style={{
          fontSize: "16px", lineHeight: "1.9", color: "#333",
          marginBottom: "28px", textIndent: "2em",
        }}>
          {story}
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-7 mb-12" style={{ fontSize: "17px" }}>

      
          <div className="flex items-center gap-3">
            <span className="font-bold" style={{ minWidth: "20px" }}>1</span>
            <span style={{ whiteSpace: "nowrap" }}>{questions[0].question}</span>
          </div>
            {inputLine(1)}


          {/* Q2 */}
          <div className="flex items-center gap-3">
            <span className="font-bold" style={{ minWidth: "20px" }}>2</span>
            <span style={{ whiteSpace: "nowrap" }}>{questions[1].question}</span>
          </div>
            {inputLine(2)}

          {/* Q3 */}
          <div className="flex items-center gap-3">
            <span className="font-bold" style={{ minWidth: "20px" }}>3</span>
            <span style={{ whiteSpace: "nowrap" }}>{questions[2].question}</span>
          </div>
            {inputLine(3)}

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

export default WB_Unit2_Page11_D;