import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 20.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 21.svg";

const questions = [
  {
    id: 1,
    image: img1,
    isCheck: false, // ✗ = doesn't do it often
    starter: "He never used to ",
  },
  {
    id: 2,
    image: img2,
    isCheck: true, // ✓ = does it often
    starter: "She used to ",
  },
  {
    id: 3,
    image: img3,
    isCheck: false,
    starter: "He never used to ",
  },
  {
    id: 4,
    image: img4,
    isCheck: true,
    starter: "She used to ",
  },
];

const correctAnswers = [
  "He isn’t used to taking a picture.",
  "He is used to riding a bike.",
  "He isn’t used to riding a bike.",
  "He is used to cooking.",
];

const Unit6_Page6_Q2 = () => {
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
      .replace(/[.,!?'"’;:]/g, "")
      .replace(/\s+/g, " ");

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
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A mr-2">E</span>
          What does each person do often? Look at the pictures and the{" "}
          <span style={{ color: "#f79631", fontWeight: "bold" }}>
            ✓
          </span> or{" "}
          <span style={{ color: "#f79631", fontWeight: "bold" }}>✗</span>, then
          write a sentence to tell about it.
        </h5>

        {/* IMAGES ROW */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "28px",
            justifyContent: "space-between",
          }}
        >
          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                flex: 1,
                display: "flex",
                // flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
              }}
            >
              {/* Number */}
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                {q.id}
              </span>

              {/* Image + badge */}

              <img
                src={q.image}
                alt={`person ${q.id}`}
                style={{
                  width: "auto",
                  height: "130px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>

        {/* ANSWER LINES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}
            >
              <span
                style={{ fontWeight: "bold", fontSize: "16px", flexShrink: 0 }}
              >
                {q.id}
              </span>

              <div style={{ flex: 1, position: "relative" }}>
                <input
                  type="text"
                  value={answers[index]}
                  disabled={locked || correctLocked[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: errors[index]
                      ? "2px solid #ef4444"
                      : "1px solid black",
                    outline: "none",
                    background: "transparent",
                    fontSize: "16px",
                    fontWeight: "600",
                    // color: "#6D2980",
                    padding: "2px 28px 2px 4px",
                  }}
                  // placeholder={q.starter}
                />

                {/* ✕ error badge */}
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

export default Unit6_Page6_Q2;
