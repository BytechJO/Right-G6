/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import headerParticipleAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_001_past_participle_(for.mp3";
import headerVerbAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_002_verb.mp3";
import headerPastAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_003_past_tense.mp3";
import headerPerfectAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_004_present_perfect).mp3";
import doAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_005_do.mp3";
import didAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_006_did.mp3";
import doneAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_007_done.mp3";
import broughtAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_008_brought.mp3";
import wentAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_009_went.mp3";
import seeAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_010_see.mp3";
import seenAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_011_seen.mp3";
import runAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_012_run.mp3";
import cameAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_013_came.mp3";
import buyAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_014_buy.mp3";
import takenAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_015_taken.mp3";
import drinkAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_016_drink.mp3";
import ateAudio from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise C/Item_017_ate.mp3";

const WORD_AUDIO = {
  do: doAudio,
  did: didAudio,
  done: doneAudio,
  brought: broughtAudio,
  went: wentAudio,
  see: seeAudio,
  seen: seenAudio,
  run: runAudio,
  came: cameAudio,
  buy: buyAudio,
  taken: takenAudio,
  drink: drinkAudio,
  ate: ateAudio,
};

// ─── data ────────────────────────────────────────────────────────────────────
// null = خانة فارغة للطالب | string = خانة مملوءة (ثابتة)

const LEFT_TABLE = [
  { verb: "do", pastTense: "did", pastParticiple: "done" },
  { verb: null, pastTense: "went", pastParticiple: null },
  { verb: "run", pastTense: null, pastParticiple: null },
  { verb: "buy", pastTense: null, pastParticiple: null },
  { verb: null, pastTense: "ate", pastParticiple: null },
];

const RIGHT_TABLE = [
  { verb: null, pastTense: "brought", pastParticiple: null },
  { verb: "see", pastTense: null, pastParticiple: "seen" },
  { verb: null, pastTense: "came", pastParticiple: null },
  { verb: null, pastTense: null, pastParticiple: "taken" },
  { verb: "drink", pastTense: null, pastParticiple: null },
];

// الإجابات الصحيحة
const LEFT_ANSWERS = [
  { verb: "do", pastTense: "did", pastParticiple: "done" },
  { verb: "go", pastTense: "went", pastParticiple: "gone" },
  { verb: "run", pastTense: "ran", pastParticiple: "run" },
  { verb: "buy", pastTense: "bought", pastParticiple: "bought" },
  { verb: "eat", pastTense: "ate", pastParticiple: "eaten" },
];

const RIGHT_ANSWERS = [
  { verb: "bring", pastTense: "brought", pastParticiple: "brought" },
  { verb: "see", pastTense: "saw", pastParticiple: "seen" },
  { verb: "come", pastTense: "came", pastParticiple: "come" },
  { verb: "take", pastTense: "took", pastParticiple: "taken" },
  { verb: "drink", pastTense: "drank", pastParticiple: "drunk" },
];

// ─── helpers ─────────────────────────────────────────────────────────────────
function buildInitialState(tableData) {
  return tableData.map((row) => ({
    verb: row.verb === null ? "" : row.verb,
    pastTense: row.pastTense === null ? "" : row.pastTense,
    pastParticiple: row.pastParticiple === null ? "" : row.pastParticiple,
  }));
}

function buildInitialErrors(tableData) {
  return tableData.map(() => ({
    verb: null,
    pastTense: null,
    pastParticiple: null,
  }));
}

// ─── sub-component: one table ─────────────────────────────────────────────────
const VerbTable = ({
  tableId,
  tableLabel,
  tableData,
  values,
  errors,
  onChange,
  locked,
  audioText,
}) => {
  const cols = ["verb", "pastTense", "pastParticiple"];
  const headers = [
    audioText(`${tableId}-header-verb`, headerVerbAudio, "verb"),
    audioText(`${tableId}-header-past`, headerPastAudio, "past tense"),
    <React.Fragment key={`${tableId}-header-participle`}>
      {audioText(
        `${tableId}-header-participle-1`,
        headerParticipleAudio,
        "past participle (for",
      )}{" "}
      {audioText(
        `${tableId}-header-participle-2`,
        headerPerfectAudio,
        "present perfect)",
      )}
    </React.Fragment>,
  ];

  return (
    <table
      aria-label={tableLabel}
      style={{ borderCollapse: "collapse", flex: 1 }}
    >
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              style={{
                background: "#e2ead1",
                color: "#84ad40",
                padding: "8px 12px",
                fontSize: "17px",
                fontWeight: "600",

                textAlign: "center",
                border: "1px solid #84ad40",
                minWidth: i === 2 ? "140px" : "80px",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIdx) => (
          <tr key={rowIdx} style={{}}>
            {cols.map((col) => {
              const isFixed = row[col] !== null;
              const hasError = errors[rowIdx]?.[col] === true;
              const isCorrect = errors[rowIdx]?.[col] === false;

              return (
                <td
                  key={col}
                  style={{
                    border: "1px solid #84ad40",
                    padding: "4px 8px",
                    textAlign: "center",
                    height: "52px",
                    position: "relative",
                  }}
                >
                  {isFixed ? (
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",

                        // color: "#2d5a27",
                      }}
                    >
                      {audioText(
                        `${tableId}-${rowIdx}-${col}`,
                        WORD_AUDIO[row[col]],
                        row[col],
                      )}
                    </span>
                  ) : (
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <input
                        value={values[rowIdx]?.[col] ?? ""}
                        disabled={locked || isCorrect}
                        onChange={(e) => onChange(rowIdx, col, e.target.value)}
                        aria-label={`${tableLabel}, row ${rowIdx + 1}, ${
                          col === "pastTense"
                            ? "past tense"
                            : col === "pastParticiple"
                              ? "past participle"
                              : "verb"
                        }`}
                        aria-invalid={hasError}
                        style={{
                          width: col === "pastParticiple" ? "120px" : "100px",
                          height: "52px",
                          borderBottom: `${hasError ? "2px solid red" : "1px solid #424242ff"}`,
                          // borderRadius: "8px",
                          outline: "none",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "500",
                          // color: "#6D2980",

                          padding: "0 6px",
                        }}
                      />
                      {/* ❌ فوق يمين الـ input */}
                      {hasError && (
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
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
                            zIndex: 5,
                          }}
                        >
                          ✕
                        </span>
                      )}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ─── main component ───────────────────────────────────────────────────────────
const Page8_Q3 = () => {
  const [leftValues, setLeftValues] = useState(buildInitialState(LEFT_TABLE));
  const [rightValues, setRightValues] = useState(
    buildInitialState(RIGHT_TABLE),
  );
  const [leftErrors, setLeftErrors] = useState(buildInitialErrors(LEFT_TABLE));
  const [rightErrors, setRightErrors] = useState(
    buildInitialErrors(RIGHT_TABLE),
  );
  const [locked, setLocked] = useState(false);
  const [activeAudio, setActiveAudio] = useState(null);
  const audioRef = useRef(null);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
    },
    [],
  );

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setActiveAudio(null);
  };

  const playAudio = (id, src) => {
    if (!src) return;
    stopAudio();
    document.querySelectorAll("audio, video").forEach((media) => media.pause());
    const audio = new Audio(src);
    audioRef.current = audio;
    setActiveAudio(id);
    const finish = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
        setActiveAudio(null);
      }
    };
    audio.onended = finish;
    audio.onerror = finish;
    audio.play().catch(finish);
  };

  const audioText = (id, src, text) => (
    <span
      className="unit1-inline-audio"
      role="button"
      tabIndex={0}
      aria-label={`Play audio: ${text}`}
      aria-pressed={activeAudio === id}
      onClick={() => playAudio(id, src)}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        playAudio(id, src);
      }}
    >
      {text}
      {activeAudio === id && (
        <span className="unit1-inline-audio-indicator" aria-hidden="true">
          <FaVolumeUp size={14} color="#111827" background="#fff" />
        </span>
      )}
    </span>
  );

  const handleChange = (side, rowIdx, col, value) => {
    const setter = side === "left" ? setLeftValues : setRightValues;
    const errSetter = side === "left" ? setLeftErrors : setRightErrors;
    const errState = side === "left" ? leftErrors : rightErrors;

    // امسح الخطأ فور الكتابة
    if (errState[rowIdx]?.[col] === true) {
      errSetter((prev) =>
        prev.map((r, i) => (i === rowIdx ? { ...r, [col]: null } : r)),
      );
    }

    setter((prev) =>
      prev.map((r, i) => (i === rowIdx ? { ...r, [col]: value } : r)),
    );
  };

  const isFixed = (tableData, rowIdx, col) => tableData[rowIdx][col] !== null;

  const handleCheck = () => {
    if (locked) return;

    // تحقق إن كل الخانات الفارغة مكتوبة
    const cols = ["verb", "pastTense", "pastParticiple"];
    const leftEmpty = LEFT_TABLE.some((row, i) =>
      cols.some((c) => !isFixed(LEFT_TABLE, i, c) && !leftValues[i][c].trim()),
    );
    const rightEmpty = RIGHT_TABLE.some((row, i) =>
      cols.some(
        (c) => !isFixed(RIGHT_TABLE, i, c) && !rightValues[i][c].trim(),
      ),
    );

    if (leftEmpty || rightEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    let total = 0;

    const newLeftErrors = LEFT_TABLE.map((row, i) =>
      cols.reduce((acc, col) => {
        if (isFixed(LEFT_TABLE, i, col)) return { ...acc, [col]: null };
        total++;
        const ok =
          leftValues[i][col].trim().toLowerCase() ===
          LEFT_ANSWERS[i][col].toLowerCase();
        if (ok) correct++;
        return { ...acc, [col]: ok ? false : true };
      }, {}),
    );

    const newRightErrors = RIGHT_TABLE.map((row, i) =>
      cols.reduce((acc, col) => {
        if (isFixed(RIGHT_TABLE, i, col)) return { ...acc, [col]: null };
        total++;
        const ok =
          rightValues[i][col].trim().toLowerCase() ===
          RIGHT_ANSWERS[i][col].toLowerCase();
        if (ok) correct++;
        return { ...acc, [col]: ok ? false : true };
      }, {}),
    );

    setLeftErrors(newLeftErrors);
    setRightErrors(newRightErrors);

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span></div>`;

    if (correct === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setLeftValues(LEFT_ANSWERS.map((a) => ({ ...a })));
    setRightValues(RIGHT_ANSWERS.map((a) => ({ ...a })));
    const cols = ["verb", "pastTense", "pastParticiple"];
    setLeftErrors(
      LEFT_TABLE.map((row, i) =>
        cols.reduce(
          (acc, col) => ({
            ...acc,
            [col]: isFixed(LEFT_TABLE, i, col) ? null : false,
          }),
          {},
        ),
      ),
    );
    setRightErrors(
      RIGHT_TABLE.map((row, i) =>
        cols.reduce(
          (acc, col) => ({
            ...acc,
            [col]: isFixed(RIGHT_TABLE, i, col) ? null : false,
          }),
          {},
        ),
      ),
    );
    setLocked(true);
  };

  const handleReset = () => {
    stopAudio();
    setLeftValues(buildInitialState(LEFT_TABLE));
    setRightValues(buildInitialState(RIGHT_TABLE));
    setLeftErrors(buildInitialErrors(LEFT_TABLE));
    setRightErrors(buildInitialErrors(RIGHT_TABLE));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "70px" }}>
        <ExerciseHeader
          sectionLetter="C"
          title="Complete the chart."
          subTitle="Work through the chart one row at a time and use the row/column headings as clues before checking your entries."
        />

        {/* ── Two tables side by side ── */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <VerbTable
            tableId="left"
            tableLabel="Verb chart, left table"
            tableData={LEFT_TABLE}
            values={leftValues}
            errors={leftErrors}
            onChange={(r, c, v) => handleChange("left", r, c, v)}
            locked={locked}
            audioText={audioText}
          />
          <VerbTable
            tableId="right"
            tableLabel="Verb chart, right table"
            tableData={RIGHT_TABLE}
            values={rightValues}
            errors={rightErrors}
            onChange={(r, c, v) => handleChange("right", r, c, v)}
            locked={locked}
            audioText={audioText}
          />
        </div>

        {/* Buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>
          <button
            className="check-button2"
            onClick={handleCheck}
            aria-disabled={locked}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page8_Q3;
