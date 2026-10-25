import React, { useState } from "react";
import Rabbit from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 7.svg";

const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    event.stopPropagation();

    if (!event.repeat) {
      event.currentTarget.click();
    }
  },

  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const GrammarA = () => {
  const [selectedOptions, setSelectedOptions] = useState([
    "have gone to",
    "has run",
  ]);

  const [announcement, setAnnouncement] = useState("");

  const questions = [
    {
      before: "We",
      after: "the mountains.",
      initial: "have gone to",
      options: [
        "have hiked in",
        "have seen",
        "have traveled to",
        "have climbed",
      ],
    },

    {
      before: "Emily",
      after: "the race.",
      initial: "has run",
      options: ["hasn't lost", "has finished", "has won", "has watched"],
    },
  ];

  const chooseOption = (questionIndex, option) => {
    setSelectedOptions((previous) =>
      previous.map((value, index) =>
        index === questionIndex ? option : value,
      ),
    );

    const question = questions[questionIndex];

    setAnnouncement(`${question.before} ${option} ${question.after}`);
  };

  return (
    <div data-unit1-scope="grammar-a">
      <style>
        {`
          [data-unit1-scope="grammar-a"] [data-choice]:focus-visible {
            outline: 4px solid #2563eb;
            outline-offset: 3px;
            border-radius: 6px;
          }
        `}
      </style>

      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

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
              style={{
                height: "34px",
                width: "34px",
              }}
              className="w-[34px] h-[34px] mt-[-2px]"
            />

            {/* Content */}
            <div>
              {/* Sentence */}
              <p className="text-[18px] leading-[1.8]">
                {q.before}{" "}
                <span className="text-[#F28C28]">{selectedOptions[index]}</span>{" "}
                {q.after}
              </p>

              {/* Options */}
              <div className="grid grid-cols-4 gap-8 mt-3 text-[17px]">
                {q.options.map((option, i) => {
                  const isSelected = selectedOptions[index] === option;

                  return (
                    <span
                      key={i}
                      role="button"
                      tabIndex={0}
                      data-choice
                      aria-label={`Use ${option} in example ${index + 1}`}
                      aria-pressed={isSelected}
                      {...activationKeys}
                      onClick={() => chooseOption(index, option)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <b>{i + 1}</b>
                      &nbsp;&nbsp;
                      {option}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarA;
