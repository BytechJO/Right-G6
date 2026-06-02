import React from "react";
import page_1 from "../../assets/imgs/pages/G6 Poster/Poster_Page_15.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 3.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 7.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 6.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 4.svg";
import longAudio from "../../assets/audio/ClassBook/U8/PG 64/conversation8.mp3";
import video from "../../assets/videos/grade 6 unit 8 page 64.mp4";
import wordJson from "../../assets/json/conversation8_eng.json";
import Conversation from "../Conversation";
import "./posters.css";

const Posters_Page27 = ({ openPopup }) => {
  const captionsExample = [
    {
      start: 0.159,
      end: 4.92,
      text: "Page 64, Conversation. Listen and read, then say.",
    },
    {
      start: 6.019,
      end: 9.079,
      text: "I love this store. I haven't been here in ages.",
    },
    {
      start: 10.099,
      end: 19.779,
      text: "Look at this great pen. It glows in the dark. That would be good for my nighttime writing. I wouldn't need a table lamp anymore.",
    },
    {
      start: 19.779,
      end: 28.459,
      text: "Look what I found! A flying helicopter! All I have to do is use this wireless remote control to make it fly.",
    },
    {
      start: 28.459,
      end: 32.059,
      text: "Hi! Here you are! Tom told me that I'd find you here!",
    },
    {
      start: 33.099,
      end: 39.559,
      text: "Hi! Yeah, we told Tom that we would be here today. He didn't tell us that you'd show up!",
    },
    {
      start: 39.559,
      end: 44.139,
      text: "Well, that's because he didn't know. I wanted to surprise you all.",
    },
    {
      start: 44.139,
      end: 47.18,
      text: "What do you think of this little gadget, Stella?",
    },
    {
      start: 47.18,
      end: 50.639,
      text: "It looks peculiar. What is it?",
    },
    {
      start: 50.639,
      end: 57.259,
      text: "It's a new kind of can opener. It isn't electric, though. Here's a timer also. That would come in handy.",
    },
    {
      start: 58.579,
      end: 64.999,
      text: "Wow, look at this! It's a notebook that looks like a piano. It's great for someone who likes music.",
    },
    {
      start: 66.119,
      end: 68.599,
      text: "That would be nice to use in school or at home.",
    },
    {
      start: 69.659,
      end: 72.279,
      text: "Yes, and there's a memo holder here, too.",
    },
    {
      start: 73.439,
      end: 83.979,
      text: "I want this! I can read storybooks on this tablet. It will read the words or sentences. All you have to do is point to where you want it to read.",
    },
    {
      start: 83.979,
      end: 87.879,
      text: "That would help you a great deal to practice your reading skills.",
    },
    {
      start: 87.879,
      end: 89.599,
      text: "This store sure is great!",
    },
  ];

  const filteredSegments = wordJson.segments.slice(1);
  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
    ],
    [
      filteredSegments[3]?.words || [],
      filteredSegments[4]?.words || [],
      filteredSegments[5]?.words || [],
    ],
    [
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
  ];

  const captionTimings = [
    [captionsExample[1], captionsExample[2], captionsExample[3]],
    [captionsExample[4], captionsExample[5], captionsExample[6]],
    [
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
  ];

  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Harley",
          text: "I love this store. I haven't been here in ages!",
        },
        {
          speaker: "Helen",
          text: "Look at this great pen. It glows in the dark. That would be good for my nighttime writing. I wouldn't need a table lamp anymore!",
        },
        {
          speaker: "Hansel",
          text: "Look what I found! A flying helicopter! All I have to do is use this wireless remote control to make it fly.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Stella",
          text: "Hi! Here you are! Tom told me that I'd find you here!",
        },
        {
          speaker: "Helen",
          text: "Hi! Yeah, we told Tom that we would be here today. He didn't tell us that you'd show up!",
        },
        {
          speaker: "Stella",
          text: "Well, that's because he didn't know. I wanted to surprise you all.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Harley",
          text: "What do you think of this little gadget, Stella?",
        },
        {
          speaker: "Stella",
          text: "It looks peculiar. What is it?",
        },
        {
          speaker: "Harley",
          text: "It's a new kind of can opener. It isn't electric, though. Here's a timer also. That would come in handy.",
        },
        {
          speaker: "Stella",
          text: "Wow, look at this! It's a notebook that looks like a piano. It's great for someone who likes music.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Helen",
          text: "That would be nice to use in school or at home.",
        },
        {
          speaker: "Stella",
          text: "Yes, and there's a memo holder here, too.",
        },
        {
          speaker: "Helen",
          text: "I want this! I can read storybooks on this tablet. It will read the words or sentences. All you have to do is point to where you want it to read.",
        },
        {
          speaker: "Helen",
          text: "That would help you a great deal to practice your reading skills.",
        },
        {
          speaker: "Stella",
          text: "This store sure is great!",
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
        className="headset-icon-CD-page15-p hover:scale-110 transition"
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
                  stopAtSecond={4.9}
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

export default Posters_Page27;