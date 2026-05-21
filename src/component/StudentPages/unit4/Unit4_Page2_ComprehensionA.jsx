import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit_ComprehensionA = () => {
  const [answers, setAnswers] = useState(["", "", ""]);

  const handleReset = () => {
    setAnswers(["", "", ""]);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Name three things that can be done to make a building{" "}
        <span className="font-bold">"green."</span>
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-8 text-[18px] mt-10">
        {answers.map((ans, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="font-bold w-6 text-right">{i + 1}</span>
            <input
              type="text"
              value={ans}
              onChange={(e) => {
                const updated = [...answers];
                updated[i] = e.target.value;
                setAnswers(updated);
              }}
              className="border-b border-black outline-none flex-1 text-[18px] font-semibold"
            />
          </div>
        ))}
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center gap-6 mt-10">
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

export default Unit_ComprehensionA;