import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:\s]/g, "")
    .trim();

// الكلمات والتعريفات
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

// الإجابات الصحيحة: رقم السؤال → الحرف
const CORRECT = ["d", "c", "e", "b", "a"];

const Unit3_Page5_Q1 = () => {
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
            borderBottom: isWrong ? "2px solid #ef4444" : "1px solid #aaa",
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
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "50px" }}>
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A mr-2">A</span>
          Match each vocabulary word to its definition.
        </h5>

        <div
          style={{
            display: "flex",
            gap: "100px",
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          {/* العمود الأيسر - الكلمات مع الفراغات */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
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
          <div
            style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
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

export default Unit3_Page5_Q1;
