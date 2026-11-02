import React, { useEffect, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
} from "../unit8/Unit8StudentAudioText";

const Review8_Page1_Q3 = () => {
  const correctAnswers = [
    "Here you are",
    "in ages",
    "come in handy",
    "show up",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
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
      const correct = normalize(answer) === normalize(correctAnswers[index]);

      if (correct) correctCount++;

      return correct;
    });

    setResult(newResults);

    const total = correctAnswers.length;

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
    setAnswers(["Here you are", "in ages", "come in handy", "show up"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit8StudentAudio();
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index, width = "260px") => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        placeholder="expression"
        title="Type the correct expression"
        aria-label={`Expression ${index + 1}`}
        onChange={(e) => handleChange(index, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          text-center

          ${result[index] === false ? "border-[#D1232A]" : ""}
        `}
        style={{
          width,
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
      <div className="div-forall gap-20 text-[18px] w-full">
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Fill in the blanks with the correct expressions."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        <div className="flex flex-col gap-[8vh]">
          {/* 1 */}
          <div>
            <span className="font-bold mr-4">1</span>
            {inputField(0, "420px")} !{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 72 - Exercise C", "Item_001_")}
              ariaLabel="Play sentence 1"
              flowText
            >
              I was looking for you everywhere.
            </Unit8StudentAudioText>
          </div>

          {/* 2 */}
          <div>
            <span className="font-bold mr-4">2</span>{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 72 - Exercise C", "Item_002_")}
              ariaLabel="Play sentence 2 ending"
              flowText
            >
              I haven’t seen this toy{" "}
            </Unit8StudentAudioText>
            {inputField(1, "220px")}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 72 - Exercise C", "Item_003_")}
              ariaLabel="Play sentence 2 ending"
              flowText
            >
              ! The last time I saw it was when I was four years old.
            </Unit8StudentAudioText>
          </div>

          {/* 3 */}
          <div>
            <span className="font-bold mr-4">3</span>
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 72 - Exercise C", "Item_004_")}
              ariaLabel="Play sentence 3 beginning"
              flowText
            >
              I might not find a use for this old pin now, but it might
            </Unit8StudentAudioText>{" "}
            {inputField(2, "260px")}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 72 - Exercise C", "Item_005_")}
              ariaLabel="Play sentence 3 ending"
              flowText
            >
              one day.
            </Unit8StudentAudioText>
          </div>

          {/* 4 */}
          <div>
            <span className="font-bold mr-4">4</span>
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 72 - Exercise C", "Item_006_")}
              ariaLabel="Play sentence 4 beginning"
              flowText
            >
              My friends will
            </Unit8StudentAudioText>{" "}
            {inputField(3, "320px")}{" "}
            <Unit8StudentAudioText
              src={unit8StudentAudio("Page 72 - Exercise C", "Item_007_")}
              ariaLabel="Play sentence 4 ending"
              flowText
            >
              on my lawn at eight o’clock.
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

export default Review8_Page1_Q3;
