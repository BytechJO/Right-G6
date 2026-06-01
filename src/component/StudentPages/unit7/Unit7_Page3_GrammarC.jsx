import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const GrammarC = () => {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!?;:'"‘’‚‛“”„‟`´]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const questions = [
    {
      mark: "✓",
      before: "If he",
      after: "asked me, I",
      end: "done it.",
      answers: ["had", "would have"],
    },
    {
      mark: "✗",
      before: "If we",
      after: "moved, we",
      end: "met you.",
      answers: [
        ["hadn't", "had not"],
        ["wouldn't have", "would not have"],
      ],
    },
    {
      mark: "✗",
      before: "If Marcus",
      after: "received his pilot’s license, he",
      end: "been able to fly us to London.",
      answers: [
        ["hadn't", "had not"],
        ["wouldn't have", "would not have"],
      ],
    },
    {
      mark: "✓",
      before: "They",
      after: "gotten better grades if they",
      end: "studied the teacher’s notes.",
      answers: ["would have", "had"],
    },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ["", ""]));

  const [result, setResult] = useState(questions.map(() => [null, null]));

  const [locked, setLocked] = useState(false);

  const handleInput = (qIndex, inputIndex, value) => {
    if (locked || result[qIndex][inputIndex] === true) return;

    const updatedAnswers = [...answers];
    updatedAnswers[qIndex][inputIndex] = value;
    setAnswers(updatedAnswers);

    const updatedResult = [...result];
    updatedResult[qIndex][inputIndex] = null;
    setResult(updatedResult);
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((row) =>
      row.some((cell) => cell.trim() === ""),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;

    const results = answers.map((row, qIndex) =>
      row.map((ans, inputIndex) => {
        const accepted = Array.isArray(questions[qIndex].answers[inputIndex])
          ? questions[qIndex].answers[inputIndex]
          : [questions[qIndex].answers[inputIndex]];

        const isCorrect = accepted.some(
          (correctAnswer) => normalize(ans) === normalize(correctAnswer),
        );

        if (isCorrect) score++;
        return isCorrect;
      }),
    );

    setResult(results);

    const total = questions.length * 2;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => [...q.answers]));

    setResult(questions.map(() => [true, true]));

    setLocked(true);
  };

  const reset = () => {
    setAnswers(questions.map(() => ["", ""]));

    setResult(questions.map(() => [null, null]));

    setLocked(false);
  };

  return (
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">C</span>
        Complete the sentences with <span className="text-[#F79530]">
          had
        </span>, <span className="text-[#F79530]">hadn’t</span>,{" "}
        <span className="text-[#F79530]">would have</span>, or{" "}
        <span className="text-[#F79530]">wouldn’t have</span>.
      </h5>

      <div className="flex flex-col gap-10 mt-10 text-[18px]">
        {questions.map((q, qIndex) => (
          <div key={qIndex}>
            <div className="flex flex-wrap items-center gap-2 leading-[2.2]">
              <span className="font-bold">{qIndex + 1}</span>(
              <span className="font-bold text-[18px] text-red-600">
                {q.mark}
              </span>
              )<span>{q.before}</span>
              <div className="relative inline-block min-w-[140px]">
                <input
                  type="text"
                  value={answers[qIndex][0]}
                  disabled={locked || result[qIndex][0] === true}
                  onChange={(e) => handleInput(qIndex, 0, e.target.value)}
                  className={` w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1
          text-center ${
            result[qIndex][0] === false ? "border-red-500" : "border-black"
          }`}
                />

                {result[qIndex][0] === false && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0px",
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
                      transform: "translateY(-50%)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
              <span>{q.after}</span>
              <div className="relative inline-block min-w-[180px]">
                <input
                  type="text"
                  value={answers[qIndex][1]}
                  disabled={locked || result[qIndex][1] === true}
                  onChange={(e) => handleInput(qIndex, 1, e.target.value)}
                  className={` w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-black
          font-semibold
          px-1
          text-center ${
            result[qIndex][1] === false ? "border-red-500" : "border-black"
          }`}
                />

                {result[qIndex][1] === false && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "0px",
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
                      transform: "translateY(-50%)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
              <span>{q.end}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 ">
        <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default GrammarC;
