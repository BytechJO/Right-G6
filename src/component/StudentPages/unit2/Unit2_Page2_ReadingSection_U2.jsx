import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./Unit2_Page2_ComprehensionA";
import ComprehensionB from "./Unit2_Page2_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/Asset 111.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/Asset 29.svg";
import readingAudio from "../../../assets/audio/ClassBook/U2/PG 11/reading_U2.mp3";
import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const ReadingSection_U1 = () => {
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
      <div className="p-6 flex flex-col items-center gap-5">
        <div className="flex justify-start gap-1 mb-4 w-[60%]">
          <img
            src={ReadingBG}
            style={{
              height: "60px",
              width: "auto",
            }}
          />

          <h2 className="font-bold text-[18px] text-black">
            Have you ever seen any adventure sports on TV? Do you think that it
            is safe to do adventure sports? Have you ever tried to do something
            unusual?
          </h2>
        </div>
        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={11.35}
          />
        </div>
        <div className="relative w-[60%] mt-2">
          <div className="absolute -top-9 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px 0px] text-[20px] font-bold  text-nowrap" style={{borderRadius:"20px 20px 0px 0px "}}>
            Challenging Activities
          </div>

          <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
            <div className="flex gap-4">
              <img
                src={imgReading}
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
                height: "60px",
                width: "auto",
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U1;
