import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit6StudentAudioText, {
  stopUnit6StudentAudio,
  unit6StudentAudio,
} from "../unit6/Unit6StudentAudioText";

const questions = [
  {
    id: 1,
    text: "The boy doesn't like science fiction,",
    wrongTag: "would he?",
  },
  {
    id: 2,
    text: "Michael has a good imagination,",
    wrongTag: "can't he?",
  },
  {
    id: 3,
    text: "She wants to come with us,",
    wrongTag: "could she?",
  },
  {
    id: 4,
    text: "That is your opinion,",
    wrongTag: "doesn't it?",
  },
  {
    id: 5,
    text: "Your speech is going to persuade the students to vote for you,",
    wrongTag: "won't it?",
  },
];

const correctAnswers = [
  "does he?",
  "doesn't he?",
  "does she?",
  "isn't it?",
  "isn't it?",
];

const Review5_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [errors, setErrors] = useState(Array(questions.length).fill(false));
  const [correctLocked, setCorrectLocked] = useState(
    Array(questions.length).fill(false),
  );
  const [locked, setLocked] = useState(false);

  const normalize = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/isn't/g, "is not")
      .replace(/isn’t/g, "is not")
      .replace(/doesn’t/g, "does not")
      .replace(/doesn't/g, "does not")
      .replace(/[.,!?'"’;:]/g, "")
      .replace(/\s+/g, " ");

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
    let score = 0;
    const newErrors = answers.map((ans, i) => {
      const isCorrect = normalize(ans) === normalize(correctAnswers[i]);
      if (isCorrect) score++;
      return !isCorrect;
    });
    setErrors(newErrors);
    setCorrectLocked(newErrors.map((e) => !e));
    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;
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
    setErrors(Array(questions.length).fill(false));
    setCorrectLocked(Array(questions.length).fill(true));
    setLocked(true);
  };

  const reset = () => {
    stopUnit6StudentAudio();
    setAnswers(Array(questions.length).fill(""));
    setErrors(Array(questions.length).fill(false));
    setCorrectLocked(Array(questions.length).fill(false));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Rewrite each incorrect question tag correctly."
          subTitle="Identify exactly what must change, rewrite the complete correct form, and reread it to make sure the original meaning is preserved."
        />

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px]">
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              {/* Number */}
              <span
                style={{ fontWeight: "bold", fontSize: "20px", flexShrink: 0 }}
              >
                {q.id}
              </span>

              <Unit6StudentAudioText
                src={unit6StudentAudio(
                  "Page 53 - Exercise C",
                  `Item_${String(q.id).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play ${q.text} ${q.wrongTag}`}
                style={{ fontSize: "18px", flexShrink: 0 }}
              >
                {q.text}{" "}
                <span style={{ textDecoration: "underline" }}>{q.wrongTag}</span>
              </Unit6StudentAudioText>

              {/* Answer input */}
              <div style={{ flex: 1, minWidth: "140px", position: "relative" }}>
                <input
                  type="text"
                  value={answers[index]}
                  disabled={locked || correctLocked[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  placeholder="Write the correct question tag"
                  title="Write the correct question tag"
                  aria-label={`Correct question tag ${q.id}`}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: errors[index]
                      ? "2px solid red"
                      : "1px solid black",
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

export default Review5_Page2_Q1;
