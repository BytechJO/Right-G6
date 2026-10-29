import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit7StudentAudioText, {
  stopUnit7StudentAudio,
  unit7StudentAudio,
} from "./Unit7StudentAudioText";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 12.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 13.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 14.svg";

const ROWS = [
  {
    img: img1,
    leftAudio: "Item-001_",
    rightAudio: "Item-002_",
    alt: "Two dialogue bubbles about Clarissa being late and stepping into a puddle",
  },
  {
    img: img2,
    leftAudio: "Item-003_",
    rightAudio: "Item-004_",
    alt: "Two dialogue bubbles about dirty new clothes and forgetting them by the front door",
  },
  {
    img: img3,
    leftAudio: "Item-005_",
    rightAudio: "Item-006_",
    alt: "Two dialogue bubbles about missing a meeting and leaving the house late",
  },
  {
    img: img4,
    leftAudio: "Item-007_",
    rightAudio: "Item-008_",
    alt: "Two dialogue bubbles about a history book and a flat bicycle tire",
  },
];

const Unit7_Page6_Q2 = () => {
  const audioFolder = "Page 63 - Exercise F";
  const questions = ["c", "a", "d", "b"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
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

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correctCount = 0;

    const newResults = answers.map((answer, index) => {
      const ok = normalize(answer) === normalize(questions[index]);

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
    setAnswers(["c", "a", "d", "b"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit7StudentAudio();
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative inline-block">
      <input
        className="unit7-exercise-input"
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
        placeholder="e.g. a"
        title="Write the letter of the matching dialogue"
        aria-label={`Matching dialogue letter ${index + 1}`}
        className="
    w-20
    border-0
    border-b
    outline-none
    bg-transparent
    text-[18px]
    text-black
    font-semibold
    text-center
    px-1
  "
        style={{
          borderBottom:
            result[index] === false ? "1px solid #D1232A" : "1px solid #000",
        }}
      />

      {result[index] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall mb-10 w-full text-[18px]">
        <div style={{ marginBottom: "3vh" }}>
          <ExerciseHeader
            sectionLetter="F"
            title="Match the dialogues so that they make sense."
            subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
          />
        </div>

        <div className="flex flex-col gap-[4vh]">
          {ROWS.map((row, index) => (
            <div key={index} className="relative flex items-center gap-6">
              <span
                className="font-bold"
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "0px",
                }}
              >
                {index + 1}
              </span>

              <div
                style={{
                  position: "relative",
                  width: "720px",
                  height: "100px",
                  flexShrink: 0,
                }}
              >
                <img
                  src={row.img}
                  alt={row.alt}
                  style={{
                    width: "720px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
                <Unit7StudentAudioText
                  src={unit7StudentAudio(audioFolder, row.leftAudio)}
                  ariaLabel={`Play left dialogue in row ${index + 1}`}
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: "50%",
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <span className="sr-only">Left dialogue</span>
                </Unit7StudentAudioText>
                <Unit7StudentAudioText
                  src={unit7StudentAudio(audioFolder, row.rightAudio)}
                  ariaLabel={`Play right dialogue in row ${index + 1}`}
                  style={{
                    position: "absolute",
                    inset: "0 0 0 auto",
                    width: "50%",
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <span className="sr-only">Right dialogue</span>
                </Unit7StudentAudioText>
              </div>

              {inputField(index)}
            </div>
          ))}
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

export default Unit7_Page6_Q2;
