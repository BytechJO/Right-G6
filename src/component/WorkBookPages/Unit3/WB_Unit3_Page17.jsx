import React from "react";
import page2 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U3 Folder/Page 17.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit1_Page4 = ({ openPopup }) => {
  const openExercise = () => {
    openPopup("exercise", { startIndex: 21 });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        openExercise();
      }
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page2})` }}
    >
      <div
        className="q5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise"
          onClick={openExercise}
          onKeyDown={handleKeyDown}
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
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default WB_Unit1_Page4;
