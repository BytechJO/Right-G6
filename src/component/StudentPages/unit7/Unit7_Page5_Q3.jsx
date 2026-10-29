import React, { useRef, useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import passageAudio from "../../../assets/audio/ClassBook/U7/PG 62/CD35.Pg62_Instruction1_Adult Lady.mp3";

const Unit7_Page5_Q3 = () => {
  const audioRef = useRef(null);
  const [answers, setAnswers] = useState([["", "", ""], "", "", ""]);

  const handleFirstQuestionChange = (blankIndex, value) => {
    const updated = [...answers];

    updated[0][blankIndex] = value;

    setAnswers(updated);
  };

  const handleChange = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    audioRef.current?.pause();
    setAnswers([["", "", ""], "", "", ""]);
  };

  const inputField = (value, onChange, width, ariaLabel) => (
    <input
      className="unit7-exercise-input border-0 border-b outline-none bg-transparent text-[18px] text-black font-semibold px-1"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your answer"
      title="Write what Gloria thought Jack should have done differently"
      aria-label={ariaLabel}
      style={{
        width,
        borderBottomWidth: "1px",
      }}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px]">
        <div>
          <ExerciseHeader
            sectionLetter="C"
            title="Listen to the passage, and then write about four things that Gloria thought Jack should have done differently."
          />
        </div>

        <QuestionAudioPlayer
          ref={audioRef}
          src={passageAudio}
          pageId="Unit7_Page5_Q3"
        />

        <div className="flex flex-col gap-[7vh]">
          {/* Question 1 */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold mr-4">1</span>

              <span>If Jack hadn’t</span>

              {inputField(
                answers[0][0],
                (value) => handleFirstQuestionChange(0, value),
                "220px",
                "First part of answer 1",
              )}

              <span>,</span>

              {inputField(
                answers[0][1],
                (value) => handleFirstQuestionChange(1, value),
                "220px",
                "Second part of answer 1",
              )}

              <span>wouldn’t have</span>

              {inputField(
                answers[0][2],
                (value) => handleFirstQuestionChange(2, value),
                "220px",
                "Third part of answer 1",
              )}

              <span className="mt-5">about the party.</span>
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <div className="flex items-center">
              <span className="font-bold mr-4">2</span>

              {inputField(
                answers[1],
                (value) => handleChange(1, value),
                "100%",
                "Answer 2",
              )}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <div className="flex items-center">
              <span className="font-bold mr-4">3</span>

              {inputField(
                answers[2],
                (value) => handleChange(2, value),
                "100%",
                "Answer 3",
              )}
            </div>
          </div>

          {/* Question 4 */}
          <div>
            <div className="flex items-center">
              <span className="font-bold mr-4">4</span>

              {inputField(
                answers[3],
                (value) => handleChange(3, value),
                "100%",
                "Answer 4",
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Unit7_Page5_Q3;
