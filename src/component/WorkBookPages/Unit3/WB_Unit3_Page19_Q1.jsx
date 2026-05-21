import React, { useState } from "react";

const SENTENCES = [
  { id: 1, prefix: "If I had", prefilled: null},
  { id: 2, prefix: "If I went to",  prefilled: null },
  { id: 3, prefix: "If I had",      prefilled: null },
  { id: 4, prefix: "If I saw",      prefilled: null },
  { id: 5, prefix: "If I didn't have to", prefilled: null },
];

const initAnswers = () => {
  const a = {};
  SENTENCES.forEach(({ id, prefilled }) => {
    a[`${id}-line1`] = prefilled || "";
    a[`${id}-line2`] = "";
  });
  return a;
};

// ── Sub-components defined OUTSIDE parent to prevent remount on render ──

const LineInput = ({ value, onChange, disabled, style = {} }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(e.target.value)}
    style={{
      flex: 1,
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      minWidth: 0,
      ...style,
    }}
  />
);

const FullLineInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
    }}
  />
);

// ── Main Component ──

const WB_Unit_SecondConditional_G = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>G</span>
          Read each of the following sentence starters and write a{" "}
          <span style={{ color: "orange" }}>second conditional</span> sentence of what you might
          do in each situation.{" "}
 
        </h5>

        {/* Sentences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "3em" }}>
          {SENTENCES.map(({ id, prefix, prefilled }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Line 1: prefix + input */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>
                  {id}
                </span>
                <span style={{ fontSize: "17px", whiteSpace: "nowrap" }}>{prefix}</span>
                <LineInput
                  value={answers[`${id}-line1`]}
                  disabled={!!prefilled}
                  onChange={(val) => handleChange(`${id}-line1`, val)}
                  style={{ color: prefilled ? "#c0392b" : "#333" }}
                />
              </div>

              {/* Line 2: full blank line */}
              <div style={{ paddingLeft: "28px" }}>
                <FullLineInput
                  value={answers[`${id}-line2`]}
                  onChange={(val) => handleChange(`${id}-line2`, val)}
                />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reset only — Students' answers will vary */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit_SecondConditional_G;