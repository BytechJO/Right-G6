import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ActionButtons from "../../ActionButtons";

const GrammarB = () => {
  // normalize: تجاهل كابيتل/سمول، نقاط، فواصل
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,!?;:'"-]/g, "")
      .trim();

  const correct = [
    { input: "if" }, // 1
    { input: "would" }, // 2
    { input: "had" }, // 3
  ];

  const emptyState = [{ input: "" }, { input: "" }, { input: "" }];

  const [answers, setAnswers] = useState(emptyState.map((a) => ({ ...a })));
  const [result, setResult] = useState([null, null, null]);
  const [locked, setLocked] = useState(false);

  const handleInput = (q, val) => {
    if (locked) return;
    const updated = [...answers];
    updated[q] = { input: val };
    setAnswers(updated);
    const updatedResult = [...result];
    updatedResult[q] = null;
    setResult(updatedResult);
  };

  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((a) => a.input.trim() === "");
    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }

    let totalScore = 0;
    const res = answers.map((ans, i) => {
      const isCorrect = normalize(ans.input) === normalize(correct[i].input);
      if (isCorrect) totalScore++;
      return isCorrect;
    });

    setResult(res);

    const msg = `Score: ${totalScore} / ${correct.length}`;
    if (totalScore === correct.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (totalScore === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(correct.map((c) => ({ input: c.input })));
    setResult(correct.map(() => true));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(emptyState.map((a) => ({ ...a })));
    setResult([null, null, null]);
    setLocked(false);
  };

  const inputField = (q) => (
    <span className="relative inline-block mx-1">
      <input
        value={answers[q].input}
        disabled={locked || result[q] === true}
        onChange={(e) => handleInput(q, e.target.value)}
        className={`w-44 border-b-1 text-center font-semibold bg-transparent outline-none ${
          result[q] === false
            ? "border-red-500"
            : result[q] === true
              ? "border-gray-400"
              : "border-gray-400"
        }`}
      />
      {result[q] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">B</span>
        Add the missing word or phrase.
      </h5>

      <div className="flex flex-col gap-8 mt-10 text-[18px]">
        {/* 1 */}
        <div className="flex items-center gap-1">
          <span className="font-bold mr-2">1</span>
          {inputField(0)}
          <span>we rode our bikes, we would get some exercise.</span>
        </div>

        {/* 2 */}
        <div className="flex items-center gap-1">
          <span className="font-bold mr-2">2</span>
          <span>Tom</span>
          {inputField(1)}
          <span>get a good grade if he studied more.</span>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-1">
          <span className="font-bold mr-2">3</span>
          <span>Shirley would choose Blackie if she</span>
          {inputField(2)}
          <span>a horse to ride.</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
         <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default GrammarB;
