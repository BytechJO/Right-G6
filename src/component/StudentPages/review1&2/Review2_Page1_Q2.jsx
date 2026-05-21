import React, { useState } from "react";
import ActionButtons from "../../Button";
import snowboardImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/10.svg"; // غير المسار

const LINES = [
  { type: "fixed",  text: "Snowboards are out" },
  { type: "input",  letter: "N" },
  { type: "input",  letter: "O" },
  { type: "fixed",  text: "Wheee! Down we go!" },
  { type: "fixed",  text: "Be alert!" },
  { type: "fixed",  text: "Out in the snow!" },
  { type: "fixed",  text: "Act fast!" },
  { type: "input",  letter: "R" },
  { type: "input",  letter: "D" },
  { type: "input",  letter: "I" },
  { type: "input",  letter: "N" },
  { type: "fixed",  text: "Geronimo! (a word that is said as a jump or big action is done)" },
];

const inputLines = LINES.filter((l) => l.type === "input");

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
    setAnswers(Array(inputLines.length).fill(""));
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall">

        {/* العنوان */}
        <h5 className="header-title-page8 mb-7">
          <span className="mr-2">B</span>
          Make a special type of poem called an{" "}
          <span style={{ color: "#f79631", fontWeight: "bold"}}>acrostic poem</span>{" "}
          by putting words that describe{" "}
          <span style={{ color: "#f79631", fontWeight: "bold" }}>snowboarding</span>{" "}
          next to each letter. Use at least three vocabulary words or expressions found on page 10.
        </h5>

        {/* المحتوى */}
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>

          {/* الأسطر */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "18px", fontSize: "18px" }}>
            {mappedLines.map((line, i) => {
              if (line.type === "fixed") {
                return (
                  <div key={i} style={{ fontSize: "18px", color: "#333" }}>
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "16px" }}>
                    {line.letter}
                  </span>
                  <input
                    value={answers[line.idx]}
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
            alt="snowboarding"
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