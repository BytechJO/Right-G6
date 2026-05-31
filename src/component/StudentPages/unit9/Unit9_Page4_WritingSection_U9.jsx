import WritingA from "./Unit9_Page4_WritingA";
import WritingB from "./Unit9_Page4_WritingB";
import WritingC from "./Unit9_Page4_WritingC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Writing.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 9 How Long Have You Been Folder/SVG/Asset 7.svg";

const WritingSection_U9 = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-2 flex items-center">
        <img
          src={ReadingBG}
          style={{
            height: "60px",
            width: "auto",
          }}
        />
      </div>

      {/* المحتوى */}
      <div className="flex flex-col w-[60%] mx-auto space-y-12">
        <img
          src={img}
          alt=""
          style={{ width: "auto", height: "500px", objectFit: "contain" }}
        />
        <WritingA />
        <WritingB />
        <WritingC />
      </div>
    </div>
  );
};

export default WritingSection_U9;
