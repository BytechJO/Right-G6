import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3WorkbookAudioText, {
  Unit3WorkbookAudioArea,
  stopWorkbookUnit3Audio,
  workbookUnit3Audio,
} from "./Unit3WorkbookAudioText";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const INPUT_UL_DEFAULT = "#3f3f3f";
const INPUT_UL_WRONG   = "#ef4444";
const INPUT_TEXT_COLOR = "#2b2b2b";
const INPUT_ANS_COLOR  = "#c81e1e";
const NUMBER_COLOR     = "#2b2b2b";
const TEXT_COLOR       = "#2b2b2b";
const WRONG_BADGE_BG   = "#ef4444";
const WRONG_BADGE_TEXT = "#ffffff";

// ─────────────────────────────────────────────
//  📝  EXERCISE DATA
// ─────────────────────────────────────────────
const ITEMS = [
  {
    id:      1,
    before:  "I'd like to just",
    after:   "for a few minutes since came home. After that, we can start cleaning the house.",
    correct: ["unwind"],
    answer:  "unwind",
  },
  {
    id:      2,
    before:  "Evan was so",
    after:   "after the race that he took a two-hour nap.",
    correct: ["exhausted"],
    answer:  "exhausted",
  },
  {
    id:      3,
    before:  "Most",
    after:   "are not very healthy, so we usually try to cook our own fresh food.",
    correct: ["fast foods", "fast food"],
    answer:  "fast foods",
  },
  {
    id:      4,
    before:  "Did you",
    after:   "the guest some juice?",
    correct: ["offer"],
    answer:  "offer",
  },
];

const AUDIO_PARTS = [
  [1, 2],
  [4, 3],
  [6, 5],
  [8, 7],
];

// ─────────────────────────────────────────────
//  🔧  NORMALIZE
// ─────────────────────────────────────────────
const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();
const isCorrect = (userVal, correctArr) =>
  correctArr.some((c) => normalize(userVal) === normalize(c));

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function WB_WriteVocab_QB() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);
  const [completed,   setCompleted]   = useState(false);

  const handleChange = (id, value) => {
    if (showAns || completed) return;
    const item = ITEMS.find((i) => i.id === id);
    if (showResults && item && isCorrect(answers[id] || "", item.correct)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns || completed) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]?.trim());
    if (!allAnswered) { ValidationAlert.info("Please complete all answers first."); return; }
    let score = 0;
    ITEMS.forEach((item) => { if (isCorrect(answers[item.id] || "", item.correct)) score++; });
    setShowResults(true);
    if (score === ITEMS.length) {
      setCompleted(true);
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    }
    else if (score > 0)           ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else                          ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((item) => { filled[item.id] = item.answer; });
    setAnswers(filled); setShowResults(false); setShowAns(true); setCompleted(true);
  };

  const handleReset = () => {
    stopWorkbookUnit3Audio();
    setAnswers({}); setShowResults(false); setShowAns(false); setCompleted(false);
  };

  const isWrong    = (item) => showResults && !showAns && !isCorrect(answers[item.id] || "", item.correct);
  const isDisabled = (item) => showAns || (showResults && isCorrect(answers[item.id] || "", item.correct));

  return (
    <div className="main-container-component">
      <style>{`
        .wvb-list {
          display: flex;
          flex-direction: column;
          gap:clamp(60px, 3vw, 60px);
          width: 100%;
          margin : 6% 0 ;
        }

        /* num + paragraph block */
        .wvb-item {
          display: flex;
          align-items: flex-start;
          gap: clamp(8px, 1.2vw, 16px);
        }

        .wvb-num {
          font-size: clamp(16px, 1.9vw, 22px);
          font-weight: 700;
          color: ${NUMBER_COLOR};
          flex-shrink: 0;
          line-height: 1.7;
        }

        /* Paragraph with inline input */
        .wvb-para {
             font-size: clamp(17px, 1.8vw, 17px);
          color: ${TEXT_COLOR};
          line-height: 1.7;
          display: flex;
          align-items: flex-end;
          gap: clamp(4px, 0.5vw, 7px);
          flex: 1;
        }

        .wvb-text {
          font-size: clamp(14px, 1.8vw, 21px);
          color: ${TEXT_COLOR};
          line-height: 1.7;
    white-space: nowrap;
        }

        /* Input wrap */
        .wvb-input-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          min-width: clamp(140px, 18vw, 260px);
          flex: 0 1 clamp(140px, 18vw, 260px);
        }

        .wvb-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid ${INPUT_UL_DEFAULT};
          outline: none;
          font-size: clamp(17px, 1.8vw, 17px);
          color: ${INPUT_TEXT_COLOR};
          line-height: 1.7;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s;
          text-align: center;
        }
        .wvb-input:disabled  { opacity: 1; cursor: default; }
        .wvb-input--wrong    { border-bottom-color: ${INPUT_UL_WRONG}; }
        .wvb-input--answer   { color: ${INPUT_ANS_COLOR}; font-weight: 700; }

        /* ✕ badge */
        .wvb-badge {
          position: absolute;
          top: -8px; right: 0;
          width: clamp(16px, 1.8vw, 20px);
          height: clamp(16px, 1.8vw, 20px);
          border-radius: 50%;
          background: ${WRONG_BADGE_BG};
          color: ${WRONG_BADGE_TEXT};
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .wvb-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(8px, 1.6vw, 18px);
        }
      `}</style>

      <div className="div-forall" style={{ display:"flex", flexDirection:"column", gap:"clamp(14px,2vw,22px)", maxWidth:"1100px", margin:"0 auto" }}>

        {/* ── Header ── */}
        <ExerciseHeader
          sectionLetter="B"
          title="Write the correct vocabulary word in each sentence."
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* ── Items ── */}
        <div className="wvb-list">
          {ITEMS.map((item) => {
            const wrong    = isWrong(item);
            const value    = answers[item.id] || "";
            const tColor   = showAns ? INPUT_ANS_COLOR : INPUT_TEXT_COLOR;
            const uColor   = wrong ? INPUT_UL_WRONG : INPUT_UL_DEFAULT;
            const disabled = isDisabled(item);
            const fullReady = showAns || (
              showResults && isCorrect(answers[item.id] || "", item.correct)
            );

            return (
              <Unit3WorkbookAudioArea
                key={item.id}
                className="wvb-item"
                active={fullReady}
                src={workbookUnit3Audio(
                  "Page 15 - Exercise B",
                  `full${item.id}`,
                )}
                ariaLabel={`Play full sentence ${item.id}`}
              >
                <span className="wvb-num">{item.id}</span>
                <div className="wvb-para">
                  {item.before && (
                    <Unit3WorkbookAudioText
                      className="wvb-text"
                      src={workbookUnit3Audio(
                        "Page 15 - Exercise B",
                        `Item_${String(AUDIO_PARTS[item.id - 1][0]).padStart(3, "0")}_`,
                      )}
                      ariaLabel={`Play the beginning of sentence ${item.id}`}
                      disabled={fullReady}
                    >
                      {item.before}
                    </Unit3WorkbookAudioText>
                  )}

                  <div className="wvb-input-wrap">
                    <input
                      type="text"
                      className={["wvb-input", "wb-unit3-answer", wrong?"wvb-input--wrong":"", showAns?"wvb-input--answer":""].filter(Boolean).join(" ")}
                      value={value}
                      readOnly={disabled}
                      aria-readonly={disabled}
                      tabIndex={disabled ? -1 : 0}
                      placeholder="Type the vocabulary word"
                      title="Write the vocabulary word that completes the sentence"
                      aria-label={`Vocabulary answer ${item.id}`}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{ borderBottomColor: uColor, color: tColor }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {wrong && <div className="wvb-badge">✕</div>}
                  </div>

                  {item.after && (
                    <Unit3WorkbookAudioText
                      className="wvb-text"
                      src={workbookUnit3Audio(
                        "Page 15 - Exercise B",
                        `Item_${String(AUDIO_PARTS[item.id - 1][1]).padStart(3, "0")}_`,
                      )}
                      ariaLabel={`Play the end of sentence ${item.id}`}
                      disabled={fullReady}
                    >
                      {item.after}
                    </Unit3WorkbookAudioText>
                  )}
                </div>
              </Unit3WorkbookAudioArea>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="wvb-buttons">
          <Button checkAnswers={handleCheck} handleShowAnswer={handleShowAnswer} handleStartAgain={handleReset} />
        </div>
      </div>
    </div>
  );
}
