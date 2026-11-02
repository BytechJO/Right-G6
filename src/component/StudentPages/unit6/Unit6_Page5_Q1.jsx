import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit6StudentAudioText, {
  stopUnit6StudentAudio,
  unit6StudentAudio,
} from "./Unit6StudentAudioText";

const wordBank = [
  { text: "entertaining", audio: "Item_001_" },
  { text: "summer school", audio: "Item_002_" },
  { text: "talented", audio: "Item_003_" },
  { text: "proud", audio: "Item_004_" },
  { text: "success", audio: "Item_005_" },
  { text: "familiar", audio: "Item_006_" },
  { text: "celebration", audio: "Item_007_" },
  { text: "perfectly", audio: "Item_008_" },
  { text: "lessons", audio: "Item_009_" },
  { text: "flawless", audio: "Item_010_" },
];

const columnAudio = {
  Nouns: "Item_013_",
  Adjectives: "Item_011_",
  Adverb: "Item_012_",
};

const correctAnswers = {
  Nouns: ["summer school", "success", "celebration", "lessons"],
  Adjectives: ["entertaining", "talented", "proud", "flawless", "familiar"],
  Adverb: ["perfectly"],
};

const columns = ["Nouns", "Adjectives", "Adverb"];
const NUM_ROWS = 5;

const Unit6_Page5_Q1 = () => {
  // table[col][rowIdx] = string typed by student
  const emptyTable = () => ({
    Nouns: Array(NUM_ROWS).fill(""),
    Adjectives: Array(NUM_ROWS).fill(""),
    Adverb: Array(NUM_ROWS).fill(""),
  });

  const [table, setTable] = useState(emptyTable());
  const [cellStatus, setCellStatus] = useState(null); // null | { col: { rowIdx: "correct"|"error" } }
  const [locked, setLocked] = useState(false);

  const updateCell = (col, rowIdx, value) => {
    if (locked) return;
    setTable((prev) => {
      const updated = { ...prev, [col]: [...prev[col]] };
      updated[col][rowIdx] = value;
      return updated;
    });
    // clear status for this cell
    if (cellStatus) {
      setCellStatus((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, [col]: { ...prev[col] } };
        delete updated[col][rowIdx];
        return updated;
      });
    }
  };

  const normalize = (text) => text.trim().toLowerCase().replace(/\s+/g, " ");

  const checkAnswers = () => {
    if (locked) return;

    // Check if at least something is filled
    const allValues = Object.values(table)
      .flat()
      .filter((v) => v.trim() !== "");
    if (allValues.length === 0) {
      ValidationAlert.info("Please fill in at least one cell.");
      return;
    }

    let score = 0;
    let total = 0;
    const newStatus = { Nouns: {}, Adjectives: {}, Adverb: {} };

    columns.forEach((col) => {
      table[col].forEach((val, rowIdx) => {
        if (val.trim() === "") return;
        total++;
        const isCorrect = correctAnswers[col]
          .map(normalize)
          .includes(normalize(val));
        newStatus[col][rowIdx] = isCorrect ? "correct" : "error";
        if (isCorrect) score++;
      });
    });

    setCellStatus(newStatus);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;

    if (score === total && total === wordBank.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    const filled = emptyTable();
    columns.forEach((col) => {
      correctAnswers[col].forEach((word, i) => {
        filled[col][i] = word;
      });
    });
    setTable(filled);
    setCellStatus(null);
    setLocked(true);
  };

  const reset = () => {
    stopUnit6StudentAudio();
    setTable(emptyTable());
    setCellStatus(null);
    setLocked(false);
  };

  const getCellStyle = (col, rowIdx) => {
    const status = cellStatus?.[col]?.[rowIdx];
    if (status === "error")
      return { borderColor: "#ef4444" };
    return {borderColor: "#80ac3e" };
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title="Divide the vocabulary words into nouns, adjectives, and adverbs."
          subTitle="Sort one item at a time using the category meaning, then recheck each group before submitting."
        />

        {/* WORD BANK */}
        <div
          style={{
            // border: "2px solid #c8dfc8",
            borderRadius: "10px",
            padding: "12px 20px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
            justifyItems: "center",
            gap: "18px",
            marginBottom: "20px",
            backgroundColor: "#e1e9d1",
            fontSize: "15px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          {wordBank.map((word) => (
            <Unit6StudentAudioText
              key={word.text}
              src={unit6StudentAudio("Page 50 - Exercise A", word.audio)}
              ariaLabel={`Play ${word.text}`}
            >
              {word.text}
            </Unit6StudentAudioText>
          ))}
        </div>

        {/* TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "28px",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    border: "1px solid #80ac3e",
                    backgroundColor: "#e1e9d1",
                    color: "#80ac3e",
                    fontWeight: "bold",
                    fontSize: "16px",
                    padding: "10px",
                    textAlign: "center",
                    width:
                      col === "Nouns"
                        ? "30%"
                        : col === "Adjectives"
                          ? "45%"
                          : "25%",
                  }}
                >
                  <Unit6StudentAudioText
                    src={unit6StudentAudio(
                      "Page 50 - Exercise A",
                      columnAudio[col],
                    )}
                    ariaLabel={`Play ${col}`}
                  >
                    {col}
                  </Unit6StudentAudioText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: NUM_ROWS }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col) => (
                  <td
                    key={col}
                    style={{
                      border: "1px solid #80ac3e",
                      padding: "0",
                      height: "42px",
                      position: "relative",
                      ...getCellStyle(col, rowIdx),
                      transition: "background 0.2s",
                    }}
                  >
                    {cellStatus?.[col]?.[rowIdx] === "error" && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "0px",
                          transform: "translateY(-50%)",
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
                        }}
                      >
                        ✕
                      </div>
                    )}

                    <input
                      type="text"
                      value={table[col][rowIdx]}
                      disabled={locked}
                      onChange={(e) => updateCell(col, rowIdx, e.target.value)}
                      placeholder="Type a word"
                      title={`Enter a ${col.toLowerCase()} word`}
                      aria-label={`${col}, row ${rowIdx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        textAlign: "center",
                        fontSize: "15px",
                        fontWeight: "600",
                        padding: "0 8px",
                        cursor: locked ? "default" : "text",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
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

export default Unit6_Page5_Q1;
