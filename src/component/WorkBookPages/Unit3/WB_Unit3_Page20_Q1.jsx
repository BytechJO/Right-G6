import React, { useState, useRef, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
//  🎨  COLORS
// ─────────────────────────────────────────────
const CELL_BORDER_COLOR = "#84ad40";
const CELL_BG_DEFAULT   = "#f4f9ec";
const CELL_TEXT_DEFAULT = "#263238";
const CELL_TEXT_FOUND   = "#ffffff";
const WORD_LIST_BORDER  = "#84ad40";

const FOUND_COLORS = [
  "#e53935","#e67e22","#43a047","#1e88e5","#8e24aa",
  "#00897b","#d81b60","#f4511e","#546e7a",
];

// ─────────────────────────────────────────────
//  📝  GRID  15 × 15
// ─────────────────────────────────────────────
const GRID = [
  ["a","c","c","e","p","t","a","b","l","e","n","s","u","p","l"],
  ["a","w","r","x","n","x","c","q","r","d","z","o","r","d","c"],
  ["m","s","y","l","n","i","l","j","e","i","r","t","m","v","n"],
  ["b","t","c","e","q","l","j","l","s","n","v","e","e","t","m"],
  ["e","x","m","f","u","m","k","e","i","e","a","h","o","i","v"],
  ["i","g","r","t","z","b","l","s","d","r","o","p","f","z","e"],
  ["k","b","n","o","o","t","q","o","v","n","z","l","f","r","e"],
  ["b","a","s","v","a","p","o","r","c","s","t","b","e","q","x"],
  ["c","z","c","e","p","f","f","k","o","s","d","h","r","l","h"],
  ["j","t","a","r","t","e","d","b","w","w","g","j","o","p","a"],
  ["o","o","l","s","r","x","r","n","e","f","c","g","p","o","u"],
  ["i","m","a","s","h","e","d","p","o","t","a","t","o","e","s"],
  ["c","f","f","t","v","m","x","m","u","i","h","f","n","v","t"],
  ["y","z","g","i","v","d","s","i","z","l","k","z","s","d","e"],
  ["b","m","l","z","v","o","u","n","w","i","n","d","z","f","d"],
  ["e","p","h","p","o","t","y","p","a","u","b","p","t","c","s"],
];

const ROWS = GRID.length;   // 16
const COLS = GRID[0].length; // 15

// ─────────────────────────────────────────────
//  📝  WORD DEFINITIONS  (مسارات محققة)
// ─────────────────────────────────────────────
const WORD_DEFS = [
  { word: "acceptable",     cells: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]] },
  { word: "diner",          cells: [[1,9],[2,9],[3,9],[4,9],[5,9]] },
  { word: "leftovers",      cells: [[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3]] },
  { word: "fast food",      cells: [[12,1],[11,2],[10,3],[9,4],[8,5],[7,6],[6,7],[5,8]] },
  { word: "offer",          cells: [[4,12],[5,12],[6,12],[7,12],[8,12]] },
  { word: "exhausted",      cells: [[6,14],[7,14],[8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[14,14]] },
  { word: "liver",          cells: [[14,2],[13,3],[12,4],[11,5],[10,6]] },
  { word: "mashed potatoes",cells: [[11,1],[11,2],[11,3],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],[11,10],[11,11],[11,12],[11,13],[11,14]] },
  { word: "unwind",         cells: [[14,6],[14,7],[14,8],[14,9],[14,10],[14,11]] },
];

const WORD_LIST = [
  "exhausted","fast food","leftovers","diner",
  "acceptable","liver","offer","mashed potatoes","unwind",
];

// ─────────────────────────────────────────────
//  🔧  HELPERS
// ─────────────────────────────────────────────
const cellKey = (r, c) => `${r}-${c}`;

const getCellsBetween = (a, b) => {
  if (!a || !b) return [];
  const dr  = b[0] - a[0];
  const dc  = b[1] - a[1];
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [a];
  if (Math.abs(dr) !== 0 && Math.abs(dc) !== 0 && Math.abs(dr) !== Math.abs(dc)) return [a];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([a[0] + sr * i, a[1] + sc * i]);
  return cells;
};

const checkSelection = (cells, foundNames) => {
  if (cells.length === 0) return null;
  const selectedSet = new Set(cells.map(([r, c]) => cellKey(r, c)));
  for (const def of WORD_DEFS) {
    if (foundNames.has(def.word)) continue;
    if (cells.length !== def.cells.length) continue;
    const defSet = new Set(def.cells.map(([r, c]) => cellKey(r, c)));
    if ([...selectedSet].every((k) => defSet.has(k))) return def;
  }
  return null;
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
const WB_Unit3_WordSearch_I = () => {
  const [selecting,   setSelecting]   = useState(false);
  const [startCell,   setStartCell]   = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [foundWords,  setFoundWords]  = useState([]);
  const [wrongFlash,  setWrongFlash]  = useState(false);
  const [answerShown, setAnswerShown] = useState(false);

  const gridRef = useRef(null);

  const foundNames = new Set(foundWords.map((f) => f.word));

  // خريطة cell → colors
  const foundCellMap = {};
  foundWords.forEach(({ cells, color }) => {
    cells.forEach(([r, c]) => {
      const k = cellKey(r, c);
      if (!foundCellMap[k]) foundCellMap[k] = [];
      foundCellMap[k].push(color);
    });
  });

  const selectionCells = getCellsBetween(startCell, hoveredCell);
  const selectionKeys  = new Set(selectionCells.map(([r, c]) => cellKey(r, c)));

  // ── Touch: احسب الـ cell من좌표 ──
  const getCellFromPoint = useCallback((clientX, clientY) => {
    if (!gridRef.current) return null;
    const rect = gridRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const cellW = rect.width  / COLS;
    const cellH = rect.height / ROWS;
    const c = Math.floor(x / cellW);
    const r = Math.floor(y / cellH);
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) return [r, c];
    return null;
  }, []);

  // ── Mouse Handlers ──
  const handleMouseDown  = (r, c) => {
    setSelecting(true);
    setStartCell([r, c]);
    setHoveredCell([r, c]);
  };
  const handleMouseEnter = (r, c) => { if (selecting) setHoveredCell([r, c]); };

  // ── Touch Handlers ──
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const cell = getCellFromPoint(touch.clientX, touch.clientY);
    if (!cell) return;
    setSelecting(true);
    setStartCell(cell);
    setHoveredCell(cell);
  }, [getCellFromPoint]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    if (!selecting) return;
    const touch = e.touches[0];
    const cell = getCellFromPoint(touch.clientX, touch.clientY);
    if (cell) setHoveredCell(cell);
  }, [selecting, getCellFromPoint]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    if (!selecting) return;
    finishSelection();
  }, [selecting, selectionCells, foundNames, foundWords]);

  // ── Finish selection (shared by mouse & touch) ──
  const finishSelection = () => {
    setSelecting(false);
    if (selectionCells.length > 1) {
      const match = checkSelection(selectionCells, foundNames);
      if (match) {
        const color = FOUND_COLORS[foundWords.length % FOUND_COLORS.length];
        setFoundWords((prev) => [...prev, { word: match.word, cells: match.cells, color }]);
      } else {
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 400);
      }
    }
    setStartCell(null);
    setHoveredCell(null);
  };

  const handleMouseUp = () => { if (!selecting) return; finishSelection(); };

  // ── Actions ──
  const handleReset = () => {
    setAnswerShown(false);
    setFoundWords([]);
    setStartCell(null);
    setHoveredCell(null);
    setSelecting(false);
    setWrongFlash(false);
  };

  const handleShowAnswer = () => {
    setAnswerShown(true);
    setFoundWords(
      WORD_DEFS.map((def, i) => ({
        word:  def.word,
        cells: def.cells,
        color: FOUND_COLORS[i % FOUND_COLORS.length],
      }))
    );
  };

  const handleCheck = () => {
    if (answerShown) return;
    if (foundNames.size < WORD_DEFS.length) {
      ValidationAlert.info("Please find all words first.");
    } else {
      ValidationAlert.success(
        `<div style="font-size:18px;text-align:center;"><span style="color:green;font-weight:bold;">Score: ${WORD_DEFS.length} / ${WORD_DEFS.length}</span></div>`
      );
    }
  };

  // ── Cell style ──
  const getCellStyle = (key, isSel, isWrong) => {
    if (isWrong) return { background: "#ffcdd2", color: "#b71c1c" };
    if (isSel)   return { background: "transparent", color: "#1b5e20" };
    const colors = foundCellMap[key];
    if (!colors?.length) return { background: CELL_BG_DEFAULT, color: CELL_TEXT_DEFAULT };
    if (colors.length === 1) return { background: colors[0], color: CELL_TEXT_FOUND };
    const step  = 100 / colors.length;
    const stops = colors.flatMap((c, i) => [
      `${c} ${(i * step).toFixed(1)}%`,
      `${c} ${((i + 1) * step).toFixed(1)}%`,
    ]);
    return { background: `linear-gradient(135deg, ${stops.join(", ")})`, color: CELL_TEXT_FOUND };
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>I</span>
          Find and circle the words.
        </h5>

        {/* Body: grid + word list */}
        <div style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          marginBottom: "3em",
        }}>

          {/* ── Grid ── */}
          <div
            ref={gridRef}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { if (selecting) handleMouseUp(); }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              border: `2px solid ${CELL_BORDER_COLOR}`,
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "crosshair",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "none",
              flexShrink: 0,
            }}
          >
            {GRID.map((row, r) =>
              row.map((letter, c) => {
                const key     = cellKey(r, c);
                const isFound = !!(foundCellMap[key]?.length);
                const isSel   = selectionKeys.has(key) && !isFound;
                const isWrong = isSel && wrongFlash;
                const isSeling = isSel && !wrongFlash;
                const cellStyle = getCellStyle(key, isSeling, isWrong);

                return (
                  <div
                    key={key}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    style={{
                      width:  "clamp(35px, 3.8vw, 35px)",
                      height: "clamp(35px, 3.8vw, 35px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "clamp(11px, 1.4vw, 17px)",
                      fontWeight: "700",
                      borderRight:  c < COLS - 1 ? `1px solid ${CELL_BORDER_COLOR}` : "none",
                      borderBottom: r < ROWS - 1 ? `1px solid ${CELL_BORDER_COLOR}` : "none",
                      transition: "background 0.1s",
                      ...cellStyle,
                      
                    }}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>

          {/* ── Word List ── */}
          <div style={{
            border: `2px solid #000a94ff`,
            borderRadius: "14px",
            padding: "16px 22px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            background:" transparent",
            minWidth: "160px",
            alignSelf: "center",
          }}>
            {WORD_LIST.map((w) => (
              <span
                key={w}
                style={{
                  fontSize: "clamp(13px, 1.5vw, 17px)",
                  fontWeight: "600",
                  color: foundNames.has(w) ? "#aaa" : "#37474f",
                  textDecoration: foundNames.has(w) ? "line-through" : "none",
                  textAlign: "center",
                  transition: "all 0.25s",
                  userSelect: "none",
                }}
              >
                {w}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={handleShowAnswer}>Show Answer</button>
        <button className="check-button2"    onClick={handleCheck}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit3_WordSearch_I;