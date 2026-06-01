import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import battleKlushino from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 23.svg";

const emptyAnswers = () => ({
  left: [
    { line1: " ", line2: "" },
    { line1: "", line2: "" },
    { line1: "", line2: "" },
    { line1: "", line2: "" },
  ],

});

const Review5_Page2_Q2 = () => {
  const [answers, setAnswers] = useState(emptyAnswers());

  const update = (side, idx, field, value) => {
    setAnswers((prev) => {
      const updated = { ...prev, [side]: [...prev[side]] };
      updated[side][idx] = { ...updated[side][idx], [field]: value };
      return updated;
    });
  };

  const reset = () => setAnswers(emptyAnswers());

  const inputStyle = {
    borderBottom: "1.5px solid #aaa",
    outline: "none",
    background: "transparent",
    width: "100%",
    fontSize: "18px",
    // color: "#6D2980",
    fontWeight: "500",
    padding: "2px 4px",
  };

  const renderQuestions = (side) =>
    answers[side].map((q, idx) => (
      <div key={idx} style={{   width: "100%", marginBottom: "14px" }}>
        {/* first line: number + starter text + input */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
          <span style={{ fontWeight: "bold", fontSize: "20px", flexShrink: 0 }}>
            {idx + 1}
          </span>

          <input
            type="text"
            value={q.line1}
            onChange={(e) => update(side, idx, "line1", e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>
     
      </div>
    ));

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-6">
          <span className="mr-2">D</span>
          Write a sentence with a question tag that asks a friend what they
          think about each picture.
        </h5>
        <img
          src={battleKlushino}
          // alt="Battle of Klushino 1610"
          style={{ width: "100%", height: "180px", objectFit: "contain" }}
        />
        {/* TWO COLUMNS */}
       
          {/* LEFT COLUMN */}
          <div  style={{
            display: "flex",
            marginTop: "30px",
            flexDirection:"column",
            // marginBottom: "30px",
            gap: "10px",
            width:"100%",
            alignItems: "flex-start",
          }}>
            {/* Image */}

            {/* Questions */}
            {renderQuestions("left")}
          </div>
    
      </div>
      {/* RESET BUTTON */}
      <div className="action-buttons-container mt-10">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Review5_Page2_Q2;
