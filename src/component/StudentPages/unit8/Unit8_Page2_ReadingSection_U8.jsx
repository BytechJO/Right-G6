import ComprehensionA from "./Unit8_Page2_ComprehensionA";
import ComprehensionB from "./Unit8_Page2_ComprehensionB";
import question from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 9.svg";
import imgReading from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 24.svg";
import readingAudio from "../../../assets/audio/ClassBook/U8/PG 65/reading8.mp3";
import ReadingBG from "../../../assets/imgs/pages/classbook/Reading.svg";
import comprehesion from "../../../assets/imgs/pages/classbook/comprehesion.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import readingTimings from "../../../assets/json/reading8_eng.json";
import { useReadingHighlight } from "../../useReadingHighlight";
import ExerciseHeader from "../../ExerciseHeader";

const Unit8_Page2_ReadingSection_U8 = () => {
  const { highlight, onTimeUpdate } = useReadingHighlight(
    readingTimings,
    [
      {
        printed: ["Kahlil", "Gibran:", "Poet,", "Artist,", "and", "Encourager"],
        spoken: ["Khalil", "Gibran", "poet", "artists", "and", "encourager"],
        whole: true,
      },
      { printed: ["Kahlil"], spoken: ["Khalil"] },
      { printed: ["1883"], spoken: ["eighteen eighty-three"] },
      { printed: ["1923"], spoken: ["nineteen twenty-three"] },
      {
        printed: ["In", "one", "of", "his", "books", "he"],
        spoken: ["In", "one", "of", "his", "book", "he"],
      },
    ],
    true,
  );
  const captions = [
    {
      start: 0.059,
      end: 6.639,
      text: "Page 65 reading. What kind of poems do you like to read? What are the names of the poets that you like?",
    },
    {
      start: 7.239,
      end: 10.96,
      text: "Kahlil Gibran, poet, artist, and encourager.",
    },
    {
      start: 11.779,
      end: 27.999,
      text: "Kahlil Gibran is one of the most famous poets in the world, second only to Shakespeare and Lao Tzu. He was born in Lebanon in 1883 to a Catholic family, and he lived much of his later childhood and early adult life in the United States.",
    },
    {
      start: 29.459,
      end: 39.959,
      text: "Surprisingly, Gibran had no formal schooling in Lebanon, but priests did visit his house to teach him religion and the Arabic and Syriac languages.",
    },
    {
      start: 41.34,
      end: 47.379,
      text: "He later went to school and college in America. He was named College Poet at his university.",
    },
    {
      start: 48.479,
      end: 57.459,
      text: "Gibran wrote both poetry and prose. He wrote first in Arabic and later began writing in English, quickly becoming popular internationally.",
    },
    {
      start: 58.34,
      end: 67.779,
      text: "His best-read book is The Prophet, which has been translated into forty languages and never gone out of print since its first printing in 1923.",
    },
    {
      start: 68.599,
      end: 77.499,
      text: "Gibran wrote about love, religion, and friendship, but he is best known for his skills and ability to encourage readers of many different backgrounds.",
    },
    {
      start: 78.299,
      end: 84.759,
      text: "Gibran had a caring heart for all people. He did a great deal to make his poetry meaningful and helpful to others.",
    },
    {
      start: 85.4,
      end: 93.819,
      text: "In one of his books, he says that half of what he said would probably not be remembered, but he wrote it all so that the readers can remember the other half.",
    },
    {
      start: 94.519,
      end: 105.739,
      text: "He was an artist of many types of visual art, poetry, prose, and philosophy during his life, but he is remembered the most for his famous books of poetry and prose.",
    },
  ];
  return (
    <div className=" flex flex-col items-center">
      <div className="p-6 flex flex-col items-center gap-5">
        <div className="w-[60%]">
          <ExerciseHeader
            title="Listen and read along: Kahlil Gibran: Poet, Artist, and Encourager."
            subTitle="Press Play and follow the text as it is read; pause or replay any part you need to hear again."
          />
        </div>
        <div className="flex justify-start gap-1 mb-4 w-[60%] ">
          <img
            src={ReadingBG}
            alt="Reading section"
            style={{
              height: "60px",
              width: "auto",
            }}
          />

          <h2 className="font-bold text-[18px] text-black">
            {highlight(
              "What kind of poems do you like to read? What are the names of the poets that you like?",
            )}
          </h2>
        </div>
        <div className="w-[60%] mx-auto">
          <QuestionAudioPlayer
            src={readingAudio}
            captions={captions}
            stopAtSecond={11}
            pageId="sb_unit8_page65_reading"
            onTimeUpdate={onTimeUpdate}
          />
        </div>
        <div className="relative w-[60%] mt-5">
          <div className="absolute -top-9 left-4 bg-[#84ad40] text-white px-5 py-1 rounded-[20px_20px_0px_0px] text-[20px] font-bold">
            {highlight("Kahlil Gibran: Poet, Artist, and Encourager")}
          </div>

          <div className="border-2 border-[#84ad40] rounded-2xl p-4 pt-6 bg-white">
            <div className="flex gap-4">
              <img
                src={imgReading}
                alt="Portrait of poet and artist Kahlil Gibran"
                style={{ width: "auto", height: "220px", objectFit: "contain" }}
                className="rounded-md shrink-0"
              />

              <div className="text-[16px] leading-relaxed text-black font-medium">
                <p>
                  {highlight(
                    "Kahlil Gibran is one of the most famous poets in the world, second only to Shakespeare and Lao Tzu. He was born in Lebanon in 1883 to a Catholic family, and he lived much of his later childhood and early adult life in the United States.",
                  )}
                </p>

                <p>
                  {highlight(
                    "Surprisingly, Gibran had no formal schooling in Lebanon, but priests did visit his house to teach him religion and the Arabic and Syriac languages. He later went to school and college in America. He was named “College Poet” at his university.",
                  )}
                </p>

                <p>
                  {highlight(
                    <>
                      Gibran wrote both poetry and prose. He wrote first in Arabic
                      and later began writing in English, quickly becoming popular
                      internationally. His best-read book is <i>The Prophet</i>,
                      which has been translated into forty languages and never gone
                      out of print since its first printing in 1923.
                    </>,
                  )}
                </p>
              </div>
            </div>

            <div className="mt-3 text-[16px] leading-relaxed text-black font-medium">
              <p>
                {highlight(
                  "Gibran wrote about love, religion, and friendship, but he is best known for his skills and ability to encourage readers of many different backgrounds. Gibran had a caring heart for all people. He did a great deal to make his poetry meaningful and helpful to others.",
                )}
              </p>

              <p>
                {highlight(
                  "In one of his books he says that half of what he said would probably not be remembered, but he wrote it all so that the readers can remember the other half. He was an artist of many types of visual art, poetry, prose, and philosophy during his life, but he is remembered the most for his famous books of poetry and prose.",
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="text-[15px] text-black text-left flex items-center justify-center">
          <img
            src={question}
            alt="Think about the reading questions"
            style={{ height: "150px", width: "60%" }}
          />
        </div>

        <div className="w-[60%] mt-3 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={comprehesion}
              alt="Comprehension section"
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

export default Unit8_Page2_ReadingSection_U8;
