import React, { useState } from "react";

const Unit10_Page6_Q1 = () => {
  const [answers, setAnswers] = useState({
    love: ["", "", "", ""],
    like: ["", "", "", ""],
    dontMind: ["", "", "", ""],
    dislike: ["", "", "", ""],
  });

  const handleChange = (section, index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleReset = () => {
    setAnswers({
      love: ["", "", "", ""],
      like: ["", "", "", ""],
      dontMind: ["", "", "", ""],
      dislike: ["", "", "", ""],
    });
  };

  const inputField = (section, index) => (
    <input
      type="text"
      value={answers[section][index]}
      placeholder="Write here..."
      onChange={(e) => handleChange(section, index, e.target.value)}
      className="
        w-full
        h-full
        outline-none
        bg-transparent
        text-[18px]
        text-black
        font-semibold
        px-2
        text-center
         placeholder:text-gray-300
         placeholder:text-[15px]
      placeholder:font-normal

      "
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          What about you? What do you like to do? Complete the chart to find out
          about yourself and what your likes and dislikes are. A list of
          possible words for the chart is listed underneath to help you.
        </h5>

        {/* TABLE */}
        <div className="mb-10">
          {/* HEADERS */}
          <div className="grid grid-cols-4 border border-[#9CCB5B]">
            {["I love", "I like", "I don’t mind", "I dislike"].map(
              (title, i) => (
                <div
                  key={i}
                  className="
                  border-r
                  last:border-r-0
                  border-[#9CCB5B]
                  h-[55px]
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-[18px]
                  text-[#7DA63C]
                "
                >
                  {title}
                </div>
              ),
            )}
          </div>

          {/* ROWS */}
          {[0, 1, 2, 3].map((row) => (
            <div
              key={row}
              className="grid grid-cols-4 border-x border-b border-[#9CCB5B]"
            >
              <div className="h-[50px] border-r border-[#9CCB5B]">
                {inputField("love", row)}
              </div>

              <div className="h-[50px] border-r border-[#9CCB5B]">
                {inputField("like", row)}
              </div>

              <div className="h-[50px] border-r border-[#9CCB5B]">
                {inputField("dontMind", row)}
              </div>

              <div className="h-[50px]">{inputField("dislike", row)}</div>
            </div>
          ))}
        </div>

        {/* WORD BANK */}
        <div
          className="
  rounded-[17px]
  px-15
  py-6
  grid
  grid-cols-6
  gap-y-6
  text-[17px]
  whitespace-nowrap
  mb-6
"
          style={{
            background: "#E2E9D1",
          }}
        >
          <span>cooking</span>
          <span>cleaning</span>
          <span>teaching</span>
          <span>writing</span>
          <span>playing sports</span>
          <span>helping others</span>

          <span>drawing</span>
          <span>sewing</span>
          <span>talking</span>
          <span>listening</span>
          <span>doing math</span>
          <span>fixing computers</span>

          <span>building</span>
          <span>selling</span>
          <span>running</span>
          <span>traveling</span>
          <span>doing science</span>
          <span>taking care of others</span>
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

export default Unit10_Page6_Q1;
