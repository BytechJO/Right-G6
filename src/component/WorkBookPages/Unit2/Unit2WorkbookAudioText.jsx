/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/WorkBook/unit2/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let clearCurrentIndicator = null;
let currentOwner = null;

export const workbookUnit2Audio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const stopWorkbookUnit2Audio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = null;
  currentOwner = null;
  clearCurrentIndicator?.();
  clearCurrentIndicator = null;
};

const Unit2WorkbookAudioText = ({
  src,
  children,
  ariaLabel,
  className = "",
  style,
  disabled = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit2-workbook-audio"));

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopWorkbookUnit2Audio();
    },
    [],
  );

  if (!src) return <span className={className} style={style}>{children}</span>;

  const play = () => {
    if (disabled) return;
    stopWorkbookUnit2Audio();
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
      className={`wb-unit2-audio-text ${className}`.trim()}
      onClick={play}
      aria-label={ariaLabel || "Play audio"}
      aria-pressed={playing}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
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
        <span className="wb-unit2-playing-icon" aria-hidden="true">
          <FaVolumeUp size={14} color="#111827" />
        </span>
      )}
    </button>
  );
};

export default Unit2WorkbookAudioText;
