import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page3_VocabMatch = () => {
  const BORDER = "#84ad40";

  const questions = [
    { id: 1, definition: "equipment, things, goods:", answer: "supplies", },
    { id: 2, definition: "wonderful, excellent:", answer: "super" },
    { id: 3, definition: "left over:", answer: "remaining" },
    { id: 4, definition: "rough, hard to tear or break, difficult:", answer: "tough" },
    { id: 5, definition: "topic, matter, area of study in school:", answer: "subject" },
    { id: 6, definition: "a small computer to figure math problems:", answer: "calculator" },
    { id: 7, definition: "what an ill or very tired person needs:", answer: "bed rest", multiInput: ["bed", "rest"] },
    { id: 8, definition: "a group of items that goes together:", answer: "a set", multiInput: ["a", "set"] },
    { id: 9, definition: "recently, just happened:", answer: "lately" },
    { id: 10, definition: "probably will happen:", answer: "likely" },
  ];

  const initAnswers = () => {
    const ans = {};
    questions.forEach((q) => {
      if (q.prefilled) {
        ans[q.id] = q.multiInput ? [...q.multiInput] : q.answer;
      } else {
        ans[q.id] = q.multiInput ? q.multiInput.map(() => "") : "";
      }
    });
    return ans;
  };

  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

  const handleChange = (id, value, subIndex = null) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      if (subIndex !== null) {
        const arr = [...updated[id]];
        arr[subIndex] = value;
        updated[id] = arr;
      } else {
        updated[id] = value;
      }
      return updated;
    });
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

const checkAnswers = () => {
  if (locked) return;

  const hasEmpty = questions.some((q) => {
    if (q.prefilled) return false;
    const ans = answers[q.id];
    if (Array.isArray(ans)) return ans.some((a) => !a.trim());
    return !ans.trim();
  });

  if (hasEmpty) {
    ValidationAlert.info("Please complete all answers.");
    return;
  }

  let correctCount = 0;
  const newResult = {};
  questions.forEach((q) => {
    if (q.prefilled) { newResult[q.id] = true; correctCount++; return; }
    const ans = answers[q.id];
    const userAnswer = Array.isArray(ans) ? ans.join(" ") : ans;
    // ✅ multiInput: الاثنين لازم يكونوا صح عشان تنحسب النقطة
    const ok = normalize(userAnswer) === normalize(q.answer);
    if (ok) correctCount++;
    newResult[q.id] = ok;
  });

  setResult(newResult);
  const total = questions.filter((q) => !q.prefilled).length;
  // ✅ إزالة الـ -1 الغلط من الحساب
  const scored = Object.values(newResult).filter(Boolean).length;
  const color = scored === total ? "green" : scored === 0 ? "red" : "orange";
  const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${scored} / ${total}</span></div>`;
  if (scored === total) { setLocked(true); ValidationAlert.success(msg); }
  else if (scored === 0) ValidationAlert.error(msg);
  else ValidationAlert.warning(msg);
};
  const showAnswers = () => {
    const ans = {};
    questions.forEach((q) => {
      ans[q.id] = q.multiInput ? [...q.multiInput] : q.answer;
    });
    const res = {};
    questions.forEach((q) => { res[q.id] = true; });
    setAnswers(ans);
    setResult(res);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  const inputField = (q, subIndex = null) => {
  const value = subIndex !== null ? answers[q.id][subIndex] : answers[q.id];
  const isWrong = result[q.id] === false;
  const isCorrect = result[q.id] === true;
  const isDisabled = locked || isCorrect || q.prefilled;

  // للـ multiInput: كل input يأخذ حالته الخاصة
  const showBadge = isWrong; // يظهر badge على كل input خاطئ

  return (
    <span className="relative inline-block" style={{ marginRight: subIndex !== null ? "6px" : "0" }}>
      <input
        type="text"
        value={value}
        disabled={isDisabled}
        onChange={(e) => handleChange(q.id, e.target.value, subIndex)}
        className={`
  border-0
  border-b-1
  bg-transparent
  outline-none
  focus:outline-none
  focus:ring-0
  focus:border-b-1
  text-[18px]
  text-[#6d2980]
  font-semibold
  w-[55px]
  text-center
  ${isWrong ? "border-[#D1232A]" : "border-black"}
`}
        style={{
          width: subIndex !== null ? "80px" : q.id >= 7 ? "80px" : "160px",
          color: "#333",
        }}
      />
      {showBadge && (  // ← badge على كل input مش بس آخر واحد
        <span style={{
          position: "absolute", top: "-8px", right: "-8px",
          width: "18px", height: "18px", background: "#ef4444", color: "white",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", fontWeight: "bold", border: "2px solid white",
          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
        }}>✕</span>
      )}
    </span>
  );
};

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>A</span>
          Write the vocabulary word that matches the definition. The first one has been done for you.
        </h5>

        {/* Grid */}
        <div style={{
          margin  :" 0 0 3em 0",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          border: `2px solid ${BORDER}`, borderRadius: "8px", overflow: "hidden",
        }}>
          {questions.map((q, i) => {
            const isLastRow = i >= questions.length - 2;
            const isLeft = i % 2 === 0;

            return (
              <div key={q.id} style={{
                padding: "16px 20px",
                borderRight: isLeft ? `1px solid ${BORDER}` : "none",
                borderBottom: isLastRow ? "none" : `1px solid ${BORDER}`,
                minHeight: "90px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
                <div style={{ fontSize: "18px", color: "#444", marginBottom: "10px" }}>
                  <span style={{ fontWeight: "bold", marginRight: "8px" }}>{q.id}</span>
                  {q.definition}
            
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {q.prefilled ? null : q.multiInput ? (
                    q.multiInput.map((_, si) => inputField(q, si))
                  ) : (
                    inputField(q)
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
        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit1_Page3_VocabMatch;