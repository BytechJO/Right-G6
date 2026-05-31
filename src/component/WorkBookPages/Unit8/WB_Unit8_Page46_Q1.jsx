import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

// جدول الكود A-Z مع أرقامها
const CODE_TABLE = [
  { letter: "A", code: 4  }, { letter: "B", code: "" },
  { letter: "C", code: 26 }, { letter: "D", code: 24 },
  { letter: "E", code: 9  }, { letter: "F", code: 13 },
  { letter: "G", code: 5  }, { letter: "H", code: 14 },
  { letter: "I", code: 11 }, { letter: "J", code: "" },
  { letter: "K", code: 7  }, { letter: "L", code: 19 },
  { letter: "M", code: 16 }, { letter: "N", code: 10 },
  { letter: "O", code: 17 }, { letter: "P", code: 22 },
  { letter: "Q", code: "" }, { letter: "R", code: 1  },
  { letter: "S", code: 8  }, { letter: "T", code: 6  },
  { letter: "U", code: 18 }, { letter: "V", code: 15 },
  { letter: "W", code: 15 }, { letter: "X", code: 25 },
  { letter: "Y", code: "" }, { letter: "Z", code: "" },
];

// الكلمات مع أكوادها
const WORDS = [
  { id: 1, answer: "glows",          codes: [5,19,17,15,8] },
  { id: 2, answer: "helicopter",     codes: [14,9,19,11,26,17,22,6,9,1] },
  { id: 3, answer: "wireless",       codes: [15,11,1,9,19,9,8,8] },
  { id: 4, answer: "remote control", codes: [1,9,16,17,6,9,26,17,10,6,1,17,19] },
  { id: 5, answer: "peculiar",       codes: [22,9,26,18,19,11,4,1] },
  { id: 6, answer: "nighttime",      codes: [10,11,5,14,6,6,11,16,9] },
];


const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();


const initAnswers = () => {
  const a = {};
  WORDS.forEach(({ id, codes }) => {
    a[id] = Array(codes.length).fill("");
  });
  return a;
};

// ── LetterBox — OUTSIDE parent ──
const LetterBox = ({ value, onChange, onKeyDown, inputRef, isCorrect, isWrong, disabled }) => (
  <input
    ref={inputRef}
    type="text"
    maxLength={2}
    value={value.toUpperCase()}
    disabled={disabled}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={(e) => e.target.select()}
    style={{
      width: "28px",
      height: "28px",
      border: "none",
      borderBottom: `1px solid ${isWrong ? "#D1232A"  : "#333"}`,
      outline: "none",
      textAlign: "center",
      fontSize: "16px",
      color:  "#333",
      fontFamily: "inherit",
      padding: 0,
      textTransform: "uppercase",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit8_CodeWords_C = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);
  const refs = useRef({});

  const refKey = (id, i) => `${id}-${i}`;

  const handleChange = (id, idx, raw) => {
    if (locked || result[id] === true) return;
    const ch = raw.slice(-1).toLowerCase().replace(/[^a-z]/, "");
    setAnswers((prev) => {
      const arr = [...prev[id]]; arr[idx] = ch;
      return { ...prev, [id]: arr };
    });
    setResult((prev) => ({ ...prev, [id]: undefined }));
    if (ch) {
      const word = WORDS.find((w) => w.id === id);
      const next = refs.current[refKey(id, idx + 1)];
      if (next && idx + 1 < word.codes.length) { next.focus(); next.select(); }
    }
  };

  const handleKeyDown = (id, idx, e) => {
    if (e.key === "Backspace") {
      if (!answers[id][idx] && idx > 0) {
        const prev = refs.current[refKey(id, idx - 1)];
        if (prev) { prev.focus(); prev.select(); }
      }
    }
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = WORDS.some(({ id }) => answers[id].some((c) => !c));
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    WORDS.forEach(({ id, answer }) => {
      const userStr = answers[id].join("").toLowerCase();
      const ansStr  = answer.replace(/\s/g, "").toLowerCase();
      const ok = userStr === ansStr;
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = WORDS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    WORDS.forEach(({ id, answer }) => {
      a[id] = answer.replace(/\s/g, "").split("");
      r[id] = true;
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>C</span>
          Use the code to find the words.
        </h5>

        {/* Code Table */}
        <div style={{
          border: `1.5px solid #84ad40`,
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "28px",
          display: "inline-block",
          width: "100%",
        }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tbody>
              <tr>
                {CODE_TABLE.map(({ letter }) => (
                  <td key={letter} style={{
                    border: `1px solid #84ad40`,
                    padding: "4px 6px",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "13px",
                    color: "#333",
                    minWidth: "26px",
                  }}>{letter}</td>
                ))}
              </tr>
              <tr>
                {CODE_TABLE.map(({ letter, code }) => (
                  <td key={letter} style={{
                    border: `1px solid #84ad40`,
                    padding: "4px 6px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#555",
                    minWidth: "26px",
                  }}>{code}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Words */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "3em" }}>
          {WORDS.map(({ id, codes }) => {
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <div key={id} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                {/* Number */}
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px", paddingTop: "4px" }}>
                  {id}
                </span>

                {/* Letter boxes + codes */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "flex-end" }}>
                  {codes.map((code, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <LetterBox
                        value={answers[id][i] || ""}
                        isCorrect={isCorrect}
                        isWrong={isWrong}
                        disabled={locked || isCorrect}
                        inputRef={(el) => (refs.current[refKey(id, i)] = el)}
                        onChange={(e) => handleChange(id, i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(id, i, e)}
                      />
                      <span style={{ fontSize: "13px", color: "#555", fontWeight: "500" }}>
                        {code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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

export default WB_Unit8_CodeWords_C;