import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingC = () => {
  const [text, setText] = useState("");

  const handleReset = () => {
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex flex-col gap-2 mb-7 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read mr-2">C</span>
          In your notebook, write an organized description of the festival you
          chose. Check your writing carefully for punctuation and grammar.{" "}
        </h5>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="student-unit1-answer-input w-full h-[120px] border border-gray-300 p-2 mt-3 outline-none resize-none"
          placeholder="Write your paragraph here..."
          title="Write your paragraph here"
        />

        {/* Reset Icon */}

        <div className="flex justify-center mt-4">
          <div
            onClick={handleReset}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!e.repeat) {
                  handleReset();
                }
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Reset activity"
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow pointer-events-none">
              <FaRedo size={14} className="text-gray-700" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingC;
