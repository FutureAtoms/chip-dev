import React from "react";

interface ChipSignetProps {
  height?: number;
  width?: number;
  className?: string;
}

const ChipSignet: React.FC<ChipSignetProps> = ({ height = 24, width, className }) => {
  const computedWidth = width ?? height;

  return (
    <svg
      viewBox="0 0 40 40"
      height={height}
      width={computedWidth}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chip icon - simplified microchip design */}
      <rect x="8" y="8" width="24" height="24" rx="4" fill="currentColor" opacity="0.9" />
      <rect x="14" y="14" width="12" height="12" rx="2" fill="var(--vscode-editor-background, #1e1e1e)" />
      {/* Chip pins */}
      <rect x="3" y="12" width="5" height="3" fill="currentColor" opacity="0.7" />
      <rect x="3" y="25" width="5" height="3" fill="currentColor" opacity="0.7" />
      <rect x="32" y="12" width="5" height="3" fill="currentColor" opacity="0.7" />
      <rect x="32" y="25" width="5" height="3" fill="currentColor" opacity="0.7" />
      <rect x="15" y="3" width="3" height="5" fill="currentColor" opacity="0.7" />
      <rect x="22" y="3" width="3" height="5" fill="currentColor" opacity="0.7" />
      <rect x="15" y="32" width="3" height="5" fill="currentColor" opacity="0.7" />
      <rect x="22" y="32" width="3" height="5" fill="currentColor" opacity="0.7" />
    </svg>
  );
};

export default ChipSignet;
