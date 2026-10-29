import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

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
      <ActionButtons onReset={handleReset} />
      {/* 🔄 Reset Button */}
    </div>
  );
};

export default Unit4_Page4_WritingC;
