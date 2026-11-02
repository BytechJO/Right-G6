import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";

const audioFolder = "Page 88 - Exercise C";

const Review9_Page1_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const handleChange = (i, value) => {
    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", "", "", ""]);
  };

  const inputField = (i, width) => (
    <input
      type="text"
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      placeholder="Complete the sentence"
      title={`Sentence field ${i + 1}`}
      aria-label={`Sentence field ${i + 1}`}
      className={`
        ${width}
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-black
        font-semibold
        px-1
      `}
      style={{
        borderBottomWidth: "1px",
      }}
    />
  );

  const lineField = (i) => (
    <input
      type="text"
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      placeholder="Continue your sentence"
      title={`Sentence field ${i + 1}`}
      aria-label={`Sentence field ${i + 1}`}
      className="
        w-full
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-black
        px-1
      "
      style={{
        borderBottomWidth: "1px",
      }}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px] gap-10">
        <ExerciseHeaderReview
          sectionLetter="C"
          title="Use the expressions below in sentences."
          subTitle="Use the prompt, picture, or grammar pattern to write a complete response, then reread it for meaning, form, and punctuation."
        />

        {/* QUESTION 1 */}
        <div className="flex flex-col gap-4 mb-15 ">
          <div className="flex items-center gap-5 mb-4">
            <span className="font-bold">1</span>

            {inputField(0, "w-[340px]")}

            <span className="font-bold">
              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "001")}
                ariaLabel="Play in no time"
                flowText
              >
                in no time.
              </Unit10StudentAudioText>
            </span>
          </div>

          <div className="ml-5 mb-4">{lineField(1)}</div>

          <div className="ml-5">{lineField(2)}</div>
        </div>

        {/* QUESTION 2 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5 mb-4">
            <span className="font-bold">2</span>

            <span className="font-bold">
              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "002")}
                ariaLabel="Play What are your plans"
                flowText
              >
                What are your plans
              </Unit10StudentAudioText>
            </span>

            {inputField(3, "w-[220px]")}

            <span className="font-bold">?</span>
          </div>

          <div className="ml-5 mb-4">{lineField(4)}</div>

          <div className="ml-5">{lineField(5)}</div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Review9_Page1_Q3;
