import GrammarA from "./Unit8_Page3_GrammarA";
import GrammarB from "./Unit8_Page3_GrammarB";
import GrammarC from "./Unit8_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 10.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 13.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U8/PG 66/grammar8.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U8 = () => {
  const captions = [
    {
      start: 0.159,
      end: 1.759,
      text: "Page 66, grammar.",
    },
    {
      start: 2.099,
      end: 4.539,
      text: "Reported speech versus direct speech.",
    },
    {
      start: 5.159,
      end: 8.26,
      text: "Chris told me that he had gone to the mountains for vacation.",
    },
    {
      start: 8.699,
      end: 10.939,
      text: "Julie said that she likes to ride bikes a lot.",
    },
    {
      start: 11.239,
      end: 14.139,
      text: "You told us that you didn't want to go to the movies today.",
    },
    {
      start: 14.759,
      end: 16.94,
      text: "I said that I had gone to the concert yesterday.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <div className="w-[60%] mx-auto mb-4 flex items-center mt-3">
        <img
          src={ReadingBG}
          style={{
            height: "60px",
            width: "auto",
          }}
        />
      </div>
      <div className="w-[60%] mx-auto flex justify-start items-start">
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={4.5}
          justify={"start"}
        />
      </div>

      <div className="flex flex-col w-[60%] items-center justify-center">
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "auto" }}
          className="w-full object-contain"
        />{" "}
        <img
          src={img1}
          alt=""
          style={{ width: "60%", height: "auto" }}
          className="w-full object-contain mt-5"
        />
        <div className="w-full mt-4 space-y-15 ">
          <GrammarA />

          <GrammarB />

          <GrammarC />
        </div>
      </div>
    </div>
  );
};

export default GrammarSection_U8;
