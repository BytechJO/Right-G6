import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import audio from "../../../assets/audio/ClassBook/U6/PG 51/CD30.Pg50_Instruction1_Adult Lady.mp3";

const names = ["Gerald", "Marcia", "Belinda", "Jerry", "Polly", "Margaret"];

const sentences = [
  { id: 1, text: "is used to hearing many interesting stories." },
  { id: 2, text: "used to be a singer." },
  { id: 3, text: "never used to watch TV." },
  { id: 4, text: "used to listen to records." },
  { id: 5, text: "is used to living on a farm." },
  { id: 6, text: "isn't used to using a computer." },
];

const correctAnswers = {
  Gerald: 4,
  Marcia: 1,
  Belinda: 3,
  Jerry: 6,
  Polly: 2,
  Margaret: 5,
};

const captions = [
  { start: 0.0, end: 20.0, text: "Match each vocabulary word to its picture." },
];

const Unit6_Page5_Q3 = () => {
  const [matches, setMatches] = useState({}); // { name: sentenceId }
  const [selectedName, setSelectedName] = useState(null);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);

  const leftDotRefs = useRef({});
  const rightDotRefs = useRef({});
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

  const handleNameClick = (name) => {
    if (locked) return;
    // if correct → locked, can't touch
    if (errors[name] === false) return;
    setSelectedName(selectedName === name ? null : name);
  };

  const handleSentenceClick = (sentenceId) => {
    if (locked || !selectedName) return;

    const existingOwner = sentenceToName[sentenceId]; // name already linked to this sentence

    // if this sentence is already correctly matched → ignore
    if (existingOwner && errors[existingOwner] === false) return;

    // if this sentence is already matched to a WRONG name → unlink that name first
    if (existingOwner && errors[existingOwner] !== false) {
      setMatches((prev) => {
        const updated = { ...prev };
        delete updated[existingOwner];
        return updated;
      });
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[existingOwner];
        return updated;
      });
    }

    // if selectedName already had a match → remove it first
    setMatches((prev) => {
      const updated = { ...prev };
      updated[selectedName] = sentenceId;
      return updated;
    });
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[selectedName];
      return updated;
    });
    setSelectedName(null);
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
    setLocked(true);
  };

  const reset = () => {
    setMatches({});
    setErrors({});
    setSelectedName(null);
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
    if (locked || !selectedName) return false;
    const owner = sentenceToName[sentenceId];
    if (owner && errors[owner] === false) return false; // correctly locked
    return true;
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-4">
          <span className="ex-A mr-2">C</span>
          Listen and match.
        </h5>

        <QuestionAudioPlayer src={audio} captions={captions} stopAtSecond={4} />

        {/* MATCHING AREA */}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "10px",
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
              zIndex: 0,
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
                onClick={() => handleNameClick(name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor:
                    locked || errors[name] === false ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    width: "100px",
                    fontWeight: selectedName === name ? "700" : "500",
                    color: selectedName === name ? "#f0a500" : "#222",
                    transition: "color 0.15s",
                  }}
                >
                  {name}
                </span>

                {/* Left dot */}
                <div
                  ref={(el) => (leftDotRefs.current[name] = el)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: getNameDotColor(name),
                    flexShrink: 0,
                    transition: "background 0.15s",
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
                onClick={() => handleSentenceClick(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
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
                    transition: "background 0.15s",
                  }}
                />
                <span style={{ fontSize: "18px", color: "#222" }}>
                  <span style={{ fontWeight: "bold", marginRight: "4px" }}>
                    {s.id}
                  </span>
                  {s.text}
                </span>
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
