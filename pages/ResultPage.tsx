import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { PageLayout } from '../components/layout/PageLayout';
import { RecommendationRule } from '../types';
import { useRecommendation } from '../hooks/useRecommendation';
import { Button } from '../components/core/Button';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

interface ResultPageProps {
  recommendationRules: RecommendationRule[];
}

const ResultPage: React.FC<ResultPageProps> = ({ recommendationRules }) => {
  const navigate = useNavigate();
  const { selections, resetSelections } = useSelections(); 
  
  const recommendedBean = useRecommendation(selections, recommendationRules);

  React.useEffect(() => {
    if (!selections.roastLevel || !selections.flavor1) {
      navigate('/');
    }
    if (!recommendedBean && (selections.roastLevel && selections.flavor1)) {
        const timer = setTimeout(() => {
            resetSelections(); 
            navigate('/');
        }, 50); 
        return () => clearTimeout(timer);
    }

  }, [selections, navigate, recommendedBean, resetSelections]);

  if (!recommendedBean) {
    return (
        <PageLayout 
          mainTitle="결과를 찾는 중..." 
          secondaryTitle="당신이 좋아하는 커피의 취향은?"
          centerVertically={true}
        >
            <p className="text-gray-600 text-base sm:text-lg text-center">잠시만 기다려주세요. 선택하신 내용으로 커피를 찾고 있습니다.</p>
        </PageLayout>
    );
  }
  
  const mainTitleContent = (
    <span className="block font-bold font-title leading-tight text-center whitespace-nowrap
                   text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"> {/* Responsive font size */}
      {recommendedBean.beanName}
    </span>
  );

  const descriptionContent = (
    <>
      <p className="text-gray-700 font-subtitle text-center
                   text-lg sm:text-xl md:text-2xl lg:text-3xl /* Responsive font size */
                   mt-1 sm:mt-2 mb-4 sm:mb-6 md:mb-8"> {/* Responsive margins */}
        {recommendedBean.beanNameEn}
      </p>
      <hr className="border-t border-gray-400 mx-auto 
                   w-24 sm:w-28 md:w-32 lg:w-40 /* Responsive width */
                   mb-4 sm:mb-6 md:mb-8" /> {/* Responsive margin */}
      <p className="text-gray-700 whitespace-pre-line text-center
                   text-sm sm:text-base md:text-lg lg:text-xl /* Responsive font size */
                   leading-relaxed sm:leading-loose">
        {recommendedBean.description}
      </p>
    </>
  );

  const handleReturnHome = () => {
    resetSelections();
    navigate('/');
  };

  return (
    <PageLayout 
      mainTitle={mainTitleContent}
      description={descriptionContent}
      secondaryTitle="당신이 좋아하는 커피의 취향은?"
      centerVertically={true} 
    >
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-center"> {/* Responsive margin */}
        <Button
          onClick={handleReturnHome}
          variant="textual-navigation"
          size="md"
          aria-label="처음으로 돌아가기"
          className="font-semibold"
        >
          <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" /> {/* Responsive icon size & margin */}
          처음으로 돌아가기
        </Button>
      </div>
    </PageLayout>
  );
};

export default ResultPage;