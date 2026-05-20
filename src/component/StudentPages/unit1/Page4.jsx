import page4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/Page4.png";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 1.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 2.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 3.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 4.svg";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import longAudio from "../../../assets/audio/ClassBook/U1/PG 4/conversation1.mp3";
import "./Page4.css";
import Conversation from "../../Conversation";
import wordJson from "../../../assets/json/conversation1_eng.json";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U1/PG 4/Pg4_Vocab1_Adult Lady.mp3";
import sound1 from "../../../assets/audio/ClassBook/U1/PG 4/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U1/PG 4/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U1/PG 4/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U1/PG 4/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U1/PG 4/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U1/PG 4/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U1/PG 4/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U1/PG 4/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U1/PG 4/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U1/PG 4/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U1/PG 4/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U1/PG 4/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U1/PG 4/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U1/PG 4/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U1/PG 4/sound15.mp3";
import sound16 from "../../../assets/audio/ClassBook/U1/PG 4/sound16.mp3";
import CriticalThinking from "../../CriticalThinking";
import video from "../../../assets/videos/grade 6 unit 1 page 4.mp4";

const Page4 = ({ openPopup }) => {
  const sounds = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
    sound13,
    sound14,
    sound15,
    sound16,
  ];
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
          text: "No, I haven’t bought any yet. I have been busy lately.",
        },
        {
          speaker: "Stella",
          text: "What have you done this week?",
        },
        {
          speaker: "Helen",
          text: "It’s been a tough week for me. I have washed all the laundry and taken care of Hansel too. He has been sick with the flu.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Stella",
          text: "I’m sorry to hear that! I hope he feels better soon.",
        },
        {
          speaker: "Helen",
          text: "Thanks. I hope so too. It’s no fun being sick.",
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
          text: "I’m glad to help. See you in school next week!",
        },
      ],
    },
  ];
  const wordTimingsVoc = [
    { start: 7.539, end: 9.279, text: "1. supplies." },
    { start: 9.76, end: 11.279, text: "2. lately." },
    { start: 11.859, end: 13.359, text: "3. tough." },
    { start: 14.119, end: 16.02, text: "4. bed rest." },

    { start: 16.859, end: 18.479, text: "5. a set." },
    { start: 19.199, end: 21.039, text: "6. subject." },
    { start: 21.6, end: 23.399, text: "7. calculator." },
    { start: 23.939, end: 25.599, text: "8. remaining." },

    { start: 26.619, end: 28.439, text: "9. likely." },
    { start: 29.0, end: 30.739, text: "10. terrific." },
    { start: 31.459, end: 33.799, text: "11. I'm sorry to hear that." },
    { start: 34.639, end: 36.819, text: "12. it's no fun." },

    { start: 37.639, end: 40.079, text: "13. you can say that again." },
    { start: 40.739, end: 42.859, text: "14. count on you." },
    { start: 43.7, end: 45.939, text: "15. save me a trip." },
  ];

  const captionVoc = [
    {
      start: 0.239,
      end: 7.059,
      text: "Page 4, unit 1 vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },

    { start: 7.539, end: 9.279, text: "1. supplies." },
    { start: 9.76, end: 11.279, text: "2. lately." },
    { start: 11.859, end: 13.359, text: "3. tough." },
    { start: 14.119, end: 16.02, text: "4. bed rest." },

    { start: 16.859, end: 18.479, text: "5. a set." },
    { start: 19.199, end: 21.039, text: "6. subject." },
    { start: 21.6, end: 23.399, text: "7. calculator." },
    { start: 23.939, end: 25.599, text: "8. remaining." },

    { start: 26.619, end: 28.439, text: "9. likely." },
    { start: 29.0, end: 30.739, text: "10. terrific." },
    { start: 31.459, end: 33.799, text: "11. I'm sorry to hear that." },
    { start: 34.639, end: 36.819, text: "12. it's no fun." },

    { start: 37.639, end: 40.079, text: "13. you can say that again." },
    { start: 40.739, end: 42.859, text: "14. count on you." },
    { start: 43.7, end: 45.939, text: "15. save me a trip." },
  ];
  return (
    <>
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page4})` }}
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
                    stopAtSecond={7.059}
                    sounds={sounds}
                    wordTimings={wordTimingsVoc}
                    words={[
                      "supplies",
                      "lately",
                      "tough",
                      "bed rest",
                      "a set",
                      "subject",
                      "calculator",
                      "remaining",
                      "likely",
                      "terrific",
                      "I’m sorry to hear that!",
                      "It’s no fun ....",
                      "You can say that again!",
                      "count on you",
                      "save me a trip",
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
                  title={
                    "What will Helen probably get at the school supplies store?"
                  }
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
    </>
  );
};

export default Page4;
