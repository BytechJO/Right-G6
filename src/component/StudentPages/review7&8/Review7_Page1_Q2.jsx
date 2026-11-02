import React, { useEffect, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
} from "../unit8/Unit8StudentAudioText";

const Review7_Page1_Q2 = () => {
  const questions = [
    "stand out",
    "catch up",
    "It's been too long.",
    "You're a natural.",
    "Here I go.",
    "Now is your chance.",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.!?'"‘’“”]/g, "")
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
      "stand out",
      "catch up",
      "It's been too long.",
      "You're a natural.",
      "Here I go.",
      "Now is your chance.",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit8StudentAudio();
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative block w-full">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        placeholder="Rewrite the expression"
        title="Rewrite the complete correct expression"
        aria-label={`Correct expression ${index + 1}`}
        onChange={(e) => handleChange(index, e.target.value)}
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
      <div className="div-forall gap-7 w-full text-[18px]">
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Change one word in each expression to make it correct. Rewrite the expression."
          subTitle="Identify exactly what must change, rewrite the complete correct form, and reread it to make sure the original meaning is preserved."
        />

        <div className="flex flex-col gap-[5vh]">
          {/* 1 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">1</span>

            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 70 - Exercise B", "Item_001_")}
              ariaLabel="Play stand in"
            >
              stand in
            </Unit8StudentAudioText>

            <div className="flex-1">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">2</span>

            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 70 - Exercise B", "Item_002_")}
              ariaLabel="Play catch down"
            >
              catch down
            </Unit8StudentAudioText>

            <div className="flex-1">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">3</span>

            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 70 - Exercise B", "Item_003_")}
              ariaLabel="Play expression 3"
            >
              It’s had too long ...
            </Unit8StudentAudioText>

            <div className="flex-1">{inputField(2)}</div>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">4</span>

            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 70 - Exercise B", "Item_004_")}
              ariaLabel="Play expression 4"
            >
              You’re a normal!
            </Unit8StudentAudioText>

            <div className="flex-1">{inputField(3)}</div>
          </div>

          {/* 5 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">5</span>

            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 70 - Exercise B", "Item_005_")}
              ariaLabel="Play expression 5"
            >
              Here I went.
            </Unit8StudentAudioText>

            <div className="flex-1">{inputField(4)}</div>
          </div>

          {/* 6 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">6</span>

            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 70 - Exercise B", "Item_006_")}
              ariaLabel="Play expression 6"
            >
              Later is your chance.
            </Unit8StudentAudioText>

            <div className="flex-1">{inputField(5)}</div>
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

export default Review7_Page1_Q2;
