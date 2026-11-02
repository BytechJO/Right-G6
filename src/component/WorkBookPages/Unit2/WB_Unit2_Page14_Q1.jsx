import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2WorkbookAudioText, {
  stopWorkbookUnit2Audio,
  workbookUnit2Audio,
} from "./Unit2WorkbookAudioText";

const BORDER = "#84ad40";

const wordBank = [
  "thrilling",
  "professional",
  "experience",
  "adventure",
  "faint",
  "nervous",
  "slope",
  "comfortable",
  "courage",
  "snowboarding",
  "Come along",
  "I am still not sure",
  "It looks so",
  "Where's your sense of adventure",
];

const wordBankAudioIndexes = [3, 4, 7, 5, 1, 8, 6, 2, 9, 11, 12, 13, 14, 10];

const rawStoryParagraphs = [
  [
    { text: `"` },
    { blank: true, answer: "Come along", width: 130 },
    { text: `!" my brother said. He was acting like he was looking forward to climbing the mountain, but I knew `, audioIndex: 15 },
    { text: `better. He was actually so `, audioIndex: 16 },
    { blank: true, answer: "nervous", width: 110 },
    { text: `, that I thought he might `, audioIndex: 17 },
    { blank: true, answer: "faint", width: 100 },
    { text: `. My brother has always been scared `, audioIndex: 18 },
    { text: `of heights and on mountains any `, audioIndex: 19 },
    { blank: true, answer: "slope", width: 100 },
    { text: ` that is steep.`, audioIndex: 20 },
  ],
  [
    { text: `I am different. I like an `, audioIndex: 21 },
    { blank: true, answer: "adventure", width: 115 },
    { text: `, so I was looking forward to climbing Straight Up Mountain. Although I `, audioIndex: 22 },
    { text: `thought it would be `, audioIndex: 23 },
    { blank: true, answer: "thrilling", width: 110 },
    { text: `, I felt that he was not `, audioIndex: 24 },
    { blank: true, answer: "comfortable", width: 130 },
    { text: ` at all.`, audioIndex: 25 },
  ],
  [
    { text: `I said to him, "Aren't you ready to climb? `, audioIndex: 26 },
    { blank: true, answer: "Where's your sense of adventure", width: 280 },
    { text: `?" Finally, he said, "`, audioIndex: 27 },
    { blank: true, answer: "It looks so", width: 120 },
    { text: ` steep and dangerous. Honestly, `, audioIndex: 28 },
    { blank: true, answer: "I am still not sure", width: 170 },
    { text: ` that I can do this."`, audioIndex: 29 },
  ],
  [
    { text: `I wanted to make him feel better, so I told him, "This will be a new `, audioIndex: 30 },
    { blank: true, answer: "experience", width: 120 },
    { text: ` for you. I feel you would be so `, audioIndex: 31 },
    { text: `brave. `, audioIndex: 32 },
    { text: `It took him so much `, audioIndex: 33 },
    { blank: true, answer: "courage", width: 100 },
    { text: ` to climb, but he did it. He started to look like a ` },
    { blank: true, answer: "professional", width: 130 },
    { text: ` mountain climber. After we got down, I told him, "You did a great job!" "Yes," he said. "Maybe next winter, I will learn ` },
    { blank: true, answer: "snowboarding", width: 130 },
    { text: `."` },
  ],
];

let nextBlankIndex = 0;
const storyParagraphs = rawStoryParagraphs.map((paragraph) =>
  paragraph.map((segment) =>
    segment.blank ? { ...segment, blankIndex: nextBlankIndex++ } : segment,
  ),
);
const blanks = storyParagraphs.flat().filter((segment) => segment.blank);

const WB_Unit2_Page13_I = () => {
  const init = () => blanks.map(() => "");
  const [answers, setAnswers] = useState(init);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = (s) =>
    s
      .toLowerCase()
      .replace(/[.?!,’'''"]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((prev) => {
      const a = [...prev];
      a[i] = value;
      return a;
    });
    setResult((prev) => {
      const r = [...prev];
      r[i] = undefined;
      return r;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const nr = answers.map((a, i) => {
      const ok = normalize(a) === normalize(blanks[i].answer);
      if (ok) correct++;
      return ok;
    });
    setResult(nr);
    const total = blanks.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(blanks.map((b) => b.answer));
    setResult(blanks.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit2Audio();
    setAnswers(init());
    setResult([]);
    setLocked(false);
  };

  const renderBlank = (seg, keyPrefix) => {
      const i = seg.blankIndex;
      const isWrong = result[i] === false;
      const isCorrect = result[i] === true;

      return (
        <span
          key={`${keyPrefix}-blank-${i}`}
          style={{ position: "relative", display: "inline-block" }}
        >
          <input
            type="text"
            value={answers[i] || ""}
            disabled={locked || isCorrect}
            placeholder="word"
            title="Type the vocabulary word or expression"
            className="wb-unit2-answer-input"
            onChange={(e) => handleChange(i, e.target.value)}
            style={{
              width: seg.width || 120,
              border: "none",
              borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
              outline: "none",
              background: "transparent",
              fontSize: "17px",
              color: isCorrect ? "#333" : isWrong ? "#D1232A" : "#333",
              textAlign: "center",
              padding: "0 4px",
              verticalAlign: "baseline",
            }}
          />
          {isWrong && (
            <span
              style={{
                position: "absolute",
                top: -7,
                right: -7,
                width: 16,
                height: 16,
                background: "#ef4444",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: "bold",
                border: "2px solid white",
                boxShadow: "0 1px 4px rgba(0,0,0,.2)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              ✕
            </span>
          )}
        </span>
      );
  };

  const renderStory = () => storyParagraphs.map((paragraph, paragraphIndex) => {
    const paragraphCorrect = paragraph
      .filter((segment) => segment.blank)
      .every((segment) => result[segment.blankIndex] === true);

    if (paragraphCorrect && paragraphIndex < 3) {
      return (
        <Unit2WorkbookAudioText
          key={`paragraph-${paragraphIndex}`}
          src={workbookUnit2Audio("Page 14 - Exercise I", `full${paragraphIndex + 1}`)}
          ariaLabel={`Play completed paragraph ${paragraphIndex + 1}`}
          className="wb-unit2-full-paragraph"
        >
          {paragraph.map((segment, segmentIndex) =>
            segment.blank ? (
              <span
                key={`complete-${paragraphIndex}-${segmentIndex}`}
                className="wb-unit2-completed-answer"
              >
                {answers[segment.blankIndex]}
              </span>
            ) : (
              <React.Fragment key={`complete-${paragraphIndex}-${segmentIndex}`}>
                {segment.text}
              </React.Fragment>
            ),
          )}
        </Unit2WorkbookAudioText>
      );
    }

    return (
      <p key={`paragraph-${paragraphIndex}`} className="wb-unit2-story-paragraph">
        {paragraph.map((segment, segmentIndex) => {
          if (segment.blank) {
            return renderBlank(segment, `${paragraphIndex}-${segmentIndex}`);
          }
          if (!segment.audioIndex) {
            return <React.Fragment key={`text-${paragraphIndex}-${segmentIndex}`}>{segment.text}</React.Fragment>;
          }
          return (
            <Unit2WorkbookAudioText
              key={`audio-${paragraphIndex}-${segmentIndex}`}
              src={workbookUnit2Audio(
                "Page 14 - Exercise I",
                `Item_${String(segment.audioIndex).padStart(3, "0")}_`,
              )}
              ariaLabel={`Play sentence part ${segment.audioIndex - 14}`}
              style={{ textAlign: "left" }}
            >
              {segment.text}
            </Unit2WorkbookAudioText>
          );
        })}
      </p>
    );
  });

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="I"
          title="Complete the story with a vocabulary word or expression."
          subTitle=" Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* Word Bank */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",

            border: `1.5px solid ${BORDER}`,
            borderRadius: 8,
            padding: "12px 18px",
            marginBottom: 24,
            fontSize: 16,
            lineHeight: "2",
            color: "#333",
          }}
        >
          {wordBank.map((w, i) => (
            <Unit2WorkbookAudioText
              key={w}
              src={workbookUnit2Audio(
                "Page 14 - Exercise I",
                `Item_${String(wordBankAudioIndexes[i]).padStart(3, "0")}_`,
              )}
              ariaLabel={`Play ${w}`}
              style={{ marginRight: 28 }}
            >
              {w}
            </Unit2WorkbookAudioText>
          ))}
        </div>

        {/* Story */}
        <div
          style={{
            fontSize: 17,
            lineHeight: "2.2",
            color: "#333",
            marginBottom: "3em",
          }}
        >
          {renderStory()}
        </div>

      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page13_I;
