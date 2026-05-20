import React, { useState } from "react";
import { FaRedo, FaEye } from "react-icons/fa";
import ActionButtons from "../../Button";

const QUESTIONS = [
  {
    question: "Were the horses tired after the race?",
    suggested:
      "The horses were so tired that they didn't want to walk back to the barn.",
  },
  {
    question: "Did the airplane fly high?",
    suggested: "The airplane flew so high that...",
  },
  {
    question: "Were the children good listeners during class?",
    suggested: "The children were such good listeners that...",
  },
  {
    question: "Did you play tennis for a long time?",
    suggested: "I played tennis for such a long time that...",
  },
];

const Unit2_Page6_Q1 = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [showSuggested, setShowSuggested] = useState(false);

  const handleChange = (i, val) => {
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleShow = () => setShowSuggested(true);

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setShowSuggested(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "40px" }}>
        {/* العنوان */}
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2">D</span>
          Answer each of the questions using{" "}
          <strong className="text-orange-500">so</strong> or{" "}
          <strong className="text-orange-500">such</strong>.
        </h5>

        <div className="flex flex-col gap-7 text-[18px] mt-5">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* السؤال */}
              <div className="flex items-start gap-2">
                <span className="font-bold shrink-0">{i + 1}</span>
                <span>{q.question}</span>
              </div>

              {/* سطر الإجابة */}
              <input
                value={showSuggested ? q.suggested : answers[i]}
                onChange={(e) =>
                  !showSuggested && handleChange(i, e.target.value)
                }
                disabled={showSuggested}
                style={{
                  width: "100%",
                  borderBottom: "1px solid #555",
                  outline: "none",
                  background: "transparent",
                  fontSize: "18px",
                  fontWeight: showSuggested ? "500" : "400",
                  // color: showSuggested ? "#e53935" : undefined,
                  padding: "2px 0",
                  marginLeft: "20px",
                }}
              />
            
            </div>
          ))}
        </div>
      </div>
      {/* Buttons: Show + Reset بس */}
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          handleStartAgain={handleReset}
          handleShowAnswer={handleShow}
        />
      </div>
    </div>
  );
};

export default Unit2_Page6_Q1;
