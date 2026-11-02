import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const Unit7_Page4_WritingA = () => {
  const [selected, setSelected] = useState(null);

  const [matches, setMatches] = useState({});

  const [validatedMatches, setValidatedMatches] = useState({});

  const [showResult, setShowResult] = useState(false);

  const [lockedIds, setLockedIds] = useState([]);

  const [showAnswer, setShowAnswer] = useState(false);

  const [checkCompleted, setCheckCompleted] = useState(false);

  const [keyboardStart, setKeyboardStart] = useState(null);

  const [keyboardTarget, setKeyboardTarget] = useState(null);

  const questionDotRefs = useRef({});
  const sentenceDotRefs = useRef({});

  const questionFocusRefs = useRef({});
  const sentenceFocusRefs = useRef({});

  const containerRef = useRef(null);

  const questions = [
    {
      id: 0,
      text: "If there had been a pot of gold at the end of that rainbow,",
    },
    {
      id: 1,
      text: "If he hadn’t lost his money,",
    },
    {
      id: 2,
      text: "If they had invited him,",
    },
    {
      id: 3,
      text: "If she had reminded me,",
    },
  ];

  const sentences = [
    {
      id: 0,
      text: "we would have been very happy.",
    },
    {
      id: 1,
      text: "he would have come.",
    },
    {
      id: 2,
      text: "he could have bought lunch.",
    },
    {
      id: 3,
      text: "I would have done it.",
    },
  ];

  const correct = {
    0: 0,
    1: 2,
    2: 1,
    3: 3,
  };

  /* =====================================================
     HELPERS
  ===================================================== */

  const isQuestionLocked = (id) => lockedIds.includes(id);

  const isSentenceLocked = (sentenceId) =>
    Object.entries(matches).some(
      ([questionId, matchedSentenceId]) =>
        Number(matchedSentenceId) === sentenceId &&
        lockedIds.includes(Number(questionId)),
    );

  const getAvailableQuestions = () =>
    questions.map((item) => item.id).filter((id) => !isQuestionLocked(id));

  const getAvailableSentences = () =>
    sentences.map((item) => item.id).filter((id) => !isSentenceLocked(id));

  const focusQuestion = (id) => {
    requestAnimationFrame(() => {
      questionFocusRefs.current[id]?.focus({
        preventScroll: true,
      });
    });
  };

  const focusSentence = (id) => {
    requestAnimationFrame(() => {
      sentenceFocusRefs.current[id]?.focus({
        preventScroll: true,
      });
    });
  };

  const focusNextUnmatchedQuestion = (justMatchedQuestionId) => {
    requestAnimationFrame(() => {
      const connectedIds = new Set(Object.keys(matches).map(Number));

      connectedIds.add(justMatchedQuestionId);

      const nextQuestion = questions.find(
        (item) => !connectedIds.has(item.id) && !isQuestionLocked(item.id),
      );

      if (nextQuestion) {
        focusQuestion(nextQuestion.id);
      }
    });
  };

  /* =====================================================
     COMMIT MATCH
  ===================================================== */

  const commitMatch = (questionId, sentenceId) => {
    if (
      showAnswer ||
      checkCompleted ||
      isQuestionLocked(questionId) ||
      isSentenceLocked(sentenceId)
    ) {
      return;
    }

    const displacedQuestion = Object.entries(matches).find(
      ([otherQuestionId, otherSentenceId]) =>
        Number(otherSentenceId) === sentenceId &&
        Number(otherQuestionId) !== questionId &&
        !isQuestionLocked(Number(otherQuestionId)),
    );

    setMatches((prev) => {
      const updated = { ...prev };

      // remove old match from this question
      delete updated[questionId];

      // one-to-one: remove this sentence from another unlocked question
      Object.keys(updated).forEach((questionKey) => {
        if (
          updated[questionKey] === sentenceId &&
          !isQuestionLocked(Number(questionKey))
        ) {
          delete updated[questionKey];
        }
      });

      updated[questionId] = sentenceId;

      return updated;
    });

    setValidatedMatches((prev) => {
      const updated = { ...prev };

      delete updated[questionId];

      if (displacedQuestion) {
        delete updated[Number(displacedQuestion[0])];
      }

      return updated;
    });

    setSelected(null);
    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     MOUSE - QUESTION
  ===================================================== */

  const handleQuestionClick = (questionId) => {
    if (showAnswer || checkCompleted || isQuestionLocked(questionId)) {
      return;
    }

    if (selected?.side === "right") {
      commitMatch(questionId, selected.id);
      return;
    }

    setSelected({
      side: "left",
      id: questionId,
    });

    setKeyboardStart(null);
    setKeyboardTarget(null);

    setValidatedMatches((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  /* =====================================================
     MOUSE - SENTENCE
  ===================================================== */

  const handleSentenceClick = (sentenceId) => {
    if (showAnswer || checkCompleted || isSentenceLocked(sentenceId)) {
      return;
    }

    if (selected?.side === "left") {
      commitMatch(selected.id, sentenceId);
      return;
    }

    setSelected({
      side: "right",
      id: sentenceId,
    });

    setKeyboardStart(null);
    setKeyboardTarget(null);
  };

  /* =====================================================
     START KEYBOARD FROM QUESTION
  ===================================================== */

  const startKeyboardFromQuestion = (questionId) => {
    if (showAnswer || checkCompleted || isQuestionLocked(questionId)) {
      return;
    }

    const available = getAvailableSentences();

    if (!available.length) return;

    setSelected({
      side: "left",
      id: questionId,
    });

    setKeyboardStart({
      side: "left",
      id: questionId,
    });

    setKeyboardTarget({
      side: "right",
      id: available[0],
    });

    setValidatedMatches((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });

    focusSentence(available[0]);
  };

  /* =====================================================
     START KEYBOARD FROM SENTENCE
  ===================================================== */

  const startKeyboardFromSentence = (sentenceId) => {
    if (showAnswer || checkCompleted || isSentenceLocked(sentenceId)) {
      return;
    }

    const available = getAvailableQuestions();

    if (!available.length) return;

    setSelected({
      side: "right",
      id: sentenceId,
    });

    setKeyboardStart({
      side: "right",
      id: sentenceId,
    });

    setKeyboardTarget({
      side: "left",
      id: available[0],
    });

    focusQuestion(available[0]);
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

    if (origin.side === "left") {
      focusQuestion(origin.id);
    } else {
      focusSentence(origin.id);
    }
  };

  /* =====================================================
     QUESTION KEYBOARD
  ===================================================== */

  const handleQuestionKeyDown = (event, questionId) => {
    // started from right -> cycling questions
    if (keyboardStart?.side === "right" && keyboardTarget?.side === "left") {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        cancelKeyboardMatch();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();

        const available = getAvailableQuestions();

        if (!available.length) return;

        const index = available.indexOf(questionId);

        const direction = event.shiftKey ? -1 : 1;

        const next =
          available[(index + direction + available.length) % available.length];

        setKeyboardTarget({
          side: "left",
          id: next,
        });

        focusQuestion(next);

        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();

        commitMatch(questionId, keyboardStart.id);

        focusNextUnmatchedQuestion(questionId);

        return;
      }
    }

    // normal activation
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      startKeyboardFromQuestion(questionId);

      return;
    }

    if (event.key === "Escape" && selected?.side === "left") {
      event.preventDefault();

      setSelected(null);
      setKeyboardStart(null);
      setKeyboardTarget(null);
    }
  };

  /* =====================================================
     SENTENCE KEYBOARD
  ===================================================== */

  const handleSentenceKeyDown = (event, sentenceId) => {
    // started from question -> cycling sentences
    if (keyboardStart?.side === "left" && keyboardTarget?.side === "right") {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        cancelKeyboardMatch();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();

        const available = getAvailableSentences();

        if (!available.length) return;

        const index = available.indexOf(sentenceId);

        const direction = event.shiftKey ? -1 : 1;

        const next =
          available[(index + direction + available.length) % available.length];

        setKeyboardTarget({
          side: "right",
          id: next,
        });

        focusSentence(next);

        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();

        const questionId = keyboardStart.id;

        commitMatch(questionId, sentenceId);

        focusNextUnmatchedQuestion(questionId);

        return;
      }
    }

    // normal activation
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      startKeyboardFromSentence(sentenceId);

      return;
    }

    if (event.key === "Escape" && selected?.side === "right") {
      event.preventDefault();

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

    if (Object.keys(matches).length !== questions.length) {
      ValidationAlert.info("Please match all.");
      return;
    }

    let correctCount = 0;

    const correctIds = [];

    Object.entries(matches).forEach(([questionId, sentenceId]) => {
      if (correct[questionId] === sentenceId) {
        correctCount++;
        correctIds.push(Number(questionId));
      }
    });

    setValidatedMatches(matches);
    setShowResult(true);

    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);

    const total = questions.length;

    const message = `Score: ${correctCount} / ${total}`;

    if (correctCount === total) {
      setLockedIds(questions.map((item) => item.id));

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

    setLockedIds(questions.map((item) => item.id));

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
    setValidatedMatches({});
    setSelected(null);
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

    if (keyboardStart.side === "left" && keyboardTarget.side === "right") {
      const from = getPoint(questionDotRefs.current[keyboardStart.id]);

      const to = getPoint(sentenceDotRefs.current[keyboardTarget.id]);

      if (!from || !to) return null;

      return {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
      };
    }

    if (keyboardStart.side === "right" && keyboardTarget.side === "left") {
      const from = getPoint(questionDotRefs.current[keyboardTarget.id]);

      const to = getPoint(sentenceDotRefs.current[keyboardStart.id]);

      if (!from || !to) return null;

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
        .unit7-writing-match {
          outline: none;
          border-radius: 10px;
        }

        .unit7-writing-match:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 4px;
        }

        .unit7-writing-selected {
          outline: 3px solid #2563eb !important;
          outline-offset: 4px;
        }

        .unit7-writing-keyboard-target {
          outline: 3px dashed #2563eb !important;
          outline-offset: 4px;
        }
      `}</style>

      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">A</span>
        Match the “<span className="text-[#F59E0B]">if</span>” part of the
        sentence with the “<span className="text-[#F59E0B]">then</span>” part.
      </h5>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-y-12">
        {questions.map((item, i) => {
          const questionSelected =
            selected?.side === "left" && selected.id === i;

          const sentenceSelected =
            selected?.side === "right" && selected.id === i;

          const questionKeyboardTarget =
            keyboardTarget?.side === "left" && keyboardTarget.id === i;

          const sentenceKeyboardTarget =
            keyboardTarget?.side === "right" && keyboardTarget.id === i;

          const questionLocked = isQuestionLocked(i);

          const sentenceLocked = isSentenceLocked(i);

          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr] items-center gap-x-24"
            >
              {/* =================================================
                  QUESTION
              ================================================= */}

              <div
                ref={(el) => {
                  questionFocusRefs.current[i] = el;
                }}
                role="button"
                tabIndex={0}
                aria-label={`Match question ${i + 1}: ${item.text}`}
                onClick={() => handleQuestionClick(i)}
                onKeyDown={(event) => handleQuestionKeyDown(event, i)}
                className={`
                  relative flex items-center cursor-pointer min-h-[50px]
                  unit7-writing-match

                  ${questionSelected ? "unit7-writing-selected" : ""}

                  ${
                    questionKeyboardTarget
                      ? "unit7-writing-keyboard-target"
                      : ""
                  }
                `}
                style={{
                  backgroundColor: questionSelected
                    ? "#fff7eeff"
                    : "transparent",

                  border: questionSelected
                    ? "1px solid #f79631"
                    : "1px solid transparent",

                  borderRadius: "10px",

                  padding: "8px 12px",

                  transition: "all 0.2s ease",

                  cursor: questionLocked ? "default" : "pointer",
                }}
              >
                <span className="font-bold text-[18px] w-8 shrink-0">
                  {i + 1}
                </span>

                <span className="text-[18px]">{item.text}</span>

                <div
                  ref={(el) => {
                    questionDotRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  style={{
                    position: "absolute",

                    right: 0,

                    top: "50%",

                    transform: "translateY(-50%)",

                    width: "12px",

                    height: "12px",

                    backgroundColor:
                      questionSelected || questionKeyboardTarget
                        ? "#2563eb"
                        : "#F59E0B",

                    borderRadius: "50%",

                    pointerEvents: "none",
                  }}
                />

                {showResult &&
                  validatedMatches[i] !== undefined &&
                  correct[i] !== validatedMatches[i] && (
                    <span
                      aria-hidden="true"
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

                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </span>
                  )}
              </div>

              {/* =================================================
                  ANSWER
              ================================================= */}

              <div
                ref={(el) => {
                  sentenceFocusRefs.current[i] = el;
                }}
                role="button"
                tabIndex={sentenceLocked ? -1 : 0}
                aria-label={`Match answer ${String.fromCharCode(
                  97 + i,
                )}: ${sentences[i].text}`}
                onClick={() => handleSentenceClick(i)}
                onKeyDown={(event) => handleSentenceKeyDown(event, i)}
                className={`
                  relative flex items-center cursor-pointer min-h-[50px]
                  unit7-writing-match

                  ${sentenceSelected ? "unit7-writing-selected" : ""}

                  ${
                    sentenceKeyboardTarget
                      ? "unit7-writing-keyboard-target"
                      : ""
                  }
                `}
                style={{
                  cursor: sentenceLocked ? "default" : "pointer",
                }}
              >
                <div
                  ref={(el) => {
                    sentenceDotRefs.current[i] = el;
                  }}
                  aria-hidden="true"
                  style={{
                    position: "absolute",

                    left: 0,

                    top: "50%",

                    transform: "translateY(-50%)",

                    width: "12px",

                    height: "12px",

                    backgroundColor:
                      sentenceSelected || sentenceKeyboardTarget
                        ? "#2563eb"
                        : "#F59E0B",

                    borderRadius: "50%",

                    pointerEvents: "none",
                  }}
                />

                <span className="font-bold text-[18px] ml-8 mr-4 w-5">
                  {String.fromCharCode(97 + i)}
                </span>

                <span className="text-[18px]">{sentences[i].text}</span>
              </div>
            </div>
          );
        })}
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
        {Object.entries(matches).map(([questionId, sentenceId]) => {
          const from = getPoint(questionDotRefs.current[questionId]);

          const to = getPoint(sentenceDotRefs.current[sentenceId]);

          if (!from || !to) {
            return null;
          }

          return (
            <line
              key={`${questionId}-${sentenceId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#f79631"
              strokeWidth="1.5"
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

      <div className="flex justify-center gap-6">
        <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit7_Page4_WritingA;
