import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit10AudioText, {
  workbookUnit10Audio,
  workbookUnit10AudioSequence,
} from "./WorkbookUnit10AudioText";

const BORDER = "#84ad40";

const WORD_BANK = [
  "seashells",
  "occupied",
  "sandcastles",
  "surfing",
  "sunscreen",
  "sunburn",
];

const LINES = [
  { id: 0, text: "Susan likes going to the beach.", blank: false },
  {
    id: 1,
    before: "She loves picking up the",
    after: "within her reach.",
    blank: true,
    answer: "seashells",
  },
  {
    id: 2,
    before: "She loves building",
    after: "with sand on the beach.",
    blank: true,
    answer: "sandcastles",
  },
  {
    id: 3,
    before: "She dislikes",
    after: "in the ocean because she likes to stay on land.",
    blank: true,
    answer: "surfing",
  },
  {
    id: 4,
    before: "She always put on",
    after: "to protect herself from the sun,",
    blank: true,
    answer: "sunscreen",
  },
  {
    id: 5,
    before: "She doesn't want to get a",
    after: "because she would miss so much fun.",
    blank: true,
    answer: "sunburn",
  },
  {
    id: 6,
    before: "Being at the beach keeps Susan",
    after: ".",
    blank: true,
    answer: "occupied",
  },
  {
    id: 7,
    text: "She can play in the sand or go on a boat ride.",
    blank: false,
  },
];

const blankLines = LINES.filter((l) => l.blank);

const initAnswers = () => {
  const a = {};
  blankLines.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

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
        width: "200px",
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
        margin: "0 6px",
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
  </span>
);

// ── Main Component ──

const WB_Unit_Rhyme_K = () => {
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
    const hasEmpty = blankLines.some(({ id }) => !answers[id].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    blankLines.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = blankLines.length;
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
    blankLines.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-5">
        {/* Title */}
        <ExerciseHeader
          sectionLetter="K"
          title="Use a vocabulary word to complete the rhyme."
          subTitle="Read the full sentence first, then choose the vocabulary word that fits both the meaning and grammar."
        />

        {/* Word Bank */}
        <div
          style={{
            border: `1.5px solid ${BORDER}`,
            borderRadius: "8px",
            padding: "12px 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "18px",
          }}
        >
          {WORD_BANK.map((w, index) => (
            <WorkbookUnit10AudioText
              key={w}
              src={workbookUnit10Audio(
                "Page 61 - Exercise K",
                `Item_${String(index + 1).padStart(3, "0")}_`,
              )}
              ariaLabel={`Play ${w}`}
              style={{ fontSize: "16px", color: "#333" }}
            >
              {w}
            </WorkbookUnit10AudioText>
          ))}
        </div>

        {/* Poem lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            fontSize: "16px",
            lineHeight: "1.8",
            color: "#333",
          }}
        >
          {LINES.map((line) => {
            if (!line.blank) {
              return (
                <p key={line.id} style={{ margin: 0 }}>
                  <WorkbookUnit10AudioText
                    src={workbookUnit10Audio(
                      "Page 61 - Exercise K",
                      line.id === 0 ? "Item_007_" : "Item_019_",
                    )}
                    ariaLabel="Play sentence"
                    flowText
                  >
                    {line.text}
                  </WorkbookUnit10AudioText>
                </p>
              );
            }
            return (
              <p key={line.id} style={{ margin: 0 }}>
                <WorkbookUnit10AudioText
                  src={workbookUnit10AudioSequence(
                    "Page 61 - Exercise K",
                    {
                      1: ["Item_008_"],
                      2: ["Item_010_"],
                      3: ["Item_012_"],
                      4: ["Item_014_"],
                      5: ["Item_017_"],
                      6: ["Item_018_"],
                    }[line.id] || [],
                  )}
                  ariaLabel={`Play sentence ${line.id}`}
                  flowText
                >
                  {line.before}
                </WorkbookUnit10AudioText>
                <InlineInput
                  value={answers[line.id]}
                  onChange={(val) => handleChange(line.id, val)}
                  disabled={locked || result[line.id] === true}
                  isWrong={result[line.id] === false}
                  isCorrect={result[line.id] === true}
                />
                <WorkbookUnit10AudioText
                  src={workbookUnit10AudioSequence(
                    "Page 61 - Exercise K",
                    {
                      1: ["Item_009_"],
                      2: ["Item_011_"],
                      3: ["Item_013_"],
                      4: ["Item_015_"],
                      5: ["Item_016_"],
                    }[line.id] || [],
                  )}
                  ariaLabel={`Play sentence ending ${line.id}`}
                  flowText
                >
                  {line.after}
                </WorkbookUnit10AudioText>
              </p>
            );
          })}
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

export default WB_Unit_Rhyme_K;
