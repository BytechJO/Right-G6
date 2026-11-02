/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit6AudioText, {
  stopWorkbookUnit6Audio,
  workbookUnit6Audio,
  workbookUnit6AudioSequence,
} from "./WorkbookUnit6AudioText";

const ITEMS = [
  {
    id: 1,
    audio: null,
    text: (
      <>
        Usually I like pizza, but this dessert which has fruit and honey isn't
        really <u>to my liking</u>.
      </>
    ),
  },
  {
    id: 2,
    audio: ["Item_002_"],
    text: (
      <>
        <u>By the way</u>, could you pick up some milk while you're at the
        store?
      </>
    ),
  },
  {
    id: 3,
    audio: ["Item_003_", "Item_004_"],
    text: (
      <>
        Luis: Can I borrow your headphones?
        <br />
        Henry: Sure, <u>go ahead</u>. They're on my desk.
      </>
    ),
  },
  {
    id: 4,
    audio: ["Item_005_"],
    text: (
      <>
        <u>Years ago</u>, students wrote their reports by using a typewriter or
        by hand.
      </>
    ),
  },
];

const initAnswers = () => {
  const a = {};
  ITEMS.forEach(({ id }) => {
    a[id] = "";
  });
  return a;
};

// ── Sub-components OUTSIDE parent ──

const YourSentenceInput = ({ value, onChange, labelAudio, itemId }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      gap: "8px",
      paddingLeft: "0px",
    }}
  >
    <WorkbookUnit6AudioText
      src={labelAudio}
      ariaLabel={`Play Your sentence for item ${itemId}`}
      style={{ fontSize: "16px", color: "#333", whiteSpace: "nowrap" }}
    >
      Your sentence:
    </WorkbookUnit6AudioText>
    <input
      className="wb-unit6-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your sentence"
      title="Write a new sentence using the underlined expression"
      aria-label={`Your sentence ${itemId}`}
      style={{
        flex: 1,
        border: "none",
        borderBottom: "1px solid #555",
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: "#333",
        paddingBottom: "2px",
        fontFamily: "inherit",
        minWidth: 0,
      }}
    />
  </div>
);

// ── Main Component ──

const WB_Unit_WriteSentence_L = () => {
  const audioFolder = "Page 38 - Exercise L";
  const [answers, setAnswers] = useState(initAnswers);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit6Audio();
    setAnswers(initAnswers());
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-5">
        <ExerciseHeader
          sectionLetter="L"
          title={
            <>
              Read each example sentence, then write a new sentence using the
              same{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                underlined expression
              </span>
              .
            </>
          }
          subTitle="Use the target grammar pattern in a complete sentence and reread it for meaning before moving on."
        />

        {/* Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginBottom: "2em",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* Example sentence */}
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "10px" }}
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
                  src={
                    item.audio
                      ? workbookUnit6AudioSequence(audioFolder, item.audio)
                      : null
                  }
                  ariaLabel={`Play example sentence ${item.id}`}
                  style={{ fontSize: "16px", color: "#333", lineHeight: "1.6" }}
                >
                  {item.text}
                </WorkbookUnit6AudioText>
              </div>

              {/* Your sentence input */}
              <div style={{ paddingLeft: "30px" }}>
                <YourSentenceInput
                  value={answers[item.id]}
                  onChange={(val) => handleChange(item.id, val)}
                  labelAudio={workbookUnit6Audio(audioFolder, "Item_001_")}
                  itemId={item.id}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit_WriteSentence_L;
