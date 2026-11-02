/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import TimedNarrationText from "../../TimedNarrationText";
import WorkbookUnit5AudioText, {
  stopWorkbookUnit5Audio,
  workbookUnit5Audio,
} from "./WorkbookUnit5AudioText";
import readingTimings from "../../../assets/json/pg30-QH_eng.json";
import fullPassageAudio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise H/full.mp3";

// بدّل المسار للصورة الفعلية
import singerImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U5 Folder/SVG/3.svg";

const QUESTIONS = [
  {
    id: 1,
    text: "The singer started singing at an early age, didn't she?",
    answer: "Yes, she did.",
    audio: "Item_022_",
    prefilled: false,
  },
  {
    id: 2,
    text: "She started at a school talent show, didn't she?",
    answer: "Yes, she did.",
    audio: "Item_023_",
    prefilled: false,
  },
  {
    id: 3,
    text: "She couldn't miss school for her singing, could she?",
    answer: "No, she couldn't.",
    prefilled: false,
  },
  {
    id: 4,
    text: "She didn't want to start a singing career at an early age, did she?",
    answer: "Yes, she did.",
    prefilled: false,
  },
  {
    id: 5,
    text: "She could record CDs during school vacations, couldn't she?",
    answer: "Yes, she could.",
    prefilled: false,
  },
  {
    id: 6,
    text: "She sings rock and roll music, doesn't she?",
    answer: "No, she doesn't.",
    prefilled: false,
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,''’']/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({
  qId,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
}) => (
  <span style={{ position: "relative", display: "inline-block", flex: 1 }}>
    <input
      className="wb-unit5-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      placeholder="Short answer"
      title="Answer the interview question"
      aria-label={`Interview answer ${qId}`}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "15px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          width: "18px",
          height: "18px",
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "9px",
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

// ── MAIN COMPONENT ──
const WB_Unit5_Interview_H = () => {
  const audioFolder = "Page 30 - Exercise H";
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
    const hasEmpty = Object.values(answers).some((v) => !v.trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.length;
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
    QUESTIONS.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit5Audio();
    setNarrationResetKey((key) => key + 1);
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="H"
          title="Read the interview, then answer the questions."
          subTitle="Read the interview for meaning first, then use the speaker’s exact information to answer each tag question."
        />

        {/* Interview text */}
        <TimedNarrationText
          key={narrationResetKey}
          audioSrc={fullPassageAudio}
          wordTimings={readingTimings}
          ariaLabel="the complete singer interview"
          onBeforePlay={stopWorkbookUnit5Audio}
          style={{
            fontSize: "14px",
            lineHeight: "1.75",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          {[
            {
              speaker: "Interviewer:",
              text: "So you started your singing career at a school talent show, didn't you?",
              audio: ["Item_002_"],
            },
            {
              speaker: "Singer:",
              text: "Yes, I did. I was only eight years old at the time, so I wasn't afraid to stand up and sing. I thought the audience would laugh, but they actually clapped and cheered. What a surprise that was!",
              audio: ["Item_004_", "Item_005_"],
            },
            {
              speaker: "Interviewer:",
              text: "But you didn't try to start a singing career for a while, did you?",
              audio: ["Item_006_"],
            },
            {
              speaker: "Singer:",
              text: "No, I didn't. I was just interested in riding my bike and playing with my friends. People would ask me to sing for school shows, but I didn't think much of it at the time.",
              audio: ["Item_007_", "Item_008_"],
            },
            {
              speaker: "Interviewer:",
              text: "You could sing a high C when you were 16 years old, couldn't you?",
              audio: ["Item_009_"],
            },
            {
              speaker: "Singer:",
              text: "Yes, I could. I was asked to sing our national song at a high school football game, and it had a high C. I practiced very hard, and I made it! After that, the recording studio in town asked me to record a CD. I tried it, and it sold a lot of copies!",
              audio: ["Item_010_", "Item_011_"],
            },
            {
              speaker: "Interviewer:",
              text: "Your parents probably didn't want you to miss school, did they?",
              audio: ["Item_012_"],
            },
            {
              speaker: "Singer:",
              text: "Definitely not! But I could practice songs in my free time and record a CD during the school vacations. During the first summer after I started recording, I recorded three CDs in one summer.",
              audio: ["Item_013_", "Item_014_"],
            },
          ].map((line, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "8px", marginBottom: "4px" }}
            >
              <span
                style={{ fontWeight: "bold", minWidth: "90px", flexShrink: 0 }}
              >
                {line.speaker}{" "}
              </span>
              <span>{line.text}</span>{" "}
            </div>
          ))}

          {/* Singer image + last lines */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {[
                {
                  speaker: "Interviewer:",
                  text: "That was the summer you started selling CDs nationally, wasn't it?",
                  audio: ["Item_015_"],
                },
                {
                  speaker: "Singer:",
                  text: "Yes, it was. Before that I had only sold them near my hometown. When I started selling them nationally, I was surprised at the number I had sold.",
                  audio: ["Item_016_", "Item_017_"],
                },
                {
                  speaker: "Interviewer:",
                  text: "Folk music is your favorite, isn't it?",
                  audio: ["Item_018_"],
                },
                {
                  speaker: "Singer:",
                  text: "Yes it is. Soon I hope to sing folk songs from other countries as well.",
                  audio: ["Item_019_"],
                },
                {
                  speaker: "Interviewer:",
                  text: "It's been very nice to learn about your music. Do we get to hear you sing today?",
                  audio: ["Item_020_"],
                },
                {
                  speaker: "Singer:",
                  text: "Certainly. I'd be happy to.",
                  audio: ["Item_021_"],
                },
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "8px" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      minWidth: "90px",
                      flexShrink: 0,
                    }}
                  >
                    {line.speaker}{" "}
                  </span>
                  <span>{line.text}</span>{" "}
                </div>
              ))}
            </div>
            {/* Singer image */}
            <img
              src={singerImg}
              alt="A singer performing with a microphone"
              style={{
                width: "20%",
                height: "auto",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>
        </TimedNarrationText>

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, text, audio }) => {
            const isCorrect = result[id] === true;
            const isWrong = result[id] === false;
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "6px",
                  fontSize: "15px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "18px" }}>
                  {id}
                </span>
                <WorkbookUnit5AudioText
                  src={audio ? workbookUnit5Audio(audioFolder, audio) : null}
                  ariaLabel={`Play question ${id}`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {text}
                </WorkbookUnit5AudioText>
                <InlineInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  disabled={locked || isCorrect}
                />
              </div>
            );
          })}
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

export default WB_Unit5_Interview_H;
