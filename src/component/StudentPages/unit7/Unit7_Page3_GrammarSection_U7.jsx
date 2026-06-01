import GrammarA from "./Unit7_Page3_GrammarA";
import GrammarB from "./Unit7_Page3_GrammarB";
import GrammarC from "./Unit7_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 3.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U7/PG 60/grammar7.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U7 = () => {
  const captions = [
    {
      start: 0.599,
      end: 1.979,
      text: "Page 60, grammar.",
    },
    {
      start: 2.599,
      end: 3.519,
      text: "Third conditional.",
    },
    {
      start: 3.899,
      end: 7.46,
      text: "If we had seen the comet, we would have called you to come over.",
    },
    {
      start: 8.019,
      end: 12.559,
      text: "If you had traveled back in time, you could have met my great-grandfather.",
    },
    {
      start: 12.639,
      end: 17.639,
      text: "If Mr. Green had graded the papers yesterday, he might have had time to watch the play.",
    },
    {
      start: 18.199,
      end: 21.559,
      text: "If we had seen the comet, would we have called you to come over?",
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
          stopAtSecond={3.6}
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

export default GrammarSection_U7;
