import page24 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/Page 38.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit4_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U4/PG 38/cd2pg38-story-adult-lady_NILS0ysY.mp3";
import sound2 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U4/PG 38/Pg38_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 6 unit 4 page 28.mp4";

const Reading_Unit4_Page1 = ({
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
const captionsExample = [
  {
    start: 0.66,
    end: 31.19,
    text: "Page 38. Tim's Birthday. If my brother Tim only knew what we had planned for him, he would be so excited. It's his birthday, and we are decorating the house. Signs are made and hung by my aunt and uncle. My aunt and uncle are very excited about Tim's birthday. My dad makes a banana cake. We will frost the cake together. My dad said if we had decorations, we could add those to the cake. I'm going to use some jelly beans to make some cowboy boots on the cake.",
  },
  {
    start: 32.47,
    end: 101.64,
    text: "The present that was made by me for my brother is lost. We look everywhere, and finally we find it in one of the dresser drawers in my room. Tim would be upset if he knew how close I came to losing his present. I'm very glad I found it, and I wrap it right away. Here comes Tim. He can see the decorations, but he doesn't know all the things we have planned. Tim is carrying a box of party hats. He thinks we're not doing much, so he wants to add to his birthday fun. He has made some special hats that we can wear. If he noticed all the preparations we are doing, he doesn't show it. He's too excited about the hats. All the fun hats, glasses, and masks that Tim made are tried on by us. They are fun to wear and make the birthday seem even more exciting. We get to pick out our favorite things to wear. Tim has his favorite cowboy hat and boots on. He loves to pretend he's a cowboy. Tim goes to his friend's house to help him walk his dogs, and we finish all the last-minute preparations. We finish getting the games ready, blow up balloons, frost the cake, and clean everything up.",
  },
  {
    start: 102.8,
    end: 116.4,
    text: "Finally, we're ready, and Tim comes back from his friend's house. Tim's friends arrive, and he is so surprised that he's having a big party. They are dressed in costume to add to the fun. Everyone is ready for a great party",
  }
];
  const clickableAreas = [
    { x1: 15.26, y1: 35.78, x2: 53.75, y2: 50.47, sound: sound2 },
    { x1: 55.60, y1: 36.14, x2: 94.07, y2: 50.13, sound: sound3 },
    { x1: 15.32, y1: 81.95, x2: 53.75, y2: 96.09, sound: sound4 },
    { x1: 55.60, y1: 78.90, x2: 94.07, y2: 95.93, sound: sound5 },
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
                <AudioWithCaption src={sound1} captions={captionsExample} />
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

export default Reading_Unit4_Page1;
