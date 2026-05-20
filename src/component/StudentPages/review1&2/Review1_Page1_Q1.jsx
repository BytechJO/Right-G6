import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import bagImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/8.svg"; // غير المسار حسب مشروعك

const QUESTIONS = [
  { word: "tough", correct: ["tough"] },
  { word: "subject", correct: ["subject"] },
  { word: "schoolbag", correct: ["schoolbag"] },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// تصنيف الحروف
const ASCENDERS = new Set([..."bdfhiklt"]); // تطلع فوق
const DESCENDERS = new Set([..."gjpqy"]); // تنزل تحت

// SVG لكل كلمة
const W = 25; // عرض كل مربع
const H_MID = 30; // ارتفاع الجزء الأوسط
const H_ASC = 18; // ارتفاع الجزء الفوقي
const H_DES = 18; // ارتفاع الجزء التحتاني
const GAP = 1; // مسافة بين المربعات
const COLOR = "#6DB33F";
const STROKE = 1;

function WordShape({ word, showLetters = false }) {
  const letters = word.split("");
  const totalW = letters.length * (W + GAP) - GAP;
  const svgH = H_ASC + H_MID + H_DES + STROKE * 2;

  return (
    <svg
      width={totalW + STROKE}
      height={svgH + STROKE}
      viewBox={`0 0 ${totalW + STROKE} ${svgH + STROKE}`}
      style={{ display: "block" }}
    >
      {letters.map((ch, i) => {
        const x = i * (W + GAP) + STROKE / 2;
        const isAsc = ASCENDERS.has(ch.toLowerCase());
        const isDes = DESCENDERS.has(ch.toLowerCase());

        const yTop = isAsc ? STROKE / 2 : H_ASC + STROKE / 2;
        const height = isAsc
          ? H_ASC + H_MID + (isDes ? H_DES : 0)
          : H_MID + (isDes ? H_DES : 0);

        const textY = H_ASC + H_MID / 2 + STROKE / 2 + 5;

        return (
          <g key={i}>
            <rect
              x={x}
              y={yTop}
              width={W}
              height={height}
              fill="none"
              stroke={COLOR}
              strokeWidth={STROKE}
            />
            {showLetters && (
              <text
                x={x + W / 2}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="18"
                fontWeight="600"
                fill="#444"
              >
                {ch}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const VocabularyA_WordShape = () => {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [errors, setErrors] = useState(Array(QUESTIONS.length).fill(null));
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    if (errors[i] === true)
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleCheck = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correct = 0;
    const newErrors = answers.map((a, i) => {
      const ok = QUESTIONS[i].correct.some(
        (c) => normalize(a) === normalize(c),
      );
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
    setAnswers(QUESTIONS.map((q) => q.correct[0]));
    setErrors(Array(QUESTIONS.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "40px" }}>
        {/* العنوان */}
        <h5 className="header-title-page8">
          <span className="ex-A mr-2">A</span>
          Words have a shape based on how many high or low letters they have.
          High letters go above the line: b, d, f, h, etc. Low letters go below
          the line: g, j, p, q, etc. Look at the shape of the words below to
          find out which vocabulary words they are.
        </h5>

        {/* مثال: supplies */}
        <div className="flex justify-center">
          <div
            style={{
              display: "flex",
              // border: `${STROKE}px solid ${COLOR}`,
              borderRadius: "4px",
            }}
          >
            <WordShape word={"supplies"} showLetters={true} />
          </div>
        </div>

        {/* الأسئلة + الصورة */}
        <div className="flex items-start gap-8">
          {/* الأسئلة */}
          <div className="flex flex-col gap-6 flex-1">
            {QUESTIONS.map((q, i) => {
              const hasError = errors[i] === true;
              const isOk = errors[i] === false;
              return (
                <div key={i} className="flex items-center gap-4">
                  {/* رقم */}
                  <span className="font-bold shrink-0 w-5">{i + 1}</span>

                  {/* شكل الكلمة */}
                  <WordShape word={q.word} />

                  {/* = */}
                  <span className="font-bold text-[18px]">=</span>

                  {/* input */}
                  <div className="relative" style={{ minWidth: "160px" }}>
                    <input
                      value={answers[i]}
                      disabled={locked || isOk}
                      onChange={(e) => handleChange(i, e.target.value)}
                      style={{
                        width: "100%",
                        borderBottom: hasError
                          ? "2px solid #ef4444"
                          : "1px solid #555",
                        outline: "none",
                        background: "transparent",
                        fontSize: "18px",
                        fontWeight: 500,
                        // color: isOk ? "#e53935" : undefined,
                        padding: "2px 0",
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
                          background: "#ef4444",
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
                </div>
              );
            })}
          </div>

          {/* صورة الحقيبة */}
          <img
            src={bagImg}
            alt="schoolbag"
            style={{ width: "160px", height: "auto", objectFit: "contain" }}
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          handleShowAnswer={handleShow}
          handleStartAgain={handleReset}
          checkAnswers={handleCheck}
        />
      </div>
    </div>
  );
};

export default VocabularyA_WordShape;
