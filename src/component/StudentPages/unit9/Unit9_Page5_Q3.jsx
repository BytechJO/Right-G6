import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import sound from "../../../assets/audio/ClassBook/U9/PG 80/CD45Pg80_Instruction_Adult Lady.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import Unit9StudentAudioText, {
  stopUnit9StudentAudio,
  unit9StudentAudio,
} from "./Unit9StudentAudioText";

const audioFolder = "Page 80 - Exercise C";
const inputLabels = [
  "Alice activity",
  "Alice length of time",
  "Person staying with her grandmother",
  "Length of time staying with her grandmother",
  "Jim activity",
  "Jim starting time",
  "My sisters activity",
  "My sisters length of time",
  "Person collecting rocks",
  "Length of time collecting rocks",
];
const captions = [
  {
    start: 0.159,
    end: 4.0,
    text: "Page 80, right activity. Exercise C",
  },
  {
    start: 4.099,
    end: 11.539,
    text: "Listen to the passage and finish the chart.",
  },
];
const Unit9_Page5_Q3 = () => {
  const questions = [
    "has been practicing archery",
    "five years",
    "Clara",
    "two months",
    "has been volunteering at the children's hospital",
    "fourth grade",
    "has been learning sign language",
    "since last year",
    "my brother",
    "for several years",
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
      "has been practicing archery",
      "five years",
      "Clara",
      "two months",
      "has been volunteering at the children's hospital",
      "fourth grade",
      "has been learning sign language",
      "since last year",
      "my brother",
      "for several years",
    ]);

    setResult([true, true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit9StudentAudio();
    setAnswers(["", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block w-full">
      <input
        type="text"
        value={answers[i]}
        placeholder="Type here"
        title={inputLabels[i]}
        aria-label={inputLabels[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`unit9-input
          w-full
          h-full
          border-0
          outline-none
          bg-transparent
          text-[18px]
          text-black
          text-center
          font-semibold
          px-2

          ${result[i] === false ? "border border-[#D1232A]" : ""}
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
      <div className="div-forall mb-10">
        <ExerciseHeader
          sectionLetter="C"
          title="Listen to the passage and finish the chart."
          subTitle="Task 1: Listen for the person, activity, and duration as three separate details. Task 2: Replay the relevant part and complete each row of the chart before checking."
        />
        <QuestionAudioPlayer
          src={sound}
          pageId="Unit9_Page5_Q3"
          captions={captions}
        />
        <table
          className="w-full border-collapse text-[18px]"
          style={{
            border: "2px solid #9CCB5B",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#DDE3C8",
              }}
            >
              <th
                className="border border-[#9CCB5B] p-3 text-[#83AC40]"
                style={{ width: "22%" }}
              >
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "001")}
                  flowText
                >
                  Who
                </Unit9StudentAudioText>
              </th>

              <th
                className="border border-[#9CCB5B] p-3 text-[#83AC40]"
                style={{ width: "50%" }}
              >
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "002")}
                  flowText
                >
                  Activity
                </Unit9StudentAudioText>
              </th>

              <th
                className="border border-[#9CCB5B] p-3 text-[#83AC40]"
                style={{ width: "28%" }}
              >
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "003")}
                  flowText
                >
                  Length of Time
                </Unit9StudentAudioText>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "004")}
                  flowText
                >
                  Mark
                </Unit9StudentAudioText>
              </td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "005")}
                  flowText
                >
                  has been playing the guitar
                </Unit9StudentAudioText>
              </td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "006")}
                  flowText
                >
                  since last year
                </Unit9StudentAudioText>
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "007")}
                  flowText
                >
                  Alice
                </Unit9StudentAudioText>
              </td>

              <td className="border border-[#9CCB5B] p-3">{inputField(0)}</td>

              <td className="border border-[#9CCB5B] p-3">
                <div className="flex items-center gap-2">
                  <Unit9StudentAudioText
                    src={unit9StudentAudio(audioFolder, "008")}
                    flowText
                  >
                    for
                  </Unit9StudentAudioText>
                  <div className="flex-1">{inputField(1)}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3">{inputField(2)}</td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "009")}
                  flowText
                >
                  has been staying with her grandmother
                </Unit9StudentAudioText>
              </td>

              <td className="border border-[#9CCB5B] p-3">
                <div className="flex items-center gap-2">
                  <span>
                    {" "}
                    <Unit9StudentAudioText
                      src={unit9StudentAudio(audioFolder, "008")}
                      flowText
                    >
                      for
                    </Unit9StudentAudioText>
                  </span>
                  <div className="flex-1">{inputField(3)}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "010")}
                  flowText
                >
                  Jim
                </Unit9StudentAudioText>
              </td>

              <td className="border border-[#9CCB5B] p-3">{inputField(4)}</td>

              <td className="border border-[#9CCB5B] p-3">
                <div className="flex items-center gap-2">
                  <Unit9StudentAudioText
                    src={unit9StudentAudio(audioFolder, "011")}
                    flowText
                  >
                    since
                  </Unit9StudentAudioText>
                  <div className="flex-1">{inputField(5)}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "012")}
                  flowText
                >
                  My sisters
                </Unit9StudentAudioText>
              </td>

              <td className="border border-[#9CCB5B] p-3">{inputField(6)}</td>

              <td className="border border-[#9CCB5B] p-3">{inputField(7)}</td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3">{inputField(8)}</td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                <Unit9StudentAudioText
                  src={unit9StudentAudio(audioFolder, "013")}
                  flowText
                >
                  has been collecting rocks
                </Unit9StudentAudioText>
              </td>

              <td className="border border-[#9CCB5B] p-3">{inputField(9)}</td>
            </tr>
          </tbody>
        </table>
      </div>

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

export default Unit9_Page5_Q3;
