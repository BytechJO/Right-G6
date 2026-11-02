import React from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/Page 34.png";
import "./Review3_Page1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
// import Unit4_Page6_Q2 from "./Unit4_Page6_Q2";
const Review3_Page1 = ({ openPopup }) => {
  const openExercise = (startIndex) =>
    openPopup("exercise", { startIndex });

  const handleKeyDown = (event, startIndex) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) openExercise(startIndex);
  };

  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_1})` }}
    >
      {/* <img src={page_1} /> */}
      <div
        className="click-icon-review4-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open Review 3 exercise A"
          onClick={() => openExercise(32)}
          onKeyDown={(event) => handleKeyDown(event, 32)}
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
      <div
        className="click-icon-review4-page1-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open Review 3 exercise B"
          onClick={() => openExercise(33)}
          onKeyDown={(event) => handleKeyDown(event, 33)}
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
      <div
        className="click-icon-review4-page1-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open Review 3 exercise C"
          onClick={() => openExercise(34)}
          onKeyDown={(event) => handleKeyDown(event, 34)}
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

export default Review3_Page1;
