import React, { useState } from "react";

const Review9_Page1_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const handleChange = (i, value) => {
    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);
  };

  const inputField = (i, width) => (
    <input
      type="text"
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      className={`
        ${width}
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-black
        font-semibold
        px-1
      `}
      style={{
        borderBottomWidth: "1px",
      }}
    />
  );

  const lineField = (i) => (
    <input
      type="text"
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      className="
        w-full
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-black
        px-1
      "
      style={{
        borderBottomWidth: "1px",
      }}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px]">
        {/* TITLE */}
        <div className="header-title-page8 mb-[12vh]">
          <span className=" mr-4">C</span>
          Use the expressions below, in sentences.
        </div>

        {/* QUESTION 1 */}
        <div className="flex flex-col gap-4 mb-15 ">
          <div className="flex items-center gap-5 mb-4">
            <span className="font-bold">1</span>

            {inputField(0, "w-[340px]")}

            <span className="font-bold">in no time.</span>
          </div>

          <div className="ml-5 mb-4">{lineField(1)}</div>

          <div className="ml-5">{lineField(2)}</div>
        </div>

        {/* QUESTION 2 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5 mb-4">
            <span className="font-bold">2</span>

            <span className="font-bold">What are your plans</span>

            {inputField(3, "w-[220px]")}

            <span className="font-bold">?</span>
          </div>

          <div className="ml-5 mb-4">{lineField(4)}</div>

          <div className="ml-5">{lineField(5)}</div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Review9_Page1_Q3;
