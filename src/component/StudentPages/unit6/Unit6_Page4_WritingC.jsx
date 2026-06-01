import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit4_Page4_WritingC = () => {
  const [text, setText] = useState("");

  // 🔄 reset داخلي
  const handleReset = () => {
    setText("");
  };

  return (
    <div className="space-y-4 w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">C</span> In your notebook, write a
        short history of your town. Include the facts from above. Use proper
        punctuation and use the words used to at least three times.
      </h5>

      {/* textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[120px] border border-gray-300 p-2 outline-none mt-10"
        placeholder="Write your paragraph here..."
      />

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-4">
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

export default Unit4_Page4_WritingC;
