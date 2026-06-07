import React from "react";
import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/Page 88.png";

import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import "./Review9_Page1.css";

const Review9_Page1 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_1})` }}
    >
      {/* <img src={page_1} /> */}
      <div
        className="click-icon-review9-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 93 })}
          style={{ overflow: "visible" }}
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
        className="click-icon-review9-page1-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 94})}
          style={{ overflow: "visible" }}
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
      </div>{" "}
      <div
        className="click-icon-review9-page1-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 95 })}
          style={{ overflow: "visible" }}
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

export default Review9_Page1;
