import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4StudentAudioText, {
  stopUnit4StudentAudio,
  unit4StudentAudio,
} from "../unit4/Unit4StudentAudioText";

const Review3_Page2_Q2 = () => {
  const questions = [
    {
      id: 0,
      text: "What would you do if you went on a roller coaster?",
      audio: "Item_001_",
    },
    {
      id: 1,
      text: "What would you order if you went to a fancy restaurant?",
      audio: "Item_002_",
    },
    {
      id: 2,
      text: "What would you ask about if you met a famous scientist?",
      audio: "Item_003_",
    },
  ];

  const initAnswers = () => questions.map(() => "");
  const [answers, setAnswers] = useState(initAnswers);
  const [locked, setLocked] = useState(false);

  const handleChange = (i, value) => {
    if (locked) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
  };

  const handleReset = () => {
    stopUnit4StudentAudio();
    setAnswers(initAnswers());
    setLocked(false);
  };

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall" style={{ gap: "40px" }}>
        <ExerciseHeaderReview
          sectionLetter="E"
          title="Answer the following questions with a second conditional sentence."
          subTitle="Use the prompt, picture, or grammar pattern to write a complete response, then reread it for meaning, form, and punctuation."
        />

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          {questions.map((q, i) => (
            <div key={q.id}>
              {/* QUESTION TEXT */}
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
                <Unit4StudentAudioText
                  src={unit4StudentAudio("Page 35 - Exercise E", q.audio)}
                  ariaLabel={`Play ${q.text}`}
                  style={{ fontSize: "18px" }}
                >
                  {q.text}
                </Unit4StudentAudioText>
              </div>

              {/* ANSWER LINE */}
              <input
                type="text"
                value={answers[i]}
                disabled={locked}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="Write a second conditional sentence"
                title="Write your second conditional answer"
                aria-label={`Answer to question ${i + 1}`}
                style={{
                  // width: "100%",
                  border: "none",
                  borderBottom: "1.5px solid",
                  outline: "none",
                  fontSize: "18px",
                  // color: "#6D2980",
                  fontWeight: 600,
                  background: "transparent",
                  paddingBottom: "4px",
                  marginLeft: "30px",
                  width: "calc(100% - 30px)",
                }}
              />
            </div>
          ))}
        </div>

        {/* BUTTONS — Start Again only */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review3_Page2_Q2;
