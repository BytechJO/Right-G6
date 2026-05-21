import ReadingSection from "./ReadingSection";
import ComprehensionA from "./Unit3_Page2_ComprehensionA";
import ComprehensionB from "./Unit3_Page2_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/Asset 22.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/SVG/Asset 23.svg";
import readingAudio from "../../../assets/audio/ClassBook/U3/PG 23/pg23-reading.mp3";
import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const ReadingSection_U2 = () => {


  const captions = [
    {
      start: 0.699,
      end: 2.22,
      text: "Page 23, Reading.",
    },
    {
      start: 2.899,
      end: 8.0,
      text: "How do you go to school? Do you take a bus to school? Have you ever been late for school?",
    },
    {
      start: 8.699,
      end: 10.42,
      text: "If only.",
    },
    {
      start: 10.42,
      end: 12.019,
      text: "Oh, I missed the bus.",
    },
    {
      start: 12.259,
      end: 16.439,
      text: "If I woke up earlier today, I would get to school on time.",
    },
    {
      start: 16.779,
      end: 18.239,
      text: "Well, I'm late, too.",
    },
    {
      start: 18.6,
      end: 24.5,
      text: "If I'd known I would miss the bus, I would have asked my mom if I could ride my bike.",
    },
    {
      start: 24.959,
      end: 25.639,
      text: "Good idea.",
    },
    {
      start: 25.92,
      end: 29.5,
      text: "If we rode our bikes, we would get to school faster.",
    },
    {
      start: 30.079,
      end: 30.519,
      text: "Yes.",
    },
    {
      start: 30.819,
      end: 34.759,
      text: "Now that we have to walk, we're going to be really late.",
    },
    {
      start: 35.459,
      end: 37.539,
      text: "I hope our teacher doesn't get mad.",
    },
    {
      start: 37.959,
      end: 39.719,
      text: "At least there's no test today.",
    },
    {
      start: 40.379,
      end: 43.18,
      text: "Yes, being late on test day is terrible.",
    },
    {
      start: 43.479,
      end: 45.399,
      text: "Well, we better start walking.",
    },
    {
      start: 45.719,
      end: 47.579,
      text: "My books already feel heavy.",
    },
    {
      start: 48.02,
      end: 49.659,
      text: "So, did you get up late, too?",
    },
    {
      start: 50.279,
      end: 54.279,
      text: "No, but my little brother needs lots of help in the morning.",
    },
    {
      start: 54.759,
      end: 59.919,
      text: "I'm from a big family, so the older children help the younger ones get ready.",
    },
    {
      start: 60.379,
      end: 62.52,
      text: "Oh, that's a big responsibility.",
    },
    {
      start: 62.879,
      end: 66.04,
      text: "I already have a hard time getting myself ready.",
    },
    {
      start: 66.239,
      end: 71.439,
      text: "If I had to get someone else ready, too, then I'd be late all the time.",
    },
    {
      start: 71.799,
      end: 73.299,
      text: "You might be surprised.",
    },
    {
      start: 73.619,
      end: 75.619,
      text: "I have to set a good example.",
    },
    {
      start: 75.939,
      end: 80.799,
      text: "Plus, I know I have a lot to do in a short amount of time,",
    },
    {
      start: 81.119,
      end: 84.959,
      text: "so I learned to be careful and fast at the same time.",
    },
    {
      start: 85.699,
      end: 90.459,
      text: "Maybe I need to borrow some of your younger brothers and sisters for a while",
    },
    {
      start: 90.54,
      end: 93.119,
      text: "so I can learn to get ready more quickly.",
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
            How do you go to school? Do you take a bus to school? Have you ever
            been late for school?
          </h2>
        </div>
        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={11.35}
          />
        </div>
        <div className="relative w-[60%] mt-2">
          <div className="absolute -top-10 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px 0px] text-[22px] font-bold w-[200px]" style={{borderRadius:"20px 20px 0px 0px "}}>
            If Only ...
          </div>

          <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
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
                    name: "Susan",
                    text: "Oh, I missed the bus! If I woke up earlier today, I would get to school on time.",
                  },
                  {
                    name: "Lana",
                    text: "Well, I'm late, too. If I'd known I would miss the bus, I would have asked my mom if I could ride my bike.",
                  },
                  {
                    name: "Susan",
                    text: "Good idea. If we rode our bikes, we would get to school faster.",
                  },
                  {
                    name: "Lana",
                    text: "Yes. Now that we have to walk, we're going to be really late.",
                  },
                  {
                    name: "Susan",
                    text: "I hope our teacher doesn't get mad. At least there's no test today.",
                  },
                  {
                    name: "Lana",
                    text: "Yes, being late on test day is terrible! Well, we'd better start walking! My books already feel heavy.",
                  },
                  { name: "Susan", text: "So did you get up late, too?" },
                  {
                    name: "Lana",
                    text: "No, but my little brother needs lots of help in the morning. I'm from a big family, so the older children help the younger ones get ready.",
                  },
                ].map((line, i) => (
                  <p key={i} className="mb-0.5">
                    <span
                      style={{
                        color: line.name === "Susan" ? "#F97316" : "#ed3a3aff",
                        fontWeight: "bold",
                        marginRight: "4px",
                      }}
                    >
                      {line.name}:
                    </span>
                    {line.text}
                  </p>
                ))}
              </div>
            </div>

            {/* الفقرات خارج الصورة — Susan وLana بنفس اللون */}
            <div className="mt-3 text-[16px] leading-relaxed text-black font-medium space-y-0.5">
              {[
                {
                  name: "Susan",
                  text: "Oh, that's a big responsibility! I already have a hard time getting myself ready. If I had to get someone else ready, too, then I'd be late all the time!",
                },
                {
                  name: "Lana",
                  text: "You might be surprised. I have to set a good example. Plus, I know I have a lot to do in a short amount of time, so I learn to be careful and fast at the same time.",
                },
                {
                  name: "Susan",
                  text: "Maybe, I need to borrow some of your younger brothers and sisters for a while so I can learn to get ready more quickly!",
                },
              ].map((line, i) => (
                <p key={i}>
                  <span
                    style={{
                      color: line.name === "Susan" ? "#F97316" : "#ed3a3aff",
                      fontWeight: "bold",
                      marginRight: "4px",
                    }}
                  >
                    {line.name}:
                  </span>
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

export default ReadingSection_U2;
