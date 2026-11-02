import React, { useEffect, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
  unit8StudentAudioSequence,
} from "../unit8/Unit8StudentAudioText";

const vocabularyAudioPrefix = {
  previously: "Item_001_",
  silly: "Item_002_",
  advice: "Item_003_",
  background: "Item_004_",
  stencils: "Item_005_",
  flatter: "Item_006_",
  aware: "Item_007_",
};

const sentenceRows = [
  {
    answer: "background",
    before: "The picture had a blue",
    after: "behind it.",
    beforeAudio: ["Item_008_"],
    afterAudio: ["Item_009_"],
  },
  {
    answer: "flatter",
    before: "My friends always",
    after: "me by saying nice things about me.",
    beforeAudio: ["Item_010_"],
    afterAudio: ["Item_011_"],
  },
  {
    answer: "aware",
    before: "I was not",
    after: "that we should bring our textbook with us to school today.",
    beforeAudio: ["Item_013_"],
    afterAudio: ["Item_012_"],
  },
  {
    answer: "silly",
    before: "Susan was acting",
    after: "today. She kept on laughing and making funny faces.",
    beforeAudio: ["Item_014_"],
    afterAudio: ["Item_015_"],
  },
  {
    answer: "advice",
    before: "My teacher always gives me",
    after: "on how to do well in school.",
    beforeAudio: ["Item_016_"],
    afterAudio: ["Item_017_"],
  },
  {
    answer: "previously",
    before: "We have",
    after: "spoken to each other on the phone. Today, we will meet for the first time.",
    beforeAudio: ["Item_018_"],
    afterAudio: ["Item_019_", "Item_020_"],
  },
  {
    answer: "stencils",
    before: "The painter used",
    after: "to make nice star shapes on the wall.",
    beforeAudio: ["Item_021_"],
    afterAudio: ["Item_022_"],
  },
];

const Review7_Page1_Q1 = () => {
  const questions = sentenceRows.map((sentence) => sentence.answer);

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  useEffect(() => () => stopUnit8StudentAudio(), []);

  const normalize = (str) => str.toLowerCase().trim();

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
      const correct = normalize(answer) === normalize(questions[index]);

      if (correct) correctCount++;

      return correct;
    });

    setResult(newResults);

    const total = questions.length;

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
    setAnswers([
      "background",
      "flatter",
      "aware",
      "silly",
      "advice",
      "previously",
      "stencils",
    ]);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit8StudentAudio();
    setAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (index) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        placeholder="vocabulary word"
        title="Type the correct vocabulary word"
        aria-label={`Vocabulary answer ${index + 1}`}
        onChange={(e) => handleChange(index, e.target.value)}
        className={`
          w-[220px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1
          text-center
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
      <div className="div-forall w-full gap-5 text-[18px]">
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Finish each sentence with the correct vocabulary word."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        {/* WORD BANK */}
        <div className="flex justify-center ">
          <div
            className="rounded-[18px] px-8 py-4 flex gap-12 flex-wrap justify-center"
            style={{
              background: "#DDE3C8",
            }}
          >
            {[
              "previously",
              "silly",
              "aware",
              "advice",
              "background",
              "stencils",
              "flatter",
            ].map((word) => (
              <Unit8StudentAudioText
                key={word}
                src={unit8StudentAudio(
                  "Page 70 - Exercise A",
                  vocabularyAudioPrefix[word],
                )}
                ariaLabel={`Play ${word}`}
              >
                {word}
              </Unit8StudentAudioText>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[3vh]">
          {sentenceRows.map((sentence, index) => {
            const folder = "Page 70 - Exercise A";
            const fullAudio = unit8StudentAudioSequence(folder, [
              ...sentence.beforeAudio,
              vocabularyAudioPrefix[sentence.answer],
              ...sentence.afterAudio,
            ]);

            return (
              <div key={sentence.answer}>
                <span className="font-bold mr-4">{index + 1}</span>
                {result[index] === true ? (
                  <Unit8StudentAudioText
                    src={fullAudio}
                    ariaLabel={`Play complete sentence ${index + 1}`}
                    flowText
                  >
                    {sentence.before}{" "}
                    <span
                      className="inline-block w-[220px] text-center text-[18px] text-black font-semibold px-1"
                      style={{ borderBottom: "1px solid #84ad40" }}
                    >
                      {sentence.answer}
                    </span>{" "}
                    {sentence.after}
                  </Unit8StudentAudioText>
                ) : (
                  <>
                    <Unit8StudentAudioText
                      src={unit8StudentAudioSequence(
                        folder,
                        sentence.beforeAudio,
                      )}
                      ariaLabel={`Play sentence ${index + 1} beginning`}
                      flowText
                    >
                      {sentence.before}
                    </Unit8StudentAudioText>{" "}
                    {inputField(index)}{" "}
                    <Unit8StudentAudioText
                      src={unit8StudentAudioSequence(
                        folder,
                        sentence.afterAudio,
                      )}
                      ariaLabel={`Play sentence ${index + 1} ending`}
                      flowText
                    >
                      {sentence.after}
                    </Unit8StudentAudioText>
                  </>
                )}
              </div>
            );
          })}
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

export default Review7_Page1_Q1;
