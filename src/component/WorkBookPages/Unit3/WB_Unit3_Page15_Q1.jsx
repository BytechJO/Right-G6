import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit3_Page15_A = () => {

  const words = [
    { key: "d1", num: 1,  dir: "down",   row: 0,  col: 7,  word: "mashedpotatoes" },
    { key: "d2", num: 2,  dir: "down",   row: 2,  col: 9,  word: "unwind" },
    { key: "d3", num: 3,  dir: "down",   row: 2,  col: 18, word: "diner" },
    { key: "d5", num: 5,  dir: "down",   row: 5,  col: 2,  word: "offer" },
    { key: "d7", num: 7,  dir: "down",   row: 5,  col: 13, word: "exhausted" },
    { key: "a4", num: 4,  dir: "across", row: 3,  col: 17, word: "liver" },
    { key: "a6", num: 6,  dir: "across", row: 5,  col: 12, word: "leftovers" },
    { key: "a8", num: 8,  dir: "across", row: 7,  col: 2,  word: "fastfoods" },
    { key: "a9", num: 9,  dir: "across", row: 12, col: 4,  word: "acceptable" },
  ];

  const ROWS = 16;
  const COLS = 25;
  const CELL = 40;

  // ── Build maps ──
  // cellOwners: "r-c" -> [{ wi, li }, ...] (ALL words that own this cell)
  const cellOwners = {};
  const numberMap  = {};

  words.forEach((w, wi) => {
    for (let li = 0; li < w.word.length; li++) {
      const r   = w.dir === "down"   ? w.row + li : w.row;
      const c   = w.dir === "across" ? w.col + li : w.col;
      const key = `${r}-${c}`;
      if (!cellOwners[key]) cellOwners[key] = [];
      cellOwners[key].push({ wi, li });
    }
    const numKey = `${w.row}-${w.col}`;
    if (!numberMap[numKey]) numberMap[numKey] = [];
    numberMap[numKey].push(w.num);
  });

  const activeCells = new Set(Object.keys(cellOwners));

  // ── State ──
  const initAnswers = () => words.map((w) => Array(w.word.length).fill(""));
  const [answers, setAnswers] = useState(initAnswers());
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);
  const inputsRef = useRef({});

  // ── Handle change: fill ALL words that share this cell ──
  const handleChange = (ownersArr, value) => {
    if (locked) return;

    // لو كل الـ owners محلّلين صح، ما نغير
    if (ownersArr.every(({ wi, li }) => result[`${wi}-${li}`] === true)) return;

    const letter = value.toLowerCase().slice(-1);

    setAnswers((prev) => {
      const updated = prev.map((a) => [...a]);
      ownersArr.forEach(({ wi, li }) => {
        updated[wi][li] = letter;
      });
      return updated;
    });

    // clear wrong flags
    setResult((prev) => {
      const next = { ...prev };
      ownersArr.forEach(({ wi, li }) => { delete next[`${wi}-${li}`]; });
      return next;
    });

    // auto-advance في نفس الكلمة الأولى فقط
    if (letter) {
      const { wi, li } = ownersArr[0];
      const nextInput  = inputsRef.current[`${wi}-${li + 1}`];
      if (nextInput) { nextInput.focus(); nextInput.select(); }
    }
  };

  // ── Check ──
  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((wArr) => wArr.some((l) => !l));
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0; let total = 0;
    const newResult = {};
    answers.forEach((wArr, wi) => {
      wArr.forEach((letter, li) => {
        total++;
        const ok = letter === words[wi].word[li];
        if (ok) correct++;
        newResult[`${wi}-${li}`] = ok;
      });
    });
    setResult(newResult);

    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg   = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0)  ValidationAlert.error(msg);
    else                     ValidationAlert.warning(msg);
  };

  // ── Show Answers ──
  const showAnswers = () => {
    const ans = words.map((w) => w.word.split(""));
    const res = {};
    words.forEach((w, wi) => w.word.split("").forEach((_, li) => { res[`${wi}-${li}`] = true; }));
    setAnswers(ans); setResult(res); setLocked(true);
  };

  // ── Reset ──
  const handleReset = () => {
    setAnswers(initAnswers()); setResult({}); setLocked(false);
  };

  // ── Render ──
  // Display value: take first owner's answer (all should be same letter at intersection)
  const getDisplayValue = (key) => {
    const owners = cellOwners[key];
    if (!owners) return "";
    return answers[owners[0].wi][owners[0].li];
  };

  // Is wrong: any owner has result===false
  const isCellWrong = (key) => {
    const owners = cellOwners[key];
    if (!owners) return false;
    return owners.some(({ wi, li }) => result[`${wi}-${li}`] === false);
  };

  // Is correct: ALL owners correct
  const isCellCorrect = (key) => {
    const owners = cellOwners[key];
    if (!owners) return false;
    return owners.every(({ wi, li }) => result[`${wi}-${li}`] === true);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          Complete the puzzle. Use the vocabulary words.
        </h5>

        {/* Grid */}
        <div style={{ marginBottom: "28px", }}>
          <div style={{
            display: "inline-grid",
            gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
            gridTemplateRows:    `repeat(${ROWS}, ${CELL}px)`,
            gap: "1px",
          }}>
            {Array.from({ length: ROWS }, (_, r) =>
              Array.from({ length: COLS }, (_, c) => {
                const key      = `${r}-${c}`;
                const isActive = activeCells.has(key);
                const owners   = cellOwners[key];
                const nums     = numberMap[key];

                const val       = getDisplayValue(key);
                const isWrong   = isCellWrong(key);
                const isCorrect = isCellCorrect(key);

                // ref key: use first owner's wi-li for focus navigation
                const refKey = owners ? `${owners[0].wi}-${owners[0].li}` : null;

                return (
                  <div key={key} style={{
                    width: CELL, height: CELL,
                    border: isActive ? "1.5px solid #84ad40" : "none",
                    background: isActive ? "#fff" : "transparent",
                    position: "relative",
                  }}>
                    {nums && (
                      <span style={{
                        position: "absolute", top: "1px", left: "2px",
                        fontSize: "10px", fontWeight: "bold", color: "#555",
                        lineHeight: 1, zIndex: 2, pointerEvents: "none",
                      }}>
                        {nums.join("/")}
                      </span>
                    )}

                    {isActive && (
                      <input
                        ref={(el) => { if (refKey) inputsRef.current[refKey] = el; }}
                        type="text"
                        maxLength={1}
                        value={val}
                        disabled={locked || isCorrect}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => owners && handleChange(owners, e.target.value)}
                        style={{
                          width: "100%", height: "100%",
                          border: "none", outline: "none",
                          background: "transparent",
                          textAlign: "center",
                          fontSize: "16px", fontWeight: "bold",
                          color: "black",
                          cursor: "text",
                          paddingTop: "6px",
                        }}
                      />
                    )}

                    {isWrong && (
                      <span style={{
                        position: "absolute", top: "-6px", right: "-6px",
                        width: "14px", height: "14px",
                        background: "#ef4444", color: "white",
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", fontWeight: "bold",
                        border: "1px solid white", zIndex: 5,
                        pointerEvents: "none",
                      }}>✕</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="flex gap-8 text-[16px] mb-12">
          <div style={{ border: "1.5px solid #84ad40", borderRadius: "8px", padding: "14px 20px", flex: 1 }}>
            <h4 className="font-bold mb-3">Down</h4>
            <p className="mb-2"><b className="mr-2">1</b>a dish of potatoes that is cooked and whipped</p>
            <p className="mb-2"><b className="mr-2">2</b>relax</p>
            <p className="mb-2"><b className="mr-2">3</b>a small restaurant with a long counter</p>
            <p className="mb-2"><b className="mr-2">5</b>make available</p>
            <p><b className="mr-2">7</b>very tired</p>
          </div>
          <div style={{ border: "1.5px solid #84ad40", borderRadius: "8px", padding: "14px 20px", flex: 1 }}>
            <h4 className="font-bold mb-3">Across</h4>
            <p className="mb-2"><b className="mr-2">4</b>a part of an animal that many eat</p>
            <p className="mb-2"><b className="mr-2">6</b>food that remains after a meal is finished</p>
            <p className="mb-2"><b className="mr-2">8</b>restaurant foods that are made quickly or usually to go</p>
            <p><b className="mr-2">9</b>okay or satisfactory</p>
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

export default WB_Unit3_Page15_A;