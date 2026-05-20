import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import sound from "../../../assets/audio/ClassBook/U1/PG 9/CD5.Pg9_Instruction1_Adult Lady.mp3";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 9.svg"
const SENTENCES = [
  { id: 0, text: "Jane hasn't been to the mall this week." },
  { id: 1, text: "Mike has visited his grandparents." },
  { id: 2, text: "Suzy has already seen the new movie." },
  { id: 3, text: "Mark and Tom haven't eaten at the cafeteria." },
  { id: 4, text: "The cousins haven't bought a new bike to share." },
];

// الإجابات الصحيحة: true = ✓ | false = ✗
const CORRECT = [true, false, true, false, true];

const Page9_Q1 = () => {
  // null = لم يختر بعد | true = ✓ | false = ✗
  const [answers, setAnswers] = useState(Array(SENTENCES.length).fill(null));
  const [errors, setErrors] = useState(Array(SENTENCES.length).fill(null));
  const [locked, setLocked] = useState(false);

  const handleSelect = (idx, value) => {
    if (locked || errors[idx] === false) return;

    // امسح الخطأ فور التغيير
    if (errors[idx] === true) {
      setErrors((prev) => prev.map((e, i) => (i === idx ? null : e)));
    }
    setAnswers((prev) => prev.map((a, i) => (i === idx ? value : a)));
  };

  const captions = [
    {
      start: 0.459,
      end: 3.579,
      text: "Page 6, grammar. Present perfect.",
    },
    {
      start: 4.199,
      end: 6.259,
      text: "Larry has seen the new movie.",
    },
    {
      start: 6.739,
      end: 8.159,
      text: "Has Larry seen the new movie?",
    },
    {
      start: 8.76,
      end: 10.079,
      text: "They have gone to the beach.",
    },
    {
      start: 10.659,
      end: 11.84,
      text: "Have they gone to the beach?",
    },
    {
      start: 12.259,
      end: 13.759,
      text: "You haven't gone to the beach.",
    },
    {
      start: 14.679,
      end: 16.02,
      text: "Haven't you gone to the beach?",
    },
  ];

  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => a === null)) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let correct = 0;
    const newErrors = answers.map((a, i) => {
      const ok = a === CORRECT[i];
      if (ok) correct++;
      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = SENTENCES.length;
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
    setAnswers([...CORRECT]);
    setErrors(Array(SENTENCES.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(SENTENCES.length).fill(null));
    setErrors(Array(SENTENCES.length).fill(null));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "20px" }}>
        {/* Title */}
        <h5 className="header-title-page8">
          <span className="ex-A mr-2">D</span>
          Listen, and then write <b className="text-red-500">✓</b> or{" "}
          <b className="text-red-500">✗</b>.
        </h5>
        <QuestionAudioPlayer
          src={sound}
          captions={captions}
          stopAtSecond={2.5}
        />
        <div className="flex gap-5 w-full items-center">
        {/* Sentences list */}
        <div className="flex flex-col gap-10">
          {SENTENCES.map((sent, i) => {
            const hasError = errors[i] === true;
            const isOk = errors[i] === false;

            return (
              <div key={i} className="flex items-center gap-4 text-[18px]">
                {/* رقم السؤال */}
                <span className="font-bold w-[20px] text-right shrink-0">
                  {i + 1}
                </span>

                {/* أزرار ✓ ✗ */}
                <div className="flex gap-2 shrink-0">
                  {/* ✓ */}
                  <button
                    disabled={locked || isOk}
                    onClick={() => handleSelect(i, true)}
                    style={{
                      width: "38px",
                      height: "38px",
                      // borderRadius: "8px",
                      borderBottom: ` ${
                        answers[i] === true
                          ? hasError
                            ? "2px solid #ef4444"
                            : "1px solid #84ad40"
                          : "1px solid #ccc"
                      }`,
                      background:
                        answers[i] === true
                          ? hasError
                            ? "#f0fdf4"
                            : "#f0fdf4"
                          : "white",

                      fontSize: "20px",
                      fontWeight: "bold",
                      cursor: locked || isOk ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s",
                      position: "relative",
                    }}
                  >
                    <img src={trueIcon} style={{ height: "25px" }} />
                    {hasError && answers[i] === true && (
                      <span
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
                  </button>

                  {/* ✗ */}
                  <button
                    disabled={locked || isOk}
                    onClick={() => handleSelect(i, false)}
                    style={{
                      width: "38px",
                      height: "38px",
                      // borderRadius: "8px",
                      borderBottom: `${
                        answers[i] === false
                          ? hasError
                            ? "2px solid #ef4444"
                            : "1px solid #16a34a"
                          : "1px solid #ccc"
                      }`,
                      background:
                        answers[i] === false
                          ? hasError
                            ? "#f0fdf4"
                            : "#f0fdf4"
                          : "white",

                      fontSize: "20px",
                      fontWeight: "bold",
                      cursor: locked || isOk ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s",
                      position: "relative",
                    }}
                  >
                    <img src={falseIcon} style={{ height: "25px" }} />
                    {hasError && answers[i] === false && (
                      <span
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
                  </button>
                </div>

                {/* نص الجملة */}
                <span className="text-gray-800">{sent.text}</span>
              </div>
            );
          })}
        </div>
        <img src={img} style={{height:"200px" ,width:"auto"}}/>
</div>
        {/* Buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>
          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page9_Q1;
