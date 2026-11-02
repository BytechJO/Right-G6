/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3StudentAudioText, {
  stopUnit3StudentAudio,
  unit3StudentAudio,
} from "./Unit3StudentAudioText";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.!?''""'';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const SENTENCES = [
  { num: 1, text: "If they cleaned and fixed them," },
  { num: 2, text: "If it rained this much every year," },
  { num: 3, text: "If he played this well every game," },
];

const ENDINGS = [
  { letter: "a", text: "Frank would get a trophy." },
  { letter: "b", text: "the lake would get bigger." },
  { letter: "c", text: "they could sell the houses." },
];

// الإجابات الصحيحة
const CORRECT_MATCH = ["c", "b", "a"];
const CORRECT_FULL = [
  "if they cleaned and fixed them, they could sell the houses.",
  "if it rained this much every year, the lake would get bigger",
  "if he played this well every game, frank would get a trophy",
];

// Input خارج الكومبوننت
const LineInput = ({
  value,
  disabled,
  onChange,
  isWrong,
  width = "100%",
  ariaLabel = "Write the full matched sentence",
}) => (
  <span style={{ position: "relative", display: "inline-block", width }}>
    <input
      value={value}
      disabled={disabled}
      placeholder={width === "50px" ? "a" : "Write the full sentence"}
      title={
        width === "50px"
          ? "Choose the matching option"
          : "Write the full matched sentence"
      }
      aria-label={ariaLabel}
      className="unit3-student-answer-input"
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: isWrong ? "2px solid #ef4444" : "1.5px solid #aaa",
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        fontWeight: 600,
        // color: isOk ? "#84ad40" : "#6D2980",
        textAlign: width <= "20px" ? "left" : "center",
      }}
    />
    {isWrong && (
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
          pointerEvents: "none",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

const Unit3_Page6_Q1 = () => {
  const initState = () => ({
    matches: ["", "", ""],
    fullSentences: ["", "", ""], // الجملة الكاملة
  });
  const initErrors = () => ({
    matches: [null, null, null],
    fullSentences: [null, null, null],
  });

  const [answers, setAnswers] = useState(initState);
  const [errors, setErrors] = useState(initErrors);
  const [locked, setLocked] = useState(false);
  const handleMatchChange = (index, value) => {
    if (locked || errors.matches[index] === true) return;
    setAnswers((previous) => ({
      ...previous,
      matches: previous.matches.map((answer, answerIndex) =>
        answerIndex === index ? value.slice(0, 1) : answer,
      ),
    }));
    setErrors((previous) => ({
      ...previous,
      matches: previous.matches.map((result, resultIndex) =>
        resultIndex === index ? null : result,
      ),
    }));
  };

  const handleFullChange = (i, val) => {
    if (locked || errors.fullSentences[i] === true) return;
    const f = [...answers.fullSentences];
    f[i] = val;
    setAnswers((prev) => ({ ...prev, fullSentences: f }));
    const fe = [...errors.fullSentences];
    fe[i] = null;
    setErrors((prev) => ({ ...prev, fullSentences: fe }));
  };

  const handleCheck = () => {
    if (locked) return;
    const allFilled =
      answers.matches.every((a) => a.trim()) &&
      answers.fullSentences.every((a) => a.trim());
    if (!allFilled) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    const newMatchErr = answers.matches.map((a, i) => {
      const ok = normalize(a) === CORRECT_MATCH[i];
      if (ok) score++;
      return ok;
    });
    const newFullErr = answers.fullSentences.map((a, i) => {
      const ok = normalize(a) === normalize(CORRECT_FULL[i]);
      if (ok) score++;
      return ok;
    });

    setErrors({ matches: newMatchErr, fullSentences: newFullErr });
    const total = 6;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    setAnswers({
      matches: [...CORRECT_MATCH],
      fullSentences: CORRECT_FULL.map((s) => {
        const display = s.charAt(0).toUpperCase() + s.slice(1);
        return `${display.replace(/[.]+$/, "")}.`;
      }),
    });
    setErrors({
      matches: [true, true, true],
      fullSentences: [true, true, true],
    });
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit3StudentAudio();
    setAnswers(initState());
    setErrors(initErrors());
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Match the two parts of each sentence and write the full sentence using correct punctuation."
          subTitle={
            <>
              Task 1: Match each first half with the ending that completes the
              idea.
              <br />
              Task 2: Then rewrite the full sentence with correct capitalization
              and punctuation.
            </>
          }
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "34px 70px",
            alignItems: "start",
            fontSize: "18px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            {SENTENCES.map((sentence, index) => (
              <div
                key={sentence.num}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <LineInput
                  value={answers.matches[index]}
                  disabled={locked || errors.matches[index] === true}
                  onChange={(value) => handleMatchChange(index, value)}
                  isWrong={errors.matches[index] === false}
                  width="50px"
                  ariaLabel={`Write the matching letter for sentence ${sentence.num}`}
                />
                <Unit3StudentAudioText
                  src={unit3StudentAudio(
                    "Page 27 - Exercise D",
                    `Item_${String([2, 4, 6][index]).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play sentence beginning ${sentence.num}`}
                  style={{ justifyContent: "flex-start", textAlign: "left" }}
                >
                  <strong style={{ marginRight: "10px" }}>
                    {sentence.num}
                  </strong>
                  {sentence.text}
                </Unit3StudentAudioText>
              </div>
            ))}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            {ENDINGS.map((ending, index) => (
              <div
                key={ending.letter}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Unit3StudentAudioText
                  src={unit3StudentAudio(
                    "Page 27 - Exercise D",
                    `Item_${String([1, 3, 5][index]).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play ending ${ending.letter}`}
                  style={{ justifyContent: "flex-start", textAlign: "left" }}
                >
                  <strong style={{ marginRight: "10px" }}>
                    {ending.letter}
                  </strong>
                  {ending.text}
                </Unit3StudentAudioText>
              </div>
            ))}
          </div>
        </div>

        {/* القسم السفلي: كتابة الجملة كاملة */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "28px",
          }}
        >
          {SENTENCES.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "17px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "16px" }}>
                {s.num}
              </span>
              <LineInput
                value={answers.fullSentences[i]}
                disabled={locked || errors.fullSentences[i] === true}
                onChange={(v) => handleFullChange(i, v)}
                isOk={errors.fullSentences[i] === true}
                isWrong={errors.fullSentences[i] === false}
                ariaLabel={`Write complete sentence ${s.num}`}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="action-buttons-container mt-6">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button onClick={handleShow} className="show-answer-btn">
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

export default Unit3_Page6_Q1;
