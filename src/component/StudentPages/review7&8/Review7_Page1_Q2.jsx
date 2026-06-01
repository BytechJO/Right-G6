import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review7_Page1_Q2 = () => {
  const questions = [
    "stand out",
    "catch up",
    "It's been too long.",
    "You're a natural.",
    "Here I go.",
    "Now is your chance.",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.!?'"‘’“”]/g, "")
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

    const hasEmpty = answers.some((item) => !item.trim());

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
      "stand out",
      "catch up",
      "It's been too long.",
      "You're a natural.",
      "Here I go.",
      "Now is your chance.",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

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
        <h5 className="header-title-page8 mb-[7vh]">
          <span
            style={{
              marginRight: "20px",
            }}
          >
            B
          </span>
          Change one word in each expression below to make it correct. Rewrite
          the expression.
        </h5>

        <div className="flex flex-col gap-[6vh]">
          {/* 1 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">1</span>

            <span>stand in</span>

            <div className="flex-1">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">2</span>

            <span>catch down</span>

            <div className="flex-1">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">3</span>

            <span>It’s had too long ...</span>

            <div className="flex-1">{inputField(2)}</div>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">4</span>

            <span>You’re a normal!</span>

            <div className="flex-1">{inputField(3)}</div>
          </div>

          {/* 5 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">5</span>

            <span>Here I went.</span>

            <div className="flex-1">{inputField(4)}</div>
          </div>

          {/* 6 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">6</span>

            <span>Later is your chance.</span>

            <div className="flex-1">{inputField(5)}</div>
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

export default Review7_Page1_Q2;
