import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { useSelections } from '../contexts/SelectionContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { resetSelections } = useSelections();

  const handleStart = () => {
    resetSelections();
    navigate('/step1');
  };

  const mainTitleContent = (
    <>
      <span className="block font-bold font-title
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl">오픈커피 로스터스</span>
      <span className="block font-bold font-title
                     text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                     mt-2 sm:mt-3 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">&lsquo;MY BLEND&rsquo; 서비스 오픈</span>
    </>
  );
  
  const descriptionContent = (
     <p className="text-center text-gray-700 leading-relaxed max-w-lg mx-auto
                  text-sm sm:text-base md:text-lg"> 
        오픈커피 로스터스의 원두로, <br />
        당신의 취향에 맞는 &lsquo;나만의 커피 블렌드&rsquo;를 만들어보세요.
      </p>
  );

  return (
    <PageLayout 
      mainTitle={mainTitleContent}
      description={descriptionContent}
      centerVertically={true}
      displayLogoInHeader={true} // Added to show logo on HomePage
    >
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 flex flex-col items-center space-y-6 sm:space-y-8"> {/* Responsive margin & spacing */}
        <Button 
          onClick={handleStart} 
          size="lg" // Button size prop will handle internal padding/text size responsiveness if Button component is updated
          variant="primary" 
          className="w-36 h-14 text-lg sm:w-40 sm:h-16 sm:text-xl md:w-48 md:h-18 font-semibold" // Responsive width, height, text
          aria-label="커피 추천 시작"
        >
          START
        </Button>
        <Link
          to="/admin"
          className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors" // Responsive text
          aria-label="관리자 페이지로 이동"
        >
          Admin Page
        </Link>
      </div>
    </PageLayout>
  );
};

export default HomePage;