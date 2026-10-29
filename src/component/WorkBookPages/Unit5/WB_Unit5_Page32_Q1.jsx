/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit5AudioText, {
  stopWorkbookUnit5Audio,
  workbookUnit5Audio,
} from "./WorkbookUnit5AudioText";

const WORD_BANK = [
  { text: "a while", audio: "Item_001_" },
  { text: "I guess", audio: "Item_005_" },
  { text: "after all", audio: "Item_002_" },
  { text: "if you say so", audio: "Item_003_" },
  { text: "suit yourself", audio: "Item_004_" },
];

const BLANKS = {
  1: { answer: "I guess", width: "140px" },
  2: { answer: "If you say so", width: "150px" },
  3: { answer: "After all", width: "110px" },
  4: { answer: "a while", width: "110px" },
  5: { answer: "Suit yourself", width: "150px" },
};

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,'''""]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initAnswers = () => ({ 1: "", 2: "", 3: "", 4: "", 5: "" });

// ── InlineInput — OUTSIDE parent ──
const InlineInput = ({
  bId,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
  width,
}) => (
  <span style={{ position: "relative", verticalAlign: "bottom" }}>
    <input
      className="wb-unit5-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(bId, e.target.value)}
      placeholder="Expression"
      title="Enter the expression that completes the paragraph"
      aria-label={`Paragraph blank ${bId}`}
      style={{
        width,
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "1px",
        fontFamily: "inherit",
        textAlign: "center",
        pointerEvents: isCorrect ? "none" : "auto",
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
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          lineHeight: 1,
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          boxSizing: "border-box",
          pointerEvents: "none",
          zIndex: 5,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "9px",
            height: "2px",
            borderRadius: "2px",
            backgroundColor: "white",
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "9px",
            height: "2px",
            borderRadius: "2px",
            backgroundColor: "white",
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        />
      </span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit5_CompleteParagraph_J = () => {
  const audioFolder = "Page 32 - Exercise J";
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

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
    stopWorkbookUnit5Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  const B = (id) => (
    <InlineInput
      bId={id}
      value={answers[id]}
      onChange={handleChange}
      isCorrect={result[id] === true}
      isWrong={result[id] === false}
      disabled={locked || result[id] === true}
      width={BLANKS[id].width}
    />
  );

  const pStyle = {
    fontSize: "18px",
    lineHeight: "2.4",
    color: "#333",
    marginBottom: "16px",
    textIndent: "2em",
  };

  const segment = (prefix, text, label, withAudio) =>
    withAudio ? (
      <WorkbookUnit5AudioText
        src={workbookUnit5Audio(audioFolder, prefix)}
        ariaLabel={label}
        flowText
      >
        {text}
      </WorkbookUnit5AudioText>
    ) : (
      text
    );

  const paragraph = (fullFile, ready, label, renderContent) =>
    ready ? (
      <WorkbookUnit5AudioText
        src={workbookUnit5Audio(audioFolder, fullFile)}
        ariaLabel={label}
        fullAudio
        style={{
          ...pStyle,
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "2px 5px",
        }}
      >
        {renderContent(false)}
      </WorkbookUnit5AudioText>
    ) : (
      <div
        style={{
          ...pStyle,
          display: "block",
          width: "100%",
          textAlign: "left",
          padding: "2px 5px",
        }}
      >
        {renderContent(true)}
      </div>
    );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="J"
          title="Complete the paragraph with the correct expression."
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* Word Bank */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          {WORD_BANK.map((word) => (
            <WorkbookUnit5AudioText
              key={word.text}
              src={workbookUnit5Audio(audioFolder, word.audio)}
              ariaLabel={`Play ${word.text}`}
              style={{
                border: "1.5px solid #84ad40",
                borderRadius: "8px",
                padding: "5px 16px",
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              {word.text}
            </WorkbookUnit5AudioText>
          ))}
        </div>

        {/* Paragraph */}
        <div style={{ marginBottom: "3em" }}>
          {paragraph(
            "full1",
            result[1] === true,
            "Play paragraph 1",
            (withAudio) => (
              <>
                {segment(
                  "Item_006_",
                  'Jessica and her brother Kyle are waiting for the school bus. Jessica is tired of waiting because the bus is late. "',
                  "Play paragraph 1 opening",
                  withAudio,
                )}
                {B(1)}{" "}
                {segment(
                  "Item_007_",
                  "we should leave the house later, shouldn't we?\" Jessica asks.",
                  "Play paragraph 1 ending",
                  withAudio,
                )}
              </>
            ),
          )}

          {paragraph(
            "full2",
            result[2] === true && result[3] === true,
            "Play paragraph 2",
            (withAudio) => (
              <>
                "{B(2)},"{" "}
                {segment(
                  "Item_008_",
                  "replies her brother, \"but then we might miss the bus. Usually it's here on time.",
                  "Play paragraph 2 first part",
                  withAudio,
                )}{" "}
                {segment(
                  "Item_010_",
                  "It's just today that it's late.",
                  "Play paragraph 2 middle",
                  withAudio,
                )}{" "}
                {B(3)}
                {segment(
                  "Item_009_",
                  ', it is snowing hard today. The driver probably has to drive more slowly."',
                  "Play paragraph 2 ending",
                  withAudio,
                )}
              </>
            ),
          )}

          {paragraph(
            "full3",
            result[4] === true,
            "Play paragraph 3",
            (withAudio) => (
              <>
                {segment(
                  "Item_011_",
                  "Jessica says, \"Yes, it's a stormy day, isn't it? Well, if the bus isn't here in",
                  "Play paragraph 3 opening",
                  withAudio,
                )}{" "}
                {B(4)},{" "}
                {segment(
                  "Item_012_",
                  "I might walk home and see if Mom can take us to school. I don't want to wait in the cold much longer, do you?\"",
                  "Play paragraph 3 ending",
                  withAudio,
                )}
              </>
            ),
          )}

          {paragraph(
            "full4",
            result[5] === true,
            "Play paragraph 4",
            (withAudio) => (
              <>
                "{B(5)},"{" "}
                {segment(
                  "Item_013_",
                  'answers Kyle. "I\'m fine waiting here. I think the bus will come in a few minutes."',
                  "Play paragraph 4 ending",
                  withAudio,
                )}
              </>
            ),
          )}
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

export default WB_Unit5_CompleteParagraph_J;
