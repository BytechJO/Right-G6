import React, { useState } from "react";

const Review3_Page2_Q2 = () => {
  const questions = [
    {
      id: 0,
      text: "What would you do if you went on a roller coaster?",
    },
    {
      id: 1,
      text: "What would you order if you went to a fancy restaurant?",
    },
    {
      id: 2,
      text: "What would you ask about if you met a famous scientist?",
    },
  ];

  const initAnswers = () => questions.map(() => "");
  const [answers, setAnswers] = useState(initAnswers);
  const [locked, setLocked] = useState(false);

  const handleChange = (i, value) => {
    if (locked) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setLocked(false);
  };

  const handleDone = () => {
    setLocked(true);
  };

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall" style={{gap:"40px"}}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-10">
          <span style={{ marginRight: "10px" }}>E</span>
          Answer the following questions with a second conditional sentence.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "90px",
            marginBottom: "60px",
          }}
        >
          {questions.map((q, i) => (
            <div key={q.id}>
              {/* QUESTION TEXT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  marginBottom: "10px",
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
                <span style={{ fontSize: "18px" }}>
                  {q.text}
                </span>
              </div>

              {/* ANSWER LINE */}
              <input
                type="text"
                value={answers[i]}
                disabled={locked}
                onChange={(e) => handleChange(i, e.target.value)}
                style={{
                  // width: "100%",
                  border: "none",
                  borderBottom: "1.5px solid",
                  outline: "none",
                  fontSize: "18px",
                  // color: "#6D2980",
                  fontWeight: 600,
                  background: "transparent",
                  paddingBottom: "4px",
                  marginLeft: "30px",
                  width: "calc(100% - 30px)",
                }}
              />
            </div>
          ))}
        </div>

        {/* BUTTONS — Start Again only */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review3_Page2_Q2;
