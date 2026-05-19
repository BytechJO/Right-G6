import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit8_Page5_Q2 = () => {
  const questions = [
    "anything",
    "something",
    "anyone",
    "nobody",
    "anyone",
    "somebody",
    "someone",
    "everyone",
    "anything",
    "nothing",
  ];

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers([
      "anything",
      "something",
      "anyone",
      "nobody",
      "anyone",
      "somebody",
      "someone",
      "everyone",
      "anything",
      "nothing",
    ]);

    setResult([true, true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          leading-none
          align-middle
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-12">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Use the correct indefinite pronouns to ask and answer the questions.
        </h5>

        {/* QUESTIONS */}
        <div className="text-[18px] leading-[3.3] flex flex-col gap-6">
          <div>
            <span className="font-bold mr-4">1</span>
            Did you see {inputField(0, "w-[140px]")} from the hot-air balloon?
            Yes, I saw {inputField(1, "w-[150px]")}.
          </div>

          <div>
            <span className="font-bold mr-4">2</span>
            Will {inputField(2, "w-[160px]")} come to the store today? No,{" "}
            {inputField(3, "w-[160px]")} will come. We’re closed.
          </div>

          <div>
            <span className="font-bold mr-4">3</span>
            Does {inputField(4, "w-[160px]")} have a pencil I could use? Yes,{" "}
            {inputField(5, "w-[170px]")} has one.
          </div>

          <div>
            <span className="font-bold mr-4">4</span>
            Can {inputField(6, "w-[170px]")} please help me carry these boxes?
            Of course, {inputField(7, "w-[170px]")} will help.
          </div>

          <div>
            <span className="font-bold mr-4">5</span>
            Is there {inputField(8, "w-[170px]")} in the fridge to eat? No,
            there’s {inputField(9, "w-[170px]")} to eat, but we can go to the
            store.
          </div>
        </div>
      </div>

      {/* BUTTONS */}
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

export default Unit8_Page5_Q2;
