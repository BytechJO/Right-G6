/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import TimedNarrationText from "../../TimedNarrationText";
import { stopWorkbookUnit8Audio } from "./WorkbookUnit8AudioText";
import readingTimings from "../../../assets/json/pg49-QI_eng.json";
import fullPassageAudio from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/full.mp3";
// بدّل المسار للصورة الفعلية (الفقرة + الصورة كاملة)
import pancakeImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U8 Folder/SVG/Asset 24 (3).svg";

const LINES = 6;

const initAnswers = () => {
  const a = {};
  for (let i = 1; i <= LINES; i++) {
    a[i] = i === 1 ? "" : "";
  }
  return a;
};

// ── LineInput — OUTSIDE parent ──
const LineInput = ({ lineId, value, onChange, disabled }) => (
  <input
    type="text"
    value={value}
    disabled={disabled}
    onChange={(e) => onChange(lineId, e.target.value)}
    placeholder="Write the reported sentence"
    title="Write what was said using reported speech"
    aria-label={`Answer line ${lineId}`}
    style={{
      flex: 1,
      border: "none",
      borderBottom: "1.5px solid #555",
      outline: "none",
      background: "transparent",
      fontSize: "17px",
      color: "#333",
      paddingBottom: "2px",
      fontFamily: "inherit",
      textDecoration: disabled ? "underline" : "none",
    }}
  />
);

// ── MAIN COMPONENT ──
const WB_Unit8_ReportedSpeechI = () => {
  const [answers, setAnswers] = useState(initAnswers);
  const [narrationResetKey, setNarrationResetKey] = useState(0);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    stopWorkbookUnit8Audio();
    setAnswers(initAnswers());
    setNarrationResetKey((key) => key + 1);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="I"
          title={
            <>
              Read the directions, then write what was said using{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                reported speech
              </span>
              .
            </>
          }
          subTitle="Read each direction as an original command, then convert it to reported speech with the correct reporting structure."
        />

        {/* Timed pancake directions */}
        <div style={{ marginBottom: "24px" }}>
          <TimedNarrationText
            key={narrationResetKey}
            audioSrc={fullPassageAudio}
            wordTimings={readingTimings}
            ariaLabel="the complete pancake directions"
            onBeforePlay={stopWorkbookUnit8Audio}
            style={{
              width: "100%",
              border: "2px solid #84ad40",
              borderRadius: "15px",
              padding: "16px 25px 28px",
              color: "#231f20",
              background: "#fff",
            }}
          >
            <h3
              style={{
                margin: 0,
                textAlign: "center",
                fontSize: "clamp(24px, 2.7vw, 35px)",
                lineHeight: 1.15,
                fontWeight: 700,
              }}
            >
              How to Make Pancakes
            </h3>
            <p
              style={{
                margin: "2px 0 14px",
                textAlign: "center",
                fontSize: "clamp(24px, 2.7vw, 35px)",
                lineHeight: 1.15,
                fontWeight: 700,
              }}
            >
              by Kevin Stocker
            </p>
            <div style={{ display: "flow-root" }}>
              <div
                style={{
                  position: "relative",
                  float: "right",
                  width: "35%",
                  maxWidth: "365px",
                  aspectRatio: "365 / 330",
                  overflow: "hidden",
                  borderRadius: "15px",
                  margin: "56px 0 12px 26px",
                }}
              >
                <img
                  src={pancakeImg}
                  alt="Fresh pancakes served with fruit"
                  style={{
                    position: "absolute",
                    width: "298.4%",
                    maxWidth: "none",
                    height: "auto",
                    left: "-192.7%",
                    top: "-54.8%",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "25px",
                  lineHeight: 1.38,
                  textAlign: "left",
                }}
              >
                First, mix the flour, eggs, salt, honey, milk or water, and
                baking powder in a bowl. Check for lumps, and squash any lumps
                out with a spoon. Put some oil in a pan and heat the pan until
                it begins getting hot. Spoon the pancakes onto the hot pan for
                the size of pancakes you want. Cook on one side until it{" "}
                <span aria-hidden="true" style={{ display: "none" }}>
                  see a toe{" "}
                </span>
                bubbles on top, and then turn the pancakes over and grill until
                golden brown on the other side. Most importantly, enjoy some
                with your family or friends!
              </p>
            </div>
          </TimedNarrationText>
        </div>

        {/* Answer lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginBottom: "3em",
          }}
        >
          {Array.from({ length: LINES }, (_, i) => i + 1).map((id) => (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
                fontSize: "17px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>
              <LineInput
                lineId={id}
                value={answers[id]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reset only */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit8_ReportedSpeechI;
