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
              My friends told me that{" "}
              <span className="text-[#f79631] font-medium">
                they wanted to go on a hike
              </span>
              .
            </p>
            <div className="grid grid-cols-2 gap-y-10 gap-x-20 mt-5 text-[17px] w-[650px]">
              <span>
                <b>1</b> a carnival was coming to town
              </span>
              <span>
                <b>2</b> it was time to go
              </span>
              <span>
                <b>3</b> they would come over tomorrow
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
              My friends said,
              <span className="text-[#f79631] font-medium">
                {" "}
                “We want to go on a hike.”
              </span>
            </p>
            <div className="grid grid-cols-2 gap-y-10 gap-x-20 mt-5 text-[17px] w-[650px]">
              <span>
                <b>1</b> “There’s a carnival coming to town.”
              </span>
              <span>
                <b>2</b> It’s time to go.”
              </span>
              <span>
                <b>3</b> “We’ll come over tomorrow.”
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
