import React from "react";
import { FaRedo, FaEye, FaCheck } from "react-icons/fa";

const ActionButtons = ({ onReset, onShow, onCheck }) => {
  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="flex justify-center gap-6 mt-8">
      {/* Reset */}
      {onReset && (
        <div className="relative group">
          <div
            onClick={onReset}
            onKeyDown={(e) => handleKeyDown(e, onReset)}
            role="button"
            tabIndex={0}
            aria-label="Reset activity"
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow pointer-events-none">
              <FaRedo size={14} aria-hidden="true" />
            </div>
          </div>

          <span
            aria-hidden="true"
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100  transition"
          >
            Reset
          </span>
        </div>
      )}

      {/* Show */}
      {onShow && (
        <div className="relative group">
          <div
            onClick={onShow}
            onKeyDown={(e) => handleKeyDown(e, onShow)}
            role="button"
            tabIndex={0}
            aria-label="Show answer"
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow pointer-events-none">
              <FaEye size={14} aria-hidden="true" />
            </div>
          </div>

          <span
            aria-hidden="true"
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100  transition whitespace-nowrap"
          >
            Show Answer
          </span>
        </div>
      )}

      {/* Check */}
      {onCheck && (
        <div className="relative group">
          <div
            onClick={onCheck}
            onKeyDown={(e) => handleKeyDown(e, onCheck)}
            role="button"
            tabIndex={0}
            aria-label="Check answer"
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow pointer-events-none">
              <FaCheck size={14} aria-hidden="true" />
            </div>
          </div>

          <span
            aria-hidden="true"
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100  transition whitespace-nowrap"
          >
            Check Answer
          </span>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
