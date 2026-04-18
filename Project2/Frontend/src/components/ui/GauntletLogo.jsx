import React from 'react';

/**
 * GauntletLogo — custom SVG brand mark for Gauntlet AI.
 * A shield silhouette with a bold "G" cut inside, rendered in amber.
 * 
 * Props:
 *   size   — px size of the SVG (default: 28)
 *   color  — primary accent hex/rgb string (default: amber)
 */
const GauntletLogo = ({ size = 28, color = 'rgb(245,158,11)' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Gauntlet AI logo"
    >
      {/* Shield outer silhouette */}
      <path
        d="M16 2L3 7.5V17C3 23.5 9 29 16 31C23 29 29 23.5 29 17V7.5L16 2Z"
        fill={color.replace('rgb', 'rgba').replace(')', ', 0.10)')}
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Decorative horizontal divider line — armored segments look */}
      <line
        x1="8" y1="14.5" x2="24" y2="14.5"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />

      {/* Bold angular G letterform inside the shield */}
      <path
        d="M21 10H16C14.343 10 13 11.343 13 13V19C13 20.657 14.343 22 16 22H21V17H17.5V19.5H16C15.172 19.5 14.5 18.828 14.5 18V14C14.5 13.172 15.172 12.5 16 12.5H21V10Z"
        fill={color}
      />
    </svg>
  );
};

export default GauntletLogo;
