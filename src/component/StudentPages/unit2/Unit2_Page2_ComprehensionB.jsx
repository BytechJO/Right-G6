import React, { useState } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  {
    word:       "amusement",
    wrongDef:   "a boring experience",
    correctDef: "an interesting experience",
  },
  {
    word:       "challenging",
    wrongDef:   "easy to do",
    correctDef: "difficult to do",
  },
  {
    word:       "expert",
    wrongDef:   "a person who has no knowledge of a skill",
    correctDef: "a person who has a lot of knowledge of a skill",
  },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[.,!?''""';:]/g, "").replace(/\s+/g, " ").trim();

const Unit2_Page2_ComprehensionB = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [errors,  setErrors]  = useState(Array(QUESTIONS.length).fill(null));
  const [locked,  setLocked]  = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => idx === i ? null : e));
    }
    setAnswers((prev) => prev.map((a, idx) => idx === i ? val : a));
  };

  const handleCheck = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    const newErrors = answers.map((a, i) => {
      const ok = normalize(a) === normalize(QUESTIONS[i].correctDef);
      if (ok) correct++;
      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = QUESTIONS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) { ValidationAlert.error(msg); }
    else { ValidationAlert.warning(msg); }
  };

  const handleShow = () => {
    setAnswers(QUESTIONS.map((q) => q.correctDef));
    setErrors(Array(QUESTIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div className="mb-15 mx-auto w-full flex flex-col gap-5">

      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">B</span>
        Read and write to correct the definition.
      </h5>

      {/* الأسئلة */}
      <div className="flex flex-col gap-6">
        {QUESTIONS.map((q, i) => {
          const hasError = errors[i] === true;
          const isOk     = errors[i] === false;

          return (
            <div key={i} className="grid items-start" style={{ gridTemplateColumns: "24px 140px 1fr 1fr" }}>

              {/* رقم */}
              <span className="font-bold text-[17px]">{i + 1}</span>

              {/* الكلمة */}
              <span className="font-semibold text-[17px]">{q.word}</span>

              {/* التعريف الغلط */}
              <span className="text-[17px] text-gray-700 leading-snug pr-4">{q.wrongDef}</span>

              {/* Input */}
              <div className="relative">
                <input
                  value={answers[i]}
                  disabled={locked || isOk}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    borderBottom: ` ${hasError ? "2px solid #ef4444" : "1px solid #555"}`,
                    outline: "none",
                    background: "transparent",
                    fontSize: "17px",
                    fontWeight: "400",
                    // color: "#6D2980",
                    padding: "2px 0",
                  }}
                />
                {hasError && (
                  <span style={{
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
                  }}>✕</span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-12">
         <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>

    </div>
  );
};

export default Unit2_Page2_ComprehensionB;