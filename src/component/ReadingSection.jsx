import React from "react";
import ReadingBG from "../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../assets/imgs/pages/classbook/comprehesion.svg"
import think from "../assets/../assets/imgs/pages/classbook/Reading.svg";
import QuestionAudioPlayer from "./QuestionAudioPlayer";
import Button from "./Button";

const ReadingSection = ({
  mainTitle,
  title,
  image,
  paragraphs = [],
  question,
  sound,
  captions,
  stopAtSecond,
}) => {
  return (
    <div className="p-6 flex flex-col items-center ">
      <div className="flex justify-start gap-1 mb-4 w-[60%]">
        <img
          src={ReadingBG}
          style={{
            height: "50px",
            width: "auto",
          }}
        />

        <h2 className="font-bold text-[18px] text-black">{mainTitle}</h2>
      </div>
      <div className="w-[60%] mx-auto">
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
      </div>
      <div className="relative w-[60%] mt-2">
        <div className="absolute -top-3 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-md text-sm font-bold">
          {title}
        </div>

        <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
          <div className="flex gap-4">
            <img
              src={image}
              style={{ width: "auto", height: "200px", objectFit: "contain" }}
              className="w-[220px] h-[150px] object-cover rounded-md"
            />

            <div className="text-[14px] leading-relaxed text-black font-medium">
              {paragraphs.slice(0, 2).map((p, i) => (
                <span key={i}>{p}</span>
              ))}
            </div>
          </div>

          <div className="mt-3 text-[14px] leading-relaxed text-black space-y-2 font-medium">
            {paragraphs.slice(2).map((p, i) => (
              <p key={i}>{p}</p>
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
