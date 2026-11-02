/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/ClassBook/U9/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const unit9StudentAudio = (folder, startsWith) => {
  const entry = Object.entries(audioModules).find(
    ([path]) => {
      const fileName = path.split("/").pop();
      return (
        path.includes(`/${folder}/`) &&
        (fileName.startsWith(startsWith) ||
          fileName.startsWith(`Item_${startsWith}`))
      );
    },
  );
  return entry?.[1] || null;
};

export const unit9StudentAudioSequence = (folder, prefixes) =>
  prefixes.map((prefix) => unit9StudentAudio(folder, prefix)).filter(Boolean);

export const stopUnit9StudentAudio = ({ resetPageMedia = true } = {}) => {
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

const Unit9StudentAudioText = ({
  src,
  children,
  ariaLabel,
  style,
  className = "",
  disabled = false,
  focusable = true,
  flowText = false,
  fullAudio = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("unit9-student-audio"));
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopUnit9StudentAudio();
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
    stopUnit9StudentAudio({ resetPageMedia: false });
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
      const audio = new Audio(sources[index++]);
      currentAudio = audio;
      audio.style.display = "none";
      document.body.appendChild(audio);
      audio.addEventListener("ended", playNext, { once: true });
      audio.addEventListener("error", finish, { once: true });
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
        .unit9-student-audio-text:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
        }
        .unit9-student-audio-text[data-full-audio="true"]:hover,
        .unit9-student-audio-text[data-full-audio="true"]:focus-visible {
          background: rgba(132, 173, 64, 0.13) !important;
        }
      `}</style>
      <AudioElement
        type={hasButtonRole ? undefined : "button"}
        role={hasButtonRole ? "button" : undefined}
        className={`unit9-student-audio-text ${className}`.trim()}
        data-full-audio={fullAudio ? "true" : undefined}
        onClick={play}
        onKeyDown={(event) => {
          if (!hasButtonRole || (event.key !== "Enter" && event.key !== " ")) return;
          event.preventDefault();
          if (!event.repeat) play();
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
        <span style={fullAudio ? { display: "contents" } : undefined}>{children}</span>
        {playing && (
          <span aria-hidden="true" style={{
            position: "absolute", top: "-14px", right: "-12px",
            width: 25, height: 25, borderRadius: "50%", background: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 7px rgba(0,0,0,.22)", pointerEvents: "none", zIndex: 5,
          }}>
            <FaVolumeUp size={14} color="#111827" />
          </span>
        )}
      </AudioElement>
    </>
  );
};

export default Unit9StudentAudioText;
