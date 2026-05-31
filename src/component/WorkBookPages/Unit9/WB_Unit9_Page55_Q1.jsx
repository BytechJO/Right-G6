import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية (الـ diagram كاملاً)
import diagramImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 25 (2).svg";

const BORDER = "#84ad40";

const PEOPLE = ["Mark","Rachel","John","Dan","Steven","Ellen","Diane","Sue"];
const CONTINENTS = ["Asia","Europe","Africa","North America","South America","Australia"];

// الإجابات الصحيحة من الكتاب
const CORRECT_CHECKS = {
  Mark:    { Asia:false, Europe:true,  Africa:false, "North America":true,  "South America":false, Australia:false },
  Rachel:  { Asia:true,  Europe:true,  Africa:true,  "North America":true,  "South America":true,  Australia:false },
  John:    { Asia:true,  Europe:true,  Africa:false, "North America":false, "South America":true,  Australia:true  },
  Dan:     { Asia:true,  Europe:true,  Africa:true,  "North America":true,  "South America":true,  Australia:true  },
  Steven:  { Asia:false, Europe:true,  Africa:false, "North America":false, "South America":false, Australia:true  },
  Ellen:   { Asia:false, Europe:true,  Africa:false, "North America":true,  "South America":false, Australia:false },
  Diane:   { Asia:true,  Europe:true,  Africa:true,  "North America":false, "South America":true,  Australia:false },
  Sue:     { Asia:false, Europe:false, Africa:true,  "North America":true,  "South America":false, Australia:false },
};

const QUESTIONS = [
  { id:1, q:"Who has been to all the continents listed?",  answer:"Dan"                      },
  { id:2, q:"Who has been to the fewest continents?",      answer:"Mark and Sue"             },
  { id:3, q:"Who has not been to Asia?",                   answer:"Mark, Steven, Ellen, and Sue" },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initChecks = () => {
  const c = {};
  PEOPLE.forEach(p => {
    c[p] = {};
    CONTINENTS.forEach(cont => { c[p][cont] = false; });
  });
  // Mark row prefilled (Europe + North America)
  c["Mark"]["Europe"] = true;
  c["Mark"]["North America"] = true;
  return c;
};

const initAnswers = () => ({ 1:"", 2:"", 3:"" });

// ── QInput — OUTSIDE parent ──
const QInput = ({ qId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position:"relative", display:"inline-block", flex:1 }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width:"100%",
        border:"none",
        borderBottom:`1.5px solid ${isWrong?"#D1232A":"#555"}`,
        outline:"none",
        background:"transparent",
        fontSize:"15px",
        color: isCorrect?"#c0392b": isWrong?"#D1232A":"#333",
        fontWeight: isCorrect?"600":"400",
        paddingBottom:"2px",
        fontFamily:"inherit",
      }}
    />
    {isWrong && (
      <span style={{
        position:"absolute",top:"-7px",right:"-7px",
        width:"14px",height:"14px",background:"#ef4444",color:"white",
        borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:"9px",fontWeight:"bold",border:"2px solid white",
        boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

const WB_Unit9_TravelSurvey_H = () => {
  const [checks,  setChecks]  = useState(initChecks);
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [checked, setChecked] = useState(false);
  const [locked,  setLocked]  = useState(false);

  // Mark row is prefilled — those cells are disabled
  const isPrefilledCell = (person, cont) =>
    person === "" && (cont === "" || cont === "");

  const toggleCell = (person, cont) => {
    if (locked || isPrefilledCell(person, cont)) return;
    setChecks(prev => ({
      ...prev,
      [person]: { ...prev[person], [cont]: !prev[person][cont] }
    }));
  };

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers(prev => ({ ...prev, [id]: value }));
    setResult(prev => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    // Check table
    let tableCorrect = true;
    PEOPLE.forEach(p => {
      CONTINENTS.forEach(cont => {
        if (checks[p][cont] !== CORRECT_CHECKS[p][cont]) tableCorrect = false;
      });
    });

    // Check questions
    const hasEmpty = Object.values(answers).some(v => !v.trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all questions."); return; }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    setChecked(true);

    if (!tableCorrect) {
      ValidationAlert.warning(`<div style="font-size:17px;text-align:center;">Check your table — some cells are incorrect.</div>`);
      return;
    }

    const total = QUESTIONS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    // Fill table
    const c = {};
    PEOPLE.forEach(p => {
      c[p] = { ...CORRECT_CHECKS[p] };
    });
    setChecks(c);
    // Fill questions
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true); setChecked(true);
  };

  const handleReset = () => {
    setChecks(initChecks()); setAnswers(initAnswers());
    setResult({}); setChecked(false); setLocked(false);
  };

  // Cell color based on check state
  const getCellBg = (person, cont) => {
    if (!checked) return "transparent";
    const userVal = checks[person][cont];
    const corrVal = CORRECT_CHECKS[person][cont];
    if (userVal === corrVal) return corrVal ? "#e8f5d0" : "transparent";
    return "#ffeaea"; // wrong
  };

  const colW = "68px";

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A" style={{ marginRight:"10px" }}>H</span>
          Read the information below and complete the activity.
        </h5>

        {/* Diagram image */}
        <div style={{ marginBottom:"16px" }}>
          <img src={diagramImg} alt="travel diagram"
            style={{ width:"100%", height:"auto", objectFit:"contain", display:"block" }} />
        </div>

        {/* Instruction */}
        <p style={{ fontSize:"14px", color:"#333", marginBottom:"12px" }}>
          From the information above, complete the chart below in a similar way as in Exercise G.
          The first one has been done for you.
        </p>

        {/* Table */}
        <div style={{ overflowX:"auto", marginBottom:"24px" }}>
          <table style={{ borderCollapse:"collapse", width:"100%", minWidth:"520px" }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width:"80px" }}></th>
                {CONTINENTS.map(cont => (
                  <th key={cont} style={{ ...thStyle, width:colW, fontSize:"12px", lineHeight:"1.3" }}>
                    {cont}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PEOPLE.map((person, pi) => (
                <tr key={person}>
                  <td style={{ ...tdStyle, background:"#e8f5d0", fontWeight:"600", fontSize:"14px", paddingLeft:"8px" }}>
                    {person}
                  </td>
                  {CONTINENTS.map(cont => {
                    const isChecked = checks[person][cont];
                    const bg = getCellBg(person, cont);
                    return (
                      <td
                        key={cont}
                        onClick={() => toggleCell(person, cont)}
                        style={{
                          ...tdStyle,
                          background: bg,
                          cursor:  locked ? "default" : "pointer",
                          textAlign:"center",
                          fontSize:"18px",
                          color: isChecked ?  "#ff0000ff" : "transparent" 
                          ,
                          userSelect:"none",
                          transition:"background 0.15s",
                        }}
                      >
                        {isChecked ? "✓" : "·"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Questions */}
        <div style={{ display:"flex", flexDirection:"column", gap:"16px", marginBottom:"3em" }}>
          {QUESTIONS.map(({ id, q }) => {
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <div key={id} style={{ display:"flex", alignItems:"flex-end", gap:"8px", fontSize:"15px" }}>
                <span style={{ fontWeight:"bold", minWidth:"16px" }}>{id}</span>
                <span style={{ whiteSpace:"nowrap" }}>{q}</span>
                <QInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  disabled={locked || isCorrect}
                />
              </div>
            );
          })}
        </div>

      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

const thStyle = {
  border:`1px solid ${BORDER}`,
  background:"#e8f5d0",
  padding:"6px 4px",
  textAlign:"center",
  fontWeight:"bold",
  fontSize:"13px",
};

const tdStyle = {
  border:`1px solid ${BORDER}`,
  padding:"6px 4px",
  minWidth:"50px",
  height:"36px",
};

export default WB_Unit9_TravelSurvey_H;