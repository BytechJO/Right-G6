import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3StudentAudioText, { stopUnit3StudentAudio, unit3StudentAudio } from "./Unit3StudentAudioText";

const normalize = (value) => value.toLowerCase().replace(/\s+/g, "").trim();

const WORDS = [
  { num: 1, word: "offer" },
  { num: 2, word: "diner" },
  { num: 3, word: "liver" },
  { num: 4, word: "unwind" },
  { num: 5, word: "fast foods" },
];

const DEFINITIONS = [
  { letter: "a", text: "foods that are prepared and served quickly" },
  { letter: "b", text: "relax" },
  { letter: "c", text: "a restaurant that is not expensive" },
  { letter: "d", text: "deal or agreement" },
  { letter: "e", text: "an animal part that can be eaten as food" },
];

const CORRECT = ["d", "c", "e", "b", "a"];
const LEFT_AUDIO = [1, 3, 6, 7, 9];
const RIGHT_AUDIO = [2, 4, 5, 8, 10];

const Unit3_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [results, setResults] = useState(Array(5).fill(null));
  const [completed, setCompleted] = useState(false);

  const handleChange = (index, value) => {
    if (completed || results[index] === true) return;
    setAnswers((previous) =>
      previous.map((answer, answerIndex) =>
        answerIndex === index ? value.slice(0, 1) : answer,
      ),
    );
    setResults((previous) =>
      previous.map((result, resultIndex) =>
        resultIndex === index ? null : result,
      ),
    );
  };

  const checkAnswers = () => {
    if (completed) return;
    if (answers.some((answer) => !answer.trim())) {
      ValidationAlert.info();
      return;
    }
    const nextResults = answers.map(
      (answer, index) => normalize(answer) === CORRECT[index],
    );
    const score = nextResults.filter(Boolean).length;
    setResults(nextResults);
    const total = CORRECT.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setCompleted(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers([...CORRECT]);
    setResults(Array(5).fill(true));
    setCompleted(true);
  };

  const reset = () => {
    stopUnit3StudentAudio();
    setAnswers(Array(5).fill(""));
    setResults(Array(5).fill(null));
    setCompleted(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "50px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title="Match each vocabulary word to its definition."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />

        <div
          style={{
            display: "flex",
            gap: "100px",
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
            {WORDS.map((item, index) => {
              const isWrong = results[index] === false;
              return (
                <div
                  key={item.word}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ position: "relative", display: "inline-block" }}>
                    <input
                      value={answers[index]}
                      disabled={completed || results[index] === true}
                      maxLength={1}
                      placeholder="a"
                      title="Write the matching letter"
                      aria-label={`Write the matching letter for ${item.word}`}
                      className="unit3-student-answer-input"
                      onChange={(event) => handleChange(index, event.target.value)}
                      style={{
                        width: "50px",
                        border: "none",
                        borderBottom: isWrong
                          ? "2px solid #ef4444"
                          : "1px solid #aaa",
                        outline: "none",
                        background: "transparent",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: "bold",
                      }}
                    />
                    {isWrong && (
                      <span
                        aria-hidden="true"
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
                          pointerEvents: "none",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </span>
                  <strong>{item.num}</strong>
                  <Unit3StudentAudioText
                    src={unit3StudentAudio(
                      "Page 26 - Exercise A",
                      `Item_${String(LEFT_AUDIO[index]).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${item.word}`}
                  >
                    {item.word}
                  </Unit3StudentAudioText>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
            {DEFINITIONS.map((definition, index) => (
              <div
                key={definition.letter}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <strong>{definition.letter}</strong>
                <Unit3StudentAudioText
                  src={unit3StudentAudio(
                    "Page 26 - Exercise A",
                    `Item_${String(RIGHT_AUDIO[index]).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play ${definition.text}`}
                >
                  {definition.text}
                </Unit3StudentAudioText>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <ActionButtons
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit3_Page5_Q1;
