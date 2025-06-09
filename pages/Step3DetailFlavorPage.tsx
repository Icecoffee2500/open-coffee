import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { PageLayout } from '../components/layout/PageLayout';
import { FlavorProfile2, RoastLevel, FlavorProfile1 } from '../types';
import { STEP3_FLAVOR2_OPTIONS, FLAVOR2_DETAILS } from '../constants';
import { SelectionCircle } from '../components/core/SelectionCircle';
import { Button } from '../components/core/Button';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

const Step3DetailFlavorPage: React.FC = () => {
  const navigate = useNavigate();
  const { selections, setFlavor2 } = useSelections();

  React.useEffect(() => {
    if (selections.roastLevel !== RoastLevel.Medium || selections.flavor1 !== FlavorProfile1.FPlusF) {
      navigate('/'); 
    }
  }, [selections, navigate]);
  
  if (selections.roastLevel !== RoastLevel.Medium || selections.flavor1 !== FlavorProfile1.FPlusF) {
    return null; 
  }

  const handleSelectDetailFlavor = (flavor: FlavorProfile2) => {
    setFlavor2(flavor);
    navigate('/result');
  };

  return (
    <PageLayout
      mainTitle="어떤 커피의 향미를 좋아하시나요?"
      secondaryTitle="당신이 좋아하는 커피의 취향은?"
      centerVertically={true}
    >
      <div className="flex flex-wrap justify-center 
                    gap-3 sm:gap-4 md:gap-5 lg:gap-6 /* Responsive gap */
                    p-3 sm:p-4 /* Responsive padding for hover effect space */
                    ">
        {STEP3_FLAVOR2_OPTIONS.map((flavor) => {
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
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-18 text-center"> {/* Responsive margin */}
        <Button
          onClick={() => navigate('/step2')}
          variant="textual-navigation"
          size="md"
          aria-label="이전 단계로 이동"
          className="font-semibold"
        >
          <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" /> {/* Responsive icon size & margin */}
          이전 단계로
        </Button>
      </div>
    </PageLayout>
  );
};

export default Step3DetailFlavorPage;