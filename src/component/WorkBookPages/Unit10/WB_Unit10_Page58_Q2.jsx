import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import WorkbookUnit10AudioText, {
  workbookUnit10Audio,
  stopWorkbookUnit10Audio,
} from "./WorkbookUnit10AudioText";

// بدّل المسار للصورة الفعلية
import tableImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U10 Folder/SVG/Asset 29 (1).svg";

const QUESTIONS = [
  {
    id: 1,
    answer: "Bill doesn't mind reading a book.",
    prefilled: false,
  },
  {
    id: 2,
    answer: "Mark enjoys fishing.",
    prefilled: false,
  },
  {
    id: 3,
    answer: "Brian doesn't mind watching soccer.",
    prefilled: false,
  },
  {
    id: 4,
    answer: "Tracy hates talking on the telephone.",
    prefilled: false,
  },
];

const TABLE_AUDIO_AREAS = [
  {
    label: "enjoys",
    prefix: "Item_001_",
    left: "35%",
    top: "10%",
    width: "21%",
    height: "10%",
  },
  {
    label: "doesn't mind",
    prefix: "Item_002_",
    left: "55%",
    top: "10%",
    width: "21%",
    height: "10%",
  },
  {
    label: "hates",
    prefix: "Item_003_",
    left: "77%",
    top: "10%",
    width: "21%",
    height: "10%",
  },
  {
    label: "Bill",
    prefix: "Item_004_",
    left: "6%",
    top: "20%",
    width: "28%",
    height: "19%",
  },
  {
    label: "Mark",
    prefix: "Item_005_",
    left: "6%",
    top: "40%",
    width: "28%",
    height: "19%",
  },
  {
    label: "Brian",
    prefix: "Item_006_",
    left: "6%",
    top: "60%",
    width: "28%",
    height: "19%",
  },
  {
    label: "Tracy",
    prefix: "Item_007_",
    left: "6%",
    top: "80%",
    width: "28%",
    height: "19%",
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'']/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initAnswers = () => {
  const a = {};
  QUESTIONS.forEach(({ id, answer, prefilled }) => {
    a[id] = prefilled ? answer : "";
  });
  return a;
};

// ── AnswerInput — OUTSIDE parent ──
const AnswerInput = ({
  qId,
  value,
  onChange,
  isCorrect,
  isWrong,
  disabled,
  prefilled,
}) => (
  <div style={{ position: "relative", flex: 1 }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "17px",
        color: prefilled
          ? "#333"
          : isCorrect
            ? "#c0392b"
            : isWrong
              ? "#D1232A"
              : "#333",
        fontWeight: prefilled || isCorrect ? "500" : "400",
        paddingBottom: "3px",
        fontFamily: "inherit",
        textDecoration: prefilled ? "underline" : "none",
      }}
    />
    {isWrong && (
      <span
        className="wb-unit10-error-x"
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
  </div>
);

// ── MAIN COMPONENT ──
const WB_Unit10_LookWrite_D = () => {
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
    const hasEmpty = QUESTIONS.filter((q) => !q.prefilled).some(
      ({ id }) => !answers[id].trim(),
    );
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer, prefilled }) => {
      if (prefilled) {
        nr[id] = true;
        return;
      }
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.filter((q) => !q.prefilled).length;
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
    stopWorkbookUnit10Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <ExerciseHeader
          sectionLetter="D"
          title="Look and write sentences using the chart."
          subTitle="Read all data for one person or row first, then write the sentence before moving to the next row."
        />

        {/* Table image */}
        <div
          style={{
            marginBottom: "24px",
            width: "110%",
            position: "relative",
            left: "-2vh",
          }}
        >
          <style>{`
            .wb-unit10-table-audio:hover,
            .wb-unit10-table-audio:focus-visible {
              box-shadow: inset 0 0 0 3px #2563eb;
              outline: none !important;
              background: rgba(37, 99, 235, 0.06) !important;
            }
          `}</style>
          <img
            src={tableImg}
            alt="Chart showing what Bill, Mark, Brian, and Tracy enjoy, do not mind, or hate doing"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          {TABLE_AUDIO_AREAS.map((area) => (
            <WorkbookUnit10AudioText
              key={area.label}
              src={workbookUnit10Audio("Page 58 - Exercise D", area.prefix)}
              ariaLabel={`Play ${area.label}`}
              className="wb-unit10-table-audio"
              style={{
                position: "absolute",
                left: area.left,
                top: area.top,
                width: area.width,
                height: area.height,
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <span className="sr-only">{area.label}</span>
            </WorkbookUnit10AudioText>
          ))}
        </div>

        {/* Answer lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, prefilled }) => {
            const isCorrect = result[id] === true;
            const isWrong = result[id] === false;
            return (
              <div
                key={id}
                style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    minWidth: "22px",
                  }}
                >
                  {id}
                </span>
                <AnswerInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  disabled={locked || isCorrect || prefilled}
                  prefilled={prefilled}
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

export default WB_Unit10_LookWrite_D;
