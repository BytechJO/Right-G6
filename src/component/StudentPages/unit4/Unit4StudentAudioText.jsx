/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/ClassBook/U4/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const unit4StudentAudio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const stopUnit4StudentAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = null;
  currentOwner = null;
  clearCurrentIndicator?.();
  clearCurrentIndicator = null;

  document.querySelectorAll("audio, video").forEach((media) => {
    media.pause();
    if (Number.isFinite(media.duration)) media.currentTime = 0;
  });
};

const Unit4StudentAudioText = ({
  src,
  children,
  ariaLabel,
  className = "",
  style,
  disabled = false,
  focusable = true,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit4-student-audio"));

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopUnit4StudentAudio();
    },
    [],
  );

  if (!src) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  const play = () => {
    if (disabled) return;
    stopUnit4StudentAudio();
    const audio = new Audio(src);
    currentAudio = audio;
    currentOwner = ownerRef.current;
    clearCurrentIndicator = () => setPlaying(false);
    setPlaying(true);

    const finish = () => {
      if (currentAudio === audio) {
        currentAudio = null;
        currentOwner = null;
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
        .unit4-student-audio-text:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
      `}</style>
      <button
      type="button"
      className={`unit4-student-audio-text ${className}`.trim()}
      onClick={play}
      aria-label={ariaLabel || "Play audio"}
      aria-pressed={playing}
      aria-disabled={disabled}
      tabIndex={disabled || !focusable ? -1 : 0}
      style={{
        appearance: "none",
        border: 0,
        background: "transparent",
        color: "inherit",
        font: "inherit",
        padding: "2px 4px",
        margin: 0,
        borderRadius: 7,
        cursor: disabled ? "default" : "pointer",
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
            width: 25,
            height: 25,
            borderRadius: "50%",
            background: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 7px rgba(0,0,0,.22)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          <FaVolumeUp size={14} color="#111827" />
        </span>
      )}
      </button>
    </>
  );
};

export default Unit4StudentAudioText;
