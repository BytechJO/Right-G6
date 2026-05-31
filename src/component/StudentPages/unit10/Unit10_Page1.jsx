import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/Page 82.png";
import "./Unit10_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U10/PG 82/conversation10.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U10/PG 82/vocab10.mp3";

import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 2.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 3.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 6.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 7.svg";
import wordJson from "../../../assets/json/conversation10_eng.json";
import video from "../../../assets/videos/grade 6 unit 10 page 82.mp4";

const Unit10_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Stella",
          text: "Helen, would you like to go mountain climbing with me?",
        },
        {
          speaker: "Helen",
          text: "To tell you the truth, I prefer going to the beach and collecting seashells.",
        },
        {
          speaker: "Stella",
          text: "That’s fine with me. When would you like to go?",
        },
        {
          speaker: "Helen",
          text: "I would like to go right now while the beach is less occupied.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Stella",
          text: "Okay. Mom and Sarah are coming with us. Sarah loves playing in the sand.",
        },
        {
          speaker: "Helen",
          text: "Make sure you put on lots of sunscreen. We don’t want anyone to get a sunburn.",
        },
        {
          speaker: "Stella",
          text: "Look at the beach. You were right, Helen. There aren’t many people here at this time.",
        },
        {
          speaker: "Helen",
          text: "Look at the seashells! I’m going to collect dozens of them.",
        },
        {
          speaker: "Sarah",
          text: "I want seashells, too! I’ll help you pick them up.",
        },
        {
          speaker: "Stella",
          text: "Sarah, stay close to us.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Helen",
          text: "I love surfing in the ocean. Do you want to go surfing with me?",
        },
        {
          speaker: "Stella",
          text: "Sure! Sarah, stay with Mom so she can keep an eye on you.",
        },
        {
          speaker: "Sarah",
          text: "Okay, Stella. I don’t mind waiting for you. I love building sandcastles.",
        },
        {
          speaker: "Helen",
          text: "I’m so glad that the beach is close by.",
        },
        {
          speaker: "Stella",
          text: "Me, too. I like walking to the beach. A car is not even necessary to get here.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Helen",
          text: "So, did you find a surfboard yet?",
        },
        {
          speaker: "Stella",
          text: "There are lots of them over there. Let’s go and rent two of them.",
        },
        {
          speaker: "Sarah",
          text: "Have fun!",
        },
        {
          speaker: "Stella",
          text: "We will! Come on, Helen. Let’s surf!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.119,
      end: 5.319,
      text: "Page 82, conversation. Listen and read, then say",
    },

    {
      start: 5.319,
      end: 8.979,
      text: "Helen, would you like to go mountain climbing with me?",
    },
    {
      start: 8.979,
      end: 13.919,
      text: "To tell you the truth, I prefer going to the beach and collecting seashells.",
    },
    {
      start: 13.92,
      end: 16.42,
      text: "That's fine with me. When would you like to go?",
    },
    {
      start: 17.52,
      end: 21.559,
      text: "I would like to go right now while the beach is less occupied.",
    },

    {
      start: 21.559,
      end: 26.799,
      text: "Okay. Mom and Sarah are coming with us. Sarah loves playing in the sand.",
    },
    {
      start: 27.879,
      end: 32.559,
      text: "Make sure you put on lots of sunscreen. We don't want anyone to get a sunburn.",
    },
    {
      start: 32.559,
      end: 37.959,
      text: "Look at the beach. You were right, Helen, there aren't many people here at this time.",
    },
    {
      start: 39.079,
      end: 43.019,
      text: "Look at the seashells. I'm going to collect dozens of them.",
    },
    {
      start: 43.02,
      end: 47.159,
      text: "I want seashells, too. I'll help you pick them up.",
    },
    {
      start: 47.159,
      end: 49.219,
      text: "Sarah, stay close to us.",
    },

    {
      start: 50.239,
      end: 54.359,
      text: "I love surfing in the ocean. Do you wanna go surfing with me?",
    },
    {
      start: 54.36,
      end: 58.899,
      text: "Sure. Sarah, stay with Mom so she can keep an eye on you.",
    },
    {
      start: 58.899,
      end: 64.739,
      text: "Okay, Stella. I don't mind waiting for you. I love building sandcastles.",
    },
    {
      start: 64.739,
      end: 67.959,
      text: "I'm so glad that the beach is close by.",
    },
    {
      start: 67.959,
      end: 74.299,
      text: "Me too. I like walking to the beach. A car is not even necessary to get here.",
    },

    {
      start: 74.299,
      end: 76.519,
      text: "So did you find a surfboard yet?",
    },
    {
      start: 76.519,
      end: 80.86,
      text: "There are lots of them over there. Let's go and rent two of them.",
    },
    {
      start: 80.86,
      end: 81.959,
      text: "Have fun.",
    },
    {
      start: 81.959,
      end: 84.519,
      text: "We will. Come on, Helen, let's surf",
    },
  ];

  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
    ],

    [
      captionsExample[5],
      captionsExample[6],
      captionsExample[7],
      captionsExample[8],
      captionsExample[9],
      captionsExample[10],
    ],

    [
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
      captionsExample[14],
      captionsExample[15],
    ],

    [
      captionsExample[16],
      captionsExample[17],
      captionsExample[18],
      captionsExample[19],
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
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
    ],

    [
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
    ],

    [
      filteredSegments[15]?.words || [],
      filteredSegments[16]?.words || [],
      filteredSegments[17]?.words || [],
      filteredSegments[18]?.words || [],
    ],
  ];

  /////////////////VOCABULARY/////////////////

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
    {
      start: 34.24,
      end: 37.239,
      text: "11. To tell you the truth ...",
    },

    {
      start: 37.66,
      end: 40.439,
      text: "12. that's fine with me.",
    },

    {
      start: 41.179,
      end: 43.399,
      text: "13. stay close.",
    },

    {
      start: 44.0,
      end: 46.919,
      text: "14.  ... keep an eye on (you) ...",
    },

    {
      start: 47.6,
      end: 50.079,
      text: "15.  ... close by",
    },

    {
      start: 50.539,
      end: 52.799,
      text: "16. have fun!",
    },
  ];

  const wordTimingsVoc = [
    { start: 9.4, end: 11.279, text: "1. seashells." },
    { start: 11.679, end: 13.399, text: "2. occupied." },
    { start: 14.059, end: 15.88, text: "3. sunscreen." },
    { start: 16.559, end: 18.42, text: "4. sunburn." },

    { start: 19.0, end: 20.84, text: "5. dozens." },
    { start: 21.1, end: 23.319, text: "6. surfing." },
    { start: 23.8, end: 26.039, text: "7. sandcastles." },
    { start: 26.22, end: 28.559, text: "8. necessary." },

    { start: 29.079, end: 31.279, text: "9. surfboard." },
    { start: 31.699, end: 33.459, text: "10. rent." },

    {
      start: 34.2,
      end: 37.239,
      text: "11. To tell you the truth ...",
    },

    {
      start: 37.66,
      end: 40.439,
      text: "12. that's fine with me.",
    },

    {
      start: 41.179,
      end: 43.399,
      text: "13. stay close.",
    },

    {
      start: 44.0,
      end: 46.919,
      text: "14.  ... keep an eye on (you) ...",
    },

    {
      start: 47.6,
      end: 50.079,
      text: "15.  ... close by",
    },

    {
      start: 50.539,
      end: 52.799,
      text: "16. have fun!",
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
                  stopAtSecond={5}
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
                  stopAtSecond={9}
                  // sounds={sounds}
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
              <CriticalThinking title={"What does Sarah like building?"} />,
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

export default Unit10_Page1;
