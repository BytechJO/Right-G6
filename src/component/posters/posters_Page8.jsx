import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_08.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U4/PG 28/cd17pg28-vocab.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page8 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.219,
      end: 7.639,
      text: "Page 28, Unit 4, Vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 8.539, end: 10.38, text: "1. antique." },
    { start: 10.819, end: 12.439, text: "2. collection." },
    { start: 12.88, end: 14.699, text: "3. trinkets." },
    { start: 15.139, end: 17.119, text: "4. souvenirs." },
    { start: 17.739, end: 19.399, text: "5. travels." },
    { start: 19.959, end: 21.659, text: "6. stuff." },
    { start: 22.359, end: 24.119, text: "7. sewing." },
    { start: 24.5, end: 26.239, text: "8. archer." },
    { start: 27.139, end: 28.92, text: "9. archery." },
    { start: 29.619, end: 31.42, text: "10. carved." },
    { start: 32.139, end: 34.079, text: "11. range." },
    { start: 35.079, end: 37.52, text: "12. for a living." },
    { start: 38.079, end: 40.099, text: "13. spare time." },
    { start: 40.719, end: 42.68, text: "14. extra money." },
    { start: 43.399, end: 45.899, text: "15. bow and arrow." },
    { start: 46.86, end: 49.439, text: "16. world-class." },
  ];

  const wordTimingsVoc = [
    { start: 8.539, end: 10.38, text: "1. antique." },
    { start: 10.819, end: 12.439, text: "2. collection." },
    { start: 12.88, end: 14.699, text: "3. trinkets." },
    { start: 15.139, end: 17.119, text: "4. souvenirs." },
    { start: 17.739, end: 19.399, text: "5. travels." },
    { start: 19.959, end: 21.659, text: "6. stuff." },
    { start: 22.359, end: 24.119, text: "7. sewing." },
    { start: 24.5, end: 26.239, text: "8. archer." },
    { start: 27.139, end: 28.92, text: "9. archery." },
    { start: 29.619, end: 31.42, text: "10. carved." },
    { start: 32.139, end: 34.079, text: "11. range." },
    { start: 35.079, end: 37.52, text: "12. for a living." },
    { start: 38.079, end: 40.099, text: "13. spare time." },
    { start: 40.719, end: 42.68, text: "14. extra money." },
    { start: 43.399, end: 45.899, text: "15. bow and arrow." },
    { start: 46.86, end: 49.439, text: "16. world-class." },
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
                  stopAtSecond={8.539}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "antique",
                    "collection",
                    "trinkets",
                    "souvenirs",
                    "travels",
                    "stuff",
                    "sewing",
                    "archer",
                    "archery",
                    "carved",
                    "range",
                    "for a living",
                    "spare time",
                    "extra money",
                    "bow and arrow",
                    "world-class",
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

export default Posters_Page8;