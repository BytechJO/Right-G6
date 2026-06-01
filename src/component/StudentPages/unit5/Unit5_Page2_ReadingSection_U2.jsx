import ComprehensionA from "./Unit5_Page2_ComprehensionA";
import ComprehensionB from "./Unit5_Page2_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 19.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 15.svg";
import readingAudio from "../../../assets/audio/ClassBook/U5/PG 41/cd23pg41-reading.mp3";
import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const ReadingSection_U4 = () => {
 const captions = [
  {
    start: 0.36,
    end: 47.14,
    text: "Page 41 reading. Have you ever read or listened to an interview with a famous person? Did you learn anything new about this person? A celebrity interview. Gary James is an American actor. He grew up in Texas with hardworking parents and a fairly regular life. He became an actor almost by accident, and even after becoming successful, he and his wife live a modest life. He works hard and has acted in many different types of shows, from plays on stage to TV shows to movies. He has also acted in many different types of roles. Your newest movie, Time Traveling Police Force, is set in the 1990s, but you were only a year old when the decade began. It seemed odd to recreate that period for film, didn't it?",
  },
  {
    start: 48.38,
    end: 74.22,
    text: "Well, strangely, I have so much experience with the '90s. Not music necessarily. For some reason, we didn't have a lot of music in the house when I was growing up. So I started learning music when I was twenty. But with films, I have so much experience with the '90s, which my friends sometimes tease me about. So to get to do a '90s movie is something really special for me, I suppose. Which films appeal to you then?",
  },
  {
    start: 75.3,
    end: 89.34,
    text: "Ones that Hugh Anderly directed. I like films like It's the Future movies and The Cloud Home. Also, for some reason, when a '90s movie comes on at eight o'clock at night, I would be drawn to that more than I would be to something more modern.",
  },
  {
    start: 90.4,
    end: 110.619,
    text: "A love of cinema when you were young probably led to your career, didn't it? I didn't really think about that until I was actually given a job when I was fourteen. I'd never really intended it to be a career. But quite often those movies were about the unpopular kid turning into the hero. That's quite empowering for a kid who wants to be a superhero.",
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
            Have you ever read or listened to an interview with a famous person?
            Did you learn anything new about this person?
          </h2>
        </div>
        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={9.2}
          />
        </div>
        <div className="relative w-[60%] mt-2">
          <div
            className="absolute -top-9 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px 0px] text-[20px] font-bold w-[300px]"
            style={{ borderRadius: "20px 20px 0px 0px " }}
          >
            A Celebrity Interview
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
                    text: "Gary James is an American actor. He grew up in Texas with hardworking parents and a fairly “regular” life. He became an actor almost by accident, and even after becoming successful, he and his wife live a modest life. He works hard and has acted in many different types of shows, from plays on stage to TV shows to movies. He has also acted in many different types of roles.",
                    color: "black",
                  },
                  {
                    text: "Your newest movie, Time Traveling Police Force, is set in the 1990s, but you were only a year old when the decade began. It seemed odd to recreate that period for film, didn’t it?",
                    color: "orange",
                  },
                  {
                    text: "“Well, strangely, I have so much experience with the 90s. Not music, ",
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
                  text: "necessarily; for some reason we didn’t have a lot of music in the house when I was growing up, so I started learning music when I was 20. But with films, I have so much experience with the 90s, which my friends sometimes tease me about. So to get to do an a 90s movie is something really special for me, I suppose.",
                },
                {
                  text: "Which films appealed to you then?",
                  color: "orange",
                },
                {
                  text: "“Ones that Hugh Anderly directed. I like films like the It’s the Future movies and The Cloud Home. Also, for some reason when a 90s movie comes on at eight o’clock at night, I would be drawn to that more than I would be to something more modern.”",
                  color: "black",
                },
                {
                  text: "A love of cinema when you were young probably led to your career, didn’t it?",
                  color: "orange",
                },
                {
                  text: "“I didn’t really think about that until I was actually given a job when I was 14. I’d never really intended it to be a career. But quite often those movies were about the unpopular kid turning into the hero. That’s quite empowering for a kid who wants to be a superhero.”",
                  color: "black",
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
