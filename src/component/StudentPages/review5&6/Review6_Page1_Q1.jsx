import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit6StudentAudioText, {
  stopUnit6StudentAudio,
  unit6StudentAudio,
} from "../unit6/Unit6StudentAudioText";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 24.svg";

const Review6_Page1_Q1 = () => {
  const wordBank = ["talented", "entertaining", "familiar", "proud", "lessons"];

  const questions = [
    {
      before: "She is a",
      after: "singer. I think her concert will sell many tickets.",
      correct: "talented",
      beforeAudio: "Item_006_",
      afterAudio: "Item_007_",
      fullAudio: "full1",
    },
    {
      before: "The goalie was",
      after:
        "of his trophy that he received for stopping the most goals in the tournament.",
      correct: "proud",
      beforeAudio: "Item_008_",
      afterAudio: "Item_009_",
      fullAudio: "full2",
    },
    {
      before: "That movie was very",
      after: "I'd like to watch it again sometime.",
      correct: "entertaining",
      beforeAudio: "Item_010_",
      afterAudio: "Item_011_",
      fullAudio: "full3",
    },
    {
      before: "That woman looks",
      after: ". Did she use to work at our school?",
      correct: "familiar",
      beforeAudio: "Item_012_",
      afterAudio: "Item_013_",
      fullAudio: "full4",
    },
    {
      before: "I get to take some karate",
      after: "this summer.",
      correct: "lessons",
      beforeAudio: "Item_014_",
      afterAudio: "Item_015_",
      fullAudio: "full5",
    },
  ];

  const [selected, setSelected] = useState(["", "", "", "", ""]);
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
    const correctAnswers = questions.map((q) => q.correct);
    setSelected(correctAnswers);
    setResult([true, true, true, true, true]);
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit6StudentAudio();
    setSelected(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const renderBlank = (i) => {
    const isCorrect = result[i] === true;
    const isWrong = result[i] === false;

    return (
      <span
        style={{
          position: "relative",
          display: "inline-block",
          verticalAlign: "bottom",
        }}
      >
        <input
          type="text"
          value={selected[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          disabled={locked || isCorrect}
          placeholder="Vocabulary word"
          title="Enter the vocabulary word"
          aria-label={`Vocabulary answer ${i + 1}`}
          style={{
            width: "155px",
            border: "none",
            borderBottom: `2px solid ${isWrong ? "#D1232A" : "#222"}`,
            outline: "none",
            background: "transparent",
            fontSize: "17px",
            fontWeight: "600",
            textAlign: "center",
            padding: "0 6px 2px 6px",
            lineHeight: "1.8",
            color: isCorrect ? "#222" : isWrong ? "#D1232A" : "#222",
            cursor: locked || isCorrect ? "default" : "text",
          }}
        />
        {isWrong && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
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
      <div className="div-forall mb-10" style={{ gap: "25px" }}>
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Complete each sentence with the correct vocabulary word."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        {/* WORD BANK */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            justifyContent: "center",
            backgroundColor: "#e1e9d1",
            // border: "1.5px solid #bbb",
            borderRadius: "25px",
            padding: "14px 20px",
            width: "fit-content",
            margin: "0 auto 10px auto",
          }}
        >
          {wordBank.map((word, idx) => (
            <Unit6StudentAudioText
              key={idx}
              src={unit6StudentAudio(
                "Page 54 - Exercise A",
                `Item_${String(idx + 1).padStart(3, "0")}_`,
              )}
              ariaLabel={`Play ${word}`}
              style={{
                fontSize: "16px",
                padding: "2px 10px",
                fontWeight: "500",
                // userSelect: "none",
              }}
            >
              {word}
            </Unit6StudentAudioText>
          ))}
        </div>

        {/* QUESTIONS + IMAGE */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          {/* QUESTIONS COLUMN */}
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
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: "5px",
                  fontSize: "18px",
                  lineHeight: "2.2",
                }}
              >
                {result[i] === true && (
                  <Unit6StudentAudioText
                    src={unit6StudentAudio("Page 54 - Exercise A", q.fullAudio)}
                    ariaLabel={`Play the complete correct sentence ${i + 1}`}
                    className="full-audio"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 3,
                    }}
                  >
                    <span className="sr-only">
                      {q.before} {q.correct} {q.after}
                    </span>
                  </Unit6StudentAudioText>
                )}
                <span style={{ fontWeight: "bold", minWidth: "18px" }}>
                  {i + 1}
                </span>
                <Unit6StudentAudioText
                  src={unit6StudentAudio("Page 54 - Exercise A", q.beforeAudio)}
                  ariaLabel={`Play ${q.before}`}
                  disabled={result[i] === true}
                  focusable={result[i] !== true}
                >
                  {q.before}
                </Unit6StudentAudioText>
                {renderBlank(i)}
                <Unit6StudentAudioText
                  src={unit6StudentAudio("Page 54 - Exercise A", q.afterAudio)}
                  ariaLabel={`Play ${q.after}`}
                  disabled={result[i] === true}
                  focusable={result[i] !== true}
                >
                  {q.after}
                </Unit6StudentAudioText>
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div
            style={{
              flexShrink: 0,
              marginTop: "48px",
              borderRadius: "8px",
            }}
          >
            <img
              src={img1}
              alt="A student practicing karate"
              style={{ width: "auto", height: "200px", display: "block" }}
            />
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

export default Review6_Page1_Q1;
