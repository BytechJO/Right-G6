/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/ClassBook/U3/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const unit3StudentAudio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const stopUnit3StudentAudio = () => {
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

const Unit3StudentAudioText = ({
  src,
  children,
  ariaLabel,
  className = "",
  style,
  disabled = false,
  focusable = true,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit3-student-audio"));

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopUnit3StudentAudio();
    },
    [],
  );

  if (!src) return <span className={className} style={style}>{children}</span>;

  const play = () => {
    if (disabled) return;
    stopUnit3StudentAudio();
    document.querySelectorAll("audio, video").forEach((media) => media.pause());
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
    <button
      type="button"
      className={`unit3-student-audio-text ${className}`.trim()}
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
        <span className="unit3-student-playing-icon" aria-hidden="true">
          <FaVolumeUp size={14} color="#111827" />
        </span>
      )}
    </button>
  );
};

export default Unit3StudentAudioText;
