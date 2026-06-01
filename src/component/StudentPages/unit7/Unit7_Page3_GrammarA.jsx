import React from "react";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 7.svg";

const GrammarA = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read, change, and say. Replace the highlighted words with the new
          words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />
          <div>
            <p className="text-[18px]">
              If the world hadn’t entered the Space Race,{" "}
              <span className="text-[#f79631] font-medium">
                the exploration of space would have been slower
              </span>{" "}
              .
            </p>
            <div className="grid grid-cols-1 gap-y-10 gap-x-20 mt-5 text-[17px] w-[650px]">
              <span>
                <b>1</b> there wouldn’t have been a space station
              </span>
              <span>
                <b>2</b> we wouldn’t have learned about the moon
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />
          <div>
            <p className="text-[18px]">
              If Tim had{" "}
              <span className="text-[#f79631] font-medium">seen the movie</span>{" "}
              , he could have told us about it.
            </p>
            <div className="grid grid-cols-3 gap-y-10 gap-x-20 mt-5 text-[17px] w-[650px]">
              <span>
                <b>1</b> called us earlier
              </span>
              <span>
                <b>2</b> studied the chapter
              </span>
              <span>
                <b>3</b> read the note
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
