import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 8.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 9.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 6 Unit 7 If All the Raindrops Were Lemon Folder/SVG/Asset 10.svg";

const Unit7_Page6_Q1 = () => {
  const correctAnswers = [
    [
      "If my friends and I had known",
      "we'd all be at the museum at",
      "the same time,",
      "we would have brought a",
      "picnic lunch.",
      "",
    ],

    [
      "If a meteor had hit the Earth,",
      "",
      "",
      "it would have",
      "started a big fire.",
      "",
    ],

    [
      "If I had a magic lamp,",
      "",
      "",
      "I would wish for beautiful island",
      "to live on.",
      "",
    ],
  ];

  const [answers, setAnswers] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const inputRefs = useRef([
    [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ],
    [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ],
    [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ],
  ]);

  const maxLengths = [
    [36, 36, 36, 36, 36, 36],
    [36, 36, 36, 36, 36, 36],
    [36, 36, 36, 36, 36, 36],
  ];

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (questionIndex, inputIndex, value) => {
    if (locked || result[questionIndex] === true) return;

    const updated = answers.map((row) => [...row]);

    updated[questionIndex][inputIndex] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[questionIndex] = undefined;

      return copy;
    });

    if (
      value.length >= maxLengths[questionIndex][inputIndex] &&
      inputIndex < 5
    ) {
      inputRefs.current[questionIndex][inputIndex + 1]?.current?.focus();
    }
  };
  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((row) => row.every((item) => !item.trim()));

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((row, index) => {
      const fullAnswer = row.join(" ").replace(/\s+/g, " ").trim();

      const ok =
        normalize(fullAnswer) === normalize(correctAnswers[index].join(" "));

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = correctAnswers.length;

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
    setAnswers(correctAnswers);

    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers([
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (questionIndex, inputIndex, width = "240px") => (
    <span className="relative inline-block">
      <input
        ref={inputRefs.current[questionIndex][inputIndex]}
        type="text"
        value={answers[questionIndex][inputIndex]}
        maxLength={maxLengths[questionIndex][inputIndex]}
        disabled={locked || result[questionIndex] === true}
        onChange={(e) =>
          handleChange(questionIndex, inputIndex, e.target.value)
        }
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1

          ${result[questionIndex] === false ? "border-[#D1232A]" : ""}
        `}
        style={{
          width,
          borderBottomWidth: "1px",
        }}
      />

      {result[questionIndex] === false && inputIndex === 5 && (
        <span
          style={{
            position: "absolute",
            top: "-30px",
            right: "8px",
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

  const questionRow = (questionIndex, number, leftImage, rightImage) => (
    <div
      className="grid grid-cols-[40px_90px_1fr_90px_1fr] gap-4 items-center py-4"
      style={{
        borderBottom: questionIndex === 2 ? "none" : "1px solid #9CCB5B",
      }}
    >
      <div className="font-bold text-[18px] self-start ml-5">{number}</div>

      <img
        src={leftImage}
        alt=""
        style={{
          width: "80px",
          height: "auto",
          objectFit: "contain",
        }}
      />

      <div className="flex flex-col gap-3">
        {inputField(questionIndex, 0, "260px")}
        {inputField(questionIndex, 1, "260px")}
        {inputField(questionIndex, 2, "260px")}
      </div>

      <img
        src={rightImage}
        alt=""
        style={{
          width: "90px",
          height: "auto",
          objectFit: "contain",
        }}
      />

      <div className="flex flex-col gap-3">
        {inputField(questionIndex, 3, "260px")}
        {inputField(questionIndex, 4, "260px")}
        {inputField(questionIndex, 5, "260px")}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px]">
        <h5 className="header-title-page8 mb-6">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Make up a third conditional sentence to match each picture. Be
          creative!
        </h5>

        <div
          className="rounded-[14px] overflow-hidden"
          style={{
            border: "2px solid #9CCB5B",
          }}
        >
          {questionRow(0, 1, img1, img2)}

          {questionRow(1, 2, img3, img4)}

          {questionRow(2, 3, img5, img6)}
        </div>
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

export default Unit7_Page6_Q1;
