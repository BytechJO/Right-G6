import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_17.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 14.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 10.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 15.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 12.svg";
import longAudio from "../../assets/audio/ClassBook/U9/PG 76/conversation9.mp3";
import video from "../../assets/videos/grade 6 unit 9 page 76.mp4";
import wordJson from "../../assets/json/conversation9_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page17 = ({ openPopup }) => {
  const captionsExample = [
    {
      start: 0.299,
      end: 5.859,
      text: "Page 76, Conversation. Listen and read, then say.",
    },
    {
      start: 5.859,
      end: 11.299,
      text: "Hey, Harley. Have you been reading the new novel that was assigned in English class?",
    },
    {
      start: 11.3,
      end: 15.759,
      text: "Yes, I have. I've been enjoying it. I'm on chapter ten.",
    },
    {
      start: 15.759,
      end: 21.019,
      text: "I've been planning to finish it, but it is too long. I'm on chapter twelve.",
    },
    {
      start: 21.02,
      end: 25.519,
      text: "You'll finish in no time. You only have three more to go.",
    },
    {
      start: 25.519,
      end: 28.399,
      text: "What is your favorite part of the novel so far?",
    },
    {
      start: 28.399,
      end: 33.899,
      text: "I love how the main characters are all helping each other to solve the mystery.",
    },
    {
      start: 33.899,
      end: 39.479,
      text: "Yeah, and I've been dying to find out who broke the window in the living room in the novel.",
    },
    {
      start: 39.479,
      end: 41.219,
      text: "Did you find out yet?",
    },
    {
      start: 41.219,
      end: 45.439,
      text: "No. It seems that we won't find out until the last chapter.",
    },
    {
      start: 45.439,
      end: 49.419,
      text: "Too bad. I guess I have to try reading faster.",
    },
    {
      start: 49.419,
      end: 52.019,
      text: "So what are your plans for tomorrow?",
    },
    {
      start: 52.02,
      end: 55.18,
      text: "I don't know. Perhaps I should finish the novel.",
    },
    {
      start: 55.18,
      end: 59.299,
      text: "Why don't we go out and discuss the novel with our other classmates?",
    },
    {
      start: 59.299,
      end: 63.0,
      text: "We can do that in school. Let's do something fun.",
    },
    {
      start: 63.0,
      end: 67.36,
      text: "Let's watch a fun movie. It might distract you from thinking too much about the novel.",
    },
    {
      start: 68.439,
      end: 71.739,
      text: "Okay, but no mystery movies.",
    },
    {
      start: 71.739,
      end: 72.899,
      text: "Ha, ha! It's a deal.",
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
    ],
    [
      filteredSegments[7]?.words || [],
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
    ],
    [
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
      filteredSegments[15]?.words || [],
      filteredSegments[16]?.words || [],
    ],
  ];

  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
    ],
    [captionsExample[5], captionsExample[6], captionsExample[7]],
    [
      captionsExample[8],
      captionsExample[9],
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
    ],
    [
      captionsExample[13],
      captionsExample[14],
      captionsExample[15],
      captionsExample[16],
      captionsExample[17],
    ],
  ];

  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Tom",
          text: "Hey, Harley. Have you been reading the new novel that was assigned in English class?",
        },
        {
          speaker: "Harley",
          text: "Yes, I have. I've been enjoying it. I'm on chapter ten.",
        },
        {
          speaker: "Tom",
          text: "I've been planning to finish it, but it is too long. I'm on chapter twelve.",
        },
        {
          speaker: "Harley",
          text: "You'll finish in no time. You only have three more to go.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Tom",
          text: "What is your favorite part of the novel so far?",
        },
        {
          speaker: "Harley",
          text: "I love how the main characters are all helping each other to solve the mystery.",
        },
        {
          speaker: "Tom",
          text: "Yeah, and I've been dying to find out who broke the window in the living room in the novel.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Harley",
          text: "Did you find out yet?",
        },
        {
          speaker: "Tom",
          text: "No. It seems that we won't find out until the last chapter.",
        },
        {
          speaker: "Harley",
          text: "Too bad! I guess I have to try reading faster.",
        },
        {
          speaker: "Tom",
          text: "So, what are your plans for tomorrow?",
        },
        {
          speaker: "Harley",
          text: "I don't know. Perhaps, I should finish the novel.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Tom",
          text: "Why don't we go out and discuss the novel with our other classmates?",
        },
        {
          speaker: "Harley",
          text: "We can do that in school. Let's do something fun.",
        },
        {
          speaker: "Tom",
          text: "Let's watch a fun movie. It might distract you from thinking too much about the novel.",
        },
        {
          speaker: "Harley",
          text: "Okay, but no mystery movies!",
        },
        {
          speaker: "Tom",
          text: "Ha, ha! It's a deal.",
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
        className="headset-icon-CD-page17-p hover:scale-110 transition"
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
                  stopAtSecond={5}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
                  imageWidth="300px"
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

export default Posters_Page17;