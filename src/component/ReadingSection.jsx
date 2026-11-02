import { useReadingHighlight } from "./useReadingHighlight";
import React from "react";
import QuestionAudioPlayer from "./QuestionAudioPlayer";
import Button from "./Button";
import ExerciseHeader from "./ExerciseHeader";
import ReadingBG from "../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../assets/imgs/pages/classbook/comprehesion.svg";
const ReadingSection = ({
  mainTitle,
  title,
  image,
  paragraphs = [],
  question,
  sound,
  captions,
  stopAtSecond,
  wordTimings,
  timingAliases,
  pageId,
  onTimeUpdate,
  imageAlt,
  headerTitle,
  subTitle,
}) => {
  const { highlight, onTimeUpdate: updateReadingTime } = useReadingHighlight(
    wordTimings,
    timingAliases,
    true,
  );
  return (
    <div className="p-6 flex flex-col items-center ">
      <div className="flex items-center gap-4 mb-4 w-[70%]">
        <ExerciseHeader title={headerTitle} subTitle={subTitle} />
      </div>
      <div className="flex items-center gap-4 mb-4 w-[60%]">
        <img
          src={ReadingBG}
          alt=""
          style={{
            height: "50px",
            width: "auto",
          }}
        />

        <h2 className="font-bold text-[18px] text-black">
          {highlight(mainTitle)}
        </h2>
      </div>
      <div className="w-[70%] mx-auto">
        <QuestionAudioPlayer
          src={sound}
          pageId={pageId}
          onTimeUpdate={(time) => {
            updateReadingTime(time);
            onTimeUpdate?.(time);
          }}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
      </div>
      <div className="relative w-[60%] mt-2">
        <div
          className="absolute -top-9 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px 0px] text-[20px] font-bold  text-nowrap"
          style={{ borderRadius: "20px 20px 0px 0px " }}
        >
          {highlight(title)}
        </div>

        <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
          <div className="flex gap-4">
            <img
              src={image}
              alt={imageAlt}
              style={{
                width: "30%",
                height: "auto",
                objectFit: "contain",
              }}
              className="rounded-md"
            />
            <div className="mt-3 text-[14px] leading-relaxed text-black space-y-2 font-medium">
              {paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{highlight(p)}</p>
              ))}
            </div>
          </div>

          <div className="mt-3 text-[14px] leading-relaxed text-black space-y-2 font-medium">
            {paragraphs.slice(2).map((p, i) => (
              <p key={i}>{highlight(p)}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="text-[15px] text-black text-left flex items-center justify-center">
        <img src={question} style={{ height: "150px", width: "60%" }} />
      </div>

      <div className="w-[60%] mt-3 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={comprehesion}
            alt=""
            style={{
              height: "50px",
              width: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingSection;
