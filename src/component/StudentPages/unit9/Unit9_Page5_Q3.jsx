import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import sound from "../../../assets/audio/ClassBook/U9/PG 80/CD45Pg80_Instruction_Adult Lady.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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
  const captions = [
    {
      start: 0.199,
      end: 4.099,
      text: "Page 84. Grammar. Using gerunds.",
    },

    {
      start: 5.099,
      end: 6.92,
      text: "Stella likes climbing on rocks.",
    },

    {
      start: 7.859,
      end: 9.86,
      text: "Does Stella like climbing on rocks?",
    },

    {
      start: 10.659,
      end: 13.879,
      text: "Your brothers prefer riding dirt bikes.",
    },

    {
      start: 13.92,
      end: 16.5,
      text: "Do your brothers prefer riding dirt bikes?",
    },
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
    setAnswers(["", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block w-full">
      <input
        type="text"
        value={answers[i]}
        placeholder="type here..."
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
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
      <div className="div-forall">
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Listen to the passage and finish the chart.
        </h5>
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={2.5}
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
                Who
              </th>

              <th
                className="border border-[#9CCB5B] p-3 text-[#83AC40]"
                style={{ width: "50%" }}
              >
                Activity
              </th>

              <th
                className="border border-[#9CCB5B] p-3 text-[#83AC40]"
                style={{ width: "28%" }}
              >
                Length of Time
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">Mark</td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                has been playing the guitar
              </td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                since last year
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">Alice</td>

              <td className="border border-[#9CCB5B] p-3">{inputField(0)}</td>

              <td className="border border-[#9CCB5B] p-3">
                <div className="flex items-center gap-2">
                  <span>for</span>
                  <div className="flex-1">{inputField(1)}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3">{inputField(2)}</td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                has been staying with her grandmother
              </td>

              <td className="border border-[#9CCB5B] p-3">
                <div className="flex items-center gap-2">
                  <span>for</span>
                  <div className="flex-1">{inputField(3)}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">Jim</td>

              <td className="border border-[#9CCB5B] p-3">{inputField(4)}</td>

              <td className="border border-[#9CCB5B] p-3">
                <div className="flex items-center gap-2">
                  <span>since</span>
                  <div className="flex-1">{inputField(5)}</div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3 text-center">
                My sisters
              </td>

              <td className="border border-[#9CCB5B] p-3">{inputField(6)}</td>

              <td className="border border-[#9CCB5B] p-3">{inputField(7)}</td>
            </tr>

            <tr>
              <td className="border border-[#9CCB5B] p-3">{inputField(8)}</td>

              <td className="border border-[#9CCB5B] p-3 text-center">
                has been collecting rocks
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
