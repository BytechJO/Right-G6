import React, { useState } from "react";
import ActionButtons from "../../ActionButtons";

const WritingB = () => {
  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const handleInput = (questionIndex, inputIndex, value) => {
    const updated = [...answers];
    updated[questionIndex][inputIndex] = value;
    setAnswers(updated);
  };

  const reset = () => {
    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
    ]);
  };

  return (
    <div>
      <div className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">B</span>
        <div style={{ display: "block" }}>
          Write down several “<span className="text-[#F59E0B]">if</span>”
          statements about an impossible past condition and result. Use the
          correct verb tense.
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-10 text-[18px]">
        {[1, 2, 3].map((num, qIndex) => (
          <div key={qIndex} className="flex flex-wrap items-center gap-2">
            <span className="font-bold">{num}</span>

            <span>If</span>

            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                value={answers[qIndex][0]}
                onChange={(e) => handleInput(qIndex, 0, e.target.value)}
                className="w-full border-b border-gray-400 outline-none bg-transparent text-[17px] font-semibold py-1"
              />
            </div>

            <span>,</span>

            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                value={answers[qIndex][1]}
                onChange={(e) => handleInput(qIndex, 1, e.target.value)}
                className="w-full border-b border-gray-400 outline-none bg-transparent text-[17px] font-semibold py-1"
              />
            </div>

            <span>.</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-10">
        <ActionButtons onReset={reset} />
      </div>
    </div>
  );
};

export default WritingB;
