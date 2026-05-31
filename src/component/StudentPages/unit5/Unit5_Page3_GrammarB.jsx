import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit4_Page5_GrammarB = () => {
  const questions = [
    {
      text: "The famous soccer player makes three goals per game,",
      correct: ["does not he?", "doesn't he?","doesn’t he?"],
    },
    {
      text: "The famous soccer player has made three goals per game,",
      correct: ["has not he?", "hasn't he?","hasn’t he?"],
    },
    {
      text: "The famous soccer player doesn't make three goals per game,",
      correct: ["does he?", "does he?"],
    },
    {
      text: "The famous soccer player didn't make three goals per game,",
      correct: ["did he?", "did he?"],
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]); // true | false | undefined

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
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
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = questions[i].correct.some(
        (c) => c.toLowerCase() === a.trim().toLowerCase()
      );
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);
    const msg = `Score: ${correctCount} / ${questions.length}`;

    if (correctCount === questions.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.correct[0]));
    setLocked(true);
    setResult(questions.map(() => true));
  };

  const reset = () => {
    setAnswers(["", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Add the correct question tag and punctuation for each statement.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-7 text-[17px]">
        {questions.map((q, i) => (
          <div key={i} className="flex items-end gap-3">
            {/* Number */}
            <span className="font-bold text-[17px] min-w-[20px]">{i + 1}</span>

            {/* Statement + Input */}
            <div className="flex items-end gap-2 flex-1 flex-wrap">
              <span>{q.text}</span>

              <div className="relative">
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder=""
                  style={{
                    borderBottom: `1px solid ${
                      result[i] === false
                        ? "#ef4444"
                        : result[i] === true
                        ? "black"
                        : "black"
                    }`,
                    textAlign:"center",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "16px",
                    fontWeight: "600",
                    
                    width: "160px",
                    padding: "2px 4px",
                  }}
                />

                {/* ✕ badge */}
                {result[i] === false && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
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
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)", pointerEvents: "none",
                      zIndex: 3,
                    }}
                  >
                    ✕
                  </span>
                )}

                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={reset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <div
            onClick={showAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={checkAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit4_Page5_GrammarB;