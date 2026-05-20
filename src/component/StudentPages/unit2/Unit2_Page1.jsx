import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/Page 10.png";
import "./Unit2_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U2/PG 10/conversation_p10.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U2/PG 10/vocab_U2.mp3";

import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/1.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/2.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/3.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/4.svg";
import wordJson from "../../../assets/json/conversation2_eng.json";
import video from "../../../assets/videos/grade 6 unit 2 page 10.mp4";

const Unit2_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Harley",
          text: "I always wanted to snowboard, but I am terrified to try it!",
        },
        {
          speaker: "Tom",
          text: "Look at that snowboarder! He has such courage!",
        },
        {
          speaker: "Harley",
          text: "He’s moving so fast!",
        },
        {
          speaker: "Tom",
          text: "You look so nervous that I’d think you’re next.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Harley",
          text: "No, it’s just that I’m afraid. I think I would faint.",
        },
        {
          speaker: "Tom",
          text: "Come on, Harley! Where’s your sense of adventure?",
        },
        {
          speaker: "Harley",
          text: "I am still not sure I can do it.",
        },
        {
          speaker: "Tom",
          text: "Ha, ha! Look at that snowboarder come down the slope.It looks fun!",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Harley",
          text: "It looks so dangerous too! I don't feel comfortable watching.!",
        },
        {
          speaker: "Tom",
          text: "Come along! Let's ask the snowboarder about his experience. Excuse me, would you please tell us how it felt to snowboard?",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Snow -boarder",
          text: "Sure! It felt thrilling! I felt like I was so light and free. But you need to learn how to do it with a professional trainer first.",
        },

        {
          speaker: "Harley",
          text: "Thanks for sharing this with us.",
        },
        {
          speaker: "Snow -boarder",
          text: "No problem!",
        },
        {
          speaker: "Tom",
          text: "Harley, let’s go learn snowboarding!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.259,
      end: 5.819,
      text: "Page 10, Conversation. Listen and read, then say",
    },
    {
      start: 5.819,
      end: 10.439,
      text: "I always wanted to snowboard, but I am terrified to try it.",
    },
    {
      start: 10.439,
      end: 13.92,
      text: "Look at that snowboarder. He has such courage.",
    },
    {
      start: 13.92,
      end: 16.379,
      text: "He's moving so fast.",
    },
    {
      start: 16.379,
      end: 19.739,
      text: "You look so nervous that I'd think you're next.",
    },
    {
      start: 19.739,
      end: 24.259,
      text: "No, it's just that I'm afraid. I think I would faint.",
    },
    {
      start: 24.26,
      end: 27.639,
      text: "Come on, Harley. Where's your sense of adventure?",
    },
    {
      start: 27.639,
      end: 30.459,
      text: "I'm still not sure I can do it.",
    },
    {
      start: 30.459,
      end: 35.179,
      text: "Ha, ha!Look at that snowboarder come down the slope. It looks fun.",
    },
    {
      start: 35.18,
      end: 40.959,
      text: "It looks so dangerous too! I don’t feel comfortable watching.",
    },

    {
      start: 40.959,
      end: 50.86,
      text: "Come along! Let’s ask the snowboarder about his experience.Excuse me, would you please tell us how it felt to snowboard?",
    },

    {
      start: 50.86,
      end: 59.779,
      text: "Sure! It felt thrilling! I felt like I was so light and free. But you need to learn how to do it with a professional trainer first.",
    },
    {
      start: 59.779,
      end: 62.279,
      text: "Thanks for sharing this with us.",
    },
    {
      start: 62.279,
      end: 63.719,
      text: "No problem.",
    },
    {
      start: 63.719,
      end: 66.239,
      text: "Harley, let's go learn snowboarding",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4], // 🔥 هاي أضفها
    ],
    [
      captionsExample[5],
      captionsExample[6],
      captionsExample[7],
      captionsExample[8],
    ],
    [captionsExample[9], captionsExample[10]],
    [
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
      captionsExample[14],
    ],
  ];
  const filteredSegments = wordJson.segments.slice(1);

  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
      filteredSegments[3]?.words || [],
    ],
    [
      filteredSegments[4]?.words || [],
      filteredSegments[5]?.words || [],
      filteredSegments[6]?.words || [],
      filteredSegments[7]?.words || [],
    ],
    [filteredSegments[8]?.words || [], filteredSegments[9]?.words || []],
    [
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
    ],
  ];

  /////////////////VOCABULARY/////////////////

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

    {
      start: 35.479,
      end: 38.039,
      text: "12. where's your sense of adventure?",
    },

    {
      start: 38.719,
      end: 41.34,
      text: "13. I am still not sure.",
    },

    {
      start: 42.079,
      end: 44.399,
      text: "14. it looks so...",
    },

    {
      start: 45.219,
      end: 47.279,
      text: "15. come along.",
    },
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

    {
      start: 35.479,
      end: 38.039,
      text: "12. where's your sense of adventure?",
    },

    {
      start: 38.719,
      end: 41.34,
      text: "13. I am still not sure.",
    },

    {
      start: 42.079,
      end: 44.399,
      text: "14. it looks so...",
    },

    {
      start: 45.219,
      end: 47.279,
      text: "15. come along.",
    },
  ];
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
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
                <Conversation
                  title="Listen and read. Then say."
                  items={data}
                  sound={longAudio}
                  captions={captionsExample}
                  stopAtSecond={5.8}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
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
      <div
        className="headset-icon-CD-page4-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
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
                  stopAtSecond={7.3}
                  // sounds={sounds}
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
                    "Where’s your sense of adventure?",
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
      <div
        className="headset-icon-CD-page4-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <CriticalThinking
                title={"Do you think Harley would ever go snowboarding?"}
              />,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
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

export default Unit2_Page1;
