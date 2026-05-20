import React, { useState } from "react";
import ActionButtons from "../../ActionButtons";
const WritingA = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleReset = () => setAnswers(["", "", "", ""]);

  const renderInput = (i) => (
    <div className="flex items-center gap-2 flex-1">
      <span className="font-bold text-[15px]">{i + 1}</span>
      <input
        value={answers[i]}
        onChange={(e) => {
          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);
        }}
        className="border-b border-black outline-none flex-1 text-[#6D2980] font-semibold bg-transparent"
      />
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-2 mb-7 mt-5">
        {/* Title */}
        <h5 className="header-title-page8-read mb-8">
          <span className="ex-A-read mr-2">A</span>
          What are some special celebrations that happen in your country? Write four of them here:
        </h5>

        {/* 2×2 Grid */}
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex gap-10">
            {renderInput(0)}
            {renderInput(1)}
          </div>
          <div className="flex gap-10">
            {renderInput(2)}
            {renderInput(3)}
          </div>
        </div>

        {/* Reset only */}
        <div className="flex justify-center mt-8">
          <ActionButtons
          onReset={handleReset}
         
        />
        </div>
      </div>
    </div>
  );
};

export default WritingA;