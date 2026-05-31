import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U10/PG 86/CD50.Pg86_Instruction_Adult Lady.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit10_Page5_Q3 = () => {
  const questions = ["false", "false", "true", "false", "true"];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);
  const captions = [
    {
      start: 0.199,
      end: 4.099,
      text: "Page 86. Grammar. Using gerunds.",
    },

    {
      start: 5.099,
      end: 6.92,
      text: "Stella likes climbing on rocks.",
    },

    {
      start: 7.859,
      end: 9.86,
      text: "Does Stella like climbing on rocks?",
    },

    {
      start: 10.659,
      end: 13.879,
      text: "Your brothers prefer riding dirt bikes.",
    },

    {
      start: 13.92,
      end: 16.5,
      text: "Do your brothers prefer riding dirt bikes?",
    },
  ];

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
    setAnswers(["False", "False", "True", "False", "True"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

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
          border
          outline-none
          bg-transparent
          text-[18px]
          text-center
          text-[#E97E1D]
          font-semibold
          px-2
          py-1
          rounded-[20px]

         border-[#86A83E]
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
        <h5 className="header-title-page8 mb-10 flex items-center">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          After listening to the passage, write{" "}
          <span
            style={{
              color: "#E97E1D",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            true
          </span>
          or
          <span
            style={{
              color: "#E97E1D",
              marginLeft: "5px",
            }}
          >
            false
          </span>
          for each statement.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={9.5}
        />
        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {[
            "Sarah enjoys cooking.",
            "Dora doesn’t like building things.",
            "Tim prefers doing math and building things.",
            "Paul hates being active.",
            "Jonathan doesn’t mind painting.",
          ].map((question, i) => (
            <div key={i} className="flex items-center justify-between gap-10">
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                <span className="font-bold text-[18px] w-5">{i + 1}</span>

                <span className="text-[18px]">{question}</span>
              </div>

              {/* INPUT */}
              <div>{inputField(i, "w-[180px]")}</div>
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

export default Unit10_Page5_Q3;
