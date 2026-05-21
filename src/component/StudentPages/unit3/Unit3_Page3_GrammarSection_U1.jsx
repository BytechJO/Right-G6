import GrammarA from "./Unit3_Page3_GrammarA";
import GrammarB from "./Unit3_Page3_GrammarB";
import GrammarC from "./Unit3_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/5.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U3/PG 24/pg24-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.179,
    end: 3.259,
    text: "Page 24, grammar. Second conditional.",
  },
  {
    start: 3.819,
    end: 6.659,
    text: "If Mario guessed the answer, he would get a prize.",
  },
  {
    start: 7.059,
    end: 9.699,
    text: "Mario would get a prize if he guessed the answer.",
  },
  {
    start: 10.119,
    end: 12.839,
    text: "Would Mario get a prize if he guessed the answer?",
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
             stopAtSecond={3.259}
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

export default GrammarSection_U1;
