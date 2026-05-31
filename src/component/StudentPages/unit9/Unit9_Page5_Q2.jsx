import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import falseImg from "../../../assets/imgs/false.svg";

const Unit9_Page5_Q2 = () => {
  const questions = [
    {
      status: "false",
      correction: "in no time",
    },

    {
      status: "false",
      correction: "You only have (3) more to go.",
    },

    {
      status: "true",
      correction: "",
    },

    {
      status: "false",
      correction: "I have been dying to",
    },

    {
      status: "true",
      correction: "",
    },
  ];

  const sentences = [
    <>... in every time</>,

    <>You only have (3) less to go.</>,

    <>Too bad!</>,

    <>I have been crying to ...</>,

    <>What are your plans ...?</>,
  ];

  const [marks, setMarks] = useState(["", "", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleMark = (i, value) => {
    if (locked || result[i]?.mark === true) return;

    const updatedMarks = [...marks];

    updatedMarks[i] = value;

    setMarks(updatedMarks);

    if (value === "true") {
      const updatedAnswers = [...answers];

      updatedAnswers[i] = "";

      setAnswers(updatedAnswers);
    }

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleChange = (i, value) => {
    if (locked || result[i]?.row === true || marks[i] === "true") return;

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

    const hasEmptyMark = marks.some((m) => !m);

    if (hasEmptyMark) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    const hasMissingCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasMissingCorrection) {
      ValidationAlert.info(
        "Please write the correct expression for ✕ answers.",
      );

      return;
    }

    let correctCount = 0;

    const newResults = marks.map((mark, i) => {
      const markOk = mark === questions[i].status;

      const correctionOk =
        mark === "true"
          ? true
          : normalize(answers[i]) === normalize(questions[i].correction);

      const rowOk = markOk && correctionOk;

      if (rowOk) correctCount++;

      return {
        mark: markOk,
        correction: correctionOk,
        row: rowOk,
      };
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
    setMarks(["false", "false", "true", "false", "true"]);

    setAnswers([
      "in no time",
      "You only have (3) more to go.",
      "",
      "I have been dying to",
      "",
    ]);

    setResult([
      {
        mark: true,
        correction: true,
        row: true,
      },
      {
        mark: true,
        correction: true,
        row: true,
      },
      {
        mark: true,
        correction: true,
        row: true,
      },
      {
        mark: true,
        correction: true,
        row: true,
      },
      {
        mark: true,
        correction: true,
        row: true,
      },
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    setMarks(["", "", "", "", ""]);

    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const markBox = (i, value, img) => {
    const active = marks[i] === value;

    const showError =
      result[i]?.mark === false &&
      ((value === "true" && marks[i] === "true") ||
        (value === "false" && marks[i] === "false"));

    return (
      <button
        type="button"
        disabled={locked || result[i]?.mark === true}
        onClick={() => handleMark(i, value)}
        className="relative flex items-center  justify-center"
        style={{
          width: "34px",
          height: "34px",
          border: "1.5px solid #7DBA3C",
          borderRadius: "6px",
          background: "transparent",
          cursor: locked || result[i]?.mark === true ? "default" : "pointer",
        }}
      >
        {active && (
          <img
            src={img}
            alt={value}
            style={{
              width: "22px",
              height: "22px",
              position: "relative",
              zIndex: 2,
            }}
          />
        )}

        {showError && (
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
      </button>
    );
  };

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        type="text"
        value={answers[i]}
        placeholder={marks[i] === "false" ? "Write the correct expression" : ""}
        disabled={locked || result[i]?.row === true || marks[i] === "true"}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          text-center
          font-semibold
          px-1

          ${
            result[i]?.correction === false && marks[i] === "false"
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
        style={{
          borderBottomWidth: "1px",
        }}
      />

      {result[i]?.correction === false && marks[i] === "false" && (
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
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        <div className="header-title-page8 mb-[10vh]">
          <span className="ex-A mr-2">B</span>
          Read the expressions and write{" "}
          <span className="text-[#D1252B]">✓</span> or{" "}
          <span className="text-[#D1252B]">✗</span>. Correct the expressions
          that are incorrect.
        </div>

        <div className="flex flex-col gap-10">
          {sentences.map((sentence, index) => (
            <div key={index}>
              <div className="flex items-center gap-5 w-full">
                <span className="font-bold w-5">{index + 1}</span>

                <div className="flex items-center gap-2 ">
                  {markBox(index, "true", trueImg)}

                  {markBox(index, "false", falseImg)}
                </div>

                <div className="min-w-[260px]">{sentence}</div>

                <div className="flex-1">{inputField(index)}</div>
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

export default Unit9_Page5_Q2;
