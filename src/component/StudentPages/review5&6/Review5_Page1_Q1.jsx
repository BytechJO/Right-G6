import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit6StudentAudioText, {
  stopUnit6StudentAudio,
  unit6StudentAudio,
} from "../unit6/Unit6StudentAudioText";

const wordBank = [
  { text: "bookworm", audio: "Item_001_" },
  { text: "science fiction", audio: "Item_002_" },
  { text: "boss", audio: "Item_003_" },
  { text: "comedy", audio: "Item_004_" },
  { text: "suppose", audio: "Item_005_" },
  { text: "active", audio: "Item_006_" },
  { text: "imagination", audio: "Item_007_" },
  { text: "persuade", audio: "Item_008_" },
  { text: "intended", audio: "Item_009_" },
  { text: "opinion", audio: "Item_010_" },
];

// sorted alphabetically with syllable counts
const correctAnswers = [
  { word: "active", syllables: "2" },
  { word: "bookworm", syllables: "2" },
  { word: "boss", syllables: "1" },
  { word: "comedy", syllables: "3" },
  { word: "imagination", syllables: "5" },
  { word: "intended", syllables: "3" },
  { word: "opinion", syllables: "3" },
  { word: "persuade", syllables: "2" },
  { word: "science fiction", syllables: "4" },
  { word: "suppose", syllables: "2" },
];

const emptyAnswers = () =>
  Array(10)
    .fill(null)
    .map(() => ({ word: "", syllables: "" }));

const Review5_Page1_Q1 = () => {
  const [answers, setAnswers] = useState(emptyAnswers());
  const [wordErrors, setWordErrors] = useState(Array(10).fill(false));
  const [syllableErrors, setSyllableErrors] = useState(Array(10).fill(false));
  const [correctLocked, setCorrectLocked] = useState(Array(10).fill(false));
  const [locked, setLocked] = useState(false);

  const normalize = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[?.""'',!]/g, "");

  const updateWord = (index, value) => {
    if (locked || correctLocked[index]) return;
    const updated = [...answers];
    updated[index] = { ...updated[index], word: value };
    setAnswers(updated);
    const errs = [...wordErrors];
    errs[index] = false;
    setWordErrors(errs);
  };

  const updateSyllables = (index, value) => {
    if (locked || correctLocked[index]) return;
    const updated = [...answers];
    updated[index] = { ...updated[index], syllables: value };
    setAnswers(updated);
    const errs = [...syllableErrors];
    errs[index] = false;
    setSyllableErrors(errs);
  };

  const checkAnswers = () => {
    if (locked) return;
    const isEmpty = answers.some(
      (a) => normalize(a.word) === "" || normalize(a.syllables) === "",
    );
    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;
    const newWordErrors = Array(10).fill(false);
    const newSyllableErrors = Array(10).fill(false);
    const newLocked = Array(10).fill(false);

    answers.forEach((ans, i) => {
      const wordOk = normalize(ans.word) === normalize(correctAnswers[i].word);
      const syllOk =
        normalize(ans.syllables) === normalize(correctAnswers[i].syllables);
      newWordErrors[i] = !wordOk;
      newSyllableErrors[i] = !syllOk;
      if (wordOk && syllOk) {
        score++;
        newLocked[i] = true;
      }
    });

    setWordErrors(newWordErrors);
    setSyllableErrors(newSyllableErrors);
    setCorrectLocked(newLocked);

    const total = 10;
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
    setAnswers(
      correctAnswers.map((a) => ({ word: a.word, syllables: a.syllables })),
    );
    setWordErrors(Array(10).fill(false));
    setSyllableErrors(Array(10).fill(false));
    setCorrectLocked(Array(10).fill(true));
    setLocked(true);
  };

  const reset = () => {
    stopUnit6StudentAudio();
    setAnswers(emptyAnswers());
    setWordErrors(Array(10).fill(false));
    setSyllableErrors(Array(10).fill(false));
    setCorrectLocked(Array(10).fill(false));
    setLocked(false);
  };

  const renderRow = (index) => {
    const ans = answers[index];
    const wErr = wordErrors[index];
    const sErr = syllableErrors[index];
    const lck = locked || correctLocked[index];

    return (
      <div
        key={index}
        style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
      >
        {/* Number */}
        <span
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            minWidth: "20px",
            flexShrink: 0,
          }}
        >
          {index + 1}
        </span>

        {/* Word input */}
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            value={ans.word}
            disabled={lck}
            onChange={(e) => updateWord(index, e.target.value)}
            placeholder="Vocabulary word"
            title="Enter the vocabulary word"
            aria-label={`Vocabulary word ${index + 1}`}
            style={{
              width: "100%",
              border: "none",
              borderBottom: wErr ? "2px solid #ef4444" : "1px solid black",
              outline: "none",
              textAlign: "center",
              background: "transparent",
              fontSize: "18px",
              // fontWeight: "600",
              // color: "#6D2980",
              padding: "2px 4px",
            }}
          />
          {wErr && (
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

        {/* Syllables input */}
        <div style={{ width: "52px", position: "relative" }}>
          <input
            type="text"
            value={ans.syllables}
            disabled={lck}
            onChange={(e) => updateSyllables(index, e.target.value)}
            placeholder="e.g. 2"
            title="Enter the number of syllables"
            aria-label={`Syllable count ${index + 1}`}
            style={{
              width: "100%",
              border: "none",
              borderBottom: sErr ? "2px solid #ef4444" : "1px solid black",
              outline: "none",
              background: "transparent",
              fontSize: "18px",
              // fontWeight: "600",
              // color: "#6D2980",
              padding: "2px 4px",
              textAlign: "center",
            }}
          />
          {sErr && (
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
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Put the vocabulary words in alphabetical order and write how many syllables each word has."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Put all vocabulary words in alphabetical order first.
              </span>
              <span style={{ display: "block" }}>
                Task 2: Then count and record the syllables for each word.
              </span>
            </>
          }
        />

        {/* WORD BANK */}
        <div
          style={{
            // border: "2px solid #c8dfc8",
            borderRadius: "10px",
            padding: "12px 20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",

            gap: "20px",
            marginBottom: "28px",
            backgroundColor: "#e1e9d1",
            fontSize: "18px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {wordBank.map((word) => (
            <Unit6StudentAudioText
              key={word.text}
              src={unit6StudentAudio("Page 52 - Exercise A", word.audio)}
              ariaLabel={`Play ${word.text}`}
            >
              {word.text}
            </Unit6StudentAudioText>
          ))}
        </div>

        {/* TWO-COLUMN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px 40px",
          }}
        >
          {/* odd: left col, even: right col — rendered in pairs */}
          {Array.from({ length: 10 }).map((_, i) => renderRow(i))}
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

export default Review5_Page1_Q1;
