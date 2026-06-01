import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_09.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 11.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 12.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 13.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 14.svg";
import longAudio from "../../assets/audio/ClassBook/U5/PG 40/cd21pg40-conversation.mp3";
import video from "../../assets/videos/grade 6 unit 1 page 4.mp4";
import wordJson from "../../assets/json/cd21pg40-conversation_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page21 = ({ openPopup }) => {
  const captionsExample = [
    {
      start: 0.219,
      end: 4.299,
      text: "Page 40, conversation. Listen and read, then say",
    },
    {
      start: 5.319,
      end: 9.559,
      text: "Harley, let's go to the library and find some fun books to read.",
    },
    {
      start: 9.559,
      end: 11.699,
      text: "You're a bookworm, aren't you?",
    },
    {
      start: 11.699,
      end: 17.079,
      text: "Not really, but I haven't read in a while. You love science fiction stories, don't you?",
    },
    {
      start: 17.079,
      end: 21.039,
      text: "Yes, I guess we could go to the library after all.",
    },
    {
      start: 21.039,
      end: 26.879,
      text: "Look what I found. This is a book about outer space. You would like it, wouldn't you?",
    },
    {
      start: 26.879,
      end: 31.379,
      text: "Let me see. I suppose you're right. It looks interesting, doesn't it?",
    },
    {
      start: 31.379,
      end: 36.159,
      text: "It sure does. It suits your taste. You'll take it, won't you?",
    },
    {
      start: 36.159,
      end: 37.639,
      text: "If you say so, boss.",
    },
    {
      start: 38.7,
      end: 45.239,
      text: "Wow, I'm finding such great mystery books. They'll keep me busy for quite some time.",
    },
    {
      start: 45.239,
      end: 48.479,
      text: "You love mystery books, don't you?",
    },
    {
      start: 48.479,
      end: 52.719,
      text: "I sure do. They keep your brain and imagination active.",
    },
    {
      start: 52.719,
      end: 56.659,
      text: "You're trying to persuade me to get mystery books, aren't you?",
    },
    {
      start: 56.659,
      end: 63.759,
      text: "No, that's not what I intended. You could even choose a comedy book if you like. I'm just giving you my opinion.",
    },
    {
      start: 63.759,
      end: 71.619,
      text: "I'll stick to the science fiction books for now. Perhaps I can try reading some mystery or comedy books later.",
    },
    {
      start: 71.619,
      end: 75.059,
      text: "Suit yourself. Did you find all the books you need?",
    },
    {
      start: 75.059,
      end: 77.279,
      text: "Yes, I'm ready to go whenever you are.",
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
    ],
    [
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
      filteredSegments[15]?.words || [],
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
    ],
    [
      captionsExample[13],
      captionsExample[14],
      captionsExample[15],
      captionsExample[16],
    ],
  ];

  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Tom",
          text: "Harley, let's go to the library and find some fun books to read.",
        },
        {
          speaker: "Harley",
          text: "You're a bookworm, aren't you?",
        },
        {
          speaker: "Tom",
          text: "Not really, but I haven't read in a while. You love science fiction stories, don't you?",
        },
        {
          speaker: "Harley",
          text: "Yes. I guess we could go to the library after all.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Tom",
          text: "Look what I found! This is a book about outer space. You would like it, wouldn't you?",
        },
        {
          speaker: "Harley",
          text: "Let me see. I suppose you're right. It looks interesting, doesn't it?",
        },
        {
          speaker: "Tom",
          text: "It sure does. It suits your taste. You'll take it, won't you?",
        },
        {
          speaker: "Harley",
          text: "If you say so, boss.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Tom",
          text: "Wow! I'm finding such great mystery books. They'll keep me busy for quite some time.",
        },
        {
          speaker: "Harley",
          text: "You love mystery books, don't you?",
        },
        {
          speaker: "Tom",
          text: "I sure do! They keep your brain and imagination active.",
        },
        {
          speaker: "Harley",
          text: "You're trying to persuade me to get mystery books, aren't you?",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Tom",
          text: "No, that's not what I intended. You could even choose a comedy book if you like. I'm just giving you my opinion.",
        },
        {
          speaker: "Harley",
          text: "I'll stick to the science fiction books for now. Perhaps I can try reading some mystery or comedy books later.",
        },
        {
          speaker: "Tom",
          text: "Suit yourself. Did you find all the books you need?",
        },
        {
          speaker: "Harley",
          text: "Yes. I'm ready to go whenever you are.",
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
                  title="Conversation"
                  items={data}
                  sound={longAudio}
                  captions={captionsExample}
                  stopAtSecond={4.299}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
                  imageWidth="270px"
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

export default Posters_Page21;