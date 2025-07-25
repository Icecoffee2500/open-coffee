import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelections } from '../contexts/SelectionContext';
import { PageLayout } from '../components/layout/PageLayout';
import { RecommendationRule } from '../types';
import { useRecommendation } from '../hooks/useRecommendation';
import { Button } from '../components/core/Button';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

// 이미지 imports
import cottageImg from '../src/assets/cottage.png';
import citrusImg from '../src/assets/citrus.png';
import sunsetImg from '../src/assets/sunset.png';
import raspberryImg from '../src/assets/raspberry.png';
import limeGreenImg from '../src/assets/lime_green.png';
import 피서Img from '../src/assets/피서.png';

interface ResultPageProps {
  recommendationRules: RecommendationRule[];
}

const ResultPage: React.FC<ResultPageProps> = ({ recommendationRules }) => {
  const navigate = useNavigate();
  const { selections, resetSelections } = useSelections(); 
  
  const recommendedBean = useRecommendation(selections, recommendationRules);

  React.useEffect(() => {
    if (!selections.roastLevel || !selections.flavor1) {
      navigate('/');
    }
    if (!recommendedBean && (selections.roastLevel && selections.flavor1)) {
        const timer = setTimeout(() => {
            resetSelections(); 
            navigate('/');
        }, 50); 
        return () => clearTimeout(timer);
    }

  }, [selections, navigate, recommendedBean, resetSelections]);

  if (!recommendedBean) {
    return (
        <PageLayout 
          mainTitle="결과를 찾는 중..." 
          secondaryTitle="당신이 좋아하는 커피의 취향은?"
          centerVertically={true}
        >
            <p className="text-gray-600 text-base sm:text-lg text-center">잠시만 기다려주세요. 선택하신 내용으로 커피를 찾고 있습니다.</p>
        </PageLayout>
    );
  }

  // 특별한 레이아웃이 필요한 이름들과 해당 이미지 매핑
  const specialLayoutNames = ['COTTAGE', 'CITRUS', 'SUNSET', 'Raspberry', 'LIME GREEN', '피서'];
  const imageMap: Record<string, string> = {
    'COTTAGE': cottageImg,
    'CITRUS': citrusImg,
    'SUNSET': sunsetImg,
    'Raspberry': raspberryImg,
    'LIME GREEN': limeGreenImg,
    '피서': 피서Img,
  };

  const isSpecialLayout = specialLayoutNames.includes(recommendedBean.name);
  const currentImage = imageMap[recommendedBean.name];

  const handleReturnHome = () => {
    resetSelections();
    navigate('/');
  };

  // 특별한 레이아웃인 경우
  if (isSpecialLayout && currentImage) {
    return (
      <PageLayout 
        mainTitle=""
        secondaryTitle="당신이 좋아하는 커피의 취향은?"
        centerVertically={false}
      >
        <div className="w-full max-w-6xl mx-auto mt-0 sm:mt-0 md:-mt-8 lg:-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[400px] lg:min-h-[500px]">
            {/* 이미지 섹션 */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] relative">
                <img 
                  src={currentImage} 
                  alt={recommendedBean.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* 텍스트 섹션 */}
            <div className="flex flex-col justify-center order-1 lg:order-2 w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 lg:mb-6 w-full text-center">
                {recommendedBean.name}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 lg:mb-8 w-full text-center">
                {recommendedBean.result}
              </h2>
              <div className="w-full flex justify-center mb-6 lg:mb-8">
                <hr className="border-t-2 border-gray-400 w-24 sm:w-32 md:w-40 lg:w-48" />
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed whitespace-pre-line mb-6 w-full text-center">
                {recommendedBean.note}
              </p>
              <div className="w-full text-center mb-8">
                <p className="text-xs sm:text-sm text-gray-600">
                  {recommendedBean.ratio === "10" 
                    ? `100g 가격: ${recommendedBean.weight100g}원`
                    : `비율 ${recommendedBean.ratio} | 100g 가격: ${recommendedBean.weight100g}원`
                  }
                </p>
              </div>
            </div>
          </div>
          
          {/* 하단 버튼 */}
          <div className="mt-6 lg:mt-8 text-center">
            <Button
              onClick={handleReturnHome}
              variant="textual-navigation"
              size="md"
              aria-label="처음으로 돌아가기"
              className="font-semibold"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
              처음으로 돌아가기
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // 기본 레이아웃 (기존 코드)
  const mainTitleContent = (
    <span className="block font-bold font-title leading-tight text-center whitespace-nowrap
                   text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"> {/* Responsive font size */}
      {recommendedBean.name || recommendedBean.result}
    </span>
  );

  const descriptionContent = (
    <>
      <p className="text-gray-700 font-subtitle text-center
                   text-lg sm:text-xl md:text-2xl lg:text-3xl /* Responsive font size */
                   mt-1 sm:mt-2 mb-4 sm:mb-6 md:mb-8"> {/* Responsive margins */}
        {recommendedBean.result}
      </p>
      <hr className="border-t border-gray-400 mx-auto 
                   w-24 sm:w-28 md:w-32 lg:w-40 /* Responsive width */
                   mb-4 sm:mb-6 md:mb-8" /> {/* Responsive margin */}
      <p className="text-gray-700 whitespace-pre-line text-center
                   text-sm sm:text-base md:text-lg lg:text-xl /* Responsive font size */
                   leading-relaxed sm:leading-loose">
        {recommendedBean.note}
      </p>
      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">
          {recommendedBean.ratio === "10" 
            ? `100g 가격: ${recommendedBean.weight100g}원`
            : `비율 ${recommendedBean.ratio} | 100g 가격: ${recommendedBean.weight100g}원`
          }
        </p>
      </div>
    </>
  );

  return (
    <PageLayout 
      mainTitle=""
      description=""
      secondaryTitle="당신이 좋아하는 커피의 취향은?"
      centerVertically={false} 
    >
      <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-4 md:mt-0 lg:-mt-8">
        <div className="flex flex-col justify-center items-center min-h-[400px] lg:min-h-[500px]">
          {/* Main Title */}
          <div className="text-center w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <span className="block font-bold font-title leading-tight text-center whitespace-nowrap
                           text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {recommendedBean.name || recommendedBean.result}
            </span>
          </div>
          
          {/* Description Content */}
          <div className="text-gray-700 w-full max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-sm sm:text-base md:text-lg lg:text-xl">
            <p className="text-gray-700 font-subtitle text-center
                         text-lg sm:text-xl md:text-2xl lg:text-3xl
                         mt-1 sm:mt-2 mb-4 sm:mb-6 md:mb-8">
              {recommendedBean.result}
            </p>
            <hr className="border-t border-gray-400 mx-auto 
                         w-24 sm:w-28 md:w-32 lg:w-40
                         mb-4 sm:mb-6 md:mb-8" />
            <p className="text-gray-700 whitespace-pre-line text-center
                         text-sm sm:text-base md:text-lg lg:text-xl
                         leading-relaxed sm:leading-loose">
              {recommendedBean.note}
            </p>
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                {recommendedBean.ratio === "10" 
                  ? `100g 가격: ${recommendedBean.weight100g}원`
                  : `비율 ${recommendedBean.ratio} | 100g 가격: ${recommendedBean.weight100g}원`
                }
              </p>
            </div>
          </div>
          
          {/* Return Button */}
          <div className="mt-6 lg:mt-8 text-center">
            <Button
              onClick={handleReturnHome}
              variant="textual-navigation"
              size="md"
              aria-label="처음으로 돌아가기"
              className="font-semibold"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
              처음으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResultPage;
