import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.!?''""'';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const SENTENCES = [
  { num: 1, text: "If they cleaned and fixed them," },
  { num: 2, text: "If it rained this much every year," },
  { num: 3, text: "If he played this well every game," },
];

const ENDINGS = [
  { letter: "a", text: "Frank would get a trophy." },
  { letter: "b", text: "the lake would get bigger." },
  { letter: "c", text: "they could sell the houses." },
];

// الإجابات الصحيحة
const CORRECT_MATCH = ["c", "b", "a"]; // الحرف الصحيح لكل جملة
const CORRECT_FULL = [
  "if they cleaned them and fixed them, they could sell the houses.",
  "if it rained this much every year, the lake would get bigger",
  "if he played this well every game, frank would get a trophy",
];

// Input خارج الكومبوننت
const LineInput = ({
  value,
  disabled,
  onChange,
  isOk,
  isWrong,
  width = "100%",
}) => (
  <span style={{ position: "relative", display: "inline-block", width }}>
    <input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: isWrong ? "2px solid #ef4444" : "1.5px solid #aaa",
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        fontWeight: 600,
        // color: isOk ? "#84ad40" : "#6D2980",
        textAlign: width <= "20px" ? "left" : "center",
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
          pointerEvents: "none",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

const Unit3_Page6_Q1 = () => {
  const initState = () => ({
    matches: ["", "", ""], // الحرف المختار لكل جملة
    fullSentences: ["", "", ""], // الجملة الكاملة
  });
  const initErrors = () => ({
    matches: [null, null, null],
    fullSentences: [null, null, null],
  });

  const [answers, setAnswers] = useState(initState);
  const [errors, setErrors] = useState(initErrors);
  const [locked, setLocked] = useState(false);

  const handleMatchChange = (i, val) => {
    if (locked || errors.matches[i] === true) return;
    const m = [...answers.matches];
    m[i] = val;
    setAnswers((prev) => ({ ...prev, matches: m }));
    const me = [...errors.matches];
    me[i] = null;
    setErrors((prev) => ({ ...prev, matches: me }));
  };

  const handleFullChange = (i, val) => {
    if (locked || errors.fullSentences[i] === true) return;
    const f = [...answers.fullSentences];
    f[i] = val;
    setAnswers((prev) => ({ ...prev, fullSentences: f }));
    const fe = [...errors.fullSentences];
    fe[i] = null;
    setErrors((prev) => ({ ...prev, fullSentences: fe }));
  };

  const handleCheck = () => {
    if (locked) return;
    const allFilled =
      answers.matches.every((a) => a.trim()) &&
      answers.fullSentences.every((a) => a.trim());
    if (!allFilled) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    const newMatchErr = answers.matches.map((a, i) => {
      const ok = normalize(a) === normalize(CORRECT_MATCH[i]);
      if (ok) score++;
      return ok;
    });
    const newFullErr = answers.fullSentences.map((a, i) => {
      const ok = normalize(a) === normalize(CORRECT_FULL[i]);
      if (ok) score++;
      return ok;
    });

    setErrors({ matches: newMatchErr, fullSentences: newFullErr });
    const total = 6;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    setAnswers({
      matches: [...CORRECT_MATCH],
      fullSentences: CORRECT_FULL.map((s) => {
        // capitalize first letter for display
        return s.charAt(0).toUpperCase() + s.slice(1) + ".";
      }),
    });
    setErrors({
      matches: [true, true, true],
      fullSentences: [true, true, true],
    });
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initState());
    setErrors(initErrors());
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall"  style={{ gap: "30px" }}>
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A mr-2.5">D</span>
          Match the two parts of each sentence and write the full sentence
          below. Use correct punctuation.
        </h5>

        {/* القسم العلوي: جملتين + تعريفات */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
            marginTop: "16px",
          }}
        >
          {/* العمود الأيسر: الجمل مع فراغ الحرف */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              flex: 1,
            }}
          >
            {SENTENCES.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "18px",
                }}
              >
                <LineInput
                  value={answers.matches[i]}
                  disabled={locked || errors.matches[i] === true}
                  onChange={(v) => handleMatchChange(i, v)}
                  isOk={errors.matches[i] === true}
                  isWrong={errors.matches[i] === false}
                  width="50px"
                />
                <span style={{ fontWeight: "bold" }}>{s.num}</span>
                <span style={{ color: "#333" }}>{s.text}</span>
              </div>
            ))}
          </div>

          {/* العمود الأيمن: التعريفات */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {ENDINGS.map((e, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "18px",
                  color: "#333",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{e.letter}</span>
                <span>{e.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* القسم السفلي: كتابة الجملة كاملة */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "28px",
          }}
        >
          {SENTENCES.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "17px",
              }}
            >
              <span style={{ fontWeight: "bold", minWidth: "16px" }}>
                {s.num}
              </span>
              <LineInput
                value={answers.fullSentences[i]}
                disabled={locked || errors.fullSentences[i] === true}
                onChange={(v) => handleFullChange(i, v)}
                isOk={errors.fullSentences[i] === true}
                isWrong={errors.fullSentences[i] === false}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="action-buttons-container mt-6">
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

export default Unit3_Page6_Q1;
