import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4StudentAudioText, {
  stopUnit4StudentAudio,
  unit4StudentAudio,
} from "../unit4/Unit4StudentAudioText";

const Review4_Page1_Q2 = () => {
  const rows = [
    {
      left: {
        text: "Janet mails the letter.",
        editable: false,
        audio: "Item_003_",
      },
      right: {
        text: "The letter is mailed by Janet.",
        editable: false,
        audio: "Item_004_",
      },
    },
    {
      left: {
        text: "Jeremy makes linen by using flaxseed.",
        editable: false,
        audio: "Item_005_",
      },
      right: {
        text: "By using flaxseed.",
        editable: false,
        answer: "By using flaxseed.",
        audio: "Item_006_",
      },
    },
    {
      left: {
        text: "The bakers make delicious rolls each day.",
        editable: false,
        audio: "Item_007_",
      },
      right: {
        text: "",
        editable: true,
        answer: "Delicious rolls are made by the bakers each day",
      },
    },
    {
      left: {
        text: "",
        editable: true,
        answer: "The machines milk the cows on the farm.",
      },
      right: {
        text: "On their farm, the cows are milked by machines.",
        editable: false,
        audio: "Item_008_",
      },
    },
    {
      left: {
        text: "",
        editable: true,
        answer: "My sister cleans the house every Friday.",
      },
      right: {
        text: "Every Friday, the house is cleaned by my sister.",
        editable: false,
        audio: "Item_009_",
      },
    },
  ];

  const totalInputs = rows.filter(
    (r) => r.left.editable || r.right.editable,
  ).length;

  const initAnswers = () => {
    const obj = {};
    rows.forEach((row, i) => {
      if (row.left.editable) obj[`${i}-left`] = "";
      if (row.right.editable) obj[`${i}-right`] = "";
    });
    return obj;
  };

  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

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
    stopUnit4StudentAudio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  const renderCell = (row, rowIndex, side) => {
    const cell = row[side];
    const key = `${rowIndex}-${side}`;

    if (!cell.editable) {
      return (
        <Unit4StudentAudioText
          src={
            cell.audio
              ? unit4StudentAudio("Page 36 - Exercise B", cell.audio)
              : null
          }
          ariaLabel={`Play ${cell.text}`}
          style={{ color: "var(--color-text-primary, #111)" }}
        >
          {cell.text}
        </Unit4StudentAudioText>
      );
    }

    const isWrong = result[key] === false;
    const isCorrect = result[key] === true;

    return (
      <span
        style={{ position: "relative", display: "inline-block", width: "100%" }}
      >
        <input
          disabled={locked || isCorrect}
          value={answers[key] ?? ""}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder="Write here..."
          title={`Write the ${side === "left" ? "simple present" : "present simple passive"} sentence`}
          aria-label={`Row ${rowIndex + 1}, ${side === "left" ? "simple present" : "present simple passive"}`}
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
      <div className="div-forall gap-3 mb-10">
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Change each sentence between the simple present and the present simple passive."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Identify which side is active and which is passive
                first.
              </span>
              <span style={{ display: "block" }}>
                Task 2: Rewrite only the missing form while keeping the tense
                and meaning unchanged.
              </span>
            </>
          }
        />

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
                <Unit4StudentAudioText
                  src={unit4StudentAudio("Page 36 - Exercise B", "Item_001_")}
                  ariaLabel="Play Simple present"
                >
                  Simple present
                </Unit4StudentAudioText>
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
                <Unit4StudentAudioText
                  src={unit4StudentAudio("Page 36 - Exercise B", "Item_002_")}
                  ariaLabel="Play Present participle"
                >
                  Present participle
                </Unit4StudentAudioText>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
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
