import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2WorkbookAudioText, {
  stopWorkbookUnit2Audio,
  workbookUnit2Audio,
} from "./Unit2WorkbookAudioText";

const questions = [
  {
    id: 1,
    text: (
      <>
        Look at that roller coaster! <u>It look so</u> thrilling.
      </>
    ),
    answer: "wrong",
  },
  {
    id: 2,
    text: (
      <>
        <u>I am still not sure</u> fun to ride.
      </>
    ),
    answer: "correct",
  },
  {
    id: 3,
    text: (
      <>
        We're going on a bike ride. <u>Come along</u>!
      </>
    ),
    answer: "correct",
  },
  {
    id: 4,
    text: (
      <>
        I'd like to <u>where's your sense of adventure</u> today.
      </>
    ),
    answer: "wrong",
  },
];

const BORDER = "#84ad40";

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
    stopWorkbookUnit2Audio();
    setAnswers(init());
    setResult([]);
    setLocked(false);
  };

  const ChoiceBox = ({ qIndex, value, symbol }) => {
    const selected = answers[qIndex] === value;
    const isWrong = result[qIndex] === false && selected;
    const isDisabled = locked || result[qIndex] === true;

    return (
      <span
        onClick={() => !isDisabled && handleSelect(qIndex, value)}
        onKeyDown={(event) => {
          if (!isDisabled && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            handleSelect(qIndex, value);
          }
        }}
        role="radio"
        aria-checked={selected}
        aria-label={value === "correct" ? "Correct" : "Incorrect"}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
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

        {/* Wrong badge only */}
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
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="H"
          title={
            <>
              Decide whether each expression is used correctly. Write{" "}
              <strong style={{ color: "red" }}>✓</strong> or{" "}
              <strong style={{ color: "red" }}>X</strong>.
            </>
          }
          subTitle=" Decide ✓ or X first; if the item is wrong, correct only the part requested."
        />

        {/* Questions */}
        <div className="flex flex-col gap-14 my-10">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className="flex items-center gap-4"
              style={{ fontSize: "19px" }}
            >
              {/* ✓ */}
              <ChoiceBox qIndex={i} value="correct" symbol="✓" />

              {/* ✕ */}
              <ChoiceBox qIndex={i} value="wrong" symbol="✕" />

              {/* Question */}
              <span className="font-bold" style={{ minWidth: 24 }}>
                {q.id}
              </span>

              <Unit2WorkbookAudioText
                src={workbookUnit2Audio(
                  "Page 13 - Exercise H",
                  `Item_${String(i + 1).padStart(3, "0")}_`,
                )}
                ariaLabel={`Play sentence ${q.id}`}
              >
                {q.text}
              </Unit2WorkbookAudioText>
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
