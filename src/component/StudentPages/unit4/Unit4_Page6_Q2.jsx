import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import johnImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 43.svg";
import wandaImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 44.svg";
import jessicaImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 45.svg";
import markImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 46.svg";
import vaseImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 42.svg";

const Unit4_Page6_Q2 = () => {
  const clues = [
    "The vase is broken by the person who picks the flowers.",
    "The person who is taught by John finds the broken vase.",
    "The person who breaks the vase is seen by the person who has a cat.",
  ];

  const people = [
    { name: "John", img: johnImg },
    { name: "Wanda", img: wandaImg },
    { name: "Jessica", img: jessicaImg },
    { name: "Mark", img: markImg },
  ];

  const questions = [
    { id: 0, text: "Who saw the one who broke the vase?", answer: "Wanda" },
    { id: 1, text: "Who is John's student?", answer: "Mark" },
    { id: 2, text: "Who breaks the vase?", answer: "Jessica" },
    {
      id: 3,
      text: "Who finds the vase after it has been broken?",
      answer: "John",
    },
  ];

  const initAnswers = () => questions.map(() => "");
  const initErrors = () => questions.map(() => false);
  const initLocked = () => questions.map(() => false);

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
    flex: 1,
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
  });

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Who was it? Read the clues and look at the pictures to decide whom it
          was who did each action. One name may be used more than once.
        </h5>

        {/* CLUES + VASE IMAGE */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          {/* CLUES */}
          <ul
            style={{
              flex: 1,
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            {clues.map((clue, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "17px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#f79631",
                    flexShrink: 0,
                    marginTop: "6px",
                  }}
                />
                {clue}
              </li>
            ))}
          </ul>

          {/* VASE IMAGE */}
          <img
            src={vaseImg}
            alt="vase"
            style={{
              width: "200px",
              height: "130px",
              objectFit: "contain",
              borderRadius: "10px",
              flexShrink: 0,
            }}
          />
        </div>

        {/* PEOPLE IMAGES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          {people.map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{
                  height: "150px",
                  aspectRatio: "1",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={q.id}
              style={{ display: "flex", alignItems: "baseline", gap: "10px" }}
            >
              {/* NUMBER */}
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  minWidth: "20px",
                }}
              >
                {i + 1}
              </span>

              {/* QUESTION TEXT */}
              <span style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
                {q.text}
              </span>

              {/* INPUT */}
              <div style={{ position: "relative", flex: 1 }}>
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

export default Unit4_Page6_Q2;
