import React, { useState } from "react";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit6AudioText, {
  stopWorkbookUnit6Audio,
  workbookUnit6Audio,
} from "./WorkbookUnit6AudioText";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    parts: [
      { type: "text", value: "I " },
      { type: "input", key: "1a" },
      { type: "text", value: " run two kilometers each week but now ", audio: "Item_001_" },
      { type: "input", key: "1b" },
      { type: "text", value: " one ", audio: "Item_002_" },
      { type: "text", value: "kilometer.", audio: "Item_003_" },
    ],
  },
  {
    id: 2,
    parts: [
      { type: "text", value: "Peter used to eat one apple a day ", audio: "Item_004_" },
      { type: "input", key: "2a" },
      { type: "text", value: " he eats ", audio: "Item_005_" },
      { type: "input", key: "2b" },
      { type: "text", value: " apples", audio: "Item_006_" },
      { type: "text", value: " a day." },
    ],
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_CompleteUsedTo_H() {
  const audioFolder = "Page 36 - Exercise H";
  const [answers, setAnswers] = useState({});

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit6Audio();
    setAnswers({});
  };

  return (
    <div className="main-container-component">
      <style>{`
        /* ── List ── */
        .cut-list {
          display: flex;
          flex-direction: column;
          gap: clamp(50px, 2.4vw, 50px);
          margin : 10vh 0;
        }

        /* ── Single item row ── */
        .cut-item {
          display: flex;
          align-items: flex-start;
          gap: clamp(10px, 1.4vw, 18px);
        }

        /* Number */
        .cut-num {
          font-size: clamp(15px, 1.9vw, 22px);
          font-weight: 700;
          color: #2b2b2b;
          flex-shrink: 0;
          padding-top: 2px;
          min-width: 20px;
        }

        /* Sentence text with inline inputs */
        .cut-sentence {
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          line-height: 2;
          flex: 1;
        }

        /* Inline input */
        .cut-input {
          display: inline-block;
          border: none;
          border-bottom: 1px solid #2b2b2b;
          outline: none;
          font-size: clamp(14px, 1.7vw, 20px);
          color: #2b2b2b;
          background: transparent;
          width: clamp(100px, 14vw, 200px);

          transition: border-color 0.15s;
        }


        /* Buttons */
        .cut-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2vw, 22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <ExerciseHeader
          sectionLetter="H"
          title={
            <>
              Complete the sentences. The sentences should include{" "}
              <span style={{ color: "#e67e22", fontWeight: 700 }}>used to</span>.
            </>
          }
          subTitle="Use the subject and time clue to choose the correct verb form, then reread the whole sentence."
        />

        {/* ── Items ── */}
        <div className="cut-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="cut-item">
              <span className="cut-num">{item.id}</span>
              <span className="cut-sentence">
                {item.parts.map((part, i) =>
                  part.type === "text" ? (
                    <WorkbookUnit6AudioText
                      key={i}
                      src={part.audio ? workbookUnit6Audio(audioFolder, part.audio) : null}
                      ariaLabel={`Play sentence ${item.id} phrase`}
                      flowText
                    >
                      {part.value}
                    </WorkbookUnit6AudioText>
                  ) : (
                    <input
                      key={i}
                      className="cut-input wb-unit6-input"
                      type="text"
                      value={answers[part.key] || ""}
                      onChange={(e) => handleChange(part.key, e.target.value)}
                      placeholder="e.g. used to"
                      title="Complete the missing part of the sentence"
                      aria-label={`Missing sentence part ${part.key}`}
                    />
                  )
                )}
              </span>
            </div>
          ))}
        </div>

        {/* ── Reset Button Only ── */}
        <div className="cut-buttons">
          <Button
            handleStartAgain={handleReset}
            checkAnswers={null}
            handleShowAnswer={null}
          />
        </div>
      </div>
    </div>
  );
}
