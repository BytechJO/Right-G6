import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review10_Page2_Q1 = () => {
  const correctGroups = {
    present: [
      "Derek is taking a test right now.",
      "Are you walking to school?",
      "We are working at the restaurant today.",
      "Is the class taking a field trip?",
      "I am shopping at the mall right now.",
    ],

    gerund: [
      "Riding horses is my favorite thing to do.",
      "Mariam doesn’t like watching TV.",
      "My sister loves engineering.",
      "Does Elena like nursing?",
      "Who wants to go surfing?",
    ],
  };

  const sentencePool = [
    "Derek is taking a test right now.",
    "Riding horses is my favorite thing to do.",
    "Are you walking to school?",
    "Does Elena like nursing?",
    "Who wants to go surfing?",
    "Mariam doesn’t like watching TV.",
    "My sister loves engineering.",
    "We are working at the restaurant today.",
    "Is the class taking a field trip?",
    "I am shopping at the mall right now.",
  ];

  const [presentAnswers, setPresentAnswers] = useState(["", "", "", "", ""]);

  const [gerundAnswers, setGerundAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState({
    present: [],
    gerund: [],
  });

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (group, index, value) => {
    if (locked) return;

    if (group === "present") {
      const updated = [...presentAnswers];

      updated[index] = value;

      setPresentAnswers(updated);

      setResult((prev) => ({
        ...prev,
        present: prev.present.map((item, i) =>
          i === index ? undefined : item,
        ),
      }));
    } else {
      const updated = [...gerundAnswers];

      updated[index] = value;

      setGerundAnswers(updated);

      setResult((prev) => ({
        ...prev,
        gerund: prev.gerund.map((item, i) => (i === index ? undefined : item)),
      }));
    }
  };

  const checkAnswers = () => {
    if (locked) return;

    const allAnswers = [...presentAnswers, ...gerundAnswers];

    const hasEmpty = allAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const usedPresent = [];

    const newPresentResults = presentAnswers.map((a) => {
      const normalizedAnswer = normalize(a);

      const matchIndex = correctGroups.present.findIndex(
        (item, idx) =>
          normalize(item) === normalizedAnswer && !usedPresent.includes(idx),
      );

      const ok = matchIndex !== -1;

      if (ok) {
        usedPresent.push(matchIndex);
        correctCount++;
      }

      return ok;
    });

    const usedGerund = [];

    const newGerundResults = gerundAnswers.map((a) => {
      const normalizedAnswer = normalize(a);

      const matchIndex = correctGroups.gerund.findIndex(
        (item, idx) =>
          normalize(item) === normalizedAnswer && !usedGerund.includes(idx),
      );

      const ok = matchIndex !== -1;

      if (ok) {
        usedGerund.push(matchIndex);
        correctCount++;
      }

      return ok;
    });

    setResult({
      present: newPresentResults,
      gerund: newGerundResults,
    });

    const total = 10;

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
    setPresentAnswers([
      "Derek is taking a test right now.",
      "Are you walking to school?",
      "We are working at the restaurant today.",
      "Is the class taking a field trip?",
      "I am shopping at the mall right now.",
    ]);

    setGerundAnswers([
      "Riding horses is my favorite thing to do.",
      "Mariam doesn’t like watching TV.",
      "My sister loves engineering.",
      "Does Elena like nursing?",
      "Who wants to go surfing?",
    ]);

    setResult({
      present: [true, true, true, true, true],
      gerund: [true, true, true, true, true],
    });

    setLocked(true);
  };

  const handleReset = () => {
    setPresentAnswers(["", "", "", "", ""]);

    setGerundAnswers(["", "", "", "", ""]);

    setResult({
      present: [],
      gerund: [],
    });

    setLocked(false);
  };

  const inputField = (group, index, value, isCorrect) => (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        disabled={locked || isCorrect === true}
        onChange={(e) => handleChange(group, index, e.target.value)}
        className={`
          w-full
          h-full
          border-0
          outline-none
          bg-transparent
          text-[18px]
          text-black
          px-2

          ${isCorrect === false ? "border border-[#D1232A]" : ""}
        `}
      />

      {isCorrect === false && (
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
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px]">
        {/* TITLE */}
        <div className="header-title-page8 mb-10">
          <span className=" mr-4">D</span>
          Put the sentences below into the correct group on the chart.
        </div>

        {/* TABLES */}
        <div className="flex gap-8 mb-10">
          {/* PRESENT */}
          <div className="flex-1">
            <div
              className="
                h-[55px]
                rounded-[14px]
                border
                border-[#9CCB5B]
                flex
                items-center
                justify-center
                font-semibold
                mb-2
                bg-[#E2E9D1]
              "
            >
              Present Progressive
            </div>

            <div
              className="
                border
                border-[#9CCB5B]
                rounded-[14px]
                overflow-hidden
              "
            >
              <div className="h-[46px] border-b border-[#9CCB5B] px-2 flex items-center ">
                I am rock climbing.
              </div>

              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="
                    h-[46px]
                    border-b
                    last:border-b-0
                    border-[#9CCB5B]
                    px-2
                    flex
                    items-center
                  "
                >
                  {inputField(
                    "present",
                    i,
                    presentAnswers[i],
                    result.present[i],
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* GERUND */}
          <div className="flex-1">
            <div
              className="
                h-[55px]
                rounded-[14px]
                border
                border-[#9CCB5B]
                flex
                items-center
                justify-center
                font-semibold
                mb-2
                 bg-[#E2E9D1]
              "
            >
              Gerund
            </div>

            <div
              className="
                border
                border-[#9CCB5B]
                rounded-[14px]
                overflow-hidden
              "
            >
              <div className="h-[46px] border-b border-[#9CCB5B] px-2 flex items-center">
                I like rock climbing.
              </div>

              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="
                    h-[46px]
                    border-b
                    last:border-b-0
                    border-[#9CCB5B]
                    px-2
                    flex
                    items-center
                  "
                >
                  {inputField("gerund", i, gerundAnswers[i], result.gerund[i])}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SENTENCE BANK */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-20 mb-10">
          {sentencePool.map((sentence, index) => (
            <div key={index}>{sentence}</div>
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

export default Review10_Page2_Q1;
