import React, { useEffect, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 21.svg";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
} from "../unit8/Unit8StudentAudioText";

const Review7_Page2_Q2 = () => {
  const questions = ["b", "c", "a"];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

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
    setAnswers(["b", "c", "a"]);

    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit8StudentAudio();
    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        placeholder="e.g. a"
        title="Type the matching letter"
        aria-label={`Matching letter ${index + 1}`}
        onChange={(e) => handleChange(index, e.target.value)}
        className="
          w-20
          border-0
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          text-center
          px-1
        "
      />

      <div
        style={{
          width: "80px",
          height: "1px",
          background: result[index] === false ? "#D1232A" : "#000",
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
        <ExerciseHeaderReview
          sectionLetter="E"
          title="Read and match the dialogues."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />

        <div className="flex flex-col gap-[8vh]">
          {[1, 2, 3].map((num, index) => (
            <div key={index} className="flex items-center gap-6">
              <div
                className="relative"
                style={{ width: "720px", height: "100px", flexShrink: 0 }}
              >
                <img
                  src={index === 0 ? img1 : index === 1 ? img2 : img3}
                  alt={
                    index === 0
                      ? "Dialogue about a dirty cat"
                      : index === 1
                        ? "Dialogue about feeling sad"
                        : "Dialogue about missing a library meeting"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />

                {[1, 2].map((sentenceNumber) => (
                  <Unit8StudentAudioText
                    key={sentenceNumber}
                    src={unit8StudentAudio(
                      "Page 71 - Exercise E",
                      `image${num}_${sentenceNumber}`,
                    )}
                    ariaLabel={`Play sentence ${sentenceNumber} in dialogue ${num}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: sentenceNumber === 1 ? 0 : "50%",
                      width: "50%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <span className="sr-only">
                      Sentence {sentenceNumber} in dialogue {num}
                    </span>
                  </Unit8StudentAudioText>
                ))}
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

export default Review7_Page2_Q2;
