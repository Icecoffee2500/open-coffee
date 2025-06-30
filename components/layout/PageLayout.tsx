import * as React from 'react';
import { Link } from 'react-router-dom';
import { FixedHeader } from './FixedHeader'; // Import the new FixedHeader component

interface PageLayoutProps {
  mainTitle: React.ReactNode;
  children?: React.ReactNode;
  description?: React.ReactNode;
  centerVertically?: boolean;
  secondaryTitle?: string;
  showAdminHomeButton?: boolean;
  displayLogoInHeader?: boolean; // New prop
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  mainTitle,
  description,
  children,
  centerVertically = false,
  secondaryTitle,
  showAdminHomeButton = false,
  displayLogoInHeader = false, // Default new prop
}) => {
  const isAdminLayout = showAdminHomeButton && !secondaryTitle && !displayLogoInHeader;

  return (
    <div
      className={`
        min-h-screen bg-white text-black flex flex-col items-center
        ${isAdminLayout ? 'pt-8 sm:pt-10 md:pt-12' : 'pt-20 sm:pt-24 md:pt-28'}
      `}
    >
      {/* Main content block shell */}
      <div
        className={`
          w-full max-w-3xl lg:max-w-4xl mx-auto /* Adjusted max-width for larger screens */
          pb-10 sm:pb-12 md:pb-16 lg:pb-20 /* Responsive bottom padding */
          flex flex-col flex-grow 
        `}
      >
        {/* Top Bar for Admin Home Button & Secondary Title / FixedHeader */}
        {(showAdminHomeButton || secondaryTitle || displayLogoInHeader) && (
          <div className="w-full flex justify-between items-center 
                        mb-6 sm:mb-8 md:mb-10 lg:mb-12 /* Responsive bottom margin */
                        px-3 sm:px-4 md:px-6 lg:px-8"> {/* Consistent horizontal padding */}
            {(secondaryTitle || displayLogoInHeader) ? (
              <FixedHeader title={secondaryTitle} /> // Pass secondaryTitle; FixedHeader handles if it's undefined
            ) : <div />} {/* Placeholder for justify-between */}
            {showAdminHomeButton && (
              <Link
                to="/"
                className="text-xs sm:text-sm md:text-base font-medium text-gray-600 hover:text-black transition-colors 
                           px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-gray-100 flex-shrink-0" 
                aria-label="홈 페이지로 이동"
              >
                Home
              </Link>
            )}
          </div>
        )}
        
        {/* Inner container for main content: this part handles vertical centering if enabled and main horizontal padding */}
        <div 
          className={`
            w-full flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-8 /* Responsive horizontal padding */
            ${centerVertically ? 'flex-grow' : ''}
          `}
        >
          {centerVertically ? (
            // 수직 중앙 정렬을 위한 새로운 구조
            <div className="flex-grow flex flex-col justify-center w-full">
              {/* Main Title */}
              {typeof mainTitle === 'string' ? (
                <h1 className={`
                  font-bold leading-tight font-title text-black text-center w-full
                  text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl /* Adjusted responsive font size */
                  mb-6 sm:mb-8 md:mb-10 lg:mb-12 /* Reduced margin for better vertical centering */
                `}>
                  {mainTitle}
                </h1>
              ) : (
                <div className="text-center w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12"> {/* Responsive bottom margin */}
                  {mainTitle}
                </div>
              )}

              {/* Description */}
              {description && (
                <div className="text-gray-700 w-full max-w-2xl mx-auto
                              mb-6 sm:mb-8 md:mb-10 lg:mb-12 /* Responsive bottom margin */
                              text-sm sm:text-base md:text-lg lg:text-xl /* Responsive font size */
                              ">
                  {typeof description === 'string' ? (
                    <p className="text-center leading-relaxed">{description}</p>
                  ) : (
                    description
                  )}
                </div>
              )}

              {/* Children (e.g., selection circles, buttons) */}
              {children && (
                <div className="w-full flex flex-col items-center">
                  {children}
                </div>
              )}
            </div>
          ) : (
            // 기본 레이아웃 (수직 중앙 정렬 없음)
            <>
              {/* Main Title */}
              {typeof mainTitle === 'string' ? (
                <h1 className={`
                  font-bold leading-tight font-title text-black text-center w-full
                  text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl /* Adjusted responsive font size */
                  mb-8 sm:mb-10 md:mb-12 lg:mb-16 /* Responsive bottom margin */
                `}>
                  {mainTitle}
                </h1>
              ) : (
                <div className="text-center w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12"> {/* Responsive bottom margin */}
                  {mainTitle}
                </div>
              )}

              {/* Description */}
              {description && (
                <div className="text-gray-700 w-full max-w-2xl mx-auto
                              mb-6 sm:mb-8 md:mb-10 lg:mb-12 /* Responsive bottom margin */
                              text-sm sm:text-base md:text-lg lg:text-xl /* Responsive font size */
                              ">
                  {typeof description === 'string' ? (
                    <p className="text-center leading-relaxed">{description}</p>
                  ) : (
                    description
                  )}
                </div>
              )}

              {/* Children (e.g., selection circles, buttons) */}
              {children && (
                <div className="w-full flex flex-col items-center">
                  {children}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};