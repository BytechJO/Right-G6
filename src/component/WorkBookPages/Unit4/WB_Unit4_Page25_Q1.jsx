import React, { useState } from "react";

const CHORES = [
  { id: 1,  label: "wash the dishes:",    prefix: null },
  { id: 2,  label: "sweep the floors:",   prefix: null },
  { id: 3,  label: "mow the lawn:",       prefix: null },
  { id: 4,  label: "dust the furniture:", prefix: null },
  { id: 5,  label: "vacuum the carpet:",  prefix: null },
  { id: 6,  label: "cook dinner:",        prefix: null },
  { id: 7,  label: "feed the animal(s):", prefix: null },
  { id: 8,  label: "mop the floors:",     prefix: null },
  { id: 9,  label: "clean the bathroom:", prefix: null },
  { id: 10, label: "do the shopping:",    prefix: null },
];

const initAnswers = () => {
  const a = {};
  CHORES.forEach(({ id }) => { a[id] = ""; });
  return a;
};

// ── FreeInput — OUTSIDE parent ──
const FreeInput = ({ choreId, value, onChange, flex = false }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(choreId, e.target.value)}
    style={{
      flex: flex ? 1 : undefined,
      width: flex ? undefined : "100%",
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      minWidth: 0,
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit4_ChoresSurvey_I = () => {
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
          <span className="ex-A" style={{ marginRight: "10px" }}>I</span>
          Take a survey in your family to see who does which chores. Read each chore, and then write a{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>present simple passive</span>{" "}
          that tells who does it. If a chore is not done by anyone, write "N/A."{" "}
   
        </h5>

        {/* Chores list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "45px", marginBottom: "3em" }}>
          {CHORES.map(({ id, label, prefix }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

              {/* Chore label */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "18px" }}>
                <span style={{ fontWeight: "bold", minWidth: "26px" }}>{id}</span>
                <span>{label}</span>
              </div>

              {/* Input line */}
              <div style={{ paddingLeft: "34px" }}>
                {prefix ? (
                  /* جملة 1: prefix ثابت + input */
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
                    <span style={{
                      fontSize: "17px",
                      whiteSpace: "nowrap",
                      borderBottom: "1.5px solid #555",
                      paddingBottom: "2px",
                      color: "#333",
                    }}>
                      {prefix}
                    </span>
                    <FreeInput choreId={id} value={answers[id]} onChange={handleChange} flex />
                  </div>
                ) : (
                  /* باقي الجمل: سطر فارغ كامل */
                  <FreeInput choreId={id} value={answers[id]} onChange={handleChange} />
                )}
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

export default WB_Unit4_ChoresSurvey_I;