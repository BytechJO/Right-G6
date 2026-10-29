/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/ClassBook/U6/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const unit6StudentAudio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const stopUnit6StudentAudio = ({ resetPageMedia = true } = {}) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.remove();
  }
  currentAudio = null;
  currentOwner = null;
  clearCurrentIndicator?.();
  clearCurrentIndicator = null;

  document.querySelectorAll("audio, video").forEach((media) => {
    media.pause();
    if (resetPageMedia && Number.isFinite(media.duration)) media.currentTime = 0;
  });
};

const Unit6StudentAudioText = ({
  src,
  children,
  ariaLabel,
  className = "",
  style,
  disabled = false,
  focusable = true,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit6-student-audio"));

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopUnit6StudentAudio();
    },
    [],
  );

  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);
  if (sources.length === 0) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  const play = () => {
    if (disabled) return;
    stopUnit6StudentAudio({ resetPageMedia: false });
    const owner = ownerRef.current;
    let index = 0;

    const finish = () => {
      if (currentOwner === owner) {
        currentAudio?.remove();
        currentAudio = null;
        currentOwner = null;
        clearCurrentIndicator = null;
      }
      setPlaying(false);
    };

    const playNext = () => {
      if (index >= sources.length || currentOwner !== owner) {
        finish();
        return;
      }
      currentAudio?.remove();
      const audio = new Audio(sources[index]);
      index += 1;
      currentAudio = audio;
      audio.style.display = "none";
      audio.dataset.unit6StudentAudio = "true";
      document.body.appendChild(audio);
      audio.addEventListener("ended", playNext, { once: true });
      audio.addEventListener("error", finish, { once: true });
      audio.addEventListener(
        "pause",
        () => {
          if (!audio.ended && currentOwner === owner) finish();
        },
        { once: true },
      );
      audio.play().catch(finish);
    };

    currentOwner = owner;
    clearCurrentIndicator = () => setPlaying(false);
    setPlaying(true);
    playNext();
  };

  return (
    <>
      <style>{`
        .unit6-student-audio-text:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
        .unit6-student-audio-text[data-full-audio="true"]:hover {
          outline: 2px solid #2563eb;
          outline-offset: 3px;
        }
      `}</style>
      <button
        type="button"
        className={`unit6-student-audio-text ${className}`.trim()}
        onClick={play}
        aria-label={ariaLabel || "Play audio"}
        aria-pressed={playing}
        aria-disabled={disabled}
        tabIndex={disabled || !focusable ? -1 : 0}
        data-full-audio={className.includes("full-audio") ? "true" : undefined}
        style={{
          appearance: "none",
          border: 0,
          background: "transparent",
          color: "inherit",
          font: "inherit",
          textAlign: "left",
          padding: 0,
          margin: 0,
          borderRadius: 7,
          cursor: disabled ? "default" : "pointer",
          display: "inline-flex",
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
              top: "-15px",
              right: "-12px",
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

export default Unit6StudentAudioText;
