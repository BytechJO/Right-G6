import WritingA from "./Unit8_Page4_WritingA";
import WritingB from "./Unit8_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/pages/classbook/Writing.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 8 What Did He Say Folder/SVG/Asset 14.svg";

const WritingSection_U8 = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
        <img
          src={ReadingBG}
          style={{
            height: "70px",
            width: "auto",
          }}
        />
      </div>

      {/* المحتوى */}
      <div className="flex flex-col w-[60%] mx-auto space-y-10">
        <img
          src={img}
          alt=""
          style={{ width: "auto", height: "100%", objectFit: "contain" }}
        />
        <WritingA />
        <WritingB />
      </div>
    </div>
  );
};

export default WritingSection_U8;
