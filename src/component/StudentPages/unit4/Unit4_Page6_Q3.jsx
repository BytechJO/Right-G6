import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit4_Page6_Q3 = () => {
  const questions = [
    {
      id: 0,
      statement: "She is given a gift by us.",
      questionAnswer: "Is she given a gift by us?",
      negativeAnswer: "She isn’t given a gift by us..",
      prefilled: false,
    },
    {
      id: 1,
      statement: "The computer is programmed by Jim.",
      questionAnswer: "Is the computer programmed by Jim?",
      negativeAnswer: "The computer isn't programmed by Jim.",
      prefilled: false,
    },
    {
      id: 2,
      statement: "The bike is ridden by Dan.",
      questionAnswer: "Is the bike ridden by Dan?",
      negativeAnswer: "The bike isn't ridden by Dan.",
      prefilled: false,
    },
  ];

  const initAnswers = () =>
    questions.map((q) => ({
      question: q.prefilled ? q.questionAnswer : "",
      negative: q.prefilled ? q.negativeAnswer : "",
    }));

  const initErrors = () =>
    questions.map(() => ({ question: false, negative: false }));

  const initLocked = () =>
    questions.map((q) => ({ question: q.prefilled, negative: q.prefilled }));

  const [answers, setAnswers] = useState(initAnswers);
  const [errors, setErrors] = useState(initErrors);
  const [correctLocked, setCorrectLocked] = useState(initLocked);
  const [locked, setLocked] = useState(false);

  const normalize = (t) =>
    t
      .toLowerCase()
      .replace(/isn't/g, "is not")
      .replace(/isn’t/g, "is not")
      .replace(/aren’t/g, "are not")
      .replace(/aren't/g, "are not")
      .replace(/wasn't/g, "was not")
      .replace(/weren't/g, "were not")
      .replace(/[.,!?'"’;:]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const updateField = (i, field, value) => {
    if (locked || correctLocked[i][field]) return;
    const updated = [...answers];
    updated[i] = { ...updated[i], [field]: value };
    setAnswers(updated);
    const updatedErrors = [...errors];
    updatedErrors[i] = { ...updatedErrors[i], [field]: false };
    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;

    const hasEmpty = answers.some(
      (a, i) =>
        (!correctLocked[i].question && normalize(a.question) === "") ||
        (!correctLocked[i].negative && normalize(a.negative) === ""),
    );
    if (hasEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;
    const newErrors = answers.map((a, i) => {
      if (correctLocked[i].question && correctLocked[i].negative) {
        score++;
        return { question: false, negative: false };
      }
      const qOk =
        normalize(a.question) === normalize(questions[i].questionAnswer);
      const nOk =
        normalize(a.negative) === normalize(questions[i].negativeAnswer);
      if (qOk && nOk) score++;
      return { question: !qOk, negative: !nOk };
    });

    const newLocked = answers.map((a, i) => ({
      question:
        correctLocked[i].question ||
        normalize(a.question) === normalize(questions[i].questionAnswer),
      negative:
        correctLocked[i].negative ||
        normalize(a.negative) === normalize(questions[i].negativeAnswer),
    }));

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
    setAnswers(
      questions.map((q) => ({
        question: q.questionAnswer,
        negative: q.negativeAnswer,
      })),
    );
    setErrors(questions.map(() => ({ question: false, negative: false })));
    setCorrectLocked(questions.map(() => ({ question: true, negative: true })));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setErrors(initErrors());
    setCorrectLocked(initLocked());
    setLocked(false);
  };

  const inputStyle = (i, field) => ({
    // flex: 1,
    border: "none",
    borderBottom: errors[i][field]
      ? "1.5px solid #dc2626"
      : correctLocked[i][field]
        ? "1.5px solid black"
        : "1.5px solid black",
    outline: "none",
    fontSize: "17px",
    width: "100%",
    fontWeight: 600,
    background: "transparent",
    paddingBottom: "2px",
    textDecoration: questions[i].prefilled ? "underline" : "none",
  });

  const ErrorBadge = () => (
    <span
      style={{
        position: "absolute",
        top: "-10px",
        right: "-20px",
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
  );

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall" style={{ gap: "50px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            E
          </span>
          Given the statement, write a question and the negative.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "60px",
            marginBottom: "60px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={q.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                alignItems: "start",
              }}
            >
              {/* LEFT — statement */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  fontSize: "18px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "20px" }}>
                  {i + 1}
                </span>
                <span>{q.statement}</span>
              </div>

              {/* RIGHT — question + negative inputs */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* QUESTION input */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: "#333",
                      fontSize: "17px",
                      minWidth: "16px",
                    }}
                  >
                    ?:
                  </span>
                  <div style={{ position: "relative", flex: 1 }}>
                    <input
                      type="text"
                      value={answers[i].question}
                      disabled={locked || correctLocked[i].question}
                      onChange={(e) =>
                        updateField(i, "question", e.target.value)
                      }
                      style={inputStyle(i, "question")}
                    />
                    {errors[i].question && <ErrorBadge />}
                  </div>
                </div>

                {/* NEGATIVE input */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: "#333",
                      fontSize: "17px",
                      minWidth: "16px",
                    }}
                  >
                    X:
                  </span>
                  <div style={{ position: "relative", flex: 1 }}>
                    <input
                      type="text"
                      value={answers[i].negative}
                      disabled={locked || correctLocked[i].negative}
                      onChange={(e) =>
                        updateField(i, "negative", e.target.value)
                      }
                      style={inputStyle(i, "negative")}
                    />
                    {errors[i].negative && <ErrorBadge />}
                  </div>
                </div>
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

export default Unit4_Page6_Q3;
