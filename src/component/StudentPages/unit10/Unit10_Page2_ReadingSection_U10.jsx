import ComprehensionA from "./Unit10_Page2_ComprehensionA";
import ComprehensionB from "./Unit10_Page2_ComprehensionB";

import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 8.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 30.svg";

import readingAudio from "../../../assets/audio/ClassBook/U10/PG 83/reading10.mp3";

import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";
import readingTimings from "../../../assets/json/reading10_eng.json";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import { useReadingHighlight } from "../../useReadingHighlight";
import ExerciseHeader from "../../ExerciseHeader";

const Unit10_Page2_ReadingSection_U10 = () => {
  const { highlight, onTimeUpdate } = useReadingHighlight(
    readingTimings,
    [
      {
        printed: ["ideas", "and", "the", "skills"],
        spoken: ["ideas", "and", "", "skills"],
      },
    ],
    true,
  );
  const paragraphs = [
    "When you are choosing a career, it's important to know yourself and your strengths or weaknesses. Not only is special training necessary for a career, but you probably want to choose an area that you're talented in and enjoy. Below are some general categories for career ideas and the skills and strengths that each area uses the most.",
  ];

  const careerData = [
    {
      title: "Building/Machinery",
      skills: [
        "taking things apart and putting them together",
        "building simple models",
        "understanding how machines work",
        "fixing things",
      ],
    },

    {
      title: "Servicing and Caring for Others",
      skills: [
        "knowing and predicting the needs of others",
        "understanding how the body works",
        "having care and concern for others",
      ],
    },

    {
      title: "Computers and Technology",
      skills: [
        "understanding how technology works",
        "being able to do or interested in programming technology",
        "liking organization and order",
      ],
    },

    {
      title: "Business, Marketing, and Sales",
      skills: [
        "relating to people well",
        "being persuasive when talking with people",
        "looking ahead to see trends or patterns",
        "taking risks",
        "organizing and planning",
      ],
    },

    {
      title: "Social Sciences and Languages",
      skills: [
        "understanding patterns of human behavior",
        "communicating well",
        "understanding the structure of languages",
        "appreciating the ancient and the modern",
      ],
    },

    {
      title: "Creating Art and Music",
      skills: [
        "being creative and imaginative",
        "wanting to create rather than analyze, study or do",
        "appreciating beauty",
      ],
    },
  ];

  const captions = [
    {
      start: 0.259,
      end: 1.779,
      text: "Page 83 reading.",
    },

    {
      start: 2.799,
      end: 27.639,
      text: "Which career is right for you? When you are choosing a career, it's important to know yourself and your strengths or weaknesses. Not only is special training necessary for a career, but you probably want to choose an area that you're talented in and enjoy. Below are some general categories for career ideas and skills and strengths that each area uses the most.",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <div className="p-6 flex flex-col items-center gap-5">
        <div className="w-[60%]">
          <ExerciseHeader
            title="Listen and read along: Which Career Is Right for You?"
            subTitle="Press Play and follow the text as it is read; pause or replay any part you need to hear again."
          />
        </div>
        <div className="flex justify-start gap-1  w-[60%]">
          <img
            src={ReadingBG}
            alt="Reading section"
            style={{
              height: "60px",
              width: "auto",
            }}
          />
        </div>

        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={5}
            pageId="sb_unit10_page83_reading"
            onTimeUpdate={onTimeUpdate}
          />
        </div>

        <div className="relative w-[60%] mt-5">
          <div className="absolute -top-9 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px_20px_0px_0px] text-[20px] font-bold">
            {highlight("Which Career Is Right for You?")}
          </div>

          <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
            <div className="flex gap-4">
              <img
                src={imgReading}
                alt="Career areas and the skills used in each area"
                style={{
                  width: "auto",
                  height: "120px",
                  objectFit: "contain",
                }}
                className="rounded-md"
              />

              <div className="text-[16px] leading-relaxed text-black font-medium">
                {paragraphs.map((p, i) => (
                  <p key={i}>{highlight(p)}</p>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-2 gap-4 mb-4 font-bold text-[16px]">
                <div className="ml-10">Career Area</div>

                <div className="text-center">I am skilled in ...</div>
              </div>

              <div className="space-y-5">
                {careerData.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div className="text-[14px] leading-relaxed text-black font-medium ">
                      {item.title}:
                    </div>

                    <div className="flex items-start gap-2 text-[16px]">
                      <span className="text-[#f79631] text-[35px] leading-4">
                        •
                      </span>
                      <span className="text-[14px] leading-relaxed text-black font-medium ">
                        {item.skills.join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-[15px] text-black text-left flex items-center justify-center">
          <img
            src={question}
            alt="Think about the reading questions"
            style={{ height: "150px", width: "60%" }}
          />
        </div>

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
      </div>

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />
        <ComprehensionB />
      </div>
    </div>
  );
};

export default Unit10_Page2_ReadingSection_U10;
