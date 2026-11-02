import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";

const audioFolder = "Page 90 - Exercise B";

const Review10_Page1_Q2 = () => {
  const questions = [
    "necessary",
    "dozens",
    "occupied",
    "rent",
    "necessary",
    "dozens",
    "rent",
    "occupied",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

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
      "necessary",
      "dozens",
      "occupied",
      "rent",
      "necessary",
      "dozens",
      "rent",
      "occupied",
    ]);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        placeholder={i < 4 ? "Synonym" : "Vocabulary word"}
        title={i < 4 ? `Synonym ${i + 1}` : `Sentence blank ${i - 3}`}
        aria-label={i < 4 ? `Synonym ${i + 1}` : `Sentence blank ${i - 3}`}
        className={`
  flex-1
  min-w-[120px]
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
          sectionLetter="B"
          title="Write vocabulary synonyms for each word, then use each synonym in a sentence."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Write the vocabulary synonym beside each clue first.
              </span>
              <span style={{ display: "block" }}>
                Task 2: Then use each synonym in a complete sentence that shows
                its meaning.
              </span>
            </>
          }
        />

        {/* TOP QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-20 mb-[5vh] whitespace-nowrap">
          {/* 1 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">1</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "001")}
              flowText
            >
              needed
            </Unit10StudentAudioText>

            <div className="flex-1 ml-2">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">2</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "002")}
              flowText
            >
              at least twelve
            </Unit10StudentAudioText>

            <div className="flex-1 ml-2">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">3</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "003")}
              flowText
            >
              busy
            </Unit10StudentAudioText>

            <div className="flex-1 ml-2">{inputField(2)}</div>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-2">
            <span className="font-bold w-5">4</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "004")}
              flowText
            >
              lease, borrow, hire
            </Unit10StudentAudioText>

            <div className="flex-1 ml-2">{inputField(3)}</div>
          </div>
        </div>
        {/* SENTENCES */}
        <div className="flex flex-col gap-8">
          {/* A */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">a</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "005")}
              flowText
            >
              Is it
            </Unit10StudentAudioText>

            {inputField(4, "w-[220px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "006")}
              flowText
            >
              to add the eggs first, or can I add them later?
            </Unit10StudentAudioText>
          </div>

          {/* B */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">b</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "007")}
              flowText
            >
              It was such a beautiful day that there were
            </Unit10StudentAudioText>

            {inputField(5, "w-[220px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "008")}
              flowText
            >
              of people at the beach.
            </Unit10StudentAudioText>
          </div>

          {/* C */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">c</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "010")}
              flowText
            >
              Can I
            </Unit10StudentAudioText>

            {inputField(6, "w-[220px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "009")}
              flowText
            >
              a surfboard while I am just trying the sport to see if I like it?
            </Unit10StudentAudioText>
          </div>

          {/* D */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-[20px]">d</span>

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "011")}
              flowText
            >
              I like to keep
            </Unit10StudentAudioText>

            {inputField(7, "w-[220px]")}

            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "012")}
              flowText
            >
              and have several things to do each day.
            </Unit10StudentAudioText>
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

export default Review10_Page1_Q2;
