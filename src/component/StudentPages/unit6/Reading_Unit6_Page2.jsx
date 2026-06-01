import React, { useEffect, useState } from "react";
import page25 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/Page 57.png";
import "./Reading_Unit6_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U6/PG 57/Pg57_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/audio/ClassBook/U6/PG 57/Pg57_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U6/PG 57/Pg57_1.8_Adult Lady.mp3";
const Reading_Unit6_Page2 = ({ audioRef, activeAudio, setActiveAudio }) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
  const clickableAreas = [
    
    { x1: 51.65, y1:7.82, x2: 94.21, y2: 41.27, sound: sound2 },
    { x1: 51.65, y1: 43.38, x2: 94.21, y2: 76.97, sound: sound3 },
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
      setHoveredAreaIndex(null); // إزالة الهايلايت عند بدء الصوت

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
      style={{ backgroundImage: `url(${page25})` }}
    >
      {/* <img
        src={page25}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
          key={index}
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
          }}
          onClick={() => {
            setActiveAudio(`page2-${index}`);
            playSound(area.sound);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit6_Page2;
