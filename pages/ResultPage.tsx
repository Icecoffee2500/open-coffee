import * as React from 'react';
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

  const handleReturnHome = () => {
    resetSelections();
    navigate('/');
  };

  return (
    <PageLayout
    mainTitle=""
    secondaryTitle="당신이 좋아하는 커피의 취향은?"
    centerVertically={false}
  >
  <div className="flex flex-col md:flex-row justify-center items-center max-w-3xl mx-auto w-full bg-white h-96">
    {/* 좌측: 메인 커피 이름 */}
    <div className="flex-1 flex flex-col justify-center items-center h-full md:pr-24">  {/* md:pr-12 추가 */}
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900 text-center">
        {recommendedBean.name}
      </h1>
    </div>

    {/* 우측: 정보 (폰트 전체 키움) */}
    <div className="flex-1 flex flex-col justify-center items-center h-full md:border-l md:pl-24">
      <div className="mb-8 w-full text-center">
        <span className="font-bold text-xl underline block mb-2">Blending</span>
        <span className="text-lg sm:text-xl text-gray-700">{recommendedBean.blending || 'Peru'}</span>
      </div>
      <div className="mb-8 w-full text-center">
        <span className="font-bold text-xl underline block mb-2">Note</span>
        <span className="text-lg sm:text-xl text-gray-700 whitespace-pre-line">
          {recommendedBean.note || '데이지 꽃, 청사과, 캐러멜'}
        </span>
      </div>
    </div>
  </div>

    {/* 버튼 */}
    <div className="w-full mt-16 flex justify-center">
      <Button
        onClick={handleReturnHome}
        variant="textual-navigation"
        size="md"
        aria-label="처음으로 돌아가기"
        className="font-semibold"
      >
        <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        처음으로 돌아가기
      </Button>
    </div>
  </PageLayout>
  );
};

export default ResultPage;