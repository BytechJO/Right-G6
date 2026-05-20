import React from "react";
import Rabbit from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 7.svg";

const GrammarA = () => {
  // ✅ Dynamic Data
  const questions = [
    {
      sentence: (
        <>
          We <span className="text-[#F28C28]">have gone to</span> the mountains.
        </>
      ),

      options: [
        "have hiked in",
        "have seen",
        "have traveled to",
        "have climbed",
      ],
    },

    {
      sentence: (
        <>
          Emily <span className="text-[#F28C28]">has run</span> the race.
        </>
      ),

      options: ["hasn't lost", "has finished", "has won", "has watched"],
    },
  ];

  return (
    <div>
      {/* Title */}
      <div className="flex items-center gap-2 mb-7 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read, change, and say. Replace the highlighted words with the new
          words.
        </h5>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-10">
        {questions.map((q, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Rabbit */}
            <img
              src={Rabbit}
              alt=""
              style={{ height: "34px", width: "34px" }}
              className="w-[34px] h-[34px] mt-[-2px]"
            />

            {/* Content */}
            <div>
              {/* Sentence */}
              <p className="text-[18px] leading-[1.8]">{q.sentence}</p>

              {/* Options */}
              <div className="grid grid-cols-4 gap-8 mt-3 text-[17px]">
                {q.options.map((option, i) => (
                  <span key={i}>
                    <b>{i + 1}</b>&nbsp;&nbsp;{option}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarA;
