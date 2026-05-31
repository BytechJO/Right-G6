import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review10_Page1_Q2 = () => {
  const questions = [
    "necessary",
    "dozens",
    "occupied",
    "rent",
    "necessary",
    "dozens",
    "rent",
    "occupied",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

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
      "necessary",
      "dozens",
      "occupied",
      "rent",
      "necessary",
      "dozens",
      "rent",
      "occupied",
    ]);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
  flex-1
  min-w-[120px]
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
          <span className="mr-4">B</span>
          Write the vocabulary words that are synonyms for each word, and then
          put each one in a sentence below.
        </div>

        {/* TOP QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-20 mb-[8vh] whitespace-nowrap">
          {/* 1 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">1</span>

            <span>needed</span>

            <div className="flex-1 ml-2">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">2</span>

            <span>at least twelve</span>

            <div className="flex-1 ml-2">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">3</span>

            <span>busy</span>

            <div className="flex-1 ml-2">{inputField(2)}</div>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">4</span>

            <span>lease, borrow, hire</span>

            <div className="flex-1 ml-2">{inputField(3)}</div>
          </div>
        </div>
        {/* SENTENCES */}
        <div className="flex flex-col gap-8">
          {/* A */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">a</span>

            <span>Is it</span>

            {inputField(4, "w-[220px]")}

            <span>to add the eggs first, or can I add them later?</span>
          </div>

          {/* B */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">b</span>

            <span>It was such a beautiful day that there were</span>

            {inputField(5, "w-[220px]")}

            <span>of people at the beach.</span>
          </div>

          {/* C */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">c</span>

            <span>Can I</span>

            {inputField(6, "w-[220px]")}

            <span>
              a surfboard while I am just trying the sport to see if I like it?
            </span>
          </div>

          {/* D */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">d</span>

            <span>I like to keep</span>

            {inputField(7, "w-[220px]")}

            <span>and have several things to do each day.</span>
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

export default Review10_Page1_Q2;
