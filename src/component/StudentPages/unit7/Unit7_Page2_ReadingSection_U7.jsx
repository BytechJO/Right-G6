import ComprehensionA from "./Unit7_Page2_ComprehensionA";
import ComprehensionB from "./Unit7_Page2_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 2.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 15.svg";
import readingAudio from "../../../assets/audio/ClassBook/U4/PG 29/cd18pg29-reading.mp3";
import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const ReadingSection_U7 = () => {
  const captions = [
    {
      start: 0.439,
      end: 1.779,
      text: "Page 29, Reading.",
    },
    {
      start: 2.539,
      end: 9.939,
      text: "Have you ever reused something to make something new out of it? Can you find new uses for old things in your room or house?",
    },
    {
      start: 10.88,
      end: 11.659,
      text: "Ecotecture.",
    },
    {
      start: 12.659,
      end: 27.199,
      text: "Architecture, the design and study of buildings, is always changing and developing new ideas and ways of doing things. Most recently, however, some architecture is trying to move backwards, becoming simpler and using natural materials.",
    },

    {
      start: 28.599,
      end: 39.779,
      text: "This new style of architecture is called green architecture. It works to develop buildings that use fewer resources and less energy to build and operate the building.",
    },
    {
      start: 40.759,
      end: 49.719,
      text: "First, the planner looks at the area where the building will be built. They try to find materials that are easily available and can be replaced to use for the building.",
    },
    {
      start: 50.639,
      end: 55.379,
      text: "Many houses in semi-arid or desert areas are made of clay, for example.",
    },

    {
      start: 56.659,
      end: 60.899,
      text: "Buildings in very cold climates, such as Alaska, are often made of ice.",
    },
    {
      start: 61.419,
      end: 66.959,
      text: "Renewable resources that help conserve energy are used as building materials.",
    },
    {
      start: 67.04,
      end: 73.519,
      text: "The inside of the building is designed so that as little cooling or heating as possible is needed.",
    },
    {
      start: 73.599,
      end: 80.019,
      text: "This type of architecture is named green architecture because it helps to keep the earth green and healthy.",
    },
    {
      start: 80.739,
      end: 85.059,
      text: "Solar or wind energy is used whenever possible because it is renewable.",
    },
    {
      start: 85.819,
      end: 89.359,
      text: "How many buildings in your area can be called green?",
    },
  ];
  return (
    <div className=" flex flex-col items-center">
      <div className="p-6 flex flex-col items-center gap-5">
        <div className="flex justify-start gap-1 mb-4 w-[60%]">
          <img
            src={ReadingBG}
            style={{
              height: "60px",
              width: "auto",
            }}
          />

          <h2 className="font-bold text-[18px] text-black">
            Have you ever imagined something crazy? What is it? What are some
            crazy ideas or things that you wish were true?
          </h2>
        </div>
        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={11.659}
          />
        </div>
        <div className="relative w-[60%] mt-2">
          <div className="absolute -top-9 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px_20px_0px_0px] text-[20px] font-bold">
            If I Could Walk on Water ...
          </div>

          <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
            <div className="text-[16px] leading-relaxed text-black font-medium space-y-0.5">
              {[
                {
                  text: "People like to imagine crazy things that might never happen and have never happened before. If you, or most",
                },
              ].map((line, i) => (
                <p key={i}>{line.text}</p>
              ))}
            </div>
            <div className="flex gap-4">
              <img
                src={imgReading}
                style={{
                  width: "auto",
                  height: "200px",
                  objectFit: "contain",
                  marginTop: "10px",
                }}
                className="rounded-md shrink-0"
              />

              <div className="text-[16px] leading-relaxed text-black font-medium">
                {[
                  {
                    text: "of your classmates, had a helicopter, you would fly to school or the park. If you, or your classmates, had rockets, you would fly to the moon on the weekends. It seems like it has been impossible, but will it always be? ",
                  },
                  {
                    text: `One expression that has become popular is “If I could walk on water, I would ..." It means if someone could do the impossible, they would have the ability to do whatever clause they put after the word “would.” Well, the expression might have to change for a new group of athletes who call themselves "liquid mountaineers."  `,
                  },
                ].map((line, i) => (
                  <p key={i} className="mb-0.5">
                    {line.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-3 text-[16px] leading-relaxed text-black font-medium space-y-0.5">
              {[
                {
                  text: "Liquid mountaineers try to walk on water. They wear special shoes that repel water. If you have ever dived incorrectly, you know that water can be very hard if it is hit hard and fast. Using this and other rules of physics, the “water walkers” run fast with their legs lifted high, pushing them down hard on the water. If they could, the athletes would go all the way across a river or lake, but even with all their special equipment and plans, they can only make it a few steps across the water before they sink. There have been some people who use platforms under the water or other tricks to make it seem like they’re walking on water, but they really aren’t. The true liquid mountaineers know it is only possible to walk for a few steps. It is an amazing sport to watch, but if most had extra time and money to learn this sport, they would probably want to do something that lasted for a while longer!",
                },
              ].map((line, i) => (
                <p key={i}>{line.text}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="text-[15px] text-black text-left flex items-center justify-center">
          <img src={question} style={{ height: "150px", width: "60%" }} />
        </div>

        <div className="w-[60%] mt-3 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={comprehesion}
              style={{
                height: "60px",
                width: "auto",
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-[60%] mt-4 space-y-6 ">
        <ComprehensionA />

        <ComprehensionB />
      </div>
    </div>
  );
};

export default ReadingSection_U7;
