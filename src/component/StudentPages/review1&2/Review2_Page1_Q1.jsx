import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import Unit2AudioText, {
  stopUnit2Audio,
  unit2Audio,
} from "../unit2/Unit2AudioText";

const WORD_BANK = [
  "professional",
  "courage",
  "nervous",
  "adventure",
  "comfortable",
  "thrilling",
  "terrified",
  "faint",
];

const QUESTIONS = [
  { id: 1, word: "scared", correct: ["terrified"] },
  { id: 2, word: "expert", correct: ["professional"] },
  { id: 3, word: "anxious", correct: ["nervous"] },
  { id: 4, word: "bravery", correct: ["courage"] },
  { id: 5, word: "exciting", correct: ["thrilling"] },
  { id: 6, word: "experience", correct: ["adventure"] },
  { id: 7, word: "collapse", correct: ["faint"] },
  { id: 8, word: "relaxed", correct: ["comfortable"] },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Review2_Page1_Q1 = () => {
  const inputCount = QUESTIONS.filter((q) => !q.example).length;
  const [answers, setAnswers] = useState(Array(inputCount).fill(""));
  const [errors, setErrors] = useState(Array(inputCount).fill(null));
  const [locked, setLocked] = useState(false);
  // بعد الـ states الموجودة
  const usedAnswers = new Set(answers.map((a) => normalize(a)).filter(Boolean));

  // أبسط: نبني الـ mapping مرة وحدة
  let counter = -1;
  const mapped = QUESTIONS.map((q) => {
    if (q.example) return { ...q, aIdx: null };
    counter++;
    return { ...q, aIdx: counter };
  });

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
      const q = mapped.find((q) => q.aIdx === i);
      const ok = q.correct.some((c) => normalize(a) === normalize(c));
      if (ok) correct++;
      return ok ? false : true;
    });
    setErrors(newErrors);
    const total = inputCount;
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
    setAnswers(mapped.filter((q) => q.aIdx !== null).map((q) => q.correct[0]));
    setErrors(Array(inputCount).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit2Audio();
    setAnswers(Array(inputCount).fill(""));
    setErrors(Array(inputCount).fill(null));
    setLocked(false);
  };

  const renderInput = (q) => {
    if (q.example) {
      return (
        <span
          style={{
            textDecoration: "line-through",
            color: "#84ad40",
            fontWeight: "bold",
            fontSize: "18px",
            marginLeft: "8px",
          }}
        >
          {q.correct[0]}
        </span>
      );
    }
    const i = q.aIdx;
    const hasError = errors[i] === true;
    const isOk = errors[i] === false;
    return (
      <span
        style={{
          position: "relative",
          display: "inline-block",
          minWidth: "180px",
          marginLeft: "8px",
        }}
      >
        <input
          value={answers[i]}
          placeholder="Type the word"
          title="Type the synonym"
          className="review-unit2-answer-input"
          disabled={locked || isOk}
          onChange={(e) => handleChange(i, e.target.value)}
          style={{
            width: "180px",
            borderBottom: hasError ? "2px solid red" : "1px solid #555",
            outline: "none",
            background: "transparent",
            fontSize: "18px",
            textAlign: "center",
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
    );
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "25px" }}>
        {/* العنوان */}
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Write a vocabulary word that is a synonym for each word."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        {/* Word Bank */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            // flexWrap: "wrap",
            justifyItems: "center",
            gap: "12px 24px",
            background: "#f0f7e6",
            // border: "1.5px solid #84ad40",
            borderRadius: "10px",
            padding: "14px 20px",
            marginBottom: "32px",
          }}
        >
          {WORD_BANK.map((w, i) => {
            const isUsed = usedAnswers.has(normalize(w));
            return (
              <Unit2AudioText
                key={i}
                src={unit2Audio(
                  "Page 18 - Exercise A",
                  `Item_${String(i + 1).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play ${w}`}
                style={{
                  fontSize: "17px",
                  fontWeight: 500,
                  textDecoration: isUsed ? "line-through" : "none",
                  color: isUsed ? "#84ad40" : "#333",
                  transition: "all 0.2s ease",
                }}
              >
                {w}
              </Unit2AudioText>
            );
          })}
        </div>

        {/* الأسئلة - عمودين */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px 40px",
          }}
        >
          {mapped.map((q) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "baseline",
                fontSize: "18px",
                gap: "6px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>
                {q.id}
              </span>
              <Unit2AudioText
                className="w-[90px]"
                src={unit2Audio(
                  "Page 18 - Exercise A",
                  `Item_${String(q.id + 8).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play ${q.word}`}
              >
                {q.word}
              </Unit2AudioText>
              {renderInput(q)}
            </div>
          ))}
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

export default Review2_Page1_Q1;
