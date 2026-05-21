import page24 from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/Page 20.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit2_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U2/PG 20/reading.mp3";
import sound2 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U2/PG 20/Pg20_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video from "../../../assets/videos/grade 6 unit 1 page 4.mp4";

const Reading_Unit2_Page1 = ({
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
    start: 0.32,
    end: 3.0,
    text: "Page 20. Best sisters.",
  },
  {
    start: 3.7,
    end: 18.74,
    text: "Carla and Louisa are sisters. Carla is eleven years old, and Louisa is eight. They are the only children in their family. They have been best friends for as long as they can remember. The sisters play together all the time.",
  },
  {
    start: 18.8,
    end: 29.27,
    text: "Carla and Louisa go to the park. Carla is pushing Louisa on the swing, and they are having such a good time that they are laughing and smiling.",
  },
  {
    start: 29.32,
    end: 38.6,
    text: "A girl walks over to them. Louisa hasn't seen her before, but Carla knows her right away. It is Erin, Carla's friend from school.",
  },
  {
    start: 38.629,
    end: 45.85,
    text: "\"Hello, Carla,\" says Erin. \"Have you tried the big new slide yet? It's so fast that I felt like I was on a roller coaster.\"",
  },
  {
    start: 46.81,
    end: 52.68,
    text: "\"No, I haven't,\" answers Carla. \"Do you want to show it to me? It would be fun to try it together.\"",
  },
  {
    start: 54.0,
    end: 56.68,
    text: "Carla and Erin run to another part of the park.",
  },
  {
    start: 57.82,
    end: 66.35,
    text: "Louisa does not go with them. She feels very sad. \"Carla has found a friend that she likes better than me,\" Louisa thinks to herself.",
  },
  {
    start: 67.0,
    end: 76.24,
    text: "The next day, Erin comes over to play with Carla. They sing songs and play games. Louisa's mom reads her a story, but Louisa is still sad.",
  },
  {
    start: 76.66,
    end: 80.94,
    text: "She feels all alone. \"What's wrong, honey?\" asks Mama.",
  },
  {
    start: 81.8,
    end: 91.76,
    text: "\"Carla is having so much fun with Erin that she doesn't want to play with me anymore,\" said Louisa. \"They are such good friends that Carla doesn't have time for me.\"",
  },
  {
    start: 92.79,
    end: 101.38,
    text: "\"Carla still loves you,\" said Mama, \"but she has friends her own age too.\" Mama takes Louisa to play in the park.",
  },
  {
    start: 101.86,
    end: 114.31,
    text: "Louisa swings on the swings. She starts to get off when a girl close to Louisa's age comes over to her. \"Hi, my name is Karen,\" the girl says. \"My name is Louisa,\" Louisa answers.",
  },
  {
    start: 114.89,
    end: 124.76,
    text: "\"Have you played on the new slide yet?\" asks Karen. Louisa says, \"No, but I'd love to try it.\" The girls tell their moms and run over to the slide.",
  },
  {
    start: 125.3,
    end: 138.42,
    text: "Louisa and Karen have such an enjoyable time together. They laugh, talk, play, and sing songs. Louisa starts thinking about what Mama had said. It is nice for Louisa to have a friend her own age.",
  },
  {
    start: 138.46,
    end: 152.26,
    text: "Karen has to go home, but the two friends talk about meeting in the park again soon. Louisa has made a new friend. Carla meets Louisa and Mama at the park, and Louisa tells her sister all about her new friend.",
  },
  {
    start: 152.74,
    end: 160.79,
    text: "Carla is happy for Louisa. \"It's so nice to have a new friend,\" explains Louisa, \"but you will always be my best friend.\"",
  },
  {
    start: 161.489,
    end: 168.17,
    text: "\"Yes, I will,\" agrees Carla. \"We are best sisters. How would you like to go on the slide together?\"",
  },
];
  const clickableAreas = [
    { x1: 15.27, y1: 36.14, x2: 53.55, y2: 50.45, sound: sound2 },
    { x1: 55.4, y1: 36.14, x2: 93.81, y2: 50.45, sound: sound3 },
    { x1: 15.29, y1: 74.72, x2: 53.75, y2: 95.97, sound: sound4 },
    { x1: 55.39, y1: 74.72, x2: 94.08, y2: 95.97, sound: sound5 },
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
                  <source src={video} type="video/mp4" />
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

export default Reading_Unit2_Page1;
