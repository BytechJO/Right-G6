import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_18.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U9/PG 76/vocab9.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page18 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.159,
      end: 7.439,
      text: "Page 76, unit nine, vocabulary. Listen and repeat. Find the words and the expressions in the conversation above.",
    },
    { start: 8.059, end: 9.639, text: "1. novel." },
    { start: 10.099, end: 11.8, text: "2. assigned." },
    { start: 12.199, end: 13.88, text: "3. chapter." },
    { start: 14.619, end: 16.259, text: "4. main." },
    { start: 16.92, end: 18.659, text: "5. characters." },
    { start: 19.299, end: 21.1, text: "6. perhaps." },
    { start: 21.739, end: 23.399, text: "7. discuss." },
    { start: 23.959, end: 26.059, text: "8. classmates." },
    { start: 26.879, end: 28.699, text: "9. distract." },
    { start: 29.459, end: 30.979, text: "10. deal." },
    { start: 31.739, end: 33.899, text: "11. ... in no time" },
    { start: 34.719, end: 38.559, text: "12. You only have (number) more to go." },
    { start: 39.639, end: 42.34, text: "13. I have been dying to ..." },
    { start: 43.099, end: 44.979, text: "14. Too bad!" },
    { start: 45.819, end: 48.0, text: "15. What are your plans ...?" },
  ];

  const wordTimingsVoc = [
    { start: 7.9, end: 9.639 },
    { start: 9.9, end: 11.8 },
    { start: 12.0, end: 13.88 },
    { start: 14.4, end: 16.259 },
    { start: 16.7, end: 18.659 },
    { start: 19.09, end: 21.1 },
    { start: 21.529, end: 23.399 },
    { start: 23.7, end: 26.059 },
    { start: 26.3, end: 28.699 },
    { start: 29.259, end: 30.979 },
    { start: 31.539, end: 33.899 },
    { start: 34.519, end: 38.559 },
    { start: 39.439, end: 42.34 },
    { start: 42.8, end: 44.979 },
    { start: 45.619, end: 48.0 },
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
                    "novel",
                    "assigned",
                    "chapter",
                    "main",
                    "characters",
                    "perhaps",
                    "discuss",
                    "classmates",
                    "distract",
                    "deal",
                    "... in no time",
                    "You only have (number) more to go.",
                    "I have been dying to ...",
                    "Too bad!",
                    "What are your plans ...?",
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

export default Posters_Page18;