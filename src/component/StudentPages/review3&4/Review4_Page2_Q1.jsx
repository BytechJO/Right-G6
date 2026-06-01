import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 53.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 55.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 57.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 56.svg";

const Review4_Page2_Q1 = () => {
  // Only 3 answers (questions 2, 3, 4) — question 1 is an example
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correctAnswers = [
    "The letter is written by Sam.",
    "The milk is drunk by the cat.",
    "The van is driven by Mom.",
    "The plants are watered by the gardener.",
  ];

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, "")
      .trim();

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const renderInput = (i) => (
    <span className="relative inline-block" style={{ width: "100%" }}>
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        style={{
          width: "100%",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: `1.5px solid ${result[i] === false ? "#ef4444" : "black"}`,
          outline: "none",
          fontSize: "17px",
          // color: "#6D2980",
          fontWeight: "600",
          background: "transparent",
          paddingBottom: "2px",
          marginTop: "28px",
        }}
      />
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "18px",
            right: "-10px",
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
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correctAnswers.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(correctAnswers);
    setResult([true, true, true]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const imageStyle = {
    width: "auto",
    height: "140px",
    objectFit: "contain",
    // border: "1.5px solid #bbb",
    borderRadius: "6px",
    flexShrink: 0,
  };

  // Editable rows (questions 2, 3, 4)
  const editableRows = [
    {
      img: img1,
      question: "Does Marcy or Sam write the letter?",
      idx: 0,
    },
    {
      img: img2,
      question: "Does the cat or the mouse drink the milk?",
      idx: 1,
    },
    {
      img: img3,
      question: "Does Mom or Dad drive the van?",
      idx: 2,
    },
    {
      img: img4,
      question: "Does the gardener or my sister water the plants?",
      idx: 3,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 mb-17">
          <span className="mr-6">C</span>
          Who did it? Look at the pictures and answer the question, using the
          present simple passive.
        </h5>

        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {/* Editable rows */}
          {editableRows.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "24px",
                marginBottom: "36px",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  minWidth: "20px",
                  paddingTop: "50px",
                }}
              >
                {i + 1}
              </span>

              {/* Image */}
              <img src={row.img} alt="" style={imageStyle} />

              {/* Question + Input */}
              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  justifyContent: "space-around",
                  height: "140px",
                  width:"100%",
                  fontSize: "17px",
                }}
              >
                <p style={{ margin: "0", color: "#222" }}>{row.question}</p>
                {renderInput(row.idx)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container mt-10">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review4_Page2_Q1;
