import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review4_Page1_Q1 = () => {
  const questions = [
    {
      id: 0,
      words: ["gear", "rag", "ran", "near"],
      answer: "range",
      prefilled: false,
    },
    {
      id: 1,
      words: ["sieve", "vein", "ruin", "sour"],
      answer: "souvenirs",
      prefilled: false,
    },
    {
      id: 2,
      words: ["tile", "once", "tell", "collect"],
      answer: "collection",
      prefilled: false,
    },
    {
      id: 3,
      words: ["cherry", "err", "arch", "hear"],
      answer: "archery",
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
    border: "none",
    borderBottom: errors[i]
      ? "1.5px solid #dc2626"
      : correctLocked[i]
        ? "1.5px solid black"
        : "1.5px solid black",
    outline: "none",
    fontSize: "18px",

    fontWeight: 600,
    background: "transparent",
    paddingBottom: "2px",
    width: "160px",
    textDecoration: questions[i].prefilled ? "underline" : "none",
  });

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span style={{ marginRight: "20px" }}>
            A
          </span>
         The sets of words below are made from taking the letters of the vocabulary words and making other words. After looking at the letters in each set, write the word they come from.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            marginBottom: "60px",
            marginTop: "20px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={q.id}
              style={{
                display: "grid",
                gridTemplateColumns: "24px 0.9fr auto",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* NUMBER */}
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                {i + 1}
              </span>

              {/* WORDS */}
              <div
                style={{
                  display: "flex",
                  width:"80%",
                  // gap: "45px",
                  justifyContent:"space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                  fontSize: "20px",
                  // color: "#333",
                }}
              >
                {q.words.map((w, wi) => (
                  <span key={wi}>{w}</span>
                ))}
              </div>

              {/* INPUT */}
              <div style={{ position: "relative" }}>
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
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)", }}
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

export default Review4_Page1_Q1;
