import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const questions = [
  {
    id: 1,
    text: "The boy doesn't like science fiction,",
    wrongTag: "would he?",
  },
  {
    id: 2,
    text: "Michael has a good imagination,",
    wrongTag: "can't he?",
  },
  {
    id: 3,
    text: "She wants to come with us,",
    wrongTag: "could she?",
  },
  {
    id: 4,
    text: "That is your opinion,",
    wrongTag: "doesn't it?",
  },
  {
    id: 5,
    text: "Your speech is going to persuade the students to vote for you,",
    wrongTag: "won't it?",
  },
];

const correctAnswers = [
  "does he?",
  "doesn't he?",
  "does she?",
  "isn't it?",
  "isn't it?",
];

const Review5_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [errors, setErrors] = useState(Array(questions.length).fill(false));
  const [correctLocked, setCorrectLocked] = useState(
    Array(questions.length).fill(false),
  );
  const [locked, setLocked] = useState(false);

  const normalize = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/isn't/g, "is not")
      .replace(/isn’t/g, "is not")
      .replace(/doesn’t/g, "does not")
      .replace(/doesn't/g, "does not")
      .replace(/[.,!?'"’;:]/g, "")
      .replace(/\s+/g, " ");

  const updateAnswer = (index, value) => {
    if (locked || correctLocked[index]) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    const errs = [...errors];
    errs[index] = false;
    setErrors(errs);
  };

  const checkAnswers = () => {
    if (locked) return;
    const isEmpty = answers.some((a) => normalize(a) === "");
    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let score = 0;
    const newErrors = answers.map((ans, i) => {
      const isCorrect = normalize(ans) === normalize(correctAnswers[i]);
      if (isCorrect) score++;
      return !isCorrect;
    });
    setErrors(newErrors);
    setCorrectLocked(newErrors.map((e) => !e));
    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers([...correctAnswers]);
    setErrors(Array(questions.length).fill(false));
    setCorrectLocked(Array(questions.length).fill(true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(questions.length).fill(""));
    setErrors(Array(questions.length).fill(false));
    setCorrectLocked(Array(questions.length).fill(false));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span className="mr-2">C</span>
          The question tags are incorrect. Rewrite each question tag correctly.
        </h5>

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px]">
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              {/* Number */}
              <span
                style={{ fontWeight: "bold", fontSize: "20px", flexShrink: 0 }}
              >
                {q.id}
              </span>

              {/* Sentence text */}
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{q.text}</span>

              {/* Wrong tag (underlined) */}
              <span
                style={{
                  fontSize: "18px",
                  textDecoration: "underline",
                  flexShrink: 0,
                }}
              >
                {q.wrongTag}
              </span>

              {/* Answer input */}
              <div style={{ flex: 1, minWidth: "140px", position: "relative" }}>
                <input
                  type="text"
                  value={answers[index]}
                  disabled={locked || correctLocked[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: errors[index]
                      ? "2px solid red"
                      : "1px solid black",
                    outline: "none",
                    textAlign: "center",
                    background: "transparent",
                    fontSize: "18px",
                    // fontWeight: "600",
                    // color: "#6D2980",
                    padding: "2px 28px 2px 4px",
                  }}
                />
                {errors[index] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0",
                      transform: "translateY(-50%)",
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
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* BUTTONS */}
      <div className="action-buttons-container mt-10">
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

export default Review5_Page2_Q1;
