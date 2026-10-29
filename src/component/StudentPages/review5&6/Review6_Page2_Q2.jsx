import React, { useState, useRef } from "react";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit6StudentAudioText, {
  stopUnit6StudentAudio,
  unit6StudentAudio,
} from "../unit6/Unit6StudentAudioText";

const Review6_Page2_Q2 = () => {
  const [youngerImg, setYoungerImg] = useState(null);
  const [nowImg, setNowImg] = useState(null);
  const [line1a, setLine1a] = useState("");
  const [line1b, setLine1b] = useState("");
  const [line2, setLine2] = useState("");
  const [line3a, setLine3a] = useState("");
  const [line3b, setLine3b] = useState("");

  const youngerRef = useRef();
  const nowRef = useRef();

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setter(url);
  };

  const handleReset = () => {
    stopUnit6StudentAudio();
    setYoungerImg(null);
    setNowImg(null);
    setLine1a("");
    setLine1b("");
    setLine2("");
    setLine3a("");
    setLine3b("");
  };

  const inputLineStyle = {
    flex: 1,
    border: "none",
    borderBottom: "1px solid #222",
    outline: "none",
    background: "transparent",
    fontSize: "18px",
    padding: "0 4px 2px 4px",
    color: "#222",
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall mb-10" style={{ gap: "25px" }}>
        <ExerciseHeaderReview
          sectionLetter="D"
          title="Upload or paste younger and current pictures, then write sentences describing how the person used to be and is now."
          subTitle={
            <>
              <span style={{ display: "block" }}>
                Task 1: Choose clear younger and current images of the same
                person.
              </span>
              <span style={{ display: "block" }}>
                Task 2: Use the images to write accurate used-to and now
                sentences that describe the change.
              </span>
            </>
          }
        />

        {/* IMAGE BOX */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1.5px solid #a5c96a",
            borderRadius: "10px",
            overflow: "hidden",
            minHeight: "220px",
          }}
        >
          {/* Younger */}
          <div
            style={{
              borderRight: "1.5px solid #a5c96a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "8px 0",
                borderBottom: "1.5px solid #a5c96a",
              }}
            >
              <Unit6StudentAudioText
                src={unit6StudentAudio("Page 55 - Exercise D", "Item_001_")}
                ariaLabel="Play Younger"
              >
                Younger
              </Unit6StudentAudioText>
            </div>
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={(event) => {
                if (event.target.closest(".unit6-student-audio-text")) return;
                youngerRef.current.click();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  youngerRef.current.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload a younger photo"
            >
              {youngerImg ? (
                <img
                  src={youngerImg}
                  alt="Uploaded younger photo"
                  style={{
                    maxHeight: "170px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <div
                  style={{
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    padding: "30px 20px",
                    color: "#aaa",
                    fontSize: "18px",
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  <Unit6StudentAudioText
                    src={unit6StudentAudio("Page 55 - Exercise D", "Item_003_")}
                    ariaLabel="Play Upload Photo"
                    focusable={false}
                  >
                    + Upload Photo
                  </Unit6StudentAudioText>
                </div>
              )}
              <input
                ref={youngerRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e, setYoungerImg)}
              />
            </div>
          </div>

          {/* Now */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
                padding: "8px 0",
                borderBottom: "1.5px solid #a5c96a",
              }}
            >
              <Unit6StudentAudioText
                src={unit6StudentAudio("Page 55 - Exercise D", "Item_002_")}
                ariaLabel="Play Now"
              >
                Now
              </Unit6StudentAudioText>
            </div>
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={(event) => {
                if (event.target.closest(".unit6-student-audio-text")) return;
                nowRef.current.click();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  nowRef.current.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload a current photo"
            >
              {nowImg ? (
                <img
                  src={nowImg}
                  alt="Uploaded current photo"
                  style={{
                    maxHeight: "170px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <div
                  style={{
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    padding: "30px 20px",
                    color: "#aaa",
                    fontSize: "18px",
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  <Unit6StudentAudioText
                    src={unit6StudentAudio("Page 55 - Exercise D", "Item_003_")}
                    ariaLabel="Play Upload Photo"
                    focusable={false}
                  >
                    + Upload Photo
                  </Unit6StudentAudioText>
                </div>
              )}
              <input
                ref={nowRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e, setNowImg)}
              />
            </div>
          </div>
        </div>

        {/* WRITING LINES */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "8px",
          }}
        >
          {/* Line 1: ___ used to be ___ */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              fontSize: "18px",
            }}
          >
            <input
              type="text"
              value={line1a}
              onChange={(e) => setLine1a(e.target.value)}
              placeholder="Name"
              title="Enter the person's name"
              aria-label="Person's name"
              style={{ ...inputLineStyle, width: "120px", flex: "none" }}
            />
            <Unit6StudentAudioText
              src={unit6StudentAudio("Page 55 - Exercise D", "Item_004_")}
              ariaLabel="Play used to be"
              style={{ whiteSpace: "nowrap" }}
            >
              used to be
            </Unit6StudentAudioText>
            <input
              type="text"
              value={line1b}
              onChange={(e) => setLine1b(e.target.value)}
              placeholder="Describe the person when younger"
              title="Describe how the person used to be"
              aria-label="Description of the person when younger"
              style={inputLineStyle}
            />
          </div>

          {/* Line 2: continuation */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              fontSize: "18px",
            }}
          >
            <input
              type="text"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              placeholder="Continue the younger description"
              title="Continue the younger description"
              aria-label="Additional younger description"
              style={inputLineStyle}
            />
          </div>

          {/* Line 3: Now, ___ */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              fontSize: "18px",
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>Now,</span>
            <input
              type="text"
              value={line3a}
              onChange={(e) => setLine3a(e.target.value)}
              placeholder="Describe the person now"
              title="Describe the person now"
              aria-label="Current description"
              style={inputLineStyle}
            />
          </div>

          {/* Line 4: continuation */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              fontSize: "18px",
            }}
          >
            <input
              type="text"
              value={line3b}
              onChange={(e) => setLine3b(e.target.value)}
              placeholder="Continue the current description"
              title="Continue the current description"
              aria-label="Additional current description"
              style={inputLineStyle}
            />
          </div>
        </div>
      </div>

      {/* RESET ONLY */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Review6_Page2_Q2;
