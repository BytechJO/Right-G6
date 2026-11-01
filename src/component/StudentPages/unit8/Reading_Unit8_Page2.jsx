import React, { useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/Page 75.png";
import "./Reading_Unit8_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U8/PG 75/Pg75_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U8/PG 75/Pg75_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U8/PG 75/Pg75_1.8_Adult Lady.mp3";

const Reading_Unit8_Page2 = ({ audioRef, activeAudio, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const clickableAreas = [
    { x1: 10.27, y1: 33.63, x2: 47.49, y2: 50.81, sound: sound1 },
    { x1: 51.58, y1: 25.26, x2: 89.5, y2: 50.64, sound: sound2 },
    { x1: 52.52, y1: 56, x2: 90.58, y2: 73.5, sound: sound3 },
  ];

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };

  const playSound = (soundPath) => {
    if (audioRef.current) {
      audioRef.current.src = soundPath;
      audioRef.current.play();

      setIsPlaying(true);
      setHoveredAreaIndex(null);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHoveredAreaIndex(null);
        setActiveAudio(null);
      };
    }
  };

  const playAreaAudio = (index, sound) => {
    setActiveAudio(`page2-${index}`);
    playSound(sound);
  };

  const handleKeyDown = (event, index, sound) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        playAreaAudio(index, sound);
      }
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page25})` }}
    >
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          aria-label={`Play reading section ${index + 1}`}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAudio === `page2-${index}`
              ? "highlight"
              : ""
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
            playAreaAudio(index, area.sound);
          }}
          onKeyDown={(event) => handleKeyDown(event, index, area.sound)}
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
      ))}

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit8_Page2;
