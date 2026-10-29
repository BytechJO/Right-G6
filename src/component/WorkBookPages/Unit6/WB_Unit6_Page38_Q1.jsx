/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit6AudioText, {
  stopWorkbookUnit6Audio,
  workbookUnit6Audio,
} from "./WorkbookUnit6AudioText";

const BORDER = "#84ad40";

const WORD_BANK = [
  "go ahead",
  "speaking of",
  "years ago",
  "to my liking",
  "by the way",
];

const ITEMS = [
  {
    id: 1,
    before: "",
    after:
      ", I saw you yesterday waiting for the school bus, but you didn't see me.",
    answer: "By the way",
    afterAudio: "Item_006_",
  },
  {
    id: 2,
    before:
      "Student One: My uncle, believe it or not, used to be a clown in the circus!\nStudent Two:",
    after: "circuses, did you know there's one coming to town next week?",
    answer: "Speaking of",
    beforeAudio: "Item_007_",
    speakerAudio: "Item_008_",
    afterAudio: "Item_009_",
  },
  {
    id: 3,
    before: "Snowboarding isn't really",
    after: ". I'm not the adventurous type.",
    answer: "to my liking",
    beforeAudio: "Item_010_",
    afterAudio: "Item_011_",
  },
  {
    id: 4,
    before: "Please",
    after:
      "and help yourself to the cookies and milk. I put it there so you could have some when you got hungry or thirsty.",
    answer: "go ahead",
    beforeAudio: "Item_012_",
    afterAudio: "Item_013_",
  },
  {
    id: 5,
    before: "Oh, we moved to this house",
    after: ".",
    answer: "years ago",
    beforeAudio: "Item_014_",
  },
];

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
      className="wb-unit6-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Expression"
      title="Write the correct expression from the word bank"
      aria-label="Missing expression"
      style={{
        width: "180px",
        border: "none",
        borderBottom: `1px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
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
          transform: "translateY(-50%)",
          width: "20px",
          height: "20px",
          background: "red",
          color: "white",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
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

// ── Main Component ──

const WB_Unit_Expressions_K = () => {
  const audioFolder = "Page 38 - Exercise K";
  const [answers, setAnswers] = useState(() => {
    const a = {};
    ITEMS.forEach(({ id }) => {
      a[id] = "";
    });
    return a;
  });
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = ITEMS.some(({ id }) => !answers[id].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    ITEMS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = ITEMS.length;
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
    ITEMS.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit6Audio();
    const a = {};
    ITEMS.forEach(({ id }) => {
      a[id] = "";
    });
    setAnswers(a);
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="K"
          title="Complete each sentence with the correct expression."
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* Word Bank */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            margin: "2em 0",
          }}
        >
          {WORD_BANK.map((w, index) => (
            <WorkbookUnit6AudioText
              key={w}
              src={workbookUnit6Audio(
                audioFolder,
                `Item_${String(index + 1).padStart(3, "0")}_`,
              )}
              ariaLabel={`Play ${w}`}
              style={{
                border: `1.5px solid ${BORDER}`,
                borderRadius: "10px",
                padding: "6px 18px",
                fontSize: "15px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              {w}
            </WorkbookUnit6AudioText>
          ))}
        </div>

        {/* Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginBottom: "3em",
          }}
        >
          {ITEMS.map((item) => {
            const hasFullAudio = result[item.id] === true;
            return (
            <WorkbookUnit6AudioText
              key={item.id}
              src={
                hasFullAudio
                  ? workbookUnit6Audio(audioFolder, `full${item.id}`)
                  : null
              }
              ariaLabel={`Play complete sentence ${item.id}`}
              fullAudio={hasFullAudio}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                width: "fit-content",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  minWidth: "20px",
                }}
              >
                {item.id}
              </span>

              <div
                style={{
                  fontSize: "16px",
                  color: "#333",
                  lineHeight: "2",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {item.id === 2 ? (
                  <>
                    <WorkbookUnit6AudioText
                      src={workbookUnit6Audio(audioFolder, item.beforeAudio)}
                      ariaLabel="Play Student One sentence"
                      disabled={hasFullAudio}
                      style={{ display: "block" }}
                    >
                      Student One: My uncle, believe it or not, used to be a
                      clown in the circus!
                    </WorkbookUnit6AudioText>

                    <div>
                      <WorkbookUnit6AudioText
                        src={workbookUnit6Audio(audioFolder, item.speakerAudio)}
                        ariaLabel="Play Student Two"
                        disabled={hasFullAudio}
                        flowText
                      >
                        Student Two:{" "}
                      </WorkbookUnit6AudioText>
                      <InlineInput
                        value={answers[item.id]}
                        onChange={(val) => handleChange(item.id, val)}
                        disabled={locked || result[item.id] === true}
                        isWrong={result[item.id] === false}
                        isCorrect={result[item.id] === true}
                      />{" "}
                      <WorkbookUnit6AudioText
                        src={workbookUnit6Audio(audioFolder, item.afterAudio)}
                        ariaLabel="Play the rest of sentence 2"
                        disabled={hasFullAudio}
                        flowText
                      >
                        {item.after}
                      </WorkbookUnit6AudioText>
                    </div>
                  </>
                ) : (
                  <>
                    {item.before && (
                      <WorkbookUnit6AudioText
                        src={workbookUnit6Audio(audioFolder, item.beforeAudio)}
                        ariaLabel={`Play the beginning of sentence ${item.id}`}
                        disabled={hasFullAudio}
                        flowText
                      >
                        {item.before + " "}
                      </WorkbookUnit6AudioText>
                    )}
                    <InlineInput
                      value={answers[item.id]}
                      onChange={(val) => handleChange(item.id, val)}
                      disabled={locked || result[item.id] === true}
                      isWrong={result[item.id] === false}
                      isCorrect={result[item.id] === true}
                    />{" "}
                    <WorkbookUnit6AudioText
                      src={workbookUnit6Audio(audioFolder, item.afterAudio)}
                      ariaLabel={`Play the rest of sentence ${item.id}`}
                      disabled={hasFullAudio}
                      flowText
                    >
                      {item.after}
                    </WorkbookUnit6AudioText>
                  </>
                )}
              </div>
            </WorkbookUnit6AudioText>
          );})}
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

export default WB_Unit_Expressions_K;
