import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_02.png";
import sound1 from "../../assets/audio/ClassBook/U1/PG 4/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U1/PG 4/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U1/PG 4/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U1/PG 4/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U1/PG 4/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U1/PG 4/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U1/PG 4/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U1/PG 4/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U1/PG 4/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U1/PG 4/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U1/PG 4/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U1/PG 4/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U1/PG 4/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U1/PG 4/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U1/PG 4/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U1/PG 4/sound16.mp3";
import VocabularAudio from "../../assets/audio/ClassBook/U1/PG 4/Pg4_Vocab1_Adult Lady.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page2 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.239,
      end: 7.059,
      text: "Page 4, unit 1 vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 7.539, end: 9.279, text: "1. supplies." },
    { start: 9.76, end: 11.279, text: "2. lately." },
    { start: 11.859, end: 13.359, text: "3. tough." },
    { start: 14.119, end: 16.02, text: "4. bed rest." },
    { start: 16.859, end: 18.479, text: "5. a set." },
    { start: 19.199, end: 21.039, text: "6. subject." },
    { start: 21.6, end: 23.399, text: "7. calculator." },
    { start: 23.939, end: 25.599, text: "8. remaining." },
    { start: 26.619, end: 28.439, text: "9. likely." },
    { start: 29.0, end: 30.739, text: "10. terrific." },
    { start: 31.459, end: 33.799, text: "11. I'm sorry to hear that." },
    { start: 34.639, end: 36.819, text: "12. it's no fun." },
    { start: 37.639, end: 40.079, text: "13. you can say that again." },
    { start: 40.739, end: 42.859, text: "14. count on you." },
    { start: 43.7, end: 45.939, text: "15. save me a trip." },
  ];

  const wordTimingsVoc = [
    { start: 7.539, end: 9.279, text: "1. supplies." },
    { start: 9.76, end: 11.279, text: "2. lately." },
    { start: 11.859, end: 13.359, text: "3. tough." },
    { start: 14.119, end: 16.02, text: "4. bed rest." },
    { start: 16.859, end: 18.479, text: "5. a set." },
    { start: 19.199, end: 21.039, text: "6. subject." },
    { start: 21.6, end: 23.399, text: "7. calculator." },
    { start: 23.939, end: 25.599, text: "8. remaining." },
    { start: 26.619, end: 28.439, text: "9. likely." },
    { start: 29.0, end: 30.739, text: "10. terrific." },
    { start: 31.459, end: 33.799, text: "11. I'm sorry to hear that." },
    { start: 34.639, end: 36.819, text: "12. it's no fun." },
    { start: 37.639, end: 40.079, text: "13. you can say that again." },
    { start: 40.739, end: 42.859, text: "14. count on you." },
    { start: 43.7, end: 45.939, text: "15. save me a trip." },
  ];

  const sounds = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
    sound13,
    sound14,
    sound15,
    sound16,
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
                  stopAtSecond={7.059}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "supplies",
                    "lately",
                    "tough",
                    "bed rest",
                    "a set",
                    "subject",
                    "calculator",
                    "remaining",
                    "likely",
                    "terrific",
                    "I'm sorry to hear that!",
                    "It's no fun ....",
                    "You can say that again!",
                    "count on you",
                    "save me a trip",
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

export default Posters_Page2;