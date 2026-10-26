import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./Unit2_Page2_ComprehensionA";
import ComprehensionB from "./Unit2_Page2_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/Asset 111.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/Asset 29.svg";
import readingAudio from "../../../assets/audio/ClassBook/U2/PG 11/reading_U2.mp3";
import readingTimings from "../../../assets/json/reading_U2_eng.json";

const ReadingSection_U2 = () => {
  const paragraphs = [
    "With the development of technology and free time, people are more and more interested in trying unusual things. Some of these activities are so challenging, and people do them for amusement and fun.",
    "One such activity is mountaineering. Mountaineering is a sport where people climb up to high points of a mountain. It is such a challenging sport, and mountain climbers need to be healthy and fit. Since mountains have different types of surfaces, mountaineers need to carry all types of climbing gear, such as ropes, helmets, and even oxygen tanks!",
    "Surfing is another type of adventure sport that is very popular. In surfing, surfers try to balance themselves while riding an ocean wave. They do this using flat boards, inflatable mats, or even their own body.",
    "All these activities need special care and training. People are advised not to do these activities alone, and to always be with an expert for their safety.",
  ];

  const captions = [
    {
      start: 0.34,
      end: 11.359,
      text: "Page 11 reading. Have you ever seen any adventure sports on TV? Do you think that it is safe to do adventure sports? Have you ever tried to do something unusual?",
    },
    {
      start: 12.439,
      end: 27.319,
      text: "Challenging activities. With the development of technology and free time, people are more and more interested in trying unusual things. Some of these activities are so challenging, and people do them for amusement and fun.",
    },
    {
      start: 28.34,
      end: 40.319,
      text: "One such activity is mountaineering. Mountaineering is a sport where people climb up to high points of a mountain. It is such a challenging sport, and mountain climbers need to be healthy and fit.",
    },
    {
      start: 41.239,
      end: 50.239,
      text: "Since mountains have different types of surfaces, mountaineers need to carry all types of climbing gear, such as ropes, helmets, and even oxygen tanks.",
    },
    {
      start: 51.039,
      end: 65.979,
      text: "Surfing is another type of adventure sport that is very popular. In surfing, surfers try to balance themselves while riding an ocean wave. They do this by using flat boards, inflatable mats, or even their own body.",
    },
    {
      start: 66.08,
      end: 75.339,
      text: "All these activities need special care and training. People are advised not to do these activities alone and to always be with an expert for their safety.",
    },
  ];
  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle="Have you ever seen any adventure sports on TV? Do you think that it is safe to do adventure sports? Have you ever tried to do something unusual?"
        title="Challenging Activities"
        image={imgReading}
        paragraphs={paragraphs}
        question={question}
        pageId="sb_unit2_page11_reading"
        headerTitle="Listen and read along: Challenging Activities."
        subTitle="Press Play and follow the text as it is read; pause or replay any part you need to hear again."
        sound={readingAudio}
        captions={captions}
        imageAlt="A mountaineer climbing a steep snowy mountain and a surfer riding an ocean wave."
        wordTimings={readingTimings}
        timingAliases={[
          {
            printed: ["using"],
            spoken: ["by using"],
          },
        ]}
        stopAtSecond={11.35}
      />

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U2;
