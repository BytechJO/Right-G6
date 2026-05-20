import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 10.svg";
const QUESTIONS = [
  {
    words: "you / write / report / for / history / ?",

    isExample: false,
  },
  {
    words: "Robert and John / see / the Leaning Tower of Pisa / .",
    isExample: false,
  },
  {
    words: "not / they / make / cake / for / dessert / ?",
    isExample: false,
  },
  {
    words: "Craig and I / not / take / lunch / to / Grandma / yet.",
    isExample: false,
  },
];

const CORRECT = [
  // السؤال 1 (index 0 في الـ inputs = السؤال الثاني فعلياً)
  ["Have you written the report for history?"],
  ["Robert and John have seen the Leaning Tower of Pisa."],
  ["Haven't they made cake for dessert?"],
  ["Craig and I haven't taken lunch to Grandma yet."],
];

// normalize: شيل كابيتل + شيل نقاط وفواصل وأبستروف
const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""’;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Page9_Q2 = () => {
  // 3 inputs فقط (السؤال 1 مثال جاهز)
  const [answers, setAnswers] = useState(["", "", "",""]);
  const [errors, setErrors] = useState([null, null, null,null]);
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    // امسح الخطأ فور الكتابة
    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }
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
      const ok = CORRECT[i].some((ans) => normalize(a) === normalize(ans));
      if (ok) correct++;
      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = answers.length;
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
    setAnswers(CORRECT.map((c) => c[0]));
    setErrors([false, false, false]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "",""]);
    setErrors([null, null, null,null]);
    setLocked(false);
  };

  // رقم الـ input (0,1,2) بيقابل السؤال 2,3,4
  let inputIdx = -1;

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "90px" }}>
        {/* Title */}
        <h5 className="header-title-page8">
          <span className="ex-A mr-2">E</span>
          Use each set of words given to write a sentence in the present perfect
          tense.
        </h5>
        <div className="flex gap-5 w-full items-center">
          {/* Questions */}
          <div className="flex flex-col gap-6 text-[18px] w-full">
            {QUESTIONS.map((q, i) => {
              if (!q.isExample) inputIdx++;
              const idx = inputIdx;
              const hasError = !q.isExample && errors[idx] === true;
              const isOk = !q.isExample && errors[idx] === false;

              return (
                <div key={i} className="flex flex-col gap-1">
                  {/* السطر العلوي: رقم + كلمات */}
                  <div className="flex items-start gap-3">
                    <span className="font-bold shrink-0 w-[20px]">{i + 1}</span>
                    <span className="text-gray-700">{q.words}</span>
                  </div>

                  {/* السطر السفلي: الجواب */}
                  {q.isExample ? (
                    // المثال: نص مسطّر ثابت
                    <div className="ml-8">
                      <span
                        style={{
                          textDecoration: "underline",
                          textDecorationColor: "#333",
                          // color: "#6D2980",
                          fontWeight: "500",
                        }}
                      >
                        {q.example}
                      </span>
                      {/* خط ممتد بعد المثال */}
                      <span
                        style={{
                          display: "inline-block",
                          width: "120px",
                          borderBottom: "1px solid #555",
                          marginLeft: "4px",
                          verticalAlign: "bottom",
                        }}
                      />
                    </div>
                  ) : (
                    // Input
                    <div className="ml-8 relative">
                      <input
                        value={answers[idx]}
                        disabled={locked || isOk}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        style={{
                          width: "100%",
                          borderBottom: ` ${hasError ? "2px solid #ef4444" : "1px solid #555"}`,
                          outline: "none",
                          background: "transparent",
                          fontSize: "18px",
                          // color: "#6D2980",
                          fontWeight: "500",
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
                  )}
                </div>
              );
            })}
          </div>
          <img src={img} style={{ height: "350px", width: "auto" }} />
        </div>
        {/* Buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>
          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page9_Q2;
