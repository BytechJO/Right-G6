import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  {
    before: "Kahlil was born in",
    after: ".",
    correct: ["Lebanon"],
  },
  {
    before: "He grew up partly in",
    middle: "and partly in the",
    after: ".",
    correct: ["Lebanon", "United States"],
  },
  {
    before: "He first wrote in",
    after: "and later in English.",
    correct: ["Arabic"],
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Unit8_Page2_ComprehensionA = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([null, null, null, null]);
  const [locked, setLocked] = useState(false);

  const handleChange = (i, val) => {
    if (locked || errors[i] === false) return;

    if (errors[i] === true) {
      setErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }

    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleCheck = () => {
    if (locked) return;

    if (answers.includes("")) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;

    const expected = ["Lebanon", "Lebanon", "United States", "Arabic"];

    const newErrors = answers.map((a, i) => {
      const ok = normalize(a) === normalize(expected[i]);

      if (ok) correct++;

      return ok ? false : true;
    });

    setErrors(newErrors);

    const total = expected.length;

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
    setAnswers(["Lebanon", "Lebanon", "United States", "Arabic"]);

    setErrors([false, false, false, false]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setErrors([null, null, null, null]);
    setLocked(false);
  };

  return (
    <div>
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">A</span>
        Finish the statements about Kahlil Gibran.
      </h5>

      <div className="flex flex-col gap-8 text-[18px] mt-5">
        {/* 1 */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold">1</span>

          <span>Kahlil was born in</span>

          <div
            className="relative"
            style={{
              minWidth: "180px",
              flex: 1,
              maxWidth: "280px",
            }}
          >
            <input
              value={answers[0]}
              disabled={locked || errors[0] === false}
              onChange={(e) => handleChange(0, e.target.value)}
              style={{
                width: "100%",
                borderBottom: `${
                  errors[0] === true ? "1px solid #ef4444" : "1px solid #555"
                }`,
                outline: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "500",
                padding: "2px 0",
              }}
            />

            {errors[0] === true && (
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
          </div>

          <span>.</span>
        </div>

        {/* 2 */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold">2</span>

          <span>He grew up partly in</span>

          <div className="relative" style={{ width: "180px" }}>
            <input
              value={answers[1]}
              disabled={locked || errors[1] === false}
              onChange={(e) => handleChange(1, e.target.value)}
              style={{
                width: "100%",
                borderBottom: `${
                  errors[1] === true ? "1px solid #ef4444" : "1px solid #555"
                }`,
                outline: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "500",
              }}
            />
            {errors[1] === true && (
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
          </div>

          <span>and partly in the</span>

          <div className="relative" style={{ width: "220px" }}>
            <input
              value={answers[2]}
              disabled={locked || errors[2] === false}
              onChange={(e) => handleChange(2, e.target.value)}
              style={{
                width: "100%",
                borderBottom: `${
                  errors[2] === true ? "1px solid #ef4444" : "1px solid #555"
                }`,
                outline: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "500",
              }}
            />
            {errors[2] === true && (
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
          </div>

          <span>.</span>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold">3</span>

          <span>He first wrote in</span>

          <div
            className="relative"
            style={{
              minWidth: "180px",
              flex: 1,
              maxWidth: "280px",
            }}
          >
            <input
              value={answers[3]}
              disabled={locked || errors[3] === false}
              onChange={(e) => handleChange(3, e.target.value)}
              style={{
                width: "100%",
                borderBottom: `${
                  errors[3] === true ? "1px solid #ef4444" : "1px solid #555"
                }`,
                outline: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "500",
                padding: "2px 0",
              }}
            />

            {errors[3] === true && (
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
          </div>

          <span>and later in English.</span>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          onReset={handleReset}
          onShow={handleShow}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit8_Page2_ComprehensionA;
