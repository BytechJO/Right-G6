import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import ActionButtons from "../../ActionButtons";

const Unit5_Page6_Q1 = () => {
  const questions = [
    {
      scrambled: "lots they Engineers don't of science study , ?",
      hint: null,
      correct: [
        "Lots of engineers study science, don’t they?",
        "Lots of engineers study science, don't they?",
        "Lots of engineers study science, do not they?",
      ],
    },
    {
      scrambled: "said she would our didn't make Mom lunches she , ?",
      hint: null,
      correct: [
        "Mom said she would make our lunches, didn’t she?",
        "Mom said she would make our lunches, didn't she?",
        "Mom said she would make our lunches, did not she?",
      ],
    },
    {
      scrambled: "he to Zane come wants doesn't , ?",
      hint: { text: "doesn't", label: "doesn't is in the tag" },
      correct: [
        "Zane does want to come too, doesn’t he?",
        "Zane does want to come too, doesn't he?",
        "Zane does want to come too, does not he?",
      ],
    },
    {
      scrambled: "ride coaster she won't the roller Mom will , ?",
      hint: { text: "won't", label: "won't is in the tag" },
      correct: [
        "Mom will ride the roller coaster, won’t she?",
        "Mom will ride the roller coaster, won't she?",
        "Mom will ride the roller coaster, will not she?",
      
      ],
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

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
        (c) => normalize(c) === normalize(a),
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

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A mr-2">D</span>
          Unscramble the sentences and write them with correct punctuation.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            fontSize: "18px",
          }}
        >
          {questions.map((q, i) => (
            <div key={i}>
              {/* Scrambled line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "20px" }}>
                  {i + 1}
                </span>
                <span style={{ color: "#333" }}>
                  {q.scrambled}
                  {q.hint && (
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#e07a30",
                        fontWeight: "600",
                      }}
                    >
                      ({" "}
                      <span style={{ textDecoration: "underline" }}>
                        {q.hint.text}
                      </span>{" "}
                      is in the tag)
                    </span>
                  )}
                </span>
              </div>

              {/* Input line */}
              <div style={{ marginLeft: "30px", position: "relative" }}>
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: `1.5px solid ${
                      result[i] === false
                        ? "#ef4444"
                        : result[i] === true
                          ? "black"
                          : "black"
                    }`,
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                    fontWeight: "600",

                    padding: "4px 4px 6px",
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
                      pointerEvents: "none",
                      zIndex: 3,
                    }}
                  >
                    ✕
                  </span>
                )}
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

export default Unit5_Page6_Q1;
