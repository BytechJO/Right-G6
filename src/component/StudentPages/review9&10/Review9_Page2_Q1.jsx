import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "../unit10/Unit10StudentAudioText";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 21.svg";

const audioFolder = "Page 89 - Exercise D";

const Review9_Page2_Q1 = () => {
  const questions = [
    "has been snowing",
    "have been travelling",
    "has been rock climbing",
    "have",
    "been doing",
    "Have",
    "been skiing",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers([
      "has been snowing",
      "have been travelling",
      "has been rock climbing",
      "have",
      "been doing",
      "Have",
      "been skiing",
    ]);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        placeholder="Verb form"
        title={`Blank ${i + 1}: write the present perfect progressive form`}
        aria-label={`Blank ${i + 1}: write the present perfect progressive form`}
        className={`
          ${width}
          border-0
          border-b
          border-black
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          borderBottomWidth: "1px",
        }}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px] gap-7 mb-10">
        <ExerciseHeaderReview
          sectionLetter="D"
          title="Write the present perfect progressive verb form in each blank."
          subTitle="Read the full sentence first, then enter the verb form that fits both meaning and grammar before checking."
        />

        {/* CONTENT */}
        <div className="flex justify-between items-start gap-10 w-[110%]">
          {/* QUESTIONS */}
          <div className="flex flex-col gap-15 flex-1">
            {/* 1 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">1</span>

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "002")}
                flowText
              >
                It
              </Unit10StudentAudioText>

              {inputField(0, "w-[180px]")}

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "001")}
                flowText
              >
                (<span style={{ color: "#E97E1D" }}>snow</span>) for three days.
              </Unit10StudentAudioText>
            </div>

            {/* 2 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">2</span>

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "003")}
                flowText
              >
                Our cousins
              </Unit10StudentAudioText>

              {inputField(1, "w-[190px]")}

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "004")}
                flowText
              >
                (<span style={{ color: "#E97E1D" }}>travel</span>) for two
                weeks.
              </Unit10StudentAudioText>
            </div>

            {/* 3 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">3</span>

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "006")}
                flowText
              >
                My brother
              </Unit10StudentAudioText>

              {inputField(2, "w-[240px]")}

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "005")}
                flowText
              >
                (<span style={{ color: "#E97E1D" }}>rock climb</span>) many
                times before.
              </Unit10StudentAudioText>
            </div>

            {/* 4 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">4</span>

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "007")}
                flowText
              >
                What
              </Unit10StudentAudioText>

              {inputField(3, "w-[90px]")}

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "009")}
                flowText
              >
                you
              </Unit10StudentAudioText>

              {inputField(4, "w-[170px]")}

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "008")}
                flowText
              >
                (<span style={{ color: "#E97E1D" }}>do</span>) lately?
              </Unit10StudentAudioText>
            </div>

            {/* 5 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">5</span>

              {inputField(5, "w-[90px]")}

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "009")}
                flowText
              >
                you
              </Unit10StudentAudioText>

              {inputField(6, "w-[170px]")}

              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "010")}
                flowText
              >
                (<span style={{ color: "#E97E1D" }}>ski</span>) in the Alps?
              </Unit10StudentAudioText>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src={img1}
              alt="A person rock climbing on a snowy mountain"
              style={{
                width: "250px",
                height: "350px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* BUTTONS */}
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

export default Review9_Page2_Q1;
