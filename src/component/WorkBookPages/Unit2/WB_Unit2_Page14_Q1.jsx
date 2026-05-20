import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const wordBank = [
  "thrilling", "professional", "experience", "adventure", "faint", "nervous",
  "slope", "comfortable", "courage", "snowboarding", "Come along",
  "I am still not sure", "It looks so", "Where's your sense of adventure",
];

// Story segments: array of { text, blank, answer }
// blank: true = input field, false = plain text
const story = [
  { text: `"` },
  { blank: true, answer: "Come along", width: 130 },
  { text: `!" my brother said. He was acting like he was looking forward to climbing the mountain, but I knew better. He was actually so ` },
  { blank: true, answer: "nervous", width: 110 },
  { text: `, that I thought he might ` },
  { blank: true, answer: "faint", width: 100 },
  { text: `. My brother has always been scared of heights and on mountains any ` },
  { blank: true, answer: "slope", width: 100 },
  { text: ` that is steep.` },
  { text: `\n\n    I am different. I like an ` },
  { blank: true, answer: "adventure", width: 115 },
  { text: `, so I was looking forward to climbing Straight Up Mountain. Although I thought it would be ` },
  { blank: true, answer: "thrilling", width: 110 },
  { text: `, I felt that he was not ` },
  { blank: true, answer: "comfortable", width: 130 },
  { text: ` at all.` },
  { text: `\n\n    I said to him, "Aren't you ready to climb? ` },
  { blank: true, answer: "Where's your sense of adventure", width: 280 },
  { text: `?"` },
  { text: `\n    Finally, he said, "` },
  { blank: true, answer: "It looks so", width: 120 },
  { text: ` steep and dangerous. Honestly, ` },
  { blank: true, answer: "I am still not sure", width: 170 },
  { text: ` that I can do this."` },
  { text: `\n\n    I wanted to make him feel better, so I told him, "This will be a new ` },
  { blank: true, answer: "experience", width: 120 },
  { text: ` for you. I feel you would be so brave."` },
  { text: `\n    It took him so much ` },
  { blank: true, answer: "courage", width: 100 },
  { text: ` to climb, but he did it. He started to look like a ` },
  { blank: true, answer: "professional", width: 130 },
  { text: ` mountain climber.` },
  { text: `\n    After we got down, I told him, "You did a great job!"` },
  { text: `\n    "Yes," he said. "Maybe next winter, I will learn ` },
  { blank: true, answer: "snowboarding", width: 130 },
  { text: `."` },
];

// Collect all blanks in order
const blanks = story.filter((s) => s.blank);

const WB_Unit2_Page13_I = () => {
  const init = () => blanks.map(() => "");
  const [answers, setAnswers] = useState(init);
  const [result,  setResult]  = useState([]);
  const [locked,  setLocked]  = useState(false);

  const normalize = (s) =>
    s.toLowerCase().replace(/[.?!,'''"]/g, "").replace(/\s+/g, " ").trim();

  let blankCounter = -1;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((prev) => { const a = [...prev]; a[i] = value; return a; });
    setResult((prev)  => { const r = [...prev]; r[i] = undefined; return r; });
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
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(blanks.map((b) => b.answer));
    setResult(blanks.map(() => true));
    setLocked(true);
  };

  const handleReset = () => { setAnswers(init()); setResult([]); setLocked(false); };

  const renderStory = () => {
    let bi = -1;
    return story.map((seg, si) => {
      if (!seg.blank) {
        // Handle newlines
        return seg.text.split("\n").map((part, pi, arr) => (
          <React.Fragment key={`t-${si}-${pi}`}>
            {part}
            {pi < arr.length - 1 && <br />}
          </React.Fragment>
        ));
      }

      bi++;
      const i = bi;
      const isWrong   = result[i] === false;
      const isCorrect = result[i] === true;

      return (
        <span key={`b-${si}`} style={{ position: "relative", display: "inline-block" }}>
          <input
            type="text"
            value={answers[i] || ""}
            disabled={locked || isCorrect}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{
              width: seg.width || 120,
              border: "none",
              borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
              outline: "none",
              background: "transparent",
              fontSize: "17px",
              color: isCorrect ? "#2d6a0f" : isWrong ? "#D1232A" : "#333",
              textAlign: "center",
              padding: "0 4px",
              verticalAlign: "baseline",
            }}
          />
          {isWrong && (
            <span style={{
              position: "absolute", top: -7, right: -7,
              width: 16, height: 16,
              background: "#ef4444", color: "white",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 4px rgba(0,0,0,.2)",
              pointerEvents: "none", zIndex: 10,
            }}>✕</span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A" style={{ marginRight: "10px" }}>I</span>
          Complete the story with a vocabulary word or expression.
        </h5>

        {/* Word Bank */}
        <div style={{
          display : "flex",
              flexWrap: "wrap",

          border: `1.5px solid ${BORDER}`,
          borderRadius: 8,
          padding: "12px 18px",
          marginBottom: 24,
          fontSize: 16,
          lineHeight: "2",
          color: "#333",
        }}>
          {wordBank.map((w, i) => (
            <span key={i} style={{ marginRight: 28 }}>{w}</span>
          ))}
        </div>

        {/* Story */}
        <div style={{
          fontSize: 17,
          lineHeight: "2.2",
          color: "#333",
          marginBottom: "3em",
        }}>
          {renderStory()}
        </div>

      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page13_I;