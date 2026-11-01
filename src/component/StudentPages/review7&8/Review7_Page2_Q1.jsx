import React, { useEffect, useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit8StudentAudioText, {
  stopUnit8StudentAudio,
  unit8StudentAudio,
  unit8StudentAudioSequence,
} from "../unit8/Unit8StudentAudioText";
const Review7_Page2_Q1 = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [previewTarget, setPreviewTarget] = useState(null);
  const [keyboardPreview, setKeyboardPreview] = useState(false);
  const [matches, setMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [validatedMatches, setValidatedMatches] = useState({});

  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => () => stopUnit8StudentAudio(), []);

  const questions = [
    { id: 0, text: "If we had more rain this year," },
    { id: 1, text: "If we had taken tennis lessons," },
    { id: 2, text: "If we had studied for the test," },
    { id: 3, text: "If we had stayed in our old house," },
  ];

  const sentences = [
    { id: 0, text: "we wouldn’t have had low grades." },
    { id: 1, text: "we would have been better players." },
    { id: 2, text: "we would have seen you more often." },
    { id: 3, text: "the plants would have been greener and bigger." },
  ];

  const correct = {
    0: 3,
    1: 1,
    2: 0,
    3: 2,
  };

  const isLeftLocked = (id) => validatedMatches[id] === correct[id];
  const isRightLocked = (id) =>
    Object.entries(validatedMatches).some(
      ([leftId, rightId]) =>
        Number(rightId) === id && correct[leftId] === Number(rightId),
    );

  const focusFirstUnlocked = (side) => {
    const refs = side === "left" ? imageRefs.current : sentenceRefs.current;
    const index = questions.findIndex((_, itemIndex) =>
      side === "left" ? !isLeftLocked(itemIndex) : !isRightLocked(itemIndex),
    );
    if (index >= 0) refs[index]?.parentElement?.focus();
  };

  const handleChoiceKeyDown = (side, id, event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (event.repeat) return;
      setKeyboardPreview(true);
      const audioTarget = event.currentTarget.querySelector(
        ".unit8-student-audio-text",
      );
      if (audioTarget) {
        audioTarget.click();
      } else if (side === "left") {
        selectImage(id);
      } else {
        selectSentence(id);
      }
      return;
    }
    const shouldTrap =
      event.key === "Tab" &&
      ((selectedImg !== null && side === "right") ||
        (selectedSentence !== null && side === "left"));
    if (!shouldTrap) return;
    event.preventDefault();
    setKeyboardPreview(true);
    const available = questions
      .map((_, itemIndex) => itemIndex)
      .filter((itemIndex) =>
        side === "left" ? !isLeftLocked(itemIndex) : !isRightLocked(itemIndex),
      );
    const current = available.indexOf(id);
    const offset = event.shiftKey ? -1 : 1;
    const next =
      available[(current + offset + available.length) % available.length];
    const refs = side === "left" ? imageRefs.current : sentenceRefs.current;
    refs[next]?.parentElement?.focus();
  };

  const commitMatch = (questionId, sentenceId) => {
    if (locked || validatedMatches[questionId] === correct[questionId]) return;
    const targetLocked = Object.entries(validatedMatches).some(
      ([leftId, rightId]) =>
        Number(rightId) === sentenceId && correct[leftId] === Number(rightId),
    );
    if (targetLocked) return;

    setMatches((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (
          updated[key] === sentenceId &&
          validatedMatches[key] !== correct[key]
        ) {
          delete updated[key];
        }
      });
      updated[questionId] = sentenceId;
      return updated;
    });
    setValidatedMatches((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
    setSelectedImg(null);
    setSelectedSentence(null);
    setPreviewTarget(null);
    requestAnimationFrame(() => {
      const next = questions.findIndex(
        (_, index) =>
          index !== questionId && validatedMatches[index] !== correct[index],
      );
      if (next >= 0) imageRefs.current[next]?.parentElement?.focus();
    });
  };

  const selectImage = (id) => {
    if (showResult && validatedMatches[id] === correct[id]) return;

    if (selectedSentence !== null) {
      commitMatch(id, selectedSentence);
      return;
    }

    setSelectedImg(id);
    setSelectedSentence(null);

    // أول ما يبدأ يعدل شيل التقييم القديم
    setValidatedMatches((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    requestAnimationFrame(() => focusFirstUnlocked("right"));
  };

  const selectSentence = (id) => {
    if (isRightLocked(id)) return;
    if (selectedImg === null) {
      setSelectedSentence(id);
      setSelectedImg(null);
      requestAnimationFrame(() => focusFirstUnlocked("left"));
      return;
    }
    if (locked) {
      return;
    }
    if (showResult && validatedMatches[selectedImg] === correct[selectedImg]) {
      setSelectedImg(null);
      return;
    }

    const alreadyCorrectlyUsed =
      showResult &&
      Object.entries(validatedMatches).some(
        ([imgId, sentId]) =>
          Number(sentId) === id &&
          correct[imgId] === Number(sentId) &&
          Number(imgId) !== selectedImg,
      );

    if (alreadyCorrectlyUsed) {
      return;
    }

    commitMatch(selectedImg, id);
  };
  const checkAnswers = () => {
    if (locked) return;

    if (Object.keys(matches).length !== questions.length) {
      ValidationAlert.info("Please match all.");
      return;
    }

    let correctCount = 0;

    Object.entries(matches).forEach(([imgId, sentId]) => {
      if (correct[imgId] === sentId) correctCount++;
    });

    const total = questions.length;

    const message = `
        Score: ${correctCount} / ${total}
  `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(message);
    } else if (correctCount === 0) {
      ValidationAlert.error(message);
    } else {
      ValidationAlert.warning(message);
    }
    setValidatedMatches(matches);
    setShowResult(true);
  };

  const showAnswers = () => {
    setMatches(correct);
    setLocked(true);
    setShowResult(true);
    setSelectedImg(null);
    setSelectedSentence(null);
    setPreviewTarget(null);
    setKeyboardPreview(false);
  };

  const reset = () => {
    stopUnit8StudentAudio();
    setValidatedMatches({});
    setSelectedImg(null);
    setSelectedSentence(null);
    setPreviewTarget(null);
    setKeyboardPreview(false);
    setMatches({});
    setShowResult(false);
    setLocked(false);
  };

  const renderPreviewLine = () => {
    if (!keyboardPreview || !containerRef.current) return null;
    let leftId = selectedImg;
    let rightId = previewTarget?.side === "right" ? previewTarget.id : null;
    if (selectedSentence !== null) {
      leftId = previewTarget?.side === "left" ? previewTarget.id : null;
      rightId = selectedSentence;
    }
    if (leftId === null || rightId === null) return null;
    const leftDot = imageRefs.current[leftId];
    const rightDot = sentenceRefs.current[rightId];
    if (!leftDot || !rightDot) return null;
    const leftRect = leftDot.getBoundingClientRect();
    const rightRect = rightDot.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    return (
      <line
        x1={leftRect.left + leftRect.width / 2 - containerRect.left}
        y1={leftRect.top + leftRect.height / 2 - containerRect.top}
        x2={rightRect.left + rightRect.width / 2 - containerRect.left}
        y2={rightRect.top + rightRect.height / 2 - containerRect.top}
        stroke="#f79631"
        strokeWidth="2"
        strokeDasharray="6 5"
        strokeLinecap="round"
      />
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div className="div-forall gap-7">
        <ExerciseHeaderReview
          sectionLetter="D"
          title="Match the first part of each sentence with its second part to make a third conditional sentence."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />
        {/* 🔥 الصور فوق */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-y-12">
          {questions.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr] items-center gap-x-24"
            >
              {/* Question */}
              <div
                onClick={() => selectImage(i)}
                onPointerDown={() => {
                  setKeyboardPreview(false);
                  setPreviewTarget(null);
                }}
                onKeyDown={(event) => handleChoiceKeyDown("left", i, event)}
                onFocus={() => setPreviewTarget({ side: "left", id: i })}
                role="button"
                tabIndex={isLeftLocked(i) ? -1 : 0}
                aria-pressed={selectedImg === i}
                className="relative flex items-center cursor-pointer min-h-[50px]"
                style={{
                  backgroundColor:
                    selectedImg === i ? "#fff5e8ff" : "transparent",
                  border:
                    selectedImg === i
                      ? "1px solid #f79631"
                      : "1px solid transparent",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  transition: "all 0.2s ease",
                }}
              >
                <span className="font-bold text-[18px] w-8 shrink-0">
                  {i + 1}
                </span>

                <Unit8StudentAudioText
                  src={unit8StudentAudio(
                    "Page 71 - Exercise D",
                    i === 3
                      ? "Item_008_"
                      : `Item_${String(i * 2 + 1).padStart(3, "0")}_`,
                  )}
                  ariaLabel={`Play sentence beginning ${i + 1}`}
                  flowText
                  focusable={false}
                  className="text-[18px]"
                >
                  {item.text}
                </Unit8StudentAudioText>

                <div
                  ref={(el) => (imageRefs.current[i] = el)}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "12px",
                    height: "12px",
                    backgroundColor: selectedImg === i ? "#2563eb" : "#F59E0B",
                    boxShadow:
                      selectedImg === i
                        ? "0 0 0 4px rgba(37,99,235,.2)"
                        : "none",
                    borderRadius: "50%",
                  }}
                />
                {showResult &&
                  validatedMatches[i] !== undefined &&
                  correct[i] !== validatedMatches[i] && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "25px",
                        width: "20px",
                        height: "20px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
              </div>
              {/* Answer */}
              <div
                onClick={() => selectSentence(i)}
                onPointerDown={() => {
                  setKeyboardPreview(false);
                  setPreviewTarget(null);
                }}
                onKeyDown={(event) => handleChoiceKeyDown("right", i, event)}
                onFocus={() => setPreviewTarget({ side: "right", id: i })}
                role="button"
                tabIndex={isRightLocked(i) ? -1 : 0}
                aria-pressed={selectedSentence === i}
                className="relative flex items-center cursor-pointer min-h-[50px]"
                style={{
                  backgroundColor:
                    selectedSentence === i ? "#fff5e8ff" : "transparent",
                  border:
                    selectedSentence === i
                      ? "1px solid #f79631"
                      : "1px solid transparent",
                  borderRadius: "10px",
                  padding: "8px 12px",
                }}
              >
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "12px",
                    height: "12px",
                    backgroundColor:
                      selectedSentence === i ? "#2563eb" : "#F59E0B",
                    boxShadow:
                      selectedSentence === i
                        ? "0 0 0 4px rgba(37,99,235,.2)"
                        : "none",
                    borderRadius: "50%",
                  }}
                />

                <span className="font-bold text-[18px] ml-8 mr-4 w-5">
                  {String.fromCharCode(97 + i)}
                </span>

                <Unit8StudentAudioText
                  src={
                    i === 3
                      ? unit8StudentAudioSequence("Page 71 - Exercise D", [
                          "Item_007_",
                          "Item_009_",
                        ])
                      : unit8StudentAudio(
                          "Page 71 - Exercise D",
                          `Item_${String(i * 2 + 2).padStart(3, "0")}_`,
                        )
                  }
                  ariaLabel={`Play sentence ending ${String.fromCharCode(97 + i)}`}
                  flowText
                  focusable={false}
                  className="text-[18px]"
                >
                  {sentences[i].text}
                </Unit8StudentAudioText>
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {renderPreviewLine()}
        {Object.entries(matches).map(([imgId, sentId], i) => {
          const imgDot = imageRefs.current[imgId];
          const sentDot = sentenceRefs.current[sentId];

          if (!imgDot || !sentDot || !containerRef.current) return null;

          const imgRect = imgDot.getBoundingClientRect();
          const sentRect = sentDot.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const x1 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y1 = imgRect.top + imgRect.height / 2 - containerRect.top;

          const x2 = sentRect.left + sentRect.width / 2 - containerRect.left;
          const y2 = sentRect.top + sentRect.height / 2 - containerRect.top;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f79631"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review7_Page2_Q1;
