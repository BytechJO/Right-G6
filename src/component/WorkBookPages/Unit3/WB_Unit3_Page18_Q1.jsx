import React, { useState } from "react";

// استبدل هذا الـ import بمسار صورة الجدول الفعلي عندك
import itemsImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U3 Folder/SVG/2-cropped.svg";

const BORDER = "#84ad40";

// السطور الـ 5
// rows 1-3: prefix "If I had" + input1 + ", I would" + input2 + extra line
// rows 4-5: input1 + "," + input2 + extra line (no prefix)
const SENTENCES = [
  { id: 1, hasPrefix: true },
  { id: 2, hasPrefix: true },
  { id: 3, hasPrefix: true },
  { id: 4, hasPrefix: false },
  { id: 5, hasPrefix: false },
];

const initAnswers = () => {
  const a = {};
  SENTENCES.forEach(({ id }) => {
    a[`${id}-a`] = "";   // blank أول (بعد If I had / أو مستقل)
    a[`${id}-b`] = "";   // blank ثاني (بعد I would / أو بعد الفاصلة)
    a[`${id}-c`] = "";   // السطر الإضافي
  });
  return a;
};

const WB_Unit_Island_F = () => {
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setAnswers(initAnswers());

  // Input مشترك بدون check (free answer)
  const FreeInput = ({ fieldKey, width = "180px", placeholder = "" }) => (
    <input
      type="text"
      value={answers[fieldKey]}
      onChange={(e) => handleChange(fieldKey, e.target.value)}
      placeholder={placeholder}
      style={{
        width,
        border: "none",
        borderBottom: `1.5px solid #555`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: "#333",
        paddingBottom: "2px",
        fontFamily: "inherit",
      }}
    />
  );

  // السطر الإضافي (full width)
  const ExtraLine = ({ fieldKey }) => (
    <div style={{ marginTop: "6px", paddingLeft: "20px" }}>
      <input
        type="text"
        value={answers[fieldKey]}
        onChange={(e) => handleChange(fieldKey, e.target.value)}
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
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>F</span>
          If you knew you were going to be on a deserted island for a long time, what would you
          take with you? Tell which items you would choose and what you would do with them.{" "}
          You can only pick five.{" "}
       
        </h5>

        {/* Items Image Grid */}
          <img
            src={itemsImg}
            alt="Items to choose"
            style={{
              width: "100%",
              height : "auto",
               objectFit: "contain",
               marginBottom : "1em"
            }}
          />

        {/* Sentences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "3em" }}>

          {/* Rows 1–3: If I had ___, I would ___ */}
          {SENTENCES.filter((s) => s.hasPrefix).map((s) => (
            <div key={s.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontWeight: "bold", fontSize: "17px", minWidth: "20px" }}>
                  {s.id}
                </span>
                <span style={{ fontSize: "16px", whiteSpace: "nowrap" }}>If I had</span>
                <FreeInput fieldKey={`${s.id}-a`} width="200px" />
                <span style={{ fontSize: "16px", whiteSpace: "nowrap" }}>, I would</span>
                <FreeInput fieldKey={`${s.id}-b`} width="180px" />
              </div>
              <ExtraLine fieldKey={`${s.id}-c`} />
            </div>
          ))}

          {/* Rows 4–5: blank , blank (no prefix) */}
          {SENTENCES.filter((s) => !s.hasPrefix).map((s) => (
            <div key={s.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontWeight: "bold", fontSize: "17px", minWidth: "20px" }}>
                  {s.id}
                </span>
                <FreeInput fieldKey={`${s.id}-a`} width="220px" />
                <span style={{ fontSize: "16px" }}>,</span>
                <FreeInput fieldKey={`${s.id}-b`} width="220px" />
              </div>
              <ExtraLine fieldKey={`${s.id}-c`} />
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

export default WB_Unit_Island_F;