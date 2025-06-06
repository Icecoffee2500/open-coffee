import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = 'font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 ease-in-out';
  
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500';
      break;
    case 'secondary': // Tinted blue, good for selections
      variantStyle = 'bg-sky-100 hover:bg-sky-200 text-sky-700 focus:ring-sky-300';
      break;
    case 'outline':
      variantStyle = 'border border-sky-500 text-sky-600 hover:bg-sky-50 focus:ring-sky-400';
      break;
    case 'neutral': // Gray button
      variantStyle = 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400';
      break;
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyle = 'px-5 py-2.5 text-base'; // Adjusted padding slightly
      break;
    case 'lg':
      sizeStyle = 'px-7 py-3.5 text-lg'; // Adjusted padding slightly
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};