import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";

const QUESTIONS = [
  {
    question: "I have read the newspaper.",
    suggested: "I haven’t read the newspaper.",
    correct: [
      "I haven’t read the newspaper",
      "I have not read the newspaper",
    ],
  },
  {
    question: "Aaron and Jim haven’t been to Disneyland before.",
    suggested:
      "Aaron and Jim have been to Disneyland before.",
    correct: [
      "Aaron and Jim have been to Disneyland before",
    ],
  },
  {
    question: "Haven’t you met the president before?",
    suggested:
      "Have you met the president before?",
    correct: [
      "Have you met the president before",
    ],
  },
  {
    question: "My cousin has seen that movie.",
    suggested:
      "My cousin hasn’t seen that movie.",
    correct: [
      "My cousin hasn’t seen that movie",
      "My cousin has not seen that movie",
    ],
  },
];

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/have not/g, "haven’t")
    .replace(/has not/g, "hasn’t");

const Review1_Page2_Q3 = () => {
  const [answers, setAnswers] = useState(
    Array(QUESTIONS.length).fill("")
  );

  const [showSuggested, setShowSuggested] =
    useState(false);

  const [result, setResult] = useState(
    Array(QUESTIONS.length).fill(null)
  );

  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    setAnswers((prev) =>
      prev.map((a, idx) => (idx === i ? val : a))
    );

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = null;
      return copy;
    });
  };

  // ✅ CHECK ANSWERS
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info(
        "Please complete all fields."
      );
      return;
    }

    let correctCount = 0;

    const newResult = answers.map((a, i) => {
      const ok = QUESTIONS[i].correct.some(
        (c) => normalize(a) === normalize(c)
      );

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResult);

    const total = QUESTIONS.length;

    const color =
      correctCount === total
        ? "green"
        : correctCount === 0
        ? "red"
        : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
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

  // 👀 SHOW ANSWERS
  const handleShow = () => {
    setAnswers(QUESTIONS.map((q) => q.suggested));
    setShowSuggested(true);
    setResult(Array(QUESTIONS.length).fill(true));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setShowSuggested(false);
    setResult(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div
        className="div-forall"
        style={{ gap: "40px" }}
      >
        {/* Title */}
        <h5 className="header-title-page8 mb-7">
          <span className="mr-2">E</span>
          Change the positive sentences to negative
          sentences and the negative sentences to
          positive sentences.
        </h5>

        <div className="flex flex-col gap-7 text-[18px] mt-5">
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-2"
            >
              {/* Question */}
              <div className="flex items-start gap-2">
                <span className="font-bold shrink-0">
                  {i + 1}
                </span>

                <span>{q.question}</span>
              </div>

              {/* Answer Input */}
              <div
                style={{
                  position: "relative",
                  marginLeft: "20px",
                }}
              >
                <input
                  value={answers[i]}
                  onChange={(e) =>
                    handleChange(
                      i,
                      e.target.value
                    )
                  }
                  disabled={
                    locked || result[i] === true
                  }
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom:
                      result[i] === false
                        ? "2px solid red"
                        : "1px solid #555",
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                    fontWeight: showSuggested
                      ? "500"
                      : "400",
                    padding: "2px 0",
                  }}
                />

                {/* ❌ icon */}
                {result[i] === false && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "22px",
                      height: "22px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border:
                        "2px solid white",
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

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          handleStartAgain={handleReset}
          handleShowAnswer={handleShow}
          checkAnswers={handleCheck}
        />
      </div>
    </div>
  );
};

export default Review1_Page2_Q3;