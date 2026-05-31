import GrammarA from "./Unit6_Page3_GrammarA";
import GrammarB from "./Unit6_Page3_GrammarB";
import GrammarC from "./Unit6_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 11.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U6/PG 48/cd29pg48-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
const captions= [
  {
    start: 0.319,
    end: 5.359,
    text: "Page 48. Grammar: used to, used to.",
  },
  {
    start: 5.359,
    end: 8.099,
    text: "We used to visit my cousin every weekend.",
  },
  {
    start: 8.72,
    end: 11.119,
    text: "Did you use to visit your cousins every weekend?",
  },
  {
    start: 11.699,
    end: 14.359,
    text: "I used to run one kilometer each day.",
  },
  {
    start: 14.839,
    end: 17.399,
    text: "Did you use to run one kilometer each day?",
  },
  {
    start: 17.779,
    end: 19.639,
    text: "He is used to running daily.",
  },
  {
    start: 20.279,
    end: 21.879,
    text: "Is he used to running daily?",
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
             stopAtSecond={5.359}
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
