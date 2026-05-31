import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 8.svg";

const Unit9_Page6_Q1 = () => {
  const questions = [
    "How long has he been riding a bike?",
    "He has been riding his bike for three years.",

    "How long have they been building?",
    "They have been building since last year.",

    "How long have they been watching TV?",
    "They have been watching TV for one hour.",

    "How long has he been saving?",
    "He has been saving since January.",
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
      "How long has he been riding a bike?",
      "He has been riding his bike for three years.",

      "How long have they been building?",
      "They have been building since last year.",

      "How long have they been watching TV?",
      "They have been watching TV for one hour.",

      "How long has he been saving?",
      "He has been saving since January.",
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
    <span className="relative inline-block w-full">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
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
        <div className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Read the chart, and then make questions and answers about each
          picture.
        </div>

        {/* ONE BIG IMAGE */}
        <div className="flex justify-center mb-12">
          <img
            src={img}
            alt="chart"
            style={{
              width: "700px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* 1 */}
        <div className="mb-10">
          <div className="flex gap-3 items-center">
            <span className="font-bold w-5">1</span>

            <div className="flex-1">{inputField(0)}</div>
          </div>

          <div className="mt-4 ml-8">{inputField(1)}</div>
        </div>

        {/* 2 */}
        <div className="mb-10">
          <div className="flex gap-3 items-center">
            <span className="font-bold w-5">2</span>

            <div className="flex-1">{inputField(2)}</div>
          </div>

          <div className="mt-4 ml-8">{inputField(3)}</div>
        </div>

        {/* 3 */}
        <div className="mb-10">
          <div className="flex gap-3 items-center">
            <span className="font-bold w-5">3</span>

            <div className="flex-1">{inputField(4)}</div>
          </div>

          <div className="mt-4 ml-8">{inputField(5)}</div>
        </div>

        {/* 4 */}
        <div className="mb-10">
          <div className="flex gap-3 items-center">
            <span className="font-bold w-5">4</span>

            <div className="flex-1">{inputField(6)}</div>
          </div>

          <div className="mt-4 ml-8">{inputField(7)}</div>
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

export default Unit9_Page6_Q1;
