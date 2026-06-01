import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import battleKlushino from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 25.svg";

const emptyAnswers = () => ({
  left: [
    { line1: "In 1610 they used to ", line2: "" },
    { line1: "", line2: "" },
    { line1: "", line2: "" },
  ],
  right: [
    { line1: "", line2: "" },
    { line1: "", line2: "" },
    { line1: "", line2: "" },
  ],
});

const Unit6_Page6_Q1 = () => {
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
      <div key={idx} style={{ marginBottom: "14px" }}>
        {/* first line: number + starter text + input */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
          <span style={{ fontWeight: "bold", fontSize: "15px", flexShrink: 0 }}>
            {idx + 1}
          </span>
          {side === "left" && idx === 0 ? (
            <>
              <span
                style={{
                  fontSize: "15px",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                In 1610 they used to
              </span>
              <input
                type="text"
                value={q.line1 === "In 1610 they used to " ? "" : q.line1}
                onChange={(e) => update(side, idx, "line1", e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
            </>
          ) : (
            <input
              type="text"
              value={q.line1}
              onChange={(e) => update(side, idx, "line1", e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
          )}
        </div>
        {/* second line */}
        <div style={{ paddingLeft: "16px", marginTop: "6px" }}>
          <input
            type="text"
            value={q.line2}
            onChange={(e) => update(side, idx, "line2", e.target.value)}
            style={{ ...inputStyle, width: "100%" }}
          />
        </div>
      </div>
    ));

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A mr-2">D</span>
          Look at the two pictures. One shows what the Battle of Klushino was
          like in 1610, and the other shows what the 19th century battles were
          like. Write three sentences for each one telling about what people
          used to do, wear, and carry in battles during the two different times.
          Discuss how the two battle scenes are alike and different.
        </h5>
        <img
          src={battleKlushino}
          // alt="Battle of Klushino 1610"
          style={{ width: "100%", height: "220px", objectFit: "contain" }}
        />
        {/* TWO COLUMNS */}
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            marginBottom:"30px",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ flex: 1 }}>
            {/* Image */}

            {/* Questions */}
            {renderQuestions("left")}
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ flex: 1 }}>
            {/* Questions */}
            {renderQuestions("right")}
          </div>
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

export default Unit6_Page6_Q1;
