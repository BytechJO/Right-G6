/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// بدّل المسار للصورة الفعلية (الـ diagram كاملاً)
import diagramImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U9 Folder/SVG/Asset 25 (2).svg";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit9AudioText, {
  stopWorkbookUnit9Audio,
  workbookUnit9Audio,
} from "./WorkbookUnit9AudioText";

const audioFolder = "Page 55 - Exercise H";

const continentAudio = {
  Asia: "Item_008_Asia",
  Europe: "Item_007_Europe",
  Africa: "Item_013_Africa",
  "North America": "Item_017_North_America",
  "South America": "Item_016_South_America",
  Australia: "Item_011_Australia",
};

const personAudio = {
  Rachel: "Item_018_Rachel",
  Mark: "Item_024_Mark",
  John: "Item_019_John",
  Dan: "Item_020_Dan",
  Steven: "Item_023_Steven",
  Diane: "Item_022_Diane",
  Sue: "Item_009_sue",
  Ellen: "Item_025_Ellen",
};

const diagramAudioAreas = [
  ["Item_001_", "Play the Europe group", 0, 0],
  ["Item_004_", "Play the Asia group", 50, 0],
  ["Item_002_", "Play the North America group", 0, 33.33],
  ["Item_005_", "Play the Australia group", 50, 33.33],
  ["Item_003_", "Play the South America group", 0, 62.66],
  ["Item_006_", "Play the Africa group", 50, 62.66],
];

const BORDER = "#84ad40";

const PEOPLE = [
  "Mark",
  "Rachel",
  "John",
  "Dan",
  "Steven",
  "Ellen",
  "Diane",
  "Sue",
];
const CONTINENTS = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Australia",
];

// الإجابات الصحيحة من الكتاب
const CORRECT_CHECKS = {
  Mark: {
    Asia: false,
    Europe: true,
    Africa: false,
    "North America": true,
    "South America": false,
    Australia: false,
  },
  Rachel: {
    Asia: true,
    Europe: true,
    Africa: true,
    "North America": true,
    "South America": true,
    Australia: false,
  },
  John: {
    Asia: true,
    Europe: true,
    Africa: false,
    "North America": false,
    "South America": true,
    Australia: true,
  },
  Dan: {
    Asia: true,
    Europe: true,
    Africa: true,
    "North America": true,
    "South America": true,
    Australia: true,
  },
  Steven: {
    Asia: false,
    Europe: true,
    Africa: false,
    "North America": false,
    "South America": false,
    Australia: true,
  },
  Ellen: {
    Asia: false,
    Europe: true,
    Africa: false,
    "North America": true,
    "South America": false,
    Australia: false,
  },
  Diane: {
    Asia: true,
    Europe: true,
    Africa: true,
    "North America": false,
    "South America": true,
    Australia: false,
  },
  Sue: {
    Asia: false,
    Europe: false,
    Africa: true,
    "North America": true,
    "South America": false,
    Australia: false,
  },
};

const QUESTIONS = [
  { id: 1, q: "Who has been to all the continents listed?", answer: "Dan" },
  {
    id: 2,
    q: "Who has been to the fewest continents?",
    answer: "Mark and Sue",
  },
  {
    id: 3,
    q: "Who has not been to Asia?",
    answer: "Mark, Steven, Ellen, and Sue",
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.?!,’'']/g, "")
    .replace(/\s+/g, " ")
    .trim();

const initChecks = () => {
  const c = {};
  PEOPLE.forEach((p) => {
    c[p] = {};
    CONTINENTS.forEach((cont) => {
      c[p][cont] = false;
    });
  });
  // Mark row prefilled (Europe + North America)
  c["Mark"]["Europe"] = true;
  c["Mark"]["North America"] = true;
  return c;
};

const initAnswers = () => ({ 1: "", 2: "", 3: "" });

// ── QInput — OUTSIDE parent ──
const QInput = ({ qId, value, onChange, isCorrect, isWrong, disabled }) => (
  <span style={{ position: "relative", display: "inline-block", flex: 1 }}>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(qId, e.target.value)}
      placeholder="Write the answer"
      title={`Question ${qId}: write the answer from the completed chart`}
      aria-label={`Question ${qId}: answer from the continents chart`}
      className="workbook-unit9-input"
      style={{
        width: "100%",
        border: "none",
        borderBottom: `1.5px solid ${isWrong ? "#D1232A" : "#555"}`,
        outline: "none",
        background: "transparent",
        fontSize: "15px",
        color: isCorrect ? "#c0392b" : isWrong ? "#D1232A" : "#333",
        fontWeight: isCorrect ? "600" : "400",
        paddingBottom: "2px",
        fontFamily: "inherit",
      }}
    />
    {isWrong && (
      <span
        style={{
          position: "absolute",
          top: "-7px",
          right: "-7px",
          width: "14px",
          height: "14px",
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "9px",
          fontWeight: "bold",
          border: "2px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }}
      >
        ✕
      </span>
    )}
  </span>
);

const WB_Unit9_TravelSurvey_H = () => {
  const [checks, setChecks] = useState(initChecks);
  const [answers, setAnswers] = useState(initAnswers);
  const [result, setResult] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [cellResult, setCellResult] = useState({});

  // Mark row is prefilled — those cells are disabled
  const isPrefilledCell = (person) => person === "Mark";

  const toggleCell = (person, cont) => {
    const key = `${person}-${cont}`;
    if (locked || isPrefilledCell(person, cont) || cellResult[key] === true)
      return;
    setChecks((prev) => ({
      ...prev,
      [person]: { ...prev[person], [cont]: !prev[person][cont] },
    }));
    setCellResult((previous) => ({ ...previous, [key]: undefined }));
  };

  const handleChange = (id, value) => {
    if (locked || result[id] === true) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setResult((prev) => ({ ...prev, [id]: undefined }));
  };

  const checkAnswers = () => {
    if (locked) return;
    // Check table
    let tableCorrect = true;
    const nextCellResult = {};
    PEOPLE.forEach((p) => {
      CONTINENTS.forEach((cont) => {
        const ok = checks[p][cont] === CORRECT_CHECKS[p][cont];
        nextCellResult[`${p}-${cont}`] = ok;
        if (!ok) tableCorrect = false;
      });
    });
    setCellResult(nextCellResult);

    // Check questions
    const hasEmpty = Object.values(answers).some((v) => !v.trim());
    if (hasEmpty) {
      ValidationAlert.info("Please complete all questions.");
      return;
    }

    let correct = 0;
    const nr = {};
    QUESTIONS.forEach(({ id, answer }) => {
      const ok = normalize(answers[id]) === normalize(answer);
      if (ok) correct++;
      nr[id] = ok;
    });
    setResult(nr);
    setChecked(true);

    if (!tableCorrect) {
      ValidationAlert.warning(
        `<div style="font-size:17px;text-align:center;">Check your table — some cells are incorrect.</div>`,
      );
      return;
    }

    const total = QUESTIONS.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;
    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    // Fill table
    const c = {};
    PEOPLE.forEach((p) => {
      c[p] = { ...CORRECT_CHECKS[p] };
    });
    setChecks(c);
    // Fill questions
    const a = {};
    const r = {};
    QUESTIONS.forEach(({ id, answer }) => {
      a[id] = answer;
      r[id] = true;
    });
    setAnswers(a);
    setResult(r);
    setLocked(true);
    setChecked(true);
    const cr = {};
    PEOPLE.forEach((person) =>
      CONTINENTS.forEach((continent) => {
        cr[`${person}-${continent}`] = true;
      }),
    );
    setCellResult(cr);
  };

  const handleReset = () => {
    setChecks(initChecks());
    setAnswers(initAnswers());
    setResult({});
    setCellResult({});
    setChecked(false);
    setLocked(false);
    stopWorkbookUnit9Audio();
  };

  // Cell color based on check state
  const getCellBg = (person, cont) => {
    if (!checked || cellResult[`${person}-${cont}`] === undefined)
      return "transparent";
    const corrVal = CORRECT_CHECKS[person][cont];
    if (cellResult[`${person}-${cont}`])
      return corrVal ? "#e8f5d0" : "transparent";
    return "#ffeaea"; // wrong
  };

  const colW = "68px";

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="H"
          title="Read the information and complete the continents chart and questions."
          subTitle="Transfer the continent information into the table first, then answer the follow-up questions from the completed chart."
        />

        {/* Diagram image */}
        <div style={{ marginBottom: "16px", position: "relative" }}>
          <img
            src={diagramImg}
            alt="Diagram grouping Mark, Rachel, John, Dan, Steven, Ellen, Diane, and Sue by the continents they have visited"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
          {diagramAudioAreas.map(([prefix, label, left, top]) => (
            <WorkbookUnit9AudioText
              key={label}
              src={workbookUnit9Audio(audioFolder, prefix)}
              ariaLabel={label}
              className="workbook-unit9-audio-area"
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: "50%",
                height: "25.34%",
                borderRadius: "10px",
              }}
            >
              <span className="sr-only">{label}</span>
            </WorkbookUnit9AudioText>
          ))}
        </div>

        {/* Instruction */}
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "12px" }}>
          <WorkbookUnit9AudioText
            src={workbookUnit9Audio(audioFolder, "Item_015_")}
            ariaLabel="Play chart instruction"
            flowText
          >
            From the information above, complete the chart below in a similar
            way as in Exercise G. The first one has been done for you.
          </WorkbookUnit9AudioText>
        </p>

        {/* Table */}
        <div style={{ overflowX: "auto", marginBottom: "24px" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              minWidth: "520px",
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, width: "80px" }}></th>
                {CONTINENTS.map((cont) => (
                  <th
                    key={cont}
                    style={{
                      ...thStyle,
                      width: colW,
                      fontSize: "12px",
                      lineHeight: "1.3",
                    }}
                  >
                    <WorkbookUnit9AudioText
                      src={workbookUnit9Audio(
                        audioFolder,
                        continentAudio[cont],
                      )}
                      ariaLabel={`Play ${cont}`}
                      flowText
                    >
                      {cont}
                    </WorkbookUnit9AudioText>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PEOPLE.map((person) => (
                <tr key={person}>
                  <td
                    style={{
                      ...tdStyle,
                      background: "#e8f5d0",
                      fontWeight: "600",
                      fontSize: "14px",
                      paddingLeft: "8px",
                    }}
                  >
                    <WorkbookUnit9AudioText
                      src={workbookUnit9Audio(audioFolder, personAudio[person])}
                      ariaLabel={`Play ${person}`}
                      flowText
                    >
                      {person}
                    </WorkbookUnit9AudioText>
                  </td>
                  {CONTINENTS.map((cont) => {
                    const isChecked = checks[person][cont];
                    const bg = getCellBg(person, cont);
                    return (
                      <td
                        key={cont}
                        onClick={() => toggleCell(person, cont)}
                        onKeyDown={(event) => {
                          if (event.key !== "Enter" && event.key !== " ")
                            return;
                          event.preventDefault();
                          if (!event.repeat) toggleCell(person, cont);
                        }}
                        role="checkbox"
                        aria-checked={isChecked}
                        aria-label={`${person}, ${cont}`}
                        aria-disabled={
                          locked ||
                          isPrefilledCell(person, cont) ||
                          cellResult[`${person}-${cont}`] === true
                        }
                        tabIndex={
                          locked ||
                          isPrefilledCell(person, cont) ||
                          cellResult[`${person}-${cont}`] === true
                            ? -1
                            : 0
                        }
                        className="workbook-unit9-cell"
                        style={{
                          ...tdStyle,
                          background: bg,
                          cursor: locked ? "default" : "pointer",
                          textAlign: "center",
                          fontSize: "18px",
                          color: isChecked ? "#ff0000ff" : "transparent",
                          userSelect: "none",
                          transition: "background 0.15s",
                        }}
                      >
                        {cellResult[`${person}-${cont}`] === false
                          ? "✕"
                          : isChecked
                            ? "✓"
                            : "·"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "3em",
          }}
        >
          {QUESTIONS.map(({ id, q }) => {
            const isCorrect = result[id] === true;
            const isWrong = result[id] === false;
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "8px",
                  fontSize: "15px",
                }}
              >
                <span style={{ fontWeight: "bold", minWidth: "16px" }}>
                  {id}
                </span>
                <span style={{ whiteSpace: "nowrap" }}>{q}</span>
                <QInput
                  qId={id}
                  value={answers[id]}
                  onChange={handleChange}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  disabled={locked || isCorrect}
                />
              </div>
            );
          })}
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

const thStyle = {
  border: `1px solid ${BORDER}`,
  background: "#e8f5d0",
  padding: "6px 4px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "13px",
};

const tdStyle = {
  border: `1px solid ${BORDER}`,
  padding: "6px 4px",
  minWidth: "50px",
  height: "36px",
};

export default WB_Unit9_TravelSurvey_H;
