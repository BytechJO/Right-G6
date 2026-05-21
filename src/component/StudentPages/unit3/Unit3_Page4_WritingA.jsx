import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const emptyState = {
    event: "",
    good: ["", "", ""],
    improve: ["", "", ""],
    results: "",
  };

  const [answers, setAnswers] = useState({ ...emptyState, good: ["", "", ""], improve: ["", "", ""] });

  const reset = () =>
    setAnswers({ event: "", good: ["", "", ""], improve: ["", "", ""], results: "" });

  const lineInput = (value, onChange, width = "100%") => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width,
        outline: "none",
        fontSize: "17px",
        // color: "#6D2980",
        background: "transparent",
        borderBottom: "1px solid #aaa",
        paddingBottom: "2px",
      }}
    />
  );

  const updateList = (key, i, val) => {
    const updated = [...answers[key]];
    updated[i] = val;
    setAnswers({ ...answers, [key]: updated });
  };

  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-6">
        <span className="ex-A-read mr-2">A</span>
        Choose an event to talk about that can be improved. Use the outline
        below to help you plan an essay like the one above.
      </h5>

      {/* The event */}
      <div className="flex items-center gap-3 mb-8 text-[17px]">
        <span className="font-semibold whitespace-nowrap">The event:</span>
        {lineInput(answers.event, (v) => setAnswers({ ...answers, event: v }), "300px")}
      </div>

      {/* Two-column table */}
      <div className="grid grid-cols-2 gap-x-10 mb-8 ml-4">
        {/* Headers */}
        <div className="text-center font-semibold text-[17px] mb-4">
          What Was Good
        </div>
        <div className="text-center font-semibold text-[17px] mb-4">
          What Needs Improvement
        </div>

        {/* 3 rows of inputs */}
        {[0, 1, 2].map((i) => (
          <React.Fragment key={i}>
            <div className="mb-5">
              {lineInput(answers.good[i], (v) => updateList("good", i, v))}
            </div>
            <div className="mb-5">
              {lineInput(answers.improve[i], (v) => updateList("improve", i, v))}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* The results of improving */}
      <div className="flex items-center gap-3 text-[17px] mb-8">
        <span className="font-semibold whitespace-nowrap">
          The results of improving:
        </span>
        {lineInput(
          answers.results,
          (v) => setAnswers({ ...answers, results: v }),
          "350px"
        )}
      </div>

      {/* Reset only */}
      <div className="flex justify-center mt-4">
        <div className="relative group">
          <div
            onClick={reset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} className="text-gray-700" />
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

export default WritingA;