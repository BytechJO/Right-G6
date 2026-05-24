import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WORD_BANK = [
  "to tell you the truth",
  "Have fun",
  "That's fine with me",
  "stay close",
  "keep an eye on",
];

const BLANKS = {
  1: { answer: "to tell you the truth", width: "220px" },
  2: { answer: "keep an eye on",        width: "190px" },
  3: { answer: "stay close",            width: "150px" },
  4: { answer: "It's fine with me",     width: "220px" },
  5: { answer: "Have fun",              width: "160px" },
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  Object.keys(BLANKS).forEach(k => { a[k] = ""; });
  return a;
};

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bId, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position:"relative",  verticalAlign:"bottom" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={e => onChange(bId, e.target.value)}
      style={{
        width,
        border:"none",
        borderBottom:`1px solid ${isWrong?"#D1232A":"#555"}`,
        outline:"none",
        background:"transparent",
        fontSize:"17px",
        color: isCorrect?"#c0392b": isWrong?"#D1232A":"#333",
        fontWeight: isCorrect?"600":"400",
        paddingBottom:"2px",
        fontFamily:"inherit",
        textAlign:"center",
      }}
    />
    {isWrong && (
      <span style={{
        position:"absolute", top:"-8px", right:"-8px",
        width:"16px", height:"16px", background:"#ef4444", color:"white",
        borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"10px", fontWeight:"bold", border:"2px solid white",
        boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit10_FillExpression_B = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
    setResult(prev  => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    if (Object.values(answers).some(v => !v.trim())) {
      ValidationAlert.info("Please complete all blanks."); return;
    }
    let correct = 0;
    const nr = {};
    Object.entries(BLANKS).forEach(([id, { answer }]) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = Object.keys(BLANKS).length;
    const color = correct===total?"green": correct===0?"red":"orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct===total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct===0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}, r = {};
    Object.entries(BLANKS).forEach(([id, { answer }]) => { a[id]=answer; r[id]=true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  const B = (id) => (
    <InlineInput
      bId={id}
      value={answers[id]}
      onChange={handleChange}
      isCorrect={result[id]===true}
      isWrong={result[id]===false}
      disabled={locked || result[id]===true}
      width={BLANKS[id].width}
    />
  );

  const pStyle = {
    fontSize:"17px",
    lineHeight:"2.4",
    color:"#333",
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight:"10px" }}>B</span>
          Fill in each blank with the correct expression.
        </h5>

        {/* Word Bank — 2 rows matching book layout */}
        <div style={{ marginBottom:"24px",marginTop:"10vh", display:"flex", flexDirection:"column", alignItems:"center", gap:"24px" }}>
          {/* Row 1: 3 pills */}
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", justifyContent:"center" }}>
            {["to tell you the truth","Have fun","That's fine with me"].map(w => (
              <span key={w} style={{
                border:"2px solid #84ad40", borderRadius:"15px",
                padding:"6px 20px", fontSize:"16px", color:"#333", background:"#fff",
                whiteSpace:"nowrap",
              }}>{w}</span>
            ))}
          </div>
          {/* Row 2: 2 pills */}
          <div style={{ display:"flex", gap:"24px", flexWrap:"wrap", justifyContent:"center" }}>
            {["stay close","keep an eye on"].map(w => (
              <span key={w} style={{
                border:"2px solid #84ad40", borderRadius:"15px",
                padding:"6px 20px", fontSize:"16px", color:"#333", background:"#fff",
                whiteSpace:"nowrap",
              }}>{w}</span>
            ))}
          </div>
        </div>

        {/* Paragraph */}
        <div style={{ ...pStyle, marginBottom:"3em" }}>
          I have a little brother. He's sometimes hard to handle, {B(1)}.{" "}
          I have to {B(2)} him to make sure that he doesn't play with
          other people's things. I tell him to {B(3)}{" "}
          to me, but he still tries to go far. {B(4)},{" "}
          as long as he doesn't get hurt. He likes walking with me to the gym. We play
          all kinds of sports in the gym. My mom likes seeing us go to the gym. Before
          we leave she always tells us, "{B(5)}!"
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

export default WB_Unit10_FillExpression_B;