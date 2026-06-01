import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 47.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 48.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 49.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 50.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 51.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 52.svg";

const Review3_Page1_Q1 = () => {
  const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
    { id: 3, img: img4 },
    { id: 4, img: img5 },
    { id: 5, img: img6 },
  ];

  const words = [
    { id: 0, text: "fast foods" },
    { id: 1, text: "leftovers" },
    { id: 2, text: "mashed potatoes" },
    { id: 3, text: "exhausted" },
    { id: 4, text: "liver" },
    { id: 5, text: "diner" },
  ];

  const correct = { 0: 3, 1: 0, 2: 5, 3: 1, 4: 4, 5: 2 };

  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [validatedMatches, setValidatedMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const containerRef = useRef(null);
  const imgDotRefs = useRef([]); // dot تحت كل صورة
  const wordDotRefs = useRef([]); // dot فوق كل كلمة

  /* ---- click image ---- */
  const handleImgClick = (imgId) => {
    if (locked) return;
    if (showResult && validatedMatches[imgId] === correct[imgId]) return;
    if (selectedImg === imgId) {
      setSelectedImg(null);
      return;
    }
    setSelectedImg(imgId);
    setValidatedMatches((prev) => {
      const n = { ...prev };
      delete n[imgId];
      return n;
    });
  };

  /* ---- click word ---- */
  const handleWordClick = (wordId) => {
    if (locked) return;
    if (selectedImg === null) return;
    if (showResult && validatedMatches[selectedImg] === correct[selectedImg]) {
      setSelectedImg(null);
      return;
    }
    const alreadyLockedElsewhere = Object.entries(validatedMatches).some(
      ([iId, wId]) =>
        Number(wId) === wordId &&
        correct[iId] === Number(wId) &&
        Number(iId) !== selectedImg,
    );
    if (alreadyLockedElsewhere) return;

    setMatches((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        if (updated[k] === wordId) {
          if (showResult && validatedMatches[k] === correct[k]) return;
          delete updated[k];
        }
      });
      updated[selectedImg] = wordId;
      return updated;
    });
    setSelectedImg(null);
  };

  /* ---- check ---- */
  const handleCheck = () => {
    if (locked) return;
    if (Object.keys(matches).length !== images.length) {
      ValidationAlert.info("Please match all images.");
      return;
    }
    let score = 0;
    Object.entries(matches).forEach(([iId, wId]) => {
      if (correct[iId] === wId) score++;
    });
    const total = images.length;
    setValidatedMatches(matches);
    setShowResult(true);
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  /* ---- show ---- */
  const handleShow = () => {
    setMatches(correct);
    setValidatedMatches(correct);
    setShowResult(true);
    setLocked(true);
    setSelectedImg(null);
  };

  /* ---- reset ---- */
  const handleReset = () => {
    setMatches({});
    setValidatedMatches({});
    setShowResult(false);
    setLocked(false);
    setSelectedImg(null);
  };

  /* ---- style helpers ---- */
  const imgBorder = (imgId) => {
    if (selectedImg === imgId) return "2px solid #F5A623";
    if (showResult && validatedMatches[imgId] !== undefined)
      return validatedMatches[imgId] === correct[imgId]
        ? "2px solid #F5A623"
        : "2px solid #dc2626";
    if (matches[imgId] !== undefined) return "2px solid #f79631";
    return "2px solid transparent";
  };

  const lineColor = (imgId) => {
    if (showResult && validatedMatches[imgId] !== undefined)
      return validatedMatches[imgId] === correct[imgId] ? "#F5A623" : "#dc2626";
    return "#F5A623";
  };

  const wordStyle = (wordId) => {
    const ownerImg = Object.keys(matches).find((k) => matches[k] === wordId);
    const isSelected = selectedImg !== null;
    if (showResult && ownerImg !== undefined) {
      const ok = validatedMatches[ownerImg] === correct[ownerImg];
      return { color: ok ? "" : "#dc2626", fontWeight: 700 };
    }
    if (ownerImg !== undefined) return { color: "#F5A623", fontWeight: 700 };
    return {
      // color: isSelected ? "#f79631" : "#333",
      fontWeight: 500,
      cursor: isSelected ? "pointer" : "default",
    };
  };

  /* ---- compute SVG lines ---- */
  const computeLines = () => {
    if (!containerRef.current) return [];
    const cRect = containerRef.current.getBoundingClientRect();

    return Object.entries(matches)
      .map(([imgId, wordId]) => {
        const imgDot = imgDotRefs.current[imgId];
        const wordDot = wordDotRefs.current[wordId];
        if (!imgDot || !wordDot) return null;

        const iRect = imgDot.getBoundingClientRect();
        const wRect = wordDot.getBoundingClientRect();

        return {
          key: `${imgId}-${wordId}`,
          x1: iRect.left + iRect.width / 2 - cRect.left,
          y1: iRect.top + iRect.height / 2 - cRect.top,
          x2: wRect.left + wRect.width / 2 - cRect.left,
          y2: wRect.top + wRect.height / 2 - cRect.top,
          color: lineColor(Number(imgId)),
        };
      })
      .filter(Boolean);
  };

  const lines = computeLines();

  return (
    <div
      ref={containerRef}
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span style={{ marginRight: "10px" }}>A</span>
          Match each picture to its vocabulary word.
        </h5>

        {/* IMAGES ROW */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => handleImgClick(img.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: locked ? "default" : "pointer",
                userSelect: "none",
              }}
            >
              <img
                src={img.img}
                alt={`img-${img.id}`}
                style={{
                  width: "auto",
                  height: "90px",
                  objectFit: "contain",
                  borderRadius: "10px",
                  border: imgBorder(img.id),
                  background:
                    selectedImg === img.id
                      ? "rgba(109,41,128,0.1)"
                      : "transparent",
                  transition: "border 0.2s, background 0.2s",
                  boxSizing: "border-box",
                }}
              />
              {/* dot تحت الصورة */}
              <div
                ref={(el) => (imgDotRefs.current[img.id] = el)}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: selectedImg === img.id ? "#F5A623" : "#F5A623",
                  marginTop: "8px",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>

        {/* SPACER for lines */}
        <div style={{ height: "160px" }} />

        {/* WORDS ROW */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "10px",
            marginBottom: "50px",
          }}
        >
          {words.map((w) => (
            <div
              key={w.id}
              onClick={() => handleWordClick(w.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                userSelect: "none",
              }}
            >
              {/* dot فوق الكلمة */}
              <div
                ref={(el) => (wordDotRefs.current[w.id] = el)}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#F5A623",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                  cursor: locked ? "default" : "pointer",
                  transition: "color 0.2s",
                  paddingBottom: "2px",
                  ...wordStyle(w.id),
                }}
              >
                {w.text}
              </span>
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

      {/* SVG LINES */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {lines.map((line) => (
          <line
            key={line.key}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
};

export default Review3_Page1_Q1;
