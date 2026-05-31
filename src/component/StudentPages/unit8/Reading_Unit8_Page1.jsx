import page24 from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/Page 74.png";
import React, { useEffect, useState } from "react";
import "./Reading_Unit8_Page1.css";
import sound1 from "../../../assets/audio/ClassBook/U8/PG 74/cd4pg74-story-adult-lady_F0o8kemk.mp3";
import sound2 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/audio/ClassBook/U8/PG 74/Pg74_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/Page 01/Right Video Button.svg";
import video3 from "../../../assets/videos/grade 6 unit 8 page 64.mp4";

const Reading_Unit8_Page1 = ({
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
      end: 12.8,
      text: "Page 74, Cleaning Lake Otto. Today was a special day for my class. We were going on a trip to the lake. Mrs. Baca, our teacher, said that Mr. Hernandez was going to lead us on the trip.",
    },
    {
      start: 13.83,
      end: 131.32,
      text: "Good morning, said Mr. Hernandez. He said that he wanted to tell us about his job and how we could help him. He said that his job was to make sure that the lakes and rivers in our town are clean. He said that was hard work, and he needed our help to be sure everything was done. Lake Otto is where I really need help. If people had taken better care of Lake Otto, it would not have gotten so bad. Because people have thrown trash in and around it, we need to clean it. I'm hoping that today you can help me take samples of the water. We'll take notes and pictures of what we see. Then we'll pick up trash around the lake. Mr. Hernandez said that if people had taken better care of the Earth, we would not have so many serious problems. After Mr. Hernandez's great speech, we were ready to go. We went out to the school bus. Our ride to Lake Otto only took 20 minutes. We got out of the bus and walked to the lake. Mrs. Baca told us that we should be careful at the lake. She wanted us to stay with the group and listen to Mr. Hernandez. The lake looked very dirty. People had not taken care of it, and there was lots of trash. I realized how sad it would be if all the animals and fish disappeared. There wouldn't be a way to get those living things back again. We all got to work. Jimmy, Mitchell, and I took notes on a clipboard. We wrote down everything we saw and took pictures with Mr. Hernandez's camera. I took a picture of a big oil drum. It was making the water black. Some students put lake water in jars. Mr. Hernandez said he would look at these samples in the building where he works. He has special machines that help to tell him how dirty the water is. Next, Mrs. Baca gave each student a pair of gloves and a big plastic bag. Mr. Hernandez told us to pick up trash around the lake. We filled all our bags very quickly. If I hadn't seen the lake when we first started, I wouldn't have believed all the trash we picked up.",
    },
    {
      start: 132.63,
      end: 146.66,
      text: 'The best part was that when we were done, the lake looked so much nicer. When we got back to school, we talked about what we learned. "I learned that if we don\'t start taking care of Lake Otto, we will lose the animals and fish that are living there," said Miguel.',
    },
    {
      start: 147.71,
      end: 187.5,
      text: '"I learned that keeping a lake clean is hard work," said Trisha. After we talked, we worked in groups. We wrote about our day. I worked with Jimmy and Natasha on the computer. We used the notes we took to help us write about our experience. Mr. Hernandez sent us copies of the pictures, and we put some of those in also. A few days later, the pictures came from Mr. Hernandez. He sent us some pictures of a lake in another town that had never been cleaned up. He said if we hadn\'t cleaned up Lake Otto, in another year or so, the lake would have looked like the lake in the picture. We decided to have another cleanup day in three months to check on how Lake Otto was doing.',
    },
  ];
  const clickableAreas = [
    { x1: 13.39, y1: 29.66, x2: 51.31, y2: 50.81, sound: sound2 },
    { x1: 55.62, y1: 29.66, x2: 93.75, y2: 50.13, sound: sound3 },
    { x1: 13.39, y1: 70.95, x2: 51.31, y2: 96.33, sound: sound4 },
    { x1: 55.83, y1: 76.87, x2: 93.54, y2: 95.32, sound: sound5 },
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

export default Reading_Unit8_Page1;
