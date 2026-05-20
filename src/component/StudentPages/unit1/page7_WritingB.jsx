import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";
const WritingB = () => {
  const [answers, setAnswers] = useState({
    festivalName: "",
    whereItIs: "",
    whenHeld: "",
    events1: "",
    events2: "",
    events3: "",
    reasons: "",
    anythingElse: "",
  });

  const handleChange = (key, value) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const handleReset = () =>
    setAnswers({
      festivalName: "",
      whereItIs: "",
      whenHeld: "",
      events1: "",
      events2: "",
      events3: "",
      reasons: "",
      anythingElse: "",
    });

  const inputStyle =
    "border-b border-black outline-none flex-1 text-[#6D2980] font-semibold bg-transparent";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="flex flex-col gap-2 mb-7 mt-5">
        {/* Title */}
        <h5 className="header-title-page8-read mb-8">
          <span className="ex-A-read mr-2">B</span>
          Choose one festival from Exercise A that you would like to write about. Then answer the questions below.
        </h5>

        <div className="flex flex-col gap-5 text-[14px]">

          {/* Row 1: Festival's name + Where it is */}
          <div className="flex gap-8 items-end">
            <div className="flex items-end gap-2 flex-1">
              <span className="whitespace-nowrap">Festival's name:</span>
              <input
                value={answers.festivalName}
                onChange={(e) => handleChange("festivalName", e.target.value)}
                className={inputStyle}
              />
            </div>
            <div className="flex items-end gap-2 flex-1">
              <span className="whitespace-nowrap">Where it is:</span>
              <input
                value={answers.whereItIs}
                onChange={(e) => handleChange("whereItIs", e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Row 2: When it is held */}
          <div className="flex items-end gap-2">
            <span className="whitespace-nowrap">When it is held:</span>
            <input
              value={answers.whenHeld}
              onChange={(e) => handleChange("whenHeld", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Row 3: Events of the festival — 3 lines */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2">
              <span className="whitespace-nowrap">Events of the festival:</span>
              <input
                value={answers.events1}
                onChange={(e) => handleChange("events1", e.target.value)}
                className={inputStyle}
              />
            </div>
            <input
              value={answers.events2}
              onChange={(e) => handleChange("events2", e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold bg-transparent"
            />
            <input
              value={answers.events3}
              onChange={(e) => handleChange("events3", e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold bg-transparent"
            />
          </div>

          {/* Row 4: Reason(s) */}
          <div className="flex items-end gap-2">
            <span className="whitespace-nowrap">Reason(s) for the festival:</span>
            <input
              value={answers.reasons}
              onChange={(e) => handleChange("reasons", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Row 5: Anything else */}
          <div className="flex items-end gap-2">
            <span className="whitespace-nowrap">Anything else important about the festival:</span>
            <input
              value={answers.anythingElse}
              onChange={(e) => handleChange("anythingElse", e.target.value)}
              className={inputStyle}
            />
          </div>

        </div>

        {/* Reset only */}
        <div className="flex justify-center mt-8">
      <ActionButtons
                onReset={handleReset}
               
              />
        </div>
      </div>
    </div>
  );
};

export default WritingB;