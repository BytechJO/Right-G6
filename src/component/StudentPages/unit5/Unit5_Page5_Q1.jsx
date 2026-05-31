import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit5_Page5_Q1 = () => {
  const wordBank = ["boss", "suppose", "bookworm", "active", "imagination"];

  const questions = [
    {
      definition: "the ability to think of new things",
      correct: "imagination",
    },
    { definition: "to believe something to be possible", correct: "suppose" },
    { definition: "someone who reads a lot", correct: "bookworm" },
    {
      definition:
        "the person who has more power or control; the person whose job is to tell others what to do",
      correct: "boss",
    },
    {
      definition: "full of action or life; marked by regular use",
      correct: "active",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);
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
      const ok = a.trim().toLowerCase() === questions[i].correct.toLowerCase();
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
    setAnswers(questions.map((q) => q.correct));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{gap:"40px"}}>
        {/* HEADER */}
        <h5 className="header-title-page8">
          <span className="ex-A mr-2">A</span>
          Write the correct word that matches the definition.
        </h5>

        {/* WORD BANK */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
            background: "#eaf4d8",
            // border: "1.5px solid #b8dfa0",
            borderRadius: "8px",
            padding: "10px 20px",
            marginBottom: "28px",
            justifyContent: "space-around",
          }}
        >
          {wordBank.map((w, i) => (
            <span
              key={i}
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#2c5a0e",
                padding: "2px 10px",
              }}
            >
              {w}
            </span>
          ))}
        </div>

        {/* QUESTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                fontSize: "18px",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "18px",
                  marginTop: "4px",
                }}
              >
                {i + 1}
              </span>

              {/* Input */}
              <div style={{ position: "relative", minWidth: "200px" }}>
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
                    fontSize: "16px",
                    fontWeight: "600",

                    width: "200px",
                    padding: "2px 4px",
                    textAlign: "center",
                  }}
                />
                {/* ✕ badge */}
                {result[i] === false && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      width: "22px",
                      height: "22px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      zIndex: 3,
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>

              {/* Equals + Definition */}
              <span
                style={{ marginTop: "2px", color: "#333", lineHeight: "1.5" }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "18px",
                    marginRight: "8px",
                  }}
                >
                  =
                </span>
                {q.definition}
              </span>
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
    </div>
  );
};

export default Unit5_Page5_Q1;
