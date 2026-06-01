import GrammarA from "./Unit5_Page3_GrammarA";
import GrammarB from "./Unit5_Page3_GrammarB";
import GrammarC from "./Unit5_Page3_GrammarC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Grammar.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 16.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U5/PG 42/cd24pg42-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
const captions = [
  {
    start: 0.319,
    end: 3.159,
    text: "Page 42, grammar, question tags.",
  },
  {
    start: 3.819,
    end: 5.599,
    text: "Jim plays cricket, doesn't he?",
  },
  {
    start: 6.039,
    end: 7.879,
    text: "Jim doesn't play cricket, does he?",
  },
  {
    start: 8.3,
    end: 10.099,
    text: "They played cricket, didn't they?",
  },
  {
    start: 10.579,
    end: 12.5,
    text: "They didn't play cricket, did they?",
  },
  {
    start: 13.299,
    end: 15.299,
    text: "You have skied before, haven't you?",
  },
  {
    start: 16.079,
    end: 17.979,
    text: "You haven't skied before, have you?",
  },
  {
    start: 18.539,
    end: 20.979,
    text: "Pasta is made in Italy, isn't it?",
  },
  {
    start: 21.459,
    end: 23.859,
    text: "Pasta isn't made in Italy, is it?",
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
