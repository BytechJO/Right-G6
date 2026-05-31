import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./Unit9_Page2_ComprehensionA";
import ComprehensionB from "./Unit9_Page2_ComprehensionB";

import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 1.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 13.svg";

import readingAudio from "../../../assets/audio/ClassBook/U9/PG 77/reading9.mp3";

import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const Unit9_Page2_ReadingSection_U9 = () => {
  const captions = [
    {
      start: 0.159,
      end: 10.779,
      text: "Page 77, reading. Are you very close to your friends? How well do you know them? Are there things that you don't know about them? How well do you know your friends?",
    },

    {
      start: 11.779,
      end: 18.399,
      text: "My friends and I were talking one day at break time, and we discovered that there were a lot of things we didn't know about each other.",
    },

    {
      start: 19.34,
      end: 27.619,
      text: "So when my math teacher assigned us a survey and a chart, I decided to survey my friends to find out which activities they have been doing.",
    },

    {
      start: 28.42,
      end: 32.319,
      text: "I was very interested to read the results and learn more about my friends.",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      {/* Reading Section */}
      <div className="p-6 flex flex-col items-center gap-5 w-full">
        <div className="flex justify-start gap-1 w-[60%]">
          <img
            src={ReadingBG}
            style={{
              height: "60px",
              width: "auto",
            }}
          />
          <h2 className="font-bold text-[18px] text-black">
            Are you very close to your friends? How well do you know them? Are
            there things that you don’t know about them?
          </h2>
        </div>

        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={8.5}
          />
        </div>

        {/* First Image */}
        <div className="w-full flex justify-center mt-5">
          <img
            src={imgReading}
            className="w-[60%] h-auto object-contain rounded-md"
          />
        </div>

        {/* Second Image */}
        <div className="w-[60%] flex justify-center">
          <img
            src={question}
            style={{
              height: "auto",
              width: "60%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Comprehension */}
      <div className="w-[60%] mt-3 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={comprehesion}
            style={{
              height: "60px",
              width: "auto",
            }}
          />
        </div>
      </div>

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />
        <ComprehensionB />
      </div>
    </div>
  );
};

export default Unit9_Page2_ReadingSection_U9;
