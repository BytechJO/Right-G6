import React, { useState } from "react";
import QuestionAudioPlayer from "./QuestionAudioPlayer";

const Vocabulary = ({
  words = [],
  sound,
  captions,
  stopAtSecond,
  wordTimings = [],
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const mainAudioRef = React.useRef(null);

  if (words.length === 0) return null;
const stopHandlerRef = React.useRef(null);

const playWordAudio = (index) => {
  const audio = mainAudioRef.current;

  if (!audio || !wordTimings[index]) return;

  const { start, end } = wordTimings[index];

  // وقف أي تشغيل
  audio.pause();

  // احذف الليسنر القديم
  if (stopHandlerRef.current) {
    audio.removeEventListener("timeupdate", stopHandlerRef.current);
  }

  // انط للبداية
  audio.currentTime = start;

  // أنشئ handler جديد
  const stopAudio = () => {
    if (audio.currentTime >= end) {
      audio.pause();
      audio.removeEventListener("timeupdate", stopAudio);
    }
  };

  stopHandlerRef.current = stopAudio;

  // أضف الليسنر
  audio.addEventListener("timeupdate", stopAudio);

  // شغل
  audio.play();
};

  const columns = chunkWords(words, 3);
  const perCol = Math.ceil(words.length / 3);

  const activeIndex = wordTimings.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end,
  );

  return (
    <div className="relative bg-white/70 backdrop-blur-sm border-2 border-[#85ad40] rounded-2xl shadow-lg p-6 pt-8 w-full max-w-[60%] mt-8">
      {/* Header */}
      <div className="absolute top-0 left-0 bg-[#85ad40] text-white font-bold px-4 py-1 rounded-tl-2xl">
        VOCABULARY
      </div>
           
           <div className="flex flex-col gap-5">
      {/* Subtitle */}
      <h2 className="pl-4 mt-4 font-bold">
        Listen and repeat. Find the words and expressions in the conversation
        above.
      </h2>

      {/* Audio */}
      <QuestionAudioPlayer
        ref={mainAudioRef}
        src={sound}
        captions={captions}
        stopAtSecond={stopAtSecond}
        onTimeUpdate={(t) => setCurrentTime(t)}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3">
            {col.map((word, i) => {
              const num = colIndex * perCol + i + 1;
              const isActive = activeIndex === num - 1;

              return (
                <div
                  key={i}
                  onClick={() => playWordAudio(num - 1)}
                  className={`group flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 shadow-sm
${
  isActive
    ? "bg-[#85ad40] text-white border-[#85ad40] shadow-md scale-[1.02]"
    : "bg-[#eff2e5] hover:bg-[#85ad40] border-transparent hover:border-[#85ad40]"
}`}
                >
                  <div className="flex items-center">
                    <span
                      className={`font-bold text-sm mr-3 ${
                        isActive
                          ? "text-white"
                          : "text-[#85ad40] group-hover:text-white"
                      }`}
                    >
                      {num}.
                    </span>

                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-white"
                      }`}
                    >
                      {word}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

const chunkWords = (words, cols) => {
  const perCol = Math.ceil(words.length / cols);

  return Array.from({ length: cols }, (_, i) =>
    words.slice(i * perCol, (i + 1) * perCol),
  );
};

export default Vocabulary;