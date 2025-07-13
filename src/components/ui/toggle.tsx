import React from "react";

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onToggle,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={onToggle}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${isOn ? "bg-green-600" : "bg-gray-600"}
        ${className}
      `}
    >
      <span
        className={`
          pointer-events-none block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform
          ${isOn ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
};
