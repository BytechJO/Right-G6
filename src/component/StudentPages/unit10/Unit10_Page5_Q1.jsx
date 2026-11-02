import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit10StudentAudioText, {
  stopUnit10StudentAudio,
  unit10StudentAudio,
} from "./Unit10StudentAudioText";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 17.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/121.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 16.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 19.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 18.svg";
const Unit10_Page5_Q1 = () => {
  const audioFolder = "Page 86 - Exercise A";
  const questions = [
    "seashells",
    "sunburn",
    "surfing",
    "sandcastles",
    "surfboard",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

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
    setAnswers(["seashells", "sunburn", "surfing", "sandcastles", "surfboard"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    stopUnit10StudentAudio();
    setAnswers(["", "", "", "", ""]);

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
        placeholder="Type the word"
        title={`Picture ${i + 1}: enter the matching word`}
        aria-label={`Picture ${i + 1}: enter the matching word`}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
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
      <div className="div-forall gap-5 mb-10">
        <ExerciseHeader
          sectionLetter="A"
          title="Look and match."
          subTitle="Start with one item, find the matching partner that completes the meaning, then review the pair before moving on."
        />

        {/* WORD BANK */}
        <div
          className="flex justify-between items-center px-6 py-3 rounded-xl mb-5"
          style={{
            background: "#DDE3C8",
            fontSize: "18px",
          }}
        >
          <Unit10StudentAudioText
            src={unit10StudentAudio(audioFolder, "001")}
            ariaLabel="Play surfboard"
            style={{ display: "flex", gap: 8 }}
          >
            <b className="mr-2">a</b>
            surfboard
          </Unit10StudentAudioText>

          <Unit10StudentAudioText
            src={unit10StudentAudio(audioFolder, "002")}
            ariaLabel="Play seashells"
            style={{ display: "flex", gap: 8 }}
          >
            <b className="mr-2">b</b>
            seashells
          </Unit10StudentAudioText>

          <Unit10StudentAudioText
            src={unit10StudentAudio(audioFolder, "003")}
            ariaLabel="Play sandcastles"
            style={{ display: "flex", gap: 8 }}
          >
            <b className="mr-2">c</b>
            sandcastles
          </Unit10StudentAudioText>

          <Unit10StudentAudioText
            src={unit10StudentAudio(audioFolder, "004")}
            ariaLabel="Play sunburn"
            style={{ display: "flex", gap: 8 }}
          >
            <b className="mr-2">d</b>
            sunburn
          </Unit10StudentAudioText>

          <Unit10StudentAudioText
            src={unit10StudentAudio(audioFolder, "005")}
            ariaLabel="Play surfing"
            style={{ display: "flex", gap: 8 }}
          >
            <b className="mr-2">e</b>
            surfing
          </Unit10StudentAudioText>
        </div>

        {/* IMAGES */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-15">
          {/* 1 */}
          <div className="flex items-start gap-3">
            <img
              src={img1}
              alt="seashells"
              style={{ width: "180px", height: "auto", objectFit: "contain" }}
            />

            <div className="flex items-center mt-[75px]">
              <span className="font-bold text-[18px] mr-2">1</span>

              {inputField(0, "w-[120px]")}
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-start gap-3">
            <img
              src={img2}
              alt="sunburn"
              style={{ width: "140px", height: "auto", objectFit: "contain" }}
            />

            <div className="flex items-center mt-[75px]">
              <span className="font-bold text-[18px] mr-2">2</span>

              {inputField(1, "w-[120px]")}
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-start gap-3">
            <img
              src={img3}
              alt="surfing"
              style={{ width: "170px", height: "auto", objectFit: "contain" }}
            />

            <div className="flex items-center mt-[75px]">
              <span className="font-bold text-[18px] mr-2">3</span>

              {inputField(2, "w-[120px]")}
            </div>
          </div>

          {/* 4 */}
          <div className="flex items-start gap-3">
            <img
              src={img4}
              alt="sandcastles"
              style={{ width: "200px", height: "auto", objectFit: "contain" }}
            />

            <div className="flex items-center mt-[90px]">
              <span className="font-bold text-[18px] mr-2">4</span>

              {inputField(3, "w-[130px]")}
            </div>
          </div>

          {/* EMPTY */}
          <div></div>

          {/* 5 */}
          <div className="flex items-start gap-2">
            <img
              src={img5}
              alt="surfboard"
              style={{ width: "80px", height: "auto", objectFit: "contain" }}
            />

            <div className="flex items-center mt-[90px]">
              <span className="font-bold text-[18px] mr-2">5</span>

              {inputField(4, "w-[130px]")}
            </div>
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

export default Unit10_Page5_Q1;
