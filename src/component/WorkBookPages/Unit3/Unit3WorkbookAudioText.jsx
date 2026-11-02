/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/WorkBook/unit3/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const workbookUnit3Audio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const stopWorkbookUnit3Audio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = null;
  currentOwner = null;
  clearCurrentIndicator?.();
  clearCurrentIndicator = null;
};

export const playWorkbookUnit3Audio = (src) => {
  if (!src) return;
  stopWorkbookUnit3Audio();
  document.querySelectorAll("audio, video").forEach((media) => media.pause());
  const audio = new Audio(src);
  currentAudio = audio;
  const finish = () => {
    if (currentAudio === audio) currentAudio = null;
  };
  audio.addEventListener("ended", finish, { once: true });
  audio.addEventListener("error", finish, { once: true });
  audio.play().catch(finish);
};

export const Unit3WorkbookAudioArea = ({
  src,
  active,
  children,
  ariaLabel,
  className = "",
  style,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit3-workbook-full-audio"));

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopWorkbookUnit3Audio();
    },
    [],
  );

  const play = () => {
    if (!active || !src) return;
    stopWorkbookUnit3Audio();
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
    <div
      className={`${active ? "wb-unit3-full-audio-area" : ""} ${className}`.trim()}
      role={active ? "button" : undefined}
      tabIndex={active ? 0 : undefined}
      aria-label={active ? ariaLabel || "Play full audio" : undefined}
      aria-pressed={active ? playing : undefined}
      onClick={active ? play : undefined}
      onKeyDown={active ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          play();
        }
      } : undefined}
      style={{ position: "relative", ...style }}
    >
      {children}
      {playing && (
        <span className="wb-unit3-playing-icon" aria-hidden="true">
          <FaVolumeUp size={14} color="#111827" />
        </span>
      )}
    </div>
  );
};

const Unit3WorkbookAudioText = ({
  src,
  children,
  ariaLabel,
  className = "",
  style,
  disabled = false,
  buttonRef,
  flowText = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit3-workbook-audio"));

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopWorkbookUnit3Audio();
    },
    [],
  );

  if (!src) return <span className={className} style={style}>{children}</span>;

  const play = () => {
    if (disabled) return;
    stopWorkbookUnit3Audio();
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

  const playingIcon = playing ? (
    <span className="wb-unit3-playing-icon" aria-hidden="true">
      <FaVolumeUp size={14} color="#111827" />
    </span>
  ) : null;

  if (flowText) {
    return (
      <span
        ref={buttonRef}
        role="button"
        className={`wb-unit3-audio-text ${className}`.trim()}
        onClick={play}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            play();
          }
        }}
        aria-label={ariaLabel || "Play audio"}
        aria-pressed={playing}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        style={{
          color: "inherit",
          font: "inherit",
          padding: 0,
          margin: 0,
          cursor: disabled ? "default" : "pointer",
          display: "inline",
          position: "relative",
          ...style,
        }}
      >
        {children}
        {playingIcon}
      </span>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`wb-unit3-audio-text ${className}`.trim()}
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
      {playingIcon}
    </button>
  );
};

export default Unit3WorkbookAudioText;
