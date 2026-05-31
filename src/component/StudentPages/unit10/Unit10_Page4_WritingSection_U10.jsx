import WritingA from "./Unit10_Page4_WritingA";
import WritingB from "./Unit10_Page4_WritingB";
import ReadingBG from "../../../assets/imgs/pages/classbook/Writing.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/7.svg";

const WritingSection_U10 = () => {
  return (
    <div>
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
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
      </div>
    </div>
  );
};

export default WritingSection_U10;
