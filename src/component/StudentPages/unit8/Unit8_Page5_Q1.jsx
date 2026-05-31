import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import falseImg from "../../../assets/imgs/false.svg";

const Unit8_Page5_Q2 = () => {
  const questions = ["true", "false", "true", "false", "false", "true"];

  const sentences = [
    { before: "That star ", underlined: "glows", after: " in the night sky." },
    {
      before: "I have a new ",
      underlined: "nighttime",
      after: " phone. It is not connected to wires.",
    },
    {
      before: "The ",
      underlined: "helicopter",
      after: " flew over the city.",
    },
    {
      before: "I used the ",
      underlined: "skills",
      after: " to set the time that the bread will be baked in the oven.",
    },
    {
      before: "This ",
      underlined: "electric",
      after: " can hold many memos and notes.",
    },
    {
      before: "Please turn off the ",
      underlined: "table lamp",
      after: " so that I can sleep in the dark.",
    },
  ];

  const [marks, setMarks] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleMark = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...marks];

    updated[i] = value;

    setMarks(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = marks.some((m) => !m);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = marks.map((mark, i) => {
      const ok = mark === questions[i];

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

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
    setMarks(["true", "false", "true", "false", "false", "true"]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setMarks(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const markBox = (i, value, img) => {
    const active = marks[i] === value;

    const showError =
      result[i] === false &&
      ((value === "true" && marks[i] === "true") ||
        (value === "false" && marks[i] === "false"));

    return (
      <button
        type="button"
        disabled={locked || result[i] === true}
        placeholder={marks[i] === "false" ? "Write the correct expression" : ""}
        onClick={() => handleMark(i, value)}
        className="relative flex items-center  justify-center"
        style={{
          width: "34px",
          height: "34px",
          border: "1.5px solid #7DBA3C",
          borderRadius: "6px",
          background: "transparent",
          cursor: locked || result[i] === true ? "default" : "pointer",
        }}
      >
        {active && (
          <img
            src={img}
            alt={value}
            style={{
              width: "22px",
              height: "22px",
              position: "relative",
              zIndex: 2,
            }}
          />
        )}

        {showError && (
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
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        <div className="header-title-page8 mb-[7vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and write <span className="text-[#D1252B]">✓</span> or{" "}
          <span className="text-[#D1252B]">✕</span> to show if the underlined
          word is used correctly or not.
        </div>

        <div className="flex flex-col gap-[6vh]">
          {sentences.map((sentence, index) => (
            <div key={index} className="flex items-center gap-5">
              <div className="flex items-center gap-2 ">
                {markBox(index, "true", trueImg)}

                {markBox(index, "false", falseImg)}
              </div>

              <span className="font-bold w-5">{index + 1}</span>

              <div>
                {sentence.before}
                <u>{sentence.underlined}</u>
                {sentence.after}
              </div>
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

export default Unit8_Page5_Q2;
