import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية
import wheelImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/1.svg";

const BORDER = "#84ad40";

// تعريف الكلمات: كل حرف إما { fixed: "x" } أو { input: true }
const WORDS = [
  {
    id: 1,
    answer: "bookworm",
    slots: [
      { input: true }, { input: true }, { input: true }, { input: true },
      { fixed: "w" },
      { input: true }, { input: true }, { input: true },
    ],
    prefilled: false,
  },
  {
    id: 2,
    answer: "persuade",
    slots: [
      { input: true }, { input: true },
      { fixed: "r" },
      { input: true }, { input: true }, { input: true }, { input: true }, { input: true },
    ],
    prefilled: false,
  },
  {
    id: 3,
    answer: "intended",
    slots: [
      { input: true }, { input: true }, { input: true }, { input: true }, { input: true },
      { fixed: "d" },
      { input: true },
      { fixed: "d" },
    ],
    prefilled: false,
  },
  {
    id: 4,
    answer: "suppose",
    slots: [
      { input: true },
      { fixed: "u" },
      { input: true }, { input: true }, { input: true }, { input: true }, { input: true },
    ],
    prefilled: false,
  },
  {
    id: 5,
    answer: "opinion",
    slots: [
      { fixed: "o" },
      { input: true }, { input: true }, { input: true }, { input: true },
      { fixed: "o" },
      { input: true },
    ],
    prefilled: false,
  },
  {
    id: 6,
    answer: "active",
    slots: [
      { input: true }, { input: true }, { input: true }, { input: true },
      { fixed: "v" },
      { input: true },
    ],
    prefilled: false,
  },
];

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

// build initial letter answers
const initLetters = () => {
  const a = {};
  WORDS.forEach(({ id, answer, slots, prefilled }) => {
    const letters = answer.replace(/\s/g, "").split("");
    let li = 0;
    slots.forEach((slot, si) => {
      if (slot.fixed) { li++; return; }
      a[`${id}-${si}`] = prefilled ? letters[li] : "";
      li++;
    });
  });
  return a;
};

const initWords = () => {
  const a = {};
  WORDS.forEach(({ id, answer, prefilled }) => {
    a[id] = prefilled ? answer : "";
  });
  return a;
};

// ── LetterBox — OUTSIDE parent ──
const LetterBox = ({ value, onChange, onKeyDown, inputRef, isCorrect, isWrong, disabled, fixed }) => {
  if (fixed) {
    return (
      <div style={{
        width: "28px", height: "32px",
        borderBottom: `2px solid #333`,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        fontSize: "17px", fontWeight: "700", color: "#333",
        paddingBottom: "2px",
      }}>
        {fixed}
      </div>
    );
  }
  return (
    <input
      ref={inputRef}
      type="text"
      maxLength={2}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={(e) => e.target.select()}
      style={{
        width: "28px", height: "32px",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : isCorrect ? BORDER : "#333"}`,
        outline: "none",
        background: isCorrect ? "#e8f5d0" : isWrong ? "#ffeaea" : "transparent",
        textAlign: "center",
        fontSize: "16px", fontWeight: "700",
        color: isCorrect ? "#2d6a0f" : isWrong ? "#D1232A" : "#333",
        fontFamily: "inherit",
        padding: 0,
        caretColor: "transparent",
      }}
    />
  );
};

// ── WordInput — OUTSIDE parent ──
const WordInput = ({ wId, value, onChange, isCorrect, isWrong, disabled, prefilled }) => (
  <span style={{ position: "relative", display: "inline-block", minWidth: "140px" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(wId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: prefilled ? "#333" : isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect || prefilled ? "700" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
        textAlign: "center",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "16px", height: "16px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit5_WheelOfFortune_A = () => {
  const [letters,  setLetters]  = useState(initLetters);
  const [wordAns,  setWordAns]  = useState(initWords);
  const [result,   setResult]   = useState({});
  const [locked,   setLocked]   = useState(false);
  const refs = useRef({});

  const refKey = (id, si) => `${id}-${si}`;

  const handleLetterChange = (id, si, raw) => {
    if (locked || result[id] === true) return;
    const ch = raw.slice(-1).toLowerCase().replace(/[^a-z]/, "");
    setLetters((prev) => ({ ...prev, [`${id}-${si}`]: ch }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
    if (ch) {
      // find next input slot
      const word = WORDS.find((w) => w.id === id);
      for (let nsi = si + 1; nsi < word.slots.length; nsi++) {
        if (word.slots[nsi].input) {
          const next = refs.current[refKey(id, nsi)];
          if (next) { next.focus(); next.select(); }
          break;
        }
      }
    }
  };

  const handleLetterKeyDown = (id, si, e) => {
    if (e.key === "Backspace") {
      if (!letters[`${id}-${si}`]) {
        const word = WORDS.find((w) => w.id === id);
        for (let psi = si - 1; psi >= 0; psi--) {
          if (word.slots[psi].input) {
            const prev = refs.current[refKey(id, psi)];
            if (prev) { prev.focus(); prev.select(); }
            break;
          }
        }
      }
    }
  };

  const handleWordChange = (id, value) => {
    if (locked || result[id] === true) return;
    setWordAns((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = WORDS.filter((w) => !w.prefilled).some(({ id }) => !wordAns[id].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    WORDS.forEach(({ id, answer, prefilled }) => {
      if (prefilled) { nr[id] = true; correct++; return; }
      const ok = normalize(wordAns[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = WORDS.filter((w) => !w.prefilled).length;
    const scored = correct - 1;
    const color = scored === total ? "green" : scored === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${scored} / ${total}</span></div>`;
    if (scored === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (scored === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const la = {}; const wa = {}; const r = {};
    WORDS.forEach(({ id, answer, slots }) => {
      const letters2 = answer.replace(/\s/g, "").split("");
      let li = 0;
      slots.forEach((slot, si) => {
        if (slot.fixed) { li++; return; }
        la[`${id}-${si}`] = letters2[li];
        li++;
      });
      wa[id] = answer;
      r[id]  = true;
    });
    setLetters(la); setWordAns(wa); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    setLetters(initLetters());
    setWordAns(initWords());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          It's time to play Wheel of Fortune™! Imagine you are on the show and have guessed
          the letters shown. Which vocabulary word is it? Write the complete word on the line.
        </h5>

        {/* Body */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "3em", marginTop: "1em", flexWrap: "wrap" }}>

          {/* Wheel Image */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={wheelImg}
              alt="wheel of fortune"
              style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
          </div>

          {/* Words */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            {WORDS.map(({ id, slots, prefilled }) => {
              const isCorrect = result[id] === true;
              const isWrong   = result[id] === false;
              return (
                <div key={id} style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>

                  {/* Number */}
                  <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>{id}</span>

                  {/* Letter boxes */}
                  <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
                    {slots.map((slot, si) => (
                      <LetterBox
                        key={si}
                        fixed={slot.fixed}
                        value={slot.fixed ? slot.fixed : (letters[`${id}-${si}`] || "")}
                        isCorrect={isCorrect}
                        isWrong={isWrong}
                        disabled={locked || isCorrect || prefilled || slot.fixed}
                        inputRef={(el) => { if (!slot.fixed) refs.current[refKey(id, si)] = el; }}
                        onChange={(e) => handleLetterChange(id, si, e.target.value)}
                        onKeyDown={(e) => handleLetterKeyDown(id, si, e)}
                      />
                    ))}
                  </div>

                  {/* Word input */}
                  <WordInput
                    wId={id}
                    value={wordAns[id]}
                    onChange={handleWordChange}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    disabled={locked || isCorrect || prefilled}
                    prefilled={prefilled}
                  />

                </div>
              );
            })}
          </div>

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

export default WB_Unit5_WheelOfFortune_A;