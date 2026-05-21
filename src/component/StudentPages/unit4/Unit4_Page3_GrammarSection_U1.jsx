import GrammarA from "./Unit4_Page3_GrammarA";
import GrammarB from "./Unit4_Page3_GrammarB";
import GrammarC from "./Unit4_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 35.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U4/PG 30/cd19pg30-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.299,
    end: 1.5,
    text: "Page 30, Grammar.",
  },
  {
    start: 2.159,
    end: 3.74,
    text: "Present simple passive.",
  },
  {
    start: 4.179,
    end: 5.559,
    text: "Pasta is made in Italy.",
  },
  {
    start: 6.239,
    end: 7.579,
    text: "Is pasta made in Italy?",
  },
  {
    start: 8.38,
    end: 10.139,
    text: "The sheep are guided by the dog.",
  },
  {
    start: 10.719,
    end: 12.439,
    text: "Are the sheep guided by the dog?",
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
