import React, { useState } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";
const GrammarC = () => {
  const questions = [
    {
      before: "Mario and Steven",
      after: "ridden the new roller coaster.",
      correct: "have",
    },
    {
      before: "Maxine",
      after: "seen the water show.",
      correct: "has",
    },
    {
      before: "",
      after: "Karl and I been to England before?",
      correct: "Have",
    },
    {
      before: "I'm surprised that they",
      after: "tried skydiving before.",
      correct: "haven't",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([]);
  const [locked, setLocked] = useState(false);

const handleCheck = () => {
  if (locked) return;

  const isEmpty = answers.some((a) => !a || a.trim() === "");
  if (isEmpty) {
    ValidationAlert.info("Please complete all fields.");
    return;
  }

  const normalize = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/’/g, "'")
      .replace(/\s+/g, " ");

  const getAcceptedAnswers = (correct) => {
    const c = normalize(correct);

    if (c === "haven't") {
      return ["haven't", "have not"];
    }

    if (c === "hasn't") {
      return ["hasn't", "has not"];
    }

    return [c];
  };

  let correctCount = 0;
  const newErrors = [];

  questions.forEach((q, i) => {
    const user = normalize(answers[i]);

    const acceptedAnswers = getAcceptedAnswers(q.correct);

    if (acceptedAnswers.includes(user)) {
      correctCount++;
      newErrors[i] = false;
    } else {
      newErrors[i] = true;
    }
  });

  setErrors(newErrors);

  const total = questions.length;

  const color =
    correctCount === total
      ? "green"
      : correctCount === 0
      ? "red"
      : "orange";

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
    setAnswers(questions.map((q) => q.correct));
    setErrors([]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setErrors([]);
    setLocked(false);
  };

  const renderBlank = (i) => {
    const hasError = errors[i] === true;
    const isCorrect = errors[i] === false;

    return (
      <span className="relative inline-flex items-center mx-1">
        <input
          value={answers[i]}
          disabled={locked || isCorrect}
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
          className={`border-b outline-none w-[140px] text-center font-semibold bg-transparent
            ${hasError ? "border-red-500" : "border-black"}
          `}
        />

        {/* ❌ error badge */}
        {hasError && (
          <span
            style={{
              marginLeft: "6px",
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
              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
              flexShrink: 0,
            }}
          >
            ✕
          </span>
        )}
      </span>
    );
  };

  return (
    <div>
      {/* Title */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">C</span>
        Write <span className="font-bold text-[#f79631]">have</span> or{" "}
        <span className="font-bold text-[#f79631]">has</span> in the blank.
      </h5>

      {/* Questions */}
      <div className="flex flex-col gap-8 text-[15px] mt-4">
        {questions.map((q, i) => (
          <div key={i} className="flex items-baseline gap-1 flex-wrap">
            <span className="font-bold mr-1">{i + 1}</span>
            {q.before && <span>{q.before}</span>}
            {renderBlank(i)}
            <span>{q.after}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default GrammarC;
