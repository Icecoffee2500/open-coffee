import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { Button } from '../components/core/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/core/Card';
import { RoastLevel, FlavorProfile1 } from '../types';
import { STEP2_FLAVOR1_OPTIONS } from '../constants';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
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
    if (selections.roastLevel === RoastLevel.Medium && flavor === FlavorProfile1.FPlusF) {
      navigate('/step3');
    } else {
      navigate('/result');
    }
  };

  const getImageForFlavor1 = (flavor: FlavorProfile1) => {
    switch (flavor) {
      case FlavorProfile1.Nut:
        return { src: "https://picsum.photos/seed/nutsassortment/150/150", alt: "Assortment of nuts" };
      case FlavorProfile1.DarkChoco:
        return { src: "https://picsum.photos/seed/darkchocolatepieces/150/150", alt: "Pieces of dark chocolate" };
      case FlavorProfile1.Flower:
        return { src: "https://picsum.photos/seed/flowerblossom/150/150", alt: "Flower blossom" };
      case FlavorProfile1.Fruit:
        return { src: "https://picsum.photos/seed/mixedfruits/150/150", alt: "Mixed fruits" };
      case FlavorProfile1.MilkChoco:
        return { src: "https://picsum.photos/seed/milkchocolatebar/150/150", alt: "Milk chocolate bar" };
      case FlavorProfile1.FPlusF:
        return { src: "https://picsum.photos/seed/floralfruityblend/150/150", alt: "Floral and fruity blend" };
      default:
        return { src: "https://picsum.photos/seed/flavorabstract/150/150", alt: "Abstract flavor representation" };
    }
  };

  return (
    <PageLayout
      title="당신이 좋아하는 커피의 취향은?"
      subtitle="Step 2: 어떤 커피의 향미를 좋아하시나요?"
      centerVertically={true}
    >
      <Card>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8">
          {currentFlavorOptions.map((flavor) => {
            const image = getImageForFlavor1(flavor);
            return (
              <div key={flavor} className="flex flex-col items-center w-32 sm:w-36 text-center">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-28 h-28 object-cover rounded-xl mb-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleSelectFlavor(flavor)}
                  aria-hidden="true"
                />
                <Button 
                  onClick={() => handleSelectFlavor(flavor)}
                  variant="secondary"
                  size="md" // Adjusted button size
                  className="w-full flex justify-between items-center group"
                  aria-label={`Select flavor: ${flavor}`}
                >
                  <span>{flavor}</span>
                  <ChevronRightIcon className="h-5 w-5 text-sky-600 group-hover:text-sky-700 transition-colors" />
                </Button>
              </div>
            );
          })}
        </div>
        <Button 
          onClick={() => navigate('/step1')} 
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

export default Step2FlavorPage;