import ComprehensionA from "./Unit6_Page2_ComprehensionA";
import ComprehensionB from "./Unit6_Page2_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 27.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 26.svg";
import readingAudio from "../../../assets/audio/ClassBook/U6/PG 47/cd28pg47-reading.mp3";
import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const ReadingSection_U4 = () => {
  const captions = [
    {
      start: 0.319,
      end: 8.0,
      text: "Page 47 reading. Have you ever visited an old city? What were the things that you saw there? An ancient city.",
    },
    {
      start: 8.8,
      end: 13.599,
      text: "Machu Picchu is a famous ancient city in Peru that was built by the Incas.",
    },
    {
      start: 14.159,
      end: 16.6,
      text: "It used to be a city as well as a place of worship.",
    },
    {
      start: 17.059,
      end: 28.299,
      text: "The people who live in the villages near Machu Picchu are used to tourists because the famous city and the nearby rainbow mountain named Vinicunca is visited by tens of thousands of people each year.",
    },
    {
      start: 28.639,
      end: 35.52,
      text: "People who visit Machu Picchu must walk the trails from Cusco, and the hike is a difficult one in the high Andes Mountains.",
    },
    {
      start: 36.259,
      end: 40.559,
      text: "Much of the city has been restored to what it used to be like when the Incas were living there.",
    },
    {
      start: 41.419,
      end: 49.18,
      text: "A huge city that seems to be on the top of the world, Machu Picchu was built from the countless stones that were carried up the steep mountains.",
    },
    {
      start: 50.039,
      end: 54.02,
      text: "The stones are fitted together perfectly so that no mortar is needed.",
    },
    {
      start: 54.659,
      end: 62.379,
      text: "The workers who built this amazing city must have been very talented and used to hard work because the stones are heavy and the city is large.",
    },
    {
      start: 63.219,
      end: 67.399,
      text: "After their two-day walk, tourists have much to see at this ancient city.",
    },
    {
      start: 68.26,
      end: 81.839,
      text: "The Intihuatana stone, a type of huge sundial that was looked at as a place to tie the sun in order to hold it in the sky, the temple, and the homes are all here in a beautiful jungle-like setting.",
    },
    {
      start: 82.799,
      end: 88.199,
      text: "It has been declared a UNESCO World Heritage Site, and it is over five hundred years old.",
    },
    {
      start: 88.699,
      end: 98.779,
      text: "The ruins of this ancient city have helped historians gather much information about the Inca civilization that at one time had such a strong influence in South America.",
    },
  ];
  return (
    <div className=" flex flex-col items-center">
      <div className="p-6 flex flex-col items-center gap-10">
        <div className="flex justify-start gap-1 mb-4 w-[60%]">
          <img
            src={ReadingBG}
            style={{
              height: "60px",
              width: "auto",
            }}
          />

          <h2 className="font-bold text-[18px] text-black">
            Have you ever read or listened to an interview with a famous person?
            Did you learn anything new about this person?
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
          <div
            className="absolute -top-10 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px 0px] text-[22px] font-bold w-[300px]"
            style={{ borderRadius: "20px 20px 0px 0px " }}
          >
            An Ancient City
          </div>

          <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
            {/* الفقرات خارج الصورة — Susan وLana بنفس اللون */}
            <div className="mt-3 text-[16px] leading-relaxed text-black font-medium space-y-0.5">
              {[
                {
                  text: "Machu Picchu is a famous ancient city in Peru that was built by the Incas. It used to be a city as well as a place of worship. The people who live in the villages near Machu Picchu are used to tourists because the",
                },
              ].map((line, i) => (
                <p key={i} style={{ color: line.color }}>
                  {line.text}
                </p>
              ))}
            </div>
            <div className="flex gap-4">
              <img
                src={imgReading}
                style={{ width: "auto", height: "250px", objectFit: "contain" }}
                className="rounded-md flex-shrink-0"
              />

              {/* الفقرة داخل البوكس مع Susan/Lana ملونين */}
              <div className="text-[16px] leading-relaxed text-black font-medium">
                {[
                  {
                    text: "famous city and a nearby rainbow mountain named Vinicunca is visited by tens of thousands of people each year. People who visit Machu Picchu must walk the trails from Cusco, and the hike is a difficult one in the high Andes Mountains. Much of the city has been restored to what it used to be like when the Incas were living there. A huge city that seems to be on the top of the world, Machu Picchu was built from countless stones that were carried up the steep mountains. The stones are fitted together perfectly so that no mortar is needed. The workers who built this amazing city must have been very talented and used to hard work because the stones are heavy and the city is large.",
                    color: "black",
                  },
                ].map((line, i) => (
                  <p key={i} style={{ color: line.color }} className="mb-0.5">
                    {line.text}
                  </p>
                ))}
              </div>
            </div>

            {/* الفقرات خارج الصورة — Susan وLana بنفس اللون */}
            <div className="mt-3 text-[16px] leading-relaxed text-black font-medium space-y-0.5">
              {[
                {
                  text: "After their two-day walk, tourists have much to see at this ancient city. The Intihuatana Stone, a type of huge sundial that was looked at as a place to tie the sun to in order to hold it in the sky, the temple, and the homes are all here in a beautiful, jungle-like setting. It has been declared a UNESCO World Heritage Site, and it is over 500 years old. The ruins of this ancient city have helped historians gather much information about the Inca civilization that at one time had such a strong influence in South America.",
                },
              ].map((line, i) => (
                <p key={i} style={{ color: line.color }}>
                  {line.text}
                </p>
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

export default ReadingSection_U4;
