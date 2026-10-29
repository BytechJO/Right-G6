import React, { useState } from "react";
import WB_Unit7_Crossword_C from "./WB_Unit7_Page40_Crossword";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit7AudioText, {
  stopWorkbookUnit7Audio,
  workbookUnit7Audio,
} from "./WorkbookUnit7AudioText";

const adjectives = [
  "modern", "rapid", "sweet", "melted",
  "wooden", "bumpy", "freezing", "damp",
  "cozy", "creepy", "pleasant", "noisy",
  "brave", "peaceful", "risky", "delightful",
  "lively", "melodic", "nervous", "brave",
  "thankful", "terrifying", "comfortable", "thrilling",
];

const nouns = [
  "coach", "grade", "hobby", "kite",
  "furniture", "language", "idea", "picture",
  "ocean", "landscape", "squirrel", "friend",
  "career", "skateboard", "novel", "musical",
  "movie", "vacation", "roller coaster",
  "sports car", "house", "experience",
  "snowboarding",
];

const WORD_AUDIO = {
  modern: "Item_003_", rapid: "Item_004_", melted: "Item_005_", wooden: "Item_005_",
  bumpy: "Item_006_", coach: "Item_007_", grade: "Item_007_", hobby: "Item_008_",
  kite: "Item_008_", furniture: "Item_008_", language: "Item_009_", sweet: "Item_010_",
  freezing: "Item_011_", damp: "Item_011_", creepy: "Item_012_", pleasant: "Item_012_",
  idea: "Item_013_", landscape: "Item_014_", squirrel: "Item_015_", friend: "Item_016_",
  picture: "Item_017_", cozy: "Item_018_", noisy: "Item_019_", ocean: "Item_020_",
  brave: "Item_021_", peaceful: "Item_022_", risky: "Item_023_", delightful: "Item_023_",
  lively: "Item_024_", melodic: "Item_024_", skateboard: "Item_025_", novel: "Item_026_",
  musical: "Item_027_", career: "Item_028_", movie: "Item_029_", thankful: "Item_030_",
  terrifying: "Item_031_", comfortable: "Item_032_", "roller coaster": "Item_033_",
  house: "Item_034_", vacation: "Item_035_", "sports car": "Item_036_",
  nervous: "Item_037_", thrilling: "Item_038_", snowboarding: "Item_039_",
  experience: "Item_040_",
};

const WB_Unit2_Page11_C = () => {
  const audioFolder = "Page 40 - Exercise C";
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
    stopWorkbookUnit7Audio();
    setAnswers(init());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="C"
          title="Below is a list of adjectives and nouns. Use some of each of them to make sentences with so ... that and such ... that."
          subTitle="Verify the source content before release. Workbook page 40 shows only the activity icon, while this digital screen repeats a so/such task from another unit."
        />
        {/* Word Table */}
        <table style={{
          width: "100%", borderCollapse: "collapse",
          border: "2px solid #84ad40", marginBottom: "2%", fontSize: "16px" , marginTop: "2%",
        }}>
          <thead>
            <tr>
              <th style={{ border: "2px solid #84ad40", padding: "10px 16px", textAlign: "center" }}>
                <WorkbookUnit7AudioText
                  src={workbookUnit7Audio(audioFolder, "Item_001_")}
                  ariaLabel="Play Adjectives"
                >Adjectives</WorkbookUnit7AudioText>
              </th>
              <th style={{ border: "2px solid #84ad40", padding: "10px 16px", textAlign: "center" }}>
                <WorkbookUnit7AudioText
                  src={workbookUnit7Audio(audioFolder, "Item_002_")}
                  ariaLabel="Play Nouns"
                >Nouns</WorkbookUnit7AudioText>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "2px solid #84ad40", padding: "12px 16px", verticalAlign: "top" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                  {adjectives.map((w, i) => (
                    <WorkbookUnit7AudioText
                      key={i}
                      src={workbookUnit7Audio(audioFolder, WORD_AUDIO[w])}
                      ariaLabel={`Play ${w}`}
                    >{w}</WorkbookUnit7AudioText>
                  ))}
                </div>
              </td>
              <td style={{ border: "1.5px solid #84ad40", padding: "12px 16px", verticalAlign: "top" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                  {nouns.map((w, i) => (
                    <WorkbookUnit7AudioText
                      key={i}
                      src={workbookUnit7Audio(audioFolder, WORD_AUDIO[w])}
                      ariaLabel={`Play ${w}`}
                    >{w}</WorkbookUnit7AudioText>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Sentences */}
        <div className="flex flex-col gap-8 mb-10" style={{ fontSize: "18px" }}>


          {/* Q2, Q3, Q4 */}
          {[1 ,2, 3, 4].map((num, i) => (
            <div key={num} className="flex items-start gap-3">
              <span className="font-bold" style={{ minWidth: "20px" }}>{num}</span>
              <input
                className="wb-unit7-input"
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="Write a sentence"
                title="Write a sentence using so ... that or such ... that"
                aria-label={`Sentence ${num}`}
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

export default WB_Unit7_Crossword_C;
