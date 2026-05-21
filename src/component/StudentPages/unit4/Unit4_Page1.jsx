import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/Page 28.png";
import "./Unit4_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U4/PG 28/pg28-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U4/PG 28/cd17pg28-vocab.mp3";

import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 31.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 32.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 33.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 30.svg";
import wordJson from "../../../assets/json/pg28-conversation_eng.json";
import video from "../../../assets/videos/grade 6 unit 4 page 28.mp4";

const Unit4_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Stella",
          text: "I like your room, Helen. Was your rug made in India?",
        },
        {
          speaker: "Helen",
          text: "No, it was made in Turkey. It’s an antique rug. It was my great, great grandmother’s.",
        },
        {
          speaker: "Stella",
          text: "Wow! What about this collection of trinkets?",
        },
        {
          speaker: "Helen",
          text: "They are from different countries. Most of my stuff is brought by my father as souvenirs when he travels.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Stella",
          text: "I wish my father would bring me nice things!",
        },
        {
          speaker: "Helen",
          text: "Well, if you help me clean my room, I can give you a souvenir!",
        },
        {
          speaker: "Stella",
          text: "Thanks, Helen. I will pick up your clothes and hang them in your closet. Is this skirt handmade?",
        },
        {
          speaker: "Helen",
          text: "Yes, it was made by my mom. She does lots of sewing.",
        },
        {
          speaker: "Stella",
          text: "How wonderful! Does she just sew for your family, or does she sew for a living?",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Helen",
          text: "She does both. When she has spare time, she likes to sew for extra money.",
        },
        {
          speaker: "Stella",
          text: "Is this a bow and arrow?",
        },
        {
          speaker: "Helen",
          text: "Yes, that was carved by my uncle. He is a world-class archer. He’s been teaching me how to do archery.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Stella",
          text: "Should I put these in your closet?",
        },
        {
          speaker: "Helen",
          text: "I have a hook on the wall for them. Do you want to come to the archery range with us one day?",
        },
        {
          speaker: "Stella",
          text: "That would be interesting!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.299,
      end: 5.039,
      text: "Page 28, Conversation. Listen and read, then say",
    },
    {
      start: 6.079,
      end: 9.159,
      text: "I like your room, Helen. Was your rug made in India?",
    },
    {
      start: 10.34,
      end: 16.579,
      text: "No, it was made in Turkey. It's an antique rug. It was my great-great-grandmother's.",
    },
    {
      start: 16.579,
      end: 20.26,
      text: "Wow. What about this collection of trinkets?",
    },
    {
      start: 20.26,
      end: 27.019,
      text: "They are from different countries. Most of my stuff is brought by my father as souvenirs when he travels.",
    },
    {
      start: 27.019,
      end: 30.439,
      text: "I wish my father would bring me nice things.",
    },
    {
      start: 30.439,
      end: 34.539,
      text: "Well, if you help me clean my room, I can give you a souvenir.",
    },
    {
      start: 34.54,
      end: 41.18,
      text: "Thanks, Helen. I will pick up your clothes and hang them in your closet. Is this skirt handmade?",
    },
    {
      start: 42.219,
      end: 46.659,
      text: "Yes. It was made by my mom. She does lots of sewing.",
    },
    {
      start: 46.659,
      end: 52.159,
      text: "How wonderful. Does she just sew for your family, or does she sew for a living?",
    },
    {
      start: 53.259,
      end: 58.579,
      text: "She does both. When she has spare time, she likes to sew for extra money.",
    },
    {
      start: 58.579,
      end: 61.379,
      text: "Is this a bow and arrow?",
    },
    {
      start: 61.379,
      end: 69.779,
      text: "[laughs] Yes. That was carved by my uncle. He is a world-class archer. He's been teaching me how to do archery.",
    },
    {
      start: 69.779,
      end: 72.479,
      text: "Should I put these in your closet?",
    },
    {
      start: 72.479,
      end: 78.079,
      text: "I have a hook on the wall for them. Do you wanna come to the archery range with us one day?",
    },
    {
      start: 78.08,
      end: 79.459,
      text: "That would be interesting",
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
    ],

    [captionsExample[10], captionsExample[11], captionsExample[12]],

    [captionsExample[13], captionsExample[14], captionsExample[15]],
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
    ],

    [
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
    ],

    [
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
    ],
  ];

  /////////////////VOCABULARY/////////////////

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
                  title="Conversation"
                  items={data}
                  sound={longAudio}
                  captions={captionsExample}
                  stopAtSecond={5.039}
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
                  stopAtSecond={8.539}
                  // sounds={sounds}
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
                title={"How will Stella get rewarded for helping to clean Helen’s room?"}
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

export default Unit4_Page1;
