import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const speech = `\tExams are next week. As you know, this class did not do well on the last exams. I want to review with you some ideas on how you can improve your scores for these next exams.
\tFirst of all, if you started studying earlier, you would do better. Last term you only studied a day or two before each exam. That's simply not acceptable! If you started studying now, you could study for a shorter amount of time each day, and you would be able to remember more of the information.
\tSecondly, you should rewrite and organize your notes. If you grouped the things you were studying into categories, it would be much easier to learn the things you need to know. Last term you tried to study the notes you took in class, but you wrote them quickly, so they were missing information. This term, if you took the extra time now to rewrite your notes, you would save time overall.
\tFinally, always check the study sheets carefully to be sure you are studying everything you need. Last term I found study sheets in the trash. This term, you should pay attention to the material you need for the test.
\tWell, I hope this helps each of you. If you follow these simple tips, you can get better exam scores!`;

const ROWS = [
  {
    id: 0,
    lastTerm: "The exam scores were low.",
    thisTerm: "The scores should be higher.",
    prefilled: false,
  },
  {
    id: 1,
    lastTerm: "Studied one or two days before the exam.",
    thisTerm: "Start studying now, a week ahead.",
    prefilled: false,
  },
  {
    id: 2,
    lastTerm: "Studied from the hasty class note.",
    thisTerm: "Study from rewritten notes and organize them.",
    prefilled: false,
  },
  {
    id: 3,
    lastTerm: "Study sheets in the trash.",
    thisTerm: "Follow the study sheet carefully.",
    prefilled: false,
  },
];

const inputRows = ROWS.filter((r) => !r.prefilled);

const initAnswers = () => {
  const a = {};
  inputRows.forEach((r) => {
    a[`${r.id}-last`] = "";
    a[`${r.id}-this`] = "";
  });
  return a;
};

const normalize = (str) =>
  str.toLowerCase().replace(/[.?!,’'"]/g, "").replace(/\s+/g, " ").trim();

// ✅ CellInput خارج الـ component الرئيسي
const CellInput = ({ rowKey, value, locked, result, onChange }) => {
  const isWrong   = result[rowKey] === false;
  const isCorrect = result[rowKey] === true;
  return (
    <span style={{ position: "relative", display: "block", width: "100%" }}>
      <textarea
        value={value}
        disabled={locked || isCorrect}
        onChange={(e) => onChange(rowKey, e.target.value)}
        rows={2}
        style={{
          width: "100%",
          border: "none",
          borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#bbb"}`,
          outline: "none",
          background: "transparent",
          resize: "none",
          fontSize: "15px",
          color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
          fontWeight: isCorrect ? "600" : "400",
          lineHeight: "1.5",
          padding: "4px 2px",
          fontFamily: "inherit",
        }}
      />
      {isWrong && (
        <span style={{
          position: "absolute", top: "-8px", right: "-8px",
          width: "18px", height: "18px", background: "#ef4444", color: "white",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: "bold", border: "2px solid white",
          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
        }}>✕</span>
      )}
    </span>
  );
};

const WB_Unit_Speech_E = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult]   = useState({});
  const [locked, setLocked]   = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev)  => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const allKeys = inputRows.flatMap((r) => [`${r.id}-last`, `${r.id}-this`]);
    const hasEmpty = allKeys.some((k) => !answers[k].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    inputRows.forEach((r) => {
      const okLast = normalize(answers[`${r.id}-last`]) === normalize(r.lastTerm);
      const okThis = normalize(answers[`${r.id}-this`]) === normalize(r.thisTerm);
      if (okLast) correct++;
      if (okThis) correct++;
      nr[`${r.id}-last`] = okLast;
      nr[`${r.id}-this`] = okThis;
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
    const a = {};
    const r = {};
    inputRows.forEach((row) => {
      a[`${row.id}-last`] = row.lastTerm;
      a[`${row.id}-this`] = row.thisTerm;
      r[`${row.id}-last`] = true;
      r[`${row.id}-this`] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>E</span>
          Read the speech, and then complete the chart below. Each ordered paragraph{" "}
          <strong>(first, second, and finally)</strong> has one main suggestion for the students'
          improvement. Write them on the chart as shown.
        </h5>

        <div style={{
          fontSize: "15px",
          lineHeight: "1.85",
          color: "#333",
          marginBottom: "28px",
          whiteSpace: "pre-line",
        }}>
          {speech}
        </div>

        <div style={{
          border: `1.5px solid ${BORDER}`,
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "3em",
          fontSize: "15px",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "#f0f7e0",
            borderBottom: `1.5px solid ${BORDER}`,
          }}>
            <div style={{
              padding: "10px 16px",
              fontWeight: "bold",
              textAlign: "center",
              borderRight: `1.5px solid ${BORDER}`,
              fontSize: "16px",
            }}>
              Last Term
            </div>
            <div style={{
              padding: "10px 16px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "16px",
            }}>
              This Term
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderBottom: i < ROWS.length - 1 ? `1.5px solid ${BORDER}` : "none",
                minHeight: "60px",
              }}
            >
              <div style={{
                padding: "10px 14px",
                borderRight: `1.5px solid ${BORDER}`,
                display: "flex",
                alignItems: "center",
              }}>
                {row.prefilled ? (
                  <span style={{ color: "#333", fontSize: "15px" }}>{row.lastTerm}</span>
                ) : (
                  <CellInput
                    rowKey={`${row.id}-last`}
                    value={answers[`${row.id}-last`]}
                    locked={locked}
                    result={result}
                    onChange={handleChange}
                  />
                )}
              </div>

              <div style={{
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
              }}>
                {row.prefilled ? (
                  <span style={{ color: "#333", fontSize: "15px" }}>{row.thisTerm}</span>
                ) : (
                  <CellInput
                    rowKey={`${row.id}-this`}
                    value={answers[`${row.id}-this`]}
                    locked={locked}
                    result={result}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit_Speech_E;