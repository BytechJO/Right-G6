import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review6_Page1_Q2 = () => {
  const questions = [
    {
      num: 1,
      definition: "said to show that you are surprised or impressed",
      correct: "c",
    },
    {
      num: 2,
      definition: "means it happened a long time ago",
      correct: "f",
    },
    {
      num: 3,
      definition:
        "put into a sentence to mean you are bringing something up without planning it",
      correct: "a",
    },
    {
      num: 4,
      definition: "means that it is done the way you like it",
      correct: "b",
    },
    {
      num: 5,
      definition: "to give someone permission to begin an activity",
      correct: "d",
    },
    {
      num: 6,
      definition:
        "used when someone has started talking about a subject, and you want to continue talking about it",
      correct: "e",
    },
  ];

  const matches = [
    { letter: "a", text: "By the way ..." },
    { letter: "b", text: "to my liking" },
    { letter: "c", text: "That sure is something!" },
    { letter: "d", text: "go ahead" },
    { letter: "e", text: "Speaking of ..." },
    { letter: "f", text: "years ago" },
  ];

  const [selected, setSelected] = useState(Array(questions.length).fill(""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...selected];
    updated[i] = value;
    setSelected(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (selected.some((s) => !s.trim())) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }
    let correctCount = 0;
    const newResults = selected.map((s, i) => {
      const ok = s.trim().toLowerCase() === questions[i].correct.toLowerCase();
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const total = questions.length;
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
    setSelected(questions.map((q) => q.correct));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    setSelected(Array(questions.length).fill(""));
    setResult([]);
    setLocked(false);
  };

  const renderInput = (i) => {
    const isCorrect = result[i] === true;
    const isWrong = result[i] === false;
    return (
      <span style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          value={selected[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          maxLength={1}
          disabled={locked || isCorrect}
          style={{
            width: "36px",
            border: "none",
            borderBottom: `1px solid ${isWrong ? "#D1232A" : "#222"}`,
            outline: "none",
            background: "transparent",
            fontSize: "16px",
            fontWeight: "600",
            textAlign: "center",
            padding: "0 2px 2px 2px",
            // color: isWrong ? "#D1232A" : "#222",
            cursor: locked || isCorrect ? "default" : "text",
          }}
        />
        {isWrong && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "18px",
              height: "18px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "10px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              pointerEvents: "none",
            }}
          >
            ✕
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall" style={{ gap: "50px" }}>
        {/* TITLE */}
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>B</span>
          Match each expression to its definition or description.
        </h5>

        {/* MATCHING LAYOUT */}
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
          {/* LEFT — definitions + input */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            {questions.map((q, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "18px",
                  lineHeight: "1.5",
                  minHeight: "44px",
                }}
              >
                {/* number */}
                <span style={{ fontWeight: "bold", minWidth: "16px" }}>
                  {q.num}
                </span>
                {/* definition text */}
                <span style={{ flex: 1 }}>{q.definition}</span>
              </div>
            ))}
          </div>

          {/* RIGHT — answer options */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              minWidth: "160px",
            }}
          >
            {matches.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  minHeight: "44px",
                }}
              >
                {/* input */}
                {renderInput(idx)}
                <span style={{ fontWeight: "bold" }}>
                  {m.letter}
                </span>
                <span>{m.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
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

export default Review6_Page1_Q2;
