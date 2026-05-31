import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية
import girlsImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 2.svg";

const QUESTIONS = [
  { id: 1,  scrambled: "csaracterh",  word: "characters", match: "j" },
  { id: 2,  scrambled: "loven",       word: "novel",      match: "c" },
  { id: 3,  scrambled: "pcahtre",     word: "chapter",    match: "a" },
  { id: 4,  scrambled: "scsudis",     word: "discuss",    match: "d" },
  { id: 5,  scrambled: "gdisaens",    word: "assigned",   match: "f" },
  { id: 6,  scrambled: "msatcselas",  word: "classmates", match: "h" },
  { id: 7,  scrambled: "esrpehap",    word: "perhaps",    match: "b" },
  { id: 8,  scrambled: "edla",        word: "deal",       match: "g" },
  { id: 9,  scrambled: "imna",        word: "main",       match: "e" },
  { id: 10, scrambled: "casitdtr",    word: "distract",   match: "i" },
];

const SECTION_B = [
  { label: "a", word: "chapter"    },
  { label: "b", word: "perhaps"    },
  { label: "c", word: "novel"      },
  { label: "d", word: "discuss"    },
  { label: "e", word: "main"       },
  { label: "f", word: "assigned"   },
  { label: "g", word: "deal"       },
  { label: "h", word: "classmates" },
  { label: "i", word: "distract"   },
  { label: "j", word: "characters" },
];


const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();


const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id }) => {  a[`${id}-m`] = ""; });
  return a;
};

// ── WordInput — OUTSIDE parent ──
const WordInput = ({ fKey, value, onChange, isCorrect, isWrong, disabled, width = "140px" }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(fKey, e.target.value)}
      style={{
        width,
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color:  "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
        marginLeft: "35vh",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-7px", right: "-7px",
        width: "14px", height: "14px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit9_UnscrambleMatch_C = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value.toLowerCase() }));
    setResult((prev)  => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = Object.values(answers).some((v) => !v.trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, word, match }) => {
      const wKey = `${id}-w`, mKey = `${id}-m`;
      const mOk = normalize(answers[mKey]) === normalize(match);
      if (mOk) correct++;
      nr[mKey] = mOk;
    });
    setResult(nr);
    const total = QUESTIONS.length * 1;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, word, match }) => {
      a[`${id}-w`] = word; a[`${id}-m`] = match;
      r[`${id}-w`] = true; r[`${id}-m`] = true;
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8 " style={{ whiteSpace : "nowrap" }}>
          <span className="ex-A" style={{ marginRight: "10px" }}>C</span>
          Unscramble the words in section A. Then match with the same words in section B.
        </h5>

        {/* Two columns layout */}
        <div style={{ display: "flex", gap: "32px", marginBottom: "24px", alignItems: "flex-start" }}>

          {/* Section A */}
          <div style={{ flex: 1 }}>
            <div style={{ 
               fontWeight: "bold", fontSize: "22px", marginBottom: "12px", marginLeft: "8vh" }}>A</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {QUESTIONS.map(({ id, scrambled }) => {
                const wKey = `${id}-w`;
                const mKey = `${id}-m`;
                const wCorrect = result[wKey] === true;
                const wWrong   = result[wKey] === false;
                const mCorrect = result[mKey] === true;
                const mWrong   = result[mKey] === false;
                return (
                  <div key={id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "18px",
                  }}>
                    <span style={{ fontWeight: "bold", minWidth: "24px" }}>{id}</span>
                    <span style={{ minWidth: "110px", color: "#333" }}>{scrambled}</span>
                    {/* Word input */}

                  
                    {/* Match input */}
                    <WordInput
                      fKey={mKey}
                      value={answers[mKey]}
                      onChange={handleChange}
                      isCorrect={mCorrect}
                      isWrong={mWrong}
                      disabled={locked || mCorrect}
                      width="36px"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section B */}
          <div style={{ minWidth: "160px" }}>
            <div style={{ textAlign: "start", fontWeight: "bold", fontSize: "22px", marginBottom: "12px", marginLeft: "7vh" }}>B</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {SECTION_B.map(({ label, word }) => (
                <div key={label} style={{ display: "flex", gap: "8px", fontSize: "18px", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", minWidth: "16px" }}>{label}</span>
                  <span>{word}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Girls Image */}
        <div style={{ display: "flex", justifyContent: "center", margin: "1em 0 5em" }}>
          <img
            src={girlsImg}
            alt="students"
            style={{
              width: "60%",
              maxWidth: "400px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
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

export default WB_Unit9_UnscrambleMatch_C;