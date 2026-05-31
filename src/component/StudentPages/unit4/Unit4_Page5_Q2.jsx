import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import audio from "../../../assets/audio/ClassBook/U4/PG 32/cd20pg32.mp3";

const Unit4_Page5_Q2 = () => {
  const captions = [
    {
      start: 0.0,
      end: 20.0,
      text: "Listen to the sentence, then change it to present simple passive.",
    },
  ];

  // كل سؤال فيه أجزاء: type "text" = نص ثابت, type "input" = فراغ
  const questions = [
    {
      id: 0,
      parts: [
        { type: "text", value: "The car is " },
        { type: "input", id: "0_0", answer: "fixed" },
        { type: "text", value: " by the mechanic." },
      ],
    },
    {
      id: 1,
      parts: [
        { type: "text", value: "Is the key " },
        { type: "input", id: "1_0", answer: "made" },
        { type: "text", value: " by the " },
        { type: "input", id: "1_1", answer: "locksmith" },
        { type: "text", value: "?" },
      ],
    },
    {
      id: 2,
      parts: [
        { type: "input", id: "2_0", answer: "Is" },
        { type: "text", value: " the letter brought to our mailbox by" },
        { type: "input", id: "2_1", answer: "the mail carrier" },
        { type: "text", value: "?" },
      ],
    },
    {
      id: 3,
      parts: [
        { type: "text", value: "Clark's friend is " },
        { type: "input", id: "3_0", answer: "sent" },
        { type: "text", value: " the e-mail by Clark" },
      ],
    },
    {
      id: 4,
      parts: [
        { type: "input", id: "4_0", answer: "The horse is ridden" },
        { type: "text", value: " to school by " },
        { type: "input", id: "4_1", answer: "Jenny" },
        { type: "text", value: "." },
      ],
    },
    {
      id: 5,
      parts: [
        {
          type: "input",
          id: "5_0",
          answer: "The beautiful landscape is painted by Vince",
        },
      ],
    },
  ];

  // جمع كل الـ inputs في كائن واحد
  const allInputs = {};
  questions.forEach((q) => {
    q.parts.forEach((p) => {
      if (p.type === "input") {
        allInputs[p.id] = q.prefilled ? p.answer : "";
      }
    });
  });

  const [answers, setAnswers] = useState(allInputs);
  const [errors, setErrors] = useState(
    Object.keys(allInputs).reduce((acc, k) => {
      acc[k] = false;
      return acc;
    }, {}),
  );
  const [correctLocked, setCorrectLocked] = useState(
    Object.keys(allInputs).reduce((acc, k) => {
      // السؤال الأول مثال جاهز
      acc[k] = k.startsWith("0_");
      return acc;
    }, {}),
  );
  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .trim()
      .toLowerCase()
      .replace(/[.,!?''""''’;:]/g, "")
      .replace(/\s+/g, " ");

  const updateField = (id, value) => {
    if (locked || correctLocked[id]) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const handleCheck = () => {
    if (locked) return;

    // تحقق من الفراغات الفارغة (غير المقفلة)
    const hasEmpty = Object.keys(answers).some(
      (k) => !correctLocked[k] && !answers[k].trim(),
    );
    if (hasEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;
    const newErrors = { ...errors };
    const newLocked = { ...correctLocked };

    // احسب الأسئلة الصح كاملة
    questions.forEach((q) => {
      if (q.prefilled) {
        score++;
        return;
      }

      const inputParts = q.parts.filter((p) => p.type === "input");
      const allCorrect = inputParts.every(
        (p) => normalize(answers[p.id]) === normalize(p.answer),
      );

      inputParts.forEach((p) => {
        const correct = normalize(answers[p.id]) === normalize(p.answer);
        newErrors[p.id] = !correct;
        if (correct) newLocked[p.id] = true;
      });

      if (allCorrect) score++;
    });

    setErrors(newErrors);
    setCorrectLocked(newLocked);

    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span>
      </div>`;

    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    const all = {};
    const allLocked = {};
    const noErrors = {};
    questions.forEach((q) => {
      q.parts.forEach((p) => {
        if (p.type === "input") {
          all[p.id] = p.answer;
          allLocked[p.id] = true;
          noErrors[p.id] = false;
        }
      });
    });
    setAnswers(all);
    setCorrectLocked(allLocked);
    setErrors(noErrors);
    setLocked(true);
  };

  const handleReset = () => {
    const reset = {};
    const resetErrors = {};
    const resetLocked = {};
    questions.forEach((q) => {
      q.parts.forEach((p) => {
        if (p.type === "input") {
          reset[p.id] = q.prefilled ? p.answer : "";
          resetErrors[p.id] = false;
          resetLocked[p.id] = !!q.prefilled;
        }
      });
    });
    setAnswers(reset);
    setErrors(resetErrors);
    setCorrectLocked(resetLocked);
    setLocked(false);
  };

  const getInputStyle = (id, isUnderlineOnly = false) => ({
    border: "none",
    borderBottom: errors[id]
      ? "1.5px solid #dc2626"
      : correctLocked[id]
        ? "1.5px solid black"
        : "1.5px solid black",
    outline: "none",
    fontSize: "18px",
    textAlign: "center",
    fontWeight: 600,
    width: id === "5_0" ? "450px" : "160px",
    background: "transparent",

    textDecoration: isUnderlineOnly ? "line-through" : "none",
  });

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            B
          </span>
          Listen to the sentence, then change it to present simple passive.
        </h5>

        {/* AUDIO */}
        <QuestionAudioPlayer src={audio} captions={captions} />

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginTop:"15px",
            marginBottom: "60px",
          }}
        >
          {questions.map((q, qi) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                fontSize: "18px",
              }}
            >
              {/* NUMBER */}
              <span
                style={{ fontWeight: "bold", minWidth: "24px", color: "#333" }}
              >
                {qi + 1}
              </span>

              {/* PARTS */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  gap: "4px",
                }}
              >
                {q.parts.map((part, pi) => {
                  if (part.type === "text") {
                    return (
                      <span key={pi} style={{ color: "#333" }}>
                        {part.value}
                      </span>
                    );
                  }

                  // input
                  return (
                    <span
                      key={pi}
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <input
                        type="text"
                        value={answers[part.id] || ""}
                        disabled={locked || correctLocked[part.id]}
                        onChange={(e) => updateField(part.id, e.target.value)}
                        style={getInputStyle(part.id, part.underline)}
                      />
                      {/* error dot */}
                      {errors[part.id] && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-10px",
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
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button className="show-answer-btn" onClick={handleShow}>
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

export default Unit4_Page5_Q2;
