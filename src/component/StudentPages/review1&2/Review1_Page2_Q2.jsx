import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import Unit2AudioText, { stopUnit2Audio, unit2Audio } from "../unit2/Unit2AudioText";

const QUESTIONS = [
  { correct: ["has"] },
  { correct: ["have"] },
  { correct: [ "ridden"] },
  { correct: ["have"] },
  { correct: ["chosen"] },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Review1_Page2_Q2 = () => {
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
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    setAnswers(QUESTIONS.map((q) => q.correct[0]));
    setErrors(Array(QUESTIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit2Audio();
    setAnswers(Array(QUESTIONS.length).fill(""));
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  const renderInput = (i, width = "140px") => {
    const hasError = errors[i] === true;
    const isOk = errors[i] === false;
    return (
      <span
        style={{
          position: "relative",
          display: "inline-block",
          margin: "0 6px",
        }}
      >
        <input
          value={answers[i]}
          placeholder="Type the verb form"
          title="Type the correct verb form"
          className="review-unit2-answer-input"
          disabled={locked || isOk}
          onChange={(e) => handleChange(i, e.target.value)}
          style={{
            width,
            borderBottom: hasError ? "2px solid #ef4444" : "1px solid #555",
            outline: "none",
            textAlign: "center",
            background: "transparent",
            fontSize: "18px",
            fontWeight: 500,
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
              background: "#ef4444",
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
    );
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "50px" }}>
        <ExerciseHeaderReview
          sectionLetter="D"
          title="Put the correct part of the verb in each blank."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            fontSize: "18px",
          }}
        >
          {/* 1 */}
          <div>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>1</span>
            <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_001_")} ariaLabel="Play Steven">Steven</Unit2AudioText> {renderInput(0, "120px")} <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_002_")} ariaLabel="Play sentence phrase">brought his new pet bird to show us.</Unit2AudioText>
          </div>

          {/* 2 */}
          <div>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>2</span>
            <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_003_")} ariaLabel="Play What">What</Unit2AudioText> {renderInput(1, "120px")} <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_004_")} ariaLabel="Play sentence phrase">you written about in your report?</Unit2AudioText>
          </div>

          {/* 3 */}
          <div>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>3</span>
            <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_005_")} ariaLabel="Play Why have they">Why have they</Unit2AudioText> {renderInput(2, "140px")} <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_006_")} ariaLabel="Play sentence phrase">their bikes in the rain?</Unit2AudioText>
          </div>

          {/* 4 */}
          <div>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>4</span>
            <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_007_")} ariaLabel="Play The teachers">The teachers</Unit2AudioText> {renderInput(3, "140px")} <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_008_")} ariaLabel="Play sentence phrase">thought about our question, and they have</Unit2AudioText>
            <br />
            <br />
            <span style={{ marginTop: "20px", marginLeft: "28px" }}>
              {renderInput(4, "140px")} <Unit2AudioText src={unit2Audio("Page 17 - Exercise D", "Item_009_")} ariaLabel="Play to move the test date">to move the test date.</Unit2AudioText>
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <ActionButtons
            handleShowAnswer={handleShow}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
};

export default Review1_Page2_Q2;
