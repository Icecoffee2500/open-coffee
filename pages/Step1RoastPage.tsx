import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { Button } from '../components/core/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/core/Card';
import { RoastLevel } from '../types';
import { STEP1_ROAST_OPTIONS } from '../constants';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';

const Step1RoastPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRoastLevel } = useSelections();

  const handleSelectRoast = (roast: RoastLevel) => {
    setRoastLevel(roast);
    navigate('/step2');
  };

  const getImageForRoast = (roast: RoastLevel) => {
    switch (roast) {
      case RoastLevel.MediumLight:
        return { src: "https://picsum.photos/seed/mediumlightroast/150/150", alt: "Medium Light Roast Beans" };
      case RoastLevel.Medium:
        return { src: "https://picsum.photos/seed/mediumroastbeans/150/150", alt: "Medium Roast Beans" };
      case RoastLevel.City:
        return { src: "https://picsum.photos/seed/cityroastbeans/150/150", alt: "City Roast Beans" };
      default:
        return { src: "https://picsum.photos/seed/coffeecup/150/150", alt: "Coffee beans" };
    }
  };

  return (
    <PageLayout 
      title="당신이 좋아하는 커피의 취향은?"
      subtitle="Step 1: 어느 정도 로스팅된 커피를 좋아하시나요?"
      centerVertically={true}
    >
      <Card>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8">
          {STEP1_ROAST_OPTIONS.map((roast) => {
            const image = getImageForRoast(roast);
            return (
              <div key={roast} className="flex flex-col items-center w-32 sm:w-36 text-center">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-28 h-28 object-cover rounded-xl mb-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleSelectRoast(roast)}
                  aria-hidden="true" // Image is decorative as button has label
                />
                <Button 
                  onClick={() => handleSelectRoast(roast)}
                  variant="secondary"
                  size="md" // Adjusted button size
                  className="w-full flex justify-between items-center group"
                  aria-label={`Select roast level: ${roast}`}
                >
                  <span>{roast}</span>
                  <ChevronRightIcon className="h-5 w-5 text-sky-600 group-hover:text-sky-700 transition-colors" />
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </PageLayout>
  );
};

export default Step1RoastPage;