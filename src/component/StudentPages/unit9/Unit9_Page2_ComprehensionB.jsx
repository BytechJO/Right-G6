import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

import imgA from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 6.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 5.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 4.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 3.svg";

const QUESTIONS = [
  {
    chart: "bar graph",
    correct: ["b"],
  },
  {
    chart: "pie (circle) chart",
    correct: ["c"],
  },
  {
    chart: "line graph",
    correct: ["a"],
  },
  {
    chart: "double bar graph",
    correct: ["d"],
  },
];

const CHARTS = [
  {
    letter: "a",
    image: imgA,
  },
  {
    letter: "b",
    image: imgB,
  },
  {
    letter: "c",
    image: imgC,
  },
  {
    letter: "d",
    image: imgD,
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Unit9_Page2_ComprehensionB = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const [errors, setErrors] = useState(Array(QUESTIONS.length).fill(null));

  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;

    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }

    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleCheck = () => {
    if (locked) return;

    if (answers.includes("")) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;

    const newErrors = answers.map((a, i) => {
      const ok = QUESTIONS[i].correct.some(
        (c) => normalize(a) === normalize(c),
      );

      if (ok) correct++;

      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = QUESTIONS.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(QUESTIONS.map((q) => q.correct[0]));
    setErrors(Array(QUESTIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div>
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">B</span>
        Match the type of chart with its name.
      </h5>
      <div className="grid grid-cols-4 gap-6 mb-20">
        {CHARTS.map((chart, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* الحرف */}
            <div className="font-bold text-[20px] mb-2 self-start">
              {chart.letter}
            </div>

            {/* الصورة */}
            <img
              src={chart.image}
              alt={chart.letter}
              style={{
                width: "180px",
                height: "130px",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>

      {/* الجمل */}
      <div className="grid grid-cols-4 gap-15 text-[18px] whitespace-normal">
        {QUESTIONS.map((q, i) => {
          const hasError = errors[i] === true;
          const isOk = errors[i] === false;

          return (
            <div key={i}>
              {/* النص */}
              <div className="leading-2 min-h-5">{q.chart}</div>

              {/* الانبوت */}
              <div
                className="relative mt-2"
                style={{
                  width: "120px",
                }}
              >
                <input
                  value={answers[i]}
                  disabled={locked || isOk}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    borderBottom: `${
                      hasError ? "1px solid #ef4444" : "1px solid #555"
                    }`,
                    outline: "none",
                    textAlign: "center",
                    background: "transparent",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "2px 0",
                  }}
                />

                {hasError && (
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
              </div>
            </div>
          );
        })}
      </div>

      {/* buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit9_Page2_ComprehensionB;
