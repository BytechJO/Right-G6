import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const passage = `\tOur town is the busiest in the morning. By 4:00 a.m. the bread is baked by the bakers. At 5:00 a.m. the newspapers are delivered by children on bikes. At 6:00 a.m. the buses are driven by the school bus drivers. By 7:00 a.m. some children are walking to school. The school bell is rung at 8:00 a.m. each morning, and the children go to their first class. From 6:00 - 8:00 a.m. some cars are driven by people on their way to work, but many others ride the bus or work from home. Everyone gets an early start each day. No wonder it's quiet by 10:00 p.m. in our town!`;

// صف 1 prefilled، باقي الصفوف inputs
const ROWS = [
  {
    id: 1,
    time: "4:00 a.m.",
    activity: "Bread is baked by the bakers.",
    prefilled: false,
  },
  {
    id: 2,
    time: "5:00 am",
    activity: "Newspapers are delivered by children.",
    prefilled: false,
  },
  {
    id: 3,
    time: "6:00 am",
    activity: "Buses are driven to school by bus drivers.",
    prefilled: false,
  },
  {
    id: 4,
    time: "7:00 am",
    activity: "Some children are walking to school.",
    prefilled: false,
  },
  {
    id: 5,
    time: "6:00 - 8:00 am",
    activity: "Cars are driven to work by people.",
    prefilled: false,
  },
  {
    id: 6,
    time: "10:00 pm",
    activity: "It's quiet.",
    prefilled: false,
  },
];

const inputRows = ROWS.filter((r) => !r.prefilled);

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,:''']/g, "").replace(/\s+/g, " ").trim();

const initAnswers = () => {
  const a = {};
  inputRows.forEach(({ id }) => {
    a[`${id}-time`]     = "";
    a[`${id}-activity`] = "";
  });
  return a;
};

// ── CellInput — OUTSIDE parent ──
const CellInput = ({ fieldKey, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "block", width: "100%" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(fieldKey, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "15px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        fontFamily: "inherit",
        padding: "2px 4px",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#ccc"}`,
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-6px", right: "-6px",
        width: "16px", height: "16px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit4_Schedule_H = () => {
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
    const allKeys = inputRows.flatMap(({ id }) => [`${id}-time`, `${id}-activity`]);
    const hasEmpty = allKeys.some((k) => !answers[k].trim());
    if (hasEmpty) { ValidationAlert.info("Please complete all answers."); return; }

    let correct = 0;
    const nr = {};
    inputRows.forEach(({ id, time, activity }) => {
      const okTime = normalize(answers[`${id}-time`])     === normalize(time);
      const okAct  = normalize(answers[`${id}-activity`]) === normalize(activity);
      if (okTime) correct++;
      if (okAct)  correct++;
      nr[`${id}-time`]     = okTime;
      nr[`${id}-activity`] = okAct;
    });
    setResult(nr);
    const total = inputRows.length * 2;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {}; const r = {};
    inputRows.forEach(({ id, time, activity }) => {
      a[`${id}-time`]     = time;
      a[`${id}-activity`] = activity;
      r[`${id}-time`]     = true;
      r[`${id}-activity`] = true;
    });
    setAnswers(a); setResult(r); setLocked(true);
  };

  const handleReset = () => { setAnswers(initAnswers()); setResult({}); setLocked(false); };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>H</span>
          Read carefully, and then finish the schedule.
        </h5>

        {/* Passage */}
        <div style={{
          fontSize: "15px", lineHeight: "1.85", color: "#333",
          marginBottom: "24px", whiteSpace: "pre-line",
        }}>
          {passage}
        </div>

        {/* Schedule Table */}
        <div style={{ marginBottom: "3em" }}>

          {/* Header — Morning Schedule */}
          <div style={{
            background: "#d6e8a0",
            border: `1.5px solid ${BORDER}`,
            borderRadius: "6px 6px 0 0",
            padding: "8px 16px",
            textAlign: "center",
            fontSize: "15px",
            fontWeight: "600",
            color: "#333",
          }}>
            Morning Schedule
          </div>

          {/* Table */}
          <div style={{
            border: `1.5px solid ${BORDER}`,
            borderTop: "none",
            borderRadius: "0 0 6px 6px",
            overflow: "hidden",
          }}>
            {/* Column headers */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              borderBottom: `1.5px solid ${BORDER}`,
              background: "#f9fcf0",
            }}>
              <div style={{
                padding: "10px 14px",
                fontWeight: "bold",
                fontSize: "15px",
                borderRight: `1.5px solid ${BORDER}`,
                textAlign: "center",
              }}>Time</div>
              <div style={{
                padding: "10px 14px",
                fontWeight: "bold",
                fontSize: "15px",
                textAlign: "center",
              }}>Activity</div>
            </div>

            {/* Data rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  borderBottom: i < ROWS.length - 1 ? `1.5px solid ${BORDER}` : "none",
                  minHeight: "52px",
                }}
              >
                {/* Time cell */}
                <div style={{
                  padding: "10px 14px",
                  borderRight: `1.5px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "center",
                }}>
                  {row.prefilled ? (
                    <span style={{ fontSize: "15px", color: "#333" }}>{row.time}</span>
                  ) : (
                    <CellInput
                      fieldKey={`${row.id}-time`}
                      value={answers[`${row.id}-time`]}
                      onChange={handleChange}
                      isCorrect={result[`${row.id}-time`] === true}
                      isWrong={result[`${row.id}-time`] === false}
                      disabled={locked || result[`${row.id}-time`] === true}
                    />
                  )}
                </div>

                {/* Activity cell */}
                <div style={{
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                }}>
                  {row.prefilled ? (
                    <span style={{
                      fontSize: "15px", color: "#333",
                      textDecoration: "underline",
                    }}>{row.activity}</span>
                  ) : (
                    <CellInput
                      fieldKey={`${row.id}-activity`}
                      value={answers[`${row.id}-activity`]}
                      onChange={handleChange}
                      isCorrect={result[`${row.id}-activity`] === true}
                      isWrong={result[`${row.id}-activity`] === false}
                      disabled={locked || result[`${row.id}-activity`] === true}
                    />
                  )}
                </div>
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

export default WB_Unit4_Schedule_H;