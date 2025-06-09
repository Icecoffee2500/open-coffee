import { RoastLevel, FlavorProfile1, FlavorProfile2, RecommendationRule, Step2ButtonOptionsType, Step3ButtonOptionsType } from './types';

export const APP_TITLE = "오픈커피 로스터스";

export const INITIAL_RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    id: 'city-darkchoco', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.DarkChoco,
    beanName: "오픈 블렌드", beanNameEn: "Open Blend",
    description: "고소하고 안정된 커피 한잔\n중강배전"
  },
  {
    id: 'city-nut', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.Nut,
    beanName: "Cottage", beanNameEn: "오픈 + 코스타리카",
    description: "고소한 아몬드와 헤이즐넛의 너티한 풍미,\n깔끔하게 마무리되는 균형감 있는 맛"
  },
  {
    id: 'ml-nut', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Nut,
    beanName: "코스타리카 로스 기라솔레스", beanNameEn: "Costa Rica Los Girasoles",
    description: "스카치 캔디와 연유의 부드러운 달콤함에\n말린 과일 향에 묻어나는 고소한 땅콩 노트의 조화"
  },
  {
    id: 'ml-fruit', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Fruit,
    beanName: "에티오피아 구지 우라가 G1 내추럴", beanNameEn: "Ethiopia Guji Uraga G1 Natural",
    description: "첫 향에서 느껴지는 라즈베리의 매력,\n이어지는 청사과와 라임의 상큼함,\n마지막에 맴도는 베리의 달큰한 여운"
  },
  {
    id: 'ml-flower', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Flower,
    beanName: "페루 엘 리몬 워시드", beanNameEn: "Peru El Lemon Washed",
    description: "청사과와 레몬의 상큼한 산미에\n향긋한 플로럴 향과 부드러운 캐러멜 노트의 조화"
  },
  {
    id: 'm-milkchoco', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.MilkChoco,
    beanName: "Citrus Cacao", beanNameEn: "오픈 + 백현",
    description: "귤피차의 은은한 산미와\n카카오의 부드러운 쌉싸름함이 조화를 이루는 맛"
  },
  {
    id: 'm-nut', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Nut,
    beanName: "Sunset", beanNameEn: "백현 + 코스타리카",
    description: "멜로피치의 과즙미가 입안을 감싸며,\n긴 여운으로 이어지는 실키한 바디감"
  },
  {
    id: 'm-flower', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Flower,
    beanName: "Lime Green", beanNameEn: "백현 + 페루",
    description: "백현의 부드러운 바디감에 청사과의 플로럴한 향미가\n조화롭게 어우러지는 밸런스"
  },
  {
    id: 'm-fruit', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Fruit,
    beanName: "Honey Salvia", beanNameEn: "백현 + 에티오피아",
    description: "사루비아 꽃꿀의 은은한 단맛 위에,\n브라운슈거의 부드럽고 깊은 달콤함이 겹쳐지는 풍미"
  },
  {
    id: 'm-fpf-infuse', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.FPlusF, flavor2: FlavorProfile2.Infuse,
    beanName: "개화 (開花)", beanNameEn: "시즈널",
    description: "오픈커피 로스터스의 봄 시그니처 블렌딩\n플라워, 피치, 스트로베리의 화사한 조화에\n트로피컬의 상큼함과 캔디 같은 달콤함이 어우러지는 밸런스"
  },
  {
    id: 'm-fpf-balance', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.FPlusF, flavor2: FlavorProfile2.Balance,
    beanName: "백현 블렌드", beanNameEn: "Baekhyeon Blend",
    description: "화사하고 섬세한 커피 한잔\n중약배전\n오픈커피 로스터스의 시그니처"
  },
];

export const STEP1_ROAST_OPTIONS: RoastLevel[] = [
  RoastLevel.MediumLight,
  RoastLevel.Medium,
  RoastLevel.City,
];

export const STEP2_FLAVOR1_OPTIONS: Step2ButtonOptionsType = {
  [RoastLevel.City]: [FlavorProfile1.Nut, FlavorProfile1.DarkChoco],
  [RoastLevel.MediumLight]: [FlavorProfile1.Flower, FlavorProfile1.Fruit, FlavorProfile1.Nut],
  [RoastLevel.Medium]: [FlavorProfile1.FPlusF, FlavorProfile1.Flower, FlavorProfile1.Fruit, FlavorProfile1.Nut, FlavorProfile1.MilkChoco],
};

export const STEP3_FLAVOR2_OPTIONS: Step3ButtonOptionsType = [
  FlavorProfile2.Infuse,
  FlavorProfile2.Balance,
];

// Details for styling and text of selection circles
interface CircleDetail {
  text: string;
  color: string;
}

export const ROAST_DETAILS: Record<RoastLevel, CircleDetail> = {
  [RoastLevel.MediumLight]: { text: "medium\nlight", color: "bg-[#D9BFA9]" },
  [RoastLevel.Medium]: { text: "medium", color: "bg-[#B07E5E]" },
  [RoastLevel.City]: { text: "city", color: "bg-[#5A3A29]" },
};

export const FLAVOR1_DETAILS: Record<FlavorProfile1, Partial<Record<RoastLevel, CircleDetail>> & { defaultText?: string, defaultColor?: string }> = {
  [FlavorProfile1.Flower]: {
    [RoastLevel.MediumLight]: { text: "flower", color: "bg-[#D9BFA9]" },
    [RoastLevel.Medium]: { text: "flower", color: "bg-[#B07E5E]" },
    defaultText: "flower", defaultColor: "bg-[#B07E5E]"
  },
  [FlavorProfile1.Fruit]: {
    [RoastLevel.MediumLight]: { text: "fruit", color: "bg-[#D9BFA9]" },
    [RoastLevel.Medium]: { text: "fruit", color: "bg-[#B07E5E]" },
    defaultText: "fruit", defaultColor: "bg-[#B07E5E]"
  },
  [FlavorProfile1.Nut]: {
    [RoastLevel.City]: { text: "nut", color: "bg-[#5A3A29]" },
    [RoastLevel.MediumLight]: { text: "nut", color: "bg-[#D9BFA9]" },
    [RoastLevel.Medium]: { text: "nut", color: "bg-[#B07E5E]" },
    defaultText: "nut", defaultColor: "bg-[#B07E5E]"
  },
  [FlavorProfile1.DarkChoco]: {
    [RoastLevel.City]: { text: "dark\nchocolate", color: "bg-[#5A3A29]" },
    defaultText: "dark\nchocolate", defaultColor: "bg-[#5A3A29]"
  },
  [FlavorProfile1.MilkChoco]: {
    [RoastLevel.Medium]: { text: "milk\nchocolate", color: "bg-[#B07E5E]" },
    defaultText: "milk\nchocolate", defaultColor: "bg-[#B07E5E]"
  },
  [FlavorProfile1.FPlusF]: {
    [RoastLevel.Medium]: { text: "flower\n+\nfruit", color: "bg-[#B07E5E]" },
    defaultText: "flower\n+\nfruit", defaultColor: "bg-[#B07E5E]"
  },
};

export const FLAVOR2_DETAILS: Record<FlavorProfile2, CircleDetail> = {
  [FlavorProfile2.Infuse]: { text: "인퓨즈", color: "bg-[#B07E5E]" },
  [FlavorProfile2.Balance]: { text: "밸런스", color: "bg-[#B07E5E]" },
};