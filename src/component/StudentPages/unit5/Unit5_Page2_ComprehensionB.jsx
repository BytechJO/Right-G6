import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit5_Page2_ComprehensionB = () => {
  const words = [
    { word: "films", correct: ["movies", "motion pictures", "cinema"] },
    { word: "job", correct: ["work", "occupation", "profession", "career", "position"] },
    { word: "oddly", correct: ["strangely", "unusually", "curiously", "weirdly"] },
    { word: "up-to-date", correct: ["modern", "current", "latest", "new", "recent", "contemporary"] },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]); // true | false | undefined per index

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = words[i].correct.some(
        (c) => c.toLowerCase() === a.trim().toLowerCase()
      );
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);
    const msg = `Score: ${correctCount} / ${words.length}`;

    if (correctCount === words.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(words.map((w) => w.correct[0]));
    setLocked(true);
    setResult(words.map(() => true));
  };

  const reset = () => {
    setAnswers(["", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  const inputStyle = (i) => ({
    borderBottom: `1px solid ${result[i] === false ? "#ef4444" : result[i] === true ? "black" : "black"}`,
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    outline: "none",
    textAlign:"center",
    background: "transparent",
    fontSize: "16px",
    fontWeight: "500",
    // color: result[i] === false ? "#ef4444" : result[i] === true ? "#1a6e2e" : "#6D2980",
    // width: "200px",
    padding: "2px 4px",
  });

  // Pair words in rows: [films, job], [oddly, up-to-date]
  const rows = [
    [0, 1],
    [2, 3],
  ];

  return (
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">B</span>
        Write a synonym for each word. You can use the synonyms in the interview
        if you like.
      </h5>

      <div style={{margin: "0 auto", padding: "10px 0" }}>
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: "flex",
              gap: "40px",
              marginBottom: "28px",
              alignItems: "flex-end",
              // flexWrap: "wrap",
            }}
          >
            {row.map((i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "flex-end", gap: "8px", flex: 1 }}
              >
                <span style={{ fontSize: "16px", fontWeight: "600", whiteSpace: "nowrap" }}>
                  {words[i].word}
                </span>
                <div style={{ position: "relative"}}>
                  <input
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    disabled={locked || result[i] === true}
                    style={inputStyle(i)}
                  />
                  {result[i] === false && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "0px",
                                width: "22px",
              height: "22px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                        zIndex: 3,
                      }}
                    >
                      ✕
                    </span>
                  )}
                 
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-4">
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

export default Unit5_Page2_ComprehensionB;