import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit5_Page6_F = () => {
  const questions = [
    {
      starter: "You are",
      blanks: 1,
      suffix: ", aren't you?",
      wide: true, // single wide blank
    },
    {
      starter: "You can",
      blanks: 2,
      suffix: "?",
    },
    {
      starter: "You have",
      blanks: 2,
      suffix: "?",
    },
    {
      starter: "You will",
      blanks: 2,
      suffix: "?",
    },
    {
      starter: "You don't",
      blanks: 2,
      suffix: "?",
    },
  ];

  const buildInitial = () =>
    questions.map((q) => (q.blanks === 1 ? [""] : ["", ""]));

  const [answers, setAnswers] = useState(buildInitial());

  const handleChange = (qi, bi, val) => {
    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[qi][bi] = val;
      return copy;
    });
  };

  const reset = () => setAnswers(buildInitial());

  const inputStyle = (wide) => ({
    borderBottom: "1.5px solid #555",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    outline: "none",
    background: "transparent",
    fontSize: "18px",
    fontWeight: "600",
    // color: "#6D2980",
    width: wide ? "320px" : "250px",
    padding: "2px 6px",
    marginLeft: "6px",
    marginRight: "4px",
  });

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* HEADER */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A mr-2">F</span>
          Imagine you are interviewing one of your favorite teachers or an adult
          at your school. Write six questions you could ask the person, each one
          using a question tag. You could ask about their interests, how they
          became trained to do their job, what they like best about their work,
          etc.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            fontSize: "18px",
          }}
        >
          {questions.map((q, qi) => (
            <div
              key={qi}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {/* Number */}
              <span style={{ fontWeight: "bold",fontSize: "20px", minWidth: "18px" }}>
                {qi + 1}
              </span>

              {/* Starter */}
              <span style={{ fontWeight: "500" }}>{q.starter}</span>

              {/* Blanks */}
              {q.wide ? (
                // Single wide blank
                <input
                  value={answers[qi][0]}
                  onChange={(e) => handleChange(qi, 0, e.target.value)}
                  style={inputStyle(true)}
                />
              ) : (
                // Two blanks separated by comma
                <>
                  <input
                    value={answers[qi][0]}
                    onChange={(e) => handleChange(qi, 0, e.target.value)}
                    style={inputStyle(false)}
                  />
                  <span>,</span>
                  <input
                    value={answers[qi][1]}
                    onChange={(e) => handleChange(qi, 1, e.target.value)}
                    style={inputStyle(false)}
                  />
                </>
              )}

              {/* Suffix */}
              <span style={{ fontWeight: "500" }}>{q.suffix}</span>
            </div>
          ))}
        </div>
      </div>
      {/* RESET BUTTON ONLY */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Unit5_Page6_F;
