import React, { useState, useRef } from "react";

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
      <div className="div-forall" style={{ gap: "25px" }}>
        {/* TITLE */}
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>D</span>
          How have they changed? Paste two pictures of yourself, or of someone
          famous, when younger and now. Write sentences describing how you, or
          they, used to be and are now.
        </h5>

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
              Younger
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
              onClick={() => youngerRef.current.click()}
            >
              {youngerImg ? (
                <img
                  src={youngerImg}
                  alt="younger"
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
                  + Upload Photo
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
              Now
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
              onClick={() => nowRef.current.click()}
            >
              {nowImg ? (
                <img
                  src={nowImg}
                  alt="now"
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
                  + Upload Photo
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
              style={{ ...inputLineStyle, width: "120px", flex: "none" }}
            />
            <span style={{ whiteSpace: "nowrap" }}>used to be</span>
            <input
              type="text"
              value={line1b}
              onChange={(e) => setLine1b(e.target.value)}
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
