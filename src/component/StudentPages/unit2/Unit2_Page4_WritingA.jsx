import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  { label: "The funniest time I can remember:" },
  { label: "The time I was the most scared:" },
  { label: "The most unusual person I know:" },
];

const WritingA = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const handleChange = (i, val) => {
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
  };

  return (
    <div className="space-y-8 w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <div className="header-title-page8-read leading-7">
        <span className="ex-A-read mr-2">A</span>
        <div>
        Write a short description about each of the following items. Use{" "}
        <span className="text-[#55c271] font-bold">so</span> and{" "}
        <span className="text-[#e07b39] font-bold">such</span> in your
        descriptions.</div>
      </div>

      <div className="flex flex-col gap-8 mt-5 text-[18px]">
        {QUESTIONS.map((q, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* السؤال */}
            <div className="flex items-start gap-2">
              <span className="font-bold shrink-0">{i + 1}</span>
              <span>{q.label}</span>
            </div>

            {/* سطرين للكتابة */}
            <input
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full border-b border-black outline-none bg-transparent text-[18px]"
            />
           
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mt-6">
        <ActionButtons onReset={handleReset} />
      </div>
    </div>
  );
};

export default WritingA;
