import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit8_Page6_Q3 = () => {
  const questions = [
    '"I will be at the library tonight."',
    '"I want to come with you?"',
    'The officer said, "I will get you home safely."',
    'Andrea said, "There is a carnival at school today."',
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,“”"']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (index, value) => {
    if (locked || result[index] === true) return;

    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((answer) => !answer.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((answer, index) => {
      const correct = normalize(answer) === normalize(questions[index]);

      if (correct) correctCount++;

      return correct;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers([
      '"I will be at the library tonight."',
      '"I want to come with you?"',
      'The officer said, "I will get you home safely."',
      'Andrea said, "There is a carnival at school today."',
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative block w-full">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
        className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1

          ${result[index] === false ? "border-[#D1232A]" : ""}
        `}
        style={{
          borderBottomWidth: "1px",
        }}
      />

      {result[index] === false && (
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
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px]">
        <h5 className="header-title-page8 mb-[8vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Using the sentences from Exercise E, write direct quotes of what the
          people said. Remember to use quotation marks (“...”) at the beginning
          and ending of the quote.
        </h5>

        <div className="flex flex-col gap-[10vh]">
          {/* 1 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">1</span>

              <span>John said,</span>

              <div className="flex-1">{inputField(0)}</div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">2</span>

              <span>Did Carly say,</span>

              <div className="flex-1">{inputField(1)}</div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">3</span>

              <div className="flex-1">{inputField(2)}</div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">4</span>

              <div className="flex-1">{inputField(3)}</div>
            </div>
          </div>
        </div>
      </div>

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

export default Unit8_Page6_Q3;
