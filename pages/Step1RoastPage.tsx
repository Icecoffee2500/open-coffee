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
      mainTitle=""
      secondaryTitle="당신이 좋아하는 커피의 취향은?"
      centerVertically={false} 
    >
      <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-4 md:mt-0 lg:-mt-8">
        <div className="flex flex-col justify-center items-center min-h-[400px] lg:min-h-[500px]">
          {/* Main Title */}
          <h1 className="font-bold leading-tight font-title text-black text-center w-full
                       text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl
                       mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            어느 정도 로스팅된 커피를 좋아하시나요?
          </h1>
          
          {/* Selection Circles */}
          <div className="flex flex-wrap justify-center 
                        gap-3 sm:gap-4 md:gap-5 lg:gap-6
                        p-3 sm:p-4
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
          
          {/* Bottom Spacer */}
          <div className="mt-6 lg:mt-8 text-center">
            <div className="h-10 sm:h-11 md:h-12" aria-hidden="true" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Step1RoastPage;