import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { PageLayout } from '../components/layout/PageLayout';
import { FlavorProfile2, RoastLevel, FlavorProfile1 } from '../types';
import { STEP3_OPTIONS_BY_COMBINATION, FLAVOR2_DETAILS } from '../constants';
import { SelectionCircle } from '../components/core/SelectionCircle';
import { Button } from '../components/core/Button';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

const Step3DetailFlavorPage: React.FC = () => {
  const navigate = useNavigate();
  const { selections, setFlavor2 } = useSelections();

  React.useEffect(() => {
    if (!selections.roastLevel || !selections.flavor1) {
      navigate('/');
    }
  }, [selections.roastLevel, selections.flavor1, navigate]);

  if (!selections.roastLevel || !selections.flavor1) {
    return null;
  }

  // 현재 선택된 조합에 따른 사용 가능한 옵션 가져오기
  const combinationKey = `${selections.roastLevel}-${selections.flavor1}`;
  const availableOptions = STEP3_OPTIONS_BY_COMBINATION[combinationKey] || [];

  const handleSelectDetailFlavor = (flavor: FlavorProfile2) => {
    setFlavor2(flavor);
    navigate('/result');
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
            어떤 커피의 맛을 좋아하시나요?
          </h1>
          
          {/* Selection Circles */}
          <div className="flex flex-wrap justify-center 
                        gap-3 sm:gap-4 md:gap-5 lg:gap-6
                        p-3 sm:p-4
                        ">
            {availableOptions.map((flavor) => {
              const details = FLAVOR2_DETAILS[flavor];
              return (
                <SelectionCircle
                  key={flavor}
                  text={details.text}
                  colorClass={details.color}
                  onClick={() => handleSelectDetailFlavor(flavor)}
                  ariaLabel={`세부 향미 선택: ${flavor}`}
                />
              );
            })}
          </div>
          
          {/* Previous Button */}
          <div className="mt-6 lg:mt-8 text-center">
            <Button
              onClick={() => navigate('/step2')}
              variant="textual-navigation"
              size="md"
              aria-label="이전 단계로 이동"
              className="font-semibold"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
              이전 단계로
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Step3DetailFlavorPage;