import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'neutral' | 'textual-navigation';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = 'font-medium focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 ease-in-out inline-flex items-center justify-center';
  
  let variantStyle = '';
  switch (variant) {
    case 'primary': 
      variantStyle = 'bg-black hover:bg-gray-800 text-white focus:ring-gray-500 rounded-none';
      break;
    case 'secondary': 
      variantStyle = 'bg-sky-100 hover:bg-sky-200 text-sky-700 focus:ring-sky-300 rounded-xl';
      break;
    case 'outline':
      variantStyle = 'border border-sky-500 text-sky-600 hover:bg-sky-50 focus:ring-sky-400 rounded-xl';
      break;
    case 'neutral': 
      variantStyle = 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400 rounded-xl';
      break;
    case 'textual-navigation':
      variantStyle = 'text-gray-600 hover:text-black focus:ring-gray-500 rounded-md';
      break;
  }

  let sizeStyle = '';
  switch (size) {
    case 'sm':
      sizeStyle = 'px-3 py-1.5 text-sm'; 
      break;
    case 'md':
      sizeStyle = 'px-6 py-3 text-base'; 
      if (variant === 'textual-navigation') sizeStyle = 'px-4 py-2 text-xs sm:text-sm md:text-base'; // Made responsive
      break;
    case 'lg':
      sizeStyle = 'px-8 py-4 text-lg';
      if (variant === 'textual-navigation') sizeStyle = 'px-5 py-2.5 text-sm sm:text-base md:text-lg'; // Made responsive
      break;
  }
  
  // Note: The specific override for textual-navigation size 'md' was merged into the switch case above.

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};