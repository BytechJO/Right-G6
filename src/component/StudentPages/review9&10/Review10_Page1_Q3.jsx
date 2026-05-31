import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review10_Page1_Q3 = () => {
  const questions = [
    "to",
    "truth",
    "it's",
    "with",
    "have",
    "stay",
    "To tell you the truth",
    "Stay close",
    "It's fine with me",
    "Have fun",
  ];

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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
    setAnswers([
      "to",
      "truth",
      "It's",
      "with",
      "Have",
      "stay",
      "To tell you the truth",
      "Stay close",
      "It's fine with me",
      "Have fun",
    ]);

    setResult([true, true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "150px") => (
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
          text-black
          font-semibold
          px-1
          text-center

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          borderBottomWidth: "1px",
        }}
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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px]">
        {/* TITLE */}
        <div className="header-title-page8 mb-[10vh]">
          <span className="ex-A mr-2">C</span>
          Write the missing words for each expression, and then fill in the
          blank lines from a to d.
        </div>

        {/* TOP EXPRESSIONS */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-20 mb-12">
          {/* 1 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">1</span>

            {inputField(0, "w-[110px]")}

            <span>tell you the</span>

            {inputField(1, "w-[110px]")}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">2</span>

            {inputField(2, "w-[110px]")}

            <span>fine</span>

            {inputField(3, "w-[110px]")}

            <span>me.</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">3</span>

            {inputField(4, "w-[110px]")}

            <span>fun</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">4</span>

            {inputField(5, "w-[110px]")}

            <span>close</span>
          </div>
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8">
          {/* A */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">a</span>

            {inputField(6, "w-[280px]")}

            <span>, I don’t really like swimming.</span>
          </div>

          {/* B */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">b</span>

            {inputField(7, "w-[220px]")}

            <span>
              while we’re going through the crowd so we don’t get separated.
            </span>
          </div>

          {/* C */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">c</span>

            {inputField(8, "w-[250px]")}

            <span>I love to walk.</span>
          </div>

          {/* D */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">d</span>

            <span>As we left to go to the carnival, my mom said,</span>

            <span>"</span>

            {inputField(9, "w-[220px]")}

            <span>!"</span>
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

export default Review10_Page1_Q3;
