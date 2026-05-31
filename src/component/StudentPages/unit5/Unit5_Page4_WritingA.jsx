import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit4_Page6_SpeakingA = () => {
  const questions = [
    {
      lines: ["You are _______", "years old, aren't you?"],
      example: null,
    },
    {
      lines: ["You are a _______", "(career), aren't you?"],
      example: null,
    },
    {
      lines: ["At which university", "did you study?"],
      example: null,
    },
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const handleReset = () => setAnswers(["", "", ""]);

  const updateAnswer = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Pretend that you are interviewing the leader of your country. Rewrite
        each question to make it more interesting.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-6 text-[16px] bg-[#e1e9d1] p-6 rounded-[20px]">
        {questions.map((q, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* LEFT: number + question lines */}
            <div className="flex gap-2 min-w-[160px] max-w-[170px]">
              <span className="font-bold text-[18px]">{i + 1}</span>
              <div className="leading-6">
                {q.lines.map((line, li) => (
                  <div key={li}>{line}</div>
                ))}
              </div>
            </div>

            {/* ARROW */}
            <div className="flex items-center mt-2">
              <svg width="70" height="40" viewBox="0 0 38 18">
                <line
                  x1="0"
                  y1="9"
                  x2="28"
                  y2="9"
                  stroke="#f79631"
                  strokeWidth="5.5"
                />
                <polygon points="28,3 38,9 28,15" fill="#f79631" />
              </svg>
            </div>

            {/* RIGHT: answer box */}
            <div
              className="flex-1"
              style={{
                background: "#f4f9ec",
                border: "1.5px solid #b8dfa0",
                borderRadius: "8px",
                padding: "10px 14px",
                minHeight: "80px",
              }}
            >
              {q.example ? (
                /* Example shown in blue — not editable */
                <p
                  style={{
                    // color: "#2c78b4",
                    fontWeight: "500",
                    lineHeight: "1.6",
                    margin: 0,
                    fontSize: "15px",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {q.example}
                </p>
              ) : (
                /* Editable textarea */
                <textarea
                  value={answers[i]}
                  onChange={(e) => updateAnswer(i, e.target.value)}
                  rows={3}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    resize: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                    // color: "#6D2980",
                    lineHeight: "1.8",
                    fontFamily: "inherit",
                  }}
                  placeholder="Write your answer here..."
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center mt-8">
        <div className="relative group">
          <div
            onClick={handleReset}
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
      </div>
    </div>
  );
};

export default Unit4_Page6_SpeakingA;
