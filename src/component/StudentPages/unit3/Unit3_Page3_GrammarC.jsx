import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

const GrammarC = () => {
  // إجابتين محتملتان لكل سؤال
  const correct = [
    [
      "would you bring your soccer ball if you had a bigger backpack?",
      "if you had a bigger backpack would you bring your soccer ball?",
    ],
    [
      "would jack sail to hawaii if he had a sailboat?",
      "if jack had a sailboat would he sail to hawaii?",
    ],
    [
      "would they feel better if they drank more water?",
      "if they drank more water would they feel better?",
    ],
  ];

  const questions = [
    "You would bring your soccer ball if you had a bigger backpack.",
    "If Jack had a sailboat, he would sail to Hawaii.",
    "They would feel better if they drank more water.",
  ];

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!;:'"-/]/g, "")
      .trim();

  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([null, null, null]);
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
    const updatedResult = [...result];
    updatedResult[i] = null;
    setResult(updatedResult);
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    const res = answers.map((a, i) => {
      const norm = normalize(a);
      const ok = correct[i].some((c) => normalize(c) === norm);
      if (ok) score++;
      return ok;
    });

    setResult(res);
    const msg = `Score: ${score} / 3`;
    if (score === 3) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(correct.map((c) => c[0]));
    setResult([true, true, true]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", ""]);
    setResult([null, null, null]);
    setLocked(false);
  };

  const inputField = (i) => (
    <div className="relative mt-1">
      <input
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        className="w-full outline-none bg-transparent font-semibold text-[17px]"
        style={{
          borderBottom:
            result[i] === false
              ? "2px solid #ef4444"
              : result[i] === true
              ? "1px solid #aaa"
              : "1px solid #aaa",
          paddingBottom: "2px",
        }}
      />
      {result[i] === false && (
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
  
    </div>
  );

  return (
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">C</span>
        Change the statement to a question.
      </h5>

      <div className="flex flex-col gap-10 mt-8 text-[18px]">
        {questions.map((q, i) => (
          <div key={i}>
            <div className="flex gap-2">
              <span className="font-bold">{i + 1}</span>
              <span>{q}</span>
            </div>
            <div className="mt-2 ml-5">{inputField(i)}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default GrammarC;