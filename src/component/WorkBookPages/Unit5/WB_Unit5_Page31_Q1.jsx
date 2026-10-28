/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit5AudioText, {
  stopWorkbookUnit5Audio,
  workbookUnit5Audio,
} from "./WorkbookUnit5AudioText";

const QUESTIONS = [
  {
    id: 1,
    scrambled: "ride/can/sister/your/a/she/can't/bike/little",
    audio: "Item_001_",
    answer1: "Your little sister can ride a bike, can't she?",
    answer2: "Your little sister can't ride a bike, can she?",
    prefilled: false,
  },
  {
    id: 2,
    scrambled: "want/apples/some/don't/pick/you/to/you/do",
    audio: "Item_002_",
    answer1: "You don't want to pick some apples, do you?",
    answer2: "You do want to pick some apples, don't you?",
    prefilled: false,
  },
  {
    id: 3,
    scrambled: "the/should/we/shouldn't/go/library/we/to",
    audio: "Item_003_",
    answer1: "We should go to the library, shouldn't we?",
    answer2: "We shouldn't go to the library, should we?",
    prefilled: false,
  },
  {
    id: 4,
    scrambled: "speak/Brazil/do/Spanish/don't/they/in/people/most",
    audio: "Item_004_",
    answer1: "Most people do speak Spanish in Brazil, don't they?",
    answer2: "Most people don't speak Spanish in Brazil, do they?",
    prefilled: false,
  },
  {
    id: 5,
    scrambled: "today/is/electrician/isn't/he/coming/the",
    audio: "Item_005_",
    answer1: "The electrician is coming today, isn't he?",
    answer2: "The electrician isn't coming today, is he?",
    prefilled: false,
  },
  {
    id: 6,
    scrambled: "Canadians/English/don't/speak/they/do",
    audio: "Item_006_",
    answer1: "Canadians do speak English, don't they?",
    answer2: "Canadians don't speak English, do they?",
    prefilled: false,
  },
  {
    id: 7,
    scrambled: "Margaret/won't/visit/aunt/will/she/her",
    audio: null,
    answer1: "Margaret will visit her aunt, won't she?",
    answer2: "Margaret won't visit her aunt, will she?",
    prefilled: false,
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,'''’]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, answer1, answer2, prefilled }) => {
    a[`${id}-1`] = prefilled ? answer1 : "";
    a[`${id}-2`] = prefilled ? answer2 : "";
  });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({
  fKey,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
  prefilled,
}) => (
  <span style={{ position: "relative", display: "block" }}>
    <input
      className="wb-unit5-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(fKey, e.target.value)}
      placeholder="Write one possible sentence"
      title="Unscramble the words into a complete sentence"
      aria-label={`Unscrambled answer ${fKey}`}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: prefilled
          ? "#333"
          : isCorrect
            ? "#c0392b"
            : isWrong
              ? "#D1232A"
              : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "16px",
          height: "16px",
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
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

// ── MAIN COMPONENT ──
const WB_Unit5_Unscramble_I = () => {
  const audioFolder = "Page 31 - Exercise I";
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev) => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const inputQs = QUESTIONS.filter((q) => !q.prefilled);
    const hasEmpty = inputQs.some(
      ({ id }) => !answers[`${id}-1`].trim() || !answers[`${id}-2`].trim(),
    );
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer1, answer2, prefilled }) => {
      if (prefilled) {
        nr[`${id}-1`] = true;
        nr[`${id}-2`] = true;
        correct += 2;
        return;
      }
      const ok1 = normalize(answers[`${id}-1`]) === normalize(answer1);
      const ok2 = normalize(answers[`${id}-2`]) === normalize(answer2);
      if (ok1) correct++;
      if (ok2) correct++;
      nr[`${id}-1`] = ok1;
      nr[`${id}-2`] = ok2;
    });
    setResult(nr);
    const total = QUESTIONS.filter((q) => !q.prefilled).length * 2;
    const scored = correct;
    const color = scored === total ? "green" : scored === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${scored} / ${total}</span></div>`;
    if (scored === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (scored === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {};
    const r = {};
    QUESTIONS.forEach(({ id, answer1, answer2 }) => {
      a[`${id}-1`] = answer1;
      a[`${id}-2`] = answer2;
      r[`${id}-1`] = true;
      r[`${id}-2`] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit5Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-7">
        <ExerciseHeader
          sectionLetter="I"
          title="Unscramble each sentence. Most items have two possible answers."
          subTitle="Say the correct sentence first, then reorder the words and check capitalization and punctuation."
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, scrambled, audio, prefilled }) => {
            const k1 = `${id}-1`;
            const k2 = `${id}-2`;
            return (
              <div
                key={id}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {/* Scrambled words */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "16px",
                  }}
                >
                  <span style={{ fontWeight: "bold", minWidth: "20px" }}>
                    {id}
                  </span>
                  <WorkbookUnit5AudioText
                    src={audio ? workbookUnit5Audio(audioFolder, audio) : null}
                    ariaLabel={`Play scrambled sentence ${id}`}
                    style={{ color: "#444", letterSpacing: "0.3px" }}
                  >
                    {scrambled}
                  </WorkbookUnit5AudioText>
                </div>

                {/* Answer 1 */}
                <div style={{ paddingLeft: "28px" }}>
                  <AnswerInput
                    fKey={k1}
                    value={answers[k1]}
                    onChange={handleChange}
                    isCorrect={result[k1] === true}
                    isWrong={result[k1] === false}
                    disabled={locked || result[k1] === true || prefilled}
                    prefilled={prefilled}
                  />
                </div>

                {/* Answer 2 */}
                <div style={{ paddingLeft: "28px" }}>
                  <AnswerInput
                    fKey={k2}
                    value={answers[k2]}
                    onChange={handleChange}
                    isCorrect={result[k2] === true}
                    isWrong={result[k2] === false}
                    disabled={locked || result[k2] === true || prefilled}
                    prefilled={prefilled}
                  />
                </div>
              </div>
            );
          })}
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

export default WB_Unit5_Unscramble_I;
