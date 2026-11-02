import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import { FaRedo } from "react-icons/fa";
import ActionButtons from "../../Button";
import Unit2AudioText, { stopUnit2Audio, unit2Audio } from "./Unit2AudioText";
const QUESTIONS = [{ prefix: "I am such a" }, { prefix: "I am so" }];

const GrammarF = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));

  const handleChange = (i, val) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));

  const handleReset = () => {
    stopUnit2Audio();
    setAnswers(Array(QUESTIONS.length).fill(""));
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "120px" }}>
        {/* العنوان */}
        <ExerciseHeader
          sectionLetter="F"
          title="Write two sentences about yourself and what you are good at doing or how you are feeling right now."
          subTitle="Use the prompt, picture, or grammar pattern to write a complete response, then reread it for meaning, form, and punctuation."
        />

        <div className="flex flex-col gap-15 text-[18px] mt-5">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-bold shrink-0">{i + 1}</span>
              <Unit2AudioText
                className="shrink-0"
                src={unit2Audio("Page 15 - Exercise F", `Item_${String(i + 1).padStart(3, "0")}_`)}
                ariaLabel={`Play ${q.prefix}`}
              >{q.prefix}</Unit2AudioText>
              <input
                value={answers[i]}
                placeholder="Type the sentence"
                title="Type the sentence"
                className="unit2-answer-input"
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
