import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";

const audioFolder = "Page 90 - Exercise C";

const Review10_Page1_Q3 = () => {
  const questions = [
    "to",
    "truth",
    "it's",
    "with",
    "have",
    "stay",
    "To tell you the truth",
    "Stay close",
    "It's fine with me",
    "Have fun",
  ];

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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
      "to",
      "truth",
      "It's",
      "with",
      "Have",
      "stay",
      "To tell you the truth",
      "Stay close",
      "It's fine with me",
      "Have fun",
    ]);

    setResult([true, true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "150px") => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        placeholder={i < 6 ? "Missing word" : "Expression"}
        title={i < 6 ? `Expression blank ${i + 1}` : `Sentence ${i - 5}`}
        aria-label={i < 6 ? `Expression blank ${i + 1}` : `Sentence ${i - 5}`}
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
      <div className="div-forall w-full text-[18px] gap-7">
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Write the missing words for each expression, then use the completed expressions in the sentences."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Complete each expression before using it in the
                sentences.
              </span>
              <span style={{ display: "block" }}>
                Task 2: Then choose the completed expression that makes each
                sentence natural and grammatical.
              </span>
            </>
          }
        />

        {/* TOP EXPRESSIONS */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-20 mb-5">
          {/* 1 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">1</span>

            {inputField(0, "w-[110px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "001")}
              flowText
            >
              tell you the
            </Unit10StudentAudioText>

            {inputField(1, "w-[110px]")}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">2</span>

            {inputField(2, "w-[110px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "002")}
              flowText
            >
              fine
            </Unit10StudentAudioText>

            {inputField(3, "w-[110px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "003")}
              flowText
            >
              me.
            </Unit10StudentAudioText>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">3</span>

            {inputField(4, "w-[110px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "004")}
              flowText
            >
              fun
            </Unit10StudentAudioText>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">4</span>

            {inputField(5, "w-[110px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "005")}
              flowText
            >
              close
            </Unit10StudentAudioText>
          </div>
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8">
          {/* A */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">a</span>

            {inputField(6, "w-[280px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "006")}
              flowText
            >
              , I don’t really like swimming.
            </Unit10StudentAudioText>
          </div>

          {/* B */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">b</span>

            {inputField(7, "w-[220px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "007")}
              flowText
            >
              while we’re going through the crowd so we don’t get separated.
            </Unit10StudentAudioText>
          </div>

          {/* C */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">c</span>

            {inputField(8, "w-[250px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "008")}
              flowText
            >
              I love to walk.
            </Unit10StudentAudioText>
          </div>

          {/* D */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">d</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "009")}
              flowText
            >
              As we left to go to the carnival, my mom said,
            </Unit10StudentAudioText>

            <span>"</span>

            {inputField(9, "w-[220px]")}

            <span>!"</span>
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

export default Review10_Page1_Q3;
