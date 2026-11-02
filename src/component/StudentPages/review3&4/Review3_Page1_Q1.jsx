import React, { useEffect, useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4StudentAudioText, {
  stopUnit4StudentAudio,
  unit4StudentAudio,
} from "../unit4/Unit4StudentAudioText";

import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 47.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 48.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 49.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 50.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 51.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 52.svg";

const Review3_Page1_Q1 = () => {
  const images = [
    { id: 0, img: img1, alt: "An exhausted person resting beside a cup" },
    { id: 1, img: img2, alt: "A fast-food hamburger and fries" },
    { id: 2, img: img3, alt: "A diner counter with stools" },
    { id: 3, img: img4, alt: "Leftovers stored in food containers" },
    { id: 4, img: img5, alt: "A plate of liver and onions" },
    { id: 5, img: img6, alt: "A plate of mashed potatoes" },
  ];

  const words = [
    { id: 0, text: "fast foods", audio: "Item_001_" },
    { id: 1, text: "leftovers", audio: "Item_002_" },
    { id: 2, text: "mashed potatoes", audio: "Item_003_" },
    { id: 3, text: "exhausted", audio: "Item_004_" },
    { id: 4, text: "liver", audio: "Item_005_" },
    { id: 5, text: "diner", audio: "Item_006_" },
  ];

  const correct = { 0: 3, 1: 0, 2: 5, 3: 1, 4: 4, 5: 2 };

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [keyboardSelection, setKeyboardSelection] = useState(false);
  const [focusedEndpoint, setFocusedEndpoint] = useState(null);
  const [, setLayoutVersion] = useState(0);
  const [matches, setMatches] = useState({});
  const [validatedMatches, setValidatedMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const containerRef = useRef(null);
  const imgDotRefs = useRef([]); // dot تحت كل صورة
  const wordDotRefs = useRef([]); // dot فوق كل كلمة
  const imgItemRefs = useRef([]);
  const wordItemRefs = useRef([]);

  useEffect(() => {
    const refresh = () => setLayoutVersion((value) => value + 1);
    window.addEventListener("resize", refresh);
    return () => window.removeEventListener("resize", refresh);
  }, []);

  const isCorrectlyLocked = (imgId) =>
    showResult && validatedMatches[imgId] === correct[imgId];

  const wordOwner = (wordId) =>
    Object.keys(matches).find((imgId) => matches[imgId] === wordId);

  const connect = (imgId, wordId) => {
    if (locked || isCorrectlyLocked(imgId)) return false;
    const owner = wordOwner(wordId);
    if (owner !== undefined && isCorrectlyLocked(Number(owner))) return false;

    setMatches((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === wordId && Number(key) !== imgId)
          delete updated[key];
      });
      updated[imgId] = wordId;
      return updated;
    });
    setValidatedMatches((previous) => {
      const updated = { ...previous };
      delete updated[imgId];
      if (owner !== undefined) delete updated[owner];
      return updated;
    });
    setSelectedImg(null);
    setSelectedWord(null);
    setKeyboardSelection(false);
    setFocusedEndpoint(null);
    return true;
  };

  /* ---- click image ---- */
  const handleImgClick = (imgId, fromKeyboard = false) => {
    if (locked || isCorrectlyLocked(imgId)) return;
    if (selectedWord !== null) {
      const connected = connect(imgId, selectedWord);
      if (connected && fromKeyboard) {
        requestAnimationFrame(() => {
          const next = images.find(
            (image) => matches[image.id] === undefined && image.id !== imgId,
          );
          imgItemRefs.current[next?.id]?.focus();
        });
      }
      return;
    }
    if (selectedImg === imgId) {
      setSelectedImg(null);
      setKeyboardSelection(false);
      return;
    }
    setSelectedImg(imgId);
    setSelectedWord(null);
    setKeyboardSelection(fromKeyboard);
    setValidatedMatches((prev) => {
      const n = { ...prev };
      delete n[imgId];
      return n;
    });
    if (fromKeyboard) {
      requestAnimationFrame(() => {
        const firstWord = words.find((word) => {
          const owner = wordOwner(word.id);
          return owner === undefined || !isCorrectlyLocked(Number(owner));
        });
        wordItemRefs.current[firstWord?.id]?.focus();
      });
    }
  };

  /* ---- click word ---- */
  const handleWordClick = (wordId, fromKeyboard = false) => {
    if (locked) return;
    const owner = wordOwner(wordId);
    if (owner !== undefined && isCorrectlyLocked(Number(owner))) return;

    if (selectedImg !== null) {
      const connected = connect(selectedImg, wordId);
      if (connected && fromKeyboard) {
        requestAnimationFrame(() => {
          const next = images.find(
            (image) =>
              matches[image.id] === undefined && image.id !== selectedImg,
          );
          imgItemRefs.current[next?.id]?.focus();
        });
      }
      return;
    }

    if (selectedWord === wordId) {
      setSelectedWord(null);
      setKeyboardSelection(false);
      return;
    }
    setSelectedWord(wordId);
    setSelectedImg(null);
    setKeyboardSelection(fromKeyboard);
    if (fromKeyboard) {
      requestAnimationFrame(() => {
        const firstImage = images.find((image) => !isCorrectlyLocked(image.id));
        imgItemRefs.current[firstImage?.id]?.focus();
      });
    }
  };

  const handleEndpointKeyDown = (event, side, id) => {
    if (event.key === "Tab" && keyboardSelection) {
      const expectedSide = selectedImg !== null ? "word" : "image";
      if (side === expectedSide) {
        const ids =
          side === "word"
            ? words
                .filter((word) => {
                  const owner = wordOwner(word.id);
                  return (
                    owner === undefined || !isCorrectlyLocked(Number(owner))
                  );
                })
                .map((word) => word.id)
            : images
                .filter((image) => !isCorrectlyLocked(image.id))
                .map((image) => image.id);
        const currentIndex = Math.max(0, ids.indexOf(id));
        const step = event.shiftKey ? -1 : 1;
        const nextId = ids[(currentIndex + step + ids.length) % ids.length];
        event.preventDefault();
        const refs = side === "word" ? wordItemRefs : imgItemRefs;
        refs.current[nextId]?.focus();
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      const sourceImage = selectedImg;
      const sourceWord = selectedWord;
      setSelectedImg(null);
      setSelectedWord(null);
      setKeyboardSelection(false);
      setFocusedEndpoint(null);
      requestAnimationFrame(() => {
        if (sourceImage !== null) imgItemRefs.current[sourceImage]?.focus();
        if (sourceWord !== null) wordItemRefs.current[sourceWord]?.focus();
      });
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.repeat) return;
    if (side === "image") handleImgClick(id, true);
    else handleWordClick(id, true);
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
    setSelectedWord(null);
    setKeyboardSelection(false);
    setFocusedEndpoint(null);
  };

  /* ---- reset ---- */
  const handleReset = () => {
    stopUnit4StudentAudio();
    setMatches({});
    setValidatedMatches({});
    setShowResult(false);
    setLocked(false);
    setSelectedImg(null);
    setSelectedWord(null);
    setKeyboardSelection(false);
    setFocusedEndpoint(null);
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
    const isSelected = selectedImg !== null || selectedWord === wordId;
    if (selectedWord === wordId) {
      return { color: "#F5A623", fontWeight: 700, cursor: "pointer" };
    }
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

  const computePreviewLine = () => {
    if (!keyboardSelection || !focusedEndpoint || !containerRef.current)
      return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    let start = null;
    let end = null;

    if (selectedImg !== null && focusedEndpoint.side === "word") {
      start = imgDotRefs.current[selectedImg];
      end = wordDotRefs.current[focusedEndpoint.id];
    } else if (selectedWord !== null && focusedEndpoint.side === "image") {
      start = wordDotRefs.current[selectedWord];
      end = imgDotRefs.current[focusedEndpoint.id];
    }
    if (!start || !end) return null;
    const startRect = start.getBoundingClientRect();
    const endRect = end.getBoundingClientRect();
    return {
      x1: startRect.left + startRect.width / 2 - containerRect.left,
      y1: startRect.top + startRect.height / 2 - containerRect.top,
      x2: endRect.left + endRect.width / 2 - containerRect.left,
      y2: endRect.top + endRect.height / 2 - containerRect.top,
    };
  };

  const previewLine = computePreviewLine();

  return (
    <div
      ref={containerRef}
      data-review3-page1-q1
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div className="div-forall" style={{ gap: "30px" }}>
        <style>{`
          [data-review3-page1-q1] [data-match-endpoint]:focus-visible {
            outline: 4px solid #2563eb;
            outline-offset: 3px;
            border-radius: 10px;
          }
          [data-review3-page1-q1] .matching-preview-line {
            animation: blink-preview-review3-page1-q1 0.8s ease-in-out infinite;
          }
          @keyframes blink-preview-review3-page1-q1 {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>

        <ExerciseHeaderReview
          sectionLetter="A"
          title="Match each picture to its vocabulary word."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />

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
              ref={(el) => (imgItemRefs.current[img.id] = el)}
              role="button"
              tabIndex={locked || isCorrectlyLocked(img.id) ? -1 : 0}
              data-match-endpoint
              aria-label={`Select picture ${img.id + 1}: ${img.alt}`}
              aria-pressed={selectedImg === img.id}
              aria-disabled={locked || isCorrectlyLocked(img.id)}
              onClick={() => handleImgClick(img.id, false)}
              onKeyDown={(event) =>
                handleEndpointKeyDown(event, "image", img.id)
              }
              onFocus={() => setFocusedEndpoint({ side: "image", id: img.id })}
              onBlur={() => setFocusedEndpoint(null)}
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
                alt={img.alt}
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
              ref={(el) => (wordItemRefs.current[w.id] = el)}
              role="button"
              tabIndex={
                locked ||
                (wordOwner(w.id) !== undefined &&
                  isCorrectlyLocked(Number(wordOwner(w.id))))
                  ? -1
                  : 0
              }
              data-match-endpoint
              aria-label={`Select ${w.text}`}
              aria-pressed={selectedWord === w.id}
              aria-disabled={
                locked ||
                (wordOwner(w.id) !== undefined &&
                  isCorrectlyLocked(Number(wordOwner(w.id))))
              }
              onClick={(event) => handleWordClick(w.id, event.detail === 0)}
              onKeyDown={(event) => {
                if (
                  (event.key === "Enter" || event.key === " ") &&
                  !event.repeat
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                  event.currentTarget.querySelector("button")?.click();
                  return;
                }
                if (event.key === "Escape" || event.key === "Tab") {
                  handleEndpointKeyDown(event, "word", w.id);
                }
              }}
              onFocus={() => setFocusedEndpoint({ side: "word", id: w.id })}
              onBlur={() => setFocusedEndpoint(null)}
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
              <Unit4StudentAudioText
                src={unit4StudentAudio("Page 34 - Exercise A", w.audio)}
                ariaLabel={`Play ${w.text}`}
                focusable={false}
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
        {lines.map((line) => {
          const imageId = Number(line.key.split("-")[0]);
          const isWrong =
            showResult &&
            validatedMatches[imageId] !== undefined &&
            validatedMatches[imageId] !== correct[imageId];
          const middleX = (line.x1 + line.x2) / 2;
          const middleY = (line.y1 + line.y2) / 2;

          return (
            <g key={line.key}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {isWrong && (
                <foreignObject
                  x={middleX - 11}
                  y={middleY}
                  width="22"
                  height="44"
                  aria-hidden="true"
                  style={{ overflow: "visible" }}
                >
                  <span
                    style={{
                      transform: "translateY(-50%)",
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
                      boxSizing: "border-box",
                    }}
                  >
                    ✕
                  </span>
                </foreignObject>
              )}
            </g>
          );
        })}
        {previewLine && (
          <line
            className="matching-preview-line"
            x1={previewLine.x1}
            y1={previewLine.y1}
            x2={previewLine.x2}
            y2={previewLine.y2}
            stroke="#f79631"
            strokeWidth="3"
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

export default Review3_Page1_Q1;
