import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_01.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 3.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 4.svg";
import longAudio from "../../assets/audio/ClassBook/U1/PG 4/conversation1.mp3";
import video from "../../assets/videos/grade 6 unit 1 page 4.mp4";
import wordJson from "../../assets/json/conversation1_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page1 = ({ openPopup }) => {
  const captionsExample = [
    {
      start: 0.399,
      end: 5.299,
      text: "Page 4, conversation. Listen and read, then say",
    },
    {
      start: 5.299,
      end: 12.219,
      text: "Hi, Helen. Have you bought any school supplies yet? School is going to start in one week.",
    },
    {
      start: 12.219,
      end: 16.699,
      text: "No, I haven't bought any yet. I have been busy lately.",
    },
    {
      start: 16.699,
      end: 18.959,
      text: "What have you done this week?",
    },
    {
      start: 18.959,
      end: 27.459,
      text: "It's been a tough week for me. I have washed all the laundry and taken care of Hansel, too. He has been sick with the flu.",
    },
    {
      start: 27.459,
      end: 31.519,
      text: "I'm sorry to hear that. I hope he feels better soon.",
    },
    {
      start: 31.519,
      end: 35.359,
      text: "Thanks. I hope so, too. It's no fun being sick.",
    },
    {
      start: 35.36,
      end: 39.099,
      text: "You can say that again. Has he seen a doctor?",
    },
    {
      start: 39.099,
      end: 45.939,
      text: "Yes, my mom took him to the doctor twice. All he needs is bed rest. Have you bought any school supplies?",
    },
    {
      start: 45.939,
      end: 58.099,
      text: "Yes, I have. So far, I have bought a pencil case, a set of pencils, a set of erasable pens, some erasers, and some notebooks for each subject.",
    },
    {
      start: 58.099,
      end: 59.979,
      text: "Have you bought a ruler?",
    },
    {
      start: 59.979,
      end: 65.5,
      text: "No, not yet. I forgot about that. I need to get a calculator, too.",
    },
    {
      start: 65.5,
      end: 72.319,
      text: "I will likely go to the school supply store tomorrow. If you like, I could get you all the remaining supplies you need.",
    },
    {
      start: 72.319,
      end: 79.559,
      text: "Terrific, thanks. I know I can always count on you. It will save me a trip to the school supplies store.",
    },
    {
      start: 80.599,
      end: 83.639,
      text: "I'm glad to help. See you in school next week",
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
    ],
    [
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
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
    [captionsExample[9], captionsExample[10], captionsExample[11]],
    [captionsExample[12], captionsExample[13], captionsExample[14]],
  ];

  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Stella",
          text: "Hi, Helen. Have you bought any school supplies yet? School is going to start in one week.",
        },
        {
          speaker: "Helen",
          text: "No, I haven't bought any yet. I have been busy lately.",
        },
        {
          speaker: "Stella",
          text: "What have you done this week?",
        },
        {
          speaker: "Helen",
          text: "It's been a tough week for me. I have washed all the laundry and taken care of Hansel too. He has been sick with the flu.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Stella",
          text: "I'm sorry to hear that! I hope he feels better soon.",
        },
        {
          speaker: "Helen",
          text: "Thanks. I hope so too. It's no fun being sick.",
        },
        {
          speaker: "Stella",
          text: "You can say that again! Has he seen a doctor?",
        },
        {
          speaker: "Helen",
          text: "Yes, my mom took him to the doctor twice. All he needs is bed rest. Have you bought any school supplies?",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Stella",
          text: "Yes, I have. So far, I have bought a pencil case, a set of pencils, a set of erasable pens, some erasers, and some notebooks for each subject.",
        },
        {
          speaker: "Helen",
          text: "Have you bought a ruler?",
        },
        {
          speaker: "Stella",
          text: "No, not yet. I forgot about that. I need to get a calculator too.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Helen",
          text: "I will likely go to the school supplies store tomorrow. If you like, I could get you all the remaining supplies you need.",
        },
        {
          speaker: "Stella",
          text: "Terrific, thanks! I know I can always count on you! It will save me a trip to the school supplies store.",
        },
        {
          speaker: "Helen",
          text: "I'm glad to help. See you in school next week!",
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
                  stopAtSecond={5.12}
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

export default Posters_Page1;