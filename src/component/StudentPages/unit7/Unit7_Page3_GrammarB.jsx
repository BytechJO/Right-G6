import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  {
    parts: ["If Bill", "(use) the wrong map, they", "(got) lost."],
    correct: ["had used", "might have gotten"],
  },
  {
    parts: ["If we", "(catch) the earlier bus, we", "(not be) late."],
    correct: ["had caught", "wouldn't have been"],
  },
  {
    parts: ["She", "(become) an astronaut if she", "(study) more."],
    correct: ["could have become", "had studied"],
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?;:'"‘’‚‛“”„‟`´\-()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const GrammarB = () => {
  const [answers, setAnswers] = useState(Array(6).fill(""));

  const [errors, setErrors] = useState(Array(6).fill(null));

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

    if (answers.includes("")) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    const correctAnswers = [
      "had used",
      "might have gotten",
      "had caught",
      "wouldn't have been",
      "could have become",
      "had studied",
    ];

    let correct = 0;

    const newErrors = answers.map((a, i) => {
      const acceptedAnswers = {
        3: [
          "wouldn't have been",
          "would not have been",
        ],
      };

      const ok = acceptedAnswers[i]
        ? acceptedAnswers[i].some((ans) => normalize(a) === normalize(ans))
        : normalize(a) === normalize(correctAnswers[i]);

      if (ok) correct++;

      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = correctAnswers.length;

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
    setAnswers([
      "had used",
      "might have gotten",
      "had caught",
      "wouldn't have been",
      "could have become",
      "had studied",
    ]);

    setErrors(Array(6).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(6).fill(""));
    setErrors(Array(6).fill(null));
    setLocked(false);
  };

  return (
    <div>
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">B</span>
        Fill in the correct verb form.
      </h5>

      <div className="flex flex-col gap-8 text-[18px] mt-5">
        {/* 1 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold">1</span>
          <span>If Bill</span>

          <InputField
            index={0}
            answers={answers}
            errors={errors}
            locked={locked}
            handleChange={handleChange}
          />

          (<span className="text-[#F28C28]">use</span>)
          <span>the wrong map, they</span>

          <InputField
            index={1}
            answers={answers}
            errors={errors}
            locked={locked}
            handleChange={handleChange}
          />

          (<span className="text-[#F28C28]">got</span>)
          <span>lost.</span>
        </div>

        {/* 2 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold">2</span>
          <span>If we</span>

          <InputField
            index={2}
            answers={answers}
            errors={errors}
            locked={locked}
            handleChange={handleChange}
          />

          (<span className="text-[#F28C28]">catch</span>)
          <span>the earlier bus, we</span>

          <InputField
            index={3}
            answers={answers}
            errors={errors}
            locked={locked}
            handleChange={handleChange}
          />

          (<span className="text-[#F28C28]">not be</span>)
          <span>late.</span>
        </div>

        {/* 3 */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold">3</span>
          <span>She</span>

          <InputField
            index={4}
            answers={answers}
            errors={errors}
            locked={locked}
            handleChange={handleChange}
          />

          (<span className="text-[#F28C28]">become</span>)
          <span>an astronaut if she</span>

          <InputField
            index={5}
            answers={answers}
            errors={errors}
            locked={locked}
            handleChange={handleChange}
          />

          (<span className="text-[#F28C28]">study</span>)
          <span>more.</span>
        </div>
      </div>

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

const InputField = ({ index, answers, errors, locked, handleChange }) => {
  const hasError = errors[index] === true;
  const isOk = errors[index] === false;

  return (
    <div
      className="relative"
      style={{
        width: "200px",
      }}
    >
      <input
        value={answers[index]}
        disabled={locked || isOk}
        onChange={(e) => handleChange(index, e.target.value)}
        style={{
          width: "100%",
          borderBottom: `${hasError ? "1px solid #ef4444" : "1px solid #555"}`,
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
            width: "20px",
            height: "20px",
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
};

export default GrammarB;
