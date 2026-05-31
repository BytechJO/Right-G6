import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review8_Page2_Q1 = () => {
  const correctAnswers = [
    "Mom said that I would be late for school.",
    "My sister said that she wanted to eat a piece of the apple pie.",
    "Ben said that we could go to the theater and watch a movie together.",
    "Grandma said that I could do great on the test if I studied hard enough.",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!?'""]/g, "")
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
    const hasEmpty = answers.some((item) => !item.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((answer, index) => {
      const correct = normalize(answer) === normalize(correctAnswers[index]);

      if (correct) correctCount++;

      return correct;
    });

    setResult(newResults);

    const total = correctAnswers.length;

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
      "Mom said that I would be late for school.",
      "My sister said that she wanted to eat a piece of the apple pie.",
      "Ben said that we could go to the theater and watch a movie together.",
      "Grandma said that I could do great on the test if I studied hard enough.",
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
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        <h5 className="header-title-page8 mb-[10vh]">
          <span
            style={{
              marginRight: "20px",
            }}
          >
            D
          </span>
          Change each quote to reported speech.
        </h5>

        <div className="flex flex-col gap-[6vh]">
          {/* 1 */}
          <div>
            <div className="mb-4">
              <span className="font-bold mr-4">1</span>
              Mom said, “You will be late for school!”
            </div>

            {inputField(0)}
          </div>

          {/* 2 */}
          <div>
            <div className="mb-4">
              <span className="font-bold mr-4">2</span>
              My sister said, “I want to eat a piece of this apple pie.”
            </div>

            {inputField(1)}
          </div>

          {/* 3 */}
          <div>
            <div className="mb-4">
              <span className="font-bold mr-4">3</span>
              Ben said, “Let’s go to the theater and watch a movie together.”
            </div>
            {inputField(2)}
          </div>

          {/* 4 */}
          <div>
            <div className="mb-4">
              <span className="font-bold mr-4">4</span>
              Grandma said, “You can do great in the test if you study hard
              enough.”
            </div>

            {inputField(3)}
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

export default Review8_Page2_Q1;
