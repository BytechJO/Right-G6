import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import Unit2AudioText, {
  stopUnit2Audio,
  unit2Audio,
} from "../unit2/Unit2AudioText";

const TABLE_DATA = [
  {
    subject: "The doctor",
    adverb: "so",
    adjNoun: "helpful",
    clause: "felt better within a day",
  },
  {
    subject: "Greg",
    adverb: "such",
    adjNoun: "athlete",
    clause: "won a medal",
  },
  {
    subject: "Camping",
    adverb: "so much",
    adjNoun: "fun",
    clause: "we want to go again",
  },
  { subject: "Mom", adverb: "so", adjNoun: "happy", clause: "she hugged us" },
];
const TABLE_AUDIO_INDEX = {
  "The doctor": 6,
  helpful: 7,
  "felt better within a day": 8,
  so: 9,
  such: 10,
  athlete: 11,
  "won a medal": 12,
  Greg: 13,
  Camping: 14,
  "so much": 15,
  fun: 16,
  "we want to go again": 17,
  happy: 18,
  "she hugged us": 19,
  Mom: 21,
};

const QUESTIONS = [
  {
    correct: ["The doctor was so helpful that I felt better within a day"],
  },
  { correct: ["Greg is such a good athlete that he won a gold medal"] },
  { correct: ["Camping is so much fun that we all want to go again"] },
  { correct: ["Mom was so happy that she hugged each one of us"] },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Review2_Page2_Q1 = () => {
  const inputCount = QUESTIONS.filter((q) => !q.example).length;
  const [answers, setAnswers] = useState(Array(inputCount).fill(""));
  const [errors, setErrors] = useState(Array(inputCount).fill(null));
  const [locked, setLocked] = useState(false);

  let counter = -1;
  const mapped = QUESTIONS.map((q) => {
    if (q.example) return { ...q, aIdx: null };
    counter++;
    return { ...q, aIdx: counter };
  });

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    if (errors[i] === true)
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleCheck = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correct = 0;
    const newErrors = answers.map((a, i) => {
      const q = mapped.find((q) => q.aIdx === i);
      const ok = q.correct.some((c) => normalize(a) === normalize(c));
      if (ok) correct++;
      return ok ? false : true;
    });
    setErrors(newErrors);
    const total = inputCount;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    setAnswers(mapped.filter((q) => q.aIdx !== null).map((q) => q.correct[0]));
    setErrors(Array(inputCount).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit2Audio();
    setAnswers(Array(inputCount).fill(""));
    setErrors(Array(inputCount).fill(null));
    setLocked(false);
  };

  const renderInput = (q, num) => {
    if (q.example) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            fontSize: "18px",
          }}
        >
          <span style={{ fontWeight: "bold", minWidth: "20px" }}>{num}</span>
          <span
            style={{
              borderBottom: "1px solid #555",
              flex: 1,
              fontSize: "18px",
              textDecoration: "underline",
              color: "#333",
              paddingBottom: "2px",
            }}
          >
            {q.correct[0]}
          </span>
        </div>
      );
    }

    const i = q.aIdx;
    const hasError = errors[i] === true;
    const isOk = errors[i] === false;

    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
        <span
          style={{ fontWeight: "bold", minWidth: "20px", fontSize: "18px" }}
        >
          {num}
        </span>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            value={answers[i]}
            placeholder="Type the sentence"
            title="Type the complete sentence"
            className="review-unit2-answer-input"
            disabled={locked || isOk}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{
              width: "100%",
              borderBottom: hasError ? "2px solid red" : "1px solid #555",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              outline: "none",
              background: "transparent",
              fontSize: "18px",
              fontWeight: 500,
              padding: "2px 0",
            }}
          />
          {hasError && (
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
                zIndex: 5,
              }}
            >
              ✕
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall">
        {/* العنوان */}
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Put the sentence parts from the chart together to make sentences using so or such."
          subTitle="Read each row across the chart to build a logical sentence. Check whether so or such fits the noun or adjective pattern before writing."
        />

        {/* الجدول */}
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginBottom: "32px",
            border: "1.5px solid #84ad40",
          }}
        >
          <thead>
            <tr style={{ background: "#e6f0d6" }}>
              {[
                "subject",
                "adverb (so, such)",
                "adjective or noun",
                "that",
                "clause",
              ].map((h, i) => (
                <th
                  key={i}
                  style={{
                    border: "1.5px solid #84ad40",
                    padding: "8px 12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#84ad40",
                    textAlign: "left",
                  }}
                >
                  <Unit2AudioText
                    src={unit2Audio(
                      "Page 19 - Exercise C",
                      `Item_${String(i + 1).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${h}`}
                  >
                    {h}
                  </Unit2AudioText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr
                key={i}
                // style={{ background: i % 2 === 0 ? "white" : "#f5faf0" }}
              >
                <td style={tdStyle}>
                  <span style={{ fontWeight: "bold", marginRight: "6px" }}>
                    {i + 1}
                  </span>
                  <Unit2AudioText
                    src={unit2Audio(
                      "Page 19 - Exercise C",
                      `Item_${String(TABLE_AUDIO_INDEX[row.subject]).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${row.subject}`}
                  >
                    {row.subject}
                  </Unit2AudioText>
                </td>
                <td style={tdStyle}>
                  <Unit2AudioText
                    src={unit2Audio(
                      "Page 19 - Exercise C",
                      `Item_${String(TABLE_AUDIO_INDEX[row.adverb]).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${row.adverb}`}
                  >
                    {row.adverb}
                  </Unit2AudioText>
                </td>
                <td style={tdStyle}>
                  <Unit2AudioText
                    src={unit2Audio(
                      "Page 19 - Exercise C",
                      `Item_${String(TABLE_AUDIO_INDEX[row.adjNoun]).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${row.adjNoun}`}
                  >
                    {row.adjNoun}
                  </Unit2AudioText>
                </td>
                <td style={tdStyle}>
                  <Unit2AudioText
                    src={unit2Audio("Page 19 - Exercise C", "Item_004_")}
                    ariaLabel="Play that"
                  >
                    that
                  </Unit2AudioText>
                </td>
                <td style={tdStyle}>
                  <Unit2AudioText
                    src={unit2Audio(
                      "Page 19 - Exercise C",
                      `Item_${String(TABLE_AUDIO_INDEX[row.clause]).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${row.clause}`}
                  >
                    {row.clause}
                  </Unit2AudioText>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* الأسئلة */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {mapped.map((q, i) => renderInput(q, i + 1))}
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <ActionButtons
            handleShowAnswer={handleShow}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
};

const tdStyle = {
  border: "1.5px solid #84ad40",
  padding: "8px 12px",
  fontSize: "16px",
  color: "#333",
};

export default Review2_Page2_Q1;
