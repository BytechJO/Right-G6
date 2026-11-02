import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/Page 22.png";
import "./Unit3_Page1.css";

import longAudio from "../../../assets/audio/ClassBook/U3/PG 22/pg22-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U3/PG 22/vocab.mp3";

import CriticalThinking from "../../CriticalThinking";

import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/1.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/2.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/3.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/4.svg";

import wordJson from "../../../assets/json/pg22-conversation_eng.json";
import video from "../../../assets/videos/grade 6 unit 3 page 22.mp4";

const Unit3_Page1 = ({ openPopup }) => {
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Tom",
          text: "I’m exhausted and thirsty. If I drank some water,I wouldn’t be so tired.",
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
          text: "Oh, look. There’s a fast food restaurant right there.",
        },
        {
          speaker: "Tom",
          text: "I don’t think so! I don’t like fast foods.",
        },
        {
          speaker: "Stella",
          text: "I would have brought some food if I knew you’d be hungry. We had lots of leftovers from lunch.",
        },
        {
          speaker: "Tom",
          text: "Thanks, Stella, but I think I found what I’m looking for. Do you see that diner over there, Harley?",
        },
        {
          speaker: "Harley",
          text: "Yeah, it looks acceptable. Let’s take a look. (They reach the diner.)",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Tom",
          text: "OK, here’s the menu. I’ll try the fried liver.",
        },
        {
          speaker: "Stella",
          text: "If I were you, I wouldn’t eat that. I’d eat mashed potatoes.",
        },
        {
          speaker: "Helen",
          text: "It’s too late. He’s already ordering.",
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
          text: "Water, please. We’re not hungry. We just want to unwind.",
        },
        {
          speaker: "Waiter",
          text: "Your food will be ready in five minutes. (After five minutes, Tom is eating the fried liver.)",
        },
        {
          speaker: "Tom",
          text: "Yummy! It tastes great. I wouldn’t mind if you all tried some.",
        },
        {
          speaker: "Helen",
          text: "Thanks for your offer, but I’ll pass.",
        },
        {
          speaker: "Stella and Harley",
          text: "No, thanks!",
        },
      ],
    },
  ];

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

  const captionVoc = [
    {
      start: 0.2,
      end: 8.7,
      text: "Page 22, unit three vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },
    { start: 8.7, end: 10.78, text: "1. exhausted." },
    { start: 10.78, end: 13.14, text: "2. fast foods." },
    { start: 13.14, end: 15.58, text: "3. leftovers." },
    { start: 15.58, end: 17.62, text: "4. dinner." },
    { start: 17.62, end: 20.06, text: "5. acceptable." },
    { start: 20.06, end: 22.3, text: "6. liver." },
    { start: 22.3, end: 24.38, text: "7. offer." },
    { start: 24.38, end: 27.44, text: "8. mashed potatoes." },
    { start: 27.44, end: 29.92, text: "9. unwind." },
    { start: 29.92, end: 33.16, text: "10. I don't think so." },
    { start: 33.16, end: 36.2, text: "11. let's take a look." },
    { start: 36.2, end: 38.88, text: "12. if I were you." },
    { start: 38.88, end: 41.82, text: "13. it's too late." },
    { start: 41.82, end: 45.04, text: "14. I wouldn't mind." },
    { start: 45.04, end: 47.06, text: "15. I'll pass." },
  ];

  const wordTimingsVoc = [
    { start: 8.7, end: 10.22, text: "1. exhausted." },
    { start: 10.78, end: 12.54, text: "2. fast foods." },
    { start: 13.14, end: 14.92, text: "3. leftovers." },
    { start: 15.58, end: 17.0, text: "4. dinner." },
    { start: 17.62, end: 19.4, text: "5. acceptable." },
    { start: 20.06, end: 21.76, text: "6. liver." },
    { start: 22.3, end: 23.96, text: "7. offer." },
    { start: 24.38, end: 26.38, text: "8. mashed potatoes." },
    { start: 27.44, end: 29.2, text: "9. unwind." },
    { start: 29.92, end: 32.24, text: "10. I don't think so." },
    { start: 33.16, end: 35.3, text: "11. let's take a look." },
    { start: 36.2, end: 38.3, text: "12. if I were you." },
    { start: 38.88, end: 41.18, text: "13. it's too late." },
    { start: 41.82, end: 44.22, text: "14. I wouldn't mind." },
    { start: 45.04, end: 47.06, text: "15. I'll pass." },
  ];

  const handleKeyDown = (event, action) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        action();
      }
    }
  };

  const openConversation = () => {
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
          pageId="sb_unit3_page22_conversation"
          captionTimings={captionTimings}
          wordTimings={Voc}
          openPopup={openPopup}
          video={video}
          keyboardAccessible={true}
        />
      </div>,
    );
  };

  const openVocabulary = () => {
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
          stopAtSecond={8.2}
          pageId="sb_unit3_page22_vocab"
          wordTimings={wordTimingsVoc}
          keyboardAccessible={true}
          words={[
            "exhausted",
            "fast foods",
            "leftovers",
            "diner",
            "acceptable",
            "liver",
            "offer",
            "mashed potatoes",
            "unwind",
            "I don’t think so!",
            "Let’s take a look.",
            "If I were you, ...",
            "It’s too late.",
            "I wouldn’t mind ...",
            "I’ll pass.",
          ]}
        />
      </div>,
    );
  };

  const openCriticalThinking = () => {
    openPopup(
      "html",
      <CriticalThinking title="Why didn’t Helen, Stella, and Harley want to try some of Tom’s food?" />,
    );
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      {/* Conversation */}
      <div
        className="headset-icon-CD-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open conversation"
          onClick={openConversation}
          onKeyDown={(event) => handleKeyDown(event, openConversation)}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
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

      {/* Vocabulary */}
      <div
        className="headset-icon-CD-page4-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open vocabulary"
          onClick={openVocabulary}
          onKeyDown={(event) => handleKeyDown(event, openVocabulary)}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
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

      {/* Critical Thinking */}
      <div
        className="headset-icon-CD-page4-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open critical thinking activity"
          onClick={openCriticalThinking}
          onKeyDown={(event) => handleKeyDown(event, openCriticalThinking)}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
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
  );
};

export default Unit3_Page1;
