import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_19.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 2.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 3.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 6.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 7.svg";
import longAudio from "../../assets/audio/ClassBook/U10/PG 82/conversation10.mp3";
import video from "../../assets/videos/grade 6 unit 10 page 82.mp4";
import wordJson from "../../assets/json/conversation10_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page19 = ({ openPopup }) => {
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
          text: "That's fine with me. When would you like to go?",
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
          text: "Make sure you put on lots of sunscreen. We don't want anyone to get a sunburn.",
        },
        {
          speaker: "Stella",
          text: "Look at the beach. You were right, Helen. There aren't many people here at this time.",
        },
        {
          speaker: "Helen",
          text: "Look at the seashells! I'm going to collect dozens of them.",
        },
        {
          speaker: "Sarah",
          text: "I want seashells, too! I'll help you pick them up.",
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
          text: "Okay, Stella. I don't mind waiting for you. I love building sandcastles.",
        },
        {
          speaker: "Helen",
          text: "I'm so glad that the beach is close by.",
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
          text: "There are lots of them over there. Let's go and rent two of them.",
        },
        {
          speaker: "Sarah",
          text: "Have fun!",
        },
        {
          speaker: "Stella",
          text: "We will! Come on, Helen. Let's surf!",
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
        className="headset-icon-CD-page1-p hover:scale-110 transition"
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
    </div>
  );
};

export default Posters_Page19;