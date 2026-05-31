import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review4_Page1_Q2 = () => {
  const rows = [
    {
      left:  { text: "Janet mails the letter.", editable: false },
      right: { text: "The letter is mailed by Janet.", editable: false },
    },
    {
      left:  { text: "Jeremy makes linen by using flaxseed.", editable: false },
      right: { text: "By using flaxseed.", editable: false, answer: "By using flaxseed." },
    },
    {
      left:  { text: "The bakers make delicious rolls each day.", editable: false },
      right: { text: "", editable: true, answer: "Delicious rolls are made by the bakers each day" },
    },
    {
      left:  { text: "", editable: true, answer: "The machines milk the cows on the farm." },
      right: { text: "On their farm, the cows are milked by machines.", editable: false },
    },
    {
      left:  { text: "", editable: true, answer: "My sister cleans the house every Friday." },
      right: { text: "Every Friday, the house is cleaned by my sister.", editable: false },
    },
  ];

  const totalInputs = rows.filter(
    (r) => r.left.editable || r.right.editable
  ).length;

  const initAnswers = () => {
    const obj = {};
    rows.forEach((row, i) => {
      if (row.left.editable)  obj[`${i}-left`]  = "";
      if (row.right.editable) obj[`${i}-right`] = "";
    });
    return obj;
  };

  const [answers, setAnswers] = useState(initAnswers);
  const [result,  setResult]  = useState({});
  const [locked,  setLocked]  = useState(false);

  const normalize = (s) =>
    s.toLowerCase().replace(/\s+/g, " ").trim().replace(/\.$/, "");

  const handleChange = (key, val) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setResult((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const allFilled = Object.values(answers).every((v) => v.trim());
    if (!allFilled) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const res = {};

    rows.forEach((row, i) => {
      ["left", "right"].forEach((side) => {
        if (row[side].editable) {
          const key = `${i}-${side}`;
          const ok = normalize(answers[key]) === normalize(row[side].answer);
          res[key] = ok;
          if (ok) correctCount++;
        }
      });
    });

    setResult(res);

    const total = totalInputs;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    const filled = {};
    const res = {};
    rows.forEach((row, i) => {
      ["left", "right"].forEach((side) => {
        if (row[side].editable) {
          const key = `${i}-${side}`;
          filled[key] = row[side].answer;
          res[key] = true;
        }
      });
    });
    setAnswers(filled);
    setResult(res);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  const renderCell = (row, rowIndex, side) => {
    const cell = row[side];
    const key  = `${rowIndex}-${side}`;

    if (!cell.editable) {
      return (
        <span style={{ color: "var(--color-text-primary, #111)" }}>
          {cell.text}
        </span>
      );
    }

    const isWrong   = result[key] === false;
    const isCorrect = result[key] === true;

    return (
      <span style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <input
          disabled={locked || isCorrect}
          value={answers[key] ?? ""}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder="Write here..."
          style={{
            width: "100%",
            border: "none",
            borderBottom: `1.5px solid ${
              isWrong ? "#ef4444" : isCorrect ? "black" : "black"
            }`,
            outline: "none",
            background: "transparent",
            fontSize: "15px",
       
            fontWeight: "600",
            paddingBottom: "2px",
          }}
        />
        {isWrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
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
              zIndex: 3,
            }}
          >
            ✕
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 mb-10">
          <span className="mr-2">B</span>
      Either change the sentence from the simple present to the present simple passive, or change it from the present simple passive to the simple present.
        </h5>

        {/* TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  background: "#e1e9d1",
                  color: "#80ac3e",
                  fontWeight: "500",
                  padding: "10px 16px",
                  border: "1px solid #80ac3e",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                Simple present
              </th>
              <th
                style={{
                  background: "#e1e9d1",
                  color: "#80ac3e",
                  fontWeight: "500",
                  padding: "10px 16px",
                  border: "1px solid #80ac3e",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                Present participle
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
               
              >
                {/* LEFT CELL */}
                <td
                  style={{
                    border: "1px solid #80ac3e",
                    padding: "18px 16px",
                    verticalAlign: "middle",
                    minHeight: "60px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "8px",
                      color: "#555",
                    }}
                  >
                    {i + 1}
                  </span>
                  {renderCell(row, i, "left")}
                </td>

                {/* RIGHT CELL */}
                <td
                  style={{
                    border: "1px solid #80ac3e",
                    padding: "18px 16px",
                    verticalAlign: "middle",
                    minHeight: "60px",
                  }}
                >
                  {renderCell(row, i, "right")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review4_Page1_Q2;