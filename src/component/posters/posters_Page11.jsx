import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_11.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 5.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 6.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 9.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 12.svg";
import longAudio from "../../assets/audio/ClassBook/U6/PG 46/cd26pg46-conversation.mp3";
import video from "../../assets/videos/grade 6 unit 2 page 10.mp4";
import wordJson from "../../assets/json/cd26pg46-conversation_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page23 = ({ openPopup }) => {
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
          text: "It's my mother's piano. She used to play it perfectly when she was a young girl.",
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
          text: "Wow! I never knew that! That's a good way to make a party entertaining.",
        },
        {
          speaker: "Helen",
          text: "Speaking of entertainment, why don't we go to the arcade?",
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
          text: "That's great! You should be proud of yourself!",
        },
        {
          speaker: "Stella",
          text: "Thanks! I can give you free guitar lessons if you like.",
        },
        {
          speaker: "Helen",
          text: "That's sweet. Thank you, but I'll be happy to hear you play it.",
        },
      ],
    },
  ];

  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page11-p hover:scale-110 transition"
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
    </div>
  );
};

export default Posters_Page23;