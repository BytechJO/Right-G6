import React, { useEffect, useRef, useState } from "react";
import page3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/Page3.png";

import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import unit1Audio from "../../../assets/audio/titel G6/Unit 6.mp3";
import unit2Audio from "../../../assets/audio/titel G6/Unit 7.mp3";
import unit3Audio from "../../../assets/audio/titel G6/Unit 8.mp3";
import unit4Audio from "../../../assets/audio/titel G6/Unit 9.mp3";
import unit5Audio from "../../../assets/audio/titel G6/Unit 10.mp3";

const Page3 = ({ goToUnit }) => {
  const audioRef = useRef(null);
  const [playingUnit, setPlayingUnit] = useState(null);

  const clickableAreas = [
    {
      title: "Unit 6",
      startIndex: 46,
      audio: unit1Audio,
      top: "9%",
      left: "12%",
      width: "31%",
      height: "4%",
      arrowTop: "10%",
      arrowLeft: "43.5%",
    },
    {
      title: "Unit 7",
      startIndex: 58,
      audio: unit2Audio,
      top: "26%",
      left: "12%",
      width: "31%",
      height: "4%",
      arrowTop: "27%",
      arrowLeft: "43.5%",
    },
    {
      title: "Unit 8",
      startIndex: 64,
      audio: unit3Audio,
      top: "43%",
      left: "12%",
      width: "29%",
      height: "4%",
      arrowTop: "44%",
      arrowLeft: "41.5%",
    },
    {
      title: "Unit 9",
      startIndex: 76,
      audio: unit4Audio,
      top: "61%",
      left: "12%",
      width: "28%",
      height: "4%",
      arrowTop: "62%",
      arrowLeft: "40.5%",
    },
    {
      title: "Unit 10",
      startIndex: 82,
      audio: unit5Audio,
      top: "78%",
      left: "12%",
      width: "40%",
      height: "4%",
      arrowTop: "79%",
      arrowLeft: "52.5%",
    },
  ];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
      audioRef.current = null;
    }

    setPlayingUnit(null);
  };

  const playUnitAudio = (area) => {
    stopAudio();

    if (!area.audio) return;

    const audio = new Audio(area.audio);
    audioRef.current = audio;

    setPlayingUnit(area.title);

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingUnit(null);
      }
    };

    audio.play().catch(() => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setPlayingUnit(null);
      }
    });
  };

  const handleGoToUnit = (area) => {
    stopAudio();
    goToUnit(area.startIndex);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.onended = null;
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="page1-img-wrapper"
      style={{
        backgroundImage: `url(${page3})`,
        position: "relative",
      }}
      role="group"
      aria-label="Book contents. Choose a unit to listen or navigate."
    >
      {clickableAreas.map((area) => (
        <React.Fragment key={area.title}>
          {/* UNIT AUDIO AREA */}
          <button
            type="button"
            onClick={() => playUnitAudio(area)}
            aria-label={`Play ${area.title} audio`}
            aria-pressed={playingUnit === area.title}
            className={`absolute cursor-pointer transition-all duration-150
              bg-transparent
              hover:bg-transparent
              focus:bg-transparent
              focus-visible:bg-transparent
              ${
                playingUnit === area.title
                  ? "ring-4 ring-green-500"
                  : "hover:ring-2 hover:ring-blue-400"
              }
            `}
            style={{
              top: area.top,
              left: area.left,
              width: area.width,
              height: area.height,
              background: "transparent",
              border: "none",
              borderRadius: "8px",
            }}
          >
            {playingUnit === area.title && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-25px",
                  left: "0",
                  background: "#16a34a",
                  color: "#fff",
                  padding: "2px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                🔊 Playing
              </span>
            )}
          </button>

          {/* NAVIGATION ARROW */}
          <button
            type="button"
            onClick={() => handleGoToUnit(area)}
            aria-label={`Go to ${area.title}`}
            className="
              absolute z-20
              flex items-center justify-center
              p-0 bg-transparent border-0
              cursor-pointer
              transition-all duration-150
              hover:scale-110
              active:scale-95
              rounded-full
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-blue-500
            "
            style={{
              top: area.arrowTop,
              left: area.arrowLeft,
              width: "18px",
              height: "18px",
              minWidth: "18px",
              minHeight: "18px",
              maxWidth: "18px",
              maxHeight: "18px",
              padding: 0,
            }}
          >
            <img
              src={arrowBtn}
              alt=""
              className="w-full h-full object-contain pointer-events-none"
            />
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Page3;
