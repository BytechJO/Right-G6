import React from "react";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 7.svg";

const GrammarA = () => {
  const questions = [
    {
      sentence: (
        <>
          The students <span className="text-[#f79631]">are helped</span> by the teacher.
        </>
      ),
      options: ["are guided", "are taught", "are chosen", "are driven"],
    },
    {
      sentence: (
        <>
          Is the horse <span className="text-[#f79631]">ridden</span> by Marcia?
        </>
      ),
      options: ["Is, brushed", "Is, walked", "Is, seen", "Is, fed"],
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read, change, and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-10">
        {questions.map((q, i) => (
          <div key={i} className="flex items-start gap-5 mt-7">
            <img
              src={img}
              alt=""
              style={{ width: "40px", height: "40px", marginTop: -6 }}
            />
            <div>
              {/* SENTENCE */}
              <p className="text-[18px] font-semibold">{q.sentence}</p>

              {/* OPTIONS */}
              <div className="flex flex-wrap gap-x-10 gap-y-2 mt-4 text-[17px]">
                {q.options.map((opt, j) => (
                  <span key={j}>
                    <b>{j + 1}</b> {opt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarA;