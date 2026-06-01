import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const questions = [
  { id: 1, text: "That sure is nothing." },
  { id: 2, text: "to my loving" },
  { id: 3, text: "from the way" },
  { id: 4, text: "talking of" },
  { id: 5, text: "go behind" },
];

const correctAnswers = [
  "That sure is something.",
  "to my liking",
  "by the way",
  "speaking of",
  "go ahead",
];

const Unit6_Page5_Q2 = () => {
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
      .replace(/\s+/g, " ")
      .replace(/[?.""'',!]/g, "");

  const updateAnswer = (index, value) => {
    if (locked || correctLocked[index]) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    const updatedErrors = [...errors];
    updatedErrors[index] = false;
    setErrors(updatedErrors);
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
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span>
      </div>
    `;

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
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-4">
          <span className="ex-A mr-2">B</span>
          Read and change each expression to make it correct. Rewrite it.
        </h5>

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px] mt-10">
          {questions.map((q, index) => (
            <div key={q.id} className="flex items-center gap-2">
              {/* Number */}
              <span className="font-bold shrink-0">{q.id}</span>

              {/* Original text */}
              <span className="shrink-0">{q.text}</span>

              {/* Dashed line + input */}
              <div className="relative flex-1 flex items-center">
                {/* decorative dashes before input */}

                <input
                  type="text"
                  value={answers[index]}
                  disabled={locked || correctLocked[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: errors[index]
                      ? "2px solid #ef4444"
                      : "1px solid #aaa",
                    outline: "none",
                    background: "transparent",
                    fontSize: "17px",
                    fontWeight: "600",
                    // color: "#6D2980",
                    padding: "0 4px",
                  }}
                />

                {/* ❌ error icon */}
                {errors[index] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0px",
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

export default Unit6_Page5_Q2;
