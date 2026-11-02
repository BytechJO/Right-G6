import React, { useEffect, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit5StudentAudioText, {
  stopUnit5StudentAudio,
  unit5StudentAudio,
} from "./Unit5StudentAudioText";

const Unit5_Page5_Q2 = () => {
  const audioFolder = "Page 44 - Exercise B";
  const questions = [
    {
      before: "We could reach for the stars",
      after: ",",
      second: "Or we could reach the colorful rainbow.",
      correct: ["if you say so"],
      inputPosition: "inline", // blank at end of first line
      beforeAudio: "Item_001_",
      secondAudio: "Item_002_",
    },
    {
      before: "You will find food if",
      after: ",",
      second: "But please don't let anything go to waste.",
      correct: ["it suits your taste"],
      inputPosition: "inline",
      beforeAudio: "Item_003_",
      secondAudio: "Item_004_",
    },
    {
      before: "I will see you in",
      after: ".",
      second: "Seeing you makes me smile.",
      correct: ["a while"],
      inputPosition: "inline",
      beforeAudio: "Item_005_",
      secondAudio: "Item_006_",
    },
    {
      before: "If you don't want to go with us, you don't have to.",
      after: null,
      second: ", we'll go without you.",
      correct: ["Suit yourself"],
      inputPosition: "second-start", // blank at start of second line
      beforeAudio: "Item_007_",
      secondAudio: "Item_008_",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => () => stopUnit5StudentAudio(), []);

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = questions[i].correct.some(
        (c) => c.toLowerCase() === a.trim().toLowerCase(),
      );
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const msg = `Score: ${correctCount} / ${questions.length}`;
    if (correctCount === questions.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.correct[0]));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const reset = () => {
    stopUnit5StudentAudio();
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const inputEl = (i) => (
    <span
      style={{
        position: "relative",
        display: "inline-block",

        width: `70%`,
      }}
    >
      <input
        className="unit5-student-input"
        value={answers[i]}
        placeholder="Enter the missing expression"
        title="Enter the missing expression"
        aria-label={`Missing expression ${i + 1}`}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        style={{
          borderBottom: `1px solid ${
            result[i] === false
              ? "#ef4444"
              : result[i] === true
                ? "black"
                : "black"
          }`,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          outline: "none",
          background: "transparent",
          fontSize: "18px",
          fontWeight: "600",

          width: `100%`,
          padding: "2px 6px",
          marginLeft: "6px",
          marginRight: "2px",
        }}
      />
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
            width: "18px",
            height: "18px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title="Use the poem clues to find the expressions."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
            fontSize: "18px",
          }}
        >
          {questions.map((q, i) => (
            <div key={i} style={{ display: "flex", gap: "10px" }}>
              {/* Number */}
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "18px",
                  paddingTop: "2px",
                }}
              >
                {i + 1}
              </span>

              <div style={{ flex: 1 }}>
                {/* First line */}
                {q.inputPosition === "inline" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      // flexWrap: "wrap",
                    }}
                  >
                    <Unit5StudentAudioText
                      src={unit5StudentAudio(audioFolder, q.beforeAudio)}
                      ariaLabel={`Play first line of item ${i + 1}`}
                      style={{
                        width: `fit-content`,
                      }}
                    >
                      {q.before}
                    </Unit5StudentAudioText>
                    {inputEl(i, 220)}
                    <span>{q.after}</span>
                  </div>
                )}
                {q.inputPosition === "second-start" && (
                  <div style={{ lineHeight: "1.8" }}>
                    <Unit5StudentAudioText
                      src={unit5StudentAudio(audioFolder, q.beforeAudio)}
                      ariaLabel={`Play first line of item ${i + 1}`}
                    >
                      {q.before}
                    </Unit5StudentAudioText>
                  </div>
                )}

                {/* Second line */}
                <div
                  style={{
                    // color: "#444",
                    marginTop: "6px",
                    display: "flex",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                  }}
                >
                  {q.inputPosition === "second-start" && (
                    <>
                      {inputEl(i, 240)}
                      <Unit5StudentAudioText
                        src={unit5StudentAudio(audioFolder, q.secondAudio)}
                        ariaLabel={`Play second line of item ${i + 1}`}
                      >
                        {q.second}
                      </Unit5StudentAudioText>
                    </>
                  )}
                  {q.inputPosition === "inline" && (
                    <Unit5StudentAudioText
                      src={unit5StudentAudio(audioFolder, q.secondAudio)}
                      ariaLabel={`Play second line of item ${i + 1}`}
                    >
                      {q.second}
                    </Unit5StudentAudioText>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
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
      {/* BUTTONS */}
    </div>
  );
};

export default Unit5_Page5_Q2;
