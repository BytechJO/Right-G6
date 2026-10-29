import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:\s]/g, "")
    .trim();

// الكلمات والتعريفات
const WORDS = [
  { num: 1, word: "ancient" },
  { num: 2, word: "tourists" },
  { num: 3, word: "civilization" },
  { num: 4, word: "trails" },
];

const DEFINITIONS = [
  { letter: "a", text: "pathways for walking" },
  { letter: "b", text: "society" },
  { letter: "c", text: "old" },
  { letter: "d", text: "ravelers" },
];

// الإجابات الصحيحة: رقم السؤال → الحرف
const CORRECT = ["c", "d", "b", "a"];

const Unit6_Page2_ComprehensionB = () => {
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [errors, setErrors] = useState(Array(5).fill(null));
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
    setErrors(Array(5).fill(true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(5).fill(""));
    setErrors(Array(5).fill(null));
    setLocked(false);
  };

  const InputBox = ({ index }) => {
    const isOk = errors[index] === true;
    const isWrong = errors[index] === false;
    return (
      <span style={{ position: "relative", display: "inline-block" }}>
        <input
          value={answers[index]}
          disabled={locked || isOk}
          onChange={(e) => handleChange(index, e.target.value)}
          style={{
            width: "50px",
            borderBottom: isWrong ? "2px solid #ef4444" : "1px solid black",
            outline: "none",
            background: "transparent",
            textAlign: "center",
            fontSize: "17px",
            fontWeight: "bold",
            // color: isOk ? "#84ad40" : "#6D2980",
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
            }}
          >
            ✕
          </span>
        )}
      </span>
    );
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8 leading-normal">
        <span className="ex-A-read mr-2">B</span>
        Match each word to its definition.
      </h5>

      <div
        style={{
          display: "flex",
          // gap: "150px",
          marginTop: "20px",
          justifyContent: "space-around",
          fontSize: "18px",
        }}
      >
        {/* العمود الأيسر - الكلمات مع الفراغات */}
        <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
          {WORDS.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <InputBox index={i} />
              <span style={{ fontWeight: "bold", color: "#333" }}>
                {item.num}
              </span>
              <span style={{ color: "#333" }}>{item.word}</span>
            </div>
          ))}
        </div>

        {/* العمود الأيمن - التعريفات */}
        <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
          {DEFINITIONS.map((def, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span style={{ fontWeight: "bold", color: "#333" }}>
                {def.letter}
              </span>
              <span style={{ color: "#333" }}>{def.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 ">
        <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit6_Page2_ComprehensionB;
