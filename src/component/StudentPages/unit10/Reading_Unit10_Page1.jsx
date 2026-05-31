import page24 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/Page 92.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit10_Page2.css";
import sound1 from "../../../assets/audio/ClassBook/U10/PG 92/story10.mp3";
import sound2 from "../../../assets/audio/ClassBook/U10/PG 92/Pg92_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U10/PG 92/Pg92_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U10/PG 92/Pg92_1.3_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 6 unit 10 page 82.mp4";

const Reading_Unit10_Page1 = ({
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
      start: 0.14,
      end: 9.68,
      text: "Page 92. Building houses. Many different kinds of houses have been built in the world. This is the story of how one house was built.",
    },

    {
      start: 10.74,
      end: 18.56,
      text: "Building houses is a lot of work. First, a big hole is dug in the ground by machines, and the dirt is carried away by trucks.",
    },

    {
      start: 19.96,
      end: 30.0,
      text: "Starting a house is the most important part because the foundation, the bottom part of the house, is the most important part of building.",
    },

    {
      start: 30.0,
      end: 39.5,
      text: "Has the hole been dug? Yes, and now it's time to put in the concrete. This is a special material that is often used for the foundation.",
    },

    {
      start: 39.5,
      end: 48.5,
      text: "It helps make the house strong and long-lasting. The concrete is poured by a loud truck called a concrete mixer.",
    },

    {
      start: 48.5,
      end: 57.5,
      text: "Placing and smoothing the concrete as it comes out of the mixer is important to do. The builders must work quickly and carefully before the concrete dries.",
    },

    {
      start: 57.5,
      end: 65.76,
      text: "By using different materials to make houses, builders can make the house that the owner wants. Builders can use bricks, wood, or even concrete to make houses.",
    },

    {
      start: 66.86,
      end: 78.0,
      text: "Wood has been used for the house in the picture. Wood is good for places that are not too hot or too cold. The building is using a lot of wood.",
    },

    {
      start: 78.0,
      end: 88.0,
      text: "Luckily, there is a huge forest close by. Some of the pieces of wood are very heavy. They are held in place by a crane, and the builders nail the pieces together.",
    },

    {
      start: 88.0,
      end: 99.0,
      text: "This crane operator has a big job to do. Lifting the pieces of wood and getting them in exactly the right place is difficult to do.",
    },

    {
      start: 99.0,
      end: 111.0,
      text: "The builders have been working from a plan. Making the plan is what an architect does. The builders talk to the architect to make sure they are following his directions correctly.",
    },

    {
      start: 111.0,
      end: 121.0,
      text: "The architect also comes to see if the plans are being followed correctly. The builders and the architect must work well together.",
    },

    {
      start: 121.0,
      end: 135.91,
      text: "The house is almost finished now. The workers are putting on the roof. The chimneys were built with bricks. This is because the chimneys go down to fireplaces. When there is a fire in the fireplace, the fire and heat will not burn the bricks. Smoke and hot air from the fire in the fireplace will float up through the chimney.",
    },
  ];
  const clickableAreas = [
    { x1: 15.11, y1: 36, x2: 53.25, y2: 55.38, sound: sound2 },
    { x1: 55.18, y1: 33.89, x2:93.11, y2: 54.7, sound: sound3 },
    { x1: 54.75, y1: 66.38, x2: 93.11, y2: 87.5, sound: sound4 },
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

export default Reading_Unit10_Page1;
