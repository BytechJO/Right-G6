import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 31.svg";

const audioFolder = "Page 89 - Exercise E";
const activityLabels = [
  "Take notes",
  "Give a presentation",
  "Work on a project",
  "Take a test",
  "warren",
  "stacey",
  "linda",
  "steven",
  "paula",
];
const leftPositions = ["23%", "42%", "61%", "80%"];
const topPositions = ["27%", "42%", "57%", "72%", "87%"];
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
    stopUnit10StudentAudio();
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
        placeholder="Write the sentence"
        title={`Student ${i + 1}: describe what the student has been doing`}
        aria-label={`Student ${i + 1}: describe what the student has been doing`}
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
      <div className="div-forall w-full text-[18px] mb-10 gap-7">
        <ExerciseHeaderReview
          sectionLetter="E"
          title="Use the chart to write what each student has been doing this morning."
          subTitle="Work through the chart one row at a time and use the row and column headings as clues before checking your entries."
        />

        {/* TABLE IMAGE */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <img
              src={img1}
              alt="Chart showing the morning activities completed by Warren, Stacey, Linda, Steven, and Paula"
              style={{
                width: "auto",
                height: "220px",
                objectFit: "contain",
              }}
            />
            {activityLabels.map((label, index) => (
              <Unit10StudentAudioText
                key={label}
                src={unit10StudentAudio(
                  audioFolder,
                  String(index + 1).padStart(3, "0"),
                )}
                ariaLabel={`Play ${label}`}
                fullAudio
                style={
                  index <= 3
                    ? {
                        position: "absolute",
                        top: 0,
                        left: leftPositions[index],
                        width: "18%",
                        height: "25%",
                      }
                    : {
                        position: "absolute",
                        top: topPositions[index - 4],
                        left: "0%",
                        width: "22%",
                        height: "12%",
                      }
                }
              >
                <span className="sr-only">{label}</span>
              </Unit10StudentAudioText>
            ))}
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 mb-10">
          {["Warren", "Stacey", "Linda", "Steven", "Paula"].map(
            (name, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="font-bold w-5">{index + 1}</span>

                <span className="min-w-20">
                  <Unit10StudentAudioText
                    src={unit10StudentAudio(
                      audioFolder,
                      String(index + 5).padStart(3, "0"),
                    )}
                    ariaLabel={`Play ${name}`}
                    flowText
                  >
                    {name}
                  </Unit10StudentAudioText>
                </span>

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
