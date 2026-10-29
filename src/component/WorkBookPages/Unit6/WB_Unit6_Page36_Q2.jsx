/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";

import tableImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/Asset 21 (2).svg";

const BORDER = "#84ad40";

const ITEMS = [
  { id: 1, prefilled: false },
  { id: 2, prefilled: false },
  { id: 3, prefilled: false },
  { id: 4, prefilled: false },
];

const inputItems = ITEMS.filter((i) => !i.prefilled);

const initAnswers = () => {
  const a = {};
  inputItems.forEach(({ id }) => {
    a[`${id}-line1`] = "";
    a[`${id}-line2`] = "";
  });
  return a;
};

// ── Sub-components OUTSIDE parent ──

const LineInput = ({ value, onChange }) => (
  <input
    className="wb-unit6-input"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Write about this person"
    title="Write a sentence using at least three checked activities"
    aria-label="Sentence about the person in the chart"
    style={{
      width: "100%",
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "16px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
    }}
  />
);

// ── Main Component ──

const WB_Unit_UsedToChart_I = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="I"
          title={
            <>
              Read the chart and write a sentence about each person using at
              least{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                three items
              </span>
              .
            </>
          }
          subTitle="Read the whole chart before writing; each sentence should combine at least three checked activities for the same person."
        />

        {/* Chart image */}
        <div style={{ marginBottom: "28px" }}>
          <img
            src={tableImg}
            alt="Activity chart showing which sports Greg, Randy, Victoria, and Elena are used to doing"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Sentences */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            marginBottom: "3em",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* Line 1 */}
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    minWidth: "20px",
                  }}
                >
                  {item.id}
                </span>
                {item.prefilled ? (
                  <div
                    style={{
                      flex: 1,
                      borderBottom: "1.5px solid #555",
                      fontSize: "16px",
                      color: "#333",
                      paddingBottom: "2px",
                    }}
                  >
                    {item.answer}
                  </div>
                ) : (
                  <LineInput
                    value={answers[`${item.id}-line1`]}
                    onChange={(val) => handleChange(`${item.id}-line1`, val)}
                  />
                )}
              </div>

              {/* Line 2 — only for input items */}
              {!item.prefilled && (
                <div style={{ paddingLeft: "32px" }}>
                  <LineInput
                    value={answers[`${item.id}-line2`]}
                    onChange={(val) => handleChange(`${item.id}-line2`, val)}
                  />
                </div>
              )}
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

export default WB_Unit_UsedToChart_I;
