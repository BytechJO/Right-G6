import React, { useState } from "react";

const Review10_Page2_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);

  const handleChange = (i, value) => {
    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);
  };

  const inputField = (i) => (
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
      <div className="div-forall w-full text-[20px]">
        {/* TITLE */}
        <div className="header-title-page8 mb-[15vh]">
          <span className="mr-4">F</span>
          Write three sentences, each one using the word given as a gerund.
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-25">
          {/* 1 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">1</span>

           (<span style={{ color: "#E97E1D" }}>cooking</span>)

            <div className="flex-1">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">2</span>

            (<span style={{ color: "#E97E1D" }}>running</span>)

            <div className="flex-1">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">3</span>

            (<span style={{ color: "#E97E1D" }}>reading</span>)

            <div className="flex-1">{inputField(2)}</div>
          </div>
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

export default Review10_Page2_Q3;
