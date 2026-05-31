import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit9_Page5_Q1 = () => {
  const questions = [
    "characters",
    "main",
    "perhaps",
    "chapters",
    "deal",
    "novel",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
    setAnswers(["characters", "main", "perhaps", "chapters", "deal", "novel"]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "180px") => (
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
        <div className="header-title-page8 mb-[8vh]">
          <span className="ex-A mr-2">A</span>
          Fill in the blanks with the correct word.
        </div>

        {/* WORD BANK */}
        <div className="flex justify-center mb-12">
          <div
            className="rounded-2xl px-10 py-4 flex gap-16 text-[18px]"
            style={{
              background: "#DDE3C8",
            }}
          >
            <span>deal</span>
            <span>novel</span>
            <span>perhaps</span>
            <span>chapters</span>
            <span>main</span>
            <span>characters</span>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">1</span>

            <span>How many</span>

            {inputField(0)}

            <span>in this story are doctors?</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">2</span>

            <span>I live on the</span>

            {inputField(1)}

            <span>road next to the farm.</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">3</span>

            <span>I’m hungry;</span>

            {inputField(2)}

            <span>we can go to the restaurant over there.</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">4</span>

            <span>This book has 10</span>

            {inputField(3)}

            <span>.</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">5</span>

            <span>Let’s make a</span>

            {inputField(4)}

            <span>. You can take my apple if you give me your jello.</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">6</span>

            <span>I am reading a science fiction</span>

            {inputField(5)}

            <span>.</span>
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

export default Unit9_Page5_Q1;
