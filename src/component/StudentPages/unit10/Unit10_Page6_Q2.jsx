import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "./Unit10StudentAudioText";

const audioFolder = "Page 87 - Exercise E";
const baseAudioPrefix = {
  live: "011",
  write: "012",
  type: "013",
  cut: "014",
  drive: "015",
  set: "016",
  knit: "017",
  swim: "018",
  let: "019",
  create: "020",
  put: "021",
  ride: "022",
};

const Unit10_Page6_Q2 = () => {
  const questions = [
    "living",
    "typing",
    "setting",
    "knitting",
    "creating",
    "putting",
    "writing",
    "cutting",
    "driving",
    "swimming",
    "letting",
    "riding",
  ];

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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
      "living",
      "typing",
      "setting",
      "knitting",
      "creating",
      "putting",
      "writing",
      "cutting",
      "driving",
      "swimming",
      "letting",
      "riding",
    ]);

    setResult([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block w-full">
      <input
        type="text"
        placeholder="Write here..."
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        title={`Write the -ing form for item ${i + 1}`}
        aria-label={`Write the -ing form for item ${i + 1}`}
        className={`
          w-full
          h-full
          outline-none
          bg-transparent
          text-[18px]
          text-center
          text-black
          font-semibold
          px-2
       placeholder:text-gray-300
         placeholder:text-[15px]
         placeholder:font-normal
        `}
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
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Complete the chart by writing the{" "}
              <span style={{ color: "#E97E1D" }}>-ing</span> verbs correctly.
            </>
          }
          subTitle="Work through the chart one row at a time and use the row and column headings as clues before checking your entries."
        />

        {/* TOP GREEN BOX WITH AUDIO */}
        <div
          className="rounded-[18px] px-6 py-5 mb-10 text-[18px]"
          style={{ background: "#DDE3C8" }}
        >
          {/* ROW 1 */}
          <div className="flex items-center gap-8 mb-5">
            <div className="w-[120px] shrink-0">
              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "Item_001_")}
                ariaLabel="Play Silent e"
                flowText
              >
                Silent e:
              </Unit10StudentAudioText>
            </div>

            {[
              ["make", "making", "Item_002_"],
              ["bake", "baking", "Item_003_"],
              ["give", "giving", "Item_004_"],
              ["care", "caring", "Item_005_"],
            ].map(([word, ing, prefix]) => (
              <Unit10StudentAudioText
                key={prefix}
                src={unit10StudentAudio(audioFolder, prefix)}
                ariaLabel={`Play ${word} ${ing}`}
                flowText
              >
                <span className="inline-flex items-center gap-2">
                  <span>{word}</span>
                  <span style={{ color: "#E97E1D" }}>➜</span>
                  <span>{ing}</span>
                </span>
              </Unit10StudentAudioText>
            ))}
          </div>

          {/* ROW 2 */}
          <div className="flex items-center gap-8">
            <div className="w-[120px] shrink-0">
              <Unit10StudentAudioText
                src={unit10StudentAudio(audioFolder, "Item_006_")}
                ariaLabel="Play CVC words"
                flowText
              >
                CVC words:
              </Unit10StudentAudioText>
            </div>

            {[
              ["hop", "hopping", "Item_007_"],
              ["tap", "tapping", "Item_008_"],
              ["win", "winning", "Item_009_"],
              ["run", "running", "Item_010_"],
            ].map(([word, ing, prefix]) => (
              <Unit10StudentAudioText
                key={prefix}
                src={unit10StudentAudio(audioFolder, prefix)}
                ariaLabel={`Play ${word} ${ing}`}
                flowText
              >
                <span className="inline-flex items-center gap-2">
                  <span>{word}</span>
                  <span style={{ color: "#E97E1D" }}>➜</span>
                  <span>{ing}</span>
                </span>
              </Unit10StudentAudioText>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="border border-[#9CCB5B] mb-10">
          {[
            ["live", 0, "write", 6],
            ["type", 1, "cut", 7],
            ["set", 2, "drive", 8],
            ["knit", 3, "swim", 9],
            ["create", 4, "let", 10],
            ["put", 5, "ride", 11],
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4">
              {/* LEFT WORD */}
              <div
                className="
                  h-[55px]
                  border-r
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                  text-[18px]
                "
              >
                <Unit10StudentAudioText
                  src={unit10StudentAudio(audioFolder, baseAudioPrefix[row[0]])}
                  ariaLabel={`Play ${row[0]}`}
                  flowText
                >
                  {row[0]}
                </Unit10StudentAudioText>
              </div>

              {/* LEFT ANSWER */}
              <div
                className="
                  h-[55px]
                  border-r
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                "
              >
                {inputField(row[1])}
              </div>

              {/* RIGHT WORD */}
              <div
                className="
                  h-[55px]
                  border-r
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                  text-[18px]
                "
              >
                <Unit10StudentAudioText
                  src={unit10StudentAudio(audioFolder, baseAudioPrefix[row[2]])}
                  ariaLabel={`Play ${row[2]}`}
                  flowText
                >
                  {row[2]}
                </Unit10StudentAudioText>
              </div>

              {/* RIGHT ANSWER */}
              <div
                className="
                  h-[55px]
                  border-b
                  border-[#9CCB5B]
                  flex
                  items-center
                  justify-center
                "
              >
                {inputField(row[3])}
              </div>
            </div>
          ))}
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

export default Unit10_Page6_Q2;
