import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import sound from "../../../assets/audio/ClassBook/U8/PG 68/CD40.Pg68_Instructions_Adult Lady.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit8_Page5_Q3 = () => {
  const captions = [
    {
      start: 0.159,
      end: 1.759,
      text: "Page 66, grammar.",
    },
    {
      start: 2.099,
      end: 4.539,
      text: "Reported speech versus direct speech.",
    },
    {
      start: 5.159,
      end: 8.26,
      text: "Chris told me that he had gone to the mountains for vacation.",
    },
    {
      start: 8.699,
      end: 10.939,
      text: "Julie said that she likes to ride bikes a lot.",
    },
    {
      start: 11.239,
      end: 14.139,
      text: "You told us that you didn't want to go to the movies today.",
    },
    {
      start: 14.759,
      end: 16.94,
      text: "I said that I had gone to the concert yesterday.",
    },
  ];
  const correctAnswers = ["a", "b", "a", "a"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

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

    const hasEmpty = answers.some((item) => !item);

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
    setAnswers(["a", "b", "a", "a"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

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
          padding: "6px 12px",
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
            C
          </span>
          Tell it like it is. Listen to the passage and circle the reported
          speech or direct quote that correctly tells what was said.
        </div>
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={4.5}
        />
        <div className="flex flex-col gap-6">
          {/* 1 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-4 ">
              <span className="font-bold mt-2">1</span>

              {optionBox(0, "a", "There was no electricity at the school.")}
            </div>

            <div>
              {optionBox(
                0,
                "b",
                "There is no electricity at the school today.",
              )}
            </div>
          </div>

          {/* 2 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-4">
              <span className="font-bold mt-2">2</span>

              {optionBox(
                1,
                "a",
                "All the computer classes will go to the gym and do P.E.",
              )}
            </div>

            <div>
              {optionBox(
                1,
                "b",
                "All the computer classes went to the gym to do P.E.",
              )}
            </div>
          </div>

          {/* 3 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-4">
              <span className="font-bold mt-2">3</span>

              {optionBox(2, "a", "The lights came on just as school ended.")}
            </div>

            <div>
              {optionBox(2, "b", "The lights can come on just as school ends.")}
            </div>
          </div>

          {/* 4 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex gap-4">
              <span className="font-bold mt-2">4</span>

              {optionBox(
                3,
                "a",
                "The speaker is somewhat sad the school had trouble with the electricity but glad his friends got to have some fun.",
              )}
            </div>

            <div>
              {optionBox(
                3,
                "b",
                "The speaker is glad the school had trouble with the electricity but sad his friends got to have some fun.",
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

export default Unit8_Page5_Q3;
