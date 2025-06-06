import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/core/Card';
import { useSelections } from '../contexts/SelectionContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { resetSelections } = useSelections();

  const handleStart = () => {
    resetSelections();
    navigate('/step1');
  }

  return (
    <PageLayout 
      title="오픈커피 로스터스 커스텀 블렌딩 서비스" 
      subtitle="당신만의 완벽한 커피를 찾아보세요."
      centerVertically={true}
    >
      <Card className="max-w-md mx-auto">
        <img src="https://picsum.photos/400/200?random=1" alt="Assortment of coffee beans and cups" className="rounded-lg mb-6 w-full object-cover h-48" />
        <p className="text-gray-700 mb-8 text-base sm:text-lg">
          몇 가지 간단한 질문에 답하고 당신의 취향에 꼭 맞는 스페셜티 커피 원두를 추천받으세요.
        </p>
        <Button onClick={handleStart} size="lg" variant="primary" className="w-full sm:w-auto">
          나만의 커피 찾기 시작!
        </Button>
      </Card>
    </PageLayout>
  );
};

export default HomePage;