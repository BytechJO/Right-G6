/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/ClassBook/U7/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const unit7StudentAudio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const unit7StudentAudioSequence = (folder, prefixes) =>
  prefixes.map((prefix) => unit7StudentAudio(folder, prefix)).filter(Boolean);

export const stopUnit7StudentAudio = ({ resetPageMedia = true } = {}) => {
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

const Unit7StudentAudioText = ({
  src,
  children,
  ariaLabel,
  style,
  className = "",
  disabled = false,
  focusable = true,
  flowText = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit7-student-audio"));
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopUnit7StudentAudio();
    },
    [],
  );

  if (sources.length === 0 || disabled) return <span style={style}>{children}</span>;

  const play = () => {
    if (disabled) return;
    stopUnit7StudentAudio({ resetPageMedia: false });
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
      audio.dataset.unit7StudentAudio = "true";
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

  const AudioElement = flowText ? "span" : "button";

  return (
    <>
      <style>{`
        .unit7-student-audio-text:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
      `}</style>
      <AudioElement
        type={flowText ? undefined : "button"}
        role={flowText ? "button" : undefined}
        className={`unit7-student-audio-text ${className}`.trim()}
        onClick={play}
        onKeyDown={(event) => {
          if (!flowText || (event.key !== "Enter" && event.key !== " ")) return;
          event.preventDefault();
          play();
        }}
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
          lineHeight: "inherit",
          textAlign: "left",
          padding: 0,
          margin: 0,
          borderRadius: 7,
          cursor: disabled ? "default" : "pointer",
          display: flowText ? "inline" : "inline-flex",
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
              top: "-14px",
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
              zIndex: 5,
            }}
          >
            <FaVolumeUp size={14} color="#111827" />
          </span>
        )}
      </AudioElement>
    </>
  );
};

export default Unit7StudentAudioText;
