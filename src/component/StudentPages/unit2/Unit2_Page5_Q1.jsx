import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import Unit2AudioText, { stopUnit2Audio, unit2Audio } from "./Unit2AudioText";

const WORD_BANK = [
  "snowboarding",
  "terrified",
  "courage",
  "nervous",
  "faint",
  "adventure",
  "professional",
  "comfortable",
  "experience",
  "thrilling",
  "slope",
];

const COLUMNS = {
  verb: { label: "Verb", correct: ["faint"] },
  nouns: {
    label: "Nouns",
    correct: ["snowboarding", "courage", "adventure", "experience", "slope"],
  },
  adjectives: {
    label: "Adjectives",
    correct: [
      "thrilling",
      "terrified",
      "nervous",
      "professional",
      "comfortable",
    ],
  },
};

const ROWS = 5;
const WORD_AUDIO_INDEX = {
  snowboarding: 1, terrified: 2, faint: 3, adventure: 4,
  professional: 5, courage: 6, nervous: 7, comfortable: 8,
  experience: 9, thrilling: 10, slope: 11,
};
const HEADER_AUDIO_INDEX = { verb: 12, adjectives: 13, nouns: 14 };

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const VocabularyA = () => {
  const [answers, setAnswers] = useState({
    verb: Array(ROWS).fill(""),
    nouns: Array(ROWS).fill(""),
    adjectives: Array(ROWS).fill(""),
  });

  const [errors, setErrors] = useState({
    verb: Array(ROWS).fill(null),
    nouns: Array(ROWS).fill(null),
    adjectives: Array(ROWS).fill(null),
  });

  const [locked, setLocked] = useState(false);

  const usedWords = () => {
    const set = new Set();
    Object.values(answers).forEach((col) =>
      col.forEach((w) => {
        if (w.trim()) set.add(normalize(w));
      }),
    );
    return set;
  };

  const handleChange = (col, i, val) => {
    if (locked || errors[col][i] === false) return;
    if (errors[col][i] === true) {
      setErrors((prev) => ({
        ...prev,
        [col]: prev[col].map((e, idx) => (idx === i ? null : e)),
      }));
    }
    setAnswers((prev) => ({
      ...prev,
      [col]: prev[col].map((a, idx) => (idx === i ? val : a)),
    }));
  };

  const handleCheck = () => {
    if (locked) return;

    const allFilled = Object.keys(COLUMNS).every((col) =>
      answers[col].slice(0, COLUMNS[col].correct.length).every((a) => a.trim()),
    );

    if (!allFilled) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    const newErrors = {};

    Object.keys(COLUMNS).forEach((col) => {
      newErrors[col] = Array(ROWS).fill(null);
      const correctSet = new Set(COLUMNS[col].correct.map(normalize));
      const needed = COLUMNS[col].correct.length;
      answers[col].slice(0, needed).forEach((ans, i) => {
        const ok = correctSet.has(normalize(ans));
        if (ok) correct++;
        newErrors[col][i] = ok ? false : true;
      });
    });

    setErrors(newErrors);

    const total = Object.values(COLUMNS).reduce(
      (sum, c) => sum + c.correct.length,
      0,
    );
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    const shown = {};
    Object.keys(COLUMNS).forEach((col) => {
      shown[col] = [
        ...COLUMNS[col].correct,
        ...Array(ROWS - COLUMNS[col].correct.length).fill(""),
      ];
    });
    setAnswers(shown);
    setErrors({
      verb: Array(ROWS).fill(false),
      nouns: Array(ROWS).fill(false),
      adjectives: Array(ROWS).fill(false),
    });
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit2Audio();
    setAnswers({
      verb: Array(ROWS).fill(""),
      nouns: Array(ROWS).fill(""),
      adjectives: Array(ROWS).fill(""),
    });
    setErrors({
      verb: Array(ROWS).fill(null),
      nouns: Array(ROWS).fill(null),
      adjectives: Array(ROWS).fill(null),
    });
    setLocked(false);
  };

  const uw = usedWords();
  const colKeys = ["verb", "nouns", "adjectives"];

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title="Divide the vocabulary words into verbs, nouns, and adjectives."
          subTitle="Sort one item at a time using the category meaning, then recheck each group before submitting."
        />

        {/* Word Bank */}
        <div
          style={{
            background: "#ede8f1",
            borderRadius: "12px",
            padding: "12px 18px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 50px",
            fontSize: "15px",
            marginBottom: "20px",
          }}
        >
          {WORD_BANK.map((w) => (
            <Unit2AudioText
              key={w}
              src={unit2Audio("Page 14 - Exercise A", `Item_${String(WORD_AUDIO_INDEX[w]).padStart(3, "0")}_`)}
              ariaLabel={`Play ${w}`}
              style={{
                color: uw.has(w.toLowerCase()) ? "#aaa" : "#444",
                textDecoration: uw.has(w.toLowerCase())
                  ? "line-through"
                  : "none",
                fontWeight: 500,
              }}
            >{w}</Unit2AudioText>
          ))}
        </div>

        {/* الجدول */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "15px",
          }}
        >
          <thead>
            <tr>
              {colKeys.map((col) => (
                <th
                  key={col}
                  style={{
                    background: "#c8ddb0",
                    color: "#3a5a1a",
                    fontWeight: 700,
                    padding: "8px 10px",
                    border: "1px solid #84ad40",
                    textAlign: "center",
                    fontSize: "18px",
                  }}
                >
                  <Unit2AudioText
                    src={unit2Audio("Page 14 - Exercise A", `Item_${String(HEADER_AUDIO_INDEX[col]).padStart(3, "0")}_`)}
                    ariaLabel={`Play ${COLUMNS[col].label}`}
                  >{COLUMNS[col].label}</Unit2AudioText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {colKeys.map((col) => {
                  const hasError = errors[col][rowIdx] === true;
                  const isOk = errors[col][rowIdx] === false;
                  const needed = COLUMNS[col].correct.length;

                  if (rowIdx >= needed) {
                    return (
                      <td
                        key={col}
                        style={{
                          background: "transparent",
                        }}
                      />
                    );
                  }

                  return (
                    <td
                      key={col}
                      style={{
                        border: "1px solid #84ad40",
                        padding: "4px 8px",
                        textAlign: "center",
                        position: "relative",
                        background: "#fff",
                      }}
                    >
                      <input
                        value={answers[col][rowIdx]}
                        placeholder="Type the word"
                        title={`Type a ${COLUMNS[col].label.toLowerCase().replace(/s$/, "")}`}
                        className="unit2-answer-input"
                        disabled={locked || isOk}
                        onChange={(e) =>
                          handleChange(col, rowIdx, e.target.value)
                        }
                        style={{
                          width: "100%",
                          border: "none",
                          borderBottom: hasError
                            ? "2px solid #ef4444"
                            : "1px solid #aaa",
                          outline: "none",
                          background: "transparent",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: 500,
                          // color: isOk ? "#e53935" : "#333",
                          padding: "2px 0",
                        }}
                      />
                      {hasError && (
                        <span
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "4px",
                            width: "22px",
                            height: "22px",
                            background: "#ef4444",
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
                          }}
                        >
                          ✕
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          handleShowAnswer={handleShow}
          handleStartAgain={handleReset}
          checkAnswers={handleCheck}
        />
      </div>
    </div>
  );
};

export default VocabularyA;
