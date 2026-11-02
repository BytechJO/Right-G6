/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit9AudioText, {
  stopWorkbookUnit9Audio,
  workbookUnit9Audio,
} from "./WorkbookUnit9AudioText";

const audioFolder = "Page 52 - Exercise C";

const QUESTIONS = [
  { id: 1, scrambled: "csaracterh", match: "j", audio: "Item_002_" },
  { id: 2, scrambled: "loven", match: "c", audio: "Item_004_" },
  { id: 3, scrambled: "pcahtre", match: "a", audio: "Item_005_" },
  { id: 4, scrambled: "scsudis", match: "d", audio: "Item_007_" },
  { id: 5, scrambled: "gdisaens", match: "f", audio: "Item_009_" },
  { id: 6, scrambled: "msatcselas", match: "h", audio: "Item_011_" },
  { id: 7, scrambled: "esrpehap", match: "b", audio: "Item_013_" },
  { id: 8, scrambled: "edla", match: "g", audio: "Item_015_" },
  { id: 9, scrambled: "imna", match: "e", audio: "Item_017_" },
  { id: 10, scrambled: "casitdtr", match: "i", audio: "Item_019_" },
];

const SECTION_B = [
  ["a", "chapter", "Item_001_"], ["b", "perhaps", "Item_003_"],
  ["c", "novel", "Item_006_"], ["d", "discuss", "Item_008_"],
  ["e", "main", "Item_010_"], ["f", "assigned", "Item_012_"],
  ["g", "deal", "Item_014_"], ["h", "classmates", "Item_016_"],
  ["i", "distract", "Item_018_"], ["j", "characters", "Item_020_"],
];

const normalize = (value) => value.toLowerCase().trim();
const initialAnswers = () => Object.fromEntries(QUESTIONS.map(({ id }) => [id, ""]));

const MatchInput = ({ id, value, onChange, correct, wrong, disabled }) => (
  <span style={{ position: "relative", display: "inline-block", width: 135 }}>
    <input
      type="text"
      maxLength={1}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(id, event.target.value)}
      placeholder="a–j"
      title={`Item ${id}: enter the matching letter from section B`}
      aria-label={`Item ${id}: matching letter`}
      className="workbook-unit9-input"
      style={{
        width: "100%", border: "none",
        borderBottom: `1.5px solid ${wrong ? "#D1232A" : "#555"}`,
        outline: "none", background: "transparent", fontSize: 18,
        color: correct ? "#c0392b" : wrong ? "#D1232A" : "#333",
        fontWeight: correct ? 600 : 400, padding: "0 4px 2px",
        textAlign: "center", fontFamily: "inherit",
      }}
    />
    {wrong && <span style={wrongStyle}>✕</span>}
  </span>
);

const WB_Unit9_UnscrambleMatch_C = () => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  const changeAnswer = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((previous) => ({ ...previous, [id]: value.toLowerCase() }));
    setResult((previous) => ({ ...previous, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    if (QUESTIONS.some(({ id }) => !answers[id].trim())) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    const nextResult = {};
    let correctCount = 0;
    QUESTIONS.forEach(({ id, match }) => {
      const isCorrect = normalize(answers[id]) === match;
      nextResult[id] = isCorrect;
      if (isCorrect) correctCount += 1;
    });
    setResult(nextResult);
    const message = `Score: ${correctCount} / ${QUESTIONS.length}`;
    if (correctCount === QUESTIONS.length) {
      setLocked(true);
      ValidationAlert.success(message);
    } else if (correctCount === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };

  const showAnswers = () => {
    setAnswers(Object.fromEntries(QUESTIONS.map(({ id, match }) => [id, match])));
    setResult(Object.fromEntries(QUESTIONS.map(({ id }) => [id, true])));
    setLocked(true);
  };

  const reset = () => {
    stopWorkbookUnit9Audio();
    setAnswers(initialAnswers());
    setResult({});
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="C"
          title="Unscramble the words in section A, then match them with the same words in section B."
          subTitle="Unscramble each vocabulary word first, then match it to the identical correctly spelled word in the right column."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 0.75fr", columnGap: 90, alignItems: "start", margin: "18px 0 5em" }}>
          <section aria-label="Section A">
            <div style={{ textAlign: "center", fontWeight: "bold", marginBottom: 16 }}>A</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {QUESTIONS.map(({ id, scrambled, audio }) => (
                <div key={id} style={{ display: "grid", gridTemplateColumns: "28px 115px 135px", alignItems: "center", gap: 10, minHeight: 28 }}>
                  <b>{id}</b>
                  <WorkbookUnit9AudioText
                    src={workbookUnit9Audio(audioFolder, audio)}
                    ariaLabel={`Play ${scrambled}`}
                    flowText
                  >
                    {scrambled}
                  </WorkbookUnit9AudioText>
                  <MatchInput
                    id={id}
                    value={answers[id]}
                    onChange={changeAnswer}
                    correct={result[id] === true}
                    wrong={result[id] === false}
                    disabled={locked || result[id] === true}
                  />
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Section B" style={{ width: "max-content", minWidth: 170 }}>
            <div style={{ textAlign: "left", paddingLeft: 38, fontWeight: "bold", marginBottom: 16 }}>B</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {SECTION_B.map(([letter, word, audio]) => (
                <div key={letter} style={{ display: "grid", gridTemplateColumns: "28px 1fr", alignItems: "center", minHeight: 28 }}>
                  <b>{letter}</b>
                  <WorkbookUnit9AudioText
                    src={workbookUnit9Audio(audioFolder, audio)}
                    ariaLabel={`Play ${word}`}
                    flowText
                  >
                    {word}
                  </WorkbookUnit9AudioText>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>Start Again ↻</button>
        <button className="show-answer-btn" onClick={showAnswers}>Show Answer</button>
        <button className="check-button2" onClick={checkAnswers}>Check Answer ✓</button>
      </div>
    </div>
  );
};

const wrongStyle = {
  position: "absolute", top: -8, right: -8, width: 20, height: 20,
  background: "#ef4444", color: "white", borderRadius: "50%", fontSize: 11,
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  fontWeight: "bold", border: "2px solid white", boxShadow: "0 1px 4px rgba(0,0,0,.2)",
};

export default WB_Unit9_UnscrambleMatch_C;
