import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit7StudentAudioText, {
  stopUnit7StudentAudio,
  unit7StudentAudio,
} from "./Unit7StudentAudioText";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:\s]/g, "")
    .trim();

// الكلمات والتعريفات
const WORDS = [
  { num: 1, word: "flatter", audio: "Item_001_" },
  { num: 2, word: "silly", audio: "Item_004_" },
  { num: 3, word: "aware", audio: "Item_006_" },
  { num: 4, word: "previously", audio: "Item_007_" },
  { num: 5, word: "strokes", audio: "Item_010_" },
  { num: 6, word: "advice", audio: "Item_012_" },
];

const DEFINITIONS = [
  {
    letter: "a",
    text: "an opinion about what someone should do",
    audio: "Item_002_",
  },
  { letter: "b", text: "knowing that something exists", audio: "Item_003_" },
  {
    letter: "c",
    text: "to cause someone to feel pleased by saying something nice",
    audio: "Item_005_",
  },
  {
    letter: "d",
    text: "playful or funny",
    audio: "Item_008_",
  },
  { letter: "e", text: "earlier in time or order", audio: "Item_009_" },
  { letter: "f", text: "gentle movements with the hand", audio: "Item_011_" },
];

// الإجابات الصحيحة: رقم السؤال → الحرف
const CORRECT = ["c", "d", "b", "e", "f", "a"];

const Unit7_Page5_Q1 = () => {
  const audioFolder = "Page 62 - Exercise A";
  const [answers, setAnswers] = useState(Array(6).fill(""));
  const [errors, setErrors] = useState(Array(6).fill(null));
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
    const updatedErr = [...errors];
    updatedErr[i] = null;
    setErrors(updatedErr);
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info();
      return;
    }
    let score = 0;
    const newErr = answers.map((a, i) => {
      const ok = normalize(a) === normalize(CORRECT[i]);
      if (ok) score++;
      return ok;
    });
    setErrors(newErr);
    const total = CORRECT.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(CORRECT);
    setErrors(Array(6).fill(true));
    setLocked(true);
  };

  const reset = () => {
    stopUnit7StudentAudio();
    setAnswers(Array(6).fill(""));
    setErrors(Array(6).fill(null));
    setLocked(false);
  };

  const inputBox = (index) => {
    const isOk = errors[index] === true;
    const isWrong = errors[index] === false;
    return (
      <span style={{ position: "relative", display: "inline-block" }}>
        <input
          className="unit7-exercise-input"
          type="text"
          maxLength={1}
          value={answers[index]}
          disabled={locked || isOk}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();

            if (value === "" || /^[a-f]$/.test(value)) {
              handleChange(index, value);
            }
          }}
          placeholder="e.g. a"
          title={`Write the matching definition letter for word ${index + 1}`}
          aria-label={`Definition letter for vocabulary word ${index + 1}`}
          style={{
            width: "50px",
            borderBottom: isWrong ? "1px solid #ef4444" : "1px solid #aaa",
            outline: "none",
            background: "transparent",
            textAlign: "center",
            fontSize: "17px",
            fontWeight: "bold",
          }}
        />
        {isWrong && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "11px",
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
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title="Match each vocabulary word to its definition."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />

        <div
          style={{
            display: "flex",
            gap: "120px",
            marginTop: "15px",
            fontSize: "18px",
          }}
        >
          {/* العمود الأيسر - الكلمات مع الفراغات */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "45px" }}
          >
            {WORDS.map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {inputBox(i)}
                <span style={{ fontWeight: "bold", color: "#333" }}>
                  {item.num}
                </span>
                <Unit7StudentAudioText
                  src={unit7StudentAudio(audioFolder, item.audio)}
                  ariaLabel={`Play ${item.word}`}
                  style={{ color: "#333" }}
                >
                  {item.word}
                </Unit7StudentAudioText>
              </div>
            ))}
          </div>

          {/* العمود الأيمن - التعريفات */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "45px" }}
          >
            {DEFINITIONS.map((def, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontWeight: "bold", color: "#333" }}>
                  {def.letter}
                </span>
                <Unit7StudentAudioText
                  src={unit7StudentAudio(audioFolder, def.audio)}
                  ariaLabel={`Play definition ${def.letter}`}
                  style={{ color: "#333" }}
                >
                  {def.text}
                </Unit7StudentAudioText>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Buttons */}
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

export default Unit7_Page5_Q1;
