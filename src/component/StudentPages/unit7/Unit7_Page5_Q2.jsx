import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit7_Page5_Q2 = () => {
  const correctAnswers = [
    "It's been too long",
    "catch up",
    "Now is your chance",
    "stand out",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!?;:'"‘’‚‛“”„‟`´]/g, "")
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
      "It's been too long",
      "catch up",
      "Now is your chance",
      "stand out",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index, width = "320px") => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold

          ${result[index] === false ? "border-[#D1232A]" : ""}
        `}
        style={{
          width,
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
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            zIndex: 5,
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
        <h5 className="header-title-page8 mb-[15vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Fill in the blanks with the correct expressions.
        </h5>

        <div className="flex flex-col gap-[9vh]">
          <div>
            <span className="font-bold mr-4">1</span>
            {inputField(0)} . When was the last time we met?
          </div>

          <div>
            <span className="font-bold mr-4">2</span>
            We need to {inputField(1)} to find out what we missed.
          </div>

          <div>
            <span className="font-bold mr-4">3</span>
            {inputField(2)} to prove that you are a good cook!
          </div>

          <div>
            <span className="font-bold mr-4">4</span>
            Your red pillows {inputField(3)} on your bed.
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

export default Unit7_Page5_Q2;
