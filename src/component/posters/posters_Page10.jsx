import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_10.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U5/PG 40/cd22pg40-vocab.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page22 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.34,
      end: 8.679,
      text: "Page 40, unit five vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 8.679, end: 10.279, text: "1, bookworm." },
    { start: 10.88, end: 12.759, text: "2, science fiction." },
    { start: 13.239, end: 15.0, text: "3, suppose." },
    { start: 15.719, end: 17.299, text: "4, boss." },
    { start: 17.979, end: 19.499, text: "5, comedy." },
    { start: 20.199, end: 21.92, text: "6, active." },
    { start: 22.579, end: 24.459, text: "7, imagination." },
    { start: 25.019, end: 26.699, text: "8, persuade." },
    { start: 27.819, end: 29.659, text: "9, intended." },
    { start: 30.34, end: 31.959, text: "10, opinion." },
    { start: 34.059, end: 34.679, text: "11, a while." },
    { start: 35.38, end: 37.359, text: "12, I guess." },
    { start: 38.0, end: 39.959, text: "13, after all." },
    { start: 40.68, end: 43.059, text: "14, it suits your taste." },
    { start: 43.879, end: 45.939, text: "15, if you say so." },
    { start: 46.919, end: 49.119, text: "16, suit yourself." },
  ];

  const wordTimingsVoc = [
    { start: 8.679, end: 10.279 },
    { start: 10.88, end: 12.759 },
    { start: 13.239, end: 15.0 },
    { start: 15.719, end: 17.299 },
    { start: 17.979, end: 19.499 },
    { start: 20.199, end: 21.92 },
    { start: 22.579, end: 24.459 },
    { start: 25.019, end: 26.699 },
    { start: 27.819, end: 29.659 },
    { start: 30.34, end: 31.959 },
    { start: 34.059, end: 34.679 },
    { start: 35.38, end: 37.359 },
    { start: 38.0, end: 39.959 },
    { start: 40.68, end: 43.059 },
    { start: 43.879, end: 45.939 },
    { start: 46.919, end: 49.119 },
  ];

  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page-voc hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Vocabulary
                  title="VOCABULARY"
                  subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                  sound={VocabularAudio}
                  captions={captionVoc}
                  stopAtSecond={8.679}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "bookworm",
                    "science fiction",
                    "suppose",
                    "boss",
                    "comedy",
                    "active",
                    "imagination",
                    "persuade",
                    "intended",
                    "opinion",
                    "a while",
                    "I guess",
                    "after all",
                    "It suits your taste.",
                    "If you say so.",
                    "Suit yourself.",
                  ]}
                />
              </div>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default Posters_Page22;