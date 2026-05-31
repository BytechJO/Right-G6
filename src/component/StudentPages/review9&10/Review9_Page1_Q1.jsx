import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 20.svg";
const Review9_Page1_Q1 = () => {
  const questions = [
    "novel",
    "characters",
    "discuss",
    "classmates",
    "chapter",
    "distract",
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
    setAnswers([
      "novel",
      "characters",
      "discuss",
      "classmates",
      "chapter",
      "distract",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

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
          text-black
          font-semibold
          text-center
          px-1
          leading-none

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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-[8vh]">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Write the correct vocabulary word for each blank.
        </h5>

        {/* MAIN BOX */}
        <div
          className="rounded-[18px] p-6"
          style={{
            border: "2px solid #9CCB5B",
          }}
        >
          <div className="flex gap-6">
            {/* TEXT */}
            <div className="flex-1 text-[18px] leading-[2.4]">
              I’m going to read another {inputField(0, "w-[150px]")} soon.
              <br />
              They’re my favorite type of book because I get involved with the
              story, and I feel like I’m living the adventure along with the
              make-believe {inputField(1, "w-[180px]")} in the story. I can{" "}
              {inputField(2, "w-[170px]")} this next novel with my{" "}
              {inputField(3, "w-[190px]")} because they are very interested in
              the subject of the book, which is time travel. The first{" "}
              {inputField(4, "w-[170px]")} of the book begins with an inventor
              traveling forward in time 100 years. Imagining what he might find
              can {inputField(5, "w-[170px]")} me from the everyday
              responsibilities of life.
            </div>

            {/* IMAGE */}
            <div>
              <img
                src={img1}
                alt="reading"
                style={{
                  width: "220px",
                  height: "170px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </div>
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

export default Review9_Page1_Q1;
