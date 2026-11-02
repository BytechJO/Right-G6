import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";

const audioFolder = "Page 91 - Exercise F";
const words = ["cooking", "running", "reading"];

const Review10_Page2_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);

  const handleChange = (i, value) => {
    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", ""]);
  };

  const inputField = (i) => (
    <input
      type="text"
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      placeholder="Write a sentence"
      title={`Sentence ${i + 1}: use ${words[i]} as a gerund`}
      aria-label={`Sentence ${i + 1}: use ${words[i]} as a gerund`}
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
      <div className="div-forall w-full text-[20px] gap-20">
        <ExerciseHeaderReview
          sectionLetter="F"
          title="Write three sentences, each using the given word as a gerund."
          subTitle="Use the prompt, picture, or grammar pattern to write a complete response, then reread it for meaning, form, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-25">
          {/* 1 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">1</span>(
            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "001")}
              flowText
            >
              <span style={{ color: "#E97E1D" }}>cooking</span>
            </Unit10StudentAudioText>
            )<div className="flex-1">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">2</span>(
            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "002")}
              flowText
            >
              <span style={{ color: "#E97E1D" }}>running</span>
            </Unit10StudentAudioText>
            )<div className="flex-1">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3">
            <span className="font-bold w-5">3</span>(
            <Unit10StudentAudioText
              src={unit10StudentAudio(audioFolder, "003")}
              flowText
            >
              <span style={{ color: "#E97E1D" }}>reading</span>
            </Unit10StudentAudioText>
            )<div className="flex-1">{inputField(2)}</div>
          </div>
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

export default Review10_Page2_Q3;
