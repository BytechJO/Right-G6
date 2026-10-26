import page_5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 3 I Would If I Could Folder/Page 26.png";
import "./Unit3_Page5.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit3_Page5 = ({ openPopup }) => {
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
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* Exercise 1 */}
      <div
        className="click-icon-unit3-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise 1"
          onClick={() => openPopup("exercise", { startIndex: 21 })}
          onKeyDown={(event) => handleKeyDown(event, 21)}
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
        className="click-icon-unit3-page5-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise 2"
          onClick={() => openPopup("exercise", { startIndex: 22 })}
          onKeyDown={(event) => handleKeyDown(event, 22)}
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

      {/* Exercise 3 */}
      <div
        className="click-icon-unit3-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open exercise 3"
          onClick={() => openPopup("exercise", { startIndex: 23 })}
          onKeyDown={(event) => handleKeyDown(event, 23)}
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

export default Unit3_Page5;
