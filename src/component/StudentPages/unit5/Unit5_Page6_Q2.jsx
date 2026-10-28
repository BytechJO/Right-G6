import React, { useEffect, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 5 You Would, Wouldnt You Folder/SVG/Asset 18.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import audio from "../../../assets/audio/ClassBook/U5/PG 45/CD25.Pg45_Instruction1_Adult Lady.mp3";
import Unit5StudentAudioText, {
  stopUnit5StudentAudio,
  unit5StudentAudio,
} from "./Unit5StudentAudioText";

const Unit5_Page6_Q2 = () => {
  const audioFolder = "Page 45 - Exercise E";
  const playerRef = useRef(null);
  // Each question can have 1 or 2 blanks
  // blanks: array of { key, correct[] }
  // template: function(inputs) => JSX — describes how blanks fit in sentence

  const captions = [
    {
      start: 0.0,
      end: 20.0,
      text: "Listen to the story, and then help make questions about the story that would have a yes answer.",
    },
  ];

  const questions = [
    {
      // "James _______, didn't he? (The correct answer would be Yes, he did.)"
      blanks: [
        {
          key: "1a",
          correct: ["asked his sister to lend him the radio"],
        },
      ],
      hint: { text: "Yes, he did.", prefix: "(The correct answer would be " },
      renderLine: (inputs, hint) => (
        <span>
          James {inputs[0]}, didn't he?{" "}
          {hint && (
            <span style={{ color: "#e05a00", fontWeight: "600" }}>
              {hint.prefix}
              <span style={{ textDecoration: "underline" }}>{hint.text}</span>
            </span>
          )}
        </span>
      ),
    },
    {
      // "Roberta could _______, _______?"
      blanks: [
        { key: "2a", correct: ["lend it to him"] },
        {
          key: "2b",
          correct: ["couldn't she", "could not she", "couldn’t she"],
        },
      ],
      hint: null,
      renderLine: (inputs) => (
        <span>
          Roberta could {inputs[0]}, {inputs[1]}?
        </span>
      ),
    },
    {
      // "James can return _______, can't he?"
      blanks: [{ key: "3a", correct: ["it by 5:00", "it by 5"] }],
      hint: null,
      renderLine: (inputs) => (
        <span>James can return {inputs[0]}, can't he?</span>
      ),
    },
    {
      // "Roberta is _______, _______?"
      blanks: [
        { key: "4a", correct: ["going to the beach"] },
        { key: "4b", correct: ["isn't she", "is not she", "isn’t she"] },
      ],
      hint: null,
      renderLine: (inputs) => (
        <span>
          Roberta is {inputs[0]}, {inputs[1]}?
        </span>
      ),
    },
    {
      // "James and Roberta _______, won't they?"
      blanks: [
        {
          key: "5a",
          correct: ["will help each other out"],
        },
      ],
      hint: null,
      renderLine: (inputs) => (
        <span>James and Roberta {inputs[0]}, won't they?</span>
      ),
    },
  ];

  // Flatten all blank keys in order
  const allKeys = questions.flatMap((q) => q.blanks.map((b) => b.key));
  const buildInitial = () => Object.fromEntries(allKeys.map((k) => [k, ""]));

  const [answers, setAnswers] = useState(buildInitial());
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState({}); // key -> true|false|undefined

  useEffect(() => () => stopUnit5StudentAudio(), []);

  const handleChange = (key, val) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setResult((prev) => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    if (allKeys.some((k) => !answers[k].trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correctCount = 0;
    let total = 0;
    const res = {};
    questions.forEach((q) => {
      q.blanks.forEach((b) => {
        total++;
        const ok = b.correct.some(
          (c) => c.toLowerCase() === answers[b.key].trim().toLowerCase(),
        );
        if (ok) correctCount++;
        res[b.key] = ok;
      });
    });
    setResult(res);
    const msg = `Score: ${correctCount} / ${total}`;
    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const filled = {};
    const res = {};
    questions.forEach((q) => {
      q.blanks.forEach((b) => {
        filled[b.key] = b.correct[0];
        res[b.key] = true;
      });
    });
    setAnswers(filled);
    setResult(res);
    setLocked(true);
  };

  const reset = () => {
    stopUnit5StudentAudio();
    playerRef.current?.pause();
    setAnswers(buildInitial());
    setResult({});
    setLocked(false);
  };

  // Render a single input blank
  const inputEl = (key, width = 180) => (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
      }}
    >
      <input
        className="unit5-student-input"
        value={answers[key] ?? ""}
        placeholder="Enter the missing words"
        title="Enter the words that make a question with a yes answer"
        aria-label={`Answer ${key}`}
        onChange={(e) => handleChange(key, e.target.value)}
        disabled={locked || result[key] === true}
        style={{
          borderBottom: `1px solid ${
            result[key] === false
              ? "#ef4444"
              : result[key] === true
                ? "black"
                : "black"
          }`,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          outline: "none",
          background: "transparent",
          fontSize: "15px",
          fontWeight: "600",

          width: `${width}px`,
          padding: "2px 4px",
          marginLeft: "4px",
          marginRight: "4px",
        }}
      />
      {result[key] === false && (
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
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall mb-10" style={{ gap: "10px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Listen to the story, and then help make questions about the story
              that would have a{" "}
              <span style={{ color: "#f79631", fontWeight: "700" }}>yes</span>{" "}
              answer.
            </>
          }
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Listen for a detail that makes the answer Yes.
              </span>
              <span style={{ display: "block" }}>
                Task 2: Use that detail to write the matching question with the
                correct question tag or auxiliary.
              </span>
            </>
          }
        />
        <QuestionAudioPlayer
          ref={playerRef}
          src={audio}
          captions={captions}
          stopAtSecond={10.5}
          pageId="sb_unit5_page45_exercise_e"
        />
        <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
          {/* QUESTIONS */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "26px",
              fontSize: "18px",
            }}
          >
            {questions.map((q, i) => {
              // Build inputs array in blank order
              const inputs = q.blanks.map((b) =>
                inputEl(b.key, i === 0 || i === 4 ? 200 : 160),
              );
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontWeight: "bold", minWidth: "18px" }}>
                    {i + 1}
                  </span>
                  <div style={{ lineHeight: "2" }}>
                    {i === 0 && (
                      <span>
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_002_")}
                          ariaLabel="Play James"
                        >
                          James
                        </Unit5StudentAudioText>{" "}
                        {inputs[0]}
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_001_")}
                          ariaLabel="Play the end of question 1"
                        >
                          <span>, didn't he? </span>
                          <span style={{ color: "#e05a00", fontWeight: "600" }}>
                            (The correct answer would be Yes, he did.)
                          </span>
                        </Unit5StudentAudioText>{" "}
                      </span>
                    )}
                    {i === 1 && (
                      <span>
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_004_")}
                          ariaLabel="Play Roberta could"
                        >
                          Roberta could
                        </Unit5StudentAudioText>{" "}
                        {inputs[0]}, {inputs[1]}?
                      </span>
                    )}
                    {i === 2 && (
                      <span>
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_006_")}
                          ariaLabel="Play James can return"
                        >
                          James can return
                        </Unit5StudentAudioText>{" "}
                        {inputs[0]}
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_005_")}
                          ariaLabel="Play can't he"
                        >
                          , can't he?
                        </Unit5StudentAudioText>
                      </span>
                    )}
                    {i === 3 && (
                      <span>
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_007_")}
                          ariaLabel="Play Roberta is"
                        >
                          Roberta is
                        </Unit5StudentAudioText>{" "}
                        {inputs[0]}, {inputs[1]}?
                      </span>
                    )}
                    {i === 4 && (
                      <span>
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_008_")}
                          ariaLabel="Play James and Roberta"
                        >
                          James and Roberta
                        </Unit5StudentAudioText>{" "}
                        {inputs[0]}
                        <Unit5StudentAudioText
                          src={unit5StudentAudio(audioFolder, "Item_009_")}
                          ariaLabel="Play won't they"
                        >
                          , won't they?
                        </Unit5StudentAudioText>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* IMAGE placeholder — uncomment img import above and replace src */}
          {/* <img src={img1} alt="" style={{ width: "140px", borderRadius: "10px", objectFit: "cover" }} /> */}

          <img
            src={img1}
            alt="James and Roberta standing back to back"
            style={{ height: "240px" }}
          />
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
      {/* BUTTONS */}
    </div>
  );
};

export default Unit5_Page6_Q2;
