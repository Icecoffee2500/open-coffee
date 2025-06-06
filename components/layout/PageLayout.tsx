import React from 'react';
import { APP_TITLE } from '../../constants';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  centerVertically?: boolean; // New prop for conditional vertical centering
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children, centerVertically = false }) => {
  const mainContentClasses = `
    flex-grow w-full max-w-2xl text-center 
    mt-20 sm:mt-24 px-2 pb-16 sm:pb-20
    ${centerVertically ? 'flex flex-col justify-center' : ''}
  `;

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-10">
        <Link to="/" className="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-sky-600 transition-colors">
          {APP_TITLE}
        </Link>
        <nav>
          <Link 
            to="/admin" 
            className="text-gray-600 hover:text-sky-700 font-normal mr-2 sm:mr-4 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
            aria-label="Admin Page"
          >
            Admin
          </Link>
        </nav>
      </header>
      
      <main className={mainContentClasses.trim()}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">{title}</h1>
        {subtitle && <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12">{subtitle}</p>}
        {children}
      </main>
      
      <footer className="w-full p-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {APP_TITLE}. All rights reserved.
      </footer>
    </div>
  );
};