import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};