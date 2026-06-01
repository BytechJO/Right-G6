import React, { useState } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
const Review5_Page2_Q3 = () => {
  const questions = [
    { id: 1, sentence: "Shannon won’t be home for dinner, will she?" },
    { id: 2, sentence: "The bear can’t smell us from here, can it?" },
    { id: 3, sentence: "The dress doesn’t fit well, does it?" },
    { id: 4, sentence: "Tom wouldn’t come this far, would he?" },
  ];

  const correctAnswers = [
    ["Shannon will be home for dinner, won't she?"],
    ["The bear can smell us from here, can't it?"],
    ["The dress fits well, doesn't it?", "The dress does fit well, doesn't it?"],
    ["Tom would come this far, wouldn't he?"],
  ];

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
      .replace(/won’t/g, "will not")
      .replace(/won't/g, "will not")
      .replace(/can’t/g, "can not")
      .replace(/can't/g, "can not")
      .replace(/doesn’t/g, "does not")
      .replace(/doesn't/g, "does not")
      .replace(/wouldn’t/g, "would not")
      .replace(/wouldn't/g, "would not")
      .replace(/[.,!?'"’;:]/g, "")
      .replace(/\s+/g, " ");

  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    const updatedErrors = [...errors];
    updatedErrors[index] = false;
    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => normalize(a) === "");
    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;
const newErrors = answers.map((ans, i) => {
  const isCorrect = correctAnswers[i].some(
    (correct) => normalize(ans) === normalize(correct)
  );

  if (isCorrect) score++;
  return !isCorrect;
});

    setErrors(newErrors);
    setCorrectLocked(newErrors.map((e) => !e));

    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
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

  const handleShow = () => {
    setAnswers([...correctAnswers]);
    setErrors(Array(questions.length).fill(false));
    setCorrectLocked(Array(questions.length).fill(true));
    setLocked(true);
  };

  const handleReset = () => {
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
          <span className="mr-4">E</span>
          Change the question tag from negative to positive or from positive to
          negative. Make other necessary changes.
        </h5>

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px]">
          {questions.map((q, index) => (
            <div key={q.id} className="flex flex-col gap-1">
              {/* Question row */}
              <div className="flex items-center gap-3">
                <span className="font-bold">{q.id}</span>
                <span>{q.sentence}</span>
              </div>

              {/* Answer input row */}
              <div className="relative flex items-center gap-2 pl-6">
                <input
                  type="text"
                  value={answers[index]}
                  disabled={locked || correctLocked[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  className={`border-b outline-none w-full font-semibold px-2 bg-transparent
                  ${errors[index] ? "border-red-500" : "border-black"}
                `}
                />

                {/* ❌ */}
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
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={handleShow}>
          Show Answer
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review5_Page2_Q3;
