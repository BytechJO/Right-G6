import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import basketImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 22.svg";

const correctAnswers = [
  "a while",
  "I guess",
  "after all",
  "if you say so",
  "suits your taste",
  "Suit yourself",
];

const emptyAnswers = () => Array(6).fill("");

const Review5_Page1_Q2 = () => {
  const [answers, setAnswers] = useState(emptyAnswers());
  const [errors, setErrors] = useState(Array(6).fill(false));
  const [correctLocked, setCorrectLocked] = useState(Array(6).fill(false));
  const [locked, setLocked] = useState(false);

  const normalize = (text) =>
    text.trim().toLowerCase().replace(/\s+/g, " ").replace(/[?.!]/g, "");

  const updateAnswer = (index, value) => {
    if (locked || correctLocked[index]) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    const errs = [...errors];
    errs[index] = false;
    setErrors(errs);
  };

  const checkAnswers = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => normalize(a) === "");
    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    const normalizedCorrect = correctAnswers.map(normalize);
    const usedAnswers = [];

    let score = 0;

    const newErrors = answers.map((ans) => {
      const normalizedAns = normalize(ans);

      const isCorrectWord =
        normalizedCorrect.includes(normalizedAns) &&
        !usedAnswers.includes(normalizedAns);

      if (isCorrectWord) {
        usedAnswers.push(normalizedAns);
        score++;
      }

      return !isCorrectWord;
    });

    setErrors(newErrors);
    setCorrectLocked(newErrors.map((e) => !e));

    const total = 6;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold;">
        Score: ${score} / ${total}
      </span>
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
    setAnswers([...correctAnswers]);
    setErrors(Array(6).fill(false));
    setCorrectLocked(Array(6).fill(true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(emptyAnswers());
    setErrors(Array(6).fill(false));
    setCorrectLocked(Array(6).fill(false));
    setLocked(false);
  };

  const renderInput = (index) => (
    <div
      key={index}
      style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}
    >
      <span style={{ fontWeight: "bold", fontSize: "16px", flexShrink: 0 }}>
        {index + 1}
      </span>
      <div style={{ flex: 1, position: "relative" }}>
        <input
          type="text"
          value={answers[index]}
          disabled={locked || correctLocked[index]}
          onChange={(e) => updateAnswer(index, e.target.value)}
          style={{
            width: "100%",
            border: "none",
            borderBottom: errors[index] ? "2px solid red" : "1px solid black",
            outline: "none",
            textAlign: "center",
            background: "transparent",
            fontSize: "18px",
            // fontWeight: "600",
            // color: "#6D2980",
            padding: "2px 28px 2px 4px",
          }}
        />
        {errors[index] && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "0",
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
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-6">
          <span className="mr-2">B</span>
          The words in the basket need to be put into the correct sentences in
          order to make the expressions. Use the words to make the six
          expressions, then cross out the ones that are not needed.
        </h5>

        {/* BASKET IMAGE */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // marginBottom: "28px",
          }}
        >
          <img
            src={basketImg}
            alt="word basket"
            style={{ height: "250px", width: "auto" }}
          />
        </div>

        {/* 6 ANSWERS IN 2 COLUMNS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px 40px",
            marginBottom: "10px",
          }}
        >
          {/* pairs: 1&2, 3&4, 5&6 */}
          {[0, 2, 4].map((i) => (
            <React.Fragment key={i}>
              {renderInput(i)}
              {renderInput(i + 1)}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* BUTTONS */}
      <div className="action-buttons-container mt-10">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review5_Page1_Q2;
