import GrammarA from "./Unit9_Page3_GrammarA";
import GrammarB from "./Unit9_Page3_GrammarB";
import GrammarC from "./Unit9_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 2.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U9/PG 78/grammar9.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const GrammarSection_U9 = () => {
  const captions = [
    {
      start: 0.419,
      end: 4.9,
      text: "Page 78, grammar. Present perfect progressive.",
    },

    {
      start: 5.299,
      end: 7.559,
      text: "The family has been building a new house.",
    },

    {
      start: 8.519,
      end: 10.899,
      text: "Has the family been building a new house?",
    },

    {
      start: 11.579,
      end: 13.179,
      text: "You have been swimming in the lake.",
    },

    {
      start: 13.899,
      end: 15.739,
      text: "Have you been swimming in the lake?",
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
          stopAtSecond={2.5}
          justify={"start"}
        />
      </div>

      <div className="flex flex-col w-[60%] items-center justify-center">
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "auto" }}
          className="w-full object-contain"
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

export default GrammarSection_U9;
