/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3WorkbookAudioText, {
  stopWorkbookUnit3Audio,
  workbookUnit3Audio,
} from "./Unit3WorkbookAudioText";

const questions = [
  {
    id: 1,
    text: <>If you had wanted to visit the museum, we will go on Friday.</>,
    answer: "wrong",
  },
  {
    id: 2,
    text: (
      <>
        If George and Carl planned to visit, we would love to have them stay
        with us.
      </>
    ),
    answer: "correct",
  },
  {
    id: 3,
    text: (
      <>
        Earth would be very flat compared to how it is today if we didn't have
        earthquakes and volcanoes.
      </>
    ),
    answer: "correct",
  },
  {
    id: 4,
    text: <>If we will go to the cinema, we could have seen a great movie.</>,
    answer: "wrong",
  },
  {
    id: 5,
    text: (
      <>
        {" "}
        France had just had a revolution in their country when they built the
        Statue of Liberty.
      </>
    ),
    answer: "wrong",
  },
  {
    id: 6,
    text: (
      <>
        If they decided to go to the Olympics, the athletes would start a tough
        training schedule.
      </>
    ),
    answer: "correct",
  },
];

const BORDER = "#84ad40";

const ChoiceBox = ({
  qIndex,
  value,
  symbol,
  selected,
  isWrong,
  isDisabled,
  onSelect,
}) => (
  <span
    onClick={() => !isDisabled && onSelect(qIndex, value)}
    onKeyDown={(event) => {
      if (!isDisabled && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onSelect(qIndex, value);
      }
    }}
    role="button"
    tabIndex={isDisabled ? -1 : 0}
    aria-label={`${value === "correct" ? "Correct" : "Incorrect"} for sentence ${qIndex + 1}`}
    aria-pressed={selected}
    aria-disabled={isDisabled}
    className="wb-unit3-choice"
    style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      border: `2px solid ${BORDER}`,
      borderRadius: 8,
      background: "#fff",
      cursor: isDisabled ? "default" : "pointer",
      fontSize: 22,
      fontWeight: "bold",
      color: selected ? "#D1232A" : "transparent",
      userSelect: "none",
      transition: "all .15s",
      flexShrink: 0,
    }}
  >
    {selected ? symbol : ""}

    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: -7,
          right: -7,
          width: 16,
          height: 16,
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,.25)",
          pointerEvents: "none",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

const WB_Unit2_Page13_H = () => {
  const init = () => questions.map(() => null);

  const [answers, setAnswers] = useState(init);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const handleSelect = (i, value) => {
    if (locked || result[i] === true) return;

    setAnswers((prev) => {
      const a = [...prev];
      a[i] = value;
      return a;
    });

    setResult((prev) => {
      const r = [...prev];
      r[i] = undefined;
      return r;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => a === null)) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;

    const nr = answers.map((a, i) => {
      const ok = a === questions[i].answer;

      if (ok) correct++;

      return ok;
    });

    setResult(nr);

    const total = questions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correct} / ${total}
        </span>
      </div>
    `;

    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit3Audio();
    setAnswers(init());
    setResult([]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-2">
        {/* Title */}
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Write <strong style={{ color: "red" }}>✓</strong> or{" "}
              <strong style={{ color: "red" }}>X</strong> to show if each{" "}
              <strong style={{ color: "orange" }}>second conditional</strong>{" "}
              sentence is correct.
            </>
          }
          subTitle="Decide ✓ or X first; if the item is wrong, correct only the part requested."
        />

        {/* Questions */}
        <div className="flex flex-col gap-10 my-1">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className="flex items-center gap-4 "
              style={{ fontSize: "19px" }}
            >
              {/* ✓ */}
              <ChoiceBox
                qIndex={i}
                value="correct"
                symbol="✓"
                selected={answers[i] === "correct"}
                isWrong={result[i] === false && answers[i] === "correct"}
                isDisabled={locked || result[i] === true}
                onSelect={handleSelect}
              />

              {/* ✕ */}
              <ChoiceBox
                qIndex={i}
                value="wrong"
                symbol="✕"
                selected={answers[i] === "wrong"}
                isWrong={result[i] === false && answers[i] === "wrong"}
                isDisabled={locked || result[i] === true}
                onSelect={handleSelect}
              />

              {/* Question */}
              <span className="font-bold " style={{ minWidth: 24 }}>
                {q.id}
              </span>

              <Unit3WorkbookAudioText
                src={workbookUnit3Audio(
                  "Page 16 - Exercise D",
                  `Item_${String(q.id).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play sentence ${q.id}`}
                style={{ whiteSpace: "nowrap", textAlign: "left" }}
              >
                {q.text}
              </Unit3WorkbookAudioText>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
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

export default WB_Unit2_Page13_H;
