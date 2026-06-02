import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_06.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U3/PG 22/vocab.mp3";
import Vocabulary from "../Vocabulary";
import "./posters.css";

const Posters_Page6 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.179,
      end: 8.659,
      text: "Page 22, unit three vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 8.659, end: 10.8, text: "1. exhausted." },
    { start: 10.8, end: 13.179, text: "2. fast foods." },
    { start: 13.179, end: 15.579, text: "3. leftovers." },
    { start: 15.579, end: 17.659, text: "4. dinner." },
    { start: 17.659, end: 20.1, text: "5. acceptable." },
    { start: 20.1, end: 22.299, text: "6. liver." },
    { start: 22.299, end: 24.34, text: "7. offer." },
    { start: 24.34, end: 27.479, text: "8. mashed potatoes." },
    { start: 27.479, end: 29.939, text: "9. unwind." },
    { start: 29.939, end: 33.239, text: "10. I don't think so." },
    { start: 33.239, end: 36.219, text: "11. let's take a look." },
    { start: 36.219, end: 38.919, text: "12. if I were you." },
    { start: 38.919, end: 41.84, text: "13. it's too late." },
    { start: 41.84, end: 45.059, text: "14. I wouldn't mind." },
    { start: 45.059, end: 47.08, text: "15. I'll pass." },
  ];

  const wordTimingsVoc = [
    { start: 8.659, end: 10.8, text: "1. exhausted." },
    { start: 10.8, end: 13.179, text: "2. fast foods." },
    { start: 13.179, end: 15.579, text: "3. leftovers." },
    { start: 15.579, end: 17.659, text: "4. dinner." },
    { start: 17.659, end: 20.1, text: "5. acceptable." },
    { start: 20.1, end: 22.299, text: "6. liver." },
    { start: 22.299, end: 24.34, text: "7. offer." },
    { start: 24.34, end: 27.479, text: "8. mashed potatoes." },
    { start: 27.479, end: 29.939, text: "9. unwind." },
    { start: 29.939, end: 33.239, text: "10. I don't think so." },
    { start: 33.239, end: 36.219, text: "11. let's take a look." },
    { start: 36.219, end: 38.919, text: "12. if I were you." },
    { start: 38.919, end: 41.84, text: "13. it's too late." },
    { start: 41.84, end: 45.059, text: "14. I wouldn't mind." },
    { start: 45.059, end: 47.08, text: "15. I'll pass." },
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
                  stopAtSecond={8.2}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "exhausted",
                    "fast foods",
                    "leftovers",
                    "diner",
                    "acceptable",
                    "liver",
                    "offer",
                    "mashed potatoes",
                    "unwind",
                    "I don't think so!",
                    "Let's take a look.",
                    "If I were you, ...",
                    "It's too late.",
                    "I wouldn't mind ...",
                    "I'll pass.",
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

export default Posters_Page6;