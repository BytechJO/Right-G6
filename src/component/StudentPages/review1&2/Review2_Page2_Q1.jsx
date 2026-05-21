import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";

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
        <h5 className="header-title-page8 mb-7">
          <span className="mr-2">C</span>
       Put the sentence parts from the chart below together, to make sentences that make sense and then write them in the blank lines. </h5>

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
                  {h}
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
                  {row.subject}
                </td>
                <td style={tdStyle}>{row.adverb}</td>
                <td style={tdStyle}>{row.adjNoun}</td>
                <td style={tdStyle}>that</td>
                <td style={tdStyle}>{row.clause}</td>
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
