import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/11.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/12.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/13.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/14.svg";

const ITEMS = [{ img: img1 }, { img: img2 }, { img: img3 }, { img: img4 }];

const Review2_Page2_Q2 = () => {
  const [answers, setAnswers] = useState(ITEMS.map(() => ["", ""]));

  const handleChange = (i, line, val) => {
    setAnswers((prev) =>
      prev.map((a, idx) =>
        idx === i ? a.map((v, li) => (li === line ? val : v)) : a,
      ),
    );
  };

  const handleReset = () => {
    setAnswers(ITEMS.map(() => ["", ""]));
  };

  const lineStyle = {
    width: "100%",
    borderBottom: "1.5px solid #555",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    outline: "none",
    background: "transparent",
    fontSize: "18px",
    padding: "2px 0",
    marginBottom: "12px",
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall">
        {/* العنوان */}
        <h5 className="header-title-page8 mb-7">
          <span className="mr-2">D</span>
          Look at the picture, and then write a sentence using{" "}
          <span style={{ color: "#f79631", fontWeight: "bold" }}>
            so
          </span> or{" "}
          <span style={{ color: "#f79631", fontWeight: "bold" }}>such</span>.
        </h5>

        {/* الأسئلة */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}
            >
              {/* الصورة */}
              <img
                src={item.img}
                alt={`item ${i + 1}`}
                style={{
                  width: "auto",
                  height: "120px",
                  objectFit: "contain",
                  padding: "6px",
                  flexShrink: 0,
                }}
              />

              {/* الرقم + السطرين */}
              <div style={{ flex: 1, paddingTop: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      minWidth: "20px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <input
                    value={answers[i][0]}
                    onChange={(e) => handleChange(i, 0, e.target.value)}
                    style={{ ...lineStyle, marginBottom: 0 }}
                  />
                </div>
                <div style={{ paddingLeft: "28px" }}>
                  <input
                    value={answers[i][1]}
                    onChange={(e) => handleChange(i, 1, e.target.value)}
                    style={{ ...lineStyle, marginBottom: 0 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div> 
      
      {/* زر Reset فقط */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
        </div>
    </div>
  );
};

export default Review2_Page2_Q2;
