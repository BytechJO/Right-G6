import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { useReadingHighlight } from "./useReadingHighlight";

const TimedNarrationText = ({
  audioSrc,
  wordTimings,
  aliases = [],
  children,
  ariaLabel = "Play or pause the narrated text",
  className = "",
  style,
  disabled = false,
  onBeforePlay,
}) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const { highlight, onTimeUpdate } = useReadingHighlight(
    wordTimings,
    aliases,
    Boolean(audioSrc) && !disabled,
  );

  const highlightContent = (node) => {
    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <React.Fragment key={child?.key ?? index}>
          {highlightContent(child)}
        </React.Fragment>
      ));
    }

    if (React.isValidElement(node)) {
      if (node.type === React.Fragment) {
        return React.cloneElement(
          node,
          {},
          highlightContent(node.props.children),
        );
      }

      if (["p", "li", "blockquote"].includes(node.type)) {
        return React.cloneElement(node, {}, highlight(node.props.children));
      }
    }

    return highlight(node);
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || disabled || !audioSrc) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    const resumeAt = audio.currentTime;
    document.querySelectorAll("audio, video").forEach((media) => {
      if (media === audio) return;
      media.pause();
      if (Number.isFinite(media.duration)) media.currentTime = 0;
    });
    onBeforePlay?.();
    audio.currentTime = resumeAt;
    onTimeUpdate(resumeAt);

    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <style>{`
        .timed-narration-text:hover,
        .timed-narration-text:focus-visible {
          box-shadow: 0 0 0 3px #2563eb;
          border-radius: 8px;
        }
        .timed-narration-text:focus-visible { outline: none; }
      `}</style>
      <div
        className={`timed-narration-text ${className}`.trim()}
        role="button"
        tabIndex={disabled || !audioSrc ? -1 : 0}
        aria-label={`${playing ? "Pause" : "Play or resume"}: ${ariaLabel}`}
        aria-pressed={playing}
        aria-disabled={disabled || !audioSrc}
        onClick={togglePlayback}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (!event.repeat) togglePlayback();
          }
        }}
        style={{
          position: "relative",
          cursor: disabled || !audioSrc ? "default" : "pointer",
          transition: "box-shadow 0.2s ease",
          ...style,
        }}
      >
        {playing && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 7px rgba(0,0,0,.22)",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <FaVolumeUp size={15} />
          </span>
        )}

        {highlightContent(children)}

        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => onTimeUpdate(event.currentTarget.currentTime)}
          onEnded={(event) => {
            event.currentTarget.currentTime = 0;
            onTimeUpdate(0);
            setPlaying(false);
          }}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default TimedNarrationText;
