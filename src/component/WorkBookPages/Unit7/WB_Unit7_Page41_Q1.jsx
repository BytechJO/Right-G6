import React, { useState } from "react";

const ITEMS = [
  { id: 1, prompt: "If I had been born 100 years ago," },
  { id: 2, prompt: "If I had lived in Antarctica,"     },
  { id: 3, prompt: "If I had gone to college when I was eight," },
  { id: 4, prompt: "If I had ordered a 10-scoop ice cream cone," },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const LineInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "16px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
    }}
  />
);

const WB_Unit_ThirdConditional_D = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>D</span>
          If the following things happened to you, write about what you might do.
        </h5>

        <div style={{ display: "flex", flexDirection: "column", gap: "60px", marginBottom: "3em" }}>
          {ITEMS.map(({ id, prompt }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Prompt */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>{id}</span>
                <span style={{ fontSize: "16px", color: "#333" }}>{prompt}</span>
              </div>

              {/* Answer line */}
              <div style={{ paddingLeft: "30px" }}>
                <LineInput
                  value={answers[id]}
                  onChange={(val) => handleChange(id, val)}
                />
              </div>

            </div>
          ))}
        </div>

      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit_ThirdConditional_D;