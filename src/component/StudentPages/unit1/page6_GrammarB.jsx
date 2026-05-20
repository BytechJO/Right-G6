import React, { useState } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const GrammarB = () => {
  const questions = [
    {
      sentence: "Hasn't Dora gone to the store?",
      type: ".", // statement
      answer: "Dora hasn't gone to the store.",
    },
    {
      sentence: "You have heard that concert before.",
      type: "?", // question
      answer: "Have you heard that concert before?",
    },
    {
      sentence: "Haven't they finished the job?",
      type: ".", // statement
      answer: "They haven't finished the job.",
    },
    {
      sentence: "Alan has been to Italy.",
      type: "X", // negative
      answer: "Alan hasn't been to Italy.",
    },
  ];

  const exampleIndex = 0; // Q1 is pre-filled as example

  const initialAnswers = questions.map((q, i) => "");

  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState([]);
  const [locked, setLocked] = useState(false);

const normalize = (text) => {
  return text
    .trim()
    .toLowerCase()

    // contractions
    .replace(/\bhave not\b/g, "haven't")
    .replace(/\bhas not\b/g, "hasn't")

    // remove punctuation
    .replace(/’/g, "'")

    // normalize spaces
    .replace(/\s+/g, " ")
    .trim();
};
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a, i) =>
      i === exampleIndex ? false : !a || a.trim() === "",
    );

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newErrors = [];

    questions.forEach((q, i) => {
      if (normalize(answers[i]) === normalize(q.answer)) {
        correctCount++;
        newErrors[i] = false;
      } else {
        newErrors[i] = true;
      }
    });

    setErrors(newErrors);

    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
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

  const handleShow = () => {
    setAnswers(questions.map((q) => q.answer));
    setErrors([]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setErrors([]);
    setLocked(false);
  };

  const getTypeLabel = (type) => {
    if (type === ".") return ".";
    if (type === "?") return "?";
    if (type === "X") return "X";
    return "";
  };

  return (
    <div>
      {/* Title */}
      <h5 className="header-title-page8-read mb-12">
        <span className="ex-A-read mr-2">B</span>
        Read, and then change to a statement (
        <span
          className={`font-bold text-[#f79631]
                  `}
        >
          .
        </span>
        ), question (
        <span
          className={`font-bold text-[#f79631]
                  `}
        >
          ?
        </span>
        ), or negative (
        <span
          className={`font-bold text-[#f79631]
                  `}
        >
          X
        </span>
        ).
      </h5>

      {/* Questions */}
      <div className="flex flex-col gap-6 text-[16px] mt-4">
        {questions.map((q, i) => {
          const isLocked = locked || errors[i] === false;

          return (
            <div key={i} className="flex flex-col gap-1">
              {/* Question row */}
              <div className="flex items-center gap-2">
                <span className="font-bold min-w-[20px]">{i + 1}</span>
                <span>{q.sentence}</span>
                <span>(</span>
                <span
                  className={`font-bold text-[#f79631]
                  `}
                >
                  {getTypeLabel(q.type)}
                </span>
                <span>)</span>
                {/* ❌ error badge */}
                {errors[i] === true && (
                  <div
                    style={{
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
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>

              {/* Answer input row */}
              <div className="ml-6">
                <input
                  value={answers[i]}
                  disabled={isLocked}
                  onChange={(e) => {
                    const updated = [...answers];
                    updated[i] = e.target.value;
                    setAnswers(updated);
                    // احذف الخطأ فقط للانبوت الحالي
                    setErrors((prev) => ({
                      ...prev,
                      [i]: undefined,
                    }));
                  }}
                  className={`border-b outline-none w-full max-w-[480px] font-semibold
                    ${errors[i] === true ? "border-red-500" : "border-black"}
                  `}
                  placeholder={"Write your answer here..."}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default GrammarB;
