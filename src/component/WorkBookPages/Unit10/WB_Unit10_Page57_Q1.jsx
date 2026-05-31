import React, { useState, useRef, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

// ── Word definitions (row, col are 0-indexed absolute) ──
const WORD_DEFS = [
  { id:"1D", word:"sandcastles", r:0,  c:13, dir:"D", clueNum:1 },
  { id:"2D", word:"dozens",       r:3,  c:7,  dir:"D", clueNum:2 },
  { id:"3D", word:"surfboard",   r:3,  c:10, dir:"D", clueNum:3 },
  { id:"4A", word:"occupied",    r:4,  c:6,  dir:"A", clueNum:4 },
  { id:"5A", word:"sunscreen",   r:6,  c:0,  dir:"A", clueNum:5 },
  { id:"5D", word:"seashells",   r:6,  c:0,  dir:"D", clueNum:5 },
  { id:"6D", word:"sunburn",     r:8, c:3,  dir:"D", clueNum:6 },
  { id:"7A", word:"necessary",   r:10, c:3,  dir:"A", clueNum:7 },
];

const CLUES = {
  down: [
    { num:1, text:"small models of castles or buildings made with sand" },
    { num:2, text:"large number of people or things" },
    { num:3, text:"a long and light board used for surfing" },
    { num:5, text:"the hard, empty shells of small sea creatures" },
    { num:6, text:"a state in which your body becomes red and sore from too much sunlight" },
  ],
  across: [
    { num:4, text:"full; in use" },
    { num:5, text:"something that you put on your skin to protect it from the sun" },
    { num:7, text:"so important that you must do it or have it" },
  ],
};

// ── Build cell map ──
const buildCells = () => {
  const map = {};
  WORD_DEFS.forEach(({ id, word, r, c, dir, clueNum }) => {
    for (let i = 0; i < word.length; i++) {
      const row = dir === "D" ? r + i : r;
      const col = dir === "A" ? c + i : c;
      const key = `${row},${col}`;
      if (!map[key]) map[key] = { letter: word[i], wordIds: [], clueNum: null };
      map[key].wordIds.push(id);
      if (i === 0 && !map[key].clueNum) map[key].clueNum = clueNum;
    }
  });
  return map;
};

const CELL_MAP = buildCells();

// Grid bounds
const allR = Object.keys(CELL_MAP).map(k => +k.split(",")[0]);
const allC = Object.keys(CELL_MAP).map(k => +k.split(",")[1]);
const MIN_R = Math.min(...allR), MAX_R = Math.max(...allR);
const MIN_C = Math.min(...allC), MAX_C = Math.max(...allC);
const GRID_ROWS = MAX_R - MIN_R + 1;
const GRID_COLS = MAX_C - MIN_C + 1;
const absKey = (r, c) => `${r + MIN_R},${c + MIN_C}`;

// For each word, build ordered list of cell keys
const WORD_CELLS = {};
WORD_DEFS.forEach(({ id, word, r, c, dir }) => {
  WORD_CELLS[id] = Array.from({ length: word.length }, (_, i) => {
    const row = dir === "D" ? r + i : r;
    const col = dir === "A" ? c + i : c;
    return `${row},${col}`;
  });
});

// ── State init ──
const initAnswers = () => {
  const a = {};
  Object.keys(CELL_MAP).forEach(k => { a[k] = ""; });
  return a;
};

// ── CellInput — OUTSIDE parent ──
const CellInput = ({ cellKey, value, onChange, onKeyDown, inputRef, isWrong, disabled }) => (
  <input
    ref={inputRef}
    type="text"
    maxLength={2}
    value={value ? value.toUpperCase() : ""}
    disabled={disabled}
    onChange={e => onChange(cellKey, e.target.value)}
    onKeyDown={e => onKeyDown(cellKey, e)}
    onFocus={e => e.target.select()}
    style={{
      position: "absolute", inset: 0,
      border: "none", outline: "none",
      background: "transparent",
      textAlign: "center",
      fontSize: "clamp(8px,1.2vw,15px)",
      fontWeight: "700",
      color: isWrong ? "#D1232A" : "#333",
      fontFamily: "inherit",
      padding: 0,
      textTransform: "uppercase",
      caretColor: "transparent",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit10_Crossword_A = () => {
  const [answers,  setAnswers]  = useState(initAnswers);
  const [result,   setResult]   = useState({});
  const [locked,   setLocked]   = useState(false);
  const [activeWord, setActiveWord] = useState(null); // highlighted word id
  const refs = useRef({});

  // Find the next cell in a word after current
  const getNextInWord = useCallback((wordId, currentKey) => {
    const cells = WORD_CELLS[wordId];
    if (!cells) return null;
    const idx = cells.indexOf(currentKey);
    return idx >= 0 && idx < cells.length - 1 ? cells[idx + 1] : null;
  }, []);

  const getPrevInWord = useCallback((wordId, currentKey) => {
    const cells = WORD_CELLS[wordId];
    if (!cells) return null;
    const idx = cells.indexOf(currentKey);
    return idx > 0 ? cells[idx - 1] : null;
  }, []);

  const focusCell = (key) => {
    if (refs.current[key]) { refs.current[key].focus(); refs.current[key].select(); }
  };

  const handleCellClick = (key) => {
    const cell = CELL_MAP[key];
    if (!cell) return;
    if (cell.wordIds.length === 1) {
      setActiveWord(cell.wordIds[0]);
    } else {
      // Toggle between words on repeated click
      setActiveWord(prev => {
        if (cell.wordIds.includes(prev)) {
          const idx = cell.wordIds.indexOf(prev);
          return cell.wordIds[(idx + 1) % cell.wordIds.length];
        }
        return cell.wordIds[0];
      });
    }
  };

  const handleChange = (key, val) => {
    if (locked || result[key] === true) return;
    const ch = val.slice(-1).toLowerCase().replace(/[^a-z]/, "");
    setAnswers(prev => ({ ...prev, [key]: ch }));
    setResult(prev  => ({ ...prev, [key]: undefined }));
    // Auto-advance in active word
    if (ch && activeWord) {
      const next = getNextInWord(activeWord, key);
      if (next) { setTimeout(() => focusCell(next), 0); }
    }
  };

  const handleKeyDown = (key, e) => {
    if (e.key === "Backspace" && !answers[key]) {
      if (activeWord) {
        const prev = getPrevInWord(activeWord, key);
        if (prev) { setTimeout(() => focusCell(prev), 0); }
      }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      // Move to next word
      const ids = WORD_DEFS.map(w => w.id);
      const idx = ids.indexOf(activeWord);
      const nextWord = ids[(idx + 1) % ids.length];
      setActiveWord(nextWord);
      focusCell(WORD_CELLS[nextWord][0]);
    }
  };

  const checkAnswers = () => {
    if (locked) return;
    if (Object.entries(CELL_MAP).some(([k]) => !answers[k])) {
      ValidationAlert.info("Please complete the puzzle first."); return;
    }
    let correct = 0;
    const nr = {};
    Object.entries(CELL_MAP).forEach(([k, cell]) => {
      const ok = answers[k] === cell.letter;
      if (ok) correct++;
      nr[k] = ok;
    });
    setResult(nr);
    const total = Object.keys(CELL_MAP).length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}, r = {};
    Object.entries(CELL_MAP).forEach(([k, cell]) => { a[k] = cell.letter; r[k] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers()); setResult({}); setLocked(false); setActiveWord(null);
  };

  // Highlight active word cells
  const activeWordCells = activeWord ? new Set(WORD_CELLS[activeWord]) : new Set();

  const CS = "clamp(22px,2.6vw,34px)";

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight:"10px" }}>A</span>
          Complete the puzzle. Use the vocabulary words.
        </h5>

        <div style={{ display:"flex", gap:"20px", alignItems:"flex-start", flexWrap:"wrap" }}>

          {/* ── Grid ── */}
          <div style={{ flex:"0 0 auto", overflowX:"auto" }}>
            <div style={{
              display:"grid",
              gridTemplateColumns:`repeat(${GRID_COLS}, ${CS})`,
              gridTemplateRows:`repeat(${GRID_ROWS}, ${CS})`,
              borderRadius:"6px",
              overflow:"hidden",
             padding: "10px",
            }}>
              {Array.from({ length: GRID_ROWS }, (_, ri) =>
                Array.from({ length: GRID_COLS }, (_, ci) => {
                  const key = absKey(ri, ci);
                  const cell = CELL_MAP[key];
                  const isActive = activeWordCells.has(key);
                  const isCorrect = result[key] === true;
                  const isWrong   = result[key] === false;

                  if (!cell) {
                    return (
                      <div key={`${ri}-${ci}`} style={{
                        width: CS, height: CS,
                        background: "transparent",
                
                      }} />
                    );
                  }

                  return (
                    <div
                      key={key}
                      onClick={() => handleCellClick(key)}
                      style={{
                        position: "relative",
                        width: CS, height: CS,
                        background: isCorrect ? "#c8e6c9" : isActive ? "#e8f5d0" : "#fff",
                        borderRight: `1px solid ${BORDER}`,
                        borderBottom: `1px solid ${BORDER}`,
                        borderTop: `1px solid ${BORDER}`,
                        borderLeft:  `1px solid ${BORDER}`,


                        cursor: "text",
                        boxSizing: "border-box",
                      }}
                    >
                      {cell.clueNum && (
                        <span style={{
                          position:"absolute", top:"1px", left:"2px",
                          fontSize:"clamp(5px,0.65vw,8px)",
                          fontWeight:"700", color:"#555", lineHeight:1, zIndex:2,
                          pointerEvents:"none",
                        }}>{cell.clueNum}</span>
                      )}
                      <CellInput
                        cellKey={key}
                        value={answers[key]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        inputRef={el => refs.current[key] = el}
                        isWrong={isWrong && !isCorrect}
                        disabled={locked || isCorrect}
                      />
                      {/* Wrong badge only */}
                      {isWrong && !isCorrect && (
                        <span style={{
                          position:"absolute", top:"-5px", right:"-5px",
                          width:"12px", height:"12px",
                          background:"#ef4444", color:"white",
                          borderRadius:"50%",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:"8px", fontWeight:"bold",
                          border:"1.5px solid white",
                          boxShadow:"0 1px 3px rgba(0,0,0,0.3)",
                          pointerEvents:"none", zIndex:3,
                        }}>✕</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Clues ── */}
          <div style={{ flex:1, minWidth:"190px", display:"flex", flexDirection:"column", gap:"12px" }}>
            <div style={{ border:`1.5px solid ${BORDER}`, borderRadius:"8px", padding:"12px 14px" }}>
              <div style={{ fontWeight:"bold", fontSize:"16px", marginBottom:"8px", textAlign:"center" }}>Down</div>
              {CLUES.down.map(({ num, text }) => (
                <div key={num} style={{ display:"flex", gap:"8px", marginBottom:"8px", fontSize:"13px", lineHeight:"1.45" }}>
                  <span style={{ fontWeight:"bold", minWidth:"14px" }}>{num}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ border:`1.5px solid ${BORDER}`, borderRadius:"8px", padding:"12px 14px" }}>
              <div style={{ fontWeight:"bold", fontSize:"16px", marginBottom:"8px", textAlign:"center" }}>Across</div>
              {CLUES.across.map(({ num, text }) => (
                <div key={num} style={{ display:"flex", gap:"8px", marginBottom:"8px", fontSize:"13px", lineHeight:"1.45" }}>
                  <span style={{ fontWeight:"bold", minWidth:"14px" }}>{num}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div style={{ height:"2em" }} />
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit10_Crossword_A;