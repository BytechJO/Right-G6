import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 22.svg";

const audioFolder = "Page 90 - Exercise A";
const wordColumns = [
  [
    ["surf", "001"],
    ["castles", "006"],
  ],
  [
    ["burn", "002"],
    ["screen", "009"],
  ],
  [
    ["sand", "003"],
    ["board", "007"],
  ],
  [
    ["sun", "004"],
    ["shells", "008"],
  ],
  [
    ["sea", "005"],
    ["sun", "004"],
  ],
];

const Review10_Page1_Q1 = () => {
  const questions = ["surfboard", "sunburn", "sandcastle", "seashells"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

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
    setAnswers(["surfboard", "sunburn", "sandcastle", "seashells"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "240px") => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        placeholder="Compound word"
        title={`Compound vocabulary word ${i + 1}`}
        aria-label={`Compound vocabulary word ${i + 1}`}
        className={`
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
      <div className="div-forall w-full text-[18px] gap-10 ">
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Put the words together to make the compound vocabulary words."
          subTitle="Use the visible word parts systematically, then check each completed vocabulary word before submitting."
        />

        {/* WORD BANK */}
        <div className="flex justify-center mb-[10vh]">
          <div
            className="rounded-2xl px-10 py-5"
            style={{
              background: "#DDE3C8",
            }}
          >
            <div className="grid grid-cols-5 gap-x-14 text-center text-[18px]">
              {wordColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-2">
                  {column.map(([word, prefix], wordIndex) => (
                    <Unit10StudentAudioText
                      key={`${word}-${wordIndex}`}
                      src={unit10StudentAudio(audioFolder, prefix)}
                      ariaLabel={`Play ${word}`}
                      flowText
                    >
                      {word}
                    </Unit10StudentAudioText>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUESTIONS + IMAGE */}
        <div className="flex justify-between items-end">
          {/* QUESTIONS */}
          <div className="flex flex-col gap-15">
            {/* ROW 1 */}
            <div className="flex gap-16">
              <div className="flex items-center gap-3">
                <span className="font-bold w-5">1</span>

                {inputField(0, "w-[250px]")}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold w-5">2</span>

                {inputField(1, "w-[250px]")}
              </div>
            </div>

            {/* ROW 2 */}
            <div className="flex gap-16">
              <div className="flex items-center gap-3">
                <span className="font-bold w-5">3</span>

                {inputField(2, "w-[250px]")}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold w-5">4</span>

                {inputField(3, "w-[250px]")}
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src={img1}
              alt="seashell"
              style={{
                width: "130px",
                height: "auto",
                objectFit: "contain",
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

export default Review10_Page1_Q1;
