import React from "react";
import page_2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/Page 37.png";
import "./Review4_Page2.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
// import Unit4_Page6_Q2 from "./Unit4_Page6_Q2";
const Review4_Page2 = ({ openPopup }) => {
  const openExercise = () => openPopup("exercise", { startIndex: 40 });

  const handleKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) openExercise();
  };

  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_2})` }}
    >
      {/* <img src={page_2} /> */}

      <div
        className="click-icon-review3-page2-2-p37 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open Review 4 exercise C"
          onClick={openExercise}
          onKeyDown={handleKeyDown}
          style={{ overflow: "visible", cursor: "pointer" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    
    </div>
  );
};

export default Review4_Page2;
