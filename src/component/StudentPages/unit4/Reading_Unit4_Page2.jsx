import React, { useEffect, useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/Page 39.png";
import "./Reading_Unit4_Page1.css";

import sound1 from "../../../assets/audio/ClassBook/U4/PG 39/Pg39_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U4/PG 39/Pg39_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U4/PG 39/Pg39_1.8_Adult Lady.mp3";

const Reading_Unit4_Page2 = ({ audioRef, activeAudio, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);

  const clickableAreas = [
    {
      x1: 8.06,
      y1: 36.3,
      x2: 46.33,
      y2: 50.13,
      sound: sound1,
    },
    {
      x1: 53.28,
      y1: 36.3,
      x2: 91.75,
      y2: 50.13,
      sound: sound2,
    },
    {
      x1: 53.29,
      y1: 52.54,
      x2: 91.75,
      y2: 73.11,
      sound: sound3,
    },
  ];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;

    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  const playSound = (soundPath, index) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      audioRef.current.src = soundPath;

      setActiveAudio(`page2-${index}`);
      setIsPlaying(true);
      setHoveredAreaIndex(null);

      audioRef.current.play();

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHoveredAreaIndex(null);
        setActiveAudio(null);
      };
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{
        backgroundImage: `url(${page25})`,
      }}
    >
      {clickableAreas.map((area, index) => {
        const isActive = activeAudio === `page2-${index}`;

        return (
          <div
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`Play story section ${index + 1}`}
            aria-pressed={isActive}
            className={`clickable-area ${
              hoveredAreaIndex === index || isActive ? "highlight" : ""
            }`}
            style={{
              position: "absolute",
              left: `${area.x1}%`,
              top: `${area.y1}%`,
              width: `${area.x2 - area.x1}%`,
              height: `${area.y2 - area.y1}%`,
              cursor: "pointer",
            }}
            onClick={(event) => {
              event.stopPropagation();
              playSound(area.sound, index);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();

                if (!event.repeat) {
                  playSound(area.sound, index);
                }
              }
            }}
            onFocus={() => {
              if (!isPlaying) {
                setHoveredAreaIndex(index);
              }
            }}
            onBlur={() => {
              if (!isPlaying) {
                setHoveredAreaIndex(null);
              }
            }}
            onMouseEnter={() => {
              if (!isPlaying) {
                setHoveredAreaIndex(index);
              }
            }}
            onMouseLeave={() => {
              if (!isPlaying) {
                setHoveredAreaIndex(null);
              }
            }}
          />
        );
      })}

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit4_Page2;
