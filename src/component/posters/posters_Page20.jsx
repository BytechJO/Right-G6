import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_20.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U10/PG 82/vocab10.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page20 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.319,
      end: 8.46,
      text: "Page 82, Unit 10, Vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 9.519, end: 11.279, text: "1. seashells." },
    { start: 11.679, end: 13.399, text: "2. occupied." },
    { start: 14.059, end: 15.88, text: "3. sunscreen." },
    { start: 16.559, end: 18.42, text: "4. sunburn." },
    { start: 19.159, end: 20.84, text: "5. dozens." },
    { start: 21.379, end: 23.319, text: "6. surfing." },
    { start: 24.0, end: 26.039, text: "7. sandcastles." },
    { start: 26.42, end: 28.559, text: "8. necessary." },
    { start: 29.079, end: 31.279, text: "9. surfboard." },
    { start: 31.699, end: 33.459, text: "10. rent." },
    { start: 34.24, end: 37.239, text: "11. To tell you the truth ..." },
    { start: 37.66, end: 40.439, text: "12. that's fine with me." },
    { start: 41.179, end: 43.399, text: "13. stay close." },
    { start: 44.0, end: 46.919, text: "14.  ... keep an eye on (you) ..." },
    { start: 47.6, end: 50.079, text: "15.  ... close by" },
    { start: 50.539, end: 52.799, text: "16. have fun!" },
  ];

  const wordTimingsVoc = [
    { start: 9.4, end: 11.279 },
    { start: 11.679, end: 13.399 },
    { start: 14.059, end: 15.88 },
    { start: 16.559, end: 18.42 },
    { start: 19.0, end: 20.84 },
    { start: 21.1, end: 23.319 },
    { start: 23.8, end: 26.039 },
    { start: 26.22, end: 28.559 },
    { start: 29.079, end: 31.279 },
    { start: 31.699, end: 33.459 },
    { start: 34.2, end: 37.239 },
    { start: 37.66, end: 40.439 },
    { start: 41.179, end: 43.399 },
    { start: 44.0, end: 46.919 },
    { start: 47.6, end: 50.079 },
    { start: 50.539, end: 52.799 },
  ];

  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page2-p hover:scale-110 transition"
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
                  stopAtSecond={9}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "seashells",
                    "occupied",
                    "sunscreen",
                    "sunburn",
                    "dozens",
                    "surfing",
                    "sandcastles",
                    "necessary",
                    "surfboard",
                    "rent",
                    "To tell you the truth ...",
                    "That's fine with me.",
                    "Stay close.",
                    " ... keep an eye on (you) ...",
                    " ... close by",
                    "Have fun!",
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

export default Posters_Page20;