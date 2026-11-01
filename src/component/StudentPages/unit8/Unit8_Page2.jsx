import React from "react";
import page_5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/Page 65.png";
import "./Unit8_Page2.css";

import ReadingSection_U8 from "./Unit8_Page2_ReadingSection_U8";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit8_Page2 = ({ openPopup }) => {
  const openReading = () => {
    openPopup("html", <ReadingSection_U8 />);
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
          className="click-icon-unit2-page2-1 hover:scale-110 transition"
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

export default Unit8_Page2;
