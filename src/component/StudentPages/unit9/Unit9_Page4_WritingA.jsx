import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const QUESTIONS = [
  {
    activity: "Swimming",
    percent: ["40%"],
    degrees: ["144"],
  },
  {
    activity: "Throwing water balloons",
    percent: ["20%"],
    degrees: ["72"],
  },
  {
    activity: "Playing soccer",
    percent: ["20%"],
    degrees: ["72"],
  },
  {
    activity: "Hiking",
    percent: ["10%"],
    degrees: ["36"],
  },
  {
    activity: "Sitting and talking",
    percent: ["10%"],
    degrees: ["36"],
  },
  {
    activity: "Total:",
    percent: ["100%"],
    degrees: ["360"],
  },
];

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[.,!?''""';:%]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Unit9_Page4_WritingA = () => {
  const [percentAnswers, setPercentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [degreeAnswers, setDegreeAnswers] = useState(
    Array(QUESTIONS.length).fill(""),
  );

  const [percentErrors, setPercentErrors] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [degreeErrors, setDegreeErrors] = useState(
    Array(QUESTIONS.length).fill(null),
  );

  const [locked, setLocked] = useState(false);

  const handlePercentChange = (i, val) => {
    if (locked || percentErrors[i] === false) return;

    if (percentErrors[i] === true) {
      setPercentErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }

    setPercentAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleDegreeChange = (i, val) => {
    if (locked || degreeErrors[i] === false) return;

    if (degreeErrors[i] === true) {
      setDegreeErrors((prev) => prev.map((e, idx) => (idx === i ? null : e)));
    }

    setDegreeAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleCheck = () => {
    if (locked) return;

    const percentEmpty = percentAnswers.some(
      (a, i) => percentErrors[i] !== false && a === "",
    );

    const degreeEmpty = degreeAnswers.some((a) => a === "");

    if (percentEmpty || degreeEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;

    const newPercentErrors = percentAnswers.map((a, i) => {
      const ok = QUESTIONS[i].percent.some(
        (c) => normalize(a) === normalize(c),
      );

      if (ok) correct++;

      return ok ? false : true;
    });

    const newDegreeErrors = degreeAnswers.map((a, i) => {
      const ok = QUESTIONS[i].degrees.some(
        (c) => normalize(a) === normalize(c),
      );

      if (ok) correct++;

      return ok ? false : true;
    });

    setPercentErrors(newPercentErrors);
    setDegreeErrors(newDegreeErrors);

    const total = QUESTIONS.length * 2;

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
    setPercentAnswers(QUESTIONS.map((q) => q.percent[0]));

    setDegreeAnswers(QUESTIONS.map((q) => q.degrees[0]));

    setPercentErrors(Array(QUESTIONS.length).fill(false));
    setDegreeErrors(Array(QUESTIONS.length).fill(false));

    setLocked(true);
  };

  const handleReset = () => {
    setPercentAnswers(["", "", "", "", "", ""]);

    setDegreeAnswers(Array(QUESTIONS.length).fill(""));

    setPercentErrors([null, null, null, null, null, null]);

    setDegreeErrors(Array(QUESTIONS.length).fill(null));

    setLocked(false);
  };

  return (
    <div>
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">A</span>
        In the first column, list the percentages and the total percent of
        students doing each activity. Was every student asked about what they
        had been doing?
      </h5>

      <div className="mt-6 flex justify-center">
        <div className="flex gap-10 items-start">
          {/* activities */}
          <div className="flex flex-col gap-[18px] pt-12 min-w-[260px]">
            {QUESTIONS.map((q, i) => (
              <div
                key={i}
                className={`text-[20px] ${
                  q.activity === "Total:" ? "font-semibold" : ""
                }`}
              >
                {q.activity}
              </div>
            ))}
          </div>

          {/* percent */}
          <div className="w-[150px]">
            <div className="bg-[#DDE5C8] h-[42px] flex items-center justify-center text-[#89A63A] font-bold text-[20px]">
              percent
            </div>

            <div className="flex flex-col gap-[18px] pt-2.5">
              {QUESTIONS.map((q, i) => {
                const hasError = percentErrors[i] === true;
                const isOk = percentErrors[i] === false;

                return (
                  <div key={i} className="relative flex justify-center">
                    <input
                      value={percentAnswers[i]}
                      disabled={locked || isOk}
                      onChange={(e) => handlePercentChange(i, e.target.value)}
                      className="bg-transparent text-center text-[18px] outline-none"
                      style={{
                        width: "100px",
                        borderBottom: hasError
                          ? "1px solid #ef4444"
                          : "1px solid #555",
                        fontWeight: "500",
                      }}
                    />

                    {hasError && (
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
                );
              })}
            </div>
          </div>

          {/* degrees */}
          <div className="w-[170px] bg-[#DDE5C8] px-5 pb-4">
            <div className="h-[42px] flex items-center justify-center text-[#89A63A] font-bold text-[20px] border-b border-white">
              degrees
            </div>

            <div className="flex flex-col gap-[18px] pt-2.5">
              {QUESTIONS.map((q, i) => {
                const hasError = degreeErrors[i] === true;
                const isOk = degreeErrors[i] === false;

                return (
                  <div key={i} className="relative flex justify-center">
                    <input
                      value={degreeAnswers[i]}
                      disabled={locked || isOk}
                      onChange={(e) => handleDegreeChange(i, e.target.value)}
                      className="bg-transparent text-center text-[18px] outline-none"
                      style={{
                        width: "80px",
                        borderBottom: hasError
                          ? "1px solid #ef4444"
                          : "1px solid #555",
                        fontWeight: "500",
                      }}
                    />

                    {hasError && (
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
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
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

export default Unit9_Page4_WritingA;
