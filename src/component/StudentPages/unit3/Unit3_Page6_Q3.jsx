/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import img1a from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/11.svg";
import img1b from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/9.svg";
import img2a from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/8.svg";
import img2b from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/10.svg";
import ExerciseHeader from "../../ExerciseHeader";

const LineInput = ({ value, disabled, onChange, isWrong }) => (
  <span
    style={{
      position: "relative",
      display: "inline-block",
      flex: 1,

      width: "100%",
    }}
  >
    <input
      value={value}
      disabled={disabled}
      placeholder="Write a complete second conditional sentence"
      title="Write a complete second conditional sentence"
      className="unit3-student-answer-input"
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: isWrong ? "2px solid #ef4444" : "1.5px solid #888",
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        fontWeight: 500,
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
          pointerEvents: "none",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

const QUESTIONS = [
  { num: 1, imgA: img1a, imgB: img1b },
  { num: 2, imgA: img2a, imgB: img2b },
];

const Unit3_Page6_Q3 = () => {
  const [answers, setAnswers] = useState(["", ""]);
  const [errors, setErrors] = useState([null, null]);
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === true) return;
    const a = [...answers];
    a[i] = val;
    setAnswers(a);
    const e = [...errors];
    e[i] = null;
    setErrors(e);
  };

  const handleReset = () => {
    setAnswers(["", ""]);
    setErrors([null, null]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall" style={{ gap: "40px" }}>
        <ExerciseHeader
          sectionLetter="F"
          title="Use the pictures to help you write a second conditional sentence."
          subTitle="Use the prompt, picture, or grammar pattern to write a complete response, then reread it for meaning, form, and punctuation."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "45px" }}>
          {QUESTIONS.map((q, i) => (
            <div key={i}>
              <div
                style={{ display: "flex", gap: "40px", marginBottom: "25px" }}
              >
                <img
                  src={q.imgA}
                  alt={
                    i === 0
                      ? "A historic museum building"
                      : "A sandy beach beside the sea"
                  }
                  style={{
                    width: "auto",
                    height: "110px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <img
                  src={q.imgB}
                  alt={
                    i === 0
                      ? "A museum display of antique swords"
                      : "Two children playing with a beach ball"
                  }
                  style={{
                    width: "auto",
                    height: "110px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "17px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{q.num}</span>
                <LineInput
                  value={answers[i]}
                  disabled={locked || errors[i] === true}
                  onChange={(v) => handleChange(i, v)}
                  isOk={errors[i] === true}
                  isWrong={errors[i] === false}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="action-buttons-container mt-8">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit3_Page6_Q3;
