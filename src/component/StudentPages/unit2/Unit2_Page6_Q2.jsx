import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import ActionButtons from "../../Button";
import trueIcon from "../../../assets/imgs/true.svg";
const CHART_ROWS = [
  {
    person: "Sam",
    smart: true,
    friendly: false,
    strong: false,
    funPerson: false,
    soccerPlayers: false,
  },
  {
    person: "Harry and Vince",
    smart: false,
    friendly: false,
    strong: true,
    funPerson: false,
    soccerPlayers: false,
  },
  {
    person: "Julie",
    smart: false,
    friendly: false,
    strong: false,
    funPerson: true,
    soccerPlayers: false,
  },
  {
    person: "Ellen",
    smart: false,
    friendly: true,
    strong: false,
    funPerson: false,
    soccerPlayers: false,
  },
  {
    person: "Judy and I",
    smart: false,
    friendly: false,
    strong: false,
    funPerson: false,
    soccerPlayers: true,
  },
];

const HEADERS = [
  "",
  "smart",
  "friendly",
  "strong",
  "a fun person",
  "expert soccer players",
];
const KEYS = ["smart", "friendly", "strong", "funPerson", "soccerPlayers"];

const LINES = 5;

const GrammarE = () => {
  const [answers, setAnswers] = useState(Array(LINES).fill(""));

  const handleChange = (i, val) => {
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const handleReset = () => setAnswers(Array(LINES).fill(""));

  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall" style={{ gap: "10px" }}>
        {/* العنوان */}
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2">E</span>
          Read the chart, and then write a sentence about each person or group
          of people.
        </h5>

        {/* الجدول */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "15px",
            marginBottom: "28px",
          }}
        >
          <thead>
            <tr>
              {HEADERS.map((h, i) => (
                <th
                  key={i}
                  style={{
                    background: "#c8ddb0",
                    color: "#3a5a1a",
                    fontWeight: 700,
                    padding: "8px 10px",
                    border: "1px solid #84ad40",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHART_ROWS.map((row, ri) => (
              <tr key={ri}>
                <td
                  style={{
                    border: "1px solid #84ad40",
                    padding: "6px 10px",
                    fontWeight: 600,
                    background: "#f5f9f0",
                    fontSize: "15px",
                  }}
                >
                  {row.person}
                </td>
                {KEYS.map((key) => (
                  <td
                    key={key}
                    style={{
                      border: "1px solid #84ad40",
                      textAlign: "center",
                      padding: "6px",

                      background: "#fff",
                      fontSize: "18px",
                      color: "#e53935",
                    }}
                  >
                    {row[key] ? (
                      <div className="flex justify-center">
                      <img src={trueIcon} style={{ height: "25px" }} /></div>
                    ) : (
                      ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* أسطر الكتابة */}
        <div className="flex flex-col gap-5 text-[18px]">
          {Array.from({ length: LINES }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-bold shrink-0">{i + 1}</span>
              <input
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                style={{
                  flex: 1,
                  borderBottom: "1px solid #555",
                  outline: "none",
                  background: "transparent",
                  fontSize: "18px",
                  padding: "2px 0",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Reset بس */}
      <div className="flex justify-center mt-8">
        <ActionButtons handleStartAgain={handleReset} />
      </div>
    </div>
  );
};

export default GrammarE;
