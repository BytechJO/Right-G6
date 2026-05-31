import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review3_Page2_Q3 = () => {
  const questions = [
    {
      id: 0,
      prompt: "Rick/ buy/ skateboard/ where/ ride/ it/?",
      answer: "If Rick bought a skateboard, where would he ride it?",
      prefilled: false,
    },
    {
      id: 1,
      prompt: "brother/ go/ skiing/ where/ get/ skis/?",
      answer: "If my brother went skiing, where would he get skis?",
      prefilled: false,
    },
    {
      id: 2,
      prompt: "Heidi/ visit/ friend/ how/ travel/ there/?",
      answer: "If Heidi visited my friend, how would she travel there?",
      prefilled: false,
    },
  ];

  const initAnswers = () => questions.map((q) => (q.prefilled ? q.answer : ""));
  const initErrors = () => questions.map(() => false);
  const initLocked = () => questions.map((q) => q.prefilled);

  const [answers, setAnswers] = useState(initAnswers);
  const [errors, setErrors] = useState(initErrors);
  const [correctLocked, setCorrectLocked] = useState(initLocked);
  const [locked, setLocked] = useState(false);

  const normalize = (t) =>
    t.toLowerCase().replace(/[.,!]/g, "").replace(/\s+/g, " ").trim();

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
      const ok = normalize(a) === normalize(questions[i].answer);
      if (ok) score++;
      return !ok;
    });
    const newLocked = answers.map((a, i) => {
      if (correctLocked[i]) return true;
      return normalize(a) === normalize(questions[i].answer);
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
    setAnswers(questions.map((q) => q.answer));
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
    width: "100%",
    border: "none",
    borderBottom: errors[i]
      ? "1.5px solid #dc2626"
      : correctLocked[i]
        ? "1.5px solid black"
        : "1.5px solid black",
    outline: "none",
    fontSize: "18px",
    // color: errors[i] ? "#dc2626" : correctLocked[i] ? "#16a34a" : "#6D2980",
    fontWeight: 600,
    background: "transparent",
    paddingBottom: "3px",
    textDecoration: questions[i].prefilled ? "underline" : "none",
  });

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span style={{ marginRight: "10px" }}>
            F
          </span>
          Make a question from the sentence parts.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "70px",
            marginBottom: "60px",
          }}
        >
          {questions.map((q, i) => (
            <div key={q.id}>
              {/* PROMPT LINE */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    minWidth: "20px",
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: "18px" }}>{q.prompt}</span>
              </div>

              {/* ANSWER INPUT */}
              <div style={{ position: "relative", marginLeft: "30px" }}>
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
              </div>
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

export default Review3_Page2_Q3;
