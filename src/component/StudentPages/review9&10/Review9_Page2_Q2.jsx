import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 31.svg";

const Review9_Page2_Q2 = () => {
  const questions = [
    "has been taking notes and working on a project",
    "has been giving a presentation and taking a test",
    "has been taking notes, working on a project, and correcting homework",
    "has been taking notes and giving a presentation",
    "has been working on a project, taking a test and correcting homework.",
  ];

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
    setAnswers([
      "has been taking notes and working on a project",
      "has been giving a presentation and taking a test",
      "has been taking notes, working on a project, and correcting homework",
      "has been taking notes and giving a presentation",
      "has been working on a project, taking a test and correcting homework.",
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

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
      <div className="div-forall w-full text-[18px] mb-10">
        {/* TITLE */}
        <div className="header-title-page8 mb-12">
          <span className="mr-2">E</span>
          Everyone is done with morning classes, and it’s time for lunch. What
          have the students been doing this morning? Use the present perfect
          progressive.
        </div>

        {/* TABLE IMAGE */}
        <div className="flex justify-center mb-12">
          <img
            src={img1}
            alt="activity table"
            style={{
              width: "auto",
              height: "220px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 mb-10">
          {["Warren", "Stacey", "Linda", "Steven", "Paula"].map(
            (name, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="font-bold w-5">{index + 1}</span>

                <span className="min-w-20">{name}</span>

                <div className="flex-1">{inputField(index)}</div>
              </div>
            ),
          )}
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

export default Review9_Page2_Q2;
