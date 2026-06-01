import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit8_Page6_Q1 = () => {
  const correctAnswers = ["a", "b", "a"];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (questionIndex, value) => {
    if (locked || result[questionIndex] === true) return;

    const updated = [...answers];

    updated[questionIndex] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[questionIndex] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((answer) => !answer);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((answer, index) => {
      const correct = answer === correctAnswers[index];

      if (correct) correctCount++;

      return correct;
    });

    setResult(newResults);

    const total = correctAnswers.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(["a", "b", "a"]);

    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const optionBox = (questionIndex, option, text) => {
    const selected = answers[questionIndex] === option;

    const wrong = result[questionIndex] === false && selected;

    return (
      <div
        onClick={() => handleSelect(questionIndex, option)}
        className="relative cursor-pointer"
        style={{
          padding: "4px 10px",
          borderRadius: "999px",
          border: selected
            ? wrong
              ? "1px solid #D1232A"
              : "1px solid #84ad40"
            : "1px solid transparent",
          display: "inline-block",
        }}
      >
        <span className="font-bold mr-2">{option}</span>

        {text}

        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "20px",
              height: "20px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        <div className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          What do you think they really said? Each of the people below has
          misquoted what someone said. Circle the words that are probably what
          the person really said.
        </div>

        <div className="flex flex-col gap-6">
          {/* Question 1 */}
          <div>
            <div className="mb-2">
              <span className="font-bold mr-3">1</span>
              Joey tells his mom, "Hey, Dad said that I could put off doing my
              homework tonight!"
            </div>

            <div className="ml-8 mb-2">
              {optionBox(
                0,
                "a",
                `"You can put off doing your homework tonight until after dinner, and then you need to get right to work, Joey," said Dad.`,
              )}
            </div>

            <div className="ml-8">
              {optionBox(
                0,
                "b",
                `"It's okay, you don't have to do your homework tonight," said Dad.`,
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <div className="mb-2">
              <span className="font-bold mr-3">2</span>
              "Guess what!" Jane tells her older sister. "Mom said we could have
              all the ice cream we want tonight!"
            </div>

            <div className="ml-8 mb-2">
              {optionBox(
                1,
                "a",
                `Mom said, "You can go to the store and buy and eat as much ice cream as you want."`,
              )}
            </div>

            <div className="ml-8">
              {optionBox(
                1,
                "b",
                `Mom said, "You can have all the ice cream that is left in the container if you want it."`,
              )}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <div className="mb-2">
              <span className="font-bold mr-3">3</span>
              "My mom said I don't have to be nice to you," bragged the
              troublesome boy to the babysitter.
            </div>

            <div className="ml-8 mb-2">
              {optionBox(
                2,
                "a",
                `"You don't have to be nice to the babysitter," said Mom, "but you do have to accept the punishment when we come home if you're not nice to her. You know we expect you to behave the same way you do as when we're home."`,
              )}
            </div>

            <div className="ml-8 mb-10">
              {optionBox(
                2,
                "b",
                `Mom said, "You don't have to be nice to the babysitter."`,
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit8_Page6_Q1;
