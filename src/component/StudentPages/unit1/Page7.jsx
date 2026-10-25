import page_7 from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/Page7.png";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import "./Page7.css";
import WritingSection_U1 from "./page7_WritingSection_U1";

const Page7 = ({ openPopup }) => {
  const openWriting = () => {
    openPopup("html", <WritingSection_U1 />);
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_7})` }}
    >
      <div
        className="headset-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open writing activity"
          onClick={openWriting}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openWriting();
            }
          }}
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

export default Page7;
