import React from "react";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 7.svg";

const GrammarA = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>A</span>
          Read, change, and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mt-7">
          <img src={img} alt="" style={{ width: "40px", height: "40px", marginTop: -6 }} />
          <div>
            <p className="text-[18px]">
              Mandy is so{" "}
              <span className="text-[#f79631] font-medium">excited</span>
              {" "}that she is{" "}
              <span className="text-[#f79631] font-medium">jumping up and down</span>.
            </p>
            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span><b>1</b> bored, falling asleep</span>
              <span><b>2</b> late, running to catch the bus</span>
              <span><b>3</b> happy, smiling and laughing</span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img src={img} alt="" style={{ width: "40px", height: "40px", marginTop: -6 }} />
          <div>
            <p className="text-[18px]">
              They are such{" "}
              <span className="text-[#f79631] font-medium">expert painters</span>
              {" "}that they{" "}
              <span className="text-[#f79631] font-medium">painted the President's house</span>.
            </p>
            <div className="grid grid-cols-2 gap-10 mt-5 text-[17px]">
              <span><b>1</b> fast readers, read one book a day</span>
              <span><b>2</b> careful workers, checked their work three times</span>
              <span><b>3</b> quick runners, each won their races</span>
              <span><b>4</b> good students, got A's on their tests</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GrammarA;