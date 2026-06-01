import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_12.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U6/PG 46/cd27pg46-vocab.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page24 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.359,
      end: 4.299,
      text: "Page 46, Unit 6 Vocabulary. Listen and repeat.",
    },
    {
      start: 5.039,
      end: 7.98,
      text: "Find the words and expressions in the conversation above.",
    },
    { start: 8.76, end: 10.219, text: "1, perfectly." },
    { start: 10.659, end: 12.38, text: "2, talented." },
    { start: 12.899, end: 14.839, text: "3, celebration." },
    { start: 15.399, end: 17.26, text: "4, entertaining." },
    { start: 18.0, end: 19.619, text: "5, flawless." },
    { start: 20.199, end: 21.859, text: "6, familiar." },
    { start: 22.559, end: 24.26, text: "7, summer school." },
    { start: 24.659, end: 26.639, text: "8, success." },
    { start: 27.26, end: 29.079, text: "9, proud." },
    { start: 29.619, end: 31.239, text: "10, lessons." },
    { start: 32.099, end: 34.759, text: "11, that sure is something." },
    { start: 35.399, end: 37.36, text: "12, speaking of." },
    { start: 38.0, end: 40.279, text: "13, to my liking." },
    { start: 40.819, end: 42.619, text: "14, go ahead." },
    { start: 43.34, end: 45.619, text: "15, by the way." },
    { start: 46.379, end: 48.459, text: "16, years ago." },
  ];

  const wordTimingsVoc = [
    { start: 8.76, end: 10.219 },
    { start: 10.659, end: 12.38 },
    { start: 12.899, end: 14.839 },
    { start: 15.399, end: 17.26 },
    { start: 18.0, end: 19.619 },
    { start: 20.199, end: 21.859 },
    { start: 22.559, end: 24.26 },
    { start: 24.659, end: 26.639 },
    { start: 27.26, end: 29.079 },
    { start: 29.619, end: 31.239 },
    { start: 32.099, end: 34.759 },
    { start: 35.399, end: 37.36 },
    { start: 38.0, end: 40.279 },
    { start: 40.819, end: 42.619 },
    { start: 43.34, end: 45.619 },
    { start: 46.379, end: 48.459 },
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
                  stopAtSecond={7.98}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "perfectly",
                    "talented",
                    "celebration",
                    "entertaining",
                    "flawless",
                    "familiar",
                    "summer school",
                    "success",
                    "proud",
                    "lessons",
                    "That sure is something!",
                    "Speaking of ...",
                    "to my liking",
                    "go ahead",
                    "By the way ...",
                    "years ago",
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

export default Posters_Page24;