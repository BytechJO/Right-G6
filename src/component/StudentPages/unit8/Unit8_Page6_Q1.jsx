import React, { useEffect, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
  unit8StudentAudioSequence,
} from "./Unit8StudentAudioText";

const Unit8_Page6_Q1 = () => {
  const correctAnswers = ["a", "b", "a"];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

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
    stopUnit8StudentAudio();
    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const optionBox = (questionIndex, option, text, audioPrefixes) => {
    const selected = answers[questionIndex] === option;

    const wrong = result[questionIndex] === false && selected;

    return (
      <div
        onClick={() => handleSelect(questionIndex, option)}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          handleSelect(questionIndex, option);
        }}
        role="button"
        tabIndex={locked || result[questionIndex] === true ? -1 : 0}
        aria-disabled={locked || result[questionIndex] === true}
        aria-pressed={selected}
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

        <Unit8StudentAudioText
          src={unit8StudentAudioSequence("Page 69 - Exercise D", audioPrefixes)}
          ariaLabel={`Play option ${option}`}
          flowText
          focusable={false}
        >
          {text}
        </Unit8StudentAudioText>

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
      <div className="div-forall gap-7 text-[18px] w-full">
        <ExerciseHeader
          sectionLetter="D"
          title="Read each misquote and select the words that are probably what the person really said."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Read the reported statement and both possible original
                quotes.
              </span>{" "}
              <span style={{ display: "block" }}>
                Task 2: Select the quote that best preserves the speaker’s
                likely meaning.
              </span>
            </>
          }
        />

        <div className="flex flex-col gap-3">
          {/* Question 1 */}
          <div>
            <div className="mb-2">
              <span className="font-bold mr-3">1</span>
              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 69 - Exercise D", "Item_001_")}
                ariaLabel="Play statement 1"
                flowText
              >
                Joey tells his mom, "Hey, Dad said that I could put off doing my
                homework tonight!"
              </Unit8StudentAudioText>
            </div>

            <div className="ml-8 mb-2">
              {optionBox(
                0,
                "a",
                `"You can put off doing your homework tonight until after dinner, and then you need to get right to work, Joey," said Dad.`,
                ["Item_002_", "Item_003_"],
              )}
            </div>

            <div className="ml-8">
              {optionBox(
                0,
                "b",
                `"It's okay, you don't have to do your homework tonight," said Dad.`,
                ["Item_004_"],
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <div className="mb-2">
              <span className="font-bold mr-3">2</span>
              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 69 - Exercise D", "Item_005_")}
                ariaLabel="Play statement 2"
                flowText
              >
                "Guess what!" Jane tells her older sister. "Mom said we could
                have all the ice cream we want tonight!"
              </Unit8StudentAudioText>
            </div>

            <div className="ml-8 mb-2">
              {optionBox(
                1,
                "a",
                `Mom said, "You can go to the store and buy and eat as much ice cream as you want."`,
                ["Item_006_"],
              )}
            </div>

            <div className="ml-8">
              {optionBox(
                1,
                "b",
                `Mom said, "You can have all the ice cream that is left in the container if you want it."`,
                ["Item_007_"],
              )}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <div className="mb-2">
              <span className="font-bold mr-3">3</span>
              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 69 - Exercise D", "Item_008_")}
                ariaLabel="Play statement 3"
                flowText
              >
                "My mom said I don't have to be nice to you," bragged the
                troublesome boy to the babysitter.
              </Unit8StudentAudioText>
            </div>

            <div className="ml-8 mb-2">
              {optionBox(
                2,
                "a",
                `"You don't have to be nice to the babysitter," said Mom, "but you do have to accept the punishment when we come home if you're not nice to her. You know we expect you to behave the same way you do as when we're home."`,
                ["Item_009_", "Item_010_"],
              )}
            </div>

            <div className="ml-8 mb-10">
              {optionBox(
                2,
                "b",
                `Mom said, "You don't have to be nice to the babysitter."`,
                ["Item_011_"],
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
