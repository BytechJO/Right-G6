import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WBUnit1AudioText, {
  stopUnit1Audio,
  unit1Audio,
} from "./WB_Unit1_AudioText";

const WB_Unit1_Page4_PastParticiple = () => {
  const BORDER = "#84ad40";

  const verbRows = [
    { verb: "break", answer: "broken" },
    { verb: "cut", answer: "cut" },
    { verb: "bring", answer: "brought" },
    { verb: "choose", answer: "chosen" },
    { verb: "swim", answer: "swum" },
    { verb: "catch", answer: "caught" },
    { verb: "put", answer: "put" },
    { verb: "see", answer: "seen" },
    { verb: "speak", answer: "spoken" },
    { verb: "run", answer: "run" },
    { verb: "drink", answer: "drunk" },
    { verb: "cost", answer: "cost" },
    { verb: "set", answer: "set" },
    { verb: "buy", answer: "bought" },
    { verb: "ring", answer: "rung" },
  ];

  const groups = [
    {
      key: "g1",
      header: "Ending in",
      headerBold: "u + consonant",
      headerAudio: 16,
      boldAudio: 21,
      answers: ["swum", "run", "drunk"],
    },
    {
      key: "g2",
      header: "−n or −en",
      headerBold: "added at the end",
      headerAudio: 18,
      boldAudio: 19,
      answers: ["broken", "chosen", "seen", "spoken"],
    },
    {
      key: "g3",
      header: "Same as the",
      headerBold: "past form",
      headerAudio: 17,
      boldAudio: 20,
      answers: ["cut", "put", "set", "rung", "cost"],
    },
    {
      key: "g4",
      header: "Ending in",
      headerBold: "−ght",
      headerAudio: 16,
      answers: ["brought", "caught", "bought"],
    },
  ];

  const maxRows = Math.max(...groups.map((g) => g.answers.length));
  const verbAudioIndex = {
    break: 1,
    catch: 2,
    drink: 3,
    cut: 4,
    put: 5,
    cost: 6,
    bring: 7,
    set: 8,
    see: 9,
    choose: 10,
    speak: 11,
    buy: 12,
    swim: 13,
    run: 14,
    ring: 15,
  };

  const initVerbAnswers = () => {
    const a = {};
    verbRows.forEach((v) => {
      a[v.verb] = "";
    });
    return a;
  };

  const [verbAnswers, setVerbAnswers] = useState(initVerbAnswers);
  const [verbResult, setVerbResult] = useState({});

  const initGroupAnswers = () => {
    const a = {};
    groups.forEach((g) => {
      const slots = g.answers.filter((ans) => ans !== g.prefilled);
      a[g.key] = slots.map(() => "");
    });
    return a;
  };

  const [groupAnswers, setGroupAnswers] = useState(initGroupAnswers);
  const [groupResult, setGroupResult] = useState({});
  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’'']/g, "")
      .replace(/\s+/g, " ")
      .trim();
  const handleVerbChange = (verb, value) => {
    if (locked || verbResult[verb] === true) return;
    setVerbAnswers((prev) => ({ ...prev, [verb]: value }));
    setVerbResult((prev) => ({ ...prev, [verb]: undefined }));
  };

  const handleGroupChange = (gKey, slotIndex, value) => {
    if (locked || groupResult[`${gKey}-${slotIndex}`] === true) return;
    setGroupAnswers((prev) => {
      const updated = { ...prev };
      const arr = [...updated[gKey]];
      arr[slotIndex] = value;
      updated[gKey] = arr;
      return updated;
    });
    setGroupResult((prev) => ({
      ...prev,
      [`${gKey}-${slotIndex}`]: undefined,
    }));
  };
  const checkAnswers = () => {
    if (locked) return;

    const verbEmpty = verbRows.some((v) => !verbAnswers[v.verb].trim());
    const groupEmpty = groups.some((g) =>
      groupAnswers[g.key].some((a) => !a.trim()),
    );
    if (verbEmpty || groupEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    let total = 0;
    const newVerbResult = {};
    const newGroupResult = {};

    verbRows.forEach((v) => {
      total++;
      const ok = normalize(verbAnswers[v.verb]) === normalize(v.answer);
      if (ok) correct++;
      newVerbResult[v.verb] = ok;
    });

    // ✅ التغيير هون: كل group يتحقق بدون ترتيب
    groups.forEach((g) => {
      const slots = g.answers.filter((ans) => ans !== g.prefilled);
      const userAnswers = [...groupAnswers[g.key]];
      const remainingCorrect = [...slots]; // نسخة نشيل منها الكلمات اللي اتطابقت

      slots.forEach((_, si) => {
        total++;
        const userVal = normalize(userAnswers[si]);
        const matchIndex = remainingCorrect.findIndex(
          (ans) => normalize(ans) === userVal,
        );
        if (matchIndex !== -1) {
          correct++;
          newGroupResult[`${g.key}-${si}`] = true;
          remainingCorrect.splice(matchIndex, 1); // نشيلها عشان ما تتطابق مرتين
        } else {
          newGroupResult[`${g.key}-${si}`] = false;
        }
      });
    });

    setVerbResult(newVerbResult);
    setGroupResult(newGroupResult);

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
    const va = {};
    verbRows.forEach((v) => {
      va[v.verb] = v.answer;
    });
    setVerbAnswers(va);

    const ga = {};
    const vr = {};
    const gr = {};
    verbRows.forEach((v) => {
      vr[v.verb] = true;
    });
    groups.forEach((g) => {
      const slots = g.answers.filter((ans) => ans !== g.prefilled);
      ga[g.key] = slots;
      slots.forEach((_, si) => {
        gr[`${g.key}-${si}`] = true;
      });
    });
    setGroupAnswers(ga);
    setVerbResult(vr);
    setGroupResult(gr);
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit1Audio();
    setVerbAnswers(initVerbAnswers());
    setGroupAnswers(initGroupAnswers());
    setVerbResult({});
    setGroupResult({});
    setLocked(false);
  };

  const verbInput = (v) => {
    const isWrong = verbResult[v.verb] === false;
    const isCorrect = verbResult[v.verb] === true;
    return (
      <span className="relative inline-block">
        <input
          type="text"
          value={verbAnswers[v.verb]}
          placeholder="Type the word"
          title="Type the word"
          disabled={locked || isCorrect}
          onChange={(e) => handleVerbChange(v.verb, e.target.value)}
          className={`
            wb-unit1-answer-input w-[130px] border-0 border-b outline-none bg-transparent
            text-[17px]   px-1
            ${isWrong ? "border-[#D1232A]" : "border-black"}
          `}
        />
        {isWrong && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "18px",
              height: "18px",
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
  };

  const groupInput = (gKey, slotIndex, prefilled) => {
    if (prefilled) {
      return (
        <div
          style={{
            border: `2px solid ${BORDER}`,
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            minWidth: "120px",
          }}
        >
          {prefilled}
        </div>
      );
    }
    const isWrong = groupResult[`${gKey}-${slotIndex}`] === false;
    const isCorrect = groupResult[`${gKey}-${slotIndex}`] === true;
    return (
      <span className="relative inline-block">
        <input
          type="text"
          value={groupAnswers[gKey][slotIndex]}
          placeholder="Type the word"
          title="Type the word"
          disabled={locked || isCorrect}
          onChange={(e) => handleGroupChange(gKey, slotIndex, e.target.value)}
          className={`
            wb-unit1-answer-input border-0 outline-none bg-transparent
            text-[16px]   text-center
          `}
          style={{
            width: "120px",
            border: `2px solid ${BORDER}`,
            borderRadius: "8px",
            padding: "6px 10px",
          }}
        />
        {isWrong && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "18px",
              height: "18px",
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
  };

  const col1 = verbRows.slice(0, 5);
  const col2 = verbRows.slice(5, 10);
  const col3 = verbRows.slice(10, 15);

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="B"
          title="Find the past participle form of each irregular verb, then put each past participle into the correct group."
          subTitle="Decide the category for one item at a time, then review the whole group before checking."
        />

        {/* Verb Table */}
        <div className="grid grid-cols-3 gap-x-10 gap-y-4 mb-10">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((v) => (
                <div
                  role="button"
                  key={v.verb}
                  className="flex items-center gap-3"
                >
                  <WBUnit1AudioText
                    className="text-[17px] min-w-[55px]"
                    src={unit1Audio(
                      "Page 4 - Exercise B",
                      `Item_${String(verbAudioIndex[v.verb]).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${v.verb}`}
                  >
                    {v.verb}
                  </WBUnit1AudioText>
                  {verbInput(v)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Groups */}
        <div className="grid grid-cols-4 gap-4 mb-20">
          {groups.map((g) => {
            const slots = g.answers.filter((ans) => ans !== g.prefilled);
            const prefilledVal = g.prefilled;
            const rows = [];
            if (prefilledVal)
              rows.push({ prefilled: prefilledVal, slotIndex: null });
            slots.forEach((_, si) =>
              rows.push({ prefilled: null, slotIndex: si }),
            );
            while (rows.length < maxRows) rows.push(null);

            return (
              <div key={g.key} className="flex flex-col gap-3">
                <div
                  style={{
                    border: `2px solid ${BORDER}`,
                    borderRadius: "8px",
                    padding: "8px 10px",
                    textAlign: "center",
                    fontSize: "15px",
                    lineHeight: "1.4",
                  }}
                >
                  <WBUnit1AudioText
                    src={unit1Audio(
                      "Page 4 - Exercise B",
                      `Item_${String(g.headerAudio).padStart(3, "0")}_`,
                    )}
                    ariaLabel={`Play ${g.header}`}
                  >
                    {g.header}
                  </WBUnit1AudioText>
                  <br />
                  <strong>
                    <WBUnit1AudioText
                      src={
                        g.boldAudio
                          ? unit1Audio(
                              "Page 4 - Exercise B",
                              `Item_${String(g.boldAudio).padStart(3, "0")}_`,
                            )
                          : null
                      }
                      ariaLabel={`Play ${g.headerBold}`}
                    >
                      {g.headerBold}
                    </WBUnit1AudioText>
                  </strong>
                </div>
                {rows.map((row, ri) => (
                  <div key={ri} className="flex justify-center">
                    {row === null ? (
                      <div style={{ width: "120px", height: "36px" }} />
                    ) : row.prefilled ? (
                      groupInput(g.key, null, row.prefilled)
                    ) : (
                      groupInput(g.key, row.slotIndex, null)
                    )}
                  </div>
                ))}
              </div>
            );
          })}
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

export default WB_Unit1_Page4_PastParticiple;
