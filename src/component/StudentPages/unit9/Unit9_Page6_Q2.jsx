import React, { useState } from "react";

const Unit9_Page6_Q2 = () => {
  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleChange = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", "", "", "", ""]);
  };

  const inputField = (index) => (
    <input
      type="text"
      value={answers[index]}
      onChange={(e) => handleChange(index, e.target.value)}
      className="
        w-full
        h-full
        border-0
        outline-none
        bg-transparent
        text-[18px]
        text-black
        font-semibold
        text-center
        px-2
      "
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-[10vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Name some of the activities you have been doing and how long you have
          been doing each one.
        </h5>

        {/* TABLE */}
        <table
          className="w-full border-collapse"
          style={{
            border: "2px solid #9CCB5B",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#DDE3C8",
              }}
            >
              <th
                className="border border-[#9CCB5B] p-4 text-[#83AC40]"
                style={{ width: "20%" }}
              >
                Subject
              </th>

              <th
                className="border border-[#9CCB5B] p-4 text-[#83AC40]"
                style={{ width: "45%" }}
              >
                Present Progressive Verb
              </th>

              <th
                className="border border-[#9CCB5B] p-4 text-[#83AC40]"
                style={{ width: "35%" }}
              >
                For/Since
              </th>
            </tr>
          </thead>

          <tbody>
            {/* ROW 1 */}
            <tr>
              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(0)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(1)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(2)}
              </td>
            </tr>

            {/* ROW 2 */}
            <tr>
              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(3)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(4)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(5)}
              </td>
            </tr>

            {/* ROW 3 */}
            <tr>
              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(6)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(7)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(8)}
              </td>
            </tr>

            {/* ROW 4 */}
            <tr>
              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(9)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(10)}
              </td>

              <td className="border border-[#9CCB5B] h-[70px] px-2">
                {inputField(11)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BUTTON */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Unit9_Page6_Q2;
