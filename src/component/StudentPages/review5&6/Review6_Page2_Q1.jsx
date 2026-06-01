import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review6_Page2_Q1 = () => {
  const questions = [
    {
      sentence: "The Olympics used to be held in Greece.",
      correct: "past action",
    },
    {
      sentence: "Helen and Elizabeth are used to swimming every day.",
      correct: "accustomed",
    },
    {
      sentence: "Peter isn't used to going to school on Saturday.",
      correct: "accustomed",
    },
    {
      sentence: "What did you use to do for break time at your old school?",
      correct: "past action",
    },
    {
      sentence: "My grandma used to be a stunt person in the movies.",
      correct: "past action",
    },
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
          disabled={locked || isCorrect}
          placeholder=""
          style={{
            width: "160px",
            border: "none",
            borderBottom: `1px solid ${isWrong ? "#D1232A" : "#222"}`,
            outline: "none",
            background: "transparent",
            fontSize: "16px",
            fontWeight: "600",
            textAlign: "center",
            padding: "0 4px 2px 4px",
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
      <div className="div-forall" style={{ gap: "60px" }}>
        {/* TITLE */}
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>C</span>
          Write{" "}
          <span className="text-orange-500" style={{ fontWeight: "bold" }}>
            "accustomed"
          </span>{" "}
          or{" "}
          <span className="text-orange-500" style={{ fontWeight: "bold" }}>
            "past action"
          </span>{" "}
          to tell what{" "}
          <span className="text-orange-500" style={{ fontStyle: "italic" }}>
            used to
          </span>{" "}
          /{" "}
          <span className="text-orange-500" style={{ fontStyle: "italic" }}>
            use to
          </span>{" "}
          means in each sentence.
        </h5>

        {/* QUESTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                fontSize: "18px",
                lineHeight: "2",
              }}
            >
              {/* number */}
              <span style={{ fontWeight: "bold", minWidth: "16px" }}>
                {i + 1}
              </span>
              {/* sentence */}
              <span style={{ flex: 0.8 }}>{q.sentence}</span>
              {/* input */}
              {renderInput(i)}
            </div>
          ))}
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

export default Review6_Page2_Q1;
