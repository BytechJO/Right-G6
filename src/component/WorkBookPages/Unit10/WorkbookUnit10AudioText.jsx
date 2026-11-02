import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const audioModules = import.meta.glob(
  "../../../assets/audio/WorkBook/unit10/**/*.mp3",
  { eager: true, query: "?url", import: "default" },
);

let currentAudio = null;
let currentOwner = null;
let clearCurrentIndicator = null;

export const workbookUnit10Audio = (folder, prefix) => {
  const entry = Object.entries(audioModules).find(([path]) => {
    const fileName = path.split("/").pop();
    return path.includes(`/${folder}/`) && fileName.startsWith(prefix);
  });
  return entry?.[1] || null;
};

export const workbookUnit10AudioSequence = (folder, prefixes) =>
  prefixes.map((prefix) => workbookUnit10Audio(folder, prefix)).filter(Boolean);

export const stopWorkbookUnit10Audio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.remove();
  }
  currentAudio = null;
  currentOwner = null;
  clearCurrentIndicator?.();
  clearCurrentIndicator = null;
  document.querySelectorAll("audio, video").forEach((media) => media.pause());
};

const WorkbookUnit10AudioText = ({
  src,
  children,
  ariaLabel,
  style,
  className = "",
  focusable = true,
  flowText = false,
  onActivate,
}) => {
  const [playing, setPlaying] = useState(false);
  const ownerRef = useRef(Symbol("workbook-unit10-audio"));
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean);

  useEffect(
    () => () => {
      if (currentOwner === ownerRef.current) stopWorkbookUnit10Audio();
    },
    [],
  );

  if (sources.length === 0) return <span style={style}>{children}</span>;

  const play = () => {
    onActivate?.();
    stopWorkbookUnit10Audio();
    const owner = ownerRef.current;
    currentOwner = owner;
    clearCurrentIndicator = () => setPlaying(false);
    setPlaying(true);
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
    playNext();
  };

  const Element = flowText ? "span" : "button";
  return (
    <Element
      type={flowText ? undefined : "button"}
      role={flowText ? "button" : undefined}
      tabIndex={focusable ? 0 : -1}
      className={`workbook-unit10-audio ${className}`.trim()}
      aria-label={ariaLabel || "Play audio"}
      aria-pressed={playing}
      onClick={play}
      onKeyDown={(event) => {
        if (!flowText || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        if (!event.repeat) play();
      }}
      style={{
        appearance: "none", border: 0, background: "transparent", color: "inherit",
        font: "inherit", lineHeight: "inherit", textAlign: "left", padding: 0,
        margin: 0, borderRadius: 6, cursor: "pointer", display: flowText ? "inline" : "inline-flex",
        alignItems: "center", position: "relative", ...style,
      }}
    >
      {children}
      {playing && (
        <span className="workbook-unit10-playing" aria-hidden="true">
          <FaVolumeUp size={14} color="#111827" />
        </span>
      )}
    </Element>
  );
};

export default WorkbookUnit10AudioText;
