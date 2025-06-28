import React from 'react';

interface SelectionCircleProps {
  text: string;
  colorClass: string; // Tailwind background color class e.g., 'bg-[#D9BFA9]'
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export const SelectionCircle: React.FC<SelectionCircleProps> = ({
  text,
  colorClass,
  onClick,
  ariaLabel,
  className = '',
}) => {
  const sizeClasses = "w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-52 xl:h-52"; // Responsive sizes

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        ${sizeClasses}
        ${colorClass}
        rounded-full
        flex items-center justify-center
        text-white text-center font-medium
        text-base sm:text-lg md:text-xl lg:text-2xl /* Responsive text size - increased for better readability */
        p-2 sm:p-3 md:p-4 /* Responsive padding */
        cursor-pointer
        transition-transform duration-150 ease-in-out
        hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        whitespace-pre-line
        leading-tight sm:leading-snug 
        shadow-lg
        ${className}
      `}
    >
      {text}
    </button>
  );
};