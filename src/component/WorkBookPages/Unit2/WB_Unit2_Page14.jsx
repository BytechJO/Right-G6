import React from "react";
import page_3 from "../../../assets/imgs/pages/workbook/Right Int WB G6 U2 Folder/Page 14.png";
import "./WB_unit1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit1_Page8 = ({ openPopup }) => {
  const handleKeyDown = (event, startIndex) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        openPopup("exercise", { startIndex });
      }
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_3})` }}
    >
      {/* Exercise 1 */}
      <div
        className="q11-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise 1"
          onClick={() => openPopup("exercise", { startIndex: 15 })}
          onKeyDown={(event) => handleKeyDown(event, 15)}
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

      {/* Exercise 2 */}
      <div
        className="q12-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise 2"
          onClick={() => openPopup("exercise", { startIndex: 16 })}
          onKeyDown={(event) => handleKeyDown(event, 16)}
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

export default WB_Unit1_Page8;
