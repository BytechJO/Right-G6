import React, { useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
import WBUnit1AudioText, {
  stopUnit1Audio,
  unit1Audio,
} from "./WB_Unit1_AudioText";

// Person images
import butcherImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 2.svg";
import nurseImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 3.svg";
import cobblerImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 5.svg";
import tailorImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 7.svg";
import bakerImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 9.svg";
import grocerImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 11.svg";

// Tool/object images
import shoeImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 1.svg";
import meatImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 4.svg";
import woodImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 6.svg";
import zipperImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 8.svg";
import breadImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 10.svg";
import patientImg from "../../../assets/imgs/pages/workbook/Right Int WB G6 U1 Folder/SVG/Asset 12.svg";

const WB_Unit1_Page5_D = () => {
  // persons: id, label
  // tools: label (a-f), image
  // correct match: person id → tool label
  // sentence answer: free text (Students' answers will vary)

  const persons = [
    {
      id: 1,
      label: "butcher",
      img: butcherImg,
      toolLabel: "a",
      toolImg: shoeImg,
      correctTool: "b",
      exampleSentence: "The butcher has cut the meat.",
    },
    {
      id: 2,
      label: "nurse",
      img: nurseImg,
      toolLabel: "b",
      toolImg: meatImg,
      correctTool: "f",
      exampleSentence: "",
    },
    {
      id: 3,
      label: "cobbler",
      img: cobblerImg,
      toolLabel: "c",
      toolImg: woodImg,
      correctTool: "a",
      exampleSentence: "",
    },
    {
      id: 4,
      label: "tailor",
      img: tailorImg,
      toolLabel: "d",
      toolImg: zipperImg,
      correctTool: "d",
      exampleSentence: "",
    },
    {
      id: 5,
      label: "baker",
      img: bakerImg,
      toolLabel: "e",
      toolImg: breadImg,
      correctTool: "c",
      exampleSentence: "",
    },
    {
      id: 6,
      label: "greengrocer",
      img: grocerImg,
      toolLabel: "f",
      toolImg: patientImg,
      correctTool: "e",
      exampleSentence: "",
    },
  ];

  // tool label → tool image mapping (ordered a-f)
  const tools = [
    { label: "a", img: shoeImg, hint: "", alt: "a shoe" },
    { label: "b", img: meatImg, hint: "", alt: "a piece of meat" },
    { label: "c", img: woodImg, hint: "", alt: "a wooden board" },
    { label: "d", img: zipperImg, hint: "(zipper)", alt: "a zipper" },
    { label: "e", img: breadImg, hint: "", alt: "a loaf of bread" },
    { label: "f", img: patientImg, hint: "(patient)", alt: "a patient in bed" },
  ];

  // matchAnswers: { personId: toolLabel string }
  const [matchAnswers, setMatchAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  // sentenceAnswers: { personId: string }
  const [sentenceAnswers, setSentenceAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [matchResult, setMatchResult] = useState({});
  const [locked, setLocked] = useState(false);

  const handleMatchChange = (personId, value) => {
    if (locked || matchResult[personId] === true) return;
    setMatchAnswers((prev) => ({ ...prev, [personId]: value.toLowerCase() }));
    setMatchResult((prev) => ({ ...prev, [personId]: undefined }));
  };

  const handleSentenceChange = (personId, value) => {
    if (locked) return;
    setSentenceAnswers((prev) => ({ ...prev, [personId]: value }));
  };

  const handleReset = () => {
    stopUnit1Audio();
    setMatchAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
    setSentenceAnswers({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
    setMatchResult({});
    setLocked(false);
  };

  const matchInput = (p) => {
    const isWrong = matchResult[p.id] === false;
    const isCorrect = matchResult[p.id] === true;
    return (
      <span className="relative inline-block">
        <input
          type="text"
          maxLength={1}
          value={matchAnswers[p.id]}
          placeholder="a"
          title="Type the matching letter"
          disabled={locked || isCorrect}
          onChange={(e) => handleMatchChange(p.id, e.target.value)}
          className={`
            wb-unit1-answer-input w-[40px] border-0 border-b outline-none bg-transparent
            text-[17px] text-center px-1
            ${isWrong ? "border-[#D1232A]" : "border-black"}
          `}
        />
        {isWrong && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "18px",
              height: "18px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </span>
        )}
      </span>
    );
  };

  const sentenceInput = (p) => (
    <input
      type="text"
      value={sentenceAnswers[p.id]}
      placeholder="Type the sentence"
      title="Type the sentence"
      aria-label={`Write a present perfect sentence about ${p.label}`}
      disabled={locked}
      onChange={(e) => handleSentenceChange(p.id, e.target.value)}
      className="wb-unit1-answer-input w-full border-0 border-b border-black outline-none bg-transparent text-[17px] px-1"
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Match each person with what they do and write a sentence about it
              in the <span style={{ color: "orange" }}>present perfect</span>{" "}
              tense.
            </>
          }
          subTitle="Match each worker to the correct item first, then use that pair to write one complete present-perfect sentence."
        />

        {/* Rows */}
        <div
          className="flex flex-col gap-6 text-[17px]"
          style={{
            padding: "16px",
            border: "2px solid #84ad40",
            marginBottom: "3em",
          }}
        >
          {persons.map((p, i) => {
            const tool = tools[i];
            return (
              <div
                key={p.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 180px 1fr",
                  alignItems: "center",
                  gap: "20px",
                  paddingBottom: "16px",
                  borderBottom:
                    i < persons.length - 1 ? "2px solid #84ad40" : "none",
                }}
              >
                {/* Person image + label */}
                <div className="flex flex-col items-center gap-1">
                  <img
                    src={p.img}
                    alt={p.label}
                    style={{
                      width: "90px",
                      height: "70px",
                      objectFit: "contain",
                    }}
                  />
                  <span>
                    <strong>{p.id}</strong>{" "}
                    <WBUnit1AudioText
                      src={
                        p.id <= 4
                          ? unit1Audio(
                              "Page 5 - Exercise D",
                              `Item_${String(p.id).padStart(3, "0")}_`,
                            )
                          : null
                      }
                      ariaLabel={`Play ${p.label}`}
                    >
                      {p.label}
                    </WBUnit1AudioText>
                  </span>
                </div>

                {/* Tool image + label */}
                <div className="flex flex-col items-center gap-1">
                  <img
                    src={tool.img}
                    alt={tool.alt}
                    style={{
                      width: "90px",
                      height: "70px",
                      objectFit: "contain",
                    }}
                  />
                  <span>
                    <strong>{tool.label}</strong>
                    {tool.hint ? " " : ""}
                    {tool.hint && (
                      <WBUnit1AudioText
                        src={
                          tool.label === "d"
                            ? unit1Audio("Page 5 - Exercise D", "Item_005_")
                            : null
                        }
                        ariaLabel="Play zipper"
                      >
                        {tool.hint}
                      </WBUnit1AudioText>
                    )}
                  </span>
                </div>

                {/* Match input + Sentence input */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{p.id}</span>
                    {matchInput(p)}
                  </div>
                  <div className="w-full">{sentenceInput(p)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit1_Page5_D;
