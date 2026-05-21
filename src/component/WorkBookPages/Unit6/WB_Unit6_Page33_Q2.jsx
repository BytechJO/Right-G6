import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const QUESTIONS = [
  {
    id: 1,
    clue: "Although one is an adjective and the other is an adverb, these two words are synonyms.",
    words: [
      { prefix: "f", answer: "flawless",     fullAnswer: "flawless" },
      { prefix: "p", answer: "perfectly",    fullAnswer: "perfectly" },
    ],
  },
  {
    id: 2,
    clue: "Someone who is this first word in music will probably be the second word.",
    words: [
      { prefix: "t", answer: "talented",     fullAnswer: "talented" },
      { prefix: "e", answer: "entertaining", fullAnswer: "entertaining" },
    ],
  },
  {
    id: 3,
    clue: "If you do all of this first word well, your parents will be (second word) of you!",
    clueUnderline: "second word",
    words: [
      { prefix: "l", answer: "lessons",      fullAnswer: "lessons" },
      { prefix: "p", answer: "proud",        fullAnswer: "proud" },
    ],
  },
  {
    id: 4,
    clue: "This compound word is something many students don't like.",
    words: [
      { prefix: "s", answer: "ummer",        fullAnswer: "summer" },
      { prefix: "s", answer: "chool",        fullAnswer: "school" },
    ],
  },
  {
    id: 5,
    clue: "It rhymes with nation, and many people enjoy having one.",
    words: [
      { prefix: "c", answer: "elebration",   fullAnswer: "celebration" },
    ],
  },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

// key: "qId-wIdx"
const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, words }) => {
    words.forEach((_, wi) => { a[`${id}-${wi}`] = ""; });
  });
  return a;
};

// ── PrefixInput — OUTSIDE parent ──
const PrefixInput = ({ fKey, prefix, value, onChange, onKeyDown, inputRef, isCorrect, isWrong, disabled }) => (
  <span style={{ display: "inline-flex", alignItems: "flex-end", gap: "0px" }}>
    {/* الحرف الأول الثابت */}
    <span style={{
      fontSize: "18px", fontWeight: "700",
      color: "#333",
      borderBottom: "1.5px solid #555",
      paddingBottom: "2px",
      lineHeight: 1,
    }}>
      {prefix}
    </span>
    {/* Input للباقي */}
    <span style={{ position: "relative", display: "inline-block" }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(fKey, e.target.value)}
        onKeyDown={onKeyDown}
        style={{
          width: "160px",
          border: "none",
          borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
          outline: "none",
          background: "transparent",
          fontSize: "18px",
          color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
          fontWeight: isCorrect ? "700" : "400",
          paddingBottom: "2px",
          fontFamily: "inherit",
        }}
      />
      {isWrong && (
        <span style={{
          position: "absolute", top: "-8px", right: "-8px",
          width: "16px", height: "16px", background: "#ef4444", color: "white",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "10px", fontWeight: "bold", border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}>✕</span>
      )}
    </span>
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit6_ClueVocab_B = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);
  const refs = useRef({});

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev)  => ({ ...prev, [key]: undefined }));
  };

  const handleKeyDown = (key, e) => {
    // nothing special needed — single input per word
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = Object.entries(answers).some(([, v]) => !v.trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

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
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, words }) => {
      words.forEach(({ answer }, wi) => {
        a[`${id}-${wi}`] = answer;
        r[`${id}-${wi}`] = true;
      });
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>B</span>
          Use the clues to find each vocabulary word.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, clue, clueUnderline, words }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Clue */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "17px" }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
                <span>
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
                </span>
              </div>

              {/* Word inputs */}
              <div style={{
                paddingLeft: "30px",
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
                alignItems: "flex-end",
              }}>
                {words.map(({ prefix }, wi) => {
                  const key = `${id}-${wi}`;
                  return (
                    <PrefixInput
                      key={wi}
                      fKey={key}
                      prefix={prefix}
                      value={answers[key]}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(key, e)}
                      inputRef={(el) => (refs.current[key] = el)}
                      isCorrect={result[key] === true}
                      isWrong={result[key] === false}
                      disabled={locked || result[key] === true}
                    />
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit6_ClueVocab_B;