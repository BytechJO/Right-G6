import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page6_E = () => {
  const questions = [
    {
      scrambled: "grandma I visited have my.",
      answer: "I have visited my grandma.",
    },
    {
      scrambled: "have to mall gone a We.",
      answer: "We have gone to a mall.",
    },
    {
      scrambled: "ridden haven't bicycles They their.",
      answer: "They haven't ridden their bicycles.",
    },
    {
      scrambled: "has lunch eaten Susan her.",
      answer: "Susan has eaten her lunch.",
    },
    {
      scrambled: "his has taken books Ben school to?",
      answer: "Has Ben taken his books to school?",
    },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

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
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>E</span>
          Unscramble the <span style={{color : "orange"}}>present perfect</span>  sentences.
        </h5>

        {/* Questions */}
        <div className="flex flex-col gap-4 text-[18px]" style={ {marginBottom:"3em"}}>
          {questions.map((q, i) => {
            const isWrong = result[i] === false;
            const isCorrect = result[i] === true;

            return (
              <div
                key={i}
           style={{
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "23px",
boxShadow: "6px 6px 14px rgba(0,0,0,0.2)",
}}
              >
                {/* Scrambled sentence */}
                <div className="flex items-center gap-3">
                  <span className="font-bold min-w-[20px]">{i + 1}</span>
                  <span>{q.scrambled}</span>
                </div>

                {/* Answer input */}
                <div className="relative" style={{ paddingLeft: "28px" }}>
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || isCorrect}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                      w-full border-0 border-b outline-none bg-transparent
                      text-[18px] font-semibold px-1 mb-3
                      ${isWrong ? "border-[#D1232A]" : "border-black"}
                    `}
                  />
                  {isWrong && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "20px",
                        height: "20px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
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

export default WB_Unit1_Page6_E;