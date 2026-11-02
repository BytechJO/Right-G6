import React from "react";
import page_6 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/Page 586.png";

import "./Unit7_Page6.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit7_Page6 = ({ openPopup }) => {
  const openExercise = (startIndex) => {
    openPopup("exercise", { startIndex });
  };

  const handleKeyDown = (event, startIndex) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        openExercise(startIndex);
      }
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_6})` }}
    >
      <div
        className="click-icon-unit7-page6-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise 1"
          onClick={() => openExercise(64)}
          onKeyDown={(event) => handleKeyDown(event, 64)}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
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
        className="click-icon-unit7-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise 2"
          onClick={() => openExercise(65)}
          onKeyDown={(event) => handleKeyDown(event, 65)}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
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

export default Unit7_Page6;
