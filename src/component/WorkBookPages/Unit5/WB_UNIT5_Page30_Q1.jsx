import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية
import singerImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/3.svg";

const QUESTIONS = [
  { id: 1, text: "The singer started singing at an early age, didn't she?", answer: "Yes, she did.",      prefilled: false },
  { id: 2, text: "She started at a school talent show, didn't she?",        answer: "Yes, she did.",      prefilled: false },
  { id: 3, text: "She couldn't miss school for her singing, could she?",    answer: "No, she couldn't.", prefilled: false },
  { id: 4, text: "She didn't want to start a singing career at an early age, did she?", answer: "Yes, she did.", prefilled: false },
  { id: 5, text: "She could record CDs during school vacations, couldn't she?", answer: "Yes, she could.", prefilled: false },
  { id: 6, text: "She sings rock and roll music, doesn't she?",             answer: "No, she doesn't.",  prefilled: false },
];

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''’']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ qId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "inline-block", flex: 1 }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "15px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "15px", height: "15px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit5_Interview_H = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev)  => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = Object.values(answers).some((v) => !v.trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    QUESTIONS.forEach(({ id, answer }) => { a[id] = answer; r[id] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A" style={{ marginRight: "10px" }}>H</span>
          Read the interview, and then answer the questions.
        </h5>

        {/* Interview text */}
        <div style={{ fontSize: "14px", lineHeight: "1.75", color: "#333", marginBottom: "20px" }}>

          {[
            { speaker: "Interviewer:", text: "So you started your singing career at a school talent show, didn't you?" },
            { speaker: "Singer:",      text: "Yes, I did. I was only eight years old at the time, so I wasn't afraid to stand up and sing. I thought the audience would laugh, but they actually clapped and cheered. What a surprise that was!" },
            { speaker: "Interviewer:", text: "But you didn't try to start a singing career for a while, did you?" },
            { speaker: "Singer:",      text: "No, I didn't. I was just interested in riding my bike and playing with my friends. People would ask me to sing for school shows, but I didn't think much of it at the time." },
            { speaker: "Interviewer:", text: "You could sing a high C when you were 16 years old, couldn't you?" },
            { speaker: "Singer:",      text: "Yes, I could. I was asked to sing our national song at a high school football game, and it had a high C. I practiced very hard, and I made it! After that, the recording studio in town asked me to record a CD. I tried it, and it sold a lot of copies!" },
            { speaker: "Interviewer:", text: "Your parents probably didn't want you to miss school, did they?" },
            { speaker: "Singer:",      text: "Definitely not! But I could practice songs in my free time and record a CD during the school vacations. During the first summer after I started recording, I recorded three CDs in one summer." },
          ].map((line, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontWeight: "bold", minWidth: "90px", flexShrink: 0 }}>{line.speaker}</span>
              <span>{line.text}</span>
            </div>
          ))}

          {/* Singer image + last lines */}
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginTop: "4px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              {[
                { speaker: "Interviewer:", text: "That was the summer you started selling CDs nationally, wasn't it?" },
                { speaker: "Singer:",      text: "Yes, it was. Before that I had only sold them near my hometown. When I started selling them nationally, I was surprised at the number I had sold." },
                { speaker: "Interviewer:", text: "Folk music is your favorite, isn't it?" },
                { speaker: "Singer:",      text: "Yes it is. Soon I hope to sing folk songs from other countries as well." },
                { speaker: "Interviewer:", text: "It's been very nice to learn about your music. Do we get to hear you sing today?" },
                { speaker: "Singer:",      text: "Certainly. I'd be happy to." },
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "8px" }}>
                  <span style={{ fontWeight: "bold", minWidth: "90px", flexShrink: 0 }}>{line.speaker}</span>
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
            {/* Singer image */}
            <img
              src={singerImg}
              alt="singer"
              style={{ width: "20%", height: "auto", objectFit: "contain", flexShrink: 0 }}
            />
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, text }) => {
            const isCorrect = result[id] === true;
            const isWrong   = result[id] === false;
            return (
              <div key={id} style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                fontSize: "15px",
              }}>
                <span style={{ fontWeight: "bold", minWidth: "18px" }}>{id}</span>
                <span style={{ whiteSpace: "nowrap" }}>{text}</span>
                <InlineInput
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

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit5_Interview_H;