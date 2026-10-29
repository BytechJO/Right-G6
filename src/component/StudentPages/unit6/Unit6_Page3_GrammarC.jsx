import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

const Unit6_Page3_GrammarC = () => {
  const questions = [
    { id: 1, sentence: "I study science every day." },
    { id: 2, sentence: "The teacher corrects papers almost all the time." },
    { id: 3, sentence: "My friend eats fish twice a week." },
  ];

  const correctAnswers = [
    "I am used to studying science.",
    "The teacher is used to correcting papers.",
    "My friend is used to eating fish twice a week.",
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
      .replace(/\s+/g, " ")
      .replace(/[?.''"",]/g, "");

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
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">B</span>
        After reading each of the following sentences, write what the person is
        used to doing.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-8 text-[18px] mt-10">
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

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 ">
        <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit6_Page3_GrammarC;
