import React, { useEffect, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
} from "./Unit8StudentAudioText";

const Unit8_Page6_Q3 = () => {
  const questions = [
    '"I will be at the library tonight."',
    '"I want to come with you?"',
    'The officer said, "I will get you home safely."',
    'Andrea said, "There is a carnival at school today."',
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,“”"']/g, "")
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

    const hasEmpty = answers.some((answer) => !answer.trim());

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
      '"I will be at the library tonight."',
      '"I want to come with you?"',
      'The officer said, "I will get you home safely."',
      'Andrea said, "There is a carnival at school today."',
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit8StudentAudio();
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative block w-full">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        placeholder="Write the direct quote"
        title="Write the direct quote"
        aria-label={`Direct quote ${index + 1}`}
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
        <ExerciseHeader
          sectionLetter="F"
          title="Using the sentences from Exercise E, write direct quotes of what the people said."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Use the corrected sentences from Exercise E as your
                source.
              </span>{" "}
              <span style={{ display: "block" }}>
                Task 2: Rewrite each one as a direct quote with quotation marks
                and correct punctuation.
              </span>
            </>
          }
        />

        <div className="flex flex-col gap-[10vh]">
          {/* 1 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">1</span>

              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 69 - Exercise F", "Item_001_")}
                ariaLabel="Play John said"
                flowText
              >
                John said,
              </Unit8StudentAudioText>

              <div className="flex-1">{inputField(0)}</div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">2</span>

              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 69 - Exercise F", "Item_002_")}
                ariaLabel="Play Did Carly say"
                flowText
              >
                Did Carly say,
              </Unit8StudentAudioText>

              <div className="flex-1">{inputField(1)}</div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">3</span>

              <div className="flex-1">{inputField(2)}</div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-center gap-4">
              <span className="font-bold">4</span>

              <div className="flex-1">{inputField(3)}</div>
            </div>
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

export default Unit8_Page6_Q3;
