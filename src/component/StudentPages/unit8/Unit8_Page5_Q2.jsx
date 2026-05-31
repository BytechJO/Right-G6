import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit8_Page5_Q2 = () => {
  const threeWordExpressions = [
    ["here", "you", "are"],
    ["come", "in", "handy"],
    ["a", "great", "deal"],
  ];

  const twoWordExpressions = [
    ["in", "ages"],
    ["show", "up"],
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

    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().trim();

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

    const hasEmpty = answers.some((item) => !item.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    const rowValues = [
      answers.slice(0, 3).map(normalize).join(" "),
      answers.slice(3, 5).map(normalize).join(" "),
      answers.slice(5, 8).map(normalize).join(" "),
      answers.slice(8, 10).map(normalize).join(" "),
      answers.slice(10, 13).map(normalize).join(" "),
    ];

    const seen = new Set();

    const rowsResults = rowValues.map((row) => {
      const isValid =
        threeWordExpressions.some((exp) => exp.join(" ") === row) ||
        twoWordExpressions.some((exp) => exp.join(" ") === row);

      const isDuplicate = seen.has(row);

      if (isValid && !isDuplicate) {
        seen.add(row);
        return true;
      }

      return false;
    });
    let correctCount = rowsResults.filter(Boolean).length;

    setResult(rowsResults);

    const total = 5;

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
    setAnswers([
      "Here",
      "you",
      "are",

      "in",
      "ages",

      "come",
      "in",
      "handy",

      "show",
      "up",

      "a",
      "great",
      "deal",
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (answerIndex, rowIndex) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[answerIndex]}
        disabled={locked || result[rowIndex] === true}
        onChange={(e) => handleChange(answerIndex, e.target.value)}
        className="
          w-[140px]
          border-0
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1
        "
      />

      <div
        style={{
          width: "140px",
          height: "1px",
          background: "black",
        }}
      />
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Put the words together to make expressions.
        </h5>

        {/* WORD BANK */}
        <div className="flex justify-center mb-10">
          <div
            className="rounded-[18px] px-8 py-4"
            style={{
              background: "#DDE3C8",
            }}
          >
            <div className="flex gap-16 mb-3 ">
              <span>are</span>
              <span>great</span>
              <span>in</span>
              <span>you</span>
              <span>deal</span>
              <span>come</span>
              <span>Here</span>
            </div>

            <div className="flex gap-16">
              <span>ages</span>
              <span>handy</span>
              <span>in</span>
              <span>up</span>
              <span>a</span>
              <span>show</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* 1 */}
          <div className="flex items-center gap-5 relative">
            <span className="font-bold w-5">1</span>

            {inputField(0, 0)}
            {inputField(1, 0)}
            {inputField(2, 0)}

            {result[0] === false && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "250px",
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
          </div>

          {/* 2 */}
          <div className="flex items-center gap-5 relative">
            <span className="font-bold w-5">2</span>

            {inputField(3, 1)}
            {inputField(4, 1)}
            {result[1] === false && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "250px",
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
          </div>

          {/* 3 */}
          <div className="flex items-center gap-5 relative">
            <span className="font-bold w-5">3</span>

            {inputField(5, 2)}
            {inputField(6, 2)}
            {inputField(7, 2)}
            {result[2] === false && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "250px",
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
          </div>

          {/* 4 */}
          <div className="flex items-center gap-5 relative">
            <span className="font-bold w-5">4</span>

            {inputField(8, 3)}
            {inputField(9, 3)}
            {result[3] === false && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "250px",
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
          </div>

          {/* 5 */}
          <div className="flex items-center gap-5 relative">
            <span className="font-bold w-5">5</span>

            {inputField(10, 4)}
            {inputField(11, 4)}
            {inputField(12, 4)}
            {result[4] === false && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "250px",
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
          </div>
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
