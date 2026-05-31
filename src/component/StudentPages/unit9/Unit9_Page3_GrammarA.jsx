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
              Our family has been{" "}
              <span className="text-[#f79631] font-medium">
                saving for a vacation
              </span>
              .
            </p>
            <div className="grid grid-cols-2 gap-y-10 gap-x-20 mt-5 text-[17px] w-[650px]">
              <span>
                <b>1</b> working in the garden this week
              </span>
              <span>
                <b>2</b> hiking in the mountains
              </span>
              <span>
                <b>3</b> cleaning the house today
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
              Have you been{" "}
              <span className="text-[#f79631] font-medium">
                waiting very long
              </span>{" "}
              ?
            </p>
            <div className="grid grid-cols-2 gap-y-10 gap-x-20 mt-5 text-[17px] w-[650px]">
              <span>
                <b>1</b> shopping for groceries yet
              </span>
              <span>
                <b>2</b> studying for your math test today
              </span>
              <span>
                <b>3</b> talking with Grandmother
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
