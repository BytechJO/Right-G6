import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

const GrammarC = () => {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!;:'’"]/g, "")

      .trim();
  const questions = [
    {
      statement: "Carriages are used a lot today.",
      correct: "Carriages are not used a lot today", // أو aren't — ما يهم
    },
    {
      statement: "Salt is used to make candy.",
      correct: "Salt is not used to make candy",
    },
    {
      statement: "The pencil is sharpened by Kristina.",
      correct: "The pencil is not sharpened by Kristina",
    },
  ];

  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([null, null, null]);
  const [locked, setLocked] = useState(false);

  const handleInput = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
    const updatedResult = [...result];
    updatedResult[i] = null;
    setResult(updatedResult);
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((a) => a.trim() === "");
    if (hasEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;
    const res = answers.map((ans, i) => {
      const isCorrect =
        normalize(ans) === normalize(questions[i].correct) ||
        normalize(ans) ===
          normalize(questions[i].correct.replace("is not", "isn't"))||normalize(ans) ===
          normalize(questions[i].correct.replace("are not", "aren't"))
      if (isCorrect) score++;
      return isCorrect;
    });

    setResult(res);

    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">Score: ${score} / ${total}</span>
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
    setAnswers(questions.map((q) => q.correct));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", ""]);
    setResult([null, null, null]);
    setLocked(false);
  };

  return (
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">C</span>
        Change each statement to a negative one.
      </h5>

      <div className="flex flex-col gap-10 mt-10 text-[18px]">
        {questions.map((q, i) => (
          <div key={i}>
            {/* STATEMENT */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold">{i + 1}</span>
              <span>{q.statement}</span>
            </div>

            {/* EXAMPLE (Q1 only) */}
            {q.example && (
              <div className="underline italic ml-5 mb-1 text-[17px]">
                {q.example}
              </div>
            )}

            {/* INPUT */}
            <div className="relative ml-5">
              <input
                type="text"
                value={answers[i]}
                disabled={locked || result[i] === true}
                onChange={(e) => handleInput(i, e.target.value)}
                className={`w-full border-b outline-none bg-transparent text-[17px] font-semibold py-1
                  ${
                    result[i] === false ? "border-red-500" : "border-gray-400"
                  }`}
              />
              {result[i] === false && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-28px",
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
      <div className="flex justify-center gap-6 mt-10">
        <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default GrammarC;
