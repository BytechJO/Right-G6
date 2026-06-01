import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const questions = [
  { id: 1, label: "Who founded (started) the town:" },
  { id: 2, label: "What the town is like today:" },
  { id: 3, label: "When it was started:" },
  { id: 4, label: "Where your town is located:" },
  { id: 5, label: "How the townspeople used to live long ago:" },
];

const Unit6_Page3_GrammarB = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">B</span>
        Collect information about the history of your town or city.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-6 text-[18px] mt-10">
        {questions.map((q, index) => (
          <div key={q.id} className="flex items-center gap-3">
            <span className="font-bold shrink-0">{q.id}</span>
            <span className="shrink-0">{q.label}</span>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => updateAnswer(index, e.target.value)}
              className="border-b border-black outline-none text-black flex-1 font-semibold px-2 bg-transparent"
            />
          </div>
        ))}
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center mt-10">
        <div className="relative group">
          <div
            onClick={() => setAnswers(Array(questions.length).fill(""))}
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

export default Unit6_Page3_GrammarB;