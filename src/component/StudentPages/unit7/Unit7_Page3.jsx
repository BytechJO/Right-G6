import React from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/Page 583.png";
import "./Unit7_Page3.css";
import GrammarSection_U7 from "./Unit7_Page3_GrammarSection_U7";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit7_Page3 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_3})` }}
    >
      <div
        className="headset-icon-CD-page6 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("html", <GrammarSection_U7 />)}
          style={{ overflow: "visible" }}
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
  );
};

export default Unit7_Page3;
