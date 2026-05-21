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
          Read, change, and say. Replace the highlighted words with the new words.
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
            <p className="text-[18px] ml-2.5">
              If Sharon{" "}
              <span className="text-[#f79631]">went to the store first</span>,
              she{" "}
              <span className="text-[#f79631]">would have everything she needs</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 ml-2.5 text-[17px]">
              <span>
                <b>1</b> called her grandparents, would know they want her to visit
              </span>
              <span>
                <b>2</b> typed the letter, would e-mail it right away
              </span>
              <span>
                <b>3</b> saw the show, would like it
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
              If I{" "}
              <span className="text-[#f79631]">knew how they made it</span>, I{" "}
              <span className="text-[#f79631]">would tell you</span>.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span>
                <b>1</b> were rich, would buy everyone a car
              </span>
              <span>
                <b>2</b> found your computer, would bring it to you
              </span>
              <span>
                <b>3</b> rode a horse everywhere, would not need my bike
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;