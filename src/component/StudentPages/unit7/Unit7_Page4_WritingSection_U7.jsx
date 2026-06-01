import WritingA from "./Unit7_Page4_WritingA";
import WritingB from "./Unit7_Page4_WritingB";
import WritingC from "./Unit7_Page4_WritingC";
import ReadingBG from "../../../assets/imgs/pages/classbook/Writing.svg";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 4.svg";

const WritingSection_U7 = () => {
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
        <WritingC />
      </div>
    </div>
  );
};

export default WritingSection_U7;
