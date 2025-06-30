import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { PageLayout } from '../components/layout/PageLayout';
import { RoastLevel } from '../types';
import { STEP1_ROAST_OPTIONS, ROAST_DETAILS } from '../constants';
import { SelectionCircle } from '../components/core/SelectionCircle';

const Step1RoastPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRoastLevel } = useSelections();

  const handleSelectRoast = (roast: RoastLevel) => {
    setRoastLevel(roast);
    navigate('/step2');
  };

  return (
    <PageLayout 
      mainTitle="어느 정도 로스팅된 커피를 좋아하시나요?"
      secondaryTitle="당신이 좋아하는 커피의 취향은?"
      centerVertically={true} 
    >
      <div className="flex flex-wrap justify-center 
                    gap-3 sm:gap-4 md:gap-5 lg:gap-6 /* Responsive gap */
                    p-3 sm:p-4 /* Responsive padding for hover effect space */
                    ">
        {STEP1_ROAST_OPTIONS.map((roast) => {
          const details = ROAST_DETAILS[roast];
          return (
            <SelectionCircle
              key={roast}
              text={details.text}
              colorClass={details.color}
              onClick={() => handleSelectRoast(roast)}
              ariaLabel={`로스팅 단계 선택: ${roast}`}
            />
          );
        })}
      </div>
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 text-center">
        {/* 빈 공간 - Step2, Step3의 "이전 단계로" 버튼과 동일한 높이 확보 */}
        <div className="h-10 sm:h-11 md:h-12" aria-hidden="true" />
      </div>
    </PageLayout>
  );
};

export default Step1RoastPage;