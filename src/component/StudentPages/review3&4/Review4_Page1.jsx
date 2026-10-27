import page_1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/Page 36.png";
import "./Review4_Page1.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Review4_Page1 = ({ openPopup }) => {
  const openExercise = (startIndex) =>
    openPopup("exercise", { startIndex });

  const handleKeyDown = (event, startIndex) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) openExercise(startIndex);
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      {/* <img src={page_1} /> */}

      <div
        className="click-icon-review3-page1-1-p36 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open Review 4 exercise A"
          onClick={() => openExercise(38)}
          onKeyDown={(event) => handleKeyDown(event, 38)}
          style={{ overflow: "visible", cursor: "pointer" }}
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
        className="click-icon-review3-page1-2-p36 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          role="button"
          tabIndex={0}
          aria-label="Open Review 4 exercise B"
          onClick={() => openExercise(39)}
          onKeyDown={(event) => handleKeyDown(event, 39)}
          style={{ overflow: "visible", cursor: "pointer" }}
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

export default Review4_Page1;
