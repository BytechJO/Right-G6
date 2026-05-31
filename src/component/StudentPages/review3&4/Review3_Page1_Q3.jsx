import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import skyImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 4 Whats It Like Folder/SVG/Asset 59.svg";

const Review3_Page1_Q3 = () => {
  const questions = [
    {
      id: 0,
      dialog: true,
      speaker1: {
        name: "Kristina",
        text: "Do you think it will be sunny today?",
      },
      speaker2: { name: "Larry", inputId: "0_0", answer: "I don’t think so." },
    },
    {
      id: 1,
      parts: [
        { type: "input", id: "1_0", answer: "If I were you", width: "220px" },
        { type: "text", value: ", I would at least try out for the team." },
      ],
    },
    {
      id: 2,
      parts: [
        { type: "input", id: "2_0", answer: "take a look", width: "200px" },
        { type: "text", value: " at the pictures?" },
      ],
    },
    {
      id: 3,
      parts: [
        { type: "text", value: "I think " },
        {
          type: "input",
          id: "3_0",
          answer: "it's too late",
          width: "220px",
        },
        { type: "text", value: " to go shopping." },
      ],
      extra: "Most of the stores closed at 9:00.",
    },
    {
      id: 4,
      parts: [
        { type: "text", value: "No, " },
        { type: "input", id: "4_0", answer: "I wouldn't mind", width: "220px" },
        {
          type: "text",
          value: " if you came over. It would be great to see you!",
        },
      ],
    },
  ];

  // collect all input ids
  const allIds = {};
  questions.forEach((q) => {
    if (q.dialog) {
      allIds[q.speaker2.inputId] = "";
    } else {
      q.parts.forEach((p) => {
        if (p.type === "input") allIds[p.id] = "";
      });
    }
  });

  const [answers, setAnswers] = useState({ ...allIds });
  const [errors, setErrors] = useState(
    Object.keys(allIds).reduce((a, k) => ({ ...a, [k]: false }), {}),
  );
  const [correctLocked, setCorrectLocked] = useState(
    Object.keys(allIds).reduce((a, k) => ({ ...a, [k]: false }), {}),
  );
  const [locked, setLocked] = useState(false);

  const normalize = (t) =>
    t
      .toLowerCase()
      .replace(/don’t/g, "do not")
      .replace(/don't/g, "do not")
      .replace(/it’s/g, "it is")
      .replace(/it's/g, "it is")
      .replace(/wouldn’t/g, "would not")
      .replace(/wouldn't/g, "would not")
      .replace(/[.’,!?]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const updateField = (id, value) => {
    if (locked || correctLocked[id]) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  // gather all input parts for scoring
  const getAllInputParts = () => {
    const parts = [];
    questions.forEach((q) => {
      if (q.dialog) {
        parts.push({ id: q.speaker2.inputId, answer: q.speaker2.answer });
      } else {
        q.parts.forEach((p) => {
          if (p.type === "input") parts.push(p);
        });
      }
    });
    return parts;
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

    // score per question (all inputs in question must be correct)
    questions.forEach((q) => {
      const inputParts = q.dialog
        ? [{ id: q.speaker2.inputId, answer: q.speaker2.answer }]
        : q.parts.filter((p) => p.type === "input");

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
    getAllInputParts().forEach((p) => {
      all[p.id] = p.answer;
      allLocked[p.id] = true;
      noErrors[p.id] = false;
    });
    setAnswers(all);
    setCorrectLocked(allLocked);
    setErrors(noErrors);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers({ ...allIds });
    setErrors(Object.keys(allIds).reduce((a, k) => ({ ...a, [k]: false }), {}));
    setCorrectLocked(
      Object.keys(allIds).reduce((a, k) => ({ ...a, [k]: false }), {}),
    );
    setLocked(false);
  };

  const inputStyle = (id, width) => ({
    border: "none",
    borderBottom: errors[id]
      ? "1.5px solid #dc2626"
      : correctLocked[id]
        ? "1.5px solid black"
        : "1.5px solid black",
    outline: "none",
    fontSize: "18px",
    textAlign:"center",
    // color: errors[id] ? "#dc2626" : correctLocked[id] ? "#16a34a" : "#6D2980",
    fontWeight: 600,
    background: "transparent",
    paddingBottom: "2px",
    width: width || "200px",
  });

  const ErrorBadge = () => (
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
  );

  const renderInput = (id, width) => (
    <span style={{ position: "relative", display: "inline-block" }}>
      <input
        type="text"
        value={answers[id] || ""}
        disabled={locked || correctLocked[id]}
        onChange={(e) => updateField(id, e.target.value)}
        style={inputStyle(id, width)}
      />
      {errors[id] && <ErrorBadge />}
    </span>
  );

  const renderParts = (parts) =>
    parts.map((part, pi) =>
      part.type === "text" ? (
        <span key={pi} style={{ fontSize: "18px" }}>
          {part.value}
        </span>
      ) : (
        <span key={pi}>{renderInput(part.id, part.width)}</span>
      ),
    );

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-20">
          <span style={{ marginRight: "10px" }}>C</span>
          Now write in the expressions from Exercise B in the blanks.
        </h5>

        {/* CONTENT — questions left, image right */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          {/* QUESTIONS */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              marginBottom: "60px",
            }}
          >
            {questions.map((q, i) => (
              <div key={q.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    // flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      minWidth: "20px",
                    }}
                  >
                    {i + 1}
                  </span>

                  {q.dialog ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {/* Speaker 1 */}
                      <div style={{ fontSize: "18px" }}>
                        <span style={{ color: "#f79631", fontWeight: 700 }}>
                          {q.speaker1.name}:
                        </span>{" "}
                        {q.speaker1.text}
                      </div>
                      {/* Speaker 2 */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            color: "#f79631",
                            fontWeight: 700,
                            fontSize: "18px",
                          }}
                        >
                          {q.speaker2.name}:
                        </span>
                        {renderInput(q.speaker2.inputId, "280px")}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        alignItems: "baseline",
                        flexWrap: "wrap",
                        gap: "4px",
                      }}
                    >
                      {renderParts(q.parts)}
                    </div>
                  )}
                </div>

                {/* extra line */}
                {q.extra && (
                  <div
                    style={{
                      marginLeft: "30px",
                      marginTop: "8px",
                      fontSize: "18px",
                      // color: "#333",
                    }}
                  >
                    {q.extra}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SKY IMAGE */}
          <img
            src={skyImg}
            alt="sky"
            style={{
              height: "350px",
              borderRadius: "12px",
              objectFit: "contain",
              flexShrink: 0,
              marginTop: "4px",
            }}
          />
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

export default Review3_Page1_Q3;
