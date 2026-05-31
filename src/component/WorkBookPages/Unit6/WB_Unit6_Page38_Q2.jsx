import React, { useState } from "react";

const ITEMS = [
  {
    id: 1,
    text: <>Usually I like pizza, but this dessert which has fruit and honey isn't really <u>to my liking</u>.</>,
  },
  {
    id: 2,
    text: <><u>By the way</u>, could you pick up some milk while you're at the store?</>,
  },
  {
    id: 3,
    text: <>Luis: Can I borrow your headphones?<br />Henry: Sure, <u>go ahead</u>. They're on my desk.</>,
  },
  {
    id: 4,
    text: <><u>Years ago</u>, students wrote their reports by using a typewriter or by hand.</>,
  },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── Sub-components OUTSIDE parent ──

const YourSentenceInput = ({ value, onChange }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", paddingLeft: "0px" }}>
    <span style={{ fontSize: "16px", color: "#333", whiteSpace: "nowrap" }}>Your sentence:</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        flex: 1,
        border: "none",
        borderBottom: "1px solid #555",
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: "#333",
        paddingBottom: "2px",
        fontFamily: "inherit",
        minWidth: 0,
      }}
    />
  </div>
);

// ── Main Component ──

const WB_Unit_WriteSentence_L = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A" style={{ marginRight: "10px" }}>L</span>
          Read each example sentence, and then write a sentence using the same{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>underlined expression</span>.
        </h5>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "2em" }}>
          {ITEMS.map((item) => (
            <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

              {/* Example sentence */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontWeight: "bold", fontSize: "18px", minWidth: "20px" }}>
                  {item.id}
                </span>
                <span style={{ fontSize: "16px", color: "#333", lineHeight: "1.6" }}>
                  {item.text}
                </span>
              </div>

              {/* Your sentence input */}
              <div style={{ paddingLeft: "30px" }}>
                <YourSentenceInput
                  value={answers[item.id]}
                  onChange={(val) => handleChange(item.id, val)}
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

export default WB_Unit_WriteSentence_L;