import { useState } from "react";
import ComprehensionA from "./Unit9_Page2_ComprehensionA";
import ComprehensionB from "./Unit9_Page2_ComprehensionB";

import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 1.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 13.svg";

import readingAudio from "../../../assets/audio/ClassBook/U9/PG 77/reading9.mp3";

import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";
import readingTimings from "../../../assets/json/reading9_eng.json";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import { useReadingHighlight } from "../../useReadingHighlight";
import ExerciseHeader from "../../ExerciseHeader";

const Unit9_Page2_ReadingSection_U9 = () => {
  const [narrationTime, setNarrationTime] = useState(0);
  const { highlight, onTimeUpdate } = useReadingHighlight(
    readingTimings,
    [],
    true,
  );
  const updateNarrationTime = (time) => {
    onTimeUpdate(time);
    setNarrationTime(time);
  };

  const activePassage =
    narrationTime >= 11.76 && narrationTime < 18.4
      ? 0
      : narrationTime >= 19.34 && narrationTime < 27.62
        ? 1
        : narrationTime >= 28.42 && narrationTime < 32.32
          ? 2
          : -1;
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
        <div className="w-[60%]">
          <ExerciseHeader
            title="Listen and read along: How Well Do You Know Your Friends?"
            subTitle="Press Play and follow the text as it is read; pause or replay any part you need to hear again."
          />
        </div>
        <div className="flex justify-start gap-1 w-[60%]">
          <img
            src={ReadingBG}
            alt="Reading section"
            style={{
              height: "60px",
              width: "auto",
            }}
          />
          <h2 className="font-bold text-[18px] text-black">
            {highlight(
              "Are you very close to your friends? How well do you know them? Are there things that you don’t know about them?",
            )}
          </h2>
        </div>

        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={10.76}
            pageId="sb_unit9_page77_reading"
            onTimeUpdate={updateNarrationTime}
          />
        </div>
        <div className="flex justify-center items-center relative w-full mt-5">
          <div style={{ position: "relative", width: "60%" }}>
            <img
              src={imgReading}
              alt="Survey chart showing which activities a group of friends have been doing"
              style={{ height: "auto", width: "100%", display: "block" }}
              className="object-contain rounded-md"
            />
            <svg
              viewBox="0 0 538.19 352.04"
              aria-hidden="true"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                mixBlendMode: "multiply",
              }}
            >
              {activePassage === 0 && (
                <>
                  <rect
                    x="25"
                    y="38"
                    width="500"
                    height="13"
                    rx="2"
                    fill="#b6ce8c"
                    fillOpacity="0.62"
                  />
                  <rect
                    x="13"
                    y="53"
                    width="164"
                    height="13"
                    rx="2"
                    fill="#b6ce8c"
                    fillOpacity="0.62"
                  />
                </>
              )}
              {activePassage === 1 && (
                <>
                  <rect
                    x="176"
                    y="53"
                    width="349"
                    height="13"
                    rx="2"
                    fill="#b6ce8c"
                    fillOpacity="0.62"
                  />
                  <rect
                    x="13"
                    y="68"
                    width="367"
                    height="13"
                    rx="2"
                    fill="#b6ce8c"
                    fillOpacity="0.62"
                  />
                </>
              )}
              {activePassage === 2 && (
                <>
                  <rect
                    x="380"
                    y="68"
                    width="145"
                    height="13"
                    rx="2"
                    fill="#b6ce8c"
                    fillOpacity="0.62"
                  />
                  <rect
                    x="13"
                    y="83"
                    width="210"
                    height="13"
                    rx="2"
                    fill="#b6ce8c"
                    fillOpacity="0.62"
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Second Image */}
        <div className="text-[15px] text-black text-left flex items-center justify-end mr-40">
          <img
            src={question}
            alt="Think about the reading questions"
            style={{ height: "150px", width: "60%" }}
          />
        </div>
      </div>

      {/* Comprehension */}
      <div className="w-[60%] mt-3 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={comprehesion}
            alt="Comprehension section"
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
