import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";

const audioFolder = "Page 91 - Exercise E";
const promptAudioPrefixes = ["002", "003", "004", "005"];
const prompts = [
  "Rachel/dislike/take/pictures.",
  "Dad/appreciates/hike/in the mountains.",
  "Snowboard/is/a/popular/sport.",
  "Type/and/write/are/important/skills.",
];

const Unit10_Page3_Q5 = () => {
  const questions = [
    "Rachel dislikes taking pictures.",
    "Dad appreciates hiking in the mountains.",
    "Snowboarding is a popular sport.",
    "Typing and writing are important skills.",
  ];

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
    setAnswers([
      "Rachel dislikes taking pictures.",
      "Dad appreciates hiking in the mountains.",
      "Snowboarding is a popular sport.",
      "Typing and writing are important skills.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative flex-1">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        placeholder="Write the sentence"
        title={`Sentence ${i + 1}: use the words with a gerund`}
        aria-label={`Sentence ${i + 1}: use the words with a gerund`}
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
      <div className="div-forall w-full text-[20px] gap-10">
        <ExerciseHeaderReview
          sectionLetter="E"
          title="Use each set of words to write a sentence with a gerund."
          subTitle="Use the prompt, picture, or grammar pattern to write a complete response, then reread it for meaning, form, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-20">
          {/* 1 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">1</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, promptAudioPrefixes[0])}
              flowText
            >
              {prompts[0]}
            </Unit10StudentAudioText>

            {inputField(0)}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">2</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, promptAudioPrefixes[1])}
              flowText
            >
              {prompts[1]}
            </Unit10StudentAudioText>

            {inputField(1)}
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">3</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, promptAudioPrefixes[2])}
              flowText
            >
              {prompts[2]}
            </Unit10StudentAudioText>

            {inputField(2)}
          </div>

          {/* 4 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">4</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, promptAudioPrefixes[3])}
              flowText
            >
              {prompts[3]}
            </Unit10StudentAudioText>

            {inputField(3)}
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

export default Unit10_Page3_Q5;
