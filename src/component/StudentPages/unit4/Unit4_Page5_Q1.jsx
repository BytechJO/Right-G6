import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4StudentAudioText, {
  stopUnit4StudentAudio,
  unit4StudentAudio,
} from "./Unit4StudentAudioText";

import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 37.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 38.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 39.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 40.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 41.svg";

const pictures = [
  { num: 1, src: img1, alt: "Souvenirs displayed in a market" },
  { num: 2, src: img2, alt: "A collection of colorful buttons" },
  { num: 3, src: img3, alt: "Antique objects displayed on a cabinet" },
  { num: 4, src: img4, alt: "An archer aiming a bow and arrow" },
  { num: 5, src: img5, alt: "An airplane traveling over a map" },
];

const words = [
  { id: "travels", answer: "5", prefilled: false, audio: "Item_001_" },
  { id: "archer", answer: "4", prefilled: false, audio: "Item_002_" },
  { id: "collection", answer: "2", prefilled: false, audio: "Item_003_" },
  { id: "souvenirs", answer: "1", prefilled: false, audio: "Item_004_" },
  { id: "antique", answer: "3", prefilled: false, audio: "Item_005_" },
];

const Unit4_Page5_Q1 = () => {
  const initAnswers = () =>
    words.reduce((acc, w) => {
      acc[w.id] = w.prefilled ? w.answer : "";
      return acc;
    }, {});

  const initErrors = () =>
    words.reduce((acc, w) => {
      acc[w.id] = false;
      return acc;
    }, {});

  const initLocked = () =>
    words.reduce((acc, w) => {
      acc[w.id] = w.prefilled;
      return acc;
    }, {});

  const [answers, setAnswers] = useState(initAnswers);
  const [errors, setErrors] = useState(initErrors);
  const [correctLocked, setCorrectLocked] = useState(initLocked);
  const [locked, setLocked] = useState(false);

  const updateField = (id, value) => {
    if (locked || correctLocked[id]) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const handleCheck = () => {
    if (locked) return;

    const hasEmpty = words.some(
      (w) => !correctLocked[w.id] && !answers[w.id].trim(),
    );
    if (hasEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;
    const newErrors = { ...errors };
    const newLocked = { ...correctLocked };

    words.forEach((w) => {
      if (correctLocked[w.id]) {
        score++;
        return;
      }
      const correct = answers[w.id].trim() === w.answer;
      newErrors[w.id] = !correct;
      if (correct) {
        score++;
        newLocked[w.id] = true;
      }
    });

    setErrors(newErrors);
    setCorrectLocked(newLocked);

    const total = words.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span>
      </div>`;

    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    const all = words.reduce((acc, w) => {
      acc[w.id] = w.answer;
      return acc;
    }, {});
    const allLocked = words.reduce((acc, w) => {
      acc[w.id] = true;
      return acc;
    }, {});
    const noErrors = words.reduce((acc, w) => {
      acc[w.id] = false;
      return acc;
    }, {});
    setAnswers(all);
    setCorrectLocked(allLocked);
    setErrors(noErrors);
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit4StudentAudio();
    setAnswers(initAnswers());
    setErrors(initErrors());
    setCorrectLocked(initLocked());
    setLocked(false);
  };

  const inputStyle = (id) => ({
    width: "36px",
    border: "none",
    borderBottom: errors[id]
      ? "2px solid red"
      : correctLocked[id]
        ? "2px solid black"
        : "2px solid black",
    outline: "none",
    fontSize: "18px",
    textAlign: "center",
    fontWeight: 600,
    background: "transparent",
  });

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="A"
          title="Match each vocabulary word to its picture."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />

        <div className="flex flex-col justify-center items-center w-full mb-10">
          {/* PICTURES GRID */}
          <div
            style={{
              display: "flex",
              // gridTemplateColumns: "repeat(3, 1fr)",
              // gap: "12px",
              justifyContent: "space-around",
              marginBottom: "12px",
              width: "80%",
            }}
          >
            {pictures.slice(0, 3).map((pic) => (
              <div
                key={pic.num}
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={pic.src}
                  alt={pic.alt}
                  style={{
                    width: "auto",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>

          {/* PICTURES ROW — bottom 2 centered */}
          <div
            style={{
              display: "flex",
              // gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
              marginBottom: "32px",
              justifyContent: "space-around",
              width: "66.66%",
            }}
          >
            {pictures.slice(3).map((pic) => (
              <div
                key={pic.num}
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={pic.src}
                  alt={pic.alt}
                  style={{
                    width: "auto",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* WORDS ROW */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: "50px",
          }}
        >
          {words.map((w) => (
            <div
              key={w.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                position: "relative",
              }}
            >
              <input
                type="text"
                maxLength={1}
                value={answers[w.id]}
                disabled={locked || correctLocked[w.id]}
                onChange={(e) => updateField(w.id, e.target.value)}
                title={`Write the picture number for ${w.id}`}
                aria-label={`Picture number for ${w.id}`}
                style={inputStyle(w.id)}
              />{" "}
              {errors[w.id] && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-20px",
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
                    zIndex: 5,
                    pointerEvents: "none",
                  }}
                >
                  ✕
                </div>
              )}
              <Unit4StudentAudioText
                src={unit4StudentAudio("Page 32 - Exercise A", w.audio)}
                ariaLabel={`Play ${w.id}`}
                style={{ fontSize: "18px", color: "#222" }}
              >
                {w.id}
              </Unit4StudentAudioText>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button className="show-answer-btn" onClick={handleShow}>
            Show Answer
          </button>
          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit4_Page5_Q1;
