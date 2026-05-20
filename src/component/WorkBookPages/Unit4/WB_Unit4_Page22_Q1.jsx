import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page8_H = () => {
  const questions = [
    { id: 1, text: "I an item that is old enough to be put in a special category",        answer: "c" },
    { id: 2, text: "a person who shoots a bow and arrow",                  answer: "e" },
    { id: 3, text: "a group of items, usually of the same type",   answer: "b" },
    { id: 4, text: "making clothes or other items by hand",       answer: "a" },
    { id: 5, text: " items that one buys while traveling to keep or to give to friends as a memory of the place(s) visited", answer: "d" },
  ];

  const responses = [
    { label: "a", text: "sewing" },
    { label: "b", text: "collection" },
    { label: "c", text: "antique" },
    { label: "d", text: "souvenirs" },
    { label: "e", text: "archer" },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [result, setResult]   = useState([]);
  const [locked, setLocked]   = useState(false);
  const inputsRef = useRef({});

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = value.toLowerCase();
    setAnswers(updated);
    setResult((prev) => { const c = [...prev]; c[i] = undefined; return c; });

    // auto move to next
    if (value) {
      const next = inputsRef.current[i + 1];
      if (next) { next.focus(); next.select(); }
    }
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const newResult = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);
      if (ok) correct++;
      return ok;
    });
    setResult(newResult);
    const total = questions.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(questions.map(() => ""));
    setResult([]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>B</span>
         Match each vocabulary word to its definition.

        </h5>

        {/* Two columns */}
        <div className="flex gap-16 text-[18px]">

          {/* LEFT — questions */}
          <div className="flex flex-col gap-10 flex-1">
            {questions.map((q, i) => {
              const isWrong   = result[i] === false;
              const isCorrect = result[i] === true;
              return (
                <div key={q.id} className="flex items-start gap-3">
                  {/* input */}
                  <span className="relative inline-block" style={{ marginTop: "2px" }}>
                    <input
                      ref={(el) => (inputsRef.current[i] = el)}
                      type="text"
                      maxLength={1}
                      value={answers[i]}
                      disabled={locked || isCorrect}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => handleChange(i, e.target.value)}
                      className={`
                        w-[40px] border-0 border-b outline-none bg-transparent
                        text-[18px]  text-center px-1
                        ${isWrong ? "border-[#D1232A]" : "border-black"}
                      `}
                    />
                    {isWrong && (
                      <span style={{
                        position: "absolute", top: "-8px", right: "-6px",
                        width: "18px", height: "18px", background: "#ef4444", color: "white",
                        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: "bold", border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}>✕</span>
                    )}
                  </span>

                  <span className="font-bold min-w-[20px]">{q.id}</span>
                  <span>{q.text}</span>
                </div>
              );
            })}
          </div>

          {/* RIGHT — responses */}
          <div className="flex flex-col gap-10" style={{ minWidth: "300px" }}>
            {responses.map((r) => (
              <div key={r.label} className="flex gap-3">
                <span className="font-bold min-w-[20px]">{r.label}</span>
                <span>{r.text}</span>
              </div>
            ))}
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

export default WB_Unit1_Page8_H;