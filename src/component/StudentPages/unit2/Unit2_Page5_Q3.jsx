import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";

const QUESTIONS = [
  {
    parts: [
      { text: "I have" },
      { blank: true, correct: ["such"] },
      { text: "a big box of books" },
      { blank: true, correct: ["that"] },
      { text: "I can't carry it." },
    ],
  },
  {
    parts: [
      { text: "The cat climbed" },
      { blank: true, correct: ["so"] },
      { text: "high in the tree" },
      { blank: true, correct: ["that"] },
      { text: "it couldn't get down." },
    ],
  },
  {
    parts: [
      { text: "We are" },
      { blank: true, correct: ["so"] },
      { text: "happy that you're here" },
      { blank: true, correct: ["that"] },
      { text: "we didn't sleep last night." },
    ],
  },
  {
    parts: [
      { text: "It was" },
      { blank: true, correct: ["such"] },
      { text: "a sad movie" },
      { blank: true, correct: ["that"] },
      { text: "Nancy cried all the way through it." },
    ],
  },
];

// نحسب كل الفراغات كـ flat list مع مرجع للسؤال والـ index
const BLANKS = [];
QUESTIONS.forEach((q, qi) => {
  let bi = 0;
  q.parts.forEach((p) => {
    if (p.blank) {
      BLANKS.push({ qi, bi: bi++ });
    }
  });
});
const TOTAL = BLANKS.length; // 8

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const GrammarC = () => {
  // answers[qi][bi] = string
  const [answers, setAnswers] = useState(
    QUESTIONS.map((q) => q.parts.filter((p) => p.blank).map(() => "")),
  );
  const [errors, setErrors] = useState(
    QUESTIONS.map((q) => q.parts.filter((p) => p.blank).map(() => null)),
  );
  const [locked, setLocked] = useState(false);

  const handleChange = (qi, bi, val) => {
    if (locked || errors[qi][bi] === false) return;
    if (errors[qi][bi] === true) {
      setErrors((prev) =>
        prev.map((row, r) =>
          r === qi ? row.map((e, b) => (b === bi ? null : e)) : row,
        ),
      );
    }
    setAnswers((prev) =>
      prev.map((row, r) =>
        r === qi ? row.map((a, b) => (b === bi ? val : a)) : row,
      ),
    );
  };

  const handleCheck = () => {
    if (locked) return;
    const allFilled = answers.every((row) => row.every((a) => a.trim()));
    if (!allFilled) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    const newErrors = QUESTIONS.map((q, qi) => {
      let bi = 0;
      return q.parts
        .filter((p) => p.blank)
        .map((p) => {
          const ok = p.correct.some(
            (c) => normalize(answers[qi][bi]) === normalize(c),
          );
          bi++;
          if (ok) correct++;
          return ok ? false : true;
        });
    });

    setErrors(newErrors);

    const total = TOTAL;
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
    setAnswers(
      QUESTIONS.map((q) =>
        q.parts.filter((p) => p.blank).map((p) => p.correct[0]),
      ),
    );
    setErrors(
      QUESTIONS.map((q) => q.parts.filter((p) => p.blank).map(() => false)),
    );
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(
      QUESTIONS.map((q) => q.parts.filter((p) => p.blank).map(() => "")),
    );
    setErrors(
      QUESTIONS.map((q) => q.parts.filter((p) => p.blank).map(() => null)),
    );
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "40px" }}>
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2">C</span>
          Write either <strong className="text-orange-500">so</strong>, <strong className="text-orange-500">such</strong>, or{" "}
          <strong className="text-orange-500">that</strong> for each blank.
        </h5>

        <div className="flex flex-col gap-10 text-[18px] mt-5">
          {QUESTIONS.map((q, qi) => {
            let blankIdx = 0;
            return (
              <div
                key={qi}
                className="flex items-center flex-wrap gap-x-1 gap-y-1"
              >
                <span className="font-bold shrink-0">{qi + 1}</span>
                {q.parts.map((part, pi) => {
                  if (!part.blank) {
                    return (
                      <span key={pi} className="shrink-0">
                        {part.text}
                      </span>
                    );
                  }
                  const bi = blankIdx++;
                  const hasError = errors[qi][bi] === true;
                  const isOk = errors[qi][bi] === false;
                  return (
                    <div
                      key={pi}
                      className="relative inline-block"
                      style={{ minWidth: "80px" }}
                    >
                      <input
                        value={answers[qi][bi]}
                        disabled={locked || isOk}
                        onChange={(e) => handleChange(qi, bi, e.target.value)}
                        style={{
                          width: "100%",
                          borderBottom: hasError
                            ? "2px solid #ef4444"
                            : "1px solid #555",
                          outline: "none",
                          background: "transparent",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "500",
                        //   color: isOk ? "#e53935" : undefined,
                          padding: "2px 4px",
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
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          handleStartAgain={handleReset}
          handleShowAnswer={handleShow}
          checkAnswers={handleCheck}
        />
      </div>
    </div>
  );
};

export default GrammarC;
