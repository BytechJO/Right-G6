import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/Page 762.png";
import "./Unit9_Page2.css";

import ReadingSection_U9 from "./Unit9_Page2_ReadingSection_U9.jsx";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit9_Page2 = ({ openPopup }) => {
  const openReading = () => {
    openPopup("html", <ReadingSection_U9 />);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        openReading();
      }
    }
  };

  return (
    <>
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page_5})` }}
      >
        <div
          className="click-icon-page5 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            role="button"
            tabIndex={0}
            aria-label="Open reading section"
            onClick={openReading}
            onKeyDown={handleKeyDown}
            style={{
              overflow: "visible",
              cursor: "pointer",
            }}
          >
            <image
              className="svg-img"
              href={audioBtn}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Unit9_Page2;
