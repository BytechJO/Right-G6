import React, { useState } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import girlsImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/9.svg"; // غير المسار
import Unit2AudioText, { stopUnit2Audio, unit2Audio } from "../unit2/Unit2AudioText";

const Review1_Page1_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const questions = [
    { correct: "supplies" },
    { correct: "calculator" },
    { correct: "subject" },
    { correct: "terrific" },
    { correct: "no fun" },
    { correct: "likely" },
    { correct: "I’m sorry to hear that" },
    { correct: "lately" },
    { correct: "count on you" },
  ];

  const normalize = (text) =>
    text.toLowerCase().replace(/[!?.]/g, "").replace(/\s+/g, " ").trim();

  const handleChange = (i, value) => {
    if (result[i] === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const handleCheck = () => {
    if (locked) return;
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correctCount = 0;
    const res = answers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].correct);
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span></div>`;
    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    setAnswers(questions.map((q) => q.correct));
    setResult([]);
    setLocked(true);
  };

  const handleReset = () => {
    stopUnit2Audio();
    setAnswers(["", "", "", "", "", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const renderInput = (index, width = "140px") => (
    <span className="relative inline-block mx-1">
      <input
        value={answers[index]}
        placeholder="Type the word"
        title="Type the word or expression"
        className="review-unit2-answer-input"
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
        style={{
          width,
          borderBottom:
            result[index] === false ? "2px solid red" : "1px solid #333",
          outline: "none",
          textAlign: "center",
          background: "transparent",
          fontSize: "18px",
          fontWeight: 500,
          padding: "2px 4px",
        }}
      />
      {result[index] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
  const nameStyle = (color) => ({
    fontWeight: "bold",
    color,
    minWidth: "70px",
    display: "inline-block",
    fontSize: "17px",
  });

  const lineStyle = {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
    fontSize: "17px",
    flexWrap: "wrap",
  };

  const indent = { marginLeft: "78px", fontSize: "18px", marginTop: "6px" };

  return (
    <div className="p-8 flex flex-col items-center">
      <div
        className="div-forall"
        style={{
          gap: "25px",
        }}
      >
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Complete the conversation with vocabulary words and expressions."
          subTitle="Read the full sentence or clue first, then enter the word or expression that fits both meaning and grammar before checking."
        />

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {/* المحادثة */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",

                gap: "10px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                {/* Shirley 1 */}
                <div style={lineStyle}>
                  <span style={nameStyle("#84ad40")}>Shirley:</span>
                  <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_001_")} ariaLabel="Play Shirley's question">Do you have all your school</Unit2AudioText>
                  {renderInput(0, "140px")}
                  <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_002_")} ariaLabel="Play now">now?</Unit2AudioText>
                </div>

                {/* Stacey 1 */}
                <div>
                  <div style={lineStyle}>
                    <span style={nameStyle("#f79631")}>
                      <Unit2AudioText
                        src={unit2Audio("Page 16 - Exercise B", "Item_005_")}
                        ariaLabel="Play Stacey"
                      >
                        Stacey:
                      </Unit2AudioText>
                    </span>
                    <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_003_")} ariaLabel="Play conversation phrase">No, I still need to get a</Unit2AudioText>
                    {renderInput(1, "140px")}
                    <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_004_")} ariaLabel="Play for math">for math,</Unit2AudioText>
                  </div>
                  <div style={indent}>
                    <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_006_")} ariaLabel="Play my favorite">my favorite</Unit2AudioText> {renderInput(2, "140px")}.
                  </div>
                </div>

                {/* Shirley 2 */}
                <div>
                  <div style={lineStyle}>
                    <span style={nameStyle("#84ad40")}>Shirley:</span>
                    <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_007_")} ariaLabel="Play conversation phrase">Wow, that's</Unit2AudioText>
                    {renderInput(3, "140px")}
                    <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_008_")} ariaLabel="Play that you like math">that you like math.</Unit2AudioText>
                  </div>
                  <div style={indent}>
                    <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_010_")} ariaLabel="Play It's">It's</Unit2AudioText> {renderInput(4, "140px")} <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_009_")} ariaLabel="Play for me so I'm not">for me, so I'm not</Unit2AudioText>
                  </div>
                  <div style={indent}>
                    {renderInput(5, "140px")} <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_011_")} ariaLabel="Play to get good grades in it">to get good grades in it.</Unit2AudioText>
                  </div>
                </div>
              </div>
              {/* الصورة */}
              <img
                src={girlsImg}
                alt="Two students talking about their school supplies and math class"
                style={{
                  width: "250px",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            </div>
            {/* Stacey 2 */}
            <div>
              <div style={lineStyle}>
                <span style={nameStyle("#f79631")}>Stacey:</span>
                {renderInput(6, "140px")}
                <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_012_")} ariaLabel="Play conversation phrase">
                  ! I hope it gets better for you. Didn't you say you had been
                </Unit2AudioText>
              </div>
              <div style={indent}>
                <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_013_")} ariaLabel="Play doing well in math">doing well in math</Unit2AudioText> {renderInput(7, "140px")}?
              </div>
            </div>

            {/* Shirley 3 */}
            <div>
              <div style={lineStyle}>
                <span style={nameStyle("#E67E22")}>Shirley:</span>
                <Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_014_")} ariaLabel="Play Shirley's response">Yes, thanks for reminding me. I can always</Unit2AudioText>
                {renderInput(8, "140px")}
              </div>
              <div style={indent}><Unit2AudioText src={unit2Audio("Page 16 - Exercise B", "Item_015_")} ariaLabel="Play for an encouraging word">for an encouraging word.</Unit2AudioText></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <ActionButtons
            handleShowAnswer={handleShow}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
};

export default Review1_Page1_Q2;
