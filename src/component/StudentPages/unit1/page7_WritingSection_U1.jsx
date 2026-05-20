import WritingA from "./page7_WritingA";
import WritingB from "./page7_WritingB";
import WritingC from "./page7_WritingC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Writing.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 8.svg";

const WritingSection_U1 = () => {
  return (
    <div className="w-[100%] flex flex-col gap-5 justify-center items-center">
      {/* العنوان */}
      <div className="w-[60%] flex items-center">
           <img
                  src={ReadingBG}
                  style={{
                    height: "60px",
                    width: "auto",
                  }}
                />
      </div>

      {/* المحتوى */}
      <div className="w-[60%] flex flex-col space-y-2">
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
        <WritingA />
        <WritingB />
        <WritingC />
      </div>
    </div>
  );
};

export default WritingSection_U1;
