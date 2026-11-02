/* eslint-disable react-refresh/only-export-components */
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

import wheelImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/1.svg";

const BORDER = "#84ad40";

const WORDS = [
  {
    id: 1,
    answer: "bookworm",
    slots: [
      { input: true },
      { input: true },
      { input: true },
      { input: true },
      { fixed: "w" },
      { input: true },
      { input: true },
      { input: true },
    ],
    prefilled: false,
  },
  {
    id: 2,
    answer: "persuade",
    slots: [
      { input: true },
      { input: true },
      { fixed: "r" },
      { input: true },
      { input: true },
      { input: true },
      { input: true },
      { input: true },
    ],
    prefilled: false,
  },
  {
    id: 3,
    answer: "intended",
    slots: [
      { input: true },
      { input: true },
      { input: true },
      { input: true },
      { input: true },
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
      { input: true },
      { input: true },
      { input: true },
      { input: true },
      { input: true },
    ],
    prefilled: false,
  },
  {
    id: 5,
    answer: "opinion",
    slots: [
      { fixed: "o" },
      { input: true },
      { input: true },
      { input: true },
      { input: true },
      { fixed: "o" },
      { input: true },
    ],
    prefilled: false,
  },
  {
    id: 6,
    answer: "active",
    slots: [
      { input: true },
      { input: true },
      { input: true },
      { input: true },
      { fixed: "v" },
      { input: true },
    ],
    prefilled: false,
  },
];

const MAX_SLOT_COUNT = Math.max(...WORDS.map(({ slots }) => slots.length));
const LETTER_GRID_WIDTH = MAX_SLOT_COUNT * 28 + (MAX_SLOT_COUNT - 1) * 6;

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,''']/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initLetters = () => {
  const a = {};
  WORDS.forEach(({ id, answer, slots, prefilled }) => {
    const letters = answer.replace(/\s/g, "").split("");
    let li = 0;
    slots.forEach((slot, si) => {
      if (slot.fixed) {
        li++;
        return;
      }
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

// ✅ LetterBox مع badge وبس underline أحمر بدون تأثيرات ثانية
const LetterBox = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  isCorrect,
  isWrong,
  disabled,
  fixed,
}) => {
  if (fixed) {
    return (
      <div
        style={{
          width: "28px",
          height: "32px",
          borderBottom: `2px solid #333`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          fontSize: "17px",
          fontWeight: "700",
          color: "#333",
          paddingBottom: "2px",
        }}
      >
        {fixed}
      </div>
    );
  }
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <input
        className="wb-unit5-input"
        ref={inputRef}
        type="text"
        maxLength={2}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={(e) => e.target.select()}
        placeholder="a"
        title="Enter one letter"
        aria-label="Missing letter"
        style={{
          width: "28px",
          height: "32px",
          border: "none",
          borderBottom: `1px solid ${isWrong ? "#D1232A" : isCorrect ? BORDER : "#333"}`,
          outline: "none",
          background: "transparent",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "700",
          color: isCorrect ? "#2d6a0f" : "#333",
          fontFamily: "inherit",
          padding: 0,
          caretColor: "transparent",
        }}
      />
      {isWrong && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "16px",
            height: "16px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
};

const WordInput = ({
  wId,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
  prefilled,
}) => (
  <span
    style={{ position: "relative", display: "inline-block", minWidth: "140px" }}
  >
    <input
      className="wb-unit5-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(wId, e.target.value)}
      placeholder="Complete word"
      title="Write the complete vocabulary word"
      aria-label={`Complete vocabulary word ${wId}`}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: prefilled
          ? "#333"
          : isCorrect
            ? "#c0392b"
            : isWrong
              ? "#D1232A"
              : "#333",
        fontWeight: isCorrect || prefilled ? "700" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
        textAlign: "center",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "16px",
          height: "16px",
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

const WB_Unit5_WheelOfFortune_A = () => {
  const [letters, setLetters] = useState(initLetters);
  const [wordAns, setWordAns] = useState(initWords);
  const [, setResult] = useState({});
  const [letterResult, setLetterResult] = useState({});
  const [wordResult, setWordResult] = useState({});
  const [locked, setLocked] = useState(false);
  const refs = useRef({});

  const refKey = (id, si) => `${id}-${si}`;

  const handleLetterChange = (id, si, raw) => {
    const key = `${id}-${si}`;
    if (locked || letterResult[key] === true) return;
    const ch = raw
      .slice(-1)
      .toLowerCase()
      .replace(/[^a-z]/, "");
    setLetters((prev) => ({ ...prev, [key]: ch }));
    setLetterResult((prev) => ({ ...prev, [key]: undefined }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
    if (ch) {
      const word = WORDS.find((w) => w.id === id);
      for (let nsi = si + 1; nsi < word.slots.length; nsi++) {
        if (
          word.slots[nsi].input &&
          letterResult[`${id}-${nsi}`] !== true
        ) {
          const next = refs.current[refKey(id, nsi)];
          if (next) {
            next.focus();
            next.select();
          }
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
          if (
            word.slots[psi].input &&
            letterResult[`${id}-${psi}`] !== true
          ) {
            const prev = refs.current[refKey(id, psi)];
            if (prev) {
              prev.focus();
              prev.select();
            }
            break;
          }
        }
      }
    }
  };

  const handleWordChange = (id, value) => {
    if (locked || wordResult[id] === true) return;
    setWordAns((prev) => ({ ...prev, [id]: value }));
    setWordResult((prev) => ({ ...prev, [id]: undefined }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = WORDS.filter((w) => !w.prefilled).some(({ id, slots }) => {
      if (!wordAns[id].trim()) return true;
      return slots.some(
        (slot, si) => slot.input && !letters[`${id}-${si}`]?.trim(),
      );
    });
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    const nextLetterResult = {};
    const nextWordResult = {};
    WORDS.forEach(({ id, answer, slots, prefilled }) => {
      const answerLetters = answer.replace(/\s/g, "").split("");
      let answerIndex = 0;
      let lettersOk = true;

      slots.forEach((slot, si) => {
        const expected = answerLetters[answerIndex];
        answerIndex += 1;
        if (slot.fixed) return;
        const key = `${id}-${si}`;
        const letterOk = letters[key]?.toLowerCase() === expected;
        nextLetterResult[key] = letterOk;
        if (!letterOk) lettersOk = false;
      });

      const completeWordOk = normalize(wordAns[id]) === normalize(answer);
      nextWordResult[id] = completeWordOk;
      const ok = prefilled || (lettersOk && completeWordOk);
      if (ok) correct++;
      nr[id] = ok;
    });
    setLetterResult(nextLetterResult);
    setWordResult(nextWordResult);
    setResult(nr);
    const total = WORDS.filter((w) => !w.prefilled).length;
    const scored = correct; // ✅ شيلنا الـ -1
    const color = scored === total ? "green" : scored === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${scored} / ${total}</span></div>`;
    if (scored === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (scored === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const la = {};
    const wa = {};
    const r = {};
    const lr = {};
    const wr = {};
    WORDS.forEach(({ id, answer, slots }) => {
      const letters2 = answer.replace(/\s/g, "").split("");
      let li = 0;
      slots.forEach((slot, si) => {
        if (slot.fixed) {
          li++;
          return;
        }
        const key = `${id}-${si}`;
        la[key] = letters2[li];
        lr[key] = true;
        li++;
      });
      wa[id] = answer;
      wr[id] = true;
      r[id] = true;
    });
    setLetters(la);
    setWordAns(wa);
    setResult(r);
    setLetterResult(lr);
    setWordResult(wr);
    setLocked(true);
  };

  const handleReset = () => {
    setLetters(initLetters());
    setWordAns(initWords());
    setResult({});
    setLetterResult({});
    setWordResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-10">
        <ExerciseHeader
          sectionLetter="A"
          title="Use the Wheel of Fortune clues to write the complete vocabulary words."
          subTitle="Use the visible letters as clues, complete the whole word, then check the spelling against the unit vocabulary."
        />

        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
            marginBottom: "3em",
            marginTop: "1em",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <img
              src={wheelImg}
              alt="A colorful Wheel of Fortune game wheel"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {WORDS.map(({ id, slots, prefilled }) => {
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      minWidth: "20px",
                    }}
                  >
                    {id}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "flex-end",
                      width: `${LETTER_GRID_WIDTH}px`,
                      flexShrink: 0,
                    }}
                  >
                    {slots.map((slot, si) => {
                      const key = `${id}-${si}`;
                      const isLetterCorrect = letterResult[key] === true;
                      const isLetterWrong = letterResult[key] === false;
                      return (
                        <LetterBox
                          key={si}
                          fixed={slot.fixed}
                          value={slot.fixed ? slot.fixed : letters[key] || ""}
                          isCorrect={isLetterCorrect}
                          isWrong={isLetterWrong}
                          disabled={
                            locked ||
                            isLetterCorrect ||
                            prefilled ||
                            slot.fixed
                          }
                          inputRef={(el) => {
                            if (!slot.fixed) refs.current[refKey(id, si)] = el;
                          }}
                          onChange={(e) =>
                            handleLetterChange(id, si, e.target.value)
                          }
                          onKeyDown={(e) => handleLetterKeyDown(id, si, e)}
                        />
                      );
                    })}
                  </div>

                  <WordInput
                    wId={id}
                    value={wordAns[id]}
                    onChange={handleWordChange}
                    isCorrect={wordResult[id] === true}
                    isWrong={wordResult[id] === false}
                    disabled={locked || wordResult[id] === true || prefilled}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

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

export default WB_Unit5_WheelOfFortune_A;
