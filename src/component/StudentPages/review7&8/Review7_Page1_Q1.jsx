import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review7_Page1_Q1 = () => {
  const questions = [
    "background",
    "flatter",
    "aware",
    "silly",
    "advice",
    "previously",
    "stencils",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().trim();

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
      "background",
      "flatter",
      "aware",
      "silly",
      "advice",
      "previously",
      "stencils",
    ]);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
        className={`
          w-[220px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1
          text-center
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
        <h5 className="header-title-page8 mb-[6vh]">
          <span
            style={{
              marginRight: "20px",
            }}
          >
            A
          </span>
          Finish each sentence with the correct vocabulary word.
        </h5>

        {/* WORD BANK */}
        <div className="flex justify-center mb-10">
          <div
            className="rounded-[18px] px-8 py-4 flex gap-12 flex-wrap justify-center"
            style={{
              background: "#DDE3C8",
            }}
          >
            <span>previously</span>
            <span>silly</span>
            <span>aware</span>
            <span>advice</span>
            <span>background</span>
            <span>stencils</span>
            <span>flatter</span>
          </div>
        </div>

        <div className="flex flex-col gap-[3vh]">
          {/* 1 */}
          <div>
            <span className="font-bold mr-4">1</span>
            The picture had a blue {inputField(0)} behind it.
          </div>

          {/* 2 */}
          <div>
            <span className="font-bold mr-4">2</span>
            My friends always {inputField(1)} me by saying nice things about me.
          </div>

          {/* 3 */}
          <div>
            <span className="font-bold mr-4">3</span>I was not {inputField(2)}{" "}
            that we should bring our textbook with us to school today.
          </div>

          {/* 4 */}
          <div>
            <span className="font-bold mr-4">4</span>
            Susan was acting {inputField(3)} today. She kept on laughing and
            making funny faces.
          </div>

          {/* 5 */}
          <div>
            <span className="font-bold mr-4">5</span>
            My teacher always gives me {inputField(4)} on how to do well in
            school.
          </div>

          {/* 6 */}
          <div>
            <span className="font-bold mr-4">6</span>
            We have {inputField(5)} spoken to each other on the phone. Today, we
            will meet for the first time.
          </div>

          {/* 7 */}
          <div>
            <span className="font-bold mr-4">7</span>
            The painter used {inputField(6)} to make nice star shapes on the
            wall.
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

export default Review7_Page1_Q1;
