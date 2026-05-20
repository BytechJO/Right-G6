import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  { id: 1, text: "climbing high points of a mountain" },
  { id: 2, text: "riding ocean waves" },
  { id: 3, text: "need only a flat board or even their own body" },
  { id: 4, text: "need ropes and helm" },
  { id: 5, text: "should have good swimming skills" },
  { id: 6, text: "should have good climbing skills" },
];

// M = mountaineering | S = surfing
const CORRECT = ["m", "s", "s", "m", "s", "m"];

const Unit2_Page2_ComprehensionA = () => {
  const [answers, setAnswers] = useState(Array(6).fill(""));
  const [errors, setErrors] = useState(Array(6).fill(null));
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }
    setAnswers((prev) =>
      prev.map((a, idx) => (idx === i ? val.toLowerCase() : a)),
    );
  };

  const handleCheck = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    const newErrors = answers.map((a, i) => {
      const ok = a.trim().toLowerCase() === CORRECT[i];
      if (ok) correct++;
      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = QUESTIONS.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(CORRECT.map((c) => c.toUpperCase()));
    setErrors(Array(6).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(6).fill(""));
    setErrors(Array(6).fill(null));
    setLocked(false);
  };

  const renderItem = (i) => {
    const q = QUESTIONS[i];
    const hasError = errors[i] === true;
    const isOk = errors[i] === false;

    return (
      <div key={i} className="flex items-start gap-2 text-[17px]">
        {/* رقم */}
        <span className="font-bold shrink-0 w-[18px]">{q.id}</span>

        {/* فراغ */}
        <div className="relative shrink-0">
          <input
            value={answers[i]}
            disabled={locked || isOk}
            onChange={(e) => handleChange(i, e.target.value)}
            maxLength={1}
            style={{
              width: "40px",
              borderBottom: ` ${hasError ? "2px solid #ef4444" : "1px solid #555"}`,
              outline: "none",
              background: "transparent",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "700",
              // color: "#6D2980",
              textTransform: "uppercase",
            }}
          />
          {hasError && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
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
                zIndex: 5,
              }}
            >
              ✕
            </span>
          )}
        </div>

        {/* نص الجملة */}
        <span className="text-gray-800 leading-snug">{q.text}</span>
      </div>
    );
  };

  return (
    <div className="mb-15 mx-auto w-full flex flex-col gap-5">
      {/* العنوان */}
      <div className="flex items-center gap-3 mb-7">
        <h5 className="header-title-page8-read" style={{ display: "block" }}>
          <span className="ex-A-read mr-2">A</span>
          Put <strong className="text-red-500">M</strong> next to the sentences
          that tell about mountaineering. Put{" "}
          <strong className="text-red-500">S</strong> next to the sentences that
          tell about surfing.
        </h5>
      </div>

      {/* Grid 2×3 */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
        {renderItem(0)}
        {renderItem(1)}
        {renderItem(2)}
        {renderItem(3)}
        {renderItem(4)}
        {renderItem(5)}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-12">
         <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit2_Page2_ComprehensionA;
