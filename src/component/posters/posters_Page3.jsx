import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_03.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/3.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/4.svg";
import longAudio from "../../assets/audio/ClassBook/U2/PG 10/conversation_p10.mp3";
import video from "../../assets/videos/grade 6 unit 2 page 10.mp4";
import wordJson from "../../assets/json/conversation2_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page3 = ({ openPopup }) => {
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
      text: "It looks so dangerous too! I don't feel comfortable watching.",
    },
    {
      start: 40.959,
      end: 50.86,
      text: "Come along! Let's ask the snowboarder about his experience.Excuse me, would you please tell us how it felt to snowboard?",
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
    [captionsExample[9], captionsExample[10]],
    [
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
      captionsExample[14],
    ],
  ];

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
          text: "He's moving so fast!",
        },
        {
          speaker: "Tom",
          text: "You look so nervous that I'd think you're next.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Harley",
          text: "No, it's just that I'm afraid. I think I would faint.",
        },
        {
          speaker: "Tom",
          text: "Come on, Harley! Where's your sense of adventure?",
        },
        {
          speaker: "Harley",
          text: "I am still not sure I can do it.",
        },
        {
          speaker: "Tom",
          text: "Ha, ha! Look at that snowboarder come down the slope. It looks fun!",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Harley",
          text: "It looks so dangerous too! I don't feel comfortable watching!",
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
          speaker: "Snow-boarder",
          text: "Sure! It felt thrilling! I felt like I was so light and free. But you need to learn how to do it with a professional trainer first.",
        },
        {
          speaker: "Harley",
          text: "Thanks for sharing this with us.",
        },
        {
          speaker: "Snow-boarder",
          text: "No problem!",
        },
        {
          speaker: "Tom",
          text: "Harley, let's go learn snowboarding!",
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
    </div>
  );
};

export default Posters_Page3;