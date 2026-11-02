import React from "react";
import page_4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/Page 85.png";
import "./Unit10_Page4.css";
import WritingSection_U10 from "./Unit10_Page4_WritingSection_U10";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit10_Page4 = ({ openPopup }) => {
  const openWriting = () => {
    openPopup("html", <WritingSection_U10 />);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        openWriting();
      }
    }
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_4})` }}
    >
      <div
        className="headset-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open writing section"
          onClick={openWriting}
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

export default Unit10_Page4;
