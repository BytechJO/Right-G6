import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 6 I Used to Be Used to It Folder/SVG/Asset 15.svg";
// ==========================
// بيانات السؤال: صور + إجابات صحيحة
// عدّل الـ src والإجابات حسب الكتاب
// ==========================
const questions = [
  {
    id: 1,
    // imageSrc: "/assets/images/unit6/place1.jpg",
    correctAnswer: "Rainbow Mountain",
  },
  {
    id: 2,
    // imageSrc: "/assets/images/unit6/place2.jpg",
    correctAnswer: "Machu Picchu",
  },
  {
    id: 3,
    // imageSrc: "/assets/images/unit6/place3.jpg",
    correctAnswer: "Intihuatana Stone",
  },
];

const normalize = (text) =>
  text.trim().toLowerCase().replace(/\s+/g, " ").replace(/[?.]/g, "");

const Unit6_Page2_ComprehensionA = () => {
  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [errors, setErrors] = useState(questions.map(() => false));
  const [locked, setLocked] = useState(questions.map(() => false));
  const [allDone, setAllDone] = useState(false);

  // =========================
  // UPDATE
  // =========================
  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    const updatedErrors = [...errors];
    updatedErrors[index] = false;
    setErrors(updatedErrors);
  };

  // =========================
  // CHECK
  // =========================
  const handleCheck = () => {
    if (allDone) return;

    const isEmpty = answers.some(
      (val, i) => !locked[i] && normalize(val) === "",
    );

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;
    const newErrors = [...errors];
    const newLocked = [...locked];

    answers.forEach((val, i) => {
      if (locked[i]) {
        score++;
        return;
      }
      const isCorrect =
        normalize(val) === normalize(questions[i].correctAnswer);
      newErrors[i] = !isCorrect;
      if (isCorrect) {
        score++;
        newLocked[i] = true;
      }
    });

    setErrors(newErrors);
    setLocked(newLocked);

    const total = questions.length;

    if (score === total) setAllDone(true);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // =========================
  // SHOW
  // =========================
  const handleShow = () => {
    setAnswers(questions.map((q) => q.correctAnswer));
    setErrors(questions.map(() => false));
    setLocked(questions.map(() => true));
    setAllDone(true);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setAnswers(questions.map(() => ""));
    setErrors(questions.map(() => false));
    setLocked(questions.map(() => false));
    setAllDone(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8 leading-normal">
        <span className="ex-A-read mr-2">A</span>
        Read the descriptions above, and then write the correct names under each
        of the pictures.
      </h5>

      {/* PICTURES ROW */}
      <div className="flex flex-wrap justify-center gap-15 mt-6">
        {/* IMAGE */}

        <img
          src={img1}
          className="w-full object-contain"
          style={{ height: "140px" }}
        />

        {questions.map((q, index) => (
          <div key={q.id} className="flex flex-col items-center gap-3">
            {/* NUMBER + INPUT LINE */}
            <div className="flex items-center gap-2 w-full">
              {/* number */}
              <span className="font-bold text-[#5b3b74] text-sm min-w-[18px]">
                {index + 1}
              </span>

              {/* input wrapper */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={answers[index]}
                  placeholder="Write here.."
                  disabled={allDone || locked[index]}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  className={`w-full outline-none bg-transparent font-semibold px-1 pb-1
                    border-b-1
                     text-[18px]
                    ${
                      errors[index]
                        ? "border-red-400 text-red-500"
                        : locked[index]
                          ? "border-black text-black"
                          : "border-black"
                    }
                  `}
                />

                {/* error icon */}
                {errors[index] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "4px",
                      transform: "translateY(-60%)",
                      width: "22px",
                      height: "22px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-15">
        {/* RESET */}
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* SHOW */}
        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition">
            Show Answer
          </span>
        </div>

        {/* CHECK */}
        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit6_Page2_ComprehensionA;
