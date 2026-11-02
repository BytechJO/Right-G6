import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit6StudentAudioText, {
  stopUnit6StudentAudio,
  unit6StudentAudio,
} from "../unit6/Unit6StudentAudioText";
import basketImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 22.svg";

const basketWords = [
  { text: "while", width: "7%", height: "10%", top: "16%", right: "76%" },
  { text: "I", width: "4%", height: "10%", top: "16%", right: "68.5%" },
  { text: "after", width: "7%", height: "10%", top: "16%", right: "59%" },
  { text: "see", width: "6%", height: "10%", top: "16%", right: "49%" },
  { text: "taste", width: "7%", height: "10%", top: "16%", right: "38%" },
  { text: "all", width: "5%", height: "10%", top: "16%", right: "29%" },
  { text: "say", width: "6%", height: "10%", top: "16%", right: "22%" },

  { text: "a", width: "4%", height: "10%", top: "27%", right: "75%" },
  { text: "your", width: "7%", height: "10%", top: "27%", right: "64%" },
  { text: "guess", width: "8%", height: "10%", top: "27%", right: "53%" },
  { text: "if", width: "4%", height: "10%", top: "27%", right: "45%" },
  { text: "suits", width: "7%", height: "10%", top: "27%", right: "35%" },
  { text: "yourself", width: "10%", height: "10%", top: "27%", right: "21%" },

  { text: "it", width: "4%", height: "10%", top: "37%", right: "68%" },
  { text: "far", width: "6%", height: "10%", top: "37%", right: "57%" },
  { text: "you", width: "6%", height: "10%", top: "37%", right: "48%" },
  { text: "suit", width: "6%", height: "10%", top: "37%", right: "38%" },
  { text: "so", width: "5%", height: "10%", top: "37%", right: "30%" },
];

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
    stopUnit6StudentAudio();
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
          placeholder="Write an expression"
          title="Write one complete expression"
          aria-label={`Expression ${index + 1}`}
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
      <div className="div-forall mb-10" style={{ gap: "20px" }}>
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Put the basket words in the correct order to make six expressions, then cross out the words that are not needed."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Reorder the basket words to build one correct expression
                at a time.
              </span>
              <span style={{ display: "block" }}>
                Task 2: After making all six expressions, cross out only the
                words that were not used.
              </span>
            </>
          }
        />

        {/* BASKET IMAGE */}
        {/* BASKET IMAGE */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "fit-content",
            }}
          >
            <img
              src={basketImg}
              alt="A word basket containing tiles used to build six expressions"
              style={{
                height: "250px",
                width: "auto",
                display: "block",
              }}
            />

            {basketWords.map((word, index) => (
              <Unit6StudentAudioText
                key={`${word.text}-${index}`}
                src={unit6StudentAudio(
                  "Page 52 - Exercise B",
                  `Item_${String(index + 1).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play ${word.text}`}
                style={{
                  position: "absolute",
                  width: word.width,
                  height: word.height,
                  top: word.top,
                  right: word.right,
                  zIndex: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span className="sr-only">{word.text}</span>
              </Unit6StudentAudioText>
            ))}
          </div>
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
