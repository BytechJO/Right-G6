import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_04.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U2/PG 10/vocab_U2.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page4 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.359,
      end: 7.339,
      text: "Page 10, Unit 2, Vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 7.839, end: 9.5, text: "1. snowboarding." },
    { start: 10.079, end: 11.679, text: "2. terrified." },
    { start: 12.3, end: 14.159, text: "3. courage." },
    { start: 14.819, end: 16.679, text: "4. nervous." },
    { start: 17.299, end: 19.039, text: "5. faint." },
    { start: 19.799, end: 21.379, text: "6. slope." },
    { start: 22.18, end: 23.859, text: "7. comfortable." },
    { start: 24.379, end: 26.399, text: "8. experience." },
    { start: 27.379, end: 29.239, text: "9. thrilling." },
    { start: 29.819, end: 31.739, text: "10. adventure." },
    { start: 32.459, end: 34.639, text: "11. professional." },
    { start: 35.479, end: 38.039, text: "12. where's your sense of adventure?" },
    { start: 38.719, end: 41.34, text: "13. I am still not sure." },
    { start: 42.079, end: 44.399, text: "14. it looks so..." },
    { start: 45.219, end: 47.279, text: "15. come along." },
  ];

  const wordTimingsVoc = [
    { start: 7.839, end: 9.5, text: "1. snowboarding." },
    { start: 10.079, end: 11.679, text: "2. terrified." },
    { start: 12.3, end: 14.159, text: "3. courage." },
    { start: 14.819, end: 16.679, text: "4. nervous." },
    { start: 17.299, end: 19.039, text: "5. faint." },
    { start: 19.799, end: 21.379, text: "6. slope." },
    { start: 22.18, end: 23.859, text: "7. comfortable." },
    { start: 24.379, end: 26.399, text: "8. experience." },
    { start: 27.379, end: 29.239, text: "9. thrilling." },
    { start: 29.819, end: 31.739, text: "10. adventure." },
    { start: 32.459, end: 34.639, text: "11. professional." },
    { start: 35.479, end: 38.039, text: "12. where's your sense of adventure?" },
    { start: 38.719, end: 41.34, text: "13. I am still not sure." },
    { start: 42.079, end: 44.399, text: "14. it looks so..." },
    { start: 45.219, end: 47.279, text: "15. come along." },
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
                  stopAtSecond={7.339}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "snowboarding",
                    "terrified",
                    "courage",
                    "nervous",
                    "faint",
                    "slope",
                    "comfortable",
                    "experience",
                    "thrilling",
                    "adventure",
                    "professional",
                    "Where's your sense of adventure?",
                    "I am still not sure ...",
                    "It looks so ...",
                    "Come along!",
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

export default Posters_Page4;