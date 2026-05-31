import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 12.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 13.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 14.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 6 Unit 10 Not Just a Jumble of Gerunds Folder/SVG/Asset 15.svg";
import ActionButtons from "../../ActionButtons";

const Unit10_Page4_WritingA = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [validatedMatches, setValidatedMatches] = useState({});
  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);

  const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
    { id: 3, img: img4 },
    { id: 4, img: img5 },
  ];

  const careers = [
    { id: 0, text: "butchering" },
    { id: 1, text: "engineering" },
    { id: 2, text: "nursing" },
    { id: 3, text: "managing" },
    { id: 4, text: "selling" },
  ];
  const correct = {
    0: 1,
    1: 3,
    2: 4,
    3: 0,
    4: 2,
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

    // إذا الصورة مثبتة صح لا تعدلها
    if (showResult && validatedMatches[selectedImg] === correct[selectedImg]) {
      setSelectedImg(null);
      return;
    }

    // إذا الجملة مثبتة صح لا تستخدمها
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

    if (Object.keys(matches).length !== images.length) {
      ValidationAlert.info("Please match all.");
      return;
    }

    let correctCount = 0;

    Object.entries(matches).forEach(([imgId, sentId]) => {
      if (correct[imgId] === sentId) correctCount++;
    });

    const total = images.length;

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
    setSelectedImg(null);
    setValidatedMatches({});
    setMatches({});
    setShowResult(false);
    setLocked(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative space-y-4 w-full max-w-[900px] mx-auto"
    >
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">A</span>
        Match each person to their career.{" "}
      </h5>

      <div className="w-full flex flex-col items-center gap-50">
        {/* 🔥 الصور فوق */}
        <div className="grid grid-cols-5 w-full">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => selectImage(i)}
              className="relative  flex flex-col items-center gap-2 cursor-pointer transition"
            >
              <img
                src={img.img}
                style={{
                  width: "140px",
                  height: "110px",
                  objectFit: "cover",
                  border:
                    selectedImg === i
                      ? "1px solid #F59E0B"
                      : "1px solid transparent",
                  borderRadius: "12px",
                  padding: "4px",
                  backgroundColor:
                    selectedImg === i ? "#F59E0B" : "transparent",
                }}
              />

              {showResult &&
                validatedMatches[i] !== undefined &&
                correct[i] !== validatedMatches[i] && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      width: "20px",
                      height: "20px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      zIndex: 5,
                    }}
                  >
                    ✕
                  </span>
                )}
              <div
                ref={(el) => (imageRefs.current[i] = el)}
                className="w-3 h-3 rounded-full mt-2 transition"
                style={{
                  backgroundColor: "#F59E0B",
                  transform: selectedImg === i ? "scale(1.4)" : "scale(1)",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* 🔥 الجمل تحت */}
        <div className="grid grid-cols-5 w-full">
          {careers.map((career, i) => (
            <div
              key={i}
              onClick={() => selectSentence(i)}
              className="relative flex flex-col items-center cursor-pointer"
            >
              <div
                ref={(el) => (sentenceRefs.current[i] = el)}
                className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10"
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#F59E0B",
                }}
              ></div>

              <div className="relative px-4 py-2 rounded-2xl text-[20px] text-center">
                <span className="font-bold mr-3">{i + 1}</span>

                {career.text}
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

          const x1 = sentRect.left + sentRect.width / 2 - containerRect.left;
          const y1 = sentRect.top + sentRect.height / 2 - containerRect.top;

          const x2 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
      <div className="flex justify-center gap-6 mt-8">
        <ActionButtons
          onReset={reset}
          onShow={showAnswers}
          onCheck={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit10_Page4_WritingA;
