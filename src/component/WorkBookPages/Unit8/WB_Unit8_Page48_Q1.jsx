import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية
import boyImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 20.svg";

const BLANKS = {
  "1":  { answer: "be riding his bike",                              width: "280px" },
  "2a": { answer: "a lot with his friends and he and his family",    width: "100%" },
  "2b": { answer: "went to the beach",                               width: "360px" },
  "3a": { answer: "to the starting of school so he can see",         width: "100%" },
  "3b": { answer: "many of his friends again",                       width: "360px" },
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  Object.keys(BLANKS).forEach((k) => { a[k] = ""; });
  return a;
};

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({ bKey, value, onChange, isCorrect, isWrong, disabled, width }) => (
  <span style={{ position: "relative", display: "inline-block", verticalAlign: "bottom", width }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(bKey, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
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

// ── FullLineInput — OUTSIDE parent ──
const FullLineInput = ({ bKey, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "block", width: "100%" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(bKey, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
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
const WB_Unit8_ReportedSpeech_G = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev)  => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    if (Object.values(answers).some((v) => !v.trim())) {
      ValidationAlert.info("Please complete all answers."); return;
    }
    let correct = 0;
    const nr = {};
    Object.entries(BLANKS).forEach(([key, { answer }]) => {
      const ok = normalize(answers[key]) === normalize(answer);
      if (ok) correct++;
      nr[key] = ok;
    });
    setResult(nr);
    const total = Object.keys(BLANKS).length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    Object.entries(BLANKS).forEach(([key, { answer }]) => { a[key] = answer; r[key] = true; });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  const B = (key, width) => (
    <InlineInput
      bKey={key}
      value={answers[key]}
      onChange={handleChange}
      isCorrect={result[key] === true}
      isWrong={result[key] === false}
      disabled={locked || result[key] === true}
      width={width}
    />
  );

  const BFull = (key) => (
    <FullLineInput
      bKey={key}
      value={answers[key]}
      onChange={handleChange}
      isCorrect={result[key] === true}
      isWrong={result[key] === false}
      disabled={locked || result[key] === true}
    />
  );

  const lineStyle = { fontSize: "17px", lineHeight: "1.6", color: "#333" };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          Read the conversation, and then complete the sentences below. They are written in{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>reported speech</span>.
        </h5>

        {/* Conversation + Image */}
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "20px" }}>
          {/* Dialogue */}
          <div style={{ flex: 1, fontSize: "16px", lineHeight: "1.75", color: "#333" }}>
            {[
              { speaker: "John:", text: "I'll be riding my bike to school. What about you?" },
              { speaker: "Mike:", text: "I'll be walking to school in the fall. In the winter, I might start taking the bus." },
              { speaker: "John:", text: "I'm looking forward to the starting of school, so I can see many of my friends again." },
              { speaker: "Mike:", text: "Yes, I like to see my friends, but I don't like all the work we get. I like my summers too much!" },
              { speaker: "John:", text: "Yes, summer is nice, but vacation all the time would be boring." },
              { speaker: "Mike:", text: "Hmm. I never thought of it that way." },
              { speaker: "John:", text: "What did you do this summer?" },
              { speaker: "Mike:", text: "I played soccer a lot with my friends, and my family and I went to the beach." },
              { speaker: "John:", text: "Oh, that sounds like fun. I took music lessons, and I got to play in a band. It was very fun! We played music at some baseball games." },
              { speaker: "Mike:", text: "That must have been very interesting! Maybe you could play at the school one time." },
            ].map((line, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "2px" }}>
                <span style={{ fontWeight: "bold", minWidth: "44px", flexShrink: 0 }}>{line.speaker}</span>
                <span>{line.text}</span>
              </div>
            ))}
          </div>

          {/* Boy Image */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={boyImg}
              alt="boy with bike helmet"
              style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "6px" }}
            />
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "3em" }}>

          {/* Q1: single line */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ ...lineStyle, display: "flex", alignItems: "flex-end", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontWeight: "bold" }}>1</span>
              <span>John said he would</span>
              {B("1", "280px")}
              <span>to school.</span>
            </div>
          </div>

          {/* Q2: two lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ ...lineStyle, display: "flex", alignItems: "flex-end", gap: "6px", flexWrap: "wrap" }}>
            <div style={{ ...lineStyle, display: "flex", alignItems: "flex-end", gap: "6px", flexWrap: "wrap" }}>

              <span style={{ fontWeight: "bold" }}>2</span>
              <span>Mike said he played soccer</span>
              {B("2a")}
            </div>
            </div>

            <div style={{ ...lineStyle, display: "flex", alignItems: "flex-end", gap: "6px", paddingLeft: "20px" }}>
              {B("2b", "360px")}
              <span>and he went to the beach.</span>
            </div>
          </div>

          {/* Q3: two lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ ...lineStyle, display: "flex", alignItems: "flex-end", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontWeight: "bold" }}>3</span>
              <span>John said that he is looking forward</span>
              {B("3a" , "280px")}
            </div>
            <div style={{ ...lineStyle, display: "flex", alignItems: "flex-end", gap: "6px", paddingLeft: "20px" }}>
              {B("3b", "360px")}
              <span>many of his friends again.</span>
            </div>
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

export default WB_Unit8_ReportedSpeech_G;