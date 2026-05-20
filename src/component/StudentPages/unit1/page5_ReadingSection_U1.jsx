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
    start: 0.359,
    end: 6.879,
    text: "Page 5 reading. Do you celebrate any festivals in your city? What kinds of festivals have you gone to?",
  },
  {
    start: 7.539,
    end: 19.559,
    text: "Some unusual celebrations. Around the world, there are many festivals such as Christmas, Eid, and Carnival. Did you know that there are some unusual festivals that happen around the world?",
  },
  {
    start: 20.079,
    end: 25.279,
    text: "Lately, one that has become a popular tourist attraction is the Monkey Buffet Festival.",
  },
  {
    start: 26.159,
    end: 33.239,
    text: "In Lopburi, Thailand, so many monkeys have come to the town that tourists have started to visit to see them.",
  },
  {
    start: 33.819,
    end: 39.419,
    text: "To encourage the monkeys to stay, the local businessmen have planned a terrific dinner once a year.",
  },
  {
    start: 40.399,
    end: 44.159,
    text: "The dinner is not for the people, though. It's for the monkeys.",
  },
  {
    start: 44.84,
    end: 53.439,
    text: "A countless supply of fruits and other foods are put on tables in an outdoor gathering area of the city, and the monkeys swarm in like bees.",
  },
  {
    start: 53.899,
    end: 57.0,
    text: "In Japan, they have a festival called Konaki Sumo.",
  },
  {
    start: 57.719,
    end: 62.299,
    text: 'It is based on the Japanese proverb, "Crying babies grow fast."',
  },
  {
    start: 62.419,
    end: 67.079,
    text: "Parents from all around the country bring their babies to see if they can get them to grow well.",
  },
  {
    start: 67.68,
    end: 68.58,
    text: "How do they do that?",
  },
  {
    start: 69.119,
    end: 71.919,
    text: "No, they don't spank them or do anything mean to them.",
  },
  {
    start: 72.519,
    end: 76.299,
    text: "They simply let them be held by a giant sumo wrestler.",
  },
  {
    start: 76.68,
    end: 82.439,
    text: "A clown stands by to keep the babies entertained, and the baby that starts crying first is the winner.",
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
        stopAtSecond={7.0}
      />

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U1;
