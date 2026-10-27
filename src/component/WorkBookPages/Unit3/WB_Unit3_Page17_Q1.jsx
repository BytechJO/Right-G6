/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import TimedNarrationText from "../../TimedNarrationText";
import Unit3WorkbookAudioText, {
  stopWorkbookUnit3Audio,
  workbookUnit3Audio,
} from "./Unit3WorkbookAudioText";
import readingTimings from "../../../assets/json/pg17-QE_eng.json";
import fullSpeechAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise E/full.mp3";

const BORDER = "#84ad40";

const SPEECH_PARAGRAPHS = [
  [
    [
      1,
      "Exams are next week. As you know, this class did not do well on the last exams. I want to review with you some ideas on how you ",
    ],
    [2, "can improve your scores for these next exams."],
  ],
  [
    [
      3,
      "First of all, if you started studying earlier, you would do better. Last term you only studied a day or two before each exam. That's ",
    ],
    [
      4,
      "simply not acceptable! If you started studying now, you could study for a shorter amount of time each day, and you would be able ",
    ],
    [5, "to remember more of the information."],
  ],
  [
    [
      6,
      "Secondly, you should rewrite and organize your notes. If you grouped the things you were studying into categories, it would be ",
    ],
    [
      7,
      "much easier to learn the things you need to know. Last term you tried to study the notes you took in class, but you wrote them ",
    ],
    [
      8,
      "quickly, so they were missing information. This term, if you took the extra time now to rewrite your notes, you would save time ",
    ],
    [9, "overall."],
  ],
  [
    [
      10,
      "Finally, always check the study sheets carefully to be sure you are studying everything you need. Last term I found study sheets in ",
    ],
    [
      11,
      "the trash. This term, you should pay attention to the material you need for the test.",
    ],
  ],
  [
    [
      12,
      "Well, I hope this helps each of you. If you follow these simple tips, you can get better exam scores!",
    ],
  ],
];

const SPEECH_ALIASES = [
  {
    printed: ["grouped"],
    spoken: ["group"],
  },
];

const ROWS = [
  {
    id: 0,
    lastTerm: "The exam scores were low.",
    thisTerm: "The scores should be higher.",
    prefilled: false,
  },
  {
    id: 1,
    lastTerm: "Studied one or two days before the exam.",
    thisTerm: "Start studying now, a week ahead.",
    prefilled: false,
  },
  {
    id: 2,
    lastTerm: "Studied from the hasty class note.",
    thisTerm: "Study from rewritten notes and organize them.",
    prefilled: false,
  },
  {
    id: 3,
    lastTerm: "Study sheets in the trash.",
    thisTerm: "Follow the study sheet carefully.",
    prefilled: false,
  },
];

const inputRows = ROWS.filter((r) => !r.prefilled);

const initAnswers = () => {
  const a = {};
  inputRows.forEach((r) => {
    a[`${r.id}-last`] = "";
    a[`${r.id}-this`] = "";
  });
  return a;
};

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// ✅ CellInput خارج الـ component الرئيسي
const CellInput = ({ rowKey, value, locked, result, onChange }) => {
  const isWrong = result[rowKey] === false;
  const isCorrect = result[rowKey] === true;
  return (
    <span style={{ position: "relative", display: "block", width: "100%" }}>
      <textarea
        value={value}
        disabled={locked || isCorrect}
        placeholder="Write the main suggestion"
        title="Write the main suggestion from the matching paragraph"
        aria-label={`Chart answer ${rowKey}`}
        className="wb-unit3-answer"
        onChange={(e) => onChange(rowKey, e.target.value)}
        rows={2}
        style={{
          width: "100%",
          border: "none",
          borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#bbb"}`,
          outline: "none",
          background: "transparent",
          resize: "none",
          fontSize: "15px",
          color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
          fontWeight: isCorrect ? "600" : "400",
          lineHeight: "1.5",
          padding: "4px 2px",
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
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
};

const WB_Unit_Speech_E = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);
  const [narrationResetKey, setNarrationResetKey] = useState(0);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev) => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const allKeys = inputRows.flatMap((r) => [`${r.id}-last`, `${r.id}-this`]);
    const hasEmpty = allKeys.some((k) => !answers[k].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    inputRows.forEach((r) => {
      const okLast =
        normalize(answers[`${r.id}-last`]) === normalize(r.lastTerm);
      const okThis =
        normalize(answers[`${r.id}-this`]) === normalize(r.thisTerm);
      if (okLast) correct++;
      if (okThis) correct++;
      nr[`${r.id}-last`] = okLast;
      nr[`${r.id}-this`] = okThis;
    });

    setResult(nr);
    const total = inputRows.length * 2;
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
    inputRows.forEach((row) => {
      a[`${row.id}-last`] = row.lastTerm;
      a[`${row.id}-this`] = row.thisTerm;
      r[`${row.id}-last`] = true;
      r[`${row.id}-this`] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit3Audio();
    setNarrationResetKey((key) => key + 1);
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="E"
          title="Read the speech and complete the chart with the main suggestion from each paragraph."
          subTitle="Read one paragraph at a time and transfer only its main improvement suggestion into the matching chart row."
        />

        <TimedNarrationText
          key={narrationResetKey}
          audioSrc={fullSpeechAudio}
          wordTimings={readingTimings}
          aliases={SPEECH_ALIASES}
          ariaLabel="the complete exam study tips speech"
          onBeforePlay={stopWorkbookUnit3Audio}
          style={{
            fontSize: "15px",
            lineHeight: "1.85",
            color: "#333",
            marginBottom: "28px",
          }}
        >
          {SPEECH_PARAGRAPHS.map((paragraph, paragraphIndex) => (
            <React.Fragment key={paragraphIndex}>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  textIndent: 0,
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {paragraph.map(([, text]) => text).join("")}
              </p>
              {" "}
            </React.Fragment>
          ))}
        </TimedNarrationText>

        <div
          style={{
            border: `1.5px solid ${BORDER}`,
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "3em",
            fontSize: "15px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "#f0f7e0",
              borderBottom: `1.5px solid ${BORDER}`,
            }}
          >
            <div
              style={{
                padding: "10px 16px",
                fontWeight: "bold",
                textAlign: "center",
                borderRight: `1.5px solid ${BORDER}`,
                fontSize: "16px",
              }}
            >
              <Unit3WorkbookAudioText
                src={workbookUnit3Audio("Page 17 - Exercise E", "Item_014_")}
                ariaLabel="Play Last Term"
              >
                Last Term
              </Unit3WorkbookAudioText>
            </div>
            <div
              style={{
                padding: "10px 16px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <Unit3WorkbookAudioText
                src={workbookUnit3Audio("Page 17 - Exercise E", "Item_013_")}
                ariaLabel="Play This Term"
              >
                This Term
              </Unit3WorkbookAudioText>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderBottom:
                  i < ROWS.length - 1 ? `1.5px solid ${BORDER}` : "none",
                minHeight: "60px",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  borderRight: `1.5px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {row.prefilled ? (
                  <span style={{ color: "#333", fontSize: "15px" }}>
                    {row.lastTerm}
                  </span>
                ) : (
                  <CellInput
                    rowKey={`${row.id}-last`}
                    value={answers[`${row.id}-last`]}
                    locked={locked}
                    result={result}
                    onChange={handleChange}
                  />
                )}
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {row.prefilled ? (
                  <span style={{ color: "#333", fontSize: "15px" }}>
                    {row.thisTerm}
                  </span>
                ) : (
                  <CellInput
                    rowKey={`${row.id}-this`}
                    value={answers[`${row.id}-this`]}
                    locked={locked}
                    result={result}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
          ))}
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

export default WB_Unit_Speech_E;
