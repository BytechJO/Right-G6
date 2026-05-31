import React, { useState } from "react";

const ITEMS = [
  { id: 1, prefix: "I like"      },
  { id: 2, prefix: "I prefer"    },
  { id: 3, prefix: "I dislike"   },
  { id: 4, prefix: "I enjoy"     },
  { id: 5, prefix: "I hate"      },
  { id: 6, prefix: "I don't mind" },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── Sub-components OUTSIDE parent ──

const LineInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      flex: 1,
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "18px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      minWidth: 0,
    }}
  />
);

// ── Main Component ──

const WB_Unit_LikesDisikes_J = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>J</span>
          Complete each sentence with what you like and dislike. Use{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>stative verbs and gerunds</span>.
          {" "}Example:{" "}
          <span style={{ color: "orange", fontStyle: "italic" }}>
            I like playing board games with my cousin.
          </span>
        </h5>

        <div style={{ display: "flex", flexDirection: "column", gap: "45px", marginBottom: "3em" }}>
          {ITEMS.map(({ id, prefix }) => (
            <div key={id} style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
              <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>{id}</span>
              <span style={{ fontSize: "18px", color: "#333", whiteSpace: "nowrap" }}>{prefix}</span>
              <LineInput
                value={answers[id]}
                onChange={(val) => handleChange(id, val)}
              />
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

export default WB_Unit_LikesDisikes_J;