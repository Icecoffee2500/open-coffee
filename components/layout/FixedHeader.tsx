import React from 'react';

// Logo resembling the provided image
// It uses currentColor, so text color utilities (e.g., text-black) will define its color.
const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 58 40" // Aspect ratio roughly matches the visual distinctiveness of the logo
    xmlns="http://www.w3.org/2000/svg" 
    {...props}
    aria-hidden="true"
    focusable="false"
  >
    {/* Left filled C-like shape */}
    <path 
      d="M20 2C10.059 2 2 10.059 2 20s8.059 18 18 18c4.971 0 9.471-2.015 12.729-5.271C28.31 30.31 25 25.562 25 20c0-5.563 3.31-10.31 8.729-12.729C29.471 4.015 24.971 2 20 2z" 
      fill="currentColor" 
    />
    {/* Right outlined C-like shape (achieved by subtracting a smaller C) */}
    <path 
      d="M38 2c-4.971 0-9.471 2.015-12.729 5.271C29.69 9.69 33 14.438 33 20c0 5.563-3.31 10.31-8.729 12.729C28.529 35.985 33.029 38 38 38c9.941 0 18-8.059 18-18S47.941 2 38 2zm0 5c7.18 0 13 5.82 13 13s-5.82 13-13 13c-2.761 0-5.301-.865-7.422-2.311C33.058 29.062 35 24.862 35 20c0-4.862-1.942-9.062-4.422-11.689C32.699 7.865 35.239 7 38 7z" 
      fill="currentColor" 
    />
  </svg>
);

interface FixedHeaderProps {
  title?: string; 
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center">
      {/* Apply text color to the SVG via className if needed, e.g., text-black */}
      <Logo className={`h-5 w-auto sm:h-6 md:h-7 text-black ${title ? 'mr-2 sm:mr-3' : ''}`} />
      {/* This h2 styling matches the original secondaryTitle styling */}
      {title && (
        <h2 className="text-2xl sm:text-3xl text-gray-700 font-semibold min-w-0">
          {title}
        </h2>
      )}
    </div>
  );
};