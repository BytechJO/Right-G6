import page24 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/Page 56.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit6_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U6/PG 56/cd3pg56-story.mp3";
import sound2 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U6/PG 56/Pg56_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 6 unit 6 page 46.mp4";

const Reading_Unit6_Page1 = ({
  openPopup,
  audioRef,
  activeAudio,
  setActiveAudio,
}) => {
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setActiveAudio(null);
  }, [setActiveAudio]);
const captions = [
  {
    start: 0.2,
    end: 81.46,
    text: "Page 56: Bonita's Neighborhood Garden. Bonita used to get bored at home, but lately there was a big building being built, and Bonita got to watch from her window. By now, Bonita was used to the noise of the big machines. Sometimes Bonita, her friend Agnes, and Bonita's aunt Florence went across the street to watch the building. There was a crane, and there were big machines moving and digging. \"There will be a place for a garden by the new building, won't there?\" Bonita asked worriedly. \"Yes. In fact, it'll be right where you're standing. It'll be next to the playground,\" the builder replied. Bonita just had to ask, \"There will be room for a big neighborhood garden, won't there?\" Bonita was used to gardening, and she loved it. For two months, the builders worked on the garden and the playground. Where there used to be dirt and machines, there was now a beautiful park and an area for a garden. Every day that spring, Bonita and her neighbors worked hard in the garden together. \"We planted enough vegetables to feed all of us, didn't we?\" asked Bonita. \"Yes, and when they are ready, we can have a big party to pick them and eat them,\" said Aunt Florence. Bonita and her friends began planning for the party. They painted some of the garden walls with pretty pictures.",
  },
  {
    start: 82.5,
    end: 93.54,
    text: "Aunt Florence and Mama were planning for the party also. They were used to cooking large meals for all relatives, so they planned a big meal for the neighborhood with all the garden vegetables.",
  },
  {
    start: 94.86,
    end: 126.87,
    text: "Once the vegetables were ready, Bonita and her friends picked them. Then Mama and Aunt Florence cooked many wonderful foods. By Saturday, everything was ready. \"There's going to be enough food, isn't there?\" worried Bonita. \"There will be plenty of food,\" Aunt Florence said. \"You and your friends have done a great job, Bonita,\" said Mama. Everyone enjoyed the great food, the beautiful flowers, and the paintings on the walls of the garden. \"We all worked together to make it special,\" Bonita said. \"That is the best part of all.\"",
  },
];

  const clickableAreas = [
    { x1: 14.47, y1: 32.93, x2: 52.73, y2: 51.07, sound: sound2 },
    { x1: 55.62, y1: 30.37, x2: 94.07, y2: 50.93, sound: sound3 },
    { x1: 14.47, y1: 83.72, x2: 52.73, y2: 96.43, sound: sound4 },
    { x1: 55.80, y1: 53.98, x2: 93.86, y2: 96.25, sound: sound5 },
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
      style={{ backgroundImage: `url(${page24})` }}
    >
      {/* <img
        src={page24}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            hoveredAreaIndex === index || activeAudio === `page1-${index}`
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
            setActiveAudio(`page1-${index}`);
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

      <div
        className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setActiveAudio(null);
            openPopup(
              "audio",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <AudioWithCaption src={sound1} captions={captions} />
              </div>,
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="pauseBtn-icon-CD-page21 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setActiveAudio(null);
            openPopup(
              "video",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <video
                  autoPlay
                  controls
                  style={{
                    width: "auto",
                    height: "80%",
                    objectFit: "fill",
                    borderRadius: "20px",
                  }}
                >
                  <source src={video3} type="video/mp4" />
                </video>
              </div>,
            );
          }}
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Reading_Unit6_Page1;
