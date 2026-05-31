import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleChange = (i, val) => {
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
  };

  return (
    <div>
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">A</span>
        Choose one person in history whom you think has influenced many people
        with their words. Do some research and find out three famous things they
        have said.
      </h5>

      <div className="flex flex-col gap-8 mt-6">
        {answers.map((answer, i) => (
          <div key={i} className="relative">
            <input
              value={answer}
              onChange={(e) => handleChange(i, e.target.value)}
              style={{
                width: "100%",
                borderBottom: "1px solid #555",
                outline: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "500",
                padding: "2px 0",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div
          onClick={handleReset}
          className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
        >
          <div className="bg-white p-3 rounded-full shadow">
            <FaRedo size={14} className="text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingA;
