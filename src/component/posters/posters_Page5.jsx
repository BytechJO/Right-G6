import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_05.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/3.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/4.svg";
import longAudio from "../../assets/audio/ClassBook/U3/PG 22/pg22-conversation.mp3";
import video from "../../assets/videos/grade 6 unit 3 page 22.mp4";
import wordJson from "../../assets/json/pg22-conversation_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page5 = ({ openPopup }) => {
  const captionsExample = [
    {
      start: 0.399,
      end: 5.42,
      text: "Page 22, conversation. Listen and read, then say",
    },
    {
      start: 6.519,
      end: 12.259,
      text: "I'm exhausted and thirsty. If I drank some water, I wouldn't be so tired.",
    },
    {
      start: 13.38,
      end: 17.719,
      text: "If we walked a little faster, we would be close to a restaurant by now.",
    },
    {
      start: 17.719,
      end: 22.0,
      text: "Oh, look, there's a fast food restaurant right there. I don't think so.",
    },
    {
      start: 22.0,
      end: 24.959,
      text: "I don't like fast foods.",
    },
    {
      start: 24.959,
      end: 31.739,
      text: "I would have brought some food if I knew you'd be hungry. We had lots of leftovers from lunch.",
    },
    {
      start: 31.739,
      end: 39.019,
      text: "Thanks, Stella. But I think I found what I'm looking for. Do you see that diner over there, Harley?",
    },
    {
      start: 39.02,
      end: 43.319,
      text: "Yeah, it looks acceptable. Let's take a look.",
    },
    {
      start: 43.319,
      end: 48.059,
      text: "Okay, here's the menu. I'll try the fried liver.",
    },
    {
      start: 48.059,
      end: 53.199,
      text: "If I were you, I wouldn't eat that. I'd eat mashed potatoes.",
    },
    {
      start: 53.199,
      end: 56.339,
      text: "It's too late. He's already ordering.",
    },
    {
      start: 56.34,
      end: 62.379,
      text: "Okay, one plate of fried livers and one bottle of water. What would the rest of you like to order?",
    },
    {
      start: 62.379,
      end: 66.819,
      text: "Water, please. We're not hungry. We just want to unwind.",
    },
    {
      start: 66.819,
      end: 71.839,
      text: "Your food will be ready in five minutes. After five minutes, Tom is eating the fried liver.",
    },
    {
      start: 72.86,
      end: 77.72,
      text: "Yummy. It tastes great. I wouldn't mind if you all tried some.",
    },
    {
      start: 77.72,
      end: 80.319,
      text: "Thanks for your offer, but I'll pass.",
    },
    {
      start: 81.439,
      end: 83.5,
      text: "No, thanks.",
    },
  ];

  const filteredSegments = wordJson.segments.slice(1);
  const Voc = [
    [filteredSegments[0]?.words || []],
    [
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
      filteredSegments[3]?.words || [],
      filteredSegments[4]?.words || [],
      filteredSegments[5]?.words || [],
      filteredSegments[6]?.words || [],
    ],
    [
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
      filteredSegments[15]?.words || [],
    ],
  ];

  const captionTimings = [
    [captionsExample[1]],
    [
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
      captionsExample[5],
      captionsExample[6],
      captionsExample[7],
    ],
    [captionsExample[8], captionsExample[9], captionsExample[10]],
    [
      captionsExample[11],
      captionsExample[12],
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
          text: "I'm exhausted and thirsty. If I drank some water, I wouldn't be so tired.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Helen",
          text: "If we walked a little faster, we would be close to a restaurant by now.",
        },
        {
          speaker: "Harley",
          text: "Oh, look. There's a fast food restaurant right there.",
        },
        {
          speaker: "Tom",
          text: "I don't think so! I don't like fast foods.",
        },
        {
          speaker: "Stella",
          text: "I would have brought some food if I knew you'd be hungry. We had lots of leftovers from lunch.",
        },
        {
          speaker: "Tom",
          text: "Thanks, Stella, but I think I found what I'm looking for. Do you see that diner over there, Harley?",
        },
        {
          speaker: "Harley",
          text: "Yeah, it looks acceptable. Let's take a look. (They reach the diner.)",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Tom",
          text: "OK, here's the menu. I'll try the fried liver.",
        },
        {
          speaker: "Stella",
          text: "If I were you, I wouldn't eat that. I'd eat mashed potatoes.",
        },
        {
          speaker: "Helen",
          text: "It's too late. He's already ordering.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Waiter",
          text: "OK, one plate of fried livers and one bottle of water. What would the rest of you like to order?",
        },
        {
          speaker: "Stella",
          text: "Water, please. We're not hungry. We just want to unwind.",
        },
        {
          speaker: "Waiter",
          text: "Your food will be ready in five minutes. (After five minutes, Tom is eating the fried liver.)",
        },
        {
          speaker: "Tom",
          text: "Yummy! It tastes great. I wouldn't mind if you all tried some.",
        },
        {
          speaker: "Helen",
          text: "Thanks for your offer, but I'll pass.",
        },
        {
          speaker: "Stella and Harley",
          text: "No, thanks!",
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
                  stopAtSecond={5.42}
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

export default Posters_Page5;