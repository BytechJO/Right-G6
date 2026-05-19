import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page3_Q1 = () => {
  const questions = ["Uh-oh!", "alarm", "mirror", "right away", "counting"];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
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
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
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
    setAnswers(["Uh-oh!", "alarm", "mirror", "right away", "counting"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
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

  const wordBox = (word) => (
    <div
      style={{
        border: "2px solid #7D3C98",
        borderRadius: "12px",
        padding: "8px 22px",
        fontSize: "18px",
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      {word}
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-17">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and write.
        </h5>

        {/* WORD BOXES */}
        <div className="flex gap-5 mb-12 flex-wrap">
          {wordBox("mirror")}
          {wordBox("alarm")}
          {wordBox("counting")}
          {wordBox("right away")}
          {wordBox("Uh-oh!")}
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {/* 1 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">1</span>

            {inputField(0, "w-[180px]")}

            <span>I dropped my papers on the floor.</span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">2</span>

            <span>I did not hear the</span>

            {inputField(1, "w-[180px]")}

            <span>go off at 7:00 a.m.</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">3</span>

            <span>Look at your face in the</span>

            {inputField(2, "w-[170px]")}

            <span>.</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">4</span>

            <span>I know you need it fast, so I will do it</span>

            {inputField(3, "w-[180px]")}

            <span>.</span>
          </div>

          {/* 5 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">5</span>

            <span>He was</span>

            {inputField(4, "w-[180px]")}

            <span>the number of apples in the basket.</span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
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

export default WB_Unit1_Page3_Q1;
