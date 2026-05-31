import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit4_Page4_WritingB = () => {
  const [text, setText] = useState("");

  // 🔄 reset داخلي
  const handleReset = () => {
    setText("");
  };

  return (
    <div className="space-y-4 w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">B</span>
        Choose a person that you would like to interview. Research the person
        and find out as much as you can about them. Take notes about what they
        do, where they live, their family, and so on. Then use the notes you
        made to make at least eight interview questions. Have at least three
        question tags. Write the questions in your notebook.
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

export default Unit4_Page4_WritingB;
