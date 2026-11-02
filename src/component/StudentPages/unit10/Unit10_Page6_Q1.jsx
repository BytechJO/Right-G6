import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "./Unit10StudentAudioText";

const audioFolder = "Page 87 - Exercise D";
const preferenceHeaders = ["I love", "I like", "I don’t mind", "I dislike"];
const activities = [
  "cooking",
  "cleaning",
  "teaching",
  "writing",
  "playing sports",
  "helping others",
  "drawing",
  "sewing",
  "talking",
  "listening",
  "doing math",
  "fixing computers",
  "building",
  "selling",
  "running",
  "traveling",
  "doing science",
  "taking care of others",
];

const Unit10_Page6_Q1 = () => {
  const [answers, setAnswers] = useState({
    love: ["", "", "", ""],
    like: ["", "", "", ""],
    dontMind: ["", "", "", ""],
    dislike: ["", "", "", ""],
  });

  const handleChange = (section, index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers({
      love: ["", "", "", ""],
      like: ["", "", "", ""],
      dontMind: ["", "", "", ""],
      dislike: ["", "", "", ""],
    });
  };

  const inputField = (section, index) => (
    <input
      type="text"
      value={answers[section][index]}
      placeholder="Write here..."
      title={`${preferenceHeaders[["love", "like", "dontMind", "dislike"].indexOf(section)]}, row ${index + 1}`}
      aria-label={`${preferenceHeaders[["love", "like", "dontMind", "dislike"].indexOf(section)]}, row ${index + 1}`}
      onChange={(e) => handleChange(section, index, e.target.value)}
      className="
        w-full
        h-full
        outline-none
        bg-transparent
        text-[18px]
        text-black
        font-semibold
        px-2
        text-center
         placeholder:text-gray-300
         placeholder:text-[15px]
      placeholder:font-normal

      "
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="D"
          title="Complete the chart to show what you love, like, do not mind, and dislike doing."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Sort each activity by your own preference: love, like,
                do not mind, or dislike.
              </span>
              <span style={{ display: "block" }}>
                Task 2: Review the chart so the same activity is not
                accidentally entered in conflicting columns.
              </span>
            </>
          }
        />

        {/* TABLE */}
        <div className="mb-10">
          {/* HEADERS */}
          <div className="grid grid-cols-4 border border-[#9CCB5B]">
            {preferenceHeaders.map((title, i) => (
              <div
                key={i}
                className="
                  border-r
                  last:border-r-0
                  border-[#9CCB5B]
                  h-[55px]
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-[18px]
                  text-[#7DA63C]
                "
              >
                <Unit10StudentAudioText
                  src={unit10StudentAudio(
                    audioFolder,
                    String(i + 1).padStart(3, "0"),
                  )}
                  ariaLabel={`Play ${title}`}
                  flowText
                >
                  {title}
                </Unit10StudentAudioText>
              </div>
            ))}
          </div>

          {/* ROWS */}
          {[0, 1, 2, 3].map((row) => (
            <div
              key={row}
              className="grid grid-cols-4 border-x border-b border-[#9CCB5B]"
            >
              <div className="h-[50px] border-r border-[#9CCB5B]">
                {inputField("love", row)}
              </div>

              <div className="h-[50px] border-r border-[#9CCB5B]">
                {inputField("like", row)}
              </div>

              <div className="h-[50px] border-r border-[#9CCB5B]">
                {inputField("dontMind", row)}
              </div>

              <div className="h-[50px]">{inputField("dislike", row)}</div>
            </div>
          ))}
        </div>

        {/* WORD BANK */}
        <div
          className="
  rounded-[17px]
  px-15
  py-6
  grid
  grid-cols-6
  gap-y-6
  text-[17px]
  whitespace-nowrap
  mb-6
"
          style={{
            background: "#E2E9D1",
          }}
        >
          {activities.map((activity, index) => (
            <Unit10StudentAudioText
              key={activity}
              src={unit10StudentAudio(
                audioFolder,
                String(index + 5).padStart(3, "0"),
              )}
              ariaLabel={`Play ${activity}`}
              flowText
            >
              {activity}
            </Unit10StudentAudioText>
          ))}
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

export default Unit10_Page6_Q1;
