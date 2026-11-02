import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 12.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 13.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 14.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 15.svg";

const Unit10_Page4_WritingA = () => {
  const [selected, setSelected] = useState(null);

  const [matches, setMatches] = useState({});

  const [validatedMatches, setValidatedMatches] = useState({});

  const [showResult, setShowResult] = useState(false);

  const [lockedIds, setLockedIds] = useState([]);

  const [showAnswer, setShowAnswer] = useState(false);

  const [checkCompleted, setCheckCompleted] = useState(false);

  const [keyboardStart, setKeyboardStart] = useState(null);

  const [keyboardTarget, setKeyboardTarget] = useState(null);

  const imageDotRefs = useRef({});
  const careerDotRefs = useRef({});

  const imageFocusRefs = useRef({});
  const careerFocusRefs = useRef({});

  const containerRef = useRef(null);

  const images = [
    {
      id: 0,
      img: img1,
      alt: "A person working as an engineer.",
    },
    {
      id: 1,
      img: img2,
      alt: "A person working as a manager.",
    },
    {
      id: 2,
      img: img3,
      alt: "A person selling products.",
    },
    {
      id: 3,
      img: img4,
      alt: "A person working as a butcher.",
    },
    {
      id: 4,
      img: img5,
      alt: "A person working as a nurse.",
    },
  ];

  const careers = [
    {
      id: 0,
      text: "butchering",
    },
    {
      id: 1,
      text: "engineering",
    },
    {
      id: 2,
      text: "nursing",
    },
    {
      id: 3,
      text: "managing",
    },
    {
      id: 4,
      text: "selling",
    },
  ];

  const correct = {
    0: 1,
    1: 3,
    2: 4,
    3: 0,
    4: 2,
  };

  /* =====================================================
     LOCK HELPERS
  ===================================================== */

  const isImageLocked = (id) => lockedIds.includes(id);

  const isCareerLocked = (careerId) =>
    Object.entries(matches).some(
      ([imageId, matchedCareerId]) =>
        Number(matchedCareerId) === careerId &&
        lockedIds.includes(Number(imageId)),
    );

  const getAvailableImages = () =>
    images.map((item) => item.id).filter((id) => !isImageLocked(id));

  const getAvailableCareers = () =>
    careers.map((item) => item.id).filter((id) => !isCareerLocked(id));

  /* =====================================================
     FOCUS
  ===================================================== */

  const focusImage = (id) => {
    requestAnimationFrame(() => {
      imageFocusRefs.current[id]?.focus({
        preventScroll: true,
      });
    });
  };

  const focusCareer = (id) => {
    requestAnimationFrame(() => {
      careerFocusRefs.current[id]?.focus({
        preventScroll: true,
      });
    });
  };

  const focusNextUnmatchedImage = (justMatchedImageId) => {
    requestAnimationFrame(() => {
      const connectedIds = new Set(Object.keys(matches).map(Number));

      connectedIds.add(justMatchedImageId);

      const nextImage = images.find(
        (item) => !connectedIds.has(item.id) && !isImageLocked(item.id),
      );

      if (nextImage) {
        focusImage(nextImage.id);
      }
    });
  };

  /* =====================================================
     COMMIT MATCH
  ===================================================== */

  const commitMatch = (imageId, careerId) => {
    if (
      showAnswer ||
      checkCompleted ||
      isImageLocked(imageId) ||
      isCareerLocked(careerId)
    ) {
      return;
    }

    const displacedImage = Object.entries(matches).find(
      ([otherImageId, otherCareerId]) =>
        Number(otherCareerId) === careerId &&
        Number(otherImageId) !== imageId &&
        !isImageLocked(Number(otherImageId)),
    );

    setMatches((prev) => {
      const updated = {
        ...prev,
      };

      delete updated[imageId];

      Object.keys(updated).forEach((imageKey) => {
        if (
          updated[imageKey] === careerId &&
          !isImageLocked(Number(imageKey))
        ) {
          delete updated[imageKey];
        }
      });

      updated[imageId] = careerId;

      return updated;
    });

    setValidatedMatches((prev) => {
      const updated = {
        ...prev,
      };

      delete updated[imageId];

      if (displacedImage) {
        delete updated[Number(displacedImage[0])];
      }

      return updated;
    });

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     MOUSE IMAGE
  ===================================================== */

  const handleImageClick = (imageId) => {
    if (showAnswer || checkCompleted || isImageLocked(imageId)) {
      return;
    }

    if (selected?.side === "career") {
      commitMatch(imageId, selected.id);
      return;
    }

    setSelected({
      side: "image",
      id: imageId,
    });

    setKeyboardStart(null);
    setKeyboardTarget(null);

    setValidatedMatches((prev) => {
      const updated = {
        ...prev,
      };

      delete updated[imageId];

      return updated;
    });
  };

  /* =====================================================
     MOUSE CAREER
  ===================================================== */

  const handleCareerClick = (careerId) => {
    if (showAnswer || checkCompleted || isCareerLocked(careerId)) {
      return;
    }

    if (selected?.side === "image") {
      commitMatch(selected.id, careerId);
      return;
    }

    setSelected({
      side: "career",
      id: careerId,
    });

    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     START KEYBOARD FROM IMAGE
  ===================================================== */

  const startKeyboardFromImage = (imageId) => {
    if (showAnswer || checkCompleted || isImageLocked(imageId)) {
      return;
    }

    const available = getAvailableCareers();

    if (!available.length) return;

    setSelected({
      side: "image",
      id: imageId,
    });

    setKeyboardStart({
      side: "image",
      id: imageId,
    });

    setKeyboardTarget({
      side: "career",
      id: available[0],
    });

    setValidatedMatches((prev) => {
      const updated = {
        ...prev,
      };

      delete updated[imageId];

      return updated;
    });

    focusCareer(available[0]);
  };

  /* =====================================================
     START KEYBOARD FROM CAREER
  ===================================================== */

  const startKeyboardFromCareer = (careerId) => {
    if (showAnswer || checkCompleted || isCareerLocked(careerId)) {
      return;
    }

    const available = getAvailableImages();

    if (!available.length) return;

    setSelected({
      side: "career",
      id: careerId,
    });

    setKeyboardStart({
      side: "career",
      id: careerId,
    });

    setKeyboardTarget({
      side: "image",
      id: available[0],
    });

    focusImage(available[0]);
  };

  /* =====================================================
     CANCEL KEYBOARD
  ===================================================== */

  const cancelKeyboardMatch = () => {
    const origin = keyboardStart;

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);

    if (!origin) return;

    if (origin.side === "image") {
      focusImage(origin.id);
    } else {
      focusCareer(origin.id);
    }
  };

  /* =====================================================
     IMAGE KEYBOARD
  ===================================================== */

  const handleImageKeyDown = (event, imageId) => {
    if (keyboardStart?.side === "career" && keyboardTarget?.side === "image") {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        cancelKeyboardMatch();

        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();

        const available = getAvailableImages();

        if (!available.length) return;

        const index = available.indexOf(imageId);

        const direction = event.shiftKey ? -1 : 1;

        const next =
          available[(index + direction + available.length) % available.length];

        setKeyboardTarget({
          side: "image",
          id: next,
        });

        focusImage(next);

        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();

        commitMatch(imageId, keyboardStart.id);

        focusNextUnmatchedImage(imageId);

        return;
      }
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      startKeyboardFromImage(imageId);

      return;
    }

    if (event.key === "Escape" && selected?.side === "image") {
      event.preventDefault();
      event.stopPropagation();

      setSelected(null);
      setKeyboardStart(null);
      setKeyboardTarget(null);
    }
  };

  /* =====================================================
     CAREER KEYBOARD
  ===================================================== */

  const handleCareerKeyDown = (event, careerId) => {
    if (keyboardStart?.side === "image" && keyboardTarget?.side === "career") {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        cancelKeyboardMatch();

        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();

        const available = getAvailableCareers();

        if (!available.length) return;

        const index = available.indexOf(careerId);

        const direction = event.shiftKey ? -1 : 1;

        const next =
          available[(index + direction + available.length) % available.length];

        setKeyboardTarget({
          side: "career",
          id: next,
        });

        focusCareer(next);

        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();

        const imageId = keyboardStart.id;

        commitMatch(imageId, careerId);

        focusNextUnmatchedImage(imageId);

        return;
      }
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      startKeyboardFromCareer(careerId);

      return;
    }

    if (event.key === "Escape" && selected?.side === "career") {
      event.preventDefault();
      event.stopPropagation();

      setSelected(null);
      setKeyboardStart(null);
      setKeyboardTarget(null);
    }
  };

  /* =====================================================
     CHECK
  ===================================================== */

  const checkAnswers = () => {
    if (showAnswer || checkCompleted) {
      return;
    }

    if (Object.keys(matches).length !== images.length) {
      ValidationAlert.info("Please match all.");

      return;
    }

    let correctCount = 0;

    const correctIds = [];

    Object.entries(matches).forEach(([imageId, careerId]) => {
      if (correct[imageId] === careerId) {
        correctCount++;

        correctIds.push(Number(imageId));
      }
    });

    setValidatedMatches(matches);
    setShowResult(true);

    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);

    const total = images.length;

    const message = `Score: ${correctCount} / ${total}`;

    if (correctCount === total) {
      setLockedIds(images.map((item) => item.id));

      setCheckCompleted(true);

      ValidationAlert.success(message);
    } else if (correctCount === 0) {
      ValidationAlert.error(message);
    } else {
      ValidationAlert.warning(message);
    }

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     SHOW ANSWERS
  ===================================================== */

  const showAnswers = () => {
    setMatches(correct);

    setValidatedMatches(correct);

    setLockedIds(images.map((item) => item.id));

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);

    setShowResult(true);
    setShowAnswer(true);
    setCheckCompleted(true);
  };

  /* =====================================================
     RESET
  ===================================================== */

  const reset = () => {
    setSelected(null);

    setValidatedMatches({});

    setMatches({});

    setShowResult(false);

    setLockedIds([]);

    setShowAnswer(false);

    setCheckCompleted(false);

    setKeyboardStart(null);

    setKeyboardTarget(null);
  };

  /* =====================================================
     LINE HELPERS
  ===================================================== */

  const getPoint = (element) => {
    if (!element || !containerRef.current) {
      return null;
    }

    const rect = element.getBoundingClientRect();

    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2 - containerRect.left,

      y: rect.top + rect.height / 2 - containerRect.top,
    };
  };

  const getPreviewLine = () => {
    if (!keyboardStart || !keyboardTarget) {
      return null;
    }

    if (keyboardStart.side === "image" && keyboardTarget.side === "career") {
      const from = getPoint(imageDotRefs.current[keyboardStart.id]);

      const to = getPoint(careerDotRefs.current[keyboardTarget.id]);

      if (!from || !to) {
        return null;
      }

      return {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
      };
    }

    if (keyboardStart.side === "career" && keyboardTarget.side === "image") {
      const from = getPoint(imageDotRefs.current[keyboardTarget.id]);

      const to = getPoint(careerDotRefs.current[keyboardStart.id]);

      if (!from || !to) {
        return null;
      }

      return {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
      };
    }

    return null;
  };

  const previewLine = getPreviewLine();

  return (
    <div
      ref={containerRef}
      className="relative space-y-4 w-full max-w-[900px] mx-auto"
    >
      <style>{`
        .unit10-career-match {
          outline: none;
          border-radius: 12px;
        }

        .unit10-career-match:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 4px;
        }

        .unit10-career-selected {
          outline: 3px solid #2563eb !important;
          outline-offset: 4px;
        }

        .unit10-career-keyboard-target {
          outline: 3px dashed #2563eb !important;
          outline-offset: 4px;
        }
      `}</style>

      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">A</span>
        Match each person to their career.
      </h5>

      <div className="w-full flex flex-col items-center gap-50">
        {/* =================================================
            IMAGES
        ================================================= */}

        <div className="grid grid-cols-5 w-full">
          {images.map((img, i) => {
            const imageSelected =
              selected?.side === "image" && selected.id === i;

            const imageKeyboardTarget =
              keyboardTarget?.side === "image" && keyboardTarget.id === i;

            const imageLocked = isImageLocked(i);

            return (
              <div
                key={i}
                ref={(el) => {
                  imageFocusRefs.current[i] = el;
                }}
                role="button"
                tabIndex={0}
                aria-label={`Match image ${i + 1}. ${img.alt}`}
                onClick={() => handleImageClick(i)}
                onKeyDown={(event) => handleImageKeyDown(event, i)}
                className={`
                  relative flex flex-col items-center gap-2
                  cursor-pointer transition
                  unit10-career-match

                  ${imageSelected ? "unit10-career-selected" : ""}

                  ${imageKeyboardTarget ? "unit10-career-keyboard-target" : ""}
                `}
                style={{
                  cursor: imageLocked ? "default" : "pointer",
                }}
              >
                <img
                  src={img.img}
                  alt={img.alt}
                  style={{
                    width: "140px",

                    height: "110px",

                    objectFit: "cover",

                    border:
                      imageSelected || imageKeyboardTarget
                        ? "1px solid #F59E0B"
                        : "1px solid transparent",

                    borderRadius: "12px",

                    padding: "4px",

                    backgroundColor: imageSelected ? "#fff7ee" : "transparent",

                    pointerEvents: "none",
                  }}
                />

                {/* WRONG */}

                {showResult &&
                  validatedMatches[i] !== undefined &&
                  correct[i] !== validatedMatches[i] && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",

                        top: "10px",

                        right: "10px",

                        width: "20px",

                        height: "20px",

                        background: "#ef4444",

                        color: "white",

                        borderRadius: "50%",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        fontSize: "14px",

                        fontWeight: "bold",

                        border: "2px solid white",

                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",

                        zIndex: 5,

                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </span>
                  )}

                {/* IMAGE DOT */}

                <div
                  ref={(el) => {
                    imageDotRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full mt-2 transition"
                  style={{
                    backgroundColor:
                      imageSelected || imageKeyboardTarget
                        ? "#2563eb"
                        : "#F59E0B",

                    transform: imageSelected ? "scale(1.4)" : "scale(1)",

                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* =================================================
            CAREERS
        ================================================= */}

        <div className="grid grid-cols-5 w-full">
          {careers.map((career, i) => {
            const careerSelected =
              selected?.side === "career" && selected.id === i;

            const careerKeyboardTarget =
              keyboardTarget?.side === "career" && keyboardTarget.id === i;

            const careerLocked = isCareerLocked(i);

            return (
              <div
                key={i}
                ref={(el) => {
                  careerFocusRefs.current[i] = el;
                }}
                role="button"
                tabIndex={careerLocked ? -1 : 0}
                aria-label={`Match career ${i + 1}: ${career.text}`}
                onClick={() => handleCareerClick(i)}
                onKeyDown={(event) => handleCareerKeyDown(event, i)}
                className={`
                  relative flex flex-col items-center
                  cursor-pointer unit10-career-match

                  ${careerSelected ? "unit10-career-selected" : ""}

                  ${careerKeyboardTarget ? "unit10-career-keyboard-target" : ""}
                `}
                style={{
                  cursor: careerLocked ? "default" : "pointer",
                }}
              >
                {/* CAREER DOT */}

                <div
                  ref={(el) => {
                    careerDotRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10"
                  style={{
                    width: "12px",

                    height: "12px",

                    backgroundColor:
                      careerSelected || careerKeyboardTarget
                        ? "#2563eb"
                        : "#F59E0B",

                    pointerEvents: "none",
                  }}
                />

                <div className="relative px-4 py-2 rounded-2xl text-[20px] text-center">
                  <span className="font-bold mr-3">{i + 1}</span>

                  {career.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =================================================
          LINES
      ================================================= */}

      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{
          overflow: "visible",
          zIndex: 0,
        }}
      >
        {/* PERMANENT */}

        {Object.entries(matches).map(([imageId, careerId]) => {
          const from = getPoint(imageDotRefs.current[imageId]);

          const to = getPoint(careerDotRefs.current[careerId]);

          if (!from || !to) {
            return null;
          }

          return (
            <line
              key={`${imageId}-${careerId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* KEYBOARD PREVIEW */}

        {previewLine && (
          <line
            x1={previewLine.x1}
            y1={previewLine.y1}
            x2={previewLine.x2}
            y2={previewLine.y2}
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* =================================================
          ACTION BUTTONS
      ================================================= */}

      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit10_Page4_WritingA;
