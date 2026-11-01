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

const questions = [
  {
    before: "Our family has been",
    initial: "saving for a vacation",
    after: ".",
    options: [
      "working in the garden this week",
      "hiking in the mountains",
      "cleaning the house today",
    ],
  },
  {
    before: "Have you been",
    initial: "waiting very long",
    after: "?",
    options: [
      "shopping for groceries yet",
      "studying for your math test today",
      "talking with Grandmother",
    ],
  },
];

const GrammarA = () => {
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
    setAnnouncement(`${question.before} ${option}${question.after}`);
  };

  return (
    <div data-unit9-scope="grammar-a">
      <style>{`
        [data-unit9-scope="grammar-a"] [data-choice]:focus-visible {
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
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read, change, and say. Replace the highlighted words with the new
          words.
        </h5>
      </div>

      <div className="space-y-12">
        {questions.map((question, questionIndex) => {
          const selected = selectedOptions[questionIndex];

          return (
            <div key={question.before} className="flex items-start gap-5 mt-7">
              <img
                src={img}
                alt=""
                style={{ width: "40px", height: "40px", marginTop: -6 }}
              />

              <div>
                <p className="text-[18px]">
                  {question.before}{" "}
                  <span className="text-[#f79631] font-medium">
                    {selected}
                  </span>
                  {question.after}
                </p>

                <div className="grid grid-cols-2 gap-y-10 gap-x-20 mt-5 text-[17px] w-[650px]">
                  {question.options.map((option, optionIndex) => (
                    <span
                      key={option}
                      role="button"
                      tabIndex={0}
                      data-choice
                      aria-label={`Use ${option} in example ${questionIndex + 1}`}
                      aria-pressed={selected === option}
                      {...activationKeys}
                      onClick={() => chooseOption(questionIndex, option)}
                      style={{ cursor: "pointer" }}
                    >
                      <b>{optionIndex + 1}</b> {option}
                    </span>
                  ))}
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
