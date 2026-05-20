import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 14.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 13.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 12.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 11.svg";

const QUESTIONS = [
  {
    img: img1,
    icon: "✗", // أيقونة حمراء
    example: "Don hasn't ridden a school bus yet this week.",
    isExample: false,
  },
  {
    img: img2,
    icon: "✓", // أيقونة خضراء
    isExample: false,
  },
  {
    img: img3,
    icon: "✗",
    isExample: false,
  },
  {
    img: img4,
    icon: "✓",
    isExample: false,
  },
];

const CORRECT = [
  // index 0 = السؤال 2 (الأول مثال)
  ["Don hasn't ridden a school bus yet this week."],
  [
    "Don has visited the park this week.",
    "He has visited the park this week.",
    "Don has been to the park this week.",
  ],
  [
    "Don hasn't run a race yet this week.",
    "He hasn't run a race this week.",
    "Don has not run a race this week.",
  ],
  [
    "Don has drunk water this week.",
    "He has drunk water this week.",
    "Don has had water this week.",
  ],
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Page9_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([null, null, null, null]);
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
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    const newErrors = answers.map((a, i) => {
      const ok = CORRECT[i].some((ans) => normalize(a) === normalize(ans));
      if (ok) correct++;
      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = answers.length;
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
    setAnswers(CORRECT.map((c) => c[0]));
    setErrors([false, false, false]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "",""]);
    setErrors([null, null, null,null]);
    setLocked(false);
  };

  let inputIdx = -1;

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "40px" }}>
        {/* Title */}
        <h5 className="header-title-page8">
          <span className="ex-A mr-2">F</span>
          What has Don done? Look at the picture, and then write a sentence
          telling what he has or hasn't done this week.
        </h5>

        {/* Questions */}
        <div className="flex flex-col gap-6 w-full">
          {QUESTIONS.map((q, i) => {
            if (!q.isExample) inputIdx++;
            const idx = inputIdx;
            const hasError = !q.isExample && errors[idx] === true;
            const isOk = !q.isExample && errors[idx] === false;
            const isX = q.icon === "✗";

            return (
              <div key={i} className="flex items-center gap-4">
                {/* رقم */}

                {/* صورة */}
                <div
                  className="flex gap-5 items-start"
                  style={{
                    borderRadius: "12px",
                    // border: "2px solid #ccc",
                    // background: "#f5f5f5",
                    // flexShrink: 0,
                    // overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <span className="font-bold text-[18px] w-[16px] shrink-0">
                    {i + 1}
                  </span>
                  <img
                    src={q.img}
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Input أو المثال */}
                {q.isExample ? (
                  <span
                    style={{
                      textDecoration: "underline",
                      fontSize: "18px",
                      fontWeight: "500",
                      flex: 1,
                    }}
                  >
                    {q.example}
                  </span>
                ) : (
                  <div style={{ flex: 1, position: "relative" }}>
                    <input
                      value={answers[idx]}
                      disabled={locked || isOk}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      style={{
                        width: "100%",
                        borderBottom: hasError
                          ? "2px solid red"
                          : "1px solid #555",
                        outline: "none",
                        background: "transparent",
                        fontSize: "18px",
                        fontWeight: "500",
                        padding: "2px 0",
                        // color: "#6D2980",
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
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>
          {/* <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Page9_Q3;
