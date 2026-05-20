import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";

const VERBS = [
  { verb: "see", correct: "seen"},
  { verb: "buy", correct: "bought" },
  { verb: "choose", correct: "chosen" },
  { verb: "run", correct: "run" },
  { verb: "sleep", correct: "slept" },
  { verb: "think", correct: "thought" },
  { verb: "go", correct: "gone" },
  { verb: "drive", correct: "driven" },
  { verb: "ride", correct: "ridden" },
  { verb: "read", correct: "read" },
  { verb: "teach", correct: "taught" },
  { verb: "write", correct: "written" },
];

const normalize = (t) => t.toLowerCase().trim();

const Page_C_Participles = () => {
  const inputCount = VERBS.filter((v) => !v.example).length;
  const [answers, setAnswers] = useState(Array(inputCount).fill(""));
  const [result, setResult] = useState(Array(inputCount).fill(null));
  const [locked, setLocked] = useState(false);

  // نبني mapping: index في VERBS → index في answers
  let inputIndex = -1;
  const verbsWithIndex = VERBS.map((v) => {
    if (v.example) return { ...v, inputIdx: null };
    inputIndex++;
    return { ...v, inputIdx: inputIndex };
  });

 const handleChange = (idx, val) => {
  setResult((prev) => prev.map((r, i) => (i === idx ? null : r)));
  setAnswers((prev) => prev.map((a, i) => (i === idx ? val : a)));
};
  const handleCheck = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correct = 0;
    const newResult = answers.map((a, i) => {
      const verbData = verbsWithIndex.find((v) => v.inputIdx === i);
      const ok = normalize(a) === normalize(verbData.correct);
      if (ok) correct++;
      return ok;
    });
    setResult(newResult);
    const total = inputCount;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    const ans = verbsWithIndex
      .filter((v) => v.inputIdx !== null)
      .map((v) => v.correct);
    setAnswers(ans);
    setResult(Array(inputCount).fill(true));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(inputCount).fill(""));
    setResult(Array(inputCount).fill(null));
    setLocked(false);
  };

  const renderCell = (v) => {
    if (v.example) {
      return (
        <td style={styles.td}>
          <span
            style={{ color: "#84ad40", fontWeight: "bold", fontSize: "17px" }}
          >
            {v.correct}
          </span>
        </td>
      );
    }
    const idx = v.inputIdx;
    const isWrong = result[idx] === false;
    const isOk = result[idx] === true;
    return (
      <td style={styles.td}>
        <span style={{ position: "relative", display: "inline-block" }}>
          <input
            value={answers[idx]}
            disabled={locked || isOk}
            onChange={(e) => handleChange(idx, e.target.value)}
            style={{
              width: "150px",
              border: "none",
              borderBottom: isWrong ? "2px solid #ef4444" : "1px solid #aaa",
              outline: "none",
              textAlign: "center",
              background: "transparent",
              fontSize: "18px",
              fontWeight: 500,
              color: isOk ? "#f79631" : "#333",
              padding: "2px 4px",
            }}
          />
          {isWrong && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                width: "18px",
                height: "18px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "bold",
                border: "2px solid white",
                pointerEvents: "none",
                zIndex: 5,
              }}
            >
              ✕
            </span>
          )}
        </span>
      </td>
    );
  };

  // نقسم الكلمات: يسار (6) ويمين (6)
  const leftVerbs = verbsWithIndex.slice(0, 6);
  const rightVerbs = verbsWithIndex.slice(6, 12);

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{gap:"40px"}}>
        <h5 className="header-title-page8 mb-7">
          <span className="mr-2">C</span>
          Complete the chart with the participles of irregular verbs.
        </h5>

        <div style={{ display: "flex", gap: "0px" }}>
          {/* الجدول الأيسر */}
          <table style={styles.table}>
            <tbody>
              {leftVerbs.map((v, i) => (
                <tr key={i}>
                  <td style={styles.tdVerb}>{v.verb}</td>
                  {renderCell(v)}
                </tr>
              ))}
            </tbody>
          </table>

          {/* الجدول الأيمن */}
          <table style={{ ...styles.table, borderLeft: "none" }}>
            <tbody>
              {rightVerbs.map((v, i) => (
                <tr key={i}>
                  <td style={styles.tdVerb}>{v.verb}</td>
                  {renderCell(v)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <ActionButtons
            handleShowAnswer={handleShow}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  table: {
    borderCollapse: "collapse",
    border: "1px solid #84ad40",
  },
  tdVerb: {
    border: "1px solid #84ad40",
    padding: "10px 20px",
    fontSize: "17px",
    fontWeight: 500,
    width: "150px",
    height:"70px",
    textAlign: "center",
    color: "#333",
  },
  td: {
    border: "1px solid #84ad40",
    padding: "6px 10px",
    textAlign: "center",
    width: "140px",
  },
};

export default Page_C_Participles;
