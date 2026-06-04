import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit5_Page2_ComprehensionA = () => {
  const [selected, setSelected] = useState(new Set());
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState(null); // null | { correct: Set, wrong: Set, missed: Set }

  const words = [
    { text: "hard-working", correct: true },
    { text: "actor", correct: true },
    { text: "selfish", correct: false },
    { text: "sad", correct: false },
    { text: "married", correct: true },
    { text: "talented", correct: true },
    { text: "unpopular", correct: false },
  ];

  const correctSet = new Set(
    words.map((w, i) => (w.correct ? i : -1)).filter((i) => i !== -1),
  );

  const toggle = (i) => {
    if (locked) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setResult(null);
  };

  const getWordClass = (i) => {
    if (!result) {
      return selected.has(i) ? "word-selected" : "word-default";
    }
    if (result.correct.has(i)) return "word-correct";
    if (result.wrong.has(i)) return "word-wrong";
    if (result.missed.has(i)) return "word-missed";
    return "word-default";
  };

  const checkAnswers = () => {
    if (locked) return;

    if (selected.size === 0) {
      ValidationAlert.info("Please select at least one word.");
      return;
    }

    const correct = new Set();
    const wrong = new Set();
    const missed = new Set();

    words.forEach((w, i) => {
      if (selected.has(i) && w.correct) correct.add(i);
      else if (selected.has(i) && !w.correct) wrong.add(i);
      else if (!selected.has(i) && w.correct) missed.add(i);
    });

    setResult({ correct, wrong, missed });
    const finalScore = Math.max(0, correct.size - wrong.size);

    const score = `Score: ${finalScore} / ${correctSet.size}`;

    if (
      correct.size === correctSet.size &&
      wrong.size === 0 &&
      selected.size === correctSet.size
    ) {
      setLocked(true);
      ValidationAlert.success(score);
    } else if (finalScore === 0) {
      ValidationAlert.error(score);
    } else {
      ValidationAlert.warning(score);
    }
  };

  const showAnswers = () => {
    setSelected(new Set(correctSet));
    setLocked(true);
    setResult({
      correct: new Set(correctSet),
      wrong: new Set(),
      missed: new Set(),
    });
  };

  const reset = () => {
    setSelected(new Set());
    setLocked(false);
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-10">
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">A</span>
        Circle the words that tell about Gary James.
      </h5>

      {/* Words Box */}
      <div
        style={{
          border: "2px solid #a8d080",
          borderRadius: "14px",
          background: "#f4f9ec",
          padding: "28px 32px 32px",
          maxWidth: "560px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px 20px",
            justifyContent: "center",
          }}
        >
          {words.map((w, i) => {
            const cls = getWordClass(i);
            const styleMap = {
              "word-default": {
                color: "var(--color-text-primary, #3a3a3a)",
                border: "1.5px solid transparent",
                borderRadius: "999px",
                padding: "5px 16px",
                background: "transparent",
                textDecoration: "none",
                cursor: locked ? "default" : "pointer",
              },
              "word-selected": {
                color: "#2c5a0e",
                border: "1.5px solid #2c5a0e",
                borderRadius: "999px",
                padding: "5px 16px",
                background: "transparent",
                textDecoration: "none",
                cursor: "pointer",
              },
              "word-correct": {
                color: "#1a6e2e",
                border: "1.5px solid #1a6e2e",
                borderRadius: "999px",
                padding: "5px 16px",
                background: "transparent",
                textDecoration: "none",
                cursor: "default",
              },
              "word-wrong": {
                color: "#c0392b",
                border: "1.5px solid #c0392b",
                borderRadius: "999px",
                padding: "5px 16px",
                background: "transparent",
                textDecoration: "line-through",
                cursor: "default",
              },
            };

            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                disabled={locked}
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  outline: "none",
                  border: "2.5px solid transparent",
                  background: "transparent",
                  transition: "all 0.18s ease",
                  userSelect: "none",
                  ...styleMap[cls],
                }}
              >
                {w.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-6">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={reset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <div
            onClick={showAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={checkAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit5_Page2_ComprehensionA;
