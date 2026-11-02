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
    before: "If Sharon",
    middle: "she",
    initial: ["went to the store first", "would have everything she needs"],
    options: [
      ["called her grandparents", "would know they want her to visit"],
      ["typed the letter", "would e-mail it right away"],
      ["saw the show", "would like it"],
    ],
  },
  {
    before: "If I",
    middle: "I",
    initial: ["knew how they made it", "would tell you"],
    options: [
      ["were rich", "would buy everyone a car"],
      ["found your computer", "would bring it to you"],
      ["rode a horse everywhere", "would not need my bike"],
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
    setAnnouncement(
      `${question.before} ${option[0]}, ${question.middle} ${option[1]}.`,
    );
  };

  return (
    <div data-unit3-scope="grammar-a">
      <style>{`
        [data-unit3-scope="grammar-a"] [data-choice]:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
      `}</style>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read, change, and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {questions.map((question, questionIndex) => {
        const selected = selectedOptions[questionIndex];
        return (
          <div key={questionIndex} className={questionIndex === 0 ? "mb-12" : ""}>
            <div className="flex items-start gap-5 mt-7">
              <img
                src={img}
                alt=""
                style={{ width: "40px", height: "40px", marginTop: -6 }}
              />

              <div>
                <p className={`text-[18px]${questionIndex === 0 ? " ml-2.5" : ""}`}>
                  {question.before}{" "}
                  <span className="text-[#f79631]">{selected[0]}</span>, {question.middle}{" "}
                  <span className="text-[#f79631]">{selected[1]}</span>.
                </p>

                <div className={`grid grid-cols-3 gap-10 mt-5 text-[17px]${questionIndex === 0 ? " ml-2.5" : ""}`}>
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selected[0] === option[0] && selected[1] === option[1];
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
          </div>
        );
      })}
    </div>
  );
};

export default GrammarA;
