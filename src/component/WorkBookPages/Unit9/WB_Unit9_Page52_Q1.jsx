import React, { useState } from "react";

const adjectives = [
  "modern", "rapid", "sweet", "melted",
  "wooden", "bumpy", "freezing", "damp",
  "cozy", "creepy", "pleasant", "noisy",
  "brave", "peaceful", "risky", "delightful",
  "lively", "melodic", "nervous", "brave",
  "thankful", "terrifying", "comfortable", "thrilling",
];

const nouns = [
  "coach", "grade", "hobby", "kite",
  "furniture", "language", "idea", "picture",
  "ocean", "landscape", "squirrel", "friend",
  "career", "skateboard", "novel", "musical",
  "movie", "vacation", "roller coaster",
  "sports car", "house", "experience",
  "snowboarding",
];

const EXAMPLE = "We had such a delightful vacation that I wished it could have been a year long!";

const WB_Unit2_Page11_C = () => {
  const init = () => ["", "", ""];
  const [answers, setAnswers] = useState(init);

  const handleChange = (i, value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[i] = value;
      return updated;
    });
  };

  const handleReset = () => setAnswers(init());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
<div style={{display : "flex" , flexDirection :"row"}}>
        {/* Title */}
        <h5 className="header-title-page8 mb-4" >
          <span className="ex-A" style={{display : "flex" , flexDirection :"column" ,  marginRight: "10px" }}>C</span>
        <div>Below is a listof adjectives and nouns. Use some of each of </div>   <div>them to make  sentences with{" "}
         so . . . that and such . . . that.
    </div> 
        </h5>
</div>
        {/* Word Table */}
        <table style={{
          width: "100%", borderCollapse: "collapse",
          border: "2px solid #84ad40", marginBottom: "2%", fontSize: "16px" , marginTop: "2%",
        }}>
          <thead>
            <tr>
              <th style={{ border: "2px solid #84ad40", padding: "10px 16px", textAlign: "center" }}>
                Adjectives
              </th>
              <th style={{ border: "2px solid #84ad40", padding: "10px 16px", textAlign: "center" }}>
                Nouns
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "2px solid #84ad40", padding: "12px 16px", verticalAlign: "top" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                  {adjectives.map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </div>
              </td>
              <td style={{ border: "1.5px solid #84ad40", padding: "12px 16px", verticalAlign: "top" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                  {nouns.map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Sentences */}
        <div className="flex flex-col gap-8 mb-10" style={{ fontSize: "18px" }}>


          {/* Q2, Q3, Q4 */}
          {[1 ,2, 3, 4].map((num, i) => (
            <div key={num} className="flex items-start gap-3">
              <span className="font-bold" style={{ minWidth: "20px" }}>{num}</span>
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  borderBottom: "1.5px solid #999",
                  outline: "none",
                  background: "transparent",
                  fontSize: "18px",
                  color: "#333",
                  paddingBottom: "4px",
                }}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page11_C;