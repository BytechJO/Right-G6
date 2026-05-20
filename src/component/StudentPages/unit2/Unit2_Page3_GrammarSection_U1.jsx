import GrammarA from "./Unit2_Page3_GrammarA";
import GrammarB from "./Unit2_Page3_GrammarB";
import GrammarC from "./Unit2_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/6.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U2/PG 12/grammer.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U2 = () => {
const captions = [
  {
    start: 0.579,
    end: 5.799,
    text: "Page 12, grammar. Expressing extremes, so and such.",
  },
  {
    start: 6.48,
    end: 9.179,
    text: "They were so tired that they fell asleep in class.",
  },
  {
    start: 9.579,
    end: 13.119,
    text: "They were such good workers that they stayed two hours extra.",
  },
  {
    start: 13.899,
    end: 16.26,
    text: "Mary ran so fast that I couldn't catch her.",
  },
  {
    start: 17.059,
    end: 19.68,
    text: "Ben played such a good game that his team won.",
  },
  {
    start: 20.399,
    end: 22.819,
    text: "We talked so much that we forgot the time.",
  },
  {
    start: 23.459,
    end: 25.2,
    text: "Ben is such a good player",
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

export default GrammarSection_U2;
