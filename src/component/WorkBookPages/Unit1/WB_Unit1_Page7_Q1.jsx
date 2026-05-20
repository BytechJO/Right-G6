import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page7_F = () => {
  const story = `"You can say that again!" I agree with my younger brother, who just said it is hot today. We have been camping for a week, and we are getting our supplies packed because we have to leave. It is 8:00 a.m., but the sun is already hot, and so are all of us. It's no fun to pack when it's hot outside.

"Can I count on you to fold up the tent?" asks my mom. The stove is packed by my dad, the campsite is cleaned by my sister, and the car is packed by my older brother, so that leaves me to do the tent.

"Sure," I say, but without much excitement in my voice.

"I'm sorry to hear that," I hear my dad say, and I look over to see him talking to the park ranger. "Do you have any idea of when it's likely to be opened again?" my dad asks.

My dad comes to our campfire and calls to all of us to come over. "I have some news that's likely to surprise or upset you," he says, "but don't worry, everything's going to work out well. The park ranger just told me that a set of big trucks were using the campground road late last night, and the road fell apart. So we have to stay another night."

The reaction he got from us is probably different from what he expected. He was hugged by us, twirled around in circles by my brother, patted on the back by my sister, and stared at by my mother. We were all surprised and happy about staying for another day!`;

  const questions = [
    {
      id: 1,
      question: "What has the narrator been doing for the last week?",
      answer: "camping",
      inline: true,
    },
    {
      id: 2,
      question: "Why is it difficult to start packing?",
      answer: ["It is hot", "Camping was lots of fun, so they don't want to leave."],
      subLabels: ["a)", "b)"],
      multiLine: true,
    },
    {
      id: 3,
      question: "What surprising news does Dad have?",
      answer: "The road is closed, so the family has to stay another day.",
      inline: true,
    },
    {
      id: 4,
      question: "How does everyone react?",
      answer: "Everyone is happy because they get to stay longer.",
      inline: false,
    },
  ];

  const initAnswers = () => ({
    1: "",
    "2a": "",
    "2b": "",
    3: "",
    4: "",
  });

  const [answers, setAnswers] = useState(initAnswers());
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,'']/g, "").replace(/\s+/g, " ").trim();

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setResult((prev) => ({ ...prev, [key]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;

    const keys = [1, "2a", "2b", 3, 4];
    const hasEmpty = keys.some((k) => !answers[k].trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const newResult = {};

    const check = (key, expected) => {
      const ok = normalize(answers[key]) === normalize(expected);
      if (ok) correct++;
      newResult[key] = ok;
    };

    check(1, questions[0].answer);
    check("2a", questions[1].answer[0]);
    check("2b", questions[1].answer[1]);
    check(3, questions[2].answer);
    check(4, questions[3].answer);

    setResult(newResult);

    const total = keys.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers({
      1: "camping",
      "2a": "It is hot",
      "2b": "Camping was lots of fun, so they don't want to leave.",
      3: "The road is closed, so the family has to stay another day.",
      4: "Everyone is happy because they get to stay longer.",
    });
    setResult({ 1: true, "2a": true, "2b": true, 3: true, 4: true });
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setResult({});
    setLocked(false);
  };

  const inputLine = (key, width = "w-full") => {
    const isWrong = result[key] === false;
    const isCorrect = result[key] === true;
    return (
      <span className="relative inline-block" style={{ flex: 1 }}>
        <input
          type="text"
          value={answers[key]}
          disabled={locked || isCorrect}
          onChange={(e) => handleChange(key, e.target.value)}
          className={`
            w-full border-0 border-b outline-none bg-transparent
            text-[17px]  px-1
            ${isWrong ? "border-[#D1232A]" : "border-black"}
          `}
        />
        {isWrong && (
          <span style={{
            position: "absolute", top: "-8px", right: "-8px",
            width: "18px", height: "18px", background: "#ef4444", color: "white",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: "bold", border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}>✕</span>
        )}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* Title */}
        <h5 className="header-title-page8 mb-6">
          <span className="ex-A" style={{ marginRight: "10px" }}>F</span>
          Read the story and answer the questions.
        </h5>

        {/* Story */}
        <div className="mb-8 text-[16px] leading-[1.9]" style={{ whiteSpace: "pre-line", color: "#333" }}>
          {story}
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-6 text-[17px] mb-15">

          {/* Q1 - inline */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">1</span>
            <span>{questions[0].question}</span>
            {inputLine(1)}
          </div>

          {/* Q2 - two lines */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">2</span>
              <span>{questions[1].question}</span>
            </div>
            <div className="flex items-center gap-2 pl-5">
              <span className="font-semibold min-w-[24px]">a)</span>
              {inputLine("2a")}
            </div>
            <div className="flex items-center gap-2 pl-5">
              <span className="font-semibold min-w-[24px]">b)</span>
              {inputLine("2b")}
            </div>
          </div>

          {/* Q3 - inline */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">3</span>
            <span>{questions[2].question}</span>
            {inputLine(3)}
          </div>

          {/* Q4 - below */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">4</span>
              <span>{questions[3].question}</span>
            </div>
            <div className="pl-5">
              {inputLine(4)}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
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

export default WB_Unit1_Page7_F;