import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import ActionButtons from "../../Button";
import snowboardImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/10.svg"; // غير المسار
import Unit2AudioText, {
  stopUnit2Audio,
  unit2Audio,
} from "../unit2/Unit2AudioText";

const LINES = [
  { type: "fixed", text: "Snowboards are out" },
  { type: "input", letter: "N" },
  { type: "input", letter: "O" },
  { type: "fixed", text: "Wheee! Down we go!" },
  { type: "fixed", text: "Be alert!" },
  { type: "fixed", text: "Out in the snow!" },
  { type: "fixed", text: "Act fast!" },
  { type: "input", letter: "R" },
  { type: "input", letter: "D" },
  { type: "input", letter: "I" },
  { type: "input", letter: "N" },
  {
    type: "fixed",
    text: "Geronimo! (a word that is said as a jump or big action is done)",
  },
];

const inputLines = LINES.filter((l) => l.type === "input");
const FIXED_AUDIO_INDEX = {
  "Snowboards are out": 1,
  "Wheee! Down we go!": 2,
  "Be alert!": 3,
  "Out in the snow!": 4,
  "Act fast!": 5,
};

const Review2_Page1_Q2 = () => {
  const [answers, setAnswers] = useState(Array(inputLines.length).fill(""));

  let inputCounter = -1;
  const mappedLines = LINES.map((l) => {
    if (l.type === "fixed") return l;
    inputCounter++;
    return { ...l, idx: inputCounter };
  });

  const handleChange = (idx, val) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? val : a)));
  };

  const handleReset = () => {
    stopUnit2Audio();
    setAnswers(Array(inputLines.length).fill(""));
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall">
        {/* العنوان */}
        <ExerciseHeaderReview
          sectionLetter="B"
          title={
            <>
              Make an{" "}
              <span style={{ color: "#f79631", fontWeight: "bold" }}>
                acrostic poem
              </span>{" "}
              about{" "}
              <span style={{ color: "#f79631", fontWeight: "bold" }}>
                snowboarding
              </span>{" "}
              using vocabulary words and expressions.
            </>
          }
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Use the letters in SNOWBOARDING as the structure for the
                poem.{" "}
              </span>
              <span style={{ display: "block" }}>
                Task 2: Choose vocabulary words or expressions that meaningfully
                connect to snowboarding.
              </span>
            </>
          }
        />

        {/* المحتوى */}
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
          {/* الأسطر */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              fontSize: "18px",
            }}
          >
            {mappedLines.map((line, i) => {
              if (line.type === "fixed") {
                return (
                  <div key={i} style={{ fontSize: "18px", color: "#333" }}>
                    <Unit2AudioText
                      src={
                        FIXED_AUDIO_INDEX[line.text]
                          ? unit2Audio(
                              "Page 18 - Exercise B",
                              `Item_${String(FIXED_AUDIO_INDEX[line.text]).padStart(3, "0")}_`,
                            )
                          : null
                      }
                      ariaLabel={`Play ${line.text}`}
                    >
                      {line.text}
                    </Unit2AudioText>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      minWidth: "16px",
                    }}
                  >
                    {line.letter}
                  </span>
                  <input
                    value={answers[line.idx]}
                    placeholder="Type a word or phrase"
                    title={`Type a word or phrase beginning with ${line.letter}`}
                    className="review-unit2-answer-input"
                    onChange={(e) => handleChange(line.idx, e.target.value)}
                    style={{
                      flex: 1,
                      borderBottom: "1px solid #555",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "18px",
                      padding: "2px 4px",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* الصورة */}
          <img
            src={snowboardImg}
            alt="A snowboarder riding down a snowy slope"
            style={{
              width: "200px",
              height: "240px",
              objectFit: "contain",
              borderRadius: "8px",
              marginTop: "80px",
            }}
          />
        </div>

        {/* زر Reset فقط */}
        <div className="flex justify-center mt-8">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review2_Page1_Q2;
