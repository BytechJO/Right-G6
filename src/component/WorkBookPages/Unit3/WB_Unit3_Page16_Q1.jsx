import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const WORD_BANK = [
  { num: 1,  word: "I" },
  { num: 2,  word: "don't" },
  { num: 3,  word: "think" },
  { num: 4,  word: "so" },
  { num: 5,  word: "Let's" },
  { num: 6,  word: "take" },
  { num: 7,  word: "a" },
  { num: 8,  word: "look" },
  { num: 9,  word: "If" },
  { num: 10, word: "I" },
  { num: 11, word: "were" },
  { num: 12, word: "you" },
  { num: 13, word: "I" },
  { num: 14, word: "wouldn't" },
  { num: 15, word: "mind" },
  { num: 16, word: "It's" },
  { num: 17, word: "too" },
  { num: 18, word: "late" },
  { num: 19, word: "I'll" },
  { num: 20, word: "pass" },
];

const BANK_ROW1 = [
  { word: "pass", num: 20 },
  { word: "I",    num: 1  },
  { word: "so",   num: 4  },
  { word: "I'll", num: 19 },
  { word: "don't",num: 2  },
  { word: "It's", num: 16 },
  { word: "late", num: 18 },
  { word: "think",num: 3  },
  { word: "were", num: 11 },
  { word: "I",    num: 10 },
];

const BANK_ROW2 = [
  { word: "take",     num: 6  },
  { word: "look",     num: 8  },
  { word: "a",        num: 7  },
  { word: "too",      num: 17 },
  { word: "If",       num: 9  },
  { word: "you",      num: 12 },
  { word: "wouldn't", num: 14 },
  { word: "I",        num: 13 },
  { word: "mind",     num: 15 },
  { word: "Let's",    num: 5  },
];

const SENTENCES = [
  {
    id: 1,
    slots: [
      { num: 1,  answer: "I" },
      { num: 2,  answer: "don't" },
      { num: 3,  answer: "think" },
      { num: 4,  answer: "so" },
    ],
  },
  {
    id: 2,
    slots: [
      { num: 5,  answer: "Let's" },
      { num: 6,  answer: "take" },
      { num: 7,  answer: "a" },
      { num: 8,  answer: "look" },
    ],
  },
  {
    id: 3,
    slots: [
      { num: 9,  answer: "If" },
      { num: 10, answer: "I" },
      { num: 11, answer: "were" },
      { num: 12, answer: "you" },
    ],
  },
  {
    id: 4,
    slots: [
      { num: 13, answer: "I" },
      { num: 14, answer: "wouldn't" },
      { num: 15, answer: "mind" },
    ],
  },
  {
    id: 5,
    slots: [
      { num: 16, answer: "It's" },
      { num: 17, answer: "too" },
      { num: 18, answer: "late" },
    ],
  },
  {
    id: 6,
    slots: [
      { num: 19, answer: "I'll" },
      { num: 20, answer: "pass" },
    ],
  },
];

const initAnswers = () => {
  const a = {};
  SENTENCES.forEach((s) => s.slots.forEach((sl) => { a[sl.num] = ""; }));
  return a;
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();

// ✅ SlotInput خارج الـ component الرئيسي عشان ما يتعيد إنشاؤه عند كل render
const SlotInput = ({ slot, answer, locked, result, onChange }) => {
  const isWrong   = result[slot.num] === false;
  const isCorrect = result[slot.num] === true;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <span style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          value={answer}
          disabled={locked || isCorrect}
          onChange={(e) => onChange(slot.num, e.target.value)}
          style={{
            width: "110px",
            border: "none",
            borderBottom: `2px solid ${isWrong ? "#D1232A" : "#333"}`,
            outline: "none",
            background: "transparent",
            fontSize: "17px",
            fontWeight: "600",
            color:  isWrong ? "#D1232A" : "#000000ff",
            textAlign: "center",
            paddingBottom: "2px",
          }}
        />
        {isWrong && (
          <span style={{
            position: "absolute", top: "-8px", right: "-8px",
            width: "18px", height: "18px", background: "#ef4444", color: "white",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: "bold", border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}>✕</span>
        )}
      </span>
      <span style={{ fontSize: "15px", color: "#555", fontWeight: "500" }}>
        {slot.num}
      </span>
    </div>
  );
};

const WB_Unit_WordOrder_C = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult]   = useState({});
  const [locked, setLocked]   = useState(false);

  const handleChange = (num, value) => {
    if (locked || result[num] === true) return;
    setAnswers((prev) => ({ ...prev, [num]: value }));
    setResult((prev)  => ({ ...prev, [num]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const allSlots = SENTENCES.flatMap((s) => s.slots);
    const hasEmpty = allSlots.some((sl) => !answers[sl.num].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    allSlots.forEach((sl) => {
      const ok = normalize(answers[sl.num]) === normalize(sl.answer);
      if (ok) correct++;
      nr[sl.num] = ok;
    });
    setResult(nr);

    const total = allSlots.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {};
    const r = {};
    SENTENCES.forEach((s) => s.slots.forEach((sl) => {
      a[sl.num] = sl.answer;
      r[sl.num] = true;
    }));
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>C</span>
          Write the words in order (numerical order) to make expressions.
        </h5>

        <div style={{
          border: `2px solid ${BORDER}`,
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "36px",
          fontSize: "16px",
        }}>
          {[BANK_ROW1, BANK_ROW2].map((row, ri) => (
            <div
              key={ri}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${row.length}, 1fr)`,
              }}
            >
              {row.map((item, ci) => (
                <div
                  key={ci}
                  style={{
                    padding: "10px 6px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span style={{ fontWeight: "500" }}>{item.word}</span>
                  <span style={{ fontSize: "13px", color: "#555" }}>{item.num}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "3em" }}>
          {SENTENCES.map((sentence) => (
            <div
              key={sentence.id}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "16px",
              }}
            >
              <span style={{
                fontWeight: "bold",
                fontSize: "20px",
                minWidth: "24px",
                marginBottom: "20px",
              }}>
                {sentence.id}
              </span>

              <div style={{ display: "flex", gap: "70px", flexWrap: "wrap", alignItems: "flex-end" }}>
                {sentence.slots.map((slot) => (
                  <SlotInput
                    key={slot.num}
                    slot={slot}
                    answer={answers[slot.num]}
                    locked={locked}
                    result={result}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit_WordOrder_C;