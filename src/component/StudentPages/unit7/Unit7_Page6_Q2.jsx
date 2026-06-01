import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 12.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 13.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 14.svg";

const Unit7_Page6_Q2 = () => {
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
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
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
      <div className="div-forall w-full text-[18px]">
        <h5 className="header-title-page8 mb-[3vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Match the dialogues so that they make sense.
        </h5>

        <div className="flex flex-col gap-[4vh]">
          {[1, 2, 3, 4].map((num, index) => (
            <div key={index} className="relative flex items-center gap-6">
              <span
                className="font-bold"
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "0px",
                }}
              >
                {num}
              </span>

              <img
                src={
                  index === 0
                    ? img1
                    : index === 1
                      ? img2
                      : index === 2
                        ? img3
                        : img4
                }
                alt={`question ${num}`}
                style={{
                  width: "720px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />

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
