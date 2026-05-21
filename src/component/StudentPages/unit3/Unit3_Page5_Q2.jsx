import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
const QUESTIONS = [
  { id: 1, text: "I don't see so!" },
  { id: 2, text: "I'll pass." },
  { id: 3, text: "If I am you, ..." },
  { id: 4, text: "It's too early." },
  { id: 5, text: "Let's try a look." },
];

// الإجابات الصحيحة: true = ✓ صح، false = ✗ غلط
const CORRECT_MARKS = [false, true, false, true, false];

// التصحيح للعبارات الغلط
const CORRECTIONS = [
  "I don't think so!",
  "",
  "If I were you",
  "",
  "Let's take a look.",
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""''’;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Unit3_Page5_Q2 = () => {
  // كل سؤال: { mark: null | true | false, correction: "" }
  const initState = () => QUESTIONS.map(() => ({ mark: null, correction: "" }));

  const [answers, setAnswers] = useState(initState);
  const [errors, setErrors] = useState(Array(QUESTIONS.length).fill(null));
  const [locked, setLocked] = useState(false);

  // toggle ✓
  const handleCheck = (i) => {
    if (locked || errors[i] === true) return;
    setAnswers((prev) =>
      prev.map((a, idx) =>
        idx === i ? { ...a, mark: a.mark === true ? null : true } : a,
      ),
    );
    clearError(i);
  };

  // toggle ✗
  const handleCross = (i) => {
    if (locked || errors[i] === true) return;
    setAnswers((prev) =>
      prev.map((a, idx) =>
        idx === i ? { ...a, mark: a.mark === false ? null : false } : a,
      ),
    );
    clearError(i);
  };

  const handleCorrectionChange = (i, val) => {
    if (locked || errors[i] === true) return;
    setAnswers((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, correction: val } : a)),
    );
    clearError(i);
  };

  const clearError = (i) =>
    setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));

  const checkAnswers = () => {
    if (locked) return;

    // تحقق أن كل سؤال فيه اختيار
    if (answers.some((a) => a.mark === null)) {
      ValidationAlert.info();
      return;
    }

    // تحقق التصحيح للعبارات الغلط
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].mark === false && !answers[i].correction.trim()) {
        ValidationAlert.info();
        return;
      }
    }

    let score = 0;
    const newErrors = answers.map((a, i) => {
      const markOk = a.mark === CORRECT_MARKS[i];
      const corrOk =
        CORRECT_MARKS[i] === false
          ? normalize(a.correction) === normalize(CORRECTIONS[i])
          : true;
      const ok = markOk && corrOk;
      if (ok) score++;
      return ok;
    });

    setErrors(newErrors);
    const total = QUESTIONS.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(
      QUESTIONS.map((_, i) => ({
        mark: CORRECT_MARKS[i],
        correction: CORRECTIONS[i],
      })),
    );
    setErrors(Array(QUESTIONS.length).fill(true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(initState());
    setErrors(Array(QUESTIONS.length).fill(null));
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A mr-2.5">B</span>
          Read the expressions and write{" "}
          <strong className="text-red-600">✓</strong> or{" "}
          <strong className="text-red-600">✗</strong>. Correct the expressions
          that are incorrect.
        </h5>

        <div className="flex flex-col gap-12 mt-6">
          {QUESTIONS.map((q, i) => {
            const isOk = errors[i] === true;
            const isWrong = errors[i] === false;
            const needsCorrection = answers[i].mark === false;

            return (
              <div key={q.id} className="flex items-center gap-4 text-[22px]">
                {/* الرقم */}
                <span className="font-bold w-4">{q.id}</span>

                {/* زر ✓ */}
                <button
                  onClick={() => handleCheck(i)}
                  disabled={locked || isOk}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderBottom:
                      answers[i].mark === true
                        ? isWrong
                          ? "2px solid red"
                          : "2px solid #84ad40"
                        : "1px solid #565656ff",
                    fontWeight: "bold",
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: locked ? "default" : "pointer",
                    transition: "all 0.15s",
                    position: "relative", // ✅ مضاف
                  }}
                >
                  {answers[i].mark === true ? (
                    <img src={trueIcon} style={{ height: "25px" }} />
                  ) : (
                    ""
                  )}

                  {/* ✅ علامة الخطأ فوق يمين زر ✓ لما الطالب يختاره غلط */}
                  {isWrong && answers[i].mark === true && (
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
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </button>

                {/* زر ✗ */}
                <button
                  onClick={() => handleCross(i)}
                  disabled={locked || isOk}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderBottom:
                      answers[i].mark === false
                        ? isWrong
                          ? "2px solid red"
                          : "2px solid #84ad40"
                        : "1px solid #565656ff",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "16px",
                    cursor: locked ? "default" : "pointer",
                    transition: "all 0.15s",
                    position: "relative", // ✅ مضاف
                  }}
                >
                  {answers[i].mark === false ? (
                    <img src={falseIcon} style={{ height: "25px" }} />
                  ) : (
                    ""
                  )}

                  {/* ✅ علامة الخطأ فوق يمين زر ✗ لما الطالب يختاره غلط */}
                  {isWrong && answers[i].mark === false && (
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
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </button>

                {/* نص السؤال */}
                <span
                  style={{ minWidth: "160px", fontSize: "18px", color: "#333" }}
                >
                  {q.text}
                </span>

                {/* حقل التصحيح - يظهر بس لما يختار ✗ */}
                <span style={{ position: "relative", flex: 1 }}>
                  <input
                    value={answers[i].correction}
                    onChange={(e) => handleCorrectionChange(i, e.target.value)}
                    disabled={locked || isOk || !needsCorrection}
                    placeholder={
                      needsCorrection ? "Write the correction..." : ""
                    }
                    style={{
                      width: "100%",
                      borderBottom: isWrong
                        ? "2px solid #ef4444"
                        : "1px solid #565656ff",
                      outline: "none",
                      background: "transparent",
                      fontSize: "18px",
                      fontWeight: "500",
                      // color: isOk ? "#84ad40" : "#6D2980",
                      opacity: needsCorrection ? 1 : 0.3,
                      cursor: needsCorrection ? "text" : "default",
                    }}
                  />
                  {isWrong && (
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
                </span>
              </div>
            );
          })}
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit3_Page5_Q2;
