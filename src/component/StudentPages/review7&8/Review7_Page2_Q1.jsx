import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
const Review7_Page2_Q1 = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [validatedMatches, setValidatedMatches] = useState({});

  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);

  const questions = [
    { id: 0, text: "If we had more rain this year," },
    { id: 1, text: "If we had taken tennis lessons," },
    { id: 2, text: "If we had studied for the test," },
    { id: 3, text: "If we had stayed in our old house," },
  ];

  const sentences = [
    { id: 0, text: "we wouldn’t have had low grades." },
    { id: 1, text: "we would have been better players." },
    { id: 2, text: "we would have seen you more often." },
    { id: 3, text: "the plants would have been greener and bigger." },
  ];

  const correct = {
    0: 3,
    1: 1,
    2: 0,
    3: 2,
  };

  const selectImage = (id) => {
    if (showResult && validatedMatches[id] === correct[id]) return;

    setSelectedImg(id);

    // أول ما يبدأ يعدل شيل التقييم القديم
    setValidatedMatches((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const selectSentence = (id) => {
    if (selectedImg === null) return;
    if (locked) {
      return;
    }
    if (showResult && validatedMatches[selectedImg] === correct[selectedImg]) {
      setSelectedImg(null);
      return;
    }

    const alreadyCorrectlyUsed =
      showResult &&
      Object.entries(validatedMatches).some(
        ([imgId, sentId]) =>
          Number(sentId) === id &&
          correct[imgId] === Number(sentId) &&
          Number(imgId) !== selectedImg,
      );

    if (alreadyCorrectlyUsed) {
      return;
    }

    setMatches((prev) => {
      const updated = { ...prev };

      // احذف الربط القديم لنفس الكلمة
      Object.keys(updated).forEach((imgKey) => {
        // إذا الكلمة مستخدمة بصورة ثانية
        if (updated[imgKey] === id) {
          // إذا الصورة مثبتة صح لا تحذفها
          if (showResult && validatedMatches[imgKey] === correct[imgKey]) {
            return;
          }

          // غير هيك احذف الربط القديم
          delete updated[imgKey];
        }
      });

      updated[selectedImg] = id;

      return updated;
    });

    setSelectedImg(null);
  };
  const checkAnswers = () => {
    if (locked) return;

    if (Object.keys(matches).length !== questions.length) {
      ValidationAlert.info("Please match all.");
      return;
    }

    let correctCount = 0;

    Object.entries(matches).forEach(([imgId, sentId]) => {
      if (correct[imgId] === sentId) correctCount++;
    });

    const total = questions.length;

    const message = `
        Score: ${correctCount} / ${total}
  `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(message);
    } else if (correctCount === 0) {
      ValidationAlert.error(message);
    } else {
      ValidationAlert.warning(message);
    }
    setValidatedMatches(matches);
    setShowResult(true);
  };

  const showAnswers = () => {
    setMatches(correct);
    setLocked(true);
    setShowResult(true);
  };

  const reset = () => {
    setValidatedMatches({});
    setSelectedImg(null);
    setMatches({});
    setShowResult(false);
    setLocked(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8  mb-[8vh]">
          <span className=" mr-4">D</span>
          Match the first part of the sentence with its second part to make a
          third conditional sentence.
        </h5>{" "}
        {/* 🔥 الصور فوق */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-y-12">
          {questions.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr] items-center gap-x-24"
            >
              {/* Question */}
              <div
                onClick={() => selectImage(i)}
                className="relative flex items-center cursor-pointer min-h-[50px]"
                style={{
                  backgroundColor:
                    selectedImg === i ? "#fff5e8ff" : "transparent",
                  border:
                    selectedImg === i
                      ? "1px solid #f79631"
                      : "1px solid transparent",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  transition: "all 0.2s ease",
                }}
              >
                <span className="font-bold text-[18px] w-8 shrink-0">
                  {i + 1}
                </span>

                <span className="text-[18px]">{item.text}</span>

                <div
                  ref={(el) => (imageRefs.current[i] = el)}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#F59E0B",
                    borderRadius: "50%",
                  }}
                />
                {showResult &&
                  validatedMatches[i] !== undefined &&
                  correct[i] !== validatedMatches[i] && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "25px",
                        width: "20px",
                        height: "20px",
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
              </div>
              {/* Answer */}
              <div
                onClick={() => selectSentence(i)}
                className="relative flex items-center cursor-pointer min-h-[50px]"
              >
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#F59E0B",
                    borderRadius: "50%",
                  }}
                />

                <span className="font-bold text-[18px] ml-8 mr-4 w-5">
                  {String.fromCharCode(97 + i)}
                </span>

                <span className="text-[18px]">{sentences[i].text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Object.entries(matches).map(([imgId, sentId], i) => {
          const imgDot = imageRefs.current[imgId];
          const sentDot = sentenceRefs.current[sentId];

          if (!imgDot || !sentDot || !containerRef.current) return null;

          const imgRect = imgDot.getBoundingClientRect();
          const sentRect = sentDot.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const x1 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y1 = imgRect.top + imgRect.height / 2 - containerRect.top;

          const x2 = sentRect.left + sentRect.width / 2 - containerRect.left;
          const y2 = sentRect.top + sentRect.height / 2 - containerRect.top;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#f79631"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review7_Page2_Q1;
