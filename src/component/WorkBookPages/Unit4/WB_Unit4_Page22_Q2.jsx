/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4WorkbookAudioText, {
  stopWorkbookUnit4Audio,
  workbookUnit4Audio,
} from "./Unit4WorkbookAudioText";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const WORD_BANK = [
  { text: "for a living", audio: "Item_001_" },
  { text: "spare time", audio: "Item_004_" },
  { text: "extra money", audio: "Item_005_" },
  { text: "bow and arrow", audio: "Item_002_" },
  { text: "world-class", audio: "Item_003_" },
];

const BLANKS = {
  1: { answer: "for a living", width: "160px" },
  2: { answer: "world-class", width: "140px" },
  3: { answer: "spare time", width: "130px" },
  4: { answer: "bow and arrow", width: "150px" },
  5: { answer: "extra money", width: "140px" },
};

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "", 5: "" });

const FULL_PARAGRAPH_AUDIO_KEYS = [
  "Item_006_",
  "Item_001_",
  "Item_007_",
  "Item_003_",
  "Item_008_",
  "Item_009_",
  "Item_010_",
  "Item_004_",
  "Item_011_",
  "Item_013_",
  "Item_002_",
  "Item_012_",
  "Item_014_",
  "Item_015_",
  "Item_005_",
  "Item_016_",
  "Item_017_",
];

// ─────────────────────────────────────────────
//  InlineInput — OUTSIDE parent
// ─────────────────────────────────────────────
const InlineInput = ({
  blankId,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
  width,
}) => (
  <span
    style={{
      position: "relative",
      display: "inline-block",
      verticalAlign: "bottom",
    }}
  >
    <input
      type="text"
      value={value}
      placeholder="Type the expression"
      title={`Complete blank ${blankId}`}
      aria-label={`Complete blank ${blankId}`}
      disabled={disabled}
      onChange={(e) => onChange(blankId, e.target.value)}
      style={{
        width,
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        fontWeight: isCorrect ? "700" : "400",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        paddingBottom: "1px",
        fontFamily: "inherit",
        textAlign: "center",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "16px",
          height: "16px",
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const WB_Unit4_FillBlank_C = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);
  const [fullAudioPlaying, setFullAudioPlaying] = useState(false);
  const fullAudioRef = useRef({ audio: null, token: 0 });

  const stopFullParagraphAudio = () => {
    const session = fullAudioRef.current;
    session.token += 1;
    if (session.audio) {
      session.audio.pause();
      session.audio.currentTime = 0;
      session.audio = null;
    }
    setFullAudioPlaying(false);
  };

  useEffect(
    () => () => {
      const session = fullAudioRef.current;
      session.token += 1;
      if (session.audio) {
        session.audio.pause();
        session.audio.currentTime = 0;
        session.audio = null;
      }
    },
    [],
  );

  const playFullTrack = (sources, index, token) => {
    if (token !== fullAudioRef.current.token) return;
    if (index >= sources.length) {
      fullAudioRef.current.audio = null;
      setFullAudioPlaying(false);
      return;
    }

    const audio = new Audio(sources[index]);
    fullAudioRef.current.audio = audio;
    audio.addEventListener(
      "ended",
      () => playFullTrack(sources, index + 1, token),
      { once: true },
    );
    audio.addEventListener(
      "error",
      () => playFullTrack(sources, index + 1, token),
      { once: true },
    );
    audio
      .play()
      .then(() => setFullAudioPlaying(true))
      .catch(() => playFullTrack(sources, index + 1, token));
  };

  const toggleFullParagraphAudio = () => {
    if (!locked) return;
    const current = fullAudioRef.current.audio;
    if (current) {
      if (current.paused) {
        current
          .play()
          .then(() => setFullAudioPlaying(true))
          .catch(() => setFullAudioPlaying(false));
      } else {
        current.pause();
        setFullAudioPlaying(false);
      }
      return;
    }

    stopWorkbookUnit4Audio();
    const sources = FULL_PARAGRAPH_AUDIO_KEYS.map((key) =>
      workbookUnit4Audio("Page 22 - Exercise C", key),
    ).filter(Boolean);
    const token = fullAudioRef.current.token + 1;
    fullAudioRef.current.token = token;
    playFullTrack(sources, 0, token);
  };

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = Object.values(answers).some((v) => !v.trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    Object.entries(BLANKS).forEach(([id, { answer }]) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = Object.keys(BLANKS).length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const a = {};
    const r = {};
    Object.entries(BLANKS).forEach(([id, { answer }]) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopFullParagraphAudio();
    stopWorkbookUnit4Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  // shorthand
  const B = (id) => (
    <InlineInput
      blankId={id}
      value={answers[id]}
      onChange={handleChange}
      isCorrect={result[id] === true}
      isWrong={result[id] === false}
      disabled={locked || result[id] === true}
      width={BLANKS[id].width}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="C"
          title="Fill in each blank with the correct expression."
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* Word Bank */}
        <div
          style={{
            border: "1.5px solid #84ad40",
            borderRadius: "8px",
            padding: "10px 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 32px",
            justifyContent: "center",
            fontSize: "17px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "28px",
            marginTop: "2em",
          }}
        >
          {WORD_BANK.map((word) => (
            <Unit4WorkbookAudioText
              key={word.text}
              src={workbookUnit4Audio("Page 22 - Exercise C", word.audio)}
              ariaLabel={`Play ${word.text}`}
              disabled={locked}
            >
              {word.text}
            </Unit4WorkbookAudioText>
          ))}
        </div>

        {/* Paragraph with inline blanks */}
        <style>{`
          .unit4-c-full-audio:hover,
          .unit4-c-full-audio:focus-visible {
            box-shadow: 0 0 0 3px #2563eb;
            border-radius: 8px;
          }
          .unit4-c-full-audio:focus-visible { outline: none; }
        `}</style>
        <div
          className={locked ? "unit4-c-full-audio" : ""}
          role={locked ? "button" : undefined}
          tabIndex={locked ? 0 : undefined}
          aria-label={
            locked
              ? fullAudioPlaying
                ? "Pause the complete paragraph audio"
                : "Play or resume the complete paragraph audio"
              : undefined
          }
          aria-pressed={locked ? fullAudioPlaying : undefined}
          onClick={locked ? toggleFullParagraphAudio : undefined}
          onKeyDown={
            locked
              ? (event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    if (!event.repeat) toggleFullParagraphAudio();
                  }
                }
              : undefined
          }
          style={{
            fontSize: "18px",
            lineHeight: "2.6",
            color: "#333",
            marginBottom: "2em",
            position: "relative",
            cursor: locked ? "pointer" : "default",
            transition: "box-shadow 0.2s ease",
          }}
        >
          {fullAudioPlaying && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "white",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 7px rgba(0,0,0,.22)",
                zIndex: 5,
              }}
            >
              <FaVolumeUp size={15} />
            </span>
          )}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_006_")}
            ariaLabel="Play My dad does something unusual"
            flowText
          >
            My dad does something unusual
          </Unit4WorkbookAudioText>{" "}
          {B(1)}.{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_007_")}
            ariaLabel="Play He is a"
            flowText
          >
            He&apos;s a
          </Unit4WorkbookAudioText>{" "}
          {B(2)}{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_008_")}
            ariaLabel="Play hockey player. Yes, hockey can"
            flowText
          >
            hockey player. Yes, hockey can
          </Unit4WorkbookAudioText>{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_009_")}
            ariaLabel="Play the next paragraph part"
            flowText
          >
            be very dangerous, but when he&apos;s not playing, my dad is
            actually very gentle and careful. He says he has plenty
          </Unit4WorkbookAudioText>{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_010_")}
            ariaLabel="Play the next paragraph part"
            flowText
          >
            of adventure playing hockey, so he likes to do quiet, fun things
            when he&apos;s home. In his
          </Unit4WorkbookAudioText>{" "}
          {B(3)}{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_011_")}
            ariaLabel="Play he also"
            flowText
          >
            he also
          </Unit4WorkbookAudioText>{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_013_")}
            ariaLabel="Play likes to do target practice with his"
            flowText
          >
            likes to do target practice with his
          </Unit4WorkbookAudioText>{" "}
          {B(4)}{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_012_")}
            ariaLabel="Play because his hobby is archery"
            flowText
          >
            because his hobby is archery. He and I are both archers,
          </Unit4WorkbookAudioText>{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_014_")}
            ariaLabel="Play the next paragraph part"
            flowText
          >
            so we spend lots of time together doing our hobby. Although he makes
            a lot of money with his job, he isn&apos;t
          </Unit4WorkbookAudioText>{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_015_")}
            ariaLabel="Play careless with the"
            flowText
          >
            careless with the
          </Unit4WorkbookAudioText>{" "}
          {B(5)},{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_016_")}
            ariaLabel="Play the next paragraph part"
            flowText
          >
            and he has taught me to do the same. He saves his money so he can
            retire
          </Unit4WorkbookAudioText>{" "}
          <Unit4WorkbookAudioText
            disabled={locked}
            src={workbookUnit4Audio("Page 22 - Exercise C", "Item_017_")}
            ariaLabel="Play the end of the paragraph"
            flowText
          >
            early. I appreciate my dad very much!
          </Unit4WorkbookAudioText>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
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

export default WB_Unit4_FillBlank_C;
