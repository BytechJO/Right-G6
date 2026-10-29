/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit6AudioText, {
  stopWorkbookUnit6Audio,
  workbookUnit6Audio,
} from "./WorkbookUnit6AudioText";

const QUESTIONS = [
  {
    id: 1,
    clueAudio: "Item_001_",
    clue: "Although one is an adjective and the other is an adverb, these two words are synonyms.",
    words: [
      { prefix: "f", answer: "lawless", fullAnswer: "lawless" },
      { prefix: "p", answer: "erfectly", fullAnswer: "erfectly" },
    ],
  },
  {
    id: 2,
    clueAudio: "Item_002_",
    clue: "Someone who is this first word in music will probably be the second word.",
    words: [
      {
        prefix: "t",
        answer: "alented",
        fullAnswer: "alented",
      },
      { prefix: "e", answer: "ntertaining", fullAnswer: "ntertaining" },
    ],
  },
  {
    id: 3,
    clueAudio: "Item_004_",
    clue: "If you do all of this first word well, your parents will be (second word) of you!",
    clueUnderline: "second word",
    words: [
      { prefix: "l", answer: "essons", fullAnswer: "essons" },
      { prefix: "p", answer: "roud", fullAnswer: "roud" },
    ],
  },
  {
    id: 4,
    clueAudio: "Item_005_",
    clue: "This compound word is something many students don't like.",
    words: [
      { prefix: "s", answer: "ummer", fullAnswer: "ummer" },
      { prefix: "s", answer: "chool", fullAnswer: "chool" },
    ],
  },
  {
    id: 5,
    clueAudio: "Item_007_",
    clue: "It rhymes with nation, and many people enjoy having one.",
    words: [{ prefix: "c", answer: "elebration", fullAnswer: "elebration" }],
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'']/g, "")
    .replace(/\s+/g, " ")
    .trim();

// key: "qId-wIdx"
const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, words }) => {
    words.forEach((_, wi) => {
      a[`${id}-${wi}`] = "";
    });
  });
  return a;
};

// ── PrefixInput — OUTSIDE parent ──
const PrefixInput = ({
  fKey,
  prefix,
  ariaPrefix = prefix,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
}) => (
  <span style={{ display: "inline-flex", alignItems: "flex-end", gap: "0px" }}>
    {/* الحرف الأول الثابت */}
    <span
      style={{
        fontSize: "18px",
        fontWeight: "700",
        color: "#333",
        borderBottom: "1.5px solid #555",
        paddingBottom: "5px",
        lineHeight: 1,
      }}
    >
      {prefix}
    </span>
    {/* Input للباقي */}
    <span style={{ position: "relative", display: "inline-block" }}>
      <input
        className="wb-unit6-input"
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(fKey, e.target.value)}
        placeholder="Complete word"
        title={`Complete the word beginning with ${ariaPrefix}`}
        aria-label={`Complete word ${fKey}, beginning with ${ariaPrefix}`}
        style={{
          width: "160px",
          border: "none",
          borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
          outline: "none",
          background: "transparent",
          fontSize: "18px",
          color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
          fontWeight: isCorrect ? "700" : "400",
          fontFamily: "inherit",
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
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit6_ClueVocab_B = () => {
  const audioFolder = "Page 33 - Exercise B";
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev) => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = Object.entries(answers).some(([, v]) => !v.trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, words }) => {
      words.forEach(({ prefix, answer }, wi) => {
        const key = `${id}-${wi}`;
        // المستخدم يكتب ما بعد الحرف الأول، نقارن الكلمة الكاملة
        const full = prefix + answers[key];
        const ok = normalize(full) === normalize(prefix + answer);
        if (ok) correct++;
        nr[key] = ok;
      });
    });
    setResult(nr);
    const total = Object.keys(answers).length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {};
    const r = {};
    QUESTIONS.forEach(({ id, words }) => {
      words.forEach(({ answer }, wi) => {
        a[`${id}-${wi}`] = answer;
        r[`${id}-${wi}`] = true;
      });
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit6Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-5">
        <ExerciseHeader
          sectionLetter="B"
          title="Use the clues to find each vocabulary word."
          subTitle="Use both the clue meaning and the starting letters to identify the vocabulary word before typing it."
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, clue, clueUnderline, clueAudio, words }) => (
            <div
              key={id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Clue */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "17px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>
                  {id}
                </span>
                <WorkbookUnit6AudioText
                  src={workbookUnit6Audio(audioFolder, clueAudio)}
                  ariaLabel={`Play clue ${id}`}
                  style={{ flex: 1 }}
                >
                  {clueUnderline
                    ? clue.split(clueUnderline).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <u style={{ fontWeight: "600" }}>{clueUnderline}</u>
                          )}
                        </span>
                      ))
                    : clue}
                </WorkbookUnit6AudioText>
              </div>

              {/* Word inputs */}
              <div
                style={{
                  paddingLeft: "30px",
                  display: "flex",
                  gap: "24px",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
              >
                {words.map(({ prefix, audio }, wi) => {
                  const key = `${id}-${wi}`;
                  return (
                    <span
                      key={wi}
                      style={{ display: "inline-flex", alignItems: "flex-end" }}
                    >
                      <PrefixInput
                        fKey={key}
                        prefix={audio ? "" : prefix}
                        ariaPrefix={prefix}
                        value={answers[key]}
                        onChange={handleChange}
                        isCorrect={result[key] === true}
                        isWrong={result[key] === false}
                        disabled={locked || result[key] === true}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
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

export default WB_Unit6_ClueVocab_B;
