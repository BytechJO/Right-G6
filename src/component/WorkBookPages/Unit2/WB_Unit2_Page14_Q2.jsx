import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";

import crocodileImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U2 Folder/SVG/SVG/Asset 5.svg";
import deerImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U2 Folder/SVG/SVG/Asset 8.svg";
import hospitalImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U2 Folder/SVG/SVG/Asset 6.svg";
import readingImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U2 Folder/SVG/SVG/Asset 7.svg";

const questions = [
  { id: 1, img: crocodileImg, alt: "crocodile" },
  { id: 2, img: deerImg, alt: "deer" },
  { id: 3, img: hospitalImg, alt: "hospital" },
  { id: 4, img: readingImg, alt: "reading" },
];

const WB_Unit2_Page14_J = () => {
  const init = () => questions.map(() => ["", ""]);
  const [answers, setAnswers] = useState(init);

  const handleChange = (qi, li, value) => {
    setAnswers((prev) => {
      const a = prev.map((q) => [...q]);
      a[qi][li] = value;
      return a;
    });
  };

  const handleReset = () => setAnswers(init());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="J"
          title={
            <>
              Write a sentence with{" "}
              <strong style={{ color: "#e67e22" }}>
                such + adjective + noun
              </strong>{" "}
              that matches each picture.
            </>
          }
          subTitle=" Use each picture as the noun clue first, then write a complete such + adjective + noun + that sentence."
        />

        {/* Questions */}
        <div className="flex flex-col gap-8 mb-12">
          {questions.map((q, qi) => (
            <div
              key={q.id}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "20px",
                alignItems: "center",
              }}
            >
              {/* Image */}
              <div
                style={{
                  overflow: "hidden",
                  width: 140,
                  height: 110,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={q.img}
                  alt={q.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: 6,
                  }}
                />
              </div>

              {/* Number + lines */}
              <div className="flex items-start gap-3">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 19,
                    minWidth: 20,
                    paddingTop: 4,
                  }}
                >
                  {q.id}
                </span>
                <div className="flex flex-col gap-4" style={{ flex: 1 }}>
                  {[0, 1].map((li) => (
                    <input
                      key={li}
                      type="text"
                      value={answers[qi][li]}
                      placeholder="Write a sentence about the picture"
                      title={`Write a such + adjective + noun sentence for picture ${q.id}`}
                      className="wb-unit2-answer-input"
                      onChange={(e) => handleChange(qi, li, e.target.value)}
                      style={{
                        width: "100%",
                        border: "none",
                        borderBottom: "1.5px solid #999",
                        outline: "none",
                        background: "transparent",
                        fontSize: 17,
                        color: "#333",
                        paddingBottom: 3,
                      }}
                    />
                  ))}
                </div>
              </div>
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

export default WB_Unit2_Page14_J;
