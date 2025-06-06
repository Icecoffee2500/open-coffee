import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { Button } from '../components/core/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/core/Card';
import { FlavorProfile2, RoastLevel, FlavorProfile1 } from '../types';
import { STEP3_FLAVOR2_OPTIONS } from '../constants';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

const Step3DetailFlavorPage: React.FC = () => {
  const navigate = useNavigate();
  const { selections, setFlavor2 } = useSelections();

  React.useEffect(() => {
    // Redirect if the necessary previous selections are not made
    if (selections.roastLevel !== RoastLevel.Medium || selections.flavor1 !== FlavorProfile1.FPlusF) {
      navigate('/step1'); // Or '/step2' if more appropriate, but '/step1' ensures full flow
    }
  }, [selections, navigate]);
  
  // Render null if redirecting, to prevent brief flash of content
  if (selections.roastLevel !== RoastLevel.Medium || selections.flavor1 !== FlavorProfile1.FPlusF) {
    return null; 
  }

  const handleSelectDetailFlavor = (flavor: FlavorProfile2) => {
    setFlavor2(flavor);
    navigate('/result');
  };

  const getImageForFlavor2 = (flavor: FlavorProfile2) => {
    switch (flavor) {
      case FlavorProfile2.Infuse:
        return { src: "https://picsum.photos/seed/infusionprocess/150/150", alt: "Vibrant infusion process" };
      case FlavorProfile2.Balance:
        return { src: "https://picsum.photos/seed/balancedstones/150/150", alt: "Balanced stones symbolizing harmony" };
      default:
        return { src: "https://picsum.photos/seed/detailedflavor/150/150", alt: "Abstract detailed flavor" };
    }
  };

  return (
    <PageLayout
      title="당신이 좋아하는 커피의 취향은?"
      subtitle="Step 3: 어떤 커피의 향미를 더 선호하시나요?"
      centerVertically={true}
    >
      <Card>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8">
          {STEP3_FLAVOR2_OPTIONS.map((flavor) => {
            const image = getImageForFlavor2(flavor);
            return (
              <div key={flavor} className="flex flex-col items-center w-32 sm:w-36 text-center">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-28 h-28 object-cover rounded-xl mb-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleSelectDetailFlavor(flavor)}
                  aria-hidden="true"
                />
                <Button 
                  onClick={() => handleSelectDetailFlavor(flavor)}
                  variant="secondary"
                  size="md" // Adjusted button size
                  className="w-full flex justify-between items-center group"
                  aria-label={`Select detailed flavor: ${flavor}`}
                >
                  <span>{flavor}</span>
                  <ChevronRightIcon className="h-5 w-5 text-sky-600 group-hover:text-sky-700 transition-colors" />
                </Button>
              </div>
            );
          })}
        </div>
        <Button 
          onClick={() => navigate('/step2')} 
          variant="outline" 
          size="md" 
          className="mt-10 flex items-center justify-center mx-auto group" // Increased top margin
          aria-label="Go back to previous step"
        >
           <ArrowLeftIcon className="h-5 w-5 mr-2 text-sky-600 group-hover:text-sky-600 transition-colors" />
          이전 단계로
        </Button>
      </Card>
    </PageLayout>
  );
};

export default Step3DetailFlavorPage;