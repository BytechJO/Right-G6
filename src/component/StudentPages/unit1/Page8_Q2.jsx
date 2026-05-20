import React, { useState, useRef } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─── data ────────────────────────────────────────────────────────────────────
// Simpler approach: define each expression as segments of [text, blanks, text, ...]
// blanks = array of {idx, correct}

const EXPRESSIONS = [
  {
    num: 1,
    parts: [
      { text: "I'" },
      { blanks: ["m"] },
      { text: " s" }, // ← مسافة قبل s
      { blanks: ["o", "r", "r", "y"] },
      { text: " t" }, // ← مسافة قبل t
      { blanks: ["o"] },
      { text: " h" }, // ← مسافة قبل h
      { blanks: ["e", "a", "r"] },
      { text: " t" }, // ← مسافة قبل t
      { blanks: ["h", "a", "t"] },
      { text: "." },
    ],
        sentenceAnswer: "save me a trip",
  },
  {
    num: 2,
    parts: [
      { text: "I" },
      { blanks: ["t"] },
      { text: "'s n" },
      { blanks: ["o"] },
      { text: "t f" },
      { blanks: ["u", "n"] },
      { text: "." },
    ],
    sentenceAnswer: "It's no fun",
  },
  {
    num: 3,
    parts: [
      { text: "s" },
      { blanks: ["a"] },
      { text: "v" },
      { blanks: ["e"] },
      { text: " m" },
      { blanks: ["e"] },
      { text: " a t" },
      { blanks: ["r", "i"] },
      { text: "p" },
    ],
 sentenceAnswer: "I'm sorry to hear that",
  },
  {
    num: 4,
    parts: [
      { text: "c" },
      { blanks: ["o", "u", "n"] },
      { text: "t o" },
      { blanks: ["n"] },
      { text: " y" },
      { blanks: ["o", "u"] },
    ],
    sentenceAnswer: "count on you",
  },
];

const SENTENCE_PROMPTS = [
  "I don’t need to do that job because you did it for me.",
  "it’s not something you like",
  "you say this when someone tells you bad news",
  "depend on you; this is said to someone who does something when they promise to do it",
];

// ─── flatten blanks per expression ──────────────────────────────────────────
// Build a map: expressionIndex → array of correct letters (in order)
function getCorrectBlanks(expr) {
  const letters = [];
  expr.parts.forEach((p) => {
    if (p.blanks) letters.push(...p.blanks);
  });
  return letters;
}

// ─── component ───────────────────────────────────────────────────────────────
const Page8_Q2 = () => {
  // letterAnswers[exprIdx] = array of strings (one per blank in that expression)
  const [letterAnswers, setLetterAnswers] = useState(
    EXPRESSIONS.map((e) => Array(getCorrectBlanks(e).length).fill("")),
  );
  // matchAnswers[exprIdx] = string (a/b/c/d)
  const [sentenceAnswers, setSentenceAnswers] = useState(
    Array(EXPRESSIONS.length).fill(""),
  );
  const [letterErrors, setLetterErrors] = useState(
    EXPRESSIONS.map((e) => Array(getCorrectBlanks(e).length).fill(null)),
  );
  const [matchErrors, setMatchErrors] = useState(
    Array(EXPRESSIONS.length).fill(null),
  );
  const [locked, setLocked] = useState(false);

  // refs for auto-advance: inputsRef[exprIdx][blankIdx]
  const inputsRef = useRef(EXPRESSIONS.map((e) => []));
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,!?'’]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };
const handleLetterChange = (exprIdx, blankIdx, value) => {
  if (locked || letterErrors[exprIdx]?.[blankIdx] === false) return;
  const last = value.slice(-1).toLowerCase();

  // ← امسح الخطأ فور ما يبدأ يكتب
  if (letterErrors[exprIdx]?.[blankIdx] === true) {
    const updatedErrors = letterErrors.map((arr, i) =>
      i === exprIdx ? arr.map((v, j) => (j === blankIdx ? null : v)) : arr
    );
    setLetterErrors(updatedErrors);
  }

  const updated = letterAnswers.map((arr, i) =>
    i === exprIdx ? arr.map((v, j) => (j === blankIdx ? last : v)) : arr,
  );
  setLetterAnswers(updated);
  if (last) {
    const nextRef = inputsRef.current[exprIdx]?.[blankIdx + 1];
    if (nextRef) nextRef.focus();
    else {
      const nextExpr = inputsRef.current[exprIdx + 1]?.[0];
      if (nextExpr) nextExpr.focus();
    }
  }
};
const handleSentenceChange = (index, value) => {
  if (locked || matchErrors[index] === false) return;

  // ← امسح الخطأ فور ما يبدأ يكتب
  if (matchErrors[index] === true) {
    const updatedErrors = [...matchErrors];
    updatedErrors[index] = null;
    setMatchErrors(updatedErrors);
  }

  const updated = [...sentenceAnswers];
  updated[index] = value;
  setSentenceAnswers(updated);
};

 const handleCheck = () => {
  if (locked) return;

  const lettersEmpty = letterAnswers.some((arr) => arr.some((v) => !v.trim()));
  const sentenceEmpty = sentenceAnswers.some((v) => !v.trim());
  if (lettersEmpty || sentenceEmpty) {
    ValidationAlert.info("Please complete all fields.");
    return;
  }

  let correct = 0;
  const total = EXPRESSIONS.length + EXPRESSIONS.length; // 4 + 4 = 8

  // ── حروف: كل expression = نقطة وحدة ──
  const newLetterErrors = EXPRESSIONS.map((expr, i) => {
    const correctArr = getCorrectBlanks(expr);
    // هل كل حروف هاد الـ expression صح؟
    const allCorrect = correctArr.every(
      (c, j) => letterAnswers[i][j].toLowerCase() === c.toLowerCase()
    );
    if (allCorrect) correct++;
    // ارجع errors لكل حرف بشكل منفصل (عشان الـ ❌ يظهر على كل حرف غلط)
    return correctArr.map((c, j) =>
      letterAnswers[i][j].toLowerCase() === c.toLowerCase() ? false : true
    );
  });

  // ── جمل: كل جملة = نقطة وحدة ──
  const newMatchErrors = EXPRESSIONS.map((expr, i) => {
    const ok = normalizeText(sentenceAnswers[i]) === normalizeText(expr.sentenceAnswer);
    if (ok) correct++;
    return ok ? false : true;
  });

  setLetterErrors(newLetterErrors);
  setMatchErrors(newMatchErrors);

  const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
  const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

  if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
  else if (correct === 0) { ValidationAlert.error(msg); }
  else { ValidationAlert.warning(msg); }
};
  const handleShow = () => {
    setLetterAnswers(EXPRESSIONS.map((e) => getCorrectBlanks(e)));
    setSentenceAnswers(EXPRESSIONS.map((e) => e.sentenceAnswer));
    setLetterErrors(
      EXPRESSIONS.map((e) => Array(getCorrectBlanks(e).length).fill(false)),
    );
    setMatchErrors(Array(EXPRESSIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setLetterAnswers(
      EXPRESSIONS.map((e) => Array(getCorrectBlanks(e).length).fill("")),
    );
    setSentenceAnswers(Array(EXPRESSIONS.length).fill(""));
    setLetterErrors(
      EXPRESSIONS.map((e) => Array(getCorrectBlanks(e).length).fill(null)),
    );
    setMatchErrors(Array(EXPRESSIONS.length).fill(null));
    setLocked(false);
  };

  // render one expression row (letter blanks only)
  const renderExpression = (expr, exprIdx) => {
    let blankCounter = 0;
    return (
      <span className="inline-flex flex-wrap text-[18px]">
        {expr.parts.map((part, pIdx) => {
          if (part.text !== undefined) {
            return (
              <span key={pIdx} className="ml-4">
                {part.text}
              </span>
            );
          }
          return (
            <span key={pIdx} className="inline-flex items-start">
              {part.blanks.map((correctLetter, bIdx) => {
                const globalBlankIdx = blankCounter++;
                const hasError =
                  letterErrors[exprIdx]?.[globalBlankIdx] === true;
                const isOk = letterErrors[exprIdx]?.[globalBlankIdx] === false;
                return (
                  <span
                    key={`${pIdx}-${bIdx}`}
                    className="relative inline-flex items-center"
                  >
                    <input
                      ref={(el) => {
                        if (!inputsRef.current[exprIdx])
                          inputsRef.current[exprIdx] = [];
                        inputsRef.current[exprIdx][globalBlankIdx] = el;
                      }}
                      value={letterAnswers[exprIdx]?.[globalBlankIdx] ?? ""}
                      disabled={locked || isOk}
                      onChange={(e) =>
                        handleLetterChange(
                          exprIdx,
                          globalBlankIdx,
                          e.target.value,
                        )
                      }
                      maxLength={1}
                      className={`w-[18px] border-b outline-none text-center font-semibold bg-transparent text-[18px]
                      ${hasError ? "border-red-500" : "border-black"}`}
                    />
                    {hasError && (
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: "11px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                          flexShrink: 0,
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "50px" }}>
        {/* Title */}
        <h5 className="header-title-page8">
          <span className="ex-A mr-2">B</span>
          Put in the missing letters to make the expressions. Then match each to
          its definition.
        </h5>

        {/* ── Expressions grid 2×2 ── */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-10 mb-8 text-[18px]">
          {EXPRESSIONS.map((expr, i) => (
            <div key={i} className="flex gap-1">
              <span className="font-bold mr-1">{expr.num}</span>
              {renderExpression(expr, i)}
            </div>
          ))}
        </div>

        {/* ── Match section ── */}
        <div className="flex flex-col items-start gap-5">
      {SENTENCE_PROMPTS.map((prompt, i) => (
  <div key={i} className="flex items-center gap-3 text-[18px]">
    
    {/* ← أضف relative هون */}
    <div className="relative">
      <input
        value={sentenceAnswers[i]}
        disabled={locked || matchErrors[i] === false}
        onChange={(e) => handleSentenceChange(i, e.target.value)}
        className={`w-[320px] h-[42px] px-3 rounded-full border-2 outline-none text-[18px]
          ${matchErrors[i] === true ? "border-red-400" : "border-[#55c271]"}`}
      />

      {/* ← الـ ❌ فوق يمين الـ input */}
      {matchErrors[i] === true && (
        <span style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "20px",
          height: "20px",
          background: "red",
          color: "white",
          borderRadius: "50%",
          fontSize: "11px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
        }}>✕</span>
      )}
    </div>

    <span className="w-[100%] text-gray-600">= {prompt}</span>
  </div>
))}
        </div>

        {/* Buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page8_Q2;
