import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit10AudioText, {
  workbookUnit10Audio,
  stopWorkbookUnit10Audio,
} from "./WorkbookUnit10AudioText";
import TimedNarrationText from "../../TimedNarrationText";

import beachImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U10 Folder/SVG/Asset 12.svg";
import readingTimings from "../../../assets/json/pg62-QL_eng.json";
import fullPassageAudio from "../../../assets/audio/WorkBook/unit10/Page 62 - Exercise L/full.mp3";

const BORDER = "#84ad40";

const WORD_BANK = [
  "seashells",
  "sunscreen",
  "sandcastles",
  "dozens",
  "occupied",
];
const WORD_BANKq = ["necessary", "surfboard", "surfing", "sunburn", "rent"];
// Paragraph split into segments — blank: true means input field

const audioFolder = "Page 62 - Exercise L";

const SEGMENTS = [
  {
    text: "Do you like going to the beach? Do you like to stay on the sand and collect ",
    audioPrefix: "Item_011_",
    blank: false,
  },
  { id: 1, answer: "seashells", blank: true },

  {
    text: " and build ",
    audioPrefix: "Item_012_",
    blank: false,
  },
  { id: 2, answer: "sandcastles", blank: true },

  {
    text: ", or do you like to play water sports?",
    audioPrefix: "Item_013_",
    blank: false,
  },
  {
    text: "There are ",
    audioPrefix: "Item_014_",
    blank: false,
  },
  { id: 3, answer: "dozens", blank: true },

  {
    text: " of things you can do to keep yourself ",
    audioPrefix: "Item_015_",
    blank: false,
  },
  { id: 4, answer: "occupied", blank: true },

  {
    text: " at the beach. You can try fun water sports, like waterskiing, ",
    audioPrefix: "Item_017_",
    blank: false,
  },
  { id: 5, answer: "surfing", blank: true },

  {
    text: ", and sailing. ",
    audioPrefix: "Item_018_",
    blank: false,
  },
  {
    text: "You can ",
    audioPrefix: "Item_019_",
    blank: false,
  },
  { id: 6, answer: "rent", blank: true },

  {
    text: " all the ",
    audioPrefix: "Item_020_",
    blank: false,
  },
  { id: 7, answer: "necessary", blank: true },

  {
    text: " equipment, like a sailboat or a ",
    audioPrefix: "Item_021_",
    blank: false,
  },
  { id: 8, answer: "surfboard", blank: true },

  {
    text: " from a rental place at the beach. Don't forget to put on lots of ",
    audioPrefix: "Item_022_",
    blank: false,
  },
  { id: 9, answer: "sunscreen", blank: true },

  {
    text: "! You wouldn't want to go back home with a ",
    audioPrefix: "Item_023_",
    blank: false,
  },
  { id: 10, answer: "sunburn", blank: true },

  {
    text: " from the hot sun.",
    audioPrefix: "Item_024_",
    blank: false,
  },
];

const blankSegments = SEGMENTS.filter((s) => s.blank);

const initAnswers = () => {
  const a = {};
  blankSegments.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

const completedBlank = (word) => (
  <span
    style={{
      display: "inline-block",
      width: "130px",
      border: "none",
      borderBottom: "1.5px solid #555",
      background: "transparent",
      fontSize: "16px",
      color: "#c0392b",
      fontWeight: 600,
      paddingBottom: "2px",
      fontFamily: "inherit",
      textAlign: "center",
      margin: "0 2px",
      verticalAlign: "bottom",
      lineHeight: "normal",
    }}
  >
    {word}
  </span>
);

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'']/g, "")
    .replace(/\s+/g, " ")
    .trim();

// ── Sub-components OUTSIDE parent ──

const InlineInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "130px",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
        margin: "0 2px",
      }}
    />
    {isWrong && (
      <span
        className="wb-unit10-error-x"
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
          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          zIndex: 2,
        }}
      >
        ✕
      </span>
    )}
  </span>
);

// ── Main Component ──

const WB_Unit_FillBlank_L = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);
  const [narrationResetKey, setNarrationResetKey] = useState(0);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = blankSegments.some(({ id }) => !answers[id].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    blankSegments.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = blankSegments.length;
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
    blankSegments.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit10Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
    setNarrationResetKey((key) => key + 1);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="L"
          title="Fill in each blank with the correct vocabulary word."
          subTitle="Read the full sentence first, then choose the vocabulary word that fits both the meaning and grammar."
        />

        {/* Word Bank */}
        <div
          style={{
            margin: "5vh 0 2vh 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "24px",
            justifyContent: "space-between",
          }}
        >
          {WORD_BANK.map((w, index) => (
            <WorkbookUnit10AudioText
              key={w}
              src={workbookUnit10Audio(
                "Page 62 - Exercise L",
                `Item_${String(index + 1).padStart(3, "0")}_`,
              )}
              ariaLabel={`Play ${w}`}
              style={{
                border: `1.5px solid ${BORDER}`,
                borderRadius: "6px",
                padding: "5px 14px",
                fontSize: "15px",
                color: "#333",

                width: "100px",
                justifyContent: "center",
              }}
            >
              {w}
            </WorkbookUnit10AudioText>
          ))}
        </div>
        {/* Word Bank */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "24px",
            justifyContent: "space-between",
          }}
        >
          {WORD_BANKq.map((w, index) => (
            <WorkbookUnit10AudioText
              key={w}
              src={workbookUnit10Audio(
                "Page 62 - Exercise L",
                `Item_${String(index + 6).padStart(3, "0")}_`,
              )}
              ariaLabel={`Play ${w}`}
              style={{
                display: "flex",
                border: `1.5px solid ${BORDER}`,
                borderRadius: "6px",
                padding: "5px 14px",
                fontSize: "15px",
                color: "#333",
                width: "100px",
                justifyContent: "center",
              }}
            >
              {w}
            </WorkbookUnit10AudioText>
          ))}
        </div>

        {/* Paragraph + image */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          {/* Text paragraph */}
          {locked ? (
            <TimedNarrationText
              key={narrationResetKey}
              audioSrc={fullPassageAudio}
              wordTimings={readingTimings}
              aliases={[
                {
                  printed: ["at", "the", "beach."],
                  spoken: ["at", "the uh", "beach."],
                },
                {
                  printed: ["!", "You"],
                  spoken: ["Uh", "you"],
                },
              ]}
              ariaLabel="the completed beach passage"
              onBeforePlay={stopWorkbookUnit10Audio}
              style={{
                flex: 1,
                fontSize: "16px",
                lineHeight: "2.2",
                color: "#333",
              }}
            >
              {SEGMENTS.map((seg, index) => (
                <React.Fragment key={seg.id ?? `text-${index}`}>
                  {seg.blank ? completedBlank(seg.answer) : seg.text}
                </React.Fragment>
              ))}
            </TimedNarrationText>
          ) : (
            <div
              style={{
                flex: 1,
                fontSize: "16px",
                lineHeight: "2.2",
                color: "#333",
              }}
            >
              {SEGMENTS.map((seg, i) =>
                seg.blank ? (
                  <InlineInput
                    key={i}
                    value={answers[seg.id]}
                    onChange={(val) => handleChange(seg.id, val)}
                    disabled={result[seg.id] === true}
                    isWrong={result[seg.id] === false}
                    isCorrect={result[seg.id] === true}
                  />
                ) : (
                  <WorkbookUnit10AudioText
                    key={i}
                    src={workbookUnit10Audio(audioFolder, seg.audioPrefix)}
                    ariaLabel={`Play ${seg.text.trim()}`}
                    flowText
                  >
                    {seg.text}
                  </WorkbookUnit10AudioText>
                ),
              )}
            </div>
          )}

          {/* Beach image */}
          <img
            src={beachImg}
            alt="beach"
            style={{
              width: "220px",
              height: "auto",
              objectFit: "contain",
              flexShrink: 0,
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
        </div>
      </div>

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

export default WB_Unit_FillBlank_L;
