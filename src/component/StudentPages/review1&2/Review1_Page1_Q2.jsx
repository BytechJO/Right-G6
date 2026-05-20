import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../Button";
import girlsImg from "../../../assets/imgs/pages/classbook/Right 6 Unit 2 Going to the Extreme Folder/SVG/9.svg"; // غير المسار

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
    setAnswers(["", "", "", "", "", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const renderInput = (index, width = "140px") => (
    <span className="relative inline-block mx-1">
      <input
        value={answers[index]}
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
        <h5 className="header-title-page8 mb-7">
          <span className="mr-2">B</span>
          Complete the conversation with vocabulary words and expressions.
        </h5>

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
                  <span>Do you have all your school</span>
                  {renderInput(0, "140px")}
                  <span>now?</span>
                </div>

                {/* Stacey 1 */}
                <div>
                  <div style={lineStyle}>
                    <span style={nameStyle("#f79631")}>Stacey:</span>
                    <span>No, I still need to get a</span>
                    {renderInput(1, "140px")}
                    <span>for math,</span>
                  </div>
                  <div style={indent}>
                    my favorite {renderInput(2, "140px")}.
                  </div>
                </div>

                {/* Shirley 2 */}
                <div>
                  <div style={lineStyle}>
                    <span style={nameStyle("#84ad40")}>Shirley:</span>
                    <span>Wow, that's</span>
                    {renderInput(3, "140px")}
                    <span>that you like math.</span>
                  </div>
                  <div style={indent}>
                    It's {renderInput(4, "140px")} for me, so I'm not
                  </div>
                  <div style={indent}>
                    {renderInput(5, "140px")} to get good grades in it.
                  </div>
                </div>
              </div>
              {/* الصورة */}
              <img
                src={girlsImg}
                alt="students"
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
                <span>
                  ! I hope it gets better for you. Didn't you say you had been
                </span>
              </div>
              <div style={indent}>
                doing well in math {renderInput(7, "140px")}?
              </div>
            </div>

            {/* Shirley 3 */}
            <div>
              <div style={lineStyle}>
                <span style={nameStyle("#E67E22")}>Shirley:</span>
                <span>Yes, thanks for reminding me. I can always</span>
                {renderInput(8, "140px")}
              </div>
              <div style={indent}>for an encouraging word.</div>
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
