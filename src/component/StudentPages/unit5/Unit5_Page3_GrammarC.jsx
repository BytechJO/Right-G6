import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit4_Page5_GrammarC = () => {
  // prefilled = shown as example (locked, gray bg)
  // correct = accepted answers (array for flexibility)
  const columns = [
    [
      { verb: "have", prefilled: "haven't", correct: null },
      { verb: "will", prefilled: null, correct: ["won't"] },
      { verb: "make", prefilled: "doesn't/\ndon't make", correct: null },
      { verb: "were", prefilled: null, correct: ["weren't"] },
    ],
    [
      { verb: "did", prefilled: null, correct: ["didn't"] },
      { verb: "is", prefilled: null, correct: ["isn't"] },
      {
        verb: "laugh",
        prefilled: null,
        correct: ["doesn't laugh", "don't laugh"],
      },
      { verb: "can", prefilled: null, correct: ["can't", "cannot"] },
    ],
    [
      { verb: "does", prefilled: null, correct: ["doesn't"] },
      { verb: "are", prefilled: null, correct: ["aren't"] },
      { verb: "was", prefilled: null, correct: ["wasn't"] },
      { verb: "has", prefilled: null, correct: ["hasn't"] },
    ],
  ];
  const normalizeAnswer = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/'/g, "") // remove apostrophes
      .replace(/\s+/g, " "); // normalize spaces
  };
  const expandContractions = (text) => {
    const value = normalizeAnswer(text);

    const map = {
      "don't": ["dont", "do not"],
      "doesn't": ["doesnt", "does not"],
      "didn't": ["didnt", "did not"],
      "can't": ["cant", "cannot", "can not"],
      "won't": ["wont", "will not"],
      "isn't": ["isnt", "is not"],
      "aren't": ["arent", "are not"],
      "wasn't": ["wasnt", "was not"],
      "weren't": ["werent", "were not"],
      "hasn't": ["hasnt", "has not"],
      "haven't": ["havent", "have not"],
    };

    for (const [contraction, forms] of Object.entries(map)) {
      const normalizedContraction = normalizeAnswer(contraction);

      if (
        value === normalizedContraction ||
        forms.some((f) => value === normalizeAnswer(f))
      ) {
        return normalizedContraction;
      }
    }

    return value;
  };
  // Flatten all editable cells into a single answers array
  // We'll key by "col-row"
  const buildInitial = () => {
    const map = {};
    columns.forEach((col, ci) => {
      col.forEach((cell, ri) => {
        if (!cell.prefilled) map[`${ci}-${ri}`] = "";
      });
    });
    return map;
  };

  const [answers, setAnswers] = useState(buildInitial());
  const [result, setResult] = useState({}); // key -> true|false|undefined
  const [locked, setLocked] = useState(false);

  const handleChange = (key, val) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setResult((prev) => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const keys = Object.keys(answers);
    if (keys.some((k) => !answers[k].trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newResult = {};
    columns.forEach((col, ci) => {
      col.forEach((cell, ri) => {
        if (!cell.prefilled) {
          const key = `${ci}-${ri}`;
          const userAnswer = expandContractions(answers[key]);

          const ok = cell.correct.some(
            (c) => expandContractions(c) === userAnswer,
          );
          newResult[key] = ok;
          if (ok) correctCount++;
        }
      });
    });

    setResult(newResult);
    const total = keys.length;
    const msg = `Score: ${correctCount} / ${total}`;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const filled = {};
    columns.forEach((col, ci) => {
      col.forEach((cell, ri) => {
        if (!cell.prefilled) filled[`${ci}-${ri}`] = cell.correct[0];
      });
    });
    setAnswers(filled);
    const res = {};
    Object.keys(filled).forEach((k) => {
      res[k] = true;
    });
    setResult(res);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(buildInitial());
    setResult({});
    setLocked(false);
  };

  // Shared cell styles
  const thStyle = {
    background: "#e1e9d1",
    color: "#80ac3e",
    fontWeight: "600",
    fontSize: "14px",
    padding: "8px 12px",
    textAlign: "center",
    border: "1px solid #80ac3e",
  };

  const tdVerbStyle = {
    // background: "#e1e9d1",
    fontWeight: "500",
    fontSize: "15px",
    padding: "8px 14px",
    border: "1px solid #80ac3e",
    textAlign: "center",
    minWidth: "70px",
  };

  const tdInputStyle = (key) => ({
    background: "white",
    padding: "6px 10px",
    border: "1px solid #80ac3e",
    textAlign: "center",
    minWidth: "110px",
    position: "relative",
  });

  const inputStyle = (key) => ({
    border: "none",
    borderBottom: `1px solid ${
      result[key] === false
        ? "#ef4444"
        : result[key] === true
          ? "black"
          : "black"
    }`,
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "600",

    width: "100%",
    textAlign: "center",
    padding: "2px 4px",
  });

  const prefilledStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#3a3a3a",
    whiteSpace: "pre-line",
    textAlign: "center",
    display: "block",
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">C</span>
        Write the negative contraction for each helping verb.
      </h5>

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              {columns.map((_, ci) => (
                <React.Fragment key={ci}>
                  <th style={{ ...thStyle, minWidth: "70px" }}>verb</th>
                  <th style={{ ...thStyle, minWidth: "110px" }}>
                    negative{"\n"}contraction
                  </th>
                  {ci < columns.length - 1 && (
                    <td
                      style={{
                        width: "18px",
                        background: "transparent",
                        border: "none",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3].map((ri) => (
              <tr key={ri}>
                {columns.map((col, ci) => {
                  const cell = col[ri];
                  const key = `${ci}-${ri}`;
                  return (
                    <React.Fragment key={ci}>
                      {/* verb cell */}
                      <td style={tdVerbStyle}>{cell.verb}</td>

                      {/* contraction cell */}
                      <td style={tdInputStyle(key)}>
                        {cell.prefilled ? (
                          <span style={prefilledStyle}>{cell.prefilled}</span>
                        ) : (
                          <div style={{ position: "relative" }}>
                            <input
                              value={answers[key] ?? ""}
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                              disabled={locked || result[key] === true}
                              style={inputStyle(key)}
                            />
                            {result[key] === false && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "-8px",
                                  right: "-8px",
                                  width: "18px",
                                  height: "18px",
                                  background: "#ef4444",
                                  color: "white",
                                  borderRadius: "50%",
                                  fontSize: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  border: "2px solid white",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                  pointerEvents: "none",
                                  zIndex: 3,
                                }}
                              >
                                ✕
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* spacer between mini-tables */}
                      {ci < columns.length - 1 && (
                        <td
                          style={{
                            width: "18px",
                            background: "transparent",
                            border: "none",
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={reset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <div
            onClick={showAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={checkAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit4_Page5_GrammarC;
