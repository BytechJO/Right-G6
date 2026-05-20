import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page4_Q3 = () => {
  const questions = [
    {
      sentence: "Brittany's mom drove her to school.",
      answer: "Brittany's mom has driven her to school.",
    },
    {
      sentence: "The mail carrier delivered the mail.",
      answer: "The mail carrier has delivered the mail.",
    },
    {
      sentence: "The teacher tested the students.",
      answer: "The teacher has tested the students.",
    },
    {
      sentence: "The neighbor taught Erin.",
      answer: "The neighbor has taught Erin.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const [Shans, setShans] = useState(false);


  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,'']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((a) => !a.trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correctCount = 0;
    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);
      if (ok) correctCount++;
      return ok;
    });

    setResult(newResults);
    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setShans(true)
    setAnswers(questions.map((q) => q.answer));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>C</span>
          Change the sentences from the simple past to the <span style={{ color : "orange"}}>present perfect</span>  tense.
        </h5>

        {/* Questions */}
        <div className="flex flex-col gap-15 text-[18px]">
          {questions.map((q, i) => {
            const isWrong = result[i] === false;
            const isCorrect = result[i] === true;

            return (
              <div key={i} className="flex flex-col gap-2">
                {/* Original sentence */}
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[20px] min-w-[24px]">{i + 1}</span>
                  <span>{q.sentence}</span>
                </div>

                {/* Input line */}
                <div className="relative flex items-center" style={{ paddingLeft: "36px" }}>
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || isCorrect}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                      w-full border-0 border-b outline-none bg-transparent
                      text-[18px] font-semibold px-1
                      ${isWrong ? "border-[#D1232A]" : "border-black"}
                    `}
                    style={{
                      color: Shans ? "#ff0000ff" : "#333",
                    }}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit1_Page4_Q3;