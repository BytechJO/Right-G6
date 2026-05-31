import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  {
    text: "representing ideas with drawings and pictures",
    correct: ["creating art and music"],
  },
  {
    text: "wanting to learn about different cultures",
    correct: ["Social sciences and languages"],
  },
  {
    text: "being others-centered, not self-centered",
    correct: ["Servicing & Caring for Others"],
  },
];

const normalize = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[?.!,]/g, "")
    .replace(/[’']/g, "");
};

const Unit10_Page2_ComprehensionA = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const [errors, setErrors] = useState(Array(QUESTIONS.length).fill(null));

  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;

    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }

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
      const ok = QUESTIONS[i].correct.some(
        (c) => normalize(a) === normalize(c),
      );

      if (ok) correct++;

      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = QUESTIONS.length;

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
    setAnswers(QUESTIONS.map((q) => q.correct[0]));
    setErrors(Array(QUESTIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div>
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">A</span>
        For each characteristic, write the career heading it goes with. If more
        than one heading is possible, choose just one to write down.
      </h5>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[18px]">
          <thead>
            <tr>
              <th className="border border-[#93B94F] bg-[#E2E9D1] p-3 text-center font-normal text-[#87AC40]">
                Characteristic
              </th>

              <th className="border border-[#93B94F] bg-[#E2E9D1] p-3 text-center font-normal text-[#87AC40]">
                Career Area
              </th>
            </tr>
          </thead>

          <tbody>
            {QUESTIONS.map((q, i) => {
              const hasError = errors[i] === true;
              const isOk = errors[i] === false;

              return (
                <tr key={i}>
                  <td className="border border-[#93B94F] p-3">{q.text}</td>

                  <td className="border border-[#93B94F] p-3">
                    <div
                      className="relative mx-auto"
                      style={{
                        minWidth: "180px",
                        maxWidth: "320px",
                      }}
                    >
                      <input
                        value={answers[i]}
                        disabled={locked || isOk}
                        onChange={(e) => handleChange(i, e.target.value)}
                        style={{
                          width: "100%",
                          borderBottom: `${
                            hasError ? "1px solid  #ef4444" : "1px solid  #555"
                          }`,
                          outline: "none",
                          textAlign: "center",
                          background: "transparent",
                          fontSize: "18px",
                          fontWeight: "500",
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit10_Page2_ComprehensionA;
