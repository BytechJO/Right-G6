import React, { useState } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const ComprehensionB = () => {
  // ✅ Dynamic Questions
  const questions = [
    {
      id: 1,
      before: "At the Konaki Sumo, the baby that starts",
      after: "first is the winner.",
      answer: "crying",
      width: "w-[220px]",
    },
    {
      id: 2,
      before:
        "The Monkey Buffet Festival has become a big",
      after:
        "attraction and brings business to the city.",
      answer: "tourist",
      width: "w-[260px]",
    },
    {
      id: 3,
      before: "A",
      after:
        "supply of fruits and other foods are put on a table.",
      answer: "countless",
      width: "w-[220px]",
    },
  ];

  // ✅ Initial State
  const initialAnswers = questions.map(() => "");

  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\.$/, "");
  };

  // handle input
const handleChange = (index, value) => {
  const updated = [...answers];
  updated[index] = value;
  setAnswers(updated);

  // احذف الخطأ فقط للانبوت الحالي
  setErrors((prev) => ({
    ...prev,
    [index]: undefined,
  }));
};

  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some(
      (item) => item.trim() === ""
    );

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    const newErrors = {};

    questions.forEach((q, index) => {
      if (
        normalize(answers[index]) ===
        normalize(q.answer)
      ) {
        correct++;
        newErrors[index] = false;
      } else {
        newErrors[index] = true;
      }
    });

    setErrors(newErrors);

    const total = questions.length;

    const color =
      correct === total
        ? "green"
        : correct === 0
        ? "red"
        : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correct} / ${total}
        </span>
      </div>
    `;

    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // show answers
  const handleShow = () => {
    setAnswers(questions.map((q) => q.answer));
    setErrors({});
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(initialAnswers);
    setErrors({});
    setLocked(false);
  };

  return (
    <div className="mb-6 mx-auto max-w-5xl">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <h5 className="header-title-page8-read">
          <span
            className="ex-A-read"
            style={{ marginRight: "10px" }}
          >
            B
          </span>
          Complete each sentence with a word from the story.
        </h5>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-8 text-[18px] text-black">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="flex items-center flex-wrap gap-2 relative"
          >
            {/* Number */}
            <span className="font-bold">{q.id}</span>

            {/* Before text */}
            <span>{q.before}</span>

            {/* Input */}
            <div className="relative inline-block">
              <input
                type="text"
                value={answers[index]}
                disabled={locked || errors[index] === false}
                onChange={(e) =>{
                  handleChange(index, e.target.value)
                }
                }
                className={`${q.width} text-center bg-transparent border-b-1 outline-none
                  ${
                    errors[index]
                      ? "border-red-500"
                      : "border-black"
                  }`}
              />

              {/* ❌ Error */}
              {errors[index] && (
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "8px",
                    transform: "translateY(-50%)",
                    width: "22px",
                    height: "22px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow:
                      "0 1px 6px rgba(0,0,0,0.2)",
                    pointerEvents: "none",
                  }}
                >
                  ✕
                </div>
              )}
            </div>

            {/* After text */}
            <span>{q.after}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      
      <div className="flex justify-center gap-6 mt-10">
     <ActionButtons
  onReset={handleReset}
  onShow={handleShow}
  onCheck={handleCheck}
/>
      </div>
    </div>
  );
};

export default ComprehensionB;