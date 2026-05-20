import React, { useState } from "react";

const EXAMPLE = [
  "At first I was so nervous when I was giving the speech that I thought I would faint.",
  "Later, when I remembered what my teacher had told me, I became more confident.",
];

const questions = [
  

  { id: 1, words: "nervous   confident",  lines: 3 },

  { id: 2, words: "risky  safe",  lines: 3 },
  { id: 3, words: "terrified  calm", lines: 3 },
];

const WB_Unit2_Page12_F = () => {
  const init = () => {
    const a = {};
    questions.forEach((q) => { a[q.id] = Array(q.lines).fill(""); });
    return a;
  };
  const [answers, setAnswers] = useState(init);

  const handleChange = (id, lineIdx, value) => {
    setAnswers((prev) => {
      const arr = [...prev[id]]; arr[lineIdx] = value;
      return { ...prev, [id]: arr };
    });
  };

  const handleReset = () => setAnswers(init());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>F</span>
          Use the word pairs that are opposites to make a sentence or sentences. Use <strong style={ {color : "orange"}}>so</strong> and <strong style={ {color : "orange"}}>such</strong>.{" "}

        </h5>

        <div className="flex flex-col gap-8 mb-12" style={{ fontSize: "18px" }}>

          {/* Q2, Q3 */}
          {questions.map((q) => (
            <div key={q.id} className="flex flex-col gap-5">
              <div className="flex items-baseline gap-2">
                <span className="font-bold" style={{ minWidth: "20px" }}>{q.id}</span>
                <span style={{ fontWeight: "500" }}>{q.words}:</span>
                <input
                  type="text"
                  value={answers[q.id][0]}
                  onChange={(e) => handleChange(q.id, 0, e.target.value)}
                  style={{
                    flex: 1, border: "none",
                    borderBottom: "1.5px solid #999",
                    outline: "none", background: "transparent",
                    fontSize: "18px", color: "#333", paddingBottom: "3px",
                  }}
                />
              </div>
              {answers[q.id].slice(1).map((val, li) => (
                <input
                  key={li}
                  type="text"
                  value={val}
                  onChange={(e) => handleChange(q.id, li + 1, e.target.value)}
                  style={{
                    width: "100%", border: "none",
                    borderBottom: "1.5px solid #999",
                    outline: "none", background: "transparent",
                    fontSize: "18px", color: "#333",
                    paddingBottom: "3px", marginLeft: "28px",
                    boxSizing: "border-box",
                  }}
                />
              ))}
            </div>
          ))}

        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page12_F;