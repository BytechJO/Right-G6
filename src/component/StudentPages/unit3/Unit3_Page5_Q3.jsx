/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3StudentAudioText, { stopUnit3StudentAudio, unit3StudentAudio } from "./Unit3StudentAudioText";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:/]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// كل خلية: { fixed: "نص" } أو { key: "مفتاح الإجابة" }
const TABLES = [
  {
    rows: [
      { present: { fixed: "do" }, past: { fixed: "did" } },
      { present: { key: "t1_r1_pr" }, past: { fixed: "ate" } },
      { present: { key: "t1_r2_pr" }, past: { fixed: "chose" } },
      { present: { key: "t1_r3_pr" }, past: { fixed: "ran" } },
      { present: { fixed: "write" }, past: { key: "t1_r4_pa" } },
    ],
  },
  {
    rows: [
      { present: { key: "t2_r0_pr" }, past: { fixed: "made" } },
      { present: { fixed: "go" }, past: { key: "t2_r1_pa" } },
      { present: { fixed: "is/are" }, past: { key: "t2_r2_pa" } },
      { present: { fixed: "ride" }, past: { key: "t2_r3_pa" } },
      { present: { key: "t2_r4_pr" }, past: { fixed: "won" } },
    ],
  },
  {
    rows: [
      { present: { fixed: "buy" }, past: { key: "t3_r0_pa" } },
      { present: { fixed: "see" }, past: { key: "t3_r1_pa" } },
      { present: { fixed: "take" }, past: { key: "t3_r2_pa" } },
      { present: { fixed: "read" }, past: { key: "t3_r3_pa" } },
      { present: { key: "t3_r4_pr" }, past: { fixed: "came" } },
    ],
  },
];

const CORRECT = {
  t1_r1_pr: ["eat"],
  t1_r2_pr: ["choose"],
  t1_r3_pr: ["run"],
  t1_r4_pa: ["wrote"],
  t2_r0_pr: ["make"],
  t2_r1_pa: ["went"],
  t2_r2_pa: ["was", "were"],
  t2_r3_pa: ["rode"],
  t2_r4_pr: ["win"],
  t3_r0_pa: ["bought"],
  t3_r1_pa: ["saw"],
  t3_r2_pa: ["took"],
  t3_r3_pa: ["read"],
  t3_r4_pr: ["come"],
};

const AUDIO_INDEX = {
  present: 1, past: 2, do: 3, did: 4, made: 5, buy: 6, ate: 7,
  go: 8, see: 9, chose: 10, "is/are": 11, take: 12, ride: 13,
  read: 14, ran: 15, write: 16, won: 17, came: 18,
};

// Input خارج الكومبوننت لتفادي مشكلة re-render
const CellInput = ({ cellKey, answers, errors, locked, onChange }) => {
  const isOk = errors[cellKey] === true;
  const isWrong = errors[cellKey] === false;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <input
        value={answers[cellKey] || ""}
        disabled={locked || isOk}
        placeholder="verb"
        title="Type the missing verb form"
        aria-label={`Type the missing verb form for ${cellKey}`}
        className="unit3-student-answer-input"
        onChange={(e) => onChange(cellKey, e.target.value)}
        style={{
          width: "90px",
          border: "none",
          borderBottom: isWrong ? "2px solid #ef4444" : "1px solid #565656ff",
          outline: "none",
          background: "transparent",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: 600,
          // color: isOk ? "#84ad40" : "#6D2980",
        }}
      />
      {isWrong && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-4px",
              width: "22px",
              height: "22px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          ✕
        </span>
      )}
     
    </div>
  );
};

const Unit3_Page5_Q3 = () => {
  const allKeys = Object.keys(CORRECT);
  const initAnswers = () => Object.fromEntries(allKeys.map((k) => [k, ""]));
  const initErrors = () => Object.fromEntries(allKeys.map((k) => [k, null]));

  const [answers, setAnswers] = useState(initAnswers);
  const [errors, setErrors] = useState(initErrors);
  const [locked, setLocked] = useState(false);

  const handleChange = (key, val) => {
    if (locked || errors[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleCheck = () => {
    if (locked) return;
    if (allKeys.some((k) => !answers[k].trim())) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    const newErr = {};
    allKeys.forEach((k) => {
      const ok = CORRECT[k].some((c) => normalize(answers[k]) === normalize(c));
      if (ok) score++;
      newErr[k] = ok;
    });
    setErrors(newErr);
    const total = allKeys.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    const shown = {};
    allKeys.forEach((k) => (shown[k] = CORRECT[k][0]));
    setAnswers(shown);
    const okErr = {};
    allKeys.forEach((k) => (okErr[k] = true));
    setErrors(okErr);
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit3StudentAudio();
    setAnswers(initAnswers());
    setErrors(initErrors());
    setLocked(false);
  };

  const thStyle = {
    background: "#dee7ca",
    border: "1px solid #84ad40",
    padding: "6px 14px",
    fontSize: "18px",
    fontWeight: 600,
    textAlign: "center",
    color: "#84ad40",
  };
  const tdStyle = {
    border: "1px solid #84ad40",
    padding: "8px 10px",
    textAlign: "center",
    fontSize: "18px",
    minWidth: "110px",
    height: "70px",
  };

  const renderCell = (cell) => {
    if (cell.fixed !== undefined) {
      return (
        <Unit3StudentAudioText
          src={unit3StudentAudio("Page 26 - Exercise C", `Item_${String(AUDIO_INDEX[cell.fixed]).padStart(3, "0")}_`)}
          ariaLabel={`Play ${cell.fixed}`}
          style={{ fontSize: "18px", color: "#333" }}
        >{cell.fixed}</Unit3StudentAudioText>
      );
    }
    return (
      <CellInput
        cellKey={cell.key}
        answers={answers}
        errors={errors}
        locked={locked}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall"  style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="C"
          title="Complete the chart for the irregular verbs."
          subTitle="Work through the chart one row at a time and use the row/column headings as clues before checking your entries."
        />

        {/* الجداول الثلاثة */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "16px",
            flexWrap: "wrap",
          }}
        >
          {TABLES.map((table, tIdx) => (
            <table
              key={tIdx}
              style={{
                borderCollapse: "collapse",
                border: "1px solid #b5cc8e",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}><Unit3StudentAudioText src={unit3StudentAudio("Page 26 - Exercise C", "Item_001_")} ariaLabel="Play present">present</Unit3StudentAudioText></th>
                  <th style={thStyle}><Unit3StudentAudioText src={unit3StudentAudio("Page 26 - Exercise C", "Item_002_")} ariaLabel="Play past">past</Unit3StudentAudioText></th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td style={tdStyle}>{renderCell(row.present)}</td>
                    <td style={tdStyle}>{renderCell(row.past)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        {/* Buttons */}
        <ActionButtons
          handleShowAnswer={handleShow}
          handleStartAgain={handleReset}
          checkAnswers={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit3_Page5_Q3;
