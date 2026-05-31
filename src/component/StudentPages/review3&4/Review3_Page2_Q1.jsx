import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review3_Page2_Q1 = () => {
  const questions = [
    {
      id: 0,
      prefilled: false,
      inputAnswer: "If she knew we were home",
      suffix: ", she would come over to our house.",
    },
    {
      id: 1,
      prefilled: false,
      inputAnswer: "If she came over to our house",
      suffix: ", she would have some tea and biscuits with us.",
    },
    {
      id: 2,
      prefilled: false,
      inputAnswer: "If she had some tea and biscuits with us",
      suffix: ", she would stay and talk for a while.",
    },
    {
      id: 3,
      prefilled: false,
      inputAnswer: "If she stayed and talked for a while",
      suffix: ", we would have lots of fun.",
    },
    {
      id: 4,
      prefilled: false,
      inputAnswer: "If we had lots of fun",
      suffix: ", we'd all be very happy!",
    },
  ];

  const initAnswers = () =>
    questions.map((q) => (q.prefilled ? q.inputAnswer : ""));
  const initErrors = () => questions.map(() => false);
  const initLocked = () => questions.map((q) => q.prefilled);

  const [answers, setAnswers] = useState(initAnswers);
  const [errors, setErrors] = useState(initErrors);
  const [correctLocked, setCorrectLocked] = useState(initLocked);
  const [locked, setLocked] = useState(false);

  const normalize = (t) =>
    t
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || correctLocked[i]) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    const updatedErrors = [...errors];
    updatedErrors[i] = false;
    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;
    const hasEmpty = answers.some(
      (a, i) => !correctLocked[i] && normalize(a) === "",
    );
    if (hasEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;
    const newErrors = answers.map((a, i) => {
      if (correctLocked[i]) {
        score++;
        return false;
      }
      const ok = normalize(a) === normalize(questions[i].inputAnswer);
      if (ok) score++;
      return !ok;
    });
    const newLocked = answers.map((a, i) => {
      if (correctLocked[i]) return true;
      return normalize(a) === normalize(questions[i].inputAnswer);
    });

    setErrors(newErrors);
    setCorrectLocked(newLocked);

    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span>
      </div>`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    setAnswers(questions.map((q) => q.inputAnswer));
    setErrors(questions.map(() => false));
    setCorrectLocked(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setErrors(initErrors());
    setCorrectLocked(initLocked());
    setLocked(false);
  };

  const inputStyle = (i) => ({
    border: "none",
    borderBottom: errors[i]
      ? "1.5px solid red"
      : correctLocked[i]
        ? "1.5px solid black"
        : "1.5px solid black",
    outline: "none",
    fontSize: "18px",
    //color: errors[i] ? "#dc2626" : correctLocked[i] ? "#16a34a" : "#6D2980",
    fontWeight: 600,
    background: "transparent",
    paddingBottom: "2px",
    width: "360px",
    textDecoration: questions[i].prefilled ? "underline" : "none",
  });

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall" style={{ gap: "40px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span style={{ marginRight: "10px" }}>D</span>
          Continue the story by adding more information using{" "}
          <span style={{ color: "#f79631", fontStyle: "italic" }}>if</span>.
        </h5>

        {/* OPENING LINE */}
        <p style={{ fontSize: "18px" }}>
          If Rose called, she would know we are home.
        </p>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {/* INPUT */}
              <span style={{ position: "relative", display: "inline-block" }}>
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || correctLocked[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={inputStyle(i)}
                />
                {errors[i] && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
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
                  </span>
                )}
              </span>

              {/* SUFFIX */}
              <span style={{ fontSize: "18px" }}>
                {q.suffix}
              </span>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
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
    </div>
  );
};

export default Review3_Page2_Q1;
