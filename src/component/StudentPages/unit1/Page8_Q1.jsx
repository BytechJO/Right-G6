import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import audio1 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_001_Stella_asks_Helen_if_she_bought_any_school.mp3";
import audio2 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_002_yet._Helen_didn't_buy_any_because_she_has.mp3";
import audio3 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_003_been_very_busy.mp3";
import audio4 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_004_She_had_a.mp3";
import audio5 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_005_week._Stella_told_Helen_that_she.mp3";
import audio6 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_006_bought.mp3";
import audio7 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_007_of_pencils_and_erasable_pens,_some_erasers,_and_some_notebooks_for_each.mp3";
import audio8 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_008_She_forgot_to_buy_a_ruler_and_a.mp3";
import audio9 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_009_Helen_will.mp3";
import audio10 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_010_go_to.mp3";
import audio11 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_011_the_store_tomorrow_and_she_will_buy_the.mp3";
import audio12 from "../../../assets/audio/ClassBook/U1/Page 8 - Exercise A/Item_012_supplies_that_Stella_needs_too.mp3";

const CORRECT = [
  "supplies",
  "lately",
  "tough",
  "a set",
  "subject",
  "calculator",
  "likely",
  "remaining",
];

const Page8_Q1 = () => {
  const [answers, setAnswers] = useState(Array(CORRECT.length).fill(""));
  const [errors, setErrors] = useState(Array(CORRECT.length).fill(null));
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

  const normalize = (text) =>
    text.trim().toLowerCase().replace(/\.$/, "").replace(/\s+/g, " ");

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;
    setAnswers((prev) =>
      prev.map((answer, index) => (index === i ? val : answer)),
    );
    if (errors[i] === true) {
      setErrors((prev) =>
        prev.map((error, index) => (index === i ? null : error)),
      );
    }
  };

  const handleCheck = () => {
    if (locked) return;
    const isEmpty = answers.some((a) => !a || a.trim() === "");
    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newErrors = [];
    answers.forEach((ans, i) => {
      if (normalize(ans) === normalize(CORRECT[i])) {
        correctCount++;
        newErrors[i] = false;
      } else {
        newErrors[i] = true;
      }
    });
    setErrors(newErrors);

    const total = CORRECT.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers([...CORRECT]);
    setErrors(Array(CORRECT.length).fill(false));
    setLocked(true);
  };

  const handleReset = () => {
    stopAudio();
    setAnswers(Array(CORRECT.length).fill(""));
    setErrors(Array(CORRECT.length).fill(null));
    setLocked(false);
  };

  const input = (i, width = "150px") => (
    <span className="relative inline-flex items-center mx-1">
      <input
        value={answers[i]}
        disabled={locked || errors[i] === false}
        onChange={(e) => handleChange(i, e.target.value)}
        aria-label={`Blank ${i + 1} of ${CORRECT.length}`}
        aria-invalid={errors[i] === true}
        style={{ width, height: "40px" }}
        className={`border-b outline-none text-center font-semibold bg-transparent
          ${errors[i] === true ? "border-red-500" : "border-black"}`}
      />
      {errors[i] === true && (
        <span
          aria-hidden="true"
          style={{
            marginLeft: "5px",
            position: "absolute",
            top: "10px",
            right: "0px",
            width: "20px",
            height: "20px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "11px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            flexShrink: 0,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "35px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title="Use some of the vocabulary words to make a summary of the conversation."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        {/* Passage */}
        <div className="text-[18px] leading-[4.6]">
          {audioText(
            "a-1",
            audio1,
            "Stella asks Helen if she bought any school",
          )}{" "}
          {input(0, "180px")}{" "}
          {audioText(
            "a-2",
            audio2,
            "yet. Helen didn't buy any because she has",
          )}{" "}
          {audioText("a-3", audio3, "been very busy")} {input(1, "180px")}.{" "}
          {audioText("a-4", audio4, "She had a")} {input(2, "160px")}{" "}
          {audioText("a-5", audio5, "week. Stella told Helen that she")}{" "}
          {audioText("a-6", audio6, "bought")} {input(3, "160px")}{" "}
          {audioText(
            "a-7",
            audio7,
            "of pencils and erasable pens, some erasers, and some notebooks for each",
          )}{" "}
          {input(4, "160px")}.{" "}
          {audioText("a-8", audio8, "She forgot to buy a ruler and a")}{" "}
          {input(5, "160px")}. {audioText("a-9", audio9, "Helen will")}{" "}
          {input(6, "140px")} {audioText("a-10", audio10, "go to")}{" "}
          {audioText(
            "a-11",
            audio11,
            "the store tomorrow and she will buy the",
          )}{" "}
          {input(7, "160px")}{" "}
          {audioText("a-12", audio12, "supplies that Stella needs too.")}
        </div>

        {/* Reset */}
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

export default Page8_Q1;
