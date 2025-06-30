import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { PageLayout } from '../components/layout/PageLayout';
import { RoastLevel, FlavorProfile1 } from '../types';
import { STEP2_FLAVOR1_OPTIONS, FLAVOR1_DETAILS } from '../constants';
import { SelectionCircle } from '../components/core/SelectionCircle';
import { Button } from '../components/core/Button';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

const Step2FlavorPage: React.FC = () => {
  const navigate = useNavigate();
  const { selections, setFlavor1 } = useSelections();

  React.useEffect(() => {
    if (!selections.roastLevel) {
      navigate('/'); 
    }
  }, [selections.roastLevel, navigate]);

  if (!selections.roastLevel) {
    return null; 
  }

  const currentFlavorOptions = STEP2_FLAVOR1_OPTIONS[selections.roastLevel] || [];

  const handleSelectFlavor = (flavor: FlavorProfile1) => {
    setFlavor1(flavor);
    navigate('/step3');
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
            어떤 커피의 향미를 좋아하시나요?
          </h1>
          
          {/* Selection Circles */}
          <div className="flex flex-wrap justify-center 
                        gap-3 sm:gap-4 md:gap-5 lg:gap-6
                        p-3 sm:p-4
                        ">
            {currentFlavorOptions.map((flavor) => {
              const roastSpecificDetails = FLAVOR1_DETAILS[flavor]?.[selections.roastLevel!];
              const details = roastSpecificDetails || { text: FLAVOR1_DETAILS[flavor]?.defaultText || flavor, color: FLAVOR1_DETAILS[flavor]?.defaultColor || 'bg-gray-500' };
              
              return (
                <SelectionCircle
                  key={flavor}
                  text={details.text}
                  colorClass={details.color}
                  onClick={() => handleSelectFlavor(flavor)}
                  ariaLabel={`커피 향미 선택: ${flavor}`}
                />
              );
            })}
          </div>
          
          {/* Previous Button */}
          <div className="mt-6 lg:mt-8 text-center">
            <Button
              onClick={() => navigate('/step1')}
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

export default Step2FlavorPage;