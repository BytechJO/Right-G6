/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3WorkbookAudioText, {
  stopWorkbookUnit3Audio,
  workbookUnit3Audio,
} from "./Unit3WorkbookAudioText";

const WB_Unit1_Page4_Q3 = () => {
  const questions = [
    {
      sentence: "I would go to the rain forest.",
      answer: "Brittany's mom has driven her to school.",
    },
    {
      sentence: "They would get a trophy.",
      answer: "The mail carrier has delivered the mail.",
    },
    {
      sentence: " Randy would buy a new soccer ball.",
      answer: "The teacher has tested the students.",
    },
    {
      sentence: "Paula would be very happy.",
      answer: "The neighbor has taught Erin.",
    },
        {
      sentence: "I would work very hard.",
      answer: "The neighbor has taught Erin.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const [Shans, setShans] = useState(false);


const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((a) => !a.trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correctCount = 0;
    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);
      if (ok) correctCount++;
      return ok;
    });

    setResult(newResults);
    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setShans(true)
    setAnswers(questions.map((q) => q.answer));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  const handleReset = () => {
    stopWorkbookUnit3Audio();
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
    setShans(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <ExerciseHeader
          sectionLetter="H"
          title="Write a possible question for each answer."
          subTitle="Use the answer to identify the missing question word and auxiliary, then build a complete question."
        />

        {/* Questions */}
        <div className="flex flex-col gap-8 text-[18px]">
          {questions.map((q, i) => {
            const isWrong = result[i] === false;
            const isCorrect = result[i] === true;

            return (
              <div key={i} className="flex flex-col gap-2">
                {/* Original sentence */}
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[20px] min-w-[24px]">{i + 1}</span>
                  <Unit3WorkbookAudioText
                    src={workbookUnit3Audio(
                      "Page 19 - Exercise H",
                      `Item_${String(i + 1).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play answer ${i + 1}`}
                  >
                    {q.sentence}
                  </Unit3WorkbookAudioText>
                </div>

                {/* Input line */}
                <div className="relative flex items-center" style={{ paddingLeft: "36px" }}>
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || isCorrect}
                    placeholder="Write a possible question"
                    title="Write a question that could have this answer"
                    aria-label={`Possible question ${i + 1}`}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                      wb-unit3-answer w-full border-0 border-b outline-none bg-transparent
                      text-[18px] font-semibold px-1
                      ${isWrong ? "border-[#D1232A]" : "border-black"}
                    `}
                    style={{
                      color: Shans ? "#ff0000ff" : "#333",
                    }}
                  />
                  {isWrong && (
                    <span style={{
                      position: "absolute", top: "-8px", right: "-8px",
                      width: "20px", height: "20px", background: "#ef4444", color: "white",
                      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: "bold", border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}>✕</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
       
      </div>
    </div>
  );
};

export default WB_Unit1_Page4_Q3;
