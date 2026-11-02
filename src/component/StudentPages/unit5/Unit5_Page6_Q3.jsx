import React, { useEffect, useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import Unit5StudentAudioText, {
  stopUnit5StudentAudio,
  unit5StudentAudio,
} from "./Unit5StudentAudioText";

const Unit5_Page6_F = () => {
  const audioFolder = "Page 45 - Exercise F";
  const questions = [
    {
      starter: "You are",
      starterAudio: "Item_002_",
      blanks: 1,
      suffix: ", aren't you?",
      suffixAudio: "Item_001_",
      wide: true, // single wide blank
    },
    {
      starter: "You can",
      starterAudio: "Item_003_",
      blanks: 2,
      suffix: "?",
    },
    {
      starter: "You have",
      starterAudio: "Item_004_",
      blanks: 2,
      suffix: "?",
    },
    {
      starter: "You will",
      starterAudio: "Item_005_",
      blanks: 2,
      suffix: "?",
    },
    {
      starter: "You don't",
      starterAudio: "Item_006_",
      blanks: 2,
      suffix: "?",
    },
  ];

  const buildInitial = () =>
    questions.map((q) => (q.blanks === 1 ? [""] : ["", ""]));

  const [answers, setAnswers] = useState(buildInitial());

  useEffect(() => () => stopUnit5StudentAudio(), []);

  const handleChange = (qi, bi, val) => {
    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[qi][bi] = val;
      return copy;
    });
  };

  const reset = () => {
    stopUnit5StudentAudio();
    setAnswers(buildInitial());
  };

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
        <ExerciseHeader
          sectionLetter="F"
          title="Imagine you are interviewing one of your favorite teachers or an adult at your school. Write six questions you could ask the person, each one using a question tag. You could ask about their interests, how they became trained to do their job, what they like best about their work, etc."
        />

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
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
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  minWidth: "18px",
                }}
              >
                {qi + 1}
              </span>

              {/* Starter */}
              <Unit5StudentAudioText
                src={unit5StudentAudio(audioFolder, q.starterAudio)}
                ariaLabel={`Play ${q.starter}`}
                style={{ fontWeight: "500" }}
              >
                {q.starter}
              </Unit5StudentAudioText>

              {/* Blanks */}
              {q.wide ? (
                // Single wide blank
                <input
                  className="unit5-student-input"
                  value={answers[qi][0]}
                  placeholder="Complete the question"
                  title="Complete the question tag sentence"
                  aria-label={`Question ${qi + 1}`}
                  onChange={(e) => handleChange(qi, 0, e.target.value)}
                  style={inputStyle(true)}
                />
              ) : (
                // Two blanks separated by comma
                <>
                  <input
                    className="unit5-student-input"
                    value={answers[qi][0]}
                    placeholder="Complete the sentence"
                    title="Complete the sentence"
                    aria-label={`Question ${qi + 1}, first blank`}
                    onChange={(e) => handleChange(qi, 0, e.target.value)}
                    style={inputStyle(false)}
                  />
                  <span>,</span>
                  <input
                    className="unit5-student-input"
                    value={answers[qi][1]}
                    placeholder="Add the question tag"
                    title="Add the question tag"
                    aria-label={`Question ${qi + 1}, question tag`}
                    onChange={(e) => handleChange(qi, 1, e.target.value)}
                    style={inputStyle(false)}
                  />
                </>
              )}

              {/* Suffix */}
              {q.suffixAudio ? (
                <Unit5StudentAudioText
                  src={unit5StudentAudio(audioFolder, q.suffixAudio)}
                  ariaLabel="Play aren't you"
                  style={{ fontWeight: "500" }}
                >
                  {q.suffix}
                </Unit5StudentAudioText>
              ) : (
                <span style={{ fontWeight: "500" }}>{q.suffix}</span>
              )}
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
