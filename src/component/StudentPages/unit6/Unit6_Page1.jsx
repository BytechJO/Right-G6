import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/Page 46.png";
import "./Unit6_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U6/PG 46/cd26pg46-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U6/PG 46/cd27pg46-vocab.mp3";

import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 5.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 6.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 9.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 12.svg";
import wordJson from "../../../assets/json/cd26pg46-conversation_eng.json";
import video from "../../../assets/videos/grade 6 unit 2 page 10.mp4";

const Unit6_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
 const data = [
  {
    number: 1,
    image: imgConversation1,
    dialogues: [
      {
        speaker: "Stella",
        text: "Is this piano in the living room yours, Helen?",
      },
      {
        speaker: "Helen",
        text: "It’s my mother’s piano. She used to play it perfectly when she was a young girl.",
      },
      {
        speaker: "Stella",
        text: "That sure is something! Your mom seems to be very talented. Does she still play the piano?",
      },
      {
        speaker: "Helen",
        text: "Yes, she plays it sometimes when we have a family celebration.",
      },
    ],
  },

  {
    number: 2,
    image: imgConversation2,
    dialogues: [
      {
        speaker: "Stella",
        text: "Wow! I never knew that! That’s a good way to make a party entertaining.",
      },
      {
        speaker: "Helen",
        text: "Speaking of entertainment, why don’t we go to the arcade?",
      },
      {
        speaker: "Stella",
        text: "Playing the piano seems more to my liking.",
      },
      {
        speaker: "Helen",
        text: "OK, you can go ahead and play it.",
      },
    ],
  },

  {
    number: 3,
    image: imgConversation3,
    dialogues: [
      {
        speaker: "Stella",
        text: "This piano makes such flawless musical sounds.",
      },
      {
        speaker: "Helen",
        text: "Try some more. Play some music you are familiar with.",
      },
      {
        speaker: "Stella",
        text: "By the way, I have a guitar at home.",
      },
      {
        speaker: "Helen",
        text: "Really? I never knew that. Do you know how to play it well?",
      },
      {
        speaker: "Stella",
        text: "Yes! I played it at a summer school play years ago.",
      },
    ],
  },

  {
    number: 4,
    image: imgConversation4,
    dialogues: [
      {
        speaker: "Helen",
        text: "Was the play a success?",
      },
      {
        speaker: "Stella",
        text: "It sure was! Everyone loved it and loved the guitar music.",
      },
      {
        speaker: "Helen",
        text: "That’s great! You should be proud of yourself!",
      },
      {
        speaker: "Stella",
        text: "Thanks! I can give you free guitar lessons if you like.",
      },
      {
        speaker: "Helen",
        text: "That’s sweet. Thank you, but I’ll be happy to hear you play it.",
      },
    ],
  },
];
  const captionsExample = [
    {
      start: 0.319,
      end: 5.259,
      text: "Page 46, Conversation. Listen and read, then say.",
    },
    {
      start: 5.259,
      end: 8.639,
      text: "Is this piano in the living room yours, Helen?",
    },
    {
      start: 8.639,
      end: 13.439,
      text: "It's my mother's piano. She used to play it perfectly when she was a young girl.",
    },
    {
      start: 13.439,
      end: 20.939,
      text: "That sure is something. Your mom seems to be very talented. Does she still play the piano?",
    },
    {
      start: 20.939,
      end: 24.879,
      text: "Yes, she plays it sometimes when we have a family celebration.",
    },
    {
      start: 24.879,
      end: 30.019,
      text: "Wow, I never knew that. That's a good way to make a party entertaining.",
    },
    {
      start: 30.019,
      end: 33.88,
      text: "Speaking of entertainment, why don't we go to the arcade?",
    },
    {
      start: 33.88,
      end: 37.219,
      text: "Playing the piano seems more to my liking.",
    },
    {
      start: 37.219,
      end: 39.919,
      text: "Okay, you can go ahead and play it.",
    },
    {
      start: 39.919,
      end: 45.119,
      text: "This piano makes such flawless musical sounds.",
    },
    {
      start: 45.119,
      end: 49.279,
      text: "Try some more. Play some music you are familiar with.",
    },
    {
      start: 49.279,
      end: 51.419,
      text: "By the way, I have a guitar at home.",
    },
    {
      start: 52.639,
      end: 55.999,
      text: "Really? I never knew that. Do you know how to play it well?",
    },
    {
      start: 57.039,
      end: 60.939,
      text: "Yes. I played it at a summer school play years ago.",
    },
    {
      start: 61.959,
      end: 64.139,
      text: "Was the play a success?",
    },
    {
      start: 64.139,
      end: 68.499,
      text: "It sure was. Everyone loved it, and loved the guitar music.",
    },
    {
      start: 69.559,
      end: 72.919,
      text: "That's great. You should be proud of yourself.",
    },
    {
      start: 72.919,
      end: 77.979,
      text: "Thanks. I can give you free guitar lessons if you like.",
    },
    {
      start: 77.979,
      end: 81.419,
      text: "That's sweet. Thank you, but I'll be happy to hear you play it.",
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
    ],

    [
      captionsExample[9],
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
    ],

    [
      captionsExample[14],
      captionsExample[15],
      captionsExample[16],
      captionsExample[17],
      captionsExample[18],
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

    [
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
    ],

    [
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
      filteredSegments[15]?.words || [],
      filteredSegments[16]?.words || [],
      filteredSegments[17]?.words || [],
    ],
  ];
  /////////////////VOCABULARY/////////////////

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
  {
    start: 8.76,
    end: 10.219,
    text: "1, perfectly.",
  },
  {
    start: 10.659,
    end: 12.38,
    text: "2, talented.",
  },
  {
    start: 12.899,
    end: 14.839,
    text: "3, celebration.",
  },
  {
    start: 15.399,
    end: 17.26,
    text: "4, entertaining.",
  },
  {
    start: 18.0,
    end: 19.619,
    text: "5, flawless.",
  },
  {
    start: 20.199,
    end: 21.859,
    text: "6, familiar.",
  },
  {
    start: 22.559,
    end: 24.26,
    text: "7, summer school.",
  },
  {
    start: 24.659,
    end: 26.639,
    text: "8, success.",
  },
  {
    start: 27.26,
    end: 29.079,
    text: "9, proud.",
  },
  {
    start: 29.619,
    end: 31.239,
    text: "10, lessons.",
  },
  {
    start: 32.099,
    end: 34.759,
    text: "11, that sure is something.",
  },
  {
    start: 35.399,
    end: 37.36,
    text: "12, speaking of.",
  },
  {
    start: 38.0,
    end: 40.279,
    text: "13, to my liking.",
  },
  {
    start: 40.819,
    end: 42.619,
    text: "14, go ahead.",
  },
  {
    start: 43.34,
    end: 45.619,
    text: "15, by the way.",
  },
  {
    start: 46.379,
    end: 48.459,
    text: "16, years ago.",
  },
  ];

  const wordTimingsVoc = [
 
  {
    start: 8.76,
    end: 10.219,
    text: "One, perfectly.",
  },
  {
    start: 10.659,
    end: 12.38,
    text: "Two, talented.",
  },
  {
    start: 12.899,
    end: 14.839,
    text: "Three, celebration.",
  },
  {
    start: 15.399,
    end: 17.26,
    text: "Four, entertaining.",
  },
  {
    start: 18.0,
    end: 19.619,
    text: "Five, flawless.",
  },
  {
    start: 20.199,
    end: 21.859,
    text: "Six, familiar.",
  },
  {
    start: 22.559,
    end: 24.26,
    text: "Seven, summer school.",
  },
  {
    start: 24.659,
    end: 26.639,
    text: "Eight, success.",
  },
  {
    start: 27.26,
    end: 29.079,
    text: "Nine, proud.",
  },
  {
    start: 29.619,
    end: 31.239,
    text: "Ten, lessons.",
  },
  {
    start: 32.099,
    end: 34.759,
    text: "Eleven, that sure is something.",
  },
  {
    start: 35.399,
    end: 37.36,
    text: "Twelve, speaking of.",
  },
  {
    start: 38.0,
    end: 40.279,
    text: "Thirteen, to my liking.",
  },
  {
    start: 40.819,
    end: 42.619,
    text: "Fourteen, go ahead.",
  },
  {
    start: 43.34,
    end: 45.619,
    text: "Fifteen, by the way.",
  },
  {
    start: 46.379,
    end: 48.459,
    text: "Sixteen, years ago.",
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
                  title="Conversation"
                  items={data}
                  sound={longAudio}
                  captions={captionsExample}
                  stopAtSecond={5.259}
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
                  stopAtSecond={7.98}
                  // sounds={sounds}
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
                title={"Does Helen like music? How can you tell?"}
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

export default Unit6_Page1;
