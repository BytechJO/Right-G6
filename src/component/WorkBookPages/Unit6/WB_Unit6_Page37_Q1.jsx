import React, { useState } from "react";

import storyImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U6 Folder/SVG/9.svg";
import ExerciseHeader from "../../ExerciseHeader";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import audio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise J/full.mp3";

// ── Sentences that contain "used to" — students must underline them ──
// We split the story into segments; each segment is either plain text or a "used to" sentence.
// Students click on a sentence to toggle underline.

const SENTENCES = [
  {
    id: 1,
    text: "My town used to be the capital of our country.",
    hasUsedTo: true,
  },
  {
    id: 2,
    text: "When settlers first arrived in my town, the area was very popular.",
    hasUsedTo: false,
  },
  {
    id: 3,
    text: "There were several roads from different trade centers that went through my town.",
    hasUsedTo: false,
  },
  {
    id: 4,
    text: "People used to come to this town for trade, business, and work.",
    hasUsedTo: true,
  },
  {
    id: 5,
    text: "So 200 years ago, the government chose my town for the capital.",
    hasUsedTo: false,
  },
  {
    id: 6,
    text: "Everyone became used to visiting this town for government, business, and trade.",
    hasUsedTo: true,
  },
  {
    id: 7,
    text: "Then times began to change and the world started becoming more electronic and automated.",
    hasUsedTo: false,
  },
  {
    id: 8,
    text: "While the town where I now live used to be one of the few places nearby that people could travel to easily, many other towns were started that people could reach easily enough by car or train.",
    hasUsedTo: true,
  },
  {
    id: 9,
    text: "Soon cities grew nearby in areas that used to be too hard to get to but were now reachable by car.",
    hasUsedTo: true,
  },
  {
    id: 10,
    text: "These cities soon grew larger than my town, and the government decided to change the location of the capital for a larger city.",
    hasUsedTo: false,
  },
  {
    id: 11,
    text: "Although my town used to be rather large, it is now smaller than it used to be!",
    hasUsedTo: true,
  },
  {
    id: 12,
    text: "I like it better this way, but I realize that the less government and business that is done in a city, the fewer jobs there are.",
    hasUsedTo: false,
  },
  {
    id: 13,
    text: "I don't want anyone to be out of a job, but at the same time, I like my town just the way it is!",
    hasUsedTo: false,
  },
  {
    id: 14,
    text: "In the future, I hope we can stay the same size but still provide enough jobs for everyone.",
    hasUsedTo: false,
  },
  {
    id: 15,
    text: "Perhaps if people began growing some of their own food and living more simply, we could save more and still be able to stay a small town.",
    hasUsedTo: false,
  },
];

const BORDER = "#84ad40";

// ── Main Component ──

const captions = [
  {
    start: 0.1,
    end: 0.76,
    text: "My town.",
  },
  {
    start: 1.1,
    end: 3.68,
    text: "My town. My town used to be the capital of our country.",
  },
  {
    start: 4.3,
    end: 9.48,
    text: "When settlers first arrived in my town, the area was very popular.",
  },
  {
    start: 9.7,
    end: 14.04,
    text: "There were several roads from different trade centers that went through my town.",
  },
  {
    start: 14.56,
    end: 17.72,
    text: "People used to come to this town for trade, business,",
  },
  {
    start: 17.8,
    end: 20.88,
    text: "and work. So, 200 years ago,",
  },
  {
    start: 21.12,
    end: 25.72,
    text: "the government chose my town for the capital. Everyone became used to visiting,",
  },
  {
    start: 26.2,
    end: 28.72,
    text: "oui, this town for government,",
  },
  {
    start: 29.36,
    end: 33.2,
    text: "business, and trade. Then times began to change,",
  },
  {
    start: 33.32,
    end: 37.3,
    text: "and the world started becoming more electronic and automated.",
  },
  {
    start: 37.88,
    end: 44.3,
    text: "While the town where I now live used to be one of the few places nearby that people could travel to easily,",
  },
  {
    start: 44.68,
    end: 49.94,
    text: "many other towns were started that people could reach easily enough by car or train.",
  },
  {
    start: 50.6,
    end: 55.7,
    text: "Soon, cities grew nearby in areas that used to be too hard to get to,",
  },
  {
    start: 55.98,
    end: 61.42,
    text: "but were now reachable by car. These cities soon grew larger than my town,",
  },
  {
    start: 61.5,
    end: 66.98,
    text: "and the government decided to change the location of the capital for a larger city.",
  },
  {
    start: 67.56,
    end: 72.08,
    text: "Although my town used to be rather large, it is now smaller than it used to be.",
  },
  {
    start: 72.84,
    end: 79.6,
    text: "I like it better this way, but I realize that the less government and business that is done in a city,",
  },
  {
    start: 79.76,
    end: 83.9,
    text: "the fewer jobs there are. I don't want anyone to be out of a job,",
  },
  {
    start: 84.16,
    end: 87.48,
    text: "but at the same time, I like my town just the way it is.",
  },
  {
    start: 88.08,
    end: 91.02,
    text: "In the future, I hope we can stay the same size,",
  },
  {
    start: 91.42,
    end: 93.94,
    text: "but still provide enough jobs for everyone.",
  },
  {
    start: 94.6,
    end: 99.38,
    text: "Perhaps if people began growing some of their own food and living more simply,",
  },
  {
    start: 99.88,
    end: 103.08,
    text: "we could save more and still be able to stay a small town.",
  },
];

const WB_Unit_MyTown_J = () => {
  const [underlined, setUnderlined] = useState(new Set());

  const toggle = (id) => {
    setUnderlined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReset = () => setUnderlined(new Set());

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <ExerciseHeader
          sectionLetter="J"
          title={
            <>
              Read the story and underline each sentence that has{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>
                used to
              </span>
              .
            </>
          }
          subTitle="Underline the complete used to expression, including used to and the following verb phrase, not only one word."
        />
        <QuestionAudioPlayer
          src={audio}
          captions={captions}
          pageId="WB_Unit6_Page37_QJ"
        />
        {/* Story box */}
        <div
          style={{
            border: `1.5px solid ${BORDER}`,
            borderRadius: "10px",
            overflow: "hidden",
            padding: "20px",
            marginBottom: "3em",
            fontSize: "15px",
            lineHeight: "1.85",
            color: "#333",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "12px",
              fontSize: "16px",
            }}
          >
            My Town
          </p>

          {/* Image floated left */}
          <div
            style={{
              float: "left",
              marginRight: "14px",
              marginBottom: "8px",
              width: "220px",
            }}
          >
            <img
              src={storyImg}
              alt="my town"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "6px",
                display: "block",
              }}
            />
          </div>

          {/* Sentences — click to underline */}
          <div style={{ textAlign: "justify" }}>
            {SENTENCES.map((s) => (
              <span
                key={s.id}
                onClick={() => toggle(s.id)}
                style={{
                  textDecoration: underlined.has(s.id) ? "underline" : "none",
                  textDecorationColor: underlined.has(s.id)
                    ? "#1a1a1a"
                    : "transparent",
                  textDecorationThickness: "2px",
                  cursor: "pointer",
                  userSelect: "none",
                  marginRight: "4px",
                  color: "#333",
                  transition: "text-decoration 0.1s",
                }}
              >
                {s.text}{" "}
              </span>
            ))}
          </div>

          <div style={{ clear: "both" }} />
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

export default WB_Unit_MyTown_J;
