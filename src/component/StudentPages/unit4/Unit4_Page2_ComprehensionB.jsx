import React, { useState } from "react";
import { FaRedo, FaCheck, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import ActionButtons from "../../ActionButtons";

const Unit4_Page2_ComprehensionB = () => {
  const words = [
    { word: "architecture", fixedSyllables: null },
    { word: "renewable", fixedSyllables: null },
    { word: "resources", fixedSyllables: null },
    { word: "developed", fixedSyllables: null },
  ];

  const correctAnswers = [
    { syllables: "4", meaning: "a" },
    { syllables: "4", meaning: "c" },
    { syllables: "3", meaning: "b" },
    { syllables: "3", meaning: "d" },
  ];

  const meanings = [
    { letter: "a", text: "building design and study" },
    { letter: "b", text: "supplies, usable things" },
    { letter: "c", text: "able to be replaced" },
    { letter: "d", text: "caused to grow or become more advanced" },
  ];

  const [answers, setAnswers] = useState(
    words.map((w) => ({
      syllables: w.fixedSyllables || "",
      meaning: "",
    })),
  );

  const [errors, setErrors] = useState(
    words.map(() => ({ syllables: false, meaning: false })),
  );

  const [lockedFields, setLockedFields] = useState(
    words.map((w) => ({ syllables: !!w.fixedSyllables, meaning: false })),
  );

  const [locked, setLocked] = useState(false);

  const normalize = (text) => text.trim().toLowerCase().replace(/\s+/g, " ");

  const updateField = (index, field, value) => {
    const updated = [...answers];
    updated[index][field] = value;
    setAnswers(updated);

    const updatedErrors = [...errors];
    updatedErrors[index][field] = false;
    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a, i) => {
      if (!words[i].fixedSyllables && normalize(a.syllables) === "")
        return true;
      if (normalize(a.meaning) === "") return true;
      return false;
    });

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;
    const newErrors = answers.map((ans, i) => {
      const syllablesCorrect =
        words[i].fixedSyllables ||
        normalize(ans.syllables) === normalize(correctAnswers[i].syllables);
      const meaningCorrect =
        normalize(ans.meaning) === normalize(correctAnswers[i].meaning);

      if (syllablesCorrect && meaningCorrect) score++;

      return {
        syllables: !syllablesCorrect,
        meaning: !meaningCorrect,
      };
    });

    const newLocked = answers.map((ans, i) => {
      const syllablesCorrect =
        !!words[i].fixedSyllables ||
        normalize(ans.syllables) === normalize(correctAnswers[i].syllables);
      const meaningCorrect =
        normalize(ans.meaning) === normalize(correctAnswers[i].meaning);
      return {
        syllables: syllablesCorrect,
        meaning: meaningCorrect,
      };
    });

    setErrors(newErrors);
    setLockedFields(newLocked);

    const total = words.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">Score: ${score} / ${total}</span>
      </div>
    `;

    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(
      correctAnswers.map((a, i) => ({
        syllables: a.syllables,
        meaning: a.meaning,
      })),
    );
    setErrors(words.map(() => ({ syllables: false, meaning: false })));
    setLockedFields(words.map(() => ({ syllables: true, meaning: true })));
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(
      words.map((w) => ({
        syllables: w.fixedSyllables || "",
        meaning: "",
      })),
    );
    setErrors(words.map(() => ({ syllables: false, meaning: false })));
    setLockedFields(
      words.map((w) => ({ syllables: !!w.fixedSyllables, meaning: false })),
    );
    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Write the number of syllables for each word and match it to its meaning.
      </h5>

      <div className="flex gap-10 items-start mt-6">
        {/* TABLE */}
        <div className="flex-1">
          <table className="w-full border-collapse text-[18px]">
            <thead>
              <tr className="bg-[#dee7ca] text-[#84ad40]">
                <th className="border border-[#84ad40] px-4 py-2 text-center">
                  word
                </th>
                <th className="border border-[#84ad40] px-4 py-2 text-center">
                  syllables
                </th>
                <th className="border border-[#84ad40] px-4 py-2 text-center">
                  meaning
                </th>
              </tr>
            </thead>
            <tbody>
              {words.map((w, i) => (
                <tr key={i} className="text-center">
                  {/* WORD */}
                  <td className="border border-[#84ad40] px-4 py-2 font-semibold">
                    {w.word}
                  </td>

                  {/* SYLLABLES */}
                  <td className="border border-[#84ad40] px-4 py-2 relative">
                    {w.fixedSyllables ? (
                      <span className="font-bold text-[#4caf50]">
                        {w.fixedSyllables}
                      </span>
                    ) : (
                      <div className="relative inline-block">
                        <input
                          type="text"
                          value={answers[i].syllables}
                          disabled={locked || lockedFields[i].syllables}
                          maxLength={1}
                          onChange={(e) =>
                            updateField(i, "syllables", e.target.value)
                          }
                          className={`w-12 text-center border-b outline-none font-bold
                            ${errors[i].syllables ? "border-red-500" : "border-gray-400"}`}
                        />
                        {errors[i].syllables && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "-28px",
                              transform: "translateY(-50%)",
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
                            }}
                          >
                            ✕
                          </div>
                        )}
                      </div>
                    )}
                  </td>

                  {/* MEANING */}
                  <td className="border border-[#84ad40] px-4 py-2">
                    <div className="relative inline-block">
                      <input
                        type="text"
                        value={answers[i].meaning}
                        disabled={locked || lockedFields[i].meaning}
                          maxLength={1}

                        onChange={(e) =>
                          updateField(i, "meaning", e.target.value)
                        }
                        className={`w-12 text-center border-b outline-none font-bold 
                          ${errors[i].meaning ? "border-red-500" : "border-gray-400"}`}
                      />
                      {errors[i].meaning && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "-28px",
                            transform: "translateY(-50%)",
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
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MEANINGS LIST */}
        <div className="bg-[#f0f7f0] h-[220px] rounded-xl px-6 py-4 text-[17px] min-w-[220px] space-y-2 flex flex-col gap-2 justify-between">
          {meanings.map((m) => (
            <div key={m.letter} className="flex gap-2 h-full ">
              <span className="font-bold text-[#4caf50]">{m.letter}</span>
              <span>{m.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        <ActionButtons
          onShow={handleShow}
          onReset={handleReset}
          onCheck={handleCheck}
        />
      </div>
    </div>
  );
};

export default Unit4_Page2_ComprehensionB;
