import React, { useState } from "react";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 7.svg";

const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const GrammarA = () => {
  const questions = [
    {
      before: "Mandy is so",
      middle: "that she is",
      initial: ["excited", "jumping up and down"],
      options: [
        ["bored", "falling asleep"],
        ["late", "running to catch the bus"],
        ["happy", "smiling and laughing"],
      ],
      columns: 3,
    },
    {
      before: "They are such",
      middle: "that they",
      initial: ["expert painters", "painted the President's house"],
      options: [
        ["fast readers", "read one book a day"],
        ["careful workers", "checked their work three times"],
        ["quick runners", "each won their races"],
        ["good students", "got A's on their tests"],
      ],
      columns: 2,
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    questions.map((question) => question.initial),
  );
  const [announcement, setAnnouncement] = useState("");

  const chooseOption = (questionIndex, option) => {
    setSelectedOptions((previous) =>
      previous.map((value, index) =>
        index === questionIndex ? option : value,
      ),
    );

    const question = questions[questionIndex];
    setAnnouncement(
      `${question.before} ${option[0]} ${question.middle} ${option[1]}.`,
    );
  };

  return (
    <div data-unit2-scope="grammar-a">
      <style>{`
        [data-unit2-scope="grammar-a"] [data-choice]:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
      `}</style>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>A</span>
          Read, change, and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      <div className="flex flex-col gap-12">
        {questions.map((question, questionIndex) => {
          const selected = selectedOptions[questionIndex];

          return (
            <div key={questionIndex} className="flex items-start gap-5 mt-7">
              <img
                src={img}
                alt=""
                style={{ width: "40px", height: "40px", marginTop: -6 }}
              />

              <div>
                <p className="text-[18px]">
                  {question.before}{" "}
                  <span className="text-[#f79631] font-medium">{selected[0]}</span>{" "}
                  {question.middle}{" "}
                  <span className="text-[#f79631] font-medium">{selected[1]}</span>.
                </p>

                <div
                  className="grid gap-10 mt-5 text-[17px]"
                  style={{ gridTemplateColumns: `repeat(${question.columns}, minmax(0, 1fr))` }}
                >
                  {question.options.map((option, optionIndex) => {
                    const isSelected =
                      selected[0] === option[0] && selected[1] === option[1];

                    return (
                      <span
                        key={optionIndex}
                        role="button"
                        tabIndex={0}
                        data-choice
                        aria-label={`Use ${option[0]}, ${option[1]} in example ${questionIndex + 1}`}
                        aria-pressed={isSelected}
                        {...activationKeys}
                        onClick={() => chooseOption(questionIndex, option)}
                        style={{ cursor: "pointer" }}
                      >
                        <b>{optionIndex + 1}</b>&nbsp;&nbsp;
                        {option[0]}, {option[1]}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GrammarA;
