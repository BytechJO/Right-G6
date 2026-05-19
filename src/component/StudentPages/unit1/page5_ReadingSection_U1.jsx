import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./page5_ComprehensionA";
import ComprehensionB from "./page5_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 6.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 5.svg";
import readingAudio from "../../../assets/audio/ClassBook/U1/PG 5/readingU1.mp3";

const ReadingSection_U1 = () => {
  const paragraphs = [
    "Around the world, there are many festivals such as Christmas, Eid, and Carnival. Did you know that there are some unusual festivals that happen around the world? Lately, one that has become a popular tourist attraction is the Monkey Buffet Festival. In Lopburi, Thailand, so many monkeys have come to the town, that tourists have started to visit to see them. To encourage the monkeys to stay, the local businessmen have planned a terrific dinner once a year.",
    "The dinner is not for the people, though; it’s for the monkeys! A countless supply of fruits and other foods are put out on The dinner is not for the people, though; it’s for the monkeys! A countless supply of fruits and other foods are put out on",
    "tables in an outdoor gathering area of the city, and the monkeys swarm in like bees!",
    "In Japan, they have a festival called Konaki Sumo. It is based on the Japanese proverb “Crying babies grow fast.” Parents from all around the country bring their babies to see if they can get them to grow well!",
    "How do they do that? No, they don’t spank them or do anything mean to them. They simply let them be held ... by a giant sumo wrestler! A clown stands by to keep the babies entertained, and the baby that starts crying first is the winner!",
  ];

  const captions = [
    {
      start: 0.439,
      end: 5.96,
      text: "Page five, Reading. Is there something that you can do better than most people? What is it?",
    },
    {
      start: 6.86,
      end: 27.719,
      text: "How fast can you run? How deep can you dive? How long are your fingernails? Probably not as fast, deep, or long as some people who have made it into the record books! For some reason, people like to try to set records. They want to be the best at something. Here are some amazing records that people have set over the years.",
    },
    {
      start: 28.979,
      end: 42.059,
      text: "How tightly can your mom or dad park a car? In 2015, Alistair Moffatt set a record for parallel parking. He only needed 7.5 cm more than the length of his car.",
    },
    {
      start: 43.079,
      end: 61.84,
      text: "How fast can you put on your socks? In 2016, Pavol Durdik from Slovakia put 52 socks on his foot in one minute! How far can you walk on your hands? Sarah Chapman walked over 5,000 meters in eight hours on her hands in 2002.",
    },
    {
      start: 62.919,
      end: 66.559,
      text: "For some of us, the question might be, how can we walk on our hands?",
    },
  ];

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle="Do you celebrate any festivals in your city? What kinds
of festivals have you gone to?"
        title="Some Unusual Celebrations"
        image={imgReading}
        paragraphs={paragraphs}
        question={question}
        sound={readingAudio}
        captions={captions}
        stopAtSecond={6.1}
      />

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U1;
