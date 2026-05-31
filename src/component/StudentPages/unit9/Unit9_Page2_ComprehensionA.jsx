import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  {
    question: "The greatest number of people have been doing this activity.",
    correct: ["horseback riding"],
  },
  {
    question: "Six people have tried this activity.",
    correct: ["sailing"],
  },
  {
    question: "One fifth of the total number of students have tried this.",
    correct: ["skate boarding"],
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Unit9_Page2_ComprehensionA = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const [errors, setErrors] = useState(Array(QUESTIONS.length).fill(null));

  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;

    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }

    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleCheck = () => {
    if (locked) return;

    if (answers.includes("")) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;

    const newErrors = answers.map((a, i) => {
      const ok = QUESTIONS[i].correct.some(
        (c) => normalize(a) === normalize(c),
      );

      if (ok) correct++;

      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = QUESTIONS.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(QUESTIONS.map((q) => q.correct[0]));
    setErrors(Array(QUESTIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div>
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">A</span>
        Write which activity matches the description.
      </h5>

      <div className="flex flex-col gap-6 text-[18px] mt-5">
        {QUESTIONS.map((q, i) => {
          const hasError = errors[i] === true;
          const isOk = errors[i] === false;

          return (
            <div
              key={i}
              className="flex items-center justify-between gap-3 w-full"
            >
              {/* الرقم */}
              <span className="font-bold shrink-0">{i + 1}</span>

              {/* السؤال */}
              <span className="flex-1">{q.question}</span>

              {/* الانبوت */}
              <div
                className="relative shrink-0"
                style={{
                  width: "250px",
                }}
              >
                <input
                  value={answers[i]}
                  disabled={locked || isOk}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    borderBottom: `${
                      hasError ? "1px solid  #ef4444" : "1px solid  #555"
                    }`,
                    outline: "none",
                    textAlign: "center",
                    background: "transparent",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "2px 0",
                  }}
                />

                {hasError && (
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
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      zIndex: 5,
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit9_Page2_ComprehensionA;
