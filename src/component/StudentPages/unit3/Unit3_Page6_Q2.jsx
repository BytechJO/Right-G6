/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U3/PG 27/pg27.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3StudentAudioText, {
  stopUnit3StudentAudio,
  unit3StudentAudio,
} from "./Unit3StudentAudioText";

const QUESTIONS = [
  {
    id: 1,
    symbol: "x",
    symbolColor: "#f79631",
    parts: [
      {
        prefix: "The teachers couldn't",
        audioIndex: 1,
        inputKey: "q1_p1",
        suffix: "if we didn't have",
        suffixAudioIndex: 2,
      },
      { inputKey: "q1_p2", suffix: "." },
    ],
  },
  {
    id: 2,
    symbol: "?",
    symbolColor: "#f79631",
    parts: [
      { prefix: "If they", audioIndex: 3, inputKey: "q2_p1", suffix: ", " },
      { prefix: "wold", audioIndex: 4, inputKey: "q2_p2", suffix: " " },
      { prefix: "open", audioIndex: 5, inputKey: "q2_p3", suffix: "?" },
    ],
  },
  {
    id: 3,
    symbol: "x",
    symbolColor: "#f79631",
    parts: [{ inputKey: "q3_p1", suffix: "." }],
  },
  {
    id: 4,
    symbol: ".",
    symbolColor: "#f79631",
    parts: [{ inputKey: "q4_p1", suffix: "." }],
  },
];

const CORRECT = {
  q1_p1: ["grade the tests easily"],
  q1_p2: ["multiple choice tests"],
  q2_p1: ["had more books"],
  q2_p2: ["the library"],
  q2_p3: ["soon"],
  q3_p1: ["Karl wouldn’t buy a bicycle if he didn’t save his money from work."],
  q4_p1: ["We would get a swimming pool if we moved to the desert."],
};

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""''’;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// LineInput خارج الكومبوننت
const LineInput = ({ inputKey, answers, errors, locked, onChange }) => {
  const isOk = errors[inputKey] === true;
  const isWrong = errors[inputKey] === false;
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        flex: 1,
        width: "100%",
      }}
    >
      <input
        value={answers[inputKey] || ""}
        disabled={locked || isOk}
        placeholder="Type the missing words"
        title="Type the missing words"
        aria-label={`Type the missing words for ${inputKey}`}
        className="unit3-student-answer-input"
        onChange={(e) => onChange(inputKey, e.target.value)}
        style={{
          width: "100%",
          border: "none",
          borderBottom: isWrong ? "2px solid #ef4444" : "1.5px solid #888",
          outline: "none",
          background: "transparent",
          fontSize: "18px",
          fontWeight: 500,
          // color: isOk ? "#84ad40" : "#6D2980",
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
};

const Unit3_Page6_Q2 = () => {
  const allKeys = Object.keys(CORRECT);
  const initAnswers = () => Object.fromEntries(allKeys.map((k) => [k, ""]));
  const initErrors = () => Object.fromEntries(allKeys.map((k) => [k, null]));

  const [answers, setAnswers] = useState(initAnswers);
  const [errors, setErrors] = useState(initErrors);
  const [locked, setLocked] = useState(false);

  const handleChange = (key, val) => {
    if (locked || errors[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleCheck = () => {
    if (locked) return;
    if (allKeys.some((k) => !answers[k].trim())) {
      ValidationAlert.info();
      return;
    }
    let score = 0;
    const newErr = {};
    allKeys.forEach((k) => {
      const ok = CORRECT[k].some((c) => normalize(answers[k]) === normalize(c));
      if (ok) score++;
      newErr[k] = ok;
    });
    setErrors(newErr);
    const total = allKeys.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    const shown = {};
    allKeys.forEach((k) => (shown[k] = CORRECT[k][0]));
    setAnswers(shown);
    const okErr = {};
    allKeys.forEach((k) => (okErr[k] = true));
    setErrors(okErr);
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit3StudentAudio();
    setAnswers(initAnswers());
    setErrors(initErrors());
    setLocked(false);
  };

  const inputProps = { answers, errors, locked, onChange: handleChange };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall mb-10" style={{ gap: "10px" }}>
        {/* العنوان */}
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Listen to each sentence, and then change it to the required
              positive statement <span style={{ color: "#f79631" }}>(.)</span>,
              question <span style={{ color: "#f79631" }}>(?)</span>, or
              negative statement <span style={{ color: "#f79631" }}>(x)</span>.
            </>
          }
          subTitle={
            <>
              Task 1: Listen for the original meaning and verb form.
              <br />
              Task 2: Rewrite each item in the required positive, question, or
              negative form without changing the meaning.
            </>
          }
        />

        {/* مشغل الصوت */}
        <div >
          <QuestionAudioPlayer
            src={grammer_u1}
            captions={[]}
            pageId="sb_unit3_page27_exercise_e"
          />
        </div>

        {/* الأسئلة */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            fontSize: "17px",
          }}
        >
          {QUESTIONS.map((q) => (
            <div key={q.id} className="flex flex-wrap">
              {/* السطر الأول: رقم + رمز + أول part */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "8px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "20px" }}>
                  {q.id}
                </span>

                {/* الرمز */}
                <span className="flex justify-center">
                  ({" "}
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      // borderRadius: "50%",
                      // border: `2px solid ${q.symbolColor}`,
                      color: q.symbolColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    {q.symbol}
                  </span>
                  )
                </span>
                {/* الـ part الأول */}
                {q.parts[0].prefix && (
                  <Unit3StudentAudioText
                    src={
                      q.parts[0].audioIndex
                        ? unit3StudentAudio(
                            "Page 27 - Exercise E",
                            `Item_${String(q.parts[0].audioIndex).padStart(3, "0")}_`,
                          )
                        : null
                    }
                    ariaLabel={`Play item ${q.id} prompt`}
                    style={{
                      color: "#333",
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.parts[0].prefix}
                  </Unit3StudentAudioText>
                )}
                <LineInput inputKey={q.parts[0].inputKey} {...inputProps} />
                {q.parts[0].suffix && (
                  <Unit3StudentAudioText
                    src={
                      q.parts[0].suffixAudioIndex
                        ? unit3StudentAudio(
                            "Page 27 - Exercise E",
                            `Item_${String(q.parts[0].suffixAudioIndex).padStart(3, "0")}_`,
                          )
                        : null
                    }
                    ariaLabel={`Play item ${q.id} ending`}
                    style={{ color: "#333", whiteSpace: "nowrap" }}
                  >
                    {q.parts[0].suffix}
                  </Unit3StudentAudioText>
                )}
              </div>

              {/* السطر الثاني إن وجد */}
              {q.parts[1] && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                    // paddingLeft: "56px",
                  }}
                >
                  {q.parts[1].prefix && (
                    <Unit3StudentAudioText
                      src={
                        q.parts[1].audioIndex
                          ? unit3StudentAudio(
                              "Page 27 - Exercise E",
                              `Item_${String(q.parts[1].audioIndex).padStart(3, "0")}_`,
                            )
                          : null
                      }
                      ariaLabel={`Play item ${q.id} phrase 2`}
                      style={{ color: "#333", whiteSpace: "nowrap" }}
                    >
                      {q.parts[1].prefix}
                    </Unit3StudentAudioText>
                  )}
                  <LineInput inputKey={q.parts[1].inputKey} {...inputProps} />
                  {q.parts[1].suffix && (
                    <span style={{ color: "#333", whiteSpace: "nowrap" }}>
                      {q.parts[1].suffix}
                    </span>
                  )}
                </div>
              )}

              {q.parts[2] && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                    // paddingLeft: "56px",
                  }}
                >
                  {q.parts[2].prefix && (
                    <Unit3StudentAudioText
                      src={
                        q.parts[2].audioIndex
                          ? unit3StudentAudio(
                              "Page 27 - Exercise E",
                              `Item_${String(q.parts[2].audioIndex).padStart(3, "0")}_`,
                            )
                          : null
                      }
                      ariaLabel={`Play item ${q.id} phrase 3`}
                      style={{ color: "#333", whiteSpace: "nowrap" }}
                    >
                      {q.parts[2].prefix}
                    </Unit3StudentAudioText>
                  )}
                  <LineInput inputKey={q.parts[2].inputKey} {...inputProps} />
                  {q.parts[2].suffix && (
                    <span style={{ color: "#333", whiteSpace: "nowrap" }}>
                      {q.parts[2].suffix}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="action-buttons-container mt-8">
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

export default Unit3_Page6_Q2;
