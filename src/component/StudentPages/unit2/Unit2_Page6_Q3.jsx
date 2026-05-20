import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import ActionButtons from "../../Button";
const QUESTIONS = [{ prefix: "I am such a" }, { prefix: "I am so" }];

const GrammarF = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const handleChange = (i, val) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));

  const handleReset = () => setAnswers(Array(QUESTIONS.length).fill(""));

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "120px" }}>
        {/* العنوان */}
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2">F</span>
          Now write two sentences about yourself and what you are good at doing
          or how you are feeling right now.
        </h5>

        <div className="flex flex-col gap-15 text-[18px] mt-5">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-bold shrink-0">{i + 1}</span>
              <span className="shrink-0">{q.prefix}</span>
              <input
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                style={{
                  flex: 1,
                  borderBottom: "1px solid #555",
                  outline: "none",
                  background: "transparent",
                  fontSize: "18px",
                  padding: "2px 0",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Reset بس */}
      <div className="flex justify-center mt-8">
        <ActionButtons handleStartAgain={handleReset} />
      </div>
    </div>
  );
};

export default GrammarF;
