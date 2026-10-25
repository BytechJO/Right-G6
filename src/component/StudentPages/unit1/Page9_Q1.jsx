import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import sound from "../../../assets/audio/ClassBook/U1/PG 9/CD5.Pg9_Instruction1_Adult Lady.mp3";
import img from "../../../assets/imgs/pages/classbook/Right 6 Unit 1 Been There, Done That Folder/SVG/Asset 9.svg";
import sentenceAudio1 from "../../../assets/audio/ClassBook/U1/Page 9 - Exercise D/Item_001_Jane_hasn't_been_to_the_mall_this_week.mp3";
import sentenceAudio2 from "../../../assets/audio/ClassBook/U1/Page 9 - Exercise D/Item_002_Mike_has_visited_his_grandparents.mp3";
import sentenceAudio3 from "../../../assets/audio/ClassBook/U1/Page 9 - Exercise D/Item_003_Suzy_has_already_seen_the_new_movie.mp3";
import sentenceAudio4 from "../../../assets/audio/ClassBook/U1/Page 9 - Exercise D/Item_004_Mark_and_Tom_haven't_eaten_at_the_cafeteria.mp3";
import sentenceAudio5 from "../../../assets/audio/ClassBook/U1/Page 9 - Exercise D/Item_005_The_cousins_haven't_bought_a_new_bike_to_share.mp3";

const PAGE_TITLE = (
  <>
    Listen, and then write <span style={{ color: "#dc2626" }}>✓</span> or{" "}
    <span style={{ color: "#dc2626" }}>✗</span>.
  </>
);

const SENTENCES = [
  {
    id: 0,
    text: "Jane hasn't been to the mall this week.",
    audio: sentenceAudio1,
  },
  { id: 1, text: "Mike has visited his grandparents.", audio: sentenceAudio2 },
  {
    id: 2,
    text: "Suzy has already seen the new movie.",
    audio: sentenceAudio3,
  },
  {
    id: 3,
    text: "Mark and Tom haven't eaten at the cafeteria.",
    audio: sentenceAudio4,
  },
  {
    id: 4,
    text: "The cousins haven't bought a new bike to share.",
    audio: sentenceAudio5,
  },
];

// الإجابات الصحيحة: true = ✓ | false = ✗
const CORRECT = [true, false, true, false, true];

const Page9_Q1 = () => {
  // null = لم يختر بعد | true = ✓ | false = ✗
  const [answers, setAnswers] = useState(Array(SENTENCES.length).fill(null));
  const [errors, setErrors] = useState(Array(SENTENCES.length).fill(null));
  const [locked, setLocked] = useState(false);
  const [activeAudio, setActiveAudio] = useState(null);
  const audioRef = useRef(null);
  const playerRef = useRef(null);

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
    stopAudio();
    playerRef.current?.pause();
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

  const audioText = (sentence) => (
    <span
      className="unit1-inline-audio text-gray-800"
      role="button"
      tabIndex={0}
      aria-label={`Play audio: ${sentence.text}`}
      aria-pressed={activeAudio === sentence.id}
      onClick={() => playAudio(sentence.id, sentence.audio)}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        playAudio(sentence.id, sentence.audio);
      }}
    >
      {sentence.text}
      {activeAudio === sentence.id && (
        <span className="unit1-inline-audio-indicator" aria-hidden="true">
          <FaVolumeUp size={14} color="#111827" background="#fff" />
        </span>
      )}
    </span>
  );

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
      start: 0,
      end: 6,
      text: "Listen, and then write a check mark or an X.",
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
    stopAudio();
    playerRef.current?.pause();
    setAnswers(Array(SENTENCES.length).fill(null));
    setErrors(Array(SENTENCES.length).fill(null));
    setLocked(false);
  };

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall mb-10" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title={PAGE_TITLE}
          subTitle="Check the key detail in each statement before choosing ✓/✗ or true/false; correct the wording when the task requires it."
        />
        <QuestionAudioPlayer
          ref={playerRef}
          src={sound}
          captions={captions}
          stopAtSecond={2.5}
          pageId="sb_unit1_page9_q1_instruction"
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
                      aria-label={`Choose check mark for statement ${i + 1}`}
                      aria-pressed={answers[i] === true}
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
                      {answers[i] === true ? (
                        <img src={trueIcon} alt="" style={{ height: "25px" }} />
                      ) : (
                        ""
                      )}
                      {hasError && answers[i] === true && (
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
                    </button>

                    {/* ✗ */}
                    <button
                      disabled={locked || isOk}
                      onClick={() => handleSelect(i, false)}
                      aria-label={`Choose X for statement ${i + 1}`}
                      aria-pressed={answers[i] === false}
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
                      {answers[i] === false ? (
                        <img
                          src={falseIcon}
                          alt=""
                          style={{ height: "25px" }}
                        />
                      ) : (
                        ""
                      )}
                      {hasError && answers[i] === false && (
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
                    </button>
                  </div>

                  {/* نص الجملة */}
                  {audioText(sent)}
                </div>
              );
            })}
          </div>
          <img
            src={img}
            alt="A blue bicycle."
            style={{ height: "200px", width: "auto" }}
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

export default Page9_Q1;
