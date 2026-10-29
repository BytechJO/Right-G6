/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit7AudioText, {
  stopWorkbookUnit7Audio,
  workbookUnit7Audio,
} from "./WorkbookUnit7AudioText";

const ITEMS = [
  {
    id: 1,
    prompt: "we/see/Eiffel Tower",
    before: "If we had traveled to Paris,",
    after: null,
    answer: "we would have seen the Eiffel Tower.",
    prefilled: false,
  },
  {
    id: 2,
    prompt: "he/make/cookies",
    before: "If Warren had known the party was tomorrow,",
    after: null,
    answer: "he would have made cookies.",
    prefilled: false,
  },
  {
    id: 3,
    prompt: "police/not/let/him/go",
    before: null,
    after: "if they had known he was guilty.",
    answer: "The police wouldn't have let him go,",
    prefilled: false,
  },
  {
    id: 4,
    prompt: "I/do/better",
    before: null,
    after: "if I had studied more.",
    answer: "I would have done better,",
    prefilled: false,
  },
];

const inputItems = ITEMS.filter((i) => !i.prefilled);

const initAnswers = () => {
  const a = {};
  inputItems.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'']/g, "")
    .replace(/\s+/g, " ")
    .trim();

// ── Sub-components OUTSIDE parent ──

const AnswerInput = ({
  value,
  onChange,
  disabled,
  isWrong,
  isCorrect,
  itemId,
}) => (
  <span
    style={{
      position: "relative",
      display: "inline-block",
      flex: 1,
      minWidth: "180px",
    }}
  >
    <input
      className="wb-unit7-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Complete the sentence"
      title="Complete the third conditional sentence"
      aria-label={`Sentence completion ${itemId}`}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: "-8px",
          transform: "translateY(-50%)",
          width: "20px",
          height: "20px",
          background: "red",
          color: "white",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

// ── Main Component ──

const WB_Unit_ThirdConditional_G = () => {
  const audioFolder = "Page 42 - Exercise G";
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = inputItems.some(({ id }) => !answers[id].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    inputItems.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = inputItems.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {};
    const r = {};
    inputItems.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit7Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-7">
        <ExerciseHeader
          sectionLetter="G"
          title={
            <>
              The "if" clause is given for the sentences. Complete each sentence
              to make it{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                third conditional
              </span>
              .
            </>
          }
          subTitle="Check that the condition and result logically belong together, then write the full conditional sentence."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            marginBottom: "3em",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Prompt */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    minWidth: "20px",
                  }}
                >
                  {item.id}
                </span>
                <WorkbookUnit7AudioText
                  src={
                    item.id === 4
                      ? workbookUnit7Audio(audioFolder, "Item_004_")
                      : null
                  }
                  ariaLabel={`Play clues for sentence ${item.id}`}
                  style={{ fontSize: "16px", color: "#333" }}
                >
                  {item.prompt}
                </WorkbookUnit7AudioText>
              </div>

              {/* Answer row */}
              <div
                style={{
                  paddingLeft: "30px",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {/* before text */}
                {item.before && (
                  <WorkbookUnit7AudioText
                    src={workbookUnit7Audio(audioFolder, `Item_00${item.id}_`)}
                    ariaLabel={`Play the given clause for sentence ${item.id}`}
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.before}
                  </WorkbookUnit7AudioText>
                )}

                {/* input or prefilled */}
                {item.prefilled ? (
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      borderBottom: "1.5px solid #555",
                      textDecoration: "underline",
                      paddingBottom: "2px",
                    }}
                  >
                    {item.answer}
                  </span>
                ) : (
                  <AnswerInput
                    value={answers[item.id]}
                    onChange={(val) => handleChange(item.id, val)}
                    disabled={locked || result[item.id] === true}
                    isWrong={result[item.id] === false}
                    isCorrect={result[item.id] === true}
                    itemId={item.id}
                  />
                )}

                {/* after text */}
                {item.after && (
                  <WorkbookUnit7AudioText
                    src={workbookUnit7Audio(
                      audioFolder,
                      item.id === 3 ? "Item_003_" : "Item_005_",
                    )}
                    ariaLabel={`Play the given clause for sentence ${item.id}`}
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.after}
                  </WorkbookUnit7AudioText>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default WB_Unit_ThirdConditional_G;
