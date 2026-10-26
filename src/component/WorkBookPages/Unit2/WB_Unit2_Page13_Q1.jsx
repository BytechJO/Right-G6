import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2WorkbookAudioText, {
  stopWorkbookUnit2Audio,
  workbookUnit2Audio,
} from "./Unit2WorkbookAudioText";

const EXAMPLE = [
  "At first I was so nervous when I was giving the speech that I thought I would faint.",
  "Later, when I remembered what my teacher had told me, I became more confident.",
];

const questions = [
  { id: 1, words: "nervous   confident", lines: 3 },

  { id: 2, words: "risky  safe", lines: 3 },
  { id: 3, words: "terrified  calm", lines: 3 },
];

const WB_Unit2_Page12_F = () => {
  const init = () => {
    const a = {};
    questions.forEach((q) => {
      a[q.id] = Array(q.lines).fill("");
    });
    return a;
  };
  const [answers, setAnswers] = useState(init);

  const handleChange = (id, lineIdx, value) => {
    setAnswers((prev) => {
      const arr = [...prev[id]];
      arr[lineIdx] = value;
      return { ...prev, [id]: arr };
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
          sectionLetter="F"
          title={
            <>
              Use the opposite word pairs to make sentences with{" "}
              <strong style={{ color: "orange" }}>so</strong> and{" "}
              <strong style={{ color: "orange" }}>such</strong>.
            </>
          }
          subTitle=" Use the target grammar pattern in a complete sentence and reread it for meaning before moving on."
        />

        <div className="flex flex-col gap-8 mb-12" style={{ fontSize: "18px" }}>
          {/* Q2, Q3 */}
          {questions.map((q) => (
            <div key={q.id} className="flex flex-col gap-5">
              <div className="flex items-baseline gap-2">
                <span className="font-bold" style={{ minWidth: "20px" }}>
                  {q.id}
                </span>
                <Unit2WorkbookAudioText
                  src={workbookUnit2Audio(
                    "Page 13 - Exercise F",
                    `Item_${String(q.id).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play ${q.words}`}
                >
                  {q.words}:
                </Unit2WorkbookAudioText>
                <input
                  type="text"
                  value={answers[q.id][0]}
                  placeholder="Write a complete sentence"
                  title={`Write a sentence using ${q.words}`}
                  className="wb-unit2-answer-input"
                  onChange={(e) => handleChange(q.id, 0, e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    borderBottom: "1.5px solid #999",
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                    color: "#333",
                    paddingBottom: "3px",
                  }}
                />
              </div>
              {answers[q.id].slice(1).map((val, li) => (
                <input
                  key={li}
                  type="text"
                  value={val}
                  placeholder="Continue your sentence"
                  title={`Continue the sentence using ${q.words}`}
                  className="wb-unit2-answer-input"
                  onChange={(e) => handleChange(q.id, li + 1, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1.5px solid #999",
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                    color: "#333",
                    paddingBottom: "3px",
                    marginLeft: "28px",
                    boxSizing: "border-box",
                  }}
                />
              ))}
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

export default WB_Unit2_Page12_F;
