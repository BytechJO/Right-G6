import GrammarA from "./Unit10_Page3_GrammarA";
import GrammarB from "./Unit10_Page3_GrammarB";
import GrammarC from "./Unit10_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 9.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U10/PG 84/grammar10.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U10 = () => {
  const captions = [
    {
      start: 0.199,
      end: 4.099,
      text: "Page 84. Grammar. Using gerunds.",
    },

    {
      start: 5.099,
      end: 6.92,
      text: "Stella likes climbing on rocks.",
    },

    {
      start: 7.859,
      end: 9.86,
      text: "Does Stella like climbing on rocks?",
    },

    {
      start: 10.659,
      end: 13.879,
      text: "Your brothers prefer riding dirt bikes.",
    },

    {
      start: 13.92,
      end: 16.5,
      text: "Do your brothers prefer riding dirt bikes?",
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
          stopAtSecond={2}
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

export default GrammarSection_U10;
