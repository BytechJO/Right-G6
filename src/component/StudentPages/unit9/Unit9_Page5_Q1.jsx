import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit9StudentAudioText, {
  stopUnit9StudentAudio,
  unit9StudentAudio,
} from "./Unit9StudentAudioText";

const audioFolder = "Page 80 - Exercise A";

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
    stopUnit9StudentAudio();
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
        placeholder={`Answer ${i + 1}`}
        title={`Answer ${i + 1}: enter the missing word`}
        aria-label={`Answer ${i + 1}: enter the missing word`}
        className={`unit9-input
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
      <div className="div-forall w-full gap-5 text-[18px]">
        <ExerciseHeader
          sectionLetter="A"
          title="Fill in the blanks with the correct word."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        {/* WORD BANK */}
        <div className="flex justify-center mb-5">
          <div
            className="rounded-2xl px-10 py-4 flex gap-16 text-[18px]"
            style={{
              background: "#DDE3C8",
            }}
          >
            {[
              ["deal", "001"],
              ["novel", "002"],
              ["perhaps", "003"],
              ["chapters", "004"],
              ["main", "005"],
              ["characters", "006"],
            ].map(([word, prefix]) => (
              <Unit9StudentAudioText
                key={word}
                src={unit9StudentAudio(audioFolder, prefix)}
                ariaLabel={`Play ${word}`}
                flowText
              >
                {word}
              </Unit9StudentAudioText>
            ))}
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">1</span>

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "008")}
              flowText
            >
              How many
            </Unit9StudentAudioText>

            {inputField(0)}

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "007")}
              flowText
            >
              in this story are doctors?
            </Unit9StudentAudioText>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">2</span>

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "009")}
              flowText
            >
              I live on the
            </Unit9StudentAudioText>

            {inputField(1)}

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "010")}
              flowText
            >
              road next to the farm.
            </Unit9StudentAudioText>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">3</span>

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "011")}
              flowText
            >
              I’m hungry;
            </Unit9StudentAudioText>

            {inputField(2)}

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "012")}
              flowText
            >
              we can go to the restaurant over there.
            </Unit9StudentAudioText>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">4</span>

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "013")}
              flowText
            >
              This book has 10
            </Unit9StudentAudioText>

            {inputField(3)}

            <span>.</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">5</span>

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "015")}
              flowText
            >
              Let’s make a
            </Unit9StudentAudioText>

            {inputField(4)}

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "014")}
              flowText
            >
              . You can take my apple if you give me your jello.
            </Unit9StudentAudioText>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold w-5">6</span>

            <Unit9StudentAudioText
              src={unit9StudentAudio(audioFolder, "016")}
              flowText
            >
              I am reading a science fiction
            </Unit9StudentAudioText>

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
