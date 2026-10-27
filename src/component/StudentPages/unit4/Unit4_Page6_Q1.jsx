import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4StudentAudioText, {
  stopUnit4StudentAudio,
  unit4StudentAudio,
} from "./Unit4StudentAudioText";

const Unit4_Page6_Q1 = () => {
  const questions = [
    {
      id: 0,
      activeText: "We mail the letter.",
      answer: "The letter is mailed by us",
      audio: "Item_001_",
      prefilled: false,
    },
    {
      id: 1,
      activeText: "The mechanics fixed the cars.",
      answer: "The cars are fixed by the mechanics",
      audio: "Item_002_",
      prefilled: false,
    },
    {
      id: 2,
      activeText: "Bryan teaches the students.",
      answer: "The students are taught by Bryan",
      audio: "Item_003_",
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

  const normalize = (text) =>
    text
      .toLowerCase()
      .replace(/[.,!?''""''’;:]/g, "")
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
      const correct = normalize(a) === normalize(questions[i].answer);
      if (correct) score++;
      return !correct;
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
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(questions.map((q) => q.answer));
    setErrors(questions.map(() => false));
    setCorrectLocked(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit4StudentAudio();
    setAnswers(initAnswers());
    setErrors(initErrors());
    setCorrectLocked(initLocked());
    setLocked(false);
  };

  return (
    <div className="flex justify-center p-[30px]">
      <div className="div-forall gap-5">
        <ExerciseHeader
          sectionLetter="C"
          title="Change the active verb to a passive one for each sentence. Rewrite the sentence."
          subTitle="Identify exactly what must change, rewrite the complete correct form, and reread it to make sure the original meaning is preserved."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 mt-6">
          {questions.map((q, i) => (
            <div key={q.id}>
              {/* Active sentence */}
              <div className="flex items-start gap-5 items-center">
                <span className="font-bold text-[20px] w-5">{i + 1}</span>
                <Unit4StudentAudioText
                  src={unit4StudentAudio("Page 33 - Exercise C", q.audio)}
                  ariaLabel={`Play ${q.activeText}`}
                  className="text-[20px]"
                >
                  {q.activeText}
                </Unit4StudentAudioText>
              </div>

              {/* Input — passive rewrite */}
              <div className="relative ml-10 mt-3">
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || correctLocked[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder="Write the passive sentence"
                  title="Write the complete sentence in the passive voice"
                  aria-label={`Passive sentence ${i + 1}`}
                  style={{
                    textDecoration: q.prefilled ? "underline" : "none",
                    textDecorationStyle: q.prefilled ? "solid" : undefined,
                  }}
                  className={`
                    w-full bg-transparent outline-none border-b
                    text-[20px] pb-1 font-semibold
                    ${
                      errors[i]
                        ? "border-red-500"
                        : correctLocked[i]
                          ? "border-black"
                          : "border-black"
                    }
                  `}
                />

                {/* ❌ error badge */}
                {errors[i] && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-20px",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
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

export default Unit4_Page6_Q1;
