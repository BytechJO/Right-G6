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
    initial: "are helped",
    options: ["are guided", "are taught", "are chosen", "are driven"],
  },
  {
    initial: "Is, ridden",
    options: ["Is, brushed", "Is, walked", "Is, seen", "Is, fed"],
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

    if (questionIndex === 0) {
      setAnnouncement(`The students ${option} by the teacher.`);
      return;
    }

    const [questionWord, verb] = option.split(", ");
    setAnnouncement(`${questionWord} the horse ${verb} by Marcia?`);
  };

  return (
    <div data-unit4-scope="grammar-a">
      <style>{`
        [data-unit4-scope="grammar-a"] [data-choice]:focus-visible {
          outline: 4px solid #2563eb;
          outline-offset: 3px;
          border-radius: 6px;
        }
      `}</style>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read, change, and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-10">
        {questions.map((q, i) => {
          const selected = selectedOptions[i];
          const [questionWord, verb] = selected.split(", ");

          return (
          <div key={i} className="flex items-start gap-5 mt-7">
            <img
              src={img}
              alt=""
              style={{ width: "40px", height: "40px", marginTop: -6 }}
            />
            <div>
              {/* SENTENCE */}
              <p className="text-[18px] font-semibold">
                {i === 0 ? (
                  <>
                    The students <span className="text-[#f79631]">{selected}</span> by the teacher.
                  </>
                ) : (
                  <>
                    {questionWord} the horse <span className="text-[#f79631]">{verb}</span> by Marcia?
                  </>
                )}
              </p>

              {/* OPTIONS */}
              <div className="flex flex-wrap gap-x-10 gap-y-2 mt-4 text-[17px]">
                {q.options.map((opt, j) => {
                  const isSelected = selected === opt;

                  return (
                    <span
                      key={j}
                      role="button"
                      tabIndex={0}
                      data-choice
                      aria-label={`Use ${opt} in example ${i + 1}`}
                      aria-pressed={isSelected}
                      {...activationKeys}
                      onClick={() => chooseOption(i, opt)}
                      style={{ cursor: "pointer" }}
                    >
                      <b>{j + 1}</b> {opt}
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
