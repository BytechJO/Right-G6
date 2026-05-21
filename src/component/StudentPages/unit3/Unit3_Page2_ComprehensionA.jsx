import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  { id: 1, text: "Susan didn't get on the bus.", correct: "true" },
  {
    id: 2,
    text: "Susan and Lana will probably arrive at school early.",
    correct: "false",
  },
  { id: 3, text: "Lana has a small family.", correct: "false" },
  {
    id: 4,
    text: "Susan and Lana don't have tests in school today.",
    correct: "true",
  },
  { id: 5, text: "Lana doesn't carry any books.", correct: "false" },
];

const normalize = (str) => str.toLowerCase().trim();

const Unit3_Page2_ComprehensionA = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [errors, setErrors] = useState(Array(QUESTIONS.length).fill(null));
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    if (errors[i] === true)
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleCheck = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correct = 0;
    const newErrors = answers.map((a, i) => {
      const ok = normalize(a) === normalize(QUESTIONS[i].correct);
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
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    setAnswers(QUESTIONS.map((q) => q.correct));
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
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">A</span>
        Write <span style={{ color: "#f79631", fontWeight: "bold" }}>
          true
        </span>{" "}
        or <span style={{ color: "#f79631", fontWeight: "bold" }}>false</span>{" "}
        next to each statement.
      </h5>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {QUESTIONS.map((q, i) => {
          const hasError = errors[i] === true;
          const isOk = errors[i] === false;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                fontSize: "18px",
              }}
            >
              {/* الـ input */}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "90px",
                }}
              >
                <input
                  value={answers[i]}
                  disabled={locked || isOk}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "90px",
                    borderBottom: hasError
                      ? "2px solid red"
                      : "1px solid #555",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                    fontWeight: 500,
                    textAlign: "center",
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
              </span>

              {/* الرقم */}
              <span style={{ fontWeight: "bold", minWidth: "20px" }}>
                {q.id}
              </span>

              {/* النص */}
              <span>{q.text}</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-6">
        <ActionButtons
          onShow={handleShow}
            onReset={handleReset}
            onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit3_Page2_ComprehensionA;
