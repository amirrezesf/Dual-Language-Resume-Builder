import React from 'react';
import { SkillBadgeStyle } from '../../types';

interface SkillBadgeProps {
  skill: string;
  accentColor: string;
  style?: SkillBadgeStyle;
  size?: 'sm' | 'md' | 'xs';
  showDot?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  accentColor,
  style = 'tinted',
  size = 'md',
  showDot = true,
}) => {
  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5 gap-1 rounded',
    sm: 'text-[9.5px] px-2 py-0.5 gap-1 rounded-md',
    md: 'text-[10px] px-2.5 py-0.5 gap-1.5 rounded-md',
  }[size];

  const dotSize = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-1.5 h-1.5',
  }[size];

  let containerStyle: React.CSSProperties = {};
  let dotStyle: React.CSSProperties = {};
  let borderClass = 'border';

  if (style === 'outlined') {
    containerStyle = {
      backgroundColor: '#ffffff',
      borderColor: `${accentColor}45`,
      color: '#0f172a',
    };
    dotStyle = { backgroundColor: accentColor };
  } else if (style === 'neutral') {
    containerStyle = {
      backgroundColor: '#f1f5f9',
      borderColor: '#e2e8f0',
      color: '#1e293b',
    };
    dotStyle = { backgroundColor: '#64748b' };
  } else {
    // default 'tinted'
    containerStyle = {
      backgroundColor: `${accentColor}0F`,
      borderColor: `${accentColor}30`,
      color: '#0f172a',
    };
    dotStyle = { backgroundColor: accentColor };
  }

  return (
    <span
      className={`inline-flex items-center font-semibold tracking-tight shadow-2xs transition-colors shrink-0 ${sizeClasses} ${borderClass}`}
      style={containerStyle}
    >
      {showDot && (
        <span
          className={`rounded-full shrink-0 ${dotSize}`}
          style={dotStyle}
          aria-hidden="true"
        />
      )}
      <span className="leading-tight">{skill}</span>
    </span>
  );
};
