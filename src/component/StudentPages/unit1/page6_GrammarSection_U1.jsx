import GrammarA from "./page6_GrammarA";
import GrammarB from "./page6_GrammarB";
import GrammarC from "./page6_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/SVG/Asset 19.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U1/PG 6/grammer_u1.mp3";
import Rabbit from "../../../assets/Page 01/Rabbit.svg";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const captions = [
    {
      start: 0.459,
      end: 3.579,
      text: "Page 6, grammar. Present perfect.",
    },
    {
      start: 4.199,
      end: 6.259,
      text: "Larry has seen the new movie.",
    },
    {
      start: 6.739,
      end: 8.159,
      text: "Has Larry seen the new movie?",
    },
    {
      start: 8.76,
      end: 10.079,
      text: "They have gone to the beach.",
    },
    {
      start: 10.659,
      end: 11.84,
      text: "Have they gone to the beach?",
    },
    {
      start: 12.259,
      end: 13.759,
      text: "You haven't gone to the beach.",
    },
    {
      start: 14.679,
      end: 16.02,
      text: "Haven't you gone to the beach?",
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
      <div className="w-[60%] mx-auto">
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={2}
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

export default GrammarSection_U1;
