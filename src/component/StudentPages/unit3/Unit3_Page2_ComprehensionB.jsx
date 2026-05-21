import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""'';:]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// ✅ Box خارج الكومبوننت الرئيسي
const Box = ({ label, inputKey, answers, errors, locked, onChange }) => {
  const isOk = inputKey && errors[inputKey] === true;
  const isWrong = inputKey && errors[inputKey] === false;

  return (
    <div
      style={{
        width: "140px",
        height: "40px",
        borderRadius: "10px",
        border: isWrong ? "1.5px solid #ef4444" : "1.5px solid #84ad40",
        // background: isOk ? "#f0f7e6" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {label !== undefined ? (
        <span
          style={{ fontSize: "17px", color: "#333" }}
        >
          {label}
        </span>
      ) : (
        <input
          value={answers[inputKey]}
          disabled={locked || isOk}
          onChange={(e) => onChange(inputKey, e.target.value)}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            textAlign: "center",
            fontSize: "17px",
            fontWeight: 500,
            color: isOk ? "#84ad40" : "#333",
            borderRadius: "10px",
          }}
        />
      )}
      {isWrong && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "22px",
            height: "22px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            zIndex: 5,
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
};

const Unit3_Page2_ComprehensionB = () => {
  const CORRECT = {
    l0_participle: ["woken"],
    l1_participle: ["known"],
    r0_present: ["be", "is", "am", "are"],
    r1_present: ["ride"],
  };

  const initAnswers = () => ({
    l0_participle: "",
    l1_participle: "",
    r0_present: "",
    r1_present: "",
  });
  const initErrors = () => ({
    l0_participle: null,
    l1_participle: null,
    r0_present: null,
    r1_present: null,
  });

  const [answers, setAnswers] = useState(initAnswers);
  const [errors, setErrors] = useState(initErrors);
  const [locked, setLocked] = useState(false);

  const handleChange = (key, val) => {
    if (locked || errors[key] === true) return;
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleCheck = () => {
    if (locked) return;
    if (Object.values(answers).some((a) => !a.trim())) {
      ValidationAlert.info();
      return;
    }
    let score = 0;
    const newErr = {};
    Object.keys(CORRECT).forEach((k) => {
      const ok = CORRECT[k].some((c) => normalize(answers[k]) === normalize(c));
      if (ok) score++;
      newErr[k] = ok ? true : false;
    });
    setErrors(newErr);
    const total = Object.keys(CORRECT).length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShow = () => {
    const shown = {};
    Object.keys(CORRECT).forEach((k) => (shown[k] = CORRECT[k][0]));
    setAnswers(shown);
    const okErr = {};
    Object.keys(CORRECT).forEach((k) => (okErr[k] = true));
    setErrors(okErr);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(initAnswers());
    setErrors(initErrors());
    setLocked(false);
  };

  const boxProps = { answers, errors, locked, onChange: handleChange };

  const headerStyle = {
    width: "140px",
    height: "50px",
    textAlign: "center",
    fontSize: "17px",
    borderRadius:"30px",
    fontWeight: 600,
    // color: "#555",
     background: "#d3d3d38e",
    lineHeight: "1.3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const colStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">B</span>
        Complete the chart with the right verb form.
      </h5>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          marginTop: "16px",
        }}
      >
        {/* الجدول الأيسر */}
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={colStyle}>
            <div style={headerStyle}>present tense</div>
            <Box label="wake, awaken" {...boxProps} />
            <Box label="know" {...boxProps} />
          </div>
          <div style={colStyle}>
            <div style={headerStyle}>
              participle
              <br />
              (have, has, had)
            </div>
            <Box inputKey="l0_participle" {...boxProps} />
            <Box inputKey="l1_participle" {...boxProps} />
          </div>
        </div>

        {/* الجدول الأيمن */}
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={colStyle}>
            <div style={headerStyle}>present tense</div>
            <Box inputKey="r0_present" {...boxProps} />
            <Box inputKey="r1_present" {...boxProps} />
          </div>
          <div style={colStyle}>
            <div style={headerStyle}>
              participle
              <br />
              (have, has, had)
            </div>
            <Box label="been" {...boxProps} />
            <Box label="ridden" {...boxProps} />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <ActionButtons
          onShow={handleShow}
          onReset={handleReset}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit3_Page2_ComprehensionB;
