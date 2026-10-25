import { FaVolumeUp } from "react-icons/fa";
import React, { useState, useRef } from "react";
import QuestionAudioPlayer from "./QuestionAudioPlayer";

const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    event.stopPropagation();

    if (!event.repeat) {
      event.currentTarget.click();
    }
  },

  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const Vocabulary = ({
  words = [],
  sound,
  captions,
  stopAtSecond,
  wordTimings = [],
  pageId,
  keyboardAccessible = false,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [playingWord, setPlayingWord] = useState(null);

  // QuestionAudioPlayer
  const mainAudioRef = useRef(null);

  // صوت منفصل للكلمات
  const wordAudioRef = useRef(null);

  if (words.length === 0) return null;

  const playWordAudio = (index) => {
    const timing = wordTimings[index];
    const wordAudio = wordAudioRef.current;

    if (!timing || !wordAudio) return;

    // وقف الصوت الرئيسي إذا كان شغال
    if (
      mainAudioRef.current &&
      typeof mainAudioRef.current.pause === "function"
    ) {
      mainAudioRef.current.pause();
    }

    // وقف أي كلمة كانت شغالة
    wordAudio.pause();

    wordAudio.currentTime = timing.start;

    setPlayingWord(index);
    setCurrentTime(timing.start);

    const playPromise = wordAudio.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {
        setPlayingWord(null);
      });
    }
  };

  const handleWordTimeUpdate = () => {
    const audio = wordAudioRef.current;

    if (!audio || playingWord === null) return;

    const timing = wordTimings[playingWord];

    if (!timing) return;

    setCurrentTime(audio.currentTime);

    if (audio.currentTime >= timing.end) {
      audio.pause();

      setPlayingWord(null);
    }
  };

  const handleWordEnded = () => {
    setPlayingWord(null);
  };

  const handleMainTimeUpdate = (time) => {
    setCurrentTime(time);

    // إذا المستخدم شغّل الصوت الرئيسي،
    // ما نخلي حالة كلمة سابقة تضل active
    if (playingWord !== null) {
      const wordAudio = wordAudioRef.current;

      if (wordAudio && !wordAudio.paused) {
        return;
      }

      setPlayingWord(null);
    }
  };

  const columns = chunkWords(words, 3);
  const perCol = Math.ceil(words.length / 3);

  const activeIndex = wordTimings.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end,
  );

  return (
    <div
      data-vocab-access={keyboardAccessible || undefined}
      className="relative bg-white/70 backdrop-blur-sm border-2 border-[#85ad40] rounded-2xl shadow-lg p-6 pt-8 w-full max-w-[60%] mt-8"
    >
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

        {/* Main Audio */}
        <QuestionAudioPlayer
          pageId={pageId}
          ref={mainAudioRef}
          src={sound}
          captions={captions}
          stopAtSecond={stopAtSecond}
          onTimeUpdate={handleMainTimeUpdate}
        />

        {/* Hidden audio فقط لتشغيل الكلمات */}
        <audio
          ref={wordAudioRef}
          src={sound}
          preload="auto"
          onTimeUpdate={handleWordTimeUpdate}
          onEnded={handleWordEnded}
          style={{ display: "none" }}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {col.map((word, i) => {
                const num = colIndex * perCol + i + 1;
                const wordIndex = num - 1;

                const isActive =
                  playingWord !== null
                    ? playingWord === wordIndex
                    : activeIndex === wordIndex;

                return (
                  <div
                    key={i}
                    {...(keyboardAccessible
                      ? {
                          role: "button",
                          tabIndex: 0,
                          "data-vocab-word": true,
                          "aria-label": `Hear ${word}`,
                          ...activationKeys,
                        }
                      : {})}
                    onClick={() => playWordAudio(wordIndex)}
                    style={{
                      position: "relative",
                    }}
                    className={`group flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 shadow-sm ${
                      isActive
                        ? "bg-[#85ad40] text-white border-[#85ad40] shadow-md scale-[1.02]"
                        : "bg-[#eff2e5] hover:bg-[#85ad40] border-transparent hover:border-[#85ad40]"
                    }`}
                  >
                    {playingWord === wordIndex && (
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "white",
                          color: "black",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <FaVolumeUp size={12} />
                      </span>
                    )}

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
