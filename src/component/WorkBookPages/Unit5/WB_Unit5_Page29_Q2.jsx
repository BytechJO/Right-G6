import React, { useState } from "react";

const ITEMS = [
  { id: 1, prefilled:null },
  { id: 2, prefilled: null },
  { id: 3, prefilled: null },
  { id: 4, prefilled: null },
  { id: 5, prefilled: null },
  { id: 6, prefilled: null },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id, prefilled }) => { a[id] = prefilled || ""; });
  return a;
};

// ── FreeInput — OUTSIDE parent ──
const FreeInput = ({ qId, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(qId, e.target.value)}
    style={{
      flex: 1,
      border: "none",
      borderBottom: "1px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      minWidth: 0,
      textDecoration: disabled ? "underline" : "none",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit5_ShortAnswer_F = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  // جدول 2 عمود: [1,2] [3,4] [5,6]
  const pairs = [[1, 2], [3, 4], [5, 6]];

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>F</span>
          For each of the sentences in Exercise E, write a short answer. You can decide if the
          answer is{" "}
          <span style={{ color: "#84ad40", fontWeight: "bold" }}>yes</span> or{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>no</span>, but the verb must
          be correct.
        </h5>

        {/* Grid 2 columns */}
        <div style={{ display: "flex", flexDirection: "column", gap: "70px", margin: "7% 0" }}>
          {pairs.map(([left, right]) => (
            <div key={left} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

              {/* Left */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", fontSize: "17px" }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{left}</span>
                <FreeInput
                  qId={left}
                  value={answers[left]}
                  onChange={handleChange}
                  disabled={!!ITEMS.find((i) => i.id === left)?.prefilled}
                />
              </div>

              {/* Right */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", fontSize: "17px" }}>
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{right}</span>
                <FreeInput
                  qId={right}
                  value={answers[right]}
                  onChange={handleChange}
                  disabled={!!ITEMS.find((i) => i.id === right)?.prefilled}
                />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reset only */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit5_ShortAnswer_F;