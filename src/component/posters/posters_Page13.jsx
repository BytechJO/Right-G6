import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_13.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 26.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 27.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 28.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 29.svg";
import longAudio from "../../assets/audio/ClassBook/U7/PG 58/conversation7.mp3";
import video from "../../assets/videos/grade 6 unit 7 page 58.mp4";
import wordJson from "../../assets/json/conversation7_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page25 = ({ openPopup }) => {
  const captionsExample = [
    {
      start: 0.319,
      end: 5.319,
      text: "Page 58. Conversation. Listen and read, then say.",
    },
    {
      start: 6.48,
      end: 14.34,
      text: "Hi, Tom. I haven't seen you lately. If you had lived closer to me, I would see you more often. Maybe you don't want to play with me.",
    },
    {
      start: 15.359,
      end: 19.719,
      text: "Don't be silly. It's just that I've been so busy with my new job.",
    },
    {
      start: 19.719,
      end: 26.279,
      text: "Job? What job? It's been too long since I've seen you. I find it hard to catch up.",
    },
    {
      start: 27.439,
      end: 30.859,
      text: "I've been working with my dad. I'm helping him paint the house.",
    },
    {
      start: 31.899,
      end: 34.139,
      text: "I wasn't aware that you could paint.",
    },
    {
      start: 34.139,
      end: 40.599,
      text: "I couldn't previously, but my dad taught me how to paint. He even gave me advice on color combinations.",
    },
    {
      start: 41.739,
      end: 44.159,
      text: "I wish I could help you paint.",
    },
    {
      start: 44.159,
      end: 48.299,
      text: "Well, why not? Come and join us. It's going to be lots of fun.",
    },
    {
      start: 49.479,
      end: 57.52,
      text: "Wow, look at the paint colors. I love your blue background color. It makes the stencils stand out.",
    },
    {
      start: 57.52,
      end: 64.279,
      text: "Yeah, I chose that color. If I had more blue paint, I would have painted the porch blue too.",
    },
    {
      start: 64.279,
      end: 69.899,
      text: "If I had your ability to paint, I'd have painted all the houses of the neighborhood. You're a natural.",
    },
    {
      start: 70.939,
      end: 72.979,
      text: "You flatter me, Jack. Thank you.",
    },
    {
      start: 74.0,
      end: 78.36,
      text: "It's true. Look at the colors. I'd love to learn how to paint like that.",
    },
    {
      start: 79.4,
      end: 90.399,
      text: "Now is your chance. Let's begin. We are going to paint the borders of the windows now. Dip the brush in the paint and paint careful strokes with it, just like I'm doing.",
    },
    {
      start: 91.479,
      end: 94.299,
      text: "You sure make it look easy. Here I go.",
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
    [captionsExample[13], captionsExample[14], captionsExample[15]],
  ];

  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Jack",
          text: "Hi, Tom. I haven't seen you lately. If you had lived closer to me, I would see you more often. Maybe you don't want to play with me. (Jack smiles.)",
        },
        {
          speaker: "Tom",
          text: "Don't be silly! It's just that I've been so busy with my new job.",
        },
        {
          speaker: "Jack",
          text: "Job? What job? It's been too long since I've seen you. I find it hard to catch up.",
        },
        {
          speaker: "Tom",
          text: "I've been working with my dad. I'm helping him paint the house.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Jack",
          text: "I wasn't aware that you could paint.",
        },
        {
          speaker: "Tom",
          text: "I couldn't previously, but my dad taught me how to paint. He even gave me advice on color combinations.",
        },
        {
          speaker: "Jack",
          text: "I wish I could help you paint.",
        },
        {
          speaker: "Tom",
          text: "Well, why not? Come and join us. It's going to be lots of fun.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Jack",
          text: "(inside Tom's house) Wow! Look at the paint colors. I love your blue background color. It makes the stencils stand out.",
        },
        {
          speaker: "Tom",
          text: "Yeah, I chose that color. If I had more blue paint, I would have painted the porch blue too.",
        },
        {
          speaker: "Jack",
          text: "If I had your ability to paint, I'd have painted all the houses of the neighborhood! You're a natural!",
        },
        {
          speaker: "Tom",
          text: "You flatter me, Jack. Thank you.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Jack",
          text: "It's true. Look at the colors. I'd love to learn how to paint like that.",
        },
        {
          speaker: "Tom",
          text: "Now is your chance. Let's begin! (giving Jack a paintbrush) We are going to paint the borders of the windows now. Dip the brush in the paint and paint careful strokes with it, just like I'm doing.",
        },
        {
          speaker: "Jack",
          text: "You sure make it look easy. Here I go.",
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
                  stopAtSecond={5.8}
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

export default Posters_Page25;