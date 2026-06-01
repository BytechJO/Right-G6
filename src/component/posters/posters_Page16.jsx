import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_16.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U8/PG 64/vocab8.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page28 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.119,
      end: 7.759,
      text: "Page 64, Unit 8, Vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 8.22, end: 9.8, text: "1. nighttime." },
    { start: 10.239, end: 11.939, text: "2. glows." },
    { start: 12.479, end: 14.34, text: "3. table lamp." },
    { start: 14.839, end: 16.76, text: "4. wireless." },
    { start: 17.539, end: 19.279, text: "5. helicopter." },
    { start: 19.879, end: 21.959, text: "6. remote control." },
    { start: 22.579, end: 24.1, text: "7. gadget." },
    { start: 24.619, end: 26.42, text: "8. peculiar." },
    { start: 27.359, end: 29.199, text: "9. electric." },
    { start: 29.859, end: 31.759, text: "10. can opener." },
    { start: 32.459, end: 34.319, text: "11. timer." },
    { start: 35.04, end: 37.239, text: "12. memo holder." },
    { start: 37.819, end: 39.739, text: "13. tablet." },
    { start: 40.259, end: 42.099, text: "14. skills." },
    { start: 42.86, end: 45.099, text: "15. in ages." },
    { start: 45.86, end: 47.959, text: "16. here you are." },
    { start: 48.539, end: 50.479, text: "17. show up." },
    { start: 51.18, end: 53.279, text: "18. come in handy." },
    { start: 54.039, end: 56.18, text: "19. a great deal." },
  ];

  const wordTimingsVoc = [
    { start: 8.0, end: 9.8 },
    { start: 10.039, end: 11.939 },
    { start: 12.279, end: 14.34 },
    { start: 14.639, end: 16.76 },
    { start: 17.339, end: 19.279 },
    { start: 19.679, end: 21.959 },
    { start: 22.379, end: 24.1 },
    { start: 24.419, end: 26.42 },
    { start: 27.159, end: 29.199 },
    { start: 29.659, end: 31.759 },
    { start: 32.259, end: 34.319 },
    { start: 34.84, end: 37.239 },
    { start: 37.619, end: 39.739 },
    { start: 40.059, end: 42.099 },
    { start: 42.66, end: 45.099 },
    { start: 45.66, end: 47.959 },
    { start: 48.339, end: 50.479 },
    { start: 51.08, end: 53.279 },
    { start: 53.839, end: 56.18 },
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
                  stopAtSecond={7.8}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "nighttime",
                    "glows",
                    "table lamp",
                    "wireless",
                    "helicopter",
                    "remote control",
                    "gadget",
                    "peculiar",
                    "electric",
                    "can opener",
                    "timer",
                    "memo holder",
                    "tablet",
                    "skills",
                    "in ages",
                    "here you are!",
                    "show up",
                    "come in handy",
                    "a great deal",
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

export default Posters_Page28;