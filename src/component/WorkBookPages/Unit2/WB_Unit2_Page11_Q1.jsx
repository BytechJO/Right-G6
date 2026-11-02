import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2WorkbookAudioText, {
  stopWorkbookUnit2Audio,
  workbookUnit2Audio,
} from "./Unit2WorkbookAudioText";

const adjectives = [
  "modern",
  "rapid",
  "sweet",
  "melted",
  "wooden",
  "bumpy",
  "freezing",
  "damp",
  "cozy",
  "creepy",
  "pleasant",
  "noisy",
  "brave",
  "peaceful",
  "risky",
  "delightful",
  "lively",
  "melodic",
  "nervous",
  "brave",
  "thankful",
  "terrifying",
  "comfortable",
  "thrilling",
];

const nouns = [
  "coach",
  "grade",
  "hobby",
  "kite",
  "furniture",
  "language",
  "idea",
  "picture",
  "ocean",
  "landscape",
  "squirrel",
  "friend",
  "career",
  "skateboard",
  "novel",
  "musical",
  "movie",
  "vacation",
  "roller coaster",
  "sports car",
  "house",
  "experience",
  "snowboarding",
];

const EXAMPLE =
  "We had such a delightful vacation that I wished it could have been a year long!";

const adjectiveAudioIndexes = [
  3, 4, 13, 5, 44, 6, 14, 45, 21, 15, 46, 22, 24, 47, 25, 48, 26, 49, 40, 34, 33,
  38, 35, 42,
];
const nounAudioIndexes = [
  7, 8, 9, 10, 11, 12, 16, 20, 23, 17, 18, 19, 31, 27, 28, 29, 32, 30, 36, 39,
  37, 41, 43,
];

const WB_Unit2_Page11_C = () => {
  const init = () => ["", "", "", ""];
  const [answers, setAnswers] = useState(init);

  const handleChange = (i, value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[i] = value;
      return updated;
    });
  };

  const handleReset = () => {
    stopWorkbookUnit2Audio();
    setAnswers(init());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="C"
          title={
            <>
              Use adjectives and nouns to make sentences with{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                so ... that
              </span>{" "}
              and{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                such ... that
              </span>
              .
            </>
          }
          subTitle="Choose an adjective/noun combination first, then build a complete so ... that or such ... that sentence around it."
        />
        {/* Word Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #84ad40",
            marginBottom: "2%",
            fontSize: "16px",
            marginTop: "2%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "2px solid #84ad40",
                  padding: "10px 16px",
                  textAlign: "center",
                }}
              >
                <Unit2WorkbookAudioText
                  src={workbookUnit2Audio("Page 11 - Exercise C", "Item_001_")}
                  ariaLabel="Play Adjectives"
                >
                  Adjectives
                </Unit2WorkbookAudioText>
              </th>
              <th
                style={{
                  border: "2px solid #84ad40",
                  padding: "10px 16px",
                  textAlign: "center",
                }}
              >
                <Unit2WorkbookAudioText
                  src={workbookUnit2Audio("Page 11 - Exercise C", "Item_002_")}
                  ariaLabel="Play Nouns"
                >
                  Nouns
                </Unit2WorkbookAudioText>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "2px solid #84ad40",
                  padding: "12px 16px",
                  verticalAlign: "top",
                }}
              >
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}
                >
                  {adjectives.map((w, i) => (
                    <Unit2WorkbookAudioText
                      key={i}
                      src={workbookUnit2Audio(
                        "Page 11 - Exercise C",
                        `Item_${String(adjectiveAudioIndexes[i]).padStart(3, "0")}_`,
                      )}
                      ariaLabel={`Play ${w}`}
                    >
                      {w}
                    </Unit2WorkbookAudioText>
                  ))}
                </div>
              </td>
              <td
                style={{
                  border: "1.5px solid #84ad40",
                  padding: "12px 16px",
                  verticalAlign: "top",
                }}
              >
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}
                >
                  {nouns.map((w, i) => (
                    <Unit2WorkbookAudioText
                      key={i}
                      src={workbookUnit2Audio(
                        "Page 11 - Exercise C",
                        `Item_${String(nounAudioIndexes[i]).padStart(3, "0")}_`,
                      )}
                      ariaLabel={`Play ${w}`}
                    >
                      {w}
                    </Unit2WorkbookAudioText>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Sentences */}
        <div className="flex flex-col gap-8 mb-10" style={{ fontSize: "18px" }}>
          {/* Q2, Q3, Q4 */}
          {[1, 2, 3, 4].map((num, i) => (
            <div key={num} className="flex items-start gap-3">
              <span className="font-bold" style={{ minWidth: "20px" }}>
                {num}
              </span>
              <input
                type="text"
                value={answers[i]}
                placeholder="Type a complete sentence"
                title="Write a complete so ... that or such ... that sentence"
                className="wb-unit2-answer-input"
                onChange={(e) => handleChange(i, e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  borderBottom: "1.5px solid #999",
                  outline: "none",
                  background: "transparent",
                  fontSize: "18px",
                  color: "#333",
                  paddingBottom: "4px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page11_C;
