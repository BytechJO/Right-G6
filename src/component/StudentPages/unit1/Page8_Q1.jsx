import React, { useState } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";
const Page8_Q1 = () => {
  // 8 blanks based on the passage in the image
  const correct = [
    "supplies", // 0: school ____
    "lately", // 1: very busy ____
    "tough", // 2: a ____ week
    "a set", // 3: a ____ of pencils
    "subject", // 4: for each ____
    "calculator", // 5: a ruler and a ____
    "likely", // 6: Helen will ____ go
    "remaining", // 7: the ____ supplies
  ];

  const [answers, setAnswers] = useState(Array(correct.length).fill(""));
  const [errors, setErrors] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = (text) =>
    text.trim().toLowerCase().replace(/\.$/, "").replace(/\s+/g, " ");

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setErrors((prev) => ({
      ...prev,
      [i]: undefined,
    }));
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = answers.some((a) => !a || a.trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newErrors = [];
    answers.forEach((ans, i) => {
      if (normalize(ans) === normalize(correct[i])) {
        correctCount++;
        newErrors[i] = false;
      } else {
        newErrors[i] = true;
      }
    });
    setErrors(newErrors);

    const total = correct.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers([...correct]);
    setErrors([]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(correct.length).fill(""));
    setErrors([]);
    setLocked(false);
  };

  const input = (i, width = "150px") => (
    <span className="relative inline-flex items-center mx-1">
      <input
        value={answers[i]}
        disabled={locked || errors[i] === false}
        onChange={(e) => handleChange(i, e.target.value)}
        style={{ width, height: "40px" }}
        className={`border-b outline-none text-center font-semibold bg-transparent
          ${errors[i] === true ? "border-red-500" : "border-black"}`}
      />
      {errors[i] === true && (
        <span
          style={{
            marginLeft: "5px",
            position: "absolute",
            top: "10px",
            right: "0px",
            width: "20px",
            height: "20px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "11px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "35px" }}>
        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A mr-2">A</span>
          Use some of the vocabulary words to make a summary of the
          conversation.
        </h5>

        {/* Passage */}
        <div className="text-[18px] leading-[4.6]">
          Stella asks Helen if she bought any school {input(0, "180px")}
          yet. Helen didn't buy any because she has been very busy{" "}
          {input(1, "180px")}. She had a {input(2, "160px")} week. Stella told
          Helen that she bought
          {input(3, "160px")} of pencils and erasable pens, some erasers, and
          some notebooks for each {input(4, "160px")}. She forgot to buy a ruler
          and a{input(5, "160px")}. Helen will {input(6, "140px")} go to the
          store tomorrow and she will buy the {input(7, "160px")} supplies that
          Stella needs too.
        </div>

        {/* Reset */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page8_Q1;
