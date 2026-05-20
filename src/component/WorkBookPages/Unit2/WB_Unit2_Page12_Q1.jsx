import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G6 U2 Folder/SVG/12-cropped.svg"
const questions = [
  {
    id: 1,
    scrambled: "roller again that I to want thrilling coaster was go so the !",
    answer: "The roller coaster was so thrilling that I want to go again.",
  },
  {
    id: 2,
    scrambled: "thought I would faint nervous that I so felt I .",
    answer: "I felt so nervous that I thought I would faint.",
  },
  {
    id: 3,
    scrambled: "I is nice live that wish this a house I could here such .",
    answer: "This is such a nice house that I wish I could live here.",
  },
  {
    id: 4,
    scrambled: "chair asleep was so fell the it comfortable I that in .",
    answer: "The chair was so comfortable that I fell asleep in it.",
  },
  {
    id: 5,
    scrambled: "woman Kara her respected was everyone such that a brave .",
    answer: "Kara was such a brave woman that everyone respected her.",
  },
];

const WB_Unit2_Page12_E = () => {
  const init = () => questions.map(() => "");
  const [answers, setAnswers] = useState(init);
  const [result,  setResult]  = useState([]);
  const [locked,  setLocked]  = useState(false);

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((prev) => { const a = [...prev]; a[i] = value; return a; });
    setResult((prev)  => { const r = [...prev]; r[i] = undefined; return r; });
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correct = 0;
    const nr = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);
      if (ok) correct++;
      return ok;
    });
    setResult(nr);
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

  const handleReset = () => { setAnswers(init()); setResult([]); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>E</span>
          Unscramble and write.
        </h5>

        {/* Questions */}
        <div className="flex flex-col gap-8 ">
          {questions.map((q, i) => {
            const isWrong   = result[i] === false;
            const isCorrect = result[i] === true;
            return (
              <div key={q.id} className="flex flex-col gap-2">

                {/* Scrambled words */}
                <div className="flex items-start gap-3" style={{ fontSize: "18px", color: "#444" }}>
                  <span className="font-bold" style={{ minWidth: "20px" }}>{q.id}</span>
                  <span>{q.scrambled}</span>
                </div>

                {/* Answer input */}
                <div style={{ paddingLeft: "28px" }}>
                  <span className="relative inline-block" style={{ width: "100%" }}>
                    <input
                      type="text"
                      value={answers[i]}
                      disabled={locked || isCorrect}
                      onChange={(e) => handleChange(i, e.target.value)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#999"}`,
                        outline: "none",
                        background: "transparent",
                        fontSize: "18px",
                        color: "#333",
                        paddingBottom: "3px",
                      }}
                    />
                    {isWrong && (
                      <span style={{
                        position: "absolute", top: "-8px", right: "-8px",
                        width: "18px", height: "18px", background: "#ef4444", color: "white",
                        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: "bold", border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}>✕</span>
                    )}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
  {/* Image */}
        <img
          src={img}
          alt="Spain coast"
          style={{
            width: "60%",
            height : "auto" ,
            alignSelf : "center",
            margin : "2em 0"
          }}
        />

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

export default WB_Unit2_Page12_E;