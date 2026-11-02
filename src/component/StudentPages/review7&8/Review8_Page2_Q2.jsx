import React, { useEffect, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
  unit8StudentAudioSequence,
} from "../unit8/Unit8StudentAudioText";

const Review8_Page2_Q2 = () => {
  const correctAnswers = [
    "Julia asked Tina what she wanted to buy.",
    "Tina said that she wanted a scoop of vanilla ice cream.",
    "Julia said she would like a piece of chocolate cake.",
    "Julia said that the chocolate cake was delicious, and she asked Tina to try some.",
    "Tina said that Julia was right, that it was very tasty and offered Julia some of her ice cream to try.",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!?'""]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (index, value) => {
    if (locked || result[index] === true) return;

    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((item) => !item.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((answer, index) => {
      const correct = normalize(answer) === normalize(correctAnswers[index]);

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
    setAnswers(correctAnswers);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit8StudentAudio();
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative block w-full">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        placeholder="Write the reported sentence"
        title="Change the quote to reported speech"
        aria-label={`Reported sentence ${index + 1}`}
        onChange={(e) => handleChange(index, e.target.value)}
        className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1
          ${result[index] === false ? "border-[#D1232A]" : ""}
        `}
        style={{
          borderBottomWidth: "1px",
        }}
      />

      {result[index] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-7 mb-10 w-full text-[18px]">
        <ExerciseHeaderReview
          sectionLetter="E"
          title="Read and change each quote to reported speech."
          subTitle="Identify exactly what must change, rewrite the complete correct form, and reread it to make sure the original meaning is preserved."
        />

        <div className="flex flex-col gap-2">
          <div>
            <div className="mb-2">
              <span className="font-bold mr-4">1</span>
              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 73 - Exercise E", "Item_001_")}
                ariaLabel="Play quote 1"
                flowText
              >
                Julie and Tina went to the café together. “What do you want to
                buy?” asked Julia.
              </Unit8StudentAudioText>
            </div>
          </div>

          <div>
            <div className="mb-2">
              <span className="font-bold mr-4">2</span>
              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 73 - Exercise E", "Item_002_")}
                ariaLabel="Play quote 2"
                flowText
              >
                “I would like a scoop of vanilla ice cream,” said Tina.
              </Unit8StudentAudioText>
            </div>
          </div>

          <div>
            <div className="mb-2">
              <span className="font-bold mr-4">3</span>
              <Unit8StudentAudioText
                src={unit8StudentAudioSequence("Page 73 - Exercise E", [
                  "Item_003_",
                  "Item_004_",
                ])}
                ariaLabel="Play quote 3"
                flowText
              >
                Julie said, “I will get a piece of chocolate cake.” The waiter
                came and placed their order. After five minutes, their order was
                ready.
              </Unit8StudentAudioText>
            </div>
          </div>

          <div>
            <div className="mb-2">
              <span className="font-bold mr-4">4</span>
              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 73 - Exercise E", "Item_005_")}
                ariaLabel="Play quote 4"
                flowText
              >
                “The chocolate cake tastes delicious! Try some, Tina,” offered
                Julia.
              </Unit8StudentAudioText>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <span className="font-bold mr-4">5</span>
              <Unit8StudentAudioText
                src={unit8StudentAudio("Page 73 - Exercise E", "Item_006_")}
                ariaLabel="Play quote 5"
                flowText
              >
                Tina tried the chocolate cake and said, “You’re right. It’s very
                tasty. Try some of my ice cream.”
              </Unit8StudentAudioText>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="mb-4 flex items-end gap-4">
            <span className="font-bold">1</span>
            {inputField(0)}
          </div>
          <div className="mb-4 flex items-end gap-4">
            <span className="font-bold">2</span>
            {inputField(1)}
          </div>
          <div className="mb-4 flex items-end gap-4">
            <span className="font-bold">3</span>
            {inputField(2)}
          </div>
          <div className="mb-4 flex items-end gap-4">
            <span className="font-bold">4</span>
            {inputField(3)}
          </div>
          <div className="mb-4 flex items-end gap-4">
            <span className="font-bold">5</span>
            {inputField(4)}
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

export default Review8_Page2_Q2;
