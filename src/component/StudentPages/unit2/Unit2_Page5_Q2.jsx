import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import sound from "../../../assets/audio/ClassBook/U2/P 14/CD10.Pg14_Instruction1_Adult Lady_Take 2.mp3";
const QUESTIONS = [
  { label: "First", correct: ["I wouldn't dare", "I would not dare"] },
  {
    label: "Second",
    correct: [
      "Where's your sense of adventure",
      "Where is your sense of adventure",
    ],
  },
  {
    label: "Third",
    correct: ["I wouldn't call that", "I would not call that"],
  },
  { label: "Fourth", correct: ["It's more like", "It is more like"] },
];

const captions = [
  {
    start: 0.459,
    end: 3.579,
    text: "Page 6, grammar. Present perfect.",
  },
  {
    start: 4.199,
    end: 6.259,
    text: "Larry has seen the new movie.",
  },
  {
    start: 6.739,
    end: 8.159,
    text: "Has Larry seen the new movie?",
  },
  {
    start: 8.76,
    end: 10.079,
    text: "They have gone to the beach.",
  },
  {
    start: 10.659,
    end: 11.84,
    text: "Have they gone to the beach?",
  },
  {
    start: 12.259,
    end: 13.759,
    text: "You haven't gone to the beach.",
  },
  {
    start: 14.679,
    end: 16.02,
    text: "Haven't you gone to the beach?",
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'’;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const ListeningB = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [errors, setErrors] = useState(Array(QUESTIONS.length).fill(null));
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }
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
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(QUESTIONS.map((q) => q.correct[0]));
    setErrors(Array(QUESTIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* العنوان */}
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2">B</span>
          Listen to the story, and then write the expressions in the order they
          come in the story.
        </h5>
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={2.5}
        />
        {/* الأسطر */}
        <div className="flex flex-col gap-10 text-[18px] mt-5">
          {QUESTIONS.map((q, i) => {
            const hasError = errors[i] === true;
            const isOk = errors[i] === false;

            return (
              <div key={i} className="flex items-center gap-3">
                {/* Label */}
                <span className="font-bold shrink-0 w-[70px]">{q.label}:</span>

                {/* Input */}
                <div className="relative flex-1">
                  <input
                    value={answers[i]}
                    disabled={locked || isOk}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{
                      width: "100%",
                      borderBottom: hasError
                        ? "2px solid #ef4444"
                        : "1px solid #555",
                      outline: "none",
                      background: "transparent",
                      fontSize: "18px",
                      fontWeight: "500",
                      // color: isOk ? "#e53935" : undefined,
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
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
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

export default ListeningB;
