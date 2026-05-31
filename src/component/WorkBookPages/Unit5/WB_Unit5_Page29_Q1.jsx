import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER = "#84ad40";

const QUESTIONS = [
  {
    id: 1,
    sentence: "Janice ice skates at the pond, didn't she?",
    answer: "wrong",
    correction: "doesn't she?",
    prefilled: false,
  },
  {
    id: 2,
    sentence: "The basketball players can jump high, wouldn't they?",
    answer: "wrong",
    correction: "can't they",
    prefilled: false,
  },
  {
    id: 3,
    sentence: "Aaron likes to lift weights, doesn't he?",
    answer: "correct",
    correction: "",
    prefilled: false,
  },
  {
    id: 4,
    sentence: "Clara and Susan are twins, havent' they?",
    answer: "wrong",
    correction: "aren't they?",
    prefilled: false,
  },
  {
    id: 5,
    sentence: "The glasses are on the table, aren't they?",
    answer: "correct",
    correction: "",
    prefilled: false,
  },
  {
    id: 6,
    sentence: "Kevin will ride bikes with me, can't he?",
    answer: "wrong",
    correction: "wouldn't you?",
    prefilled: false,
  },
];

const normalize = (str) =>
    str.toLowerCase().replace(/[.?!,’'']/g, "").replace(/\s+/g, " ").trim();

const initState = () => {
  const choices = {};
  const corrections = {};
  QUESTIONS.forEach(({ id, answer, correction, prefilled }) => {
    choices[id]     = prefilled ? answer : null;
    corrections[id] = prefilled ? correction : "";
  });
  return { choices, corrections };
};

// ── ChoiceBox — OUTSIDE parent ──
const ChoiceBox = ({ qId, value, symbol, selected, isWrong, isDisabled, onSelect }) => (
  <span
    onClick={() => !isDisabled && onSelect(qId, value)}
    style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      border: `2px solid ${BORDER}`,
      borderRadius: 8,
      background: "#fff",
      cursor: isDisabled ? "default" : "pointer",
      fontSize: 20,
      fontWeight: "bold",
      color: selected ? "#D1232A" : "transparent",
      userSelect: "none",
      flexShrink: 0,
      transition: "all .15s",
    }}
  >
    {selected ? symbol : ""}
    {isWrong && (
      <span style={{
        position: "absolute", top: -6, right: -6,
        width: 14, height: 14, background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9, fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,.25)", pointerEvents: "none",
      }}>✕</span>
    )}
  </span>
);

// ── CorrectionInput — OUTSIDE parent ──
const CorrectionInput = ({ qId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "inline-block", minWidth: "130px" }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "16px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
        textAlign: "center",
        textDecoration: disabled && value ? "underline" : "none",
      }}
    />
    {isWrong && (
      <span style={{
        position: "absolute", top: "-8px", right: "-8px",
        width: "16px", height: "16px", background: "#ef4444", color: "white",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "10px", fontWeight: "bold", border: "2px solid white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }}>✕</span>
    )}
  </span>
);

// ── MAIN COMPONENT ──
const WB_Unit5_CheckOrX_E = () => {
  const init = initState();
  const [choices,     setChoices]     = useState(init.choices);
  const [corrections, setCorrections] = useState(init.corrections);
  const [result,      setResult]      = useState({});
  const [locked,      setLocked]      = useState(false);

  const handleSelect = (id, value) => {
    if (locked || result[id] === true) return;
    setChoices((prev) => ({ ...prev, [id]: value }));
    // إذا اختار ✓ امسح الـ correction
    if (value === "correct") {
      setCorrections((prev) => ({ ...prev, [id]: "" }));
    }
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleCorrectionChange = (id, value) => {
    if (locked || result[id] === true) return;
    setCorrections((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    // تحقق من أن كل جملة فيها اختيار
    const noChoice = QUESTIONS.filter((q) => !q.prefilled)
      .some(({ id }) => choices[id] === null);
    if (noChoice) { ValidationAlert.info("Please complete all answers."); return; }

    // تحقق من أن الـ wrong لها correction
    const noCorrection = QUESTIONS.filter((q) => !q.prefilled)
      .some(({ id, answer }) => choices[id] === "wrong" && !corrections[id].trim());
    if (noCorrection) { ValidationAlert.info("Please write the correction for wrong sentences."); return; }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer, correction, prefilled }) => {
      if (prefilled) { nr[id] = true; correct++; return; }
      const choiceOk = choices[id] === answer;
      const corrOk   = answer === "correct"
        ? true
        : normalize(corrections[id]) === normalize(correction);
      const ok = choiceOk && corrOk;
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    const total = QUESTIONS.filter((q) => !q.prefilled).length;
    const scored = correct - 1; // -1 للـ prefilled
    const color = scored === total ? "green" : scored === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${scored} / ${total}</span></div>`;
    if (scored === total) { setLocked(true); ValidationAlert.success(msg); }
    else if (scored === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const ch = {}; const co = {}; const r = {};
    QUESTIONS.forEach(({ id, answer, correction }) => {
      ch[id] = answer;
      co[id] = correction;
      r[id]  = true;
    });
    setChoices(ch); setCorrections(co); setResult(r); setLocked(true);
  };

  const handleReset = () => {
    const init = initState();
    setChoices(init.choices);
    setCorrections(init.corrections);
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">

        {/* Title */}
        <h5 className="header-title-page8 mb-8" style={ { whiteSpace :"nowrap"}}>
          <span className="ex-A" style={{ marginRight: "10px" }}>E</span>
          Write <strong style={{ color: "#D1232A" }}>✓</strong> or{" "}
          <strong style={{ color: "#D1232A" }}>✕</strong> for each sentence. Correct the{" "}
          <span style={{ color: "orange", fontWeight: "bold" }}>question tag</span>{" "}
          for sentences with <strong style={{ color: "#D1232A" }}>✕</strong>.
        </h5>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "45px", marginBottom: "3em" }}>
          {QUESTIONS.map(({ id, sentence, answer, prefilled }) => {
            const isCorrect  = result[id] === true;
            const isWrong    = result[id] === false;
            const isDisabled = locked || isCorrect || prefilled;
            const needsCorr  = choices[id] === "wrong";

            return (
              <div key={id} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "17px",
                flexWrap: "wrap",
              }}>
                {/* ✓ box */}
                <ChoiceBox
                  qId={id}
                  value="correct"
                  symbol="✓"
                  selected={choices[id] === "correct"}
                  isWrong={isWrong && choices[id] === "correct"}
                  isDisabled={isDisabled}
                  onSelect={handleSelect}
                />

                {/* ✕ box */}
                <ChoiceBox
                  qId={id}
                  value="wrong"
                  symbol="✕"
                  selected={choices[id] === "wrong"}
                  isWrong={isWrong && choices[id] === "wrong"}
                  isDisabled={isDisabled}
                  onSelect={handleSelect}
                />

                {/* Number */}
                <span style={{ fontWeight: "bold", minWidth: "22px" }}>{id}</span>

                {/* Sentence */}
                <span style={{ flex: 1 }}>{sentence}</span>

                {/* Correction input */}
                <CorrectionInput
                  qId={id}
                  value={corrections[id]}
                  onChange={handleCorrectionChange}
                  isCorrect={isCorrect && needsCorr}
                  isWrong={isWrong && needsCorr}
                  disabled={isDisabled || !needsCorr}
                />
              </div>
            );
          })}
        </div>

      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>Start Again ↻</button>
        <button className="show-answer-btn"  onClick={showAnswers}>Show Answer</button>
        <button className="check-button2"    onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

export default WB_Unit5_CheckOrX_E;