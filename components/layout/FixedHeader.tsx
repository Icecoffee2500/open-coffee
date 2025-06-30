// import React from 'react';
import * as React from 'react';
import logo from '../../src/assets/logo.svg';

interface FixedHeaderProps {
  title?: string; 
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center">
      {/* Apply text color to the SVG via className if needed, e.g., text-black */}
      <img src={logo} alt="로고" className="h-5 w-auto sm:h-6 md:h-7 mr-4" />
      {/* This h2 styling matches the original secondaryTitle styling */}
      {title && (
        <h2 className="text-lg sm:text-xl text-gray-700 font-semibold min-w-0">
          {title}
        </h2>
      )}
    </div>
  );
};