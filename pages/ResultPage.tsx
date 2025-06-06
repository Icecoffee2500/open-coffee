import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { Button } from '../components/core/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/core/Card';
import { RecommendationRule } from '../types';
import { useRecommendation } from '../hooks/useRecommendation';
import { GiftIcon } from '../components/icons/GiftIcon';
import { RefreshIcon } from '../components/icons/RefreshIcon';

interface ResultPageProps {
  recommendationRules: RecommendationRule[];
}

const ResultPage: React.FC<ResultPageProps> = ({ recommendationRules }) => {
  const navigate = useNavigate();
  const { selections, resetSelections } = useSelections();
  
  const recommendedBean = useRecommendation(selections, recommendationRules);

  const handleStartOver = () => {
    resetSelections();
    navigate('/');
  };

  React.useEffect(() => {
    if (!selections.roastLevel || !selections.flavor1) {
      navigate('/');
    }
  }, [selections, navigate]);

  if (!selections.roastLevel || !selections.flavor1) {
     return null;
  }

  return (
    <PageLayout 
      title="당신을 위한 추천 커피" 
      subtitle="당신의 취향에 맞는 완벽한 원두를 찾았어요!"
      centerVertically={true}
    >
      <Card className="max-w-md mx-auto">
        <img 
            src={`https://picsum.photos/seed/${recommendedBean?.beanName.replace(/[^a-zA-Z0-9]/g, '-') || 'default'}/400/200`} 
            alt={recommendedBean ? `Recommended coffee: ${recommendedBean.beanName}` : "Coffee cup illustration"}
            className="rounded-lg mb-6 w-full object-cover h-48" 
        />
        {recommendedBean ? (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-lg text-gray-800 mb-2 font-semibold">선택하신 조건:</p>
              <ul className="text-gray-700 space-y-1">
                <li><span className="font-medium">로스팅:</span> {selections.roastLevel}</li>
                <li><span className="font-medium">주요 향미:</span> {selections.flavor1}</li>
                {selections.flavor2 && <li><span className="font-medium">세부 향미:</span> {selections.flavor2}</li>}
              </ul>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">추천 원두는 바로...</p>
              <div className="flex items-center justify-center text-sky-600 mb-2">
                <GiftIcon className="h-10 w-10 mr-3 text-sky-500" />
                <p className="text-4xl sm:text-5xl font-bold">
                  {recommendedBean.beanName}
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-8 text-sm">
              이 원두는 당신의 섬세한 취향을 만족시킬 특별한 경험을 선사할 것입니다. 즐거운 커피 생활 되세요!
            </p>
          </>
        ) : (
          <>
            <p className="text-xl text-red-500 mb-4 font-semibold">
              죄송합니다!
            </p>
            <p className="text-gray-700 mb-6">
             현재 선택하신 조합에 맞는 원두를 찾을 수 없습니다. 다른 옵션으로 다시 시도해보시는 건 어떨까요?
            </p>
          </>
        )}
        <Button 
          onClick={handleStartOver} 
          variant="primary"
          size="lg" 
          className="w-full sm:w-auto flex items-center justify-center group"
          aria-label="Start over the recommendation process"
        >
          <RefreshIcon className="h-5 w-5 mr-2 text-white transition-colors" />
          처음부터 다시하기
        </Button>
      </Card>
    </PageLayout>
  );
};

export default ResultPage;