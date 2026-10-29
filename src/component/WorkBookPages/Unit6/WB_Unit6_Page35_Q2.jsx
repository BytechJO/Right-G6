/////////////////// Q5

/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit6AudioText, {
  stopWorkbookUnit6Audio,
  workbookUnit6Audio,
} from "./WorkbookUnit6AudioText";

import girlImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/3-cropped (1).svg";

const BORDER = "#84ad40";

const ITEMS = [
  {
    id: 1,
    prompt: "Mary/walk/two kilometers/to school",
    answer: "Mary is used to walking two kilometers to school.",
    audio: "Item_001_",
    prefilled: false,
  },
  {
    id: 2,
    prompt: "My friend/skateboard/to and from school",
    answer: "My friend is used to skateboarding to and from school.",
    audio: "Item_002_",
    prefilled: false,
  },
  {
    id: 3,
    prompt: "Cindy/see/her cousins/every weekend",
    answer: "Cindy is used to seeing her cousins every weekend.",
    audio: "Item_003_",
    prefilled: false,
  },
  {
    id: 4,
    prompt: "Joe/chop/wood/every fall",
    answer: "Joe is used to chopping wood every fall.",
    audio: "Item_004_",
    prefilled: false,
  },
  {
    id: 5,
    prompt: "We/swim/in cold water",
    answer: "We are used to swimming in cold water.",
    audio: "Item_005_",
    prefilled: false,
  },
];

const inputItems = ITEMS.filter((i) => !i.prefilled);

const initAnswers = () => {
  const a = {};
  inputItems.forEach(({ id }) => {
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

const AnswerInput = ({ value, onChange, disabled, isWrong, isCorrect }) => (
  <div style={{ position: "relative", flex: 1 }}>
    <input
      className="wb-unit6-input"
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write the complete sentence"
      title="Write the sentence using a noun, an -ing verb, and used to"
      aria-label="Completed used-to sentence"
      style={{
        width: "100%",
        border: "none",
        borderBottom: "1.5px solid #555",
        outline: "none",
        background: "transparent",
        fontSize: "16px",
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
  </div>
);

// ── Main Component ──

const WB_Unit_UsedTo_G = () => {
  const audioFolder = "Page 35 - Exercise G";
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
    const hasEmpty = inputItems.some(({ id }) => !answers[id].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const nr = {};
    inputItems.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);

    const total = inputItems.length;
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
    inputItems.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit6Audio();
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-7 mb-10">
        <ExerciseHeader
          sectionLetter="G"
          title={
            <>
              Make sentences with a noun +{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                -ing verb + used to
              </span>
              .
            </>
          }
          subTitle="Use the same subject twice: first the noun, then the activity as an -ing form after used to."
        />

        {/* Content: items + image */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          {/* Items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              flex: 1,
            }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {/* Prompt line */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
                  <WorkbookUnit6AudioText
                    src={workbookUnit6Audio(audioFolder, item.audio)}
                    ariaLabel={`Play sentence parts ${item.id}`}
                    style={{ fontSize: "16px", color: "#333" }}
                  >
                    {item.prompt}
                  </WorkbookUnit6AudioText>
                </div>

                {/* Answer line */}
                <div style={{ paddingLeft: "30px" }}>
                  {item.prefilled ? (
                    <div
                      style={{
                        borderBottom: "1.5px solid #555",
                        fontSize: "16px",
                        color: "#333",
                        paddingBottom: "2px",
                      }}
                    >
                      {item.answer}
                    </div>
                  ) : (
                    <AnswerInput
                      value={answers[item.id]}
                      onChange={(val) => handleChange(item.id, val)}
                      disabled={locked || result[item.id] === true}
                      isWrong={result[item.id] === false}
                      isCorrect={result[item.id] === true}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Girl image */}
          <img
            src={girlImg}
            alt="A schoolgirl wearing a uniform"
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
              flexShrink: 0,
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

export default WB_Unit_UsedTo_G;
