import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review3_Page1_Q2 = () => {
  const questions = [
    {
      id: 0,
      parts: [
        { type: "input", id: "0_0", answer: "I", width: "80px" },
        { type: "text", value: " don't think " },
        { type: "input", id: "0_1", answer: "so", width: "80px" },
        { type: "text", value: "." },
      ],
    },
    {
      id: 1,
      parts: [
        { type: "text", value: "Let's take a " },
        { type: "input", id: "1_0", answer: "look", width: "100px" },
        { type: "text", value: "." },
      ],
    },
    {
      id: 2,
      parts: [
        { type: "text", value: "If I " },
        { type: "input", id: "2_0", answer: "were", width: "80px" },
        { type: "input", id: "2_1", answer: "you", width: "80px" },
        { type: "text", value: "…" },
      ],
    },
    {
      id: 3,
      parts: [
        { type: "input", id: "3_0", answer: "I", width: "60px" },
        { type: "text", value: " wouldn't " },
        { type: "input", id: "3_1", answer: "mind", width: "80px" },
        { type: "text", value: "…" },
      ],
    },
    {
      id: 4,
      parts: [
        { type: "text", value: "It's " },
        { type: "input", id: "4_0", answer: "too", width: "100px" },
        { type: "text", value: " late." },
      ],
    },
    {
      id: 5,
      parts: [
        { type: "text", value: "I'll " },
        { type: "input", id: "5_0", answer: "pass", width: "80px" },
        { type: "text", value: "." },
      ],
    },
  ];

  // collect all input ids
  const allInputs = {};
  questions.forEach((q) =>
    q.parts.forEach((p) => {
      if (p.type === "input") allInputs[p.id] = "";
    }),
  );

  const [answers, setAnswers] = useState(allInputs);
  const [errors, setErrors] = useState(
    Object.keys(allInputs).reduce((a, k) => ({ ...a, [k]: false }), {}),
  );
  const [correctLocked, setCorrectLocked] = useState(
    Object.keys(allInputs).reduce((a, k) => ({ ...a, [k]: false }), {}),
  );
  const [locked, setLocked] = useState(false);

  const normalize = (t) =>
    t
      .toLowerCase()
      .replace(/[.,!?…]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const updateField = (id, value) => {
    if (locked || correctLocked[id]) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const handleCheck = () => {
    if (locked) return;
    const hasEmpty = Object.keys(answers).some(
      (k) => !correctLocked[k] && normalize(answers[k]) === "",
    );
    if (hasEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;
    const newErrors = { ...errors };
    const newLocked = { ...correctLocked };

    questions.forEach((q) => {
      if (q.parts.every((p) => p.type !== "input")) return;
      const inputParts = q.parts.filter((p) => p.type === "input");
      const allOk = inputParts.every(
        (p) => normalize(answers[p.id]) === normalize(p.answer),
      );
      inputParts.forEach((p) => {
        const ok = normalize(answers[p.id]) === normalize(p.answer);
        newErrors[p.id] = !ok;
        if (ok) newLocked[p.id] = true;
      });
      if (allOk) score++;
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
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    const all = {};
    const allLocked = {};
    const noErrors = {};
    questions.forEach((q) =>
      q.parts.forEach((p) => {
        if (p.type === "input") {
          all[p.id] = p.answer;
          allLocked[p.id] = true;
          noErrors[p.id] = false;
        }
      }),
    );
    setAnswers(all);
    setCorrectLocked(allLocked);
    setErrors(noErrors);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(allInputs);
    setErrors(
      Object.keys(allInputs).reduce((a, k) => ({ ...a, [k]: false }), {}),
    );
    setCorrectLocked(
      Object.keys(allInputs).reduce((a, k) => ({ ...a, [k]: false }), {}),
    );
    setLocked(false);
  };

  const inputStyle = (id) => ({
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
    background: "transparent",
    paddingBottom: "2px",
  });

  const renderPart = (part, qi) => {
    if (part.type === "text") {
      return (
        <span key={part.value + qi} style={{ fontSize: "20px" }}>
          {part.value}
        </span>
      );
    }
    return (
      <span
        key={part.id}
        style={{ position: "relative", display: "inline-block" }}
      >
        <input
          type="text"
          value={answers[part.id] || ""}
          disabled={locked || correctLocked[part.id]}
          onChange={(e) => updateField(part.id, e.target.value)}
          style={{ ...inputStyle(part.id), width: part.width }}
        />
        {errors[part.id] && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-10px",
              transform: "translateY(-50%)",
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
          </span>
        )}
      </span>
    );
  };

  // split into 2 columns: [0,2,4] left — [1,3,5] right
  const leftCol = questions.filter((_, i) => i % 2 === 0);
  const rightCol = questions.filter((_, i) => i % 2 !== 0);

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span style={{ marginRight: "10px" }}>
            B
          </span>
          Put in the missing words for each expression.
        </h5>

        {/* QUESTIONS GRID — 2 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "40px",
            rowGap: "90px",
            marginBottom: "60px",
            marginTop: "20px",
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((absIdx) => {
            // interleave: col1 row1=0, col2 row1=1, col1 row2=2 ...
            const q = questions[absIdx];
            return (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginRight: "8px",
                  }}
                >
                  {absIdx + 1}
                </span>
                {q.parts.map((part) => renderPart(part, q.id))}
              </div>
            );
          })}
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

export default Review3_Page1_Q2;
