import React, { useState, useRef, useCallback } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";
const CELL = 36;

const GRID = [
  ["g","p","i","k","y","f","o","e","p","a","h","s","e","h","t","n","i","s","s","x"],
  ["c","o","m","e","i","n","h","a","n","d","y","p","j","d","i","i","b","e","h","m"],
  ["h","a","k","e","a","k","a","n","i","s","b","q","k","g","j","c","z","g","o","u"],
  ["x","e","l","f","z","g","a","w","i","n","d","t","x","g","u","o","m","q","w","u"],
  ["o","o","r","p","b","v","r","l","e","d","y","o","y","y","f","w","i","p","u","g"],
  ["u","z","k","e","i","t","u","e","w","m","n","x","w","k","l","n","n","o","p","i"],
  ["g","n","z","h","y","s","g","y","a","w","c","y","e","w","p","f","a","j","v","l"],
  ["a","w","r","g","b","o","a","t","g","t","t","y","a","x","l","a","g","h","w","e"],
  ["a","q","v","w","u","b","u","n","p","l","i","u","k","c","j","u","e","c","m","k"],
  ["y","f","r","p","c","j","i","a","r","i","z","d","j","y","g","w","s","d","r","z"],
  ["g","z","u","b","e","g","a","i","r","p","q","c","e","v","z","s","n","t","a","n"],
  ["m","a","e","n","q","l","j","s","q","e","o","t","s","a","g","e","u","x","f","c"],
];

const ROWS = GRID.length;
const COLS = GRID[0].length;

const WORD_DEFS = [
  { word: "in ages",       cells: [[4,16],[5,16],[6,16],[7,16],[8,16],[9,16]] },
  { word: "Here you are!", cells: [[2,0],[3,1],[4,2],[5,3],[6,4],[7,5],[8,6],[9,7],[10,8],[11,9]] },
  { word: "show up",       cells: [[0,18],[1,18],[2,18],[3,18],[4,18],[5,18]] },
  { word: "come in handy", cells: [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10]] },
  { word: "a great idea",  cells: [[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[10,12],[11,13]] },
];

const WORD_LIST = ["in ages","Here you are!","show up","come in handy","a great idea"];

const FOUND_COLORS = ["#e53935","#e67e22","#43a047","#1e88e5","#8e24aa"];

const cellKey = (r,c) => `${r}-${c}`;

const getCellsBetween = (a, b) => {
  if (!a||!b) return [];
  const dr=b[0]-a[0], dc=b[1]-a[1];
  const len=Math.max(Math.abs(dr),Math.abs(dc));
  if (len===0) return [a];
  if (Math.abs(dr)!==0&&Math.abs(dc)!==0&&Math.abs(dr)!==Math.abs(dc)) return [a];
  const sr=dr===0?0:dr/Math.abs(dr), sc=dc===0?0:dc/Math.abs(dc);
  const cells=[];
  for(let i=0;i<=len;i++) cells.push([a[0]+sr*i,a[1]+sc*i]);
  return cells;
};

const checkSelection = (cells, foundNames) => {
  if (!cells.length) return null;
  const sel = new Set(cells.map(([r,c])=>cellKey(r,c)));
  for (const def of WORD_DEFS) {
    if (foundNames.has(def.word)) continue;
    if (cells.length!==def.cells.length) continue;
    const defSet = new Set(def.cells.map(([r,c])=>cellKey(r,c)));
    if ([...sel].every(k=>defSet.has(k))) return def;
  }
  return null;
};

const WB_Unit8_WordSearch_J = () => {
  const [selecting,   setSelecting]   = useState(false);
  const [startCell,   setStartCell]   = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [foundWords,  setFoundWords]  = useState([]);
  const [wrongFlash,  setWrongFlash]  = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const gridRef = useRef(null);

  const foundNames = new Set(foundWords.map(f=>f.word));

  const foundCellMap = {};
  foundWords.forEach(({cells,color})=>{
    cells.forEach(([r,c])=>{
      const k=cellKey(r,c);
      if(!foundCellMap[k]) foundCellMap[k]=[];
      foundCellMap[k].push(color);
    });
  });

  const selCells = getCellsBetween(startCell, hoveredCell);
  const selKeys  = new Set(selCells.map(([r,c])=>cellKey(r,c)));

  const getCellFromPoint = useCallback((cx,cy)=>{
    if(!gridRef.current) return null;
    const rect=gridRef.current.getBoundingClientRect();
    const x=cx-rect.left, y=cy-rect.top;
    const cw=rect.width/COLS, ch=rect.height/ROWS;
    const c=Math.floor(x/cw), r=Math.floor(y/ch);
    if(r>=0&&r<ROWS&&c>=0&&c<COLS) return [r,c];
    return null;
  },[]);

  const finishSelection = useCallback(()=>{
    setSelecting(false);
    if(selCells.length>1){
      const match=checkSelection(selCells,foundNames);
      if(match){
        const color=FOUND_COLORS[foundWords.length%FOUND_COLORS.length];
        setFoundWords(prev=>[...prev,{word:match.word,cells:match.cells,color}]);
      } else {
        setWrongFlash(true);
        setTimeout(()=>setWrongFlash(false),400);
      }
    }
    setStartCell(null); setHoveredCell(null);
  },[selCells,foundNames,foundWords]);

  const handleMouseDown  = (r,c)=>{ setSelecting(true); setStartCell([r,c]); setHoveredCell([r,c]); };
  const handleMouseEnter = (r,c)=>{ if(selecting) setHoveredCell([r,c]); };
  const handleMouseUp    = ()=>{ if(!selecting) return; finishSelection(); };

  const handleTouchStart = useCallback((e)=>{
    e.preventDefault();
    const t=e.touches[0];
    const cell=getCellFromPoint(t.clientX,t.clientY);
    if(!cell) return;
    setSelecting(true); setStartCell(cell); setHoveredCell(cell);
  },[getCellFromPoint]);

  const handleTouchMove = useCallback((e)=>{
    e.preventDefault();
    if(!selecting) return;
    const t=e.touches[0];
    const cell=getCellFromPoint(t.clientX,t.clientY);
    if(cell) setHoveredCell(cell);
  },[selecting,getCellFromPoint]);

  const handleTouchEnd = useCallback((e)=>{ e.preventDefault(); if(!selecting) return; finishSelection(); },[selecting,finishSelection]);

  const handleReset = ()=>{ setFoundWords([]); setStartCell(null); setHoveredCell(null); setSelecting(false); setWrongFlash(false); setAnswerShown(false); };

  const handleShowAnswer = ()=>{
    setAnswerShown(true);
    setFoundWords(WORD_DEFS.map((def,i)=>({word:def.word,cells:def.cells,color:FOUND_COLORS[i%FOUND_COLORS.length]})));
  };

  const handleCheck = ()=>{
    if(answerShown) return;
    if(foundNames.size<WORD_DEFS.length){ ValidationAlert.info("Please find all expressions first."); return; }
    ValidationAlert.success(`<div style="font-size:18px;text-align:center;"><span style="color:green;font-weight:bold;">Score: ${WORD_DEFS.length} / ${WORD_DEFS.length}</span></div>`);
  };

  const getCellStyle = (key,isSel,isWrong)=>{
    if(isWrong) return { background:"#ffcdd2", color:"#b71c1c" };
    if(isSel)   return { background:"#c8e6c9", color:"#1b5e20" };
    const colors=foundCellMap[key];
    if(!colors?.length) return { background:"transparent", color:"#333" };
    if(colors.length===1) return { background:colors[0], color:"#fff" };
    const step=100/colors.length;
    const stops=colors.flatMap((c,i)=>[`${c} ${(i*step).toFixed(1)}%`,`${c} ${((i+1)*step).toFixed(1)}%`]);
    return { background:`linear-gradient(135deg,${stops.join(",")})`, color:"#fff" };
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight:"10px" }}>J</span>
          Find and circle the expressions.
        </h5>

        {/* Grid */}
        <div
          ref={gridRef}
          onMouseUp={handleMouseUp}
          onMouseLeave={()=>{ if(selecting) handleMouseUp(); }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            display:"grid",
            gridTemplateColumns:`repeat(${COLS},1fr)`,
            border:`2px solid ${BORDER}`,
            borderRadius:"10px",
            overflow:"hidden",
            cursor:"crosshair",
            userSelect:"none",
            WebkitUserSelect:"none",
            touchAction:"none",
            marginBottom:"20px",
          }}
        >
          {GRID.map((row,r)=>row.map((letter,c)=>{
            const key=cellKey(r,c);
            const isFound=!!(foundCellMap[key]?.length);
            const isSel=selKeys.has(key)&&!isFound;
            const isWrong=isSel&&wrongFlash;
            const isSeling=isSel&&!wrongFlash;
            const st=getCellStyle(key,isSeling,isWrong);
            return (
              <div
                key={key}
                onMouseDown={()=>handleMouseDown(r,c)}
                onMouseEnter={()=>handleMouseEnter(r,c)}
                style={{
                  aspectRatio:"1",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"clamp(9px,1.1vw,15px)", fontWeight:"600",
                  borderRight:c<COLS-1?`1px solid ${BORDER}`:"none",
                  borderBottom:r<ROWS-1?`1px solid ${BORDER}`:"none",
                  transition:"background 0.1s",
                  ...st,
                }}
              >{letter}</div>
            );
          }))}
        </div>

        {/* Word List */}
        <div style={{
          border:`1.5px solid ${BORDER}`,
          borderRadius:"8px",
          padding:"14px 24px",
          marginBottom:"3em",
          fontSize:"16px",
          display:"flex",
          flexDirection:"column",
          gap:"10px",
          background:"#fff",
        }}>
          {/* Row 1: in ages | Here you are! | show up */}
          <div style={{ display:"flex", gap:"40px" }}>
            {["in ages","Here you are!","show up"].map((w)=>(
              <span key={w} style={{
                color: foundNames.has(w) ? "#aaa" : "#333",
                textDecoration: foundNames.has(w) ? "line-through" : "none",
                fontWeight:"500", transition:"all .25s", flex:1,
              }}>{w}</span>
            ))}
          </div>
          {/* Row 2: come in handy | a great idea */}
          <div style={{ display:"flex", gap:"40px" }}>
            {["come in handy","a great idea"].map((w)=>(
              <span key={w} style={{
                color: foundNames.has(w) ? "#aaa" : "#333",
                textDecoration: foundNames.has(w) ? "line-through" : "none",
                fontWeight:"500", transition:"all .25s", flex:1,
              }}>{w}</span>
            ))}
            <span style={{ flex:1 }} />
          </div>
        </div>

      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={handleShowAnswer}>Show Answer</button>
        <button className="check-button2"    onClick={handleCheck}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit8_WordSearch_J;