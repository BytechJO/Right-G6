import React from "react";
import page_3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/Page 42.png";
import "./Unit5_Page3.css";
import GrammarSection_U1 from "./Unit5_Page3_GrammarSection_U1";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";

const Unit5_Page3 = ({ openPopup }) => {
  const openGrammar = () => {
    openPopup("html", <GrammarSection_U1 />);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();

      if (!event.repeat) {
        openGrammar();
      }
    }
  };

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
          role="button"
          tabIndex={0}
          aria-label="Open grammar activity"
          onClick={openGrammar}
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
  );
};

export default Unit5_Page3;
