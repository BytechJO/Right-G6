import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit5_Page5_Q2 = () => {
  const questions = [
    {
      before: "We could reach for the stars",
      after: ",",
      second: "Or we could reach the colorful rainbow.",
      correct: ["if you say so"],
      inputPosition: "inline", // blank at end of first line
    },
    {
      before: "You will find food if",
      after: ",",
      second: "But please don't let anything go to waste.",
      correct: ["it suits your taste"],
      inputPosition: "inline",
    },
    {
      before: "I will see you in",
      after: ".",
      second: "Seeing you makes me smile.",
      correct: ["a while"],
      inputPosition: "inline",
    },
    {
      before: "If you don't want to go with us, you don't have to.",
      after: null,
      second: ", we'll go without you.",
      correct: ["Suit yourself"],
      inputPosition: "second-start", // blank at start of second line
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = questions[i].correct.some(
        (c) => c.toLowerCase() === a.trim().toLowerCase(),
      );
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const msg = `Score: ${correctCount} / ${questions.length}`;
    if (correctCount === questions.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.correct[0]));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const inputEl = (i, width = 220) => (
    <span
      style={{
        position: "relative",
        display: "inline-block",

        width: `70%`,
      }}
    >
      <input
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        style={{
          borderBottom: `1px solid ${
            result[i] === false
              ? "#ef4444"
              : result[i] === true
                ? "black"
                : "black"
          }`,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          outline: "none",
          background: "transparent",
          fontSize: "18px",
          fontWeight: "600",

          width: `100%`,
          padding: "2px 6px",
          marginLeft: "6px",
          marginRight: "2px",
        }}
      />
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
            width: "18px",
            height: "18px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A mr-2">B</span>
          Use the poem clues to find the expressions.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
            fontSize: "18px",
          }}
        >
          {questions.map((q, i) => (
            <div key={i} style={{ display: "flex", gap: "10px" }}>
              {/* Number */}
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "18px",
                  paddingTop: "2px",
                }}
              >
                {i + 1}
              </span>

              <div style={{ flex: 1 }}>
                {/* First line */}
                {q.inputPosition === "inline" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      // flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        width: `fit-content`,
                      }}
                    >
                      {q.before}
                    </span>
                    {inputEl(i, 220)}
                    <span>{q.after}</span>
                  </div>
                )}
                {q.inputPosition === "second-start" && (
                  <div style={{ lineHeight: "1.8" }}>
                    <span>{q.before}</span>
                  </div>
                )}

                {/* Second line */}
                <div
                  style={{
                    // color: "#444",
                    marginTop: "6px",
                    display: "flex",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                  }}
                >
                  {q.inputPosition === "second-start" && (
                    <>
                      {inputEl(i, 240)}
                      <span>{q.second}</span>
                    </>
                  )}
                  {q.inputPosition === "inline" && <span>{q.second}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
      {/* BUTTONS */}
    </div>
  );
};

export default Unit5_Page5_Q2;
