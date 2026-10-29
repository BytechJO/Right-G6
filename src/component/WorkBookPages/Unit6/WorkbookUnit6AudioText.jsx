/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/WorkBook/unit6/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const workbookUnit6Audio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) =>
      path.includes(`/${folder}/`) &&
      path.split("/").pop().startsWith(startsWith),
  );
  return entry?.[1] || null;
};

export const workbookUnit6AudioSequence = (folder, prefixes) =>
  prefixes.map((prefix) => workbookUnit6Audio(folder, prefix)).filter(Boolean);

export const stopWorkbookUnit6Audio = ({ resetPageMedia = true } = {}) => {
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

const WorkbookUnit6AudioText = ({
  src,
  children,
  ariaLabel,
  style,
  className = "",
  disabled = false,
  focusable = true,
  fullAudio = false,
  flowText = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("workbook-unit6-audio"));
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopWorkbookUnit6Audio();
    },
    [],
  );

  if (sources.length === 0 || disabled) {
    const FallbackElement =
      !flowText && (style?.display === "flex" || style?.display === "block")
        ? "div"
        : "span";
    return <FallbackElement style={style}>{children}</FallbackElement>;
  }

  const play = () => {
    if (disabled) return;
    stopWorkbookUnit6Audio({ resetPageMedia: false });
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
      audio.dataset.workbookUnit6Audio = "true";
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

  const AudioElement = fullAudio ? "div" : flowText ? "span" : "button";
  const hasButtonRole = fullAudio || flowText;

  return (
    <>
      <style>{`
        .workbook-unit6-audio-text:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
        .workbook-unit6-audio-text[data-full-audio="true"]:hover,
        .workbook-unit6-audio-text[data-full-audio="true"]:focus-visible {
          background: rgba(132, 173, 64, 0.13) !important;
        }
      `}</style>
      <AudioElement
        type={hasButtonRole ? undefined : "button"}
        role={hasButtonRole ? "button" : undefined}
        className={`workbook-unit6-audio-text ${className}`.trim()}
        data-full-audio={fullAudio ? "true" : undefined}
        onClick={play}
        onKeyDown={(event) => {
          if (!hasButtonRole || (event.key !== "Enter" && event.key !== " ")) return;
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
        <span style={fullAudio ? { display: "contents" } : undefined}>
          {children}
        </span>
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

export default WorkbookUnit6AudioText;
