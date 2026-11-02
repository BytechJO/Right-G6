/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import babyImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/2-cropped (3).svg";

const SENTENCES = [{ id: 1 }, { id: 2 }, { id: 3 }];

const initAnswers = () => {
  const a = {};
  SENTENCES.forEach(({ id }) => { a[id] = ""; });
  return a;
};

const FullLineInput = ({ value, onChange }) => (
  <input
    className="wb-unit6-input"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="I am used to ..."
    title="Write one long-term habit using I am used to plus an -ing verb"
    aria-label="Long-term habit"
    style={{
      flex: 1,
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

const WB_Unit_IAmUsedTo_D = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Write three things you have done for at least three years using{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                I am used to + -ing verb
              </span>
              .
            </>
          }
          subTitle="Choose a real long-term habit and use the pattern am/is/are used to + -ing without switching to simple used to."
        />

        {/* Inputs + Image side by side */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", margin: "2em 0" }}>

          {/* Sentences — take remaining space */}
          <div style={{ display: "flex", flexDirection: "column", gap: "50px", flex: 1 }}>
            {SENTENCES.map(({ id }) => (
              <div key={id} style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
                <span style={{ fontWeight: "bold", fontSize: "20px", minWidth: "20px" }}>{id}</span>
                <FullLineInput
                  value={answers[id]}
                  onChange={(val) => handleChange(id, val)}
                />
              </div>
            ))}
          </div>

          {/* Image — pinned to the right */}
          <img
            src={babyImg}
            alt="A girl caring for her baby brother"
            style={{ width: "20%", height: "auto", objectFit: "contain", flexShrink: 0  ,alignSelf : "center"}}
          />

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

export default WB_Unit_IAmUsedTo_D;
