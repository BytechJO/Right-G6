import React, { useEffect, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
} from "../unit8/Unit8StudentAudioText";

const Review7_Page2_Q3 = () => {
  const correctAnswers = [
    ["had", "have"],
    ["have", "hadn't"],
    ["had", "have"],
    ["hadn't", "have"],
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.!?'"‘’“”]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (questionIndex, blankIndex, value) => {
    if (locked || result?.[questionIndex]?.[blankIndex] === true) return;

    const updated = [...answers];

    updated[questionIndex][blankIndex] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      if (copy[questionIndex]) {
        copy[questionIndex][blankIndex] = undefined;
      }

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((row) => row.some((cell) => !cell.trim()));

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correctCount = 0;

    const newResults = answers.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const correct =
          normalize(cell) === normalize(correctAnswers[rowIndex][colIndex]);

        if (correct) correctCount++;

        return correct;
      }),
    );

    setResult(newResults);

    const total = 8;

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
    setAnswers(correctAnswers);

    setResult([
      [true, true],
      [true, true],
      [true, true],
      [true, true],
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit8StudentAudio();
    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (questionIndex, blankIndex, width = "140px") => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[questionIndex][blankIndex]}
        disabled={locked || result?.[questionIndex]?.[blankIndex] === true}
        placeholder="e.g. had"
        title="Type have, has, had, or hadn't"
        aria-label={`Sentence ${questionIndex + 1}, blank ${blankIndex + 1}`}
        onChange={(e) =>
          handleChange(questionIndex, blankIndex, e.target.value)
        }
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          text-center

          ${
            result?.[questionIndex]?.[blankIndex] === false
              ? "border-[#D1232A]"
              : ""
          }
        `}
        style={{
          width,
          borderBottomWidth: "1px",
        }}
      />

      {result?.[questionIndex]?.[blankIndex] === false && (
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
      <div className="div-forall gap-7 text-[18px] w-full">
        <ExerciseHeaderReview
          sectionLetter="F"
          title={
            <>
              Put in <span className="text-[#F79530]">have</span>,{" "}
              <span className="text-[#F79530]">has</span>,{" "}
              <span className="text-[#F79530]">had</span>, or{" "}
              <span className="text-[#F79530]">hadn’t</span>.
            </>
          }
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        <div className="flex flex-col gap-[8vh]">
          {/* 1 */}
          <div>
            <span className="font-bold mr-4">1</span>
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_001_")}
              ariaLabel="Play sentence 1 beginning"
              flowText
            >
              If Jenny
            </Unit8StudentAudioText>{" "}
            {inputField(0, 0)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_002_")}
              ariaLabel="Play sentence 1 middle"
              flowText
            >
              known there was a quiz in math class, she would
            </Unit8StudentAudioText>
          </div>

          <div className="ml-[35px] mt-2">
            {inputField(0, 1)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_003_")}
              ariaLabel="Play sentence 1 ending"
              flowText
            >
              studied last night.
            </Unit8StudentAudioText>
          </div>

          {/* 2 */}
          <div>
            <span className="font-bold mr-4">2</span>
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_004_")}
              ariaLabel="Play sentence 2 beginning"
              flowText
            >
              He would
            </Unit8StudentAudioText>{" "}
            {inputField(1, 0)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_005_")}
              ariaLabel="Play sentence 2 middle"
              flowText
            >
              slept last night if the cat
            </Unit8StudentAudioText>{" "}
            {inputField(1, 1)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_006_")}
              ariaLabel="Play sentence 2 ending"
              flowText
            >
              been so noisy.
            </Unit8StudentAudioText>
          </div>

          {/* 3 */}
          <div>
            <span className="font-bold mr-4">3</span>
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_007_")}
              ariaLabel="Play sentence 3 beginning"
              flowText
            >
              If we
            </Unit8StudentAudioText>{" "}
            {inputField(2, 0)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_008_")}
              ariaLabel="Play sentence 3 middle"
              flowText
            >
              come earlier, we wouldn’t
            </Unit8StudentAudioText>{" "}
            {inputField(2, 1)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_009_")}
              ariaLabel="Play sentence 3 ending"
              flowText
            >
              missed the train ride.
            </Unit8StudentAudioText>
          </div>

          {/* 4 */}
          <div>
            <span className="font-bold mr-4">4</span>
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_010_")}
              ariaLabel="Play sentence 4 beginning"
              flowText
            >
              If he
            </Unit8StudentAudioText>{" "}
            {inputField(3, 0)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_011_")}
              ariaLabel="Play sentence 4 middle"
              flowText
            >
              been so sick, he would
            </Unit8StudentAudioText>{" "}
            {inputField(3, 1)}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 71 - Exercise F", "Item_012_")}
              ariaLabel="Play sentence 4 ending"
              flowText
            >
              come to school today.
            </Unit8StudentAudioText>
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

export default Review7_Page2_Q3;
