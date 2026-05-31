import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit10_Page6_Q2 = () => {
  const questions = [
    "living",
    "typing",
    "setting",
    "knitting",
    "creating",
    "putting",
    "writing",
    "cutting",
    "driving",
    "swimming",
    "letting",
    "riding",
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
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
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

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
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
      "living",
      "typing",
      "setting",
      "knitting",
      "creating",
      "putting",
      "writing",
      "cutting",
      "driving",
      "swimming",
      "letting",
      "riding",
    ]);

    setResult([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block w-full">
      <input
        type="text"
        placeholder="Write here..."
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
          h-full
          outline-none
          bg-transparent
          text-[18px]
          text-center
          text-black
          font-semibold
          px-2
       placeholder:text-gray-300
         placeholder:text-[15px]
         placeholder:font-normal
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
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Sometimes when <span style={{ color: "#E97E1D" }}>–ing</span> is added
          to a verb, spelling changes need to occur. Read the examples, and then
          finish the chart by writing the{" "}
          <span style={{ color: "#E97E1D" }}>–ing</span> verbs correctly.
        </h5>

        <div
          className="rounded-[18px] px-6 py-5 mb-10 text-[18px]"
          style={{
            background: "#DDE3C8",
          }}
        >
          {/* ROW 1 */}
          <div className="flex items-center gap-8 mb-5">
            <span className="w-[120px] shrink-0">Silent e:</span>

            <div className="flex items-center gap-2">
              <span>make</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>making</span>
            </div>

            <div className="flex items-center gap-2">
              <span>bake</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>baking</span>
            </div>

            <div className="flex items-center gap-2">
              <span>give</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>giving</span>
            </div>

            <div className="flex items-center gap-2">
              <span>care</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>caring</span>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex items-center gap-8">
            <span className="w-[120px] shrink-0">CVC words:</span>

            <div className="flex items-center gap-2">
              <span>hop</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>hopping</span>
            </div>

            <div className="flex items-center gap-2">
              <span>tap</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>tapping</span>
            </div>

            <div className="flex items-center gap-2">
              <span>win</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>winning</span>
            </div>

            <div className="flex items-center gap-2">
              <span>run</span>
              <span style={{ color: "#E97E1D" }}>➜</span>
              <span>running</span>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="border border-[#9CCB5B] mb-10">
          {[
            ["live", 0, "write", 6],
            ["type", 1, "cut", 7],
            ["set", 2, "drive", 8],
            ["knit", 3, "swim", 9],
            ["create", 4, "let", 10],
            ["put", 5, "ride", 11],
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4">
              {/* LEFT WORD */}
              <div
                className="
                  h-[55px]
                  border-r
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                  text-[18px]
                "
              >
                {row[0]}
              </div>

              {/* LEFT ANSWER */}
              <div
                className="
                  h-[55px]
                  border-r
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                "
              >
                {inputField(row[1])}
              </div>

              {/* RIGHT WORD */}
              <div
                className="
                  h-[55px]
                  border-r
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                  text-[18px]
                "
              >
                {row[2]}
              </div>

              {/* RIGHT ANSWER */}
              <div
                className="
                  h-[55px]
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                "
              >
                {inputField(row[3])}
              </div>
            </div>
          ))}
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

export default Unit10_Page6_Q2;
