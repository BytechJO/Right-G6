import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_14.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U7/PG 58/vocab7.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page26 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.299,
      end: 7.879,
      text: "Page 58, unit 7 vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 8.539, end: 10.059, text: "1. silly." },
    { start: 10.5, end: 12.039, text: "2. aware." },
    { start: 12.519, end: 14.479, text: "3. previously." },
    { start: 15.099, end: 16.899, text: "4. advice." },
    { start: 17.559, end: 19.5, text: "5. combinations." },
    { start: 20.079, end: 21.779, text: "6. background." },
    { start: 22.42, end: 24.079, text: "7. stencils." },
    { start: 24.439, end: 26.159, text: "8. ability." },
    { start: 27.219, end: 29.079, text: "9. flatter." },
    { start: 29.639, end: 31.439, text: "10. strokes." },
    { start: 32.279, end: 34.659, text: "11. it's been too long." },
    { start: 35.439, end: 37.139, text: "12. catch up." },
    { start: 37.819, end: 39.68, text: "13. stand out." },
    { start: 40.319, end: 42.579, text: "14. you're a natural." },
    { start: 43.279, end: 46.0, text: "15. now is your chance." },
    { start: 46.759, end: 48.7, text: "16. here I go." },
  ];

  const wordTimingsVoc = [
    { start: 8.3, end: 10.059 },
    { start: 10.3, end: 12.039 },
    { start: 12.3, end: 14.479 },
    { start: 14.8, end: 16.899 },
    { start: 17.3, end: 19.5 },
    { start: 19.8, end: 21.779 },
    { start: 22.1, end: 24.079 },
    { start: 24.2, end: 26.159 },
    { start: 27.0, end: 29.079 },
    { start: 29.4, end: 31.439 },
    { start: 32.0, end: 34.659 },
    { start: 35.1, end: 37.139 },
    { start: 37.5, end: 39.68 },
    { start: 40.0, end: 42.579 },
    { start: 43.0, end: 46.0 },
    { start: 46.5, end: 48.7 },
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
                  stopAtSecond={8}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "silly",
                    "aware",
                    "previously",
                    "advice",
                    "combinations",
                    "background",
                    "stencils",
                    "ability",
                    "flatter",
                    "strokes",
                    "It's been too long.",
                    "Catch up.",
                    "Stand out.",
                    "You're a natural.",
                    "Now is your chance.",
                    "Here I go.",
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

export default Posters_Page26;