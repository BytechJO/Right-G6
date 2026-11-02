import React from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/Page 52.png";
import "./Review5_Page1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Review5_Page1 = ({ openPopup }) => {
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
      style={{ backgroundImage: `url(${page_1})` }}
    >
      {/* Exercise 1 */}
      <div
        className="click-icon-review5-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open review exercise 1"
          onClick={() => openExercise(52)}
          onKeyDown={(event) => handleKeyDown(event, 52)}
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

      {/* Exercise 2 */}
      <div
        className="click-icon-review5-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open review exercise 2"
          onClick={() => openExercise(53)}
          onKeyDown={(event) => handleKeyDown(event, 53)}
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

export default Review5_Page1;
