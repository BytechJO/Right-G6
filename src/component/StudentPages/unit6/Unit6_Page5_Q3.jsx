import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import Unit6StudentAudioText, {
  stopUnit6StudentAudio,
  unit6StudentAudio,
} from "./Unit6StudentAudioText";
import audio from "../../../assets/audio/ClassBook/U6/PG 51/CD30.Pg50_Instruction1_Adult Lady.mp3";

const names = ["Gerald", "Marcia", "Belinda", "Jerry", "Polly", "Margaret"];

const nameAudio = {
  Gerald: "Item_001_",
  Marcia: "Item_004_",
  Belinda: "Item_005_",
  Jerry: "Item_008_",
  Polly: "Item_009_",
  Margaret: "Item_012_",
};

const sentences = [
  {
    id: 1,
    text: "is used to hearing many interesting stories.",
    audio: "Item_002_",
  },
  { id: 2, text: "used to be a singer.", audio: "Item_003_" },
  { id: 3, text: "never used to watch TV.", audio: "Item_006_" },
  { id: 4, text: "used to listen to records.", audio: "Item_007_" },
  { id: 5, text: "is used to living on a farm.", audio: "Item_010_" },
  { id: 6, text: "isn't used to using a computer.", audio: "Item_011_" },
];

const correctAnswers = {
  Gerald: 4,
  Marcia: 1,
  Belinda: 3,
  Jerry: 6,
  Polly: 2,
  Margaret: 5,
};

const captions = [{ start: 0.0, end: 20.0, text: "Listen and match." }];

const Unit6_Page5_Q3 = () => {
  const [matches, setMatches] = useState({}); // { name: sentenceId }
  const [selectedName, setSelectedName] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [keyboardSelection, setKeyboardSelection] = useState(false);
  const [focusedEndpoint, setFocusedEndpoint] = useState(null);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);

  const leftDotRefs = useRef({});
  const rightDotRefs = useRef({});
  const leftItemRefs = useRef({});
  const rightItemRefs = useRef({});
  const containerRef = useRef(null);
  const [dotPositions, setDotPositions] = useState({});

  const measurePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const positions = {};
    names.forEach((name) => {
      const el = leftDotRefs.current[name];
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`left_${name}`] = {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      }
    });
    sentences.forEach((s) => {
      const el = rightDotRefs.current[s.id];
      if (el) {
        const r = el.getBoundingClientRect();
        positions[`right_${s.id}`] = {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      }
    });
    setDotPositions(positions);
  };

  useEffect(() => {
    measurePositions();
    window.addEventListener("resize", measurePositions);
    return () => window.removeEventListener("resize", measurePositions);
  }, [matches, errors, locked]);

  // sentenceId → name (reverse lookup)
  const sentenceToName = Object.fromEntries(
    Object.entries(matches).map(([n, sid]) => [sid, n]),
  );

  const isNameLocked = (name) => errors[name] === false;

  const connect = (name, sentenceId, fromKeyboard = false) => {
    if (locked || isNameLocked(name)) return;
    const existingOwner = sentenceToName[sentenceId];
    if (existingOwner && isNameLocked(existingOwner)) return;

    setMatches((prev) => {
      const updated = { ...prev };
      if (existingOwner && existingOwner !== name)
        delete updated[existingOwner];
      updated[name] = sentenceId;
      return updated;
    });
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      if (existingOwner) delete updated[existingOwner];
      return updated;
    });
    setSelectedName(null);
    setSelectedSentence(null);
    setKeyboardSelection(false);
    setFocusedEndpoint(null);

    if (fromKeyboard) {
      requestAnimationFrame(() => {
        const nextName = names.find(
          (candidate) => candidate !== name && !isNameLocked(candidate),
        );
        leftItemRefs.current[nextName]?.focus();
      });
    }
  };

  const handleNameClick = (name, fromKeyboard = false) => {
    if (locked || isNameLocked(name)) return;
    if (selectedSentence !== null) {
      connect(name, selectedSentence, fromKeyboard);
      return;
    }
    if (selectedName === name) {
      setSelectedName(null);
      setKeyboardSelection(false);
      return;
    }
    setSelectedName(name);
    setSelectedSentence(null);
    setKeyboardSelection(fromKeyboard);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (fromKeyboard) {
      requestAnimationFrame(() => {
        const firstSentence = sentences.find((sentence) => {
          const owner = sentenceToName[sentence.id];
          return !owner || !isNameLocked(owner);
        });
        rightItemRefs.current[firstSentence?.id]?.focus();
      });
    }
  };

  const handleSentenceClick = (sentenceId, fromKeyboard = false) => {
    if (locked) return;
    const owner = sentenceToName[sentenceId];
    if (owner && isNameLocked(owner)) return;
    if (selectedName !== null) {
      connect(selectedName, sentenceId, fromKeyboard);
      return;
    }
    if (selectedSentence === sentenceId) {
      setSelectedSentence(null);
      setKeyboardSelection(false);
      return;
    }
    setSelectedSentence(sentenceId);
    setSelectedName(null);
    setKeyboardSelection(fromKeyboard);
    if (fromKeyboard) {
      requestAnimationFrame(() => {
        const firstName = names.find((name) => !isNameLocked(name));
        leftItemRefs.current[firstName]?.focus();
      });
    }
  };

  const handleEndpointKeyDown = (event, side, id) => {
    if (event.key === "Tab" && keyboardSelection) {
      const expectedSide = selectedName !== null ? "sentence" : "name";
      if (side === expectedSide) {
        const ids =
          side === "sentence"
            ? sentences
                .filter((sentence) => {
                  const owner = sentenceToName[sentence.id];
                  return !owner || !isNameLocked(owner);
                })
                .map((sentence) => sentence.id)
            : names.filter((name) => !isNameLocked(name));
        const index = Math.max(0, ids.indexOf(id));
        const step = event.shiftKey ? -1 : 1;
        const nextId = ids[(index + step + ids.length) % ids.length];
        event.preventDefault();
        const refs = side === "sentence" ? rightItemRefs : leftItemRefs;
        refs.current[nextId]?.focus();
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      const sourceName = selectedName;
      const sourceSentence = selectedSentence;
      setSelectedName(null);
      setSelectedSentence(null);
      setKeyboardSelection(false);
      setFocusedEndpoint(null);
      requestAnimationFrame(() => {
        if (sourceName !== null) leftItemRefs.current[sourceName]?.focus();
        if (sourceSentence !== null)
          rightItemRefs.current[sourceSentence]?.focus();
      });
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.repeat) return;
    event.currentTarget.querySelector("button")?.click();
  };

  const checkAnswers = () => {
    if (locked) return;
    if (Object.keys(matches).length < names.length) {
      ValidationAlert.info("Please match all names first.");
      return;
    }
    let score = 0;
    const newErrors = {};
    names.forEach((name) => {
      const isCorrect = matches[name] === correctAnswers[name];
      newErrors[name] = !isCorrect;
      if (isCorrect) score++;
    });
    setErrors(newErrors);
    const total = names.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    const correct = {};
    const correctErrors = {};
    names.forEach((name) => {
      correct[name] = correctAnswers[name];
      correctErrors[name] = false;
    });
    setMatches(correct);
    setErrors(correctErrors);
    setSelectedName(null);
    setSelectedSentence(null);
    setKeyboardSelection(false);
    setFocusedEndpoint(null);
    setLocked(true);
  };

  const reset = () => {
    stopUnit6StudentAudio();
    setMatches({});
    setErrors({});
    setSelectedName(null);
    setSelectedSentence(null);
    setKeyboardSelection(false);
    setFocusedEndpoint(null);
    setLocked(false);
  };

  const getNameDotColor = (name) => {
    // if (errors[name] === false) return "#5cb85c";
    if (errors[name] === true) return "red";
    return "#f0a500";
  };

  const getSentenceDotColor = (sentenceId) => {
    const owner = sentenceToName[sentenceId];
    if (!owner) return "#f0a500";
    // if (errors[owner] === false) return "#5cb85c";
    if (errors[owner] === true) return "red";
    return "#f0a500";
  };

  const getLineColor = (name) => {
    // if (errors[name] === false) return "#5cb85c";
    if (errors[name] === true) return "red";
    return "#f0a500";
  };

  // is a sentence available to be clicked?
  const isSentenceClickable = (sentenceId) => {
    if (locked) return false;
    const owner = sentenceToName[sentenceId];
    if (owner && errors[owner] === false) return false; // correctly locked
    return true;
  };

  const previewLine = (() => {
    if (!keyboardSelection || !focusedEndpoint) return null;
    if (selectedName !== null && focusedEndpoint.side === "sentence") {
      const start = dotPositions[`left_${selectedName}`];
      const end = dotPositions[`right_${focusedEndpoint.id}`];
      return start && end ? { start, end } : null;
    }
    if (selectedSentence !== null && focusedEndpoint.side === "name") {
      const start = dotPositions[`right_${selectedSentence}`];
      const end = dotPositions[`left_${focusedEndpoint.id}`];
      return start && end ? { start, end } : null;
    }
    return null;
  })();

  const isNameActive = (name) =>
    selectedName === name ||
    (selectedSentence !== null &&
      focusedEndpoint?.side === "name" &&
      focusedEndpoint.id === name);

  const isSentenceActive = (sentenceId) =>
    selectedSentence === sentenceId ||
    (selectedName !== null &&
      focusedEndpoint?.side === "sentence" &&
      focusedEndpoint.id === sentenceId);

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall mb-10" style={{ gap: "10px" }}>
        <style>{`
          [data-unit6-page5-q3] [data-match-endpoint]:focus-visible {
            outline: 4px solid #2563eb;
            outline-offset: 3px;
            border-radius: 8px;
          }
          [data-unit6-page5-q3] .matching-preview-line {
            animation: blink-preview-unit6-page5-q3 0.8s ease-in-out infinite;
            filter: drop-shadow(0 0 2px rgba(247, 150, 49, 0.65));
          }
          @keyframes blink-preview-unit6-page5-q3 {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>

        <ExerciseHeader
          sectionLetter="C"
          title="Listen and match."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />

        <QuestionAudioPlayer
          src={audio}
          captions={captions}
          stopAtSecond={4}
          pageId="Unit6_Page5_Q3"
        />

        {/* MATCHING AREA */}
        <div
          ref={containerRef}
          data-unit6-page5-q3
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "0px",
            position: "relative",
          }}
        >
          {/* SVG LINES */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 2,
            }}
          >
            {names.map((name) => {
              const sentenceId = matches[name];
              if (!sentenceId) return null;
              const p1 = dotPositions[`left_${name}`];
              const p2 = dotPositions[`right_${sentenceId}`];
              if (!p1 || !p2) return null;
              return (
                <line
                  key={name}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={getLineColor(name)}
                  strokeWidth="2"
                  strokeDasharray={errors[name] === true ? "5,4" : "none"}
                />
              );
            })}
            {previewLine && (
              <line
                className="matching-preview-line"
                x1={previewLine.start.x}
                y1={previewLine.start.y}
                x2={previewLine.end.x}
                y2={previewLine.end.y}
                stroke="#f79631"
                strokeWidth="3"
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* LEFT: Names */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              minWidth: "130px",
              zIndex: 1,
            }}
          >
            {names.map((name) => (
              <div
                key={name}
                ref={(el) => (leftItemRefs.current[name] = el)}
                role="button"
                tabIndex={locked || isNameLocked(name) ? -1 : 0}
                data-match-endpoint
                aria-label={`Select ${name}`}
                aria-pressed={selectedName === name}
                aria-disabled={locked || isNameLocked(name)}
                onClick={(event) => handleNameClick(name, event.detail === 0)}
                onKeyDown={(event) =>
                  handleEndpointKeyDown(event, "name", name)
                }
                onFocus={() => setFocusedEndpoint({ side: "name", id: name })}
                onBlur={() => setFocusedEndpoint(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "4px 6px",
                  borderRadius: "8px",
                  backgroundColor: isNameActive(name)
                    ? "rgba(247, 150, 49, 0.13)"
                    : "transparent",
                  boxShadow: isNameActive(name)
                    ? "0 0 0 2px rgba(247, 150, 49, 0.75)"
                    : "none",
                  cursor:
                    locked || errors[name] === false ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                <Unit6StudentAudioText
                  src={unit6StudentAudio(
                    "Page 50 - Exercise C",
                    nameAudio[name],
                  )}
                  ariaLabel={`Play ${name}`}
                  focusable={false}
                  style={{
                    fontSize: "18px",
                    width: "100px",
                    fontWeight: isNameActive(name) ? "700" : "500",
                    color: isNameActive(name) ? "#f79631" : "#222",
                    transition: "color 0.15s, font-weight 0.15s",
                  }}
                >
                  {name}
                </Unit6StudentAudioText>

                {/* Left dot */}
                <div
                  ref={(el) => (leftDotRefs.current[name] = el)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: getNameDotColor(name),
                    flexShrink: 0,
                    transform: isNameActive(name) ? "scale(1.35)" : "scale(1)",
                    boxShadow: isNameActive(name)
                      ? "0 0 0 4px rgba(247, 150, 49, 0.22)"
                      : "none",
                    transition:
                      "background 0.15s, transform 0.15s, box-shadow 0.15s",
                    position: "relative",
                  }}
                >
                  {errors[name] === true && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
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
                        zIndex: 2,
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE SPACER */}
          <div style={{ flex: 1 }} />

          {/* RIGHT: Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              flex: 2,
              zIndex: 1,
            }}
          >
            {sentences.map((s) => (
              <div
                key={s.id}
                ref={(el) => (rightItemRefs.current[s.id] = el)}
                role="button"
                tabIndex={
                  locked ||
                  (sentenceToName[s.id] && isNameLocked(sentenceToName[s.id]))
                    ? -1
                    : 0
                }
                data-match-endpoint
                aria-label={`Select sentence ${s.id}: ${s.text}`}
                aria-pressed={selectedSentence === s.id}
                aria-disabled={
                  locked ||
                  Boolean(
                    sentenceToName[s.id] && isNameLocked(sentenceToName[s.id]),
                  )
                }
                onClick={(event) =>
                  handleSentenceClick(s.id, event.detail === 0)
                }
                onKeyDown={(event) =>
                  handleEndpointKeyDown(event, "sentence", s.id)
                }
                onFocus={() =>
                  setFocusedEndpoint({ side: "sentence", id: s.id })
                }
                onBlur={() => setFocusedEndpoint(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "4px 6px",
                  borderRadius: "8px",
                  backgroundColor: isSentenceActive(s.id)
                    ? "rgba(247, 150, 49, 0.13)"
                    : "transparent",
                  boxShadow: isSentenceActive(s.id)
                    ? "0 0 0 2px rgba(247, 150, 49, 0.75)"
                    : "none",
                  cursor: isSentenceClickable(s.id) ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                {/* Right dot */}
                <div
                  ref={(el) => (rightDotRefs.current[s.id] = el)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: getSentenceDotColor(s.id),
                    flexShrink: 0,
                    transform: isSentenceActive(s.id)
                      ? "scale(1.35)"
                      : "scale(1)",
                    boxShadow: isSentenceActive(s.id)
                      ? "0 0 0 4px rgba(247, 150, 49, 0.22)"
                      : "none",
                    transition:
                      "background 0.15s, transform 0.15s, box-shadow 0.15s",
                  }}
                />
                <Unit6StudentAudioText
                  src={unit6StudentAudio("Page 50 - Exercise C", s.audio)}
                  ariaLabel={`Play ${s.text}`}
                  focusable={false}
                  style={{
                    fontSize: "18px",
                    color: isSentenceActive(s.id) ? "#f79631" : "#222",
                    fontWeight: isSentenceActive(s.id) ? 700 : 500,
                    transition: "color 0.15s, font-weight 0.15s",
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "4px" }}>
                    {s.id}
                  </span>
                  {s.text}
                </Unit6StudentAudioText>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container mt-10">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit6_Page5_Q3;
