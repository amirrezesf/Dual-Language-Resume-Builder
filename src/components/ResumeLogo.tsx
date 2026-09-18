import React from 'react';

interface ResumeLogoProps {
  color?: string;
  className?: string;
}

export const ResumeLogo: React.FC<ResumeLogoProps> = ({
  color = '#2563eb',
  className = 'w-9 h-9',
}) => {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Modern stylized geometric mark from the resume photo */}
      <rect
        x="6"
        y="18"
        width="9"
        height="22"
        rx="4.5"
        transform="rotate(-32 6 18)"
        fill={color}
      />
      <rect
        x="18"
        y="12"
        width="9"
        height="24"
        rx="4.5"
        transform="rotate(-32 18 12)"
        fill={color}
        fillOpacity="0.85"
      />
      <rect
        x="30"
        y="8"
        width="9"
        height="24"
        rx="4.5"
        transform="rotate(-32 30 8)"
        fill={color}
        fillOpacity="0.5"
      />
    </svg>
  );
};
