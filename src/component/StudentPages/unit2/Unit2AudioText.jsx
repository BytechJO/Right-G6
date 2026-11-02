/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/ClassBook/U2/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let clearCurrentIndicator = null;

export const unit2Audio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const stopUnit2Audio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = null;
  clearCurrentIndicator?.();
  clearCurrentIndicator = null;
};

const Unit2AudioText = ({ src, children, ariaLabel, className = "", style }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(
    () => () => {
      if (currentAudio?.src === src) stopUnit2Audio();
    },
    [src],
  );

  if (!src) return <span className={className} style={style}>{children}</span>;

  const play = () => {
    stopUnit2Audio();
    document.querySelectorAll("audio, video").forEach((media) => media.pause());
    const audio = new Audio(src);
    currentAudio = audio;
    clearCurrentIndicator = () => setPlaying(false);
    setPlaying(true);
    const finish = () => {
      if (currentAudio === audio) {
        currentAudio = null;
        clearCurrentIndicator = null;
      }
      setPlaying(false);
    };
    audio.addEventListener("ended", finish, { once: true });
    audio.addEventListener("error", finish, { once: true });
    audio.play().catch(finish);
  };

  return (
    <>
      <style>{`
        .unit2-audio-text:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
      `}</style>
      <button
        type="button"
        className={`unit2-audio-text ${className}`.trim()}
        onClick={play}
        aria-label={ariaLabel || "Play audio"}
        aria-pressed={playing}
        style={{
          appearance: "none",
          border: 0,
          background: "transparent",
          color: "inherit",
          font: "inherit",
          padding: "2px 4px",
          margin: 0,
          borderRadius: "7px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          position: "relative",
          ...style,
        }}
      >
        <span>{children}</span>
        {playing && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              zIndex: 2,
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 7px rgba(0,0,0,.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <FaVolumeUp size={14} color="#111827" />
          </span>
        )}
      </button>
    </>
  );
};

export default Unit2AudioText;
