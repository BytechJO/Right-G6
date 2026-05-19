import { useState } from "react";
import ActionButtons from "../../ActionButtons";
const ComprehensionA = () => {
  const initialAnswers = {
    monkey: ["", "", ""],
    konaki: ["", "", ""],
  };

  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);

  // handle input
  const handleChange = (section, index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };



  // reset
  const handleReset = () => {
    setAnswers(initialAnswers);
    setErrors({});
    setLocked(false);
  };

  const renderSection = (title, key) => (
    <div className="flex-1">
      <h3 className="text-center font-semibold mb-5 text-[16px]">
        {title}
      </h3>

      <div className="flex flex-col items-center gap-5 w-full">
        {answers[key].map((value, index) => (
          <div key={index} className="relative w-[80%]">
            <input
              type="text"
              value={value}
              disabled={locked || errors[key]?.[index] === false}
              onChange={(e) =>
                handleChange(key, index, e.target.value)
              }
              className={`w-full border-b-1 bg-transparent outline-none text-center text-[16px] pb-1
                ${
                  errors[key]?.[index]
                    ? "border-red-500"
                    : "border-black"
                }`}
            />

   
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mb-6 mx-auto max-w-5xl">
      {/* Title */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">A</span>
        Write down three facts about each festival.
      </h5>

      {/* Main Layout */}
      <div className="flex gap-2">
        {renderSection("Monkey Buffet Festival", "monkey")}
        {renderSection("Konaki Sumo", "konaki")}
      </div>

<div className="mt-10">
      <ActionButtons
        onReset={handleReset}
    
      />
   </div>
    </div>
  );
};

export default ComprehensionA;
