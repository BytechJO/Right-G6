import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 21.svg";

const Review9_Page2_Q1 = () => {
  const questions = [
    "has been snowing",
    "have been travelling",
    "has been rock climbing",
    "have",
    "been doing",
    "Have",
    "been skiing",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

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
      "has been snowing",
      "have been travelling",
      "has been rock climbing",
      "have",
      "been doing",
      "Have",
      "been skiing",
    ]);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", ""]);

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
          border-black
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
        {/* TITLE */}
        <div className="header-title-page8 mb-[12vh]">
          <span className=" mr-4">D</span>
          Write the present perfect progressive verb form in the blank.
        </div>

        {/* CONTENT */}
        <div className="flex justify-between items-start gap-10 w-[110%]">
          {/* QUESTIONS */}
          <div className="flex flex-col gap-15 flex-1">
            {/* 1 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">1</span>

              <span>It</span>

              {inputField(0, "w-[180px]")}

              (<span style={{ color: "#E97E1D" }}>snow</span>)

              <span>for three days.</span>
            </div>

            {/* 2 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">2</span>

              <span>Our cousins</span>

              {inputField(1, "w-[190px]")}

              (<span style={{ color: "#E97E1D" }}>travel</span>)

              <span>for two weeks.</span>
            </div>

            {/* 3 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">3</span>

              <span>My brother</span>

              {inputField(2, "w-[240px]")}

              (<span style={{ color: "#E97E1D" }}>rock climb</span>)

              <span>many times before.</span>
            </div>

            {/* 4 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">4</span>

              <span>What</span>

              {inputField(3, "w-[90px]")}

              <span>you</span>

              {inputField(4, "w-[170px]")}

              (<span style={{ color: "#E97E1D" }}>do</span>)

              <span>lately?</span>
            </div>

            {/* 5 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">5</span>

              {inputField(5, "w-[90px]")}

              <span>you</span>

              {inputField(6, "w-[170px]")}

              (<span style={{ color: "#E97E1D" }}>ski</span>)

              <span>in the Alps?</span>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src={img1}
              alt="rock climbing"
              style={{
                width: "250px",
                height: "350px",
                objectFit: "cover",
              }}
            />
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

export default Review9_Page2_Q1;
