import { RoastLevel, FlavorProfile1, FlavorProfile2, RecommendationRule, Step2ButtonOptionsType, Step3ButtonOptionsType } from './types';

export const APP_TITLE = "오픈커피 로스터스";

export const INITIAL_RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    id: 'ml-ff-seasonal', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.FloralPlusFruit, flavor2: FlavorProfile2.Seasonal,
    result: "SEASON", name: "피서: Vacance", ratio: "10", note: "플로럴, 복숭아, 열대과일, 캔디", weight100g: "12,500", blending: "Ethiopia + Colobmia"
  },
  {
    id: 'ml-ff-balanced', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.FloralPlusFruit, flavor2: FlavorProfile2.Balanced,
    result: "Baekhyeon", name: "Baekhyeon", ratio: "10", note: "화사하고 섬세한 신미", weight100g: "8,800", blending: "Ethiopia 1 + Ethiopia 2"
  },
  {
    id: 'ml-floral-whiteflower', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Floral, flavor2: FlavorProfile2.WhiteFlower,
    result: "Baekhyeon + Peru", name: "Lime Green", ratio: "6:4", note: "청사과, 화이트와인, 플로럴", weight100g: "8,700", blending: "Ethiopia + Peru"
  },
  {
    id: 'ml-floral-pinkyflower', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Floral, flavor2: FlavorProfile2.PinkyFlower,
    result: "SEASON + B.H + Peru", name: "Apple Blossom", ratio: "1:5:4", note: "체리, 적포도, 장미, 밀키 바디", weight100g: "9,000", blending: "Ethiopia + Colombia + Peru"
  },
  {
    id: 'ml-fruits-berry', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Fruits, flavor2: FlavorProfile2.Berry,
    result: "B.H + Ethiopia", name: "Raspberry", ratio: "6:4", note: "사루비아의 허니, 허브민트, 라즈베리", weight100g: "8,600", blending: "Ethiopia 1 + Ethiopia 2 + Ethiopia 3"
  },
  {
    id: 'ml-fruits-peach', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Fruits, flavor2: FlavorProfile2.Peach,
    result: "B.H + Costarica", name: "Yellow Peach", ratio: "4:6", note: "복숭아, 배, 말릭 산미, 바닐라, 실키바디", weight100g: "8,500", blending: "Ethiopia + Costarica"
  },
  {
    id: 'm-floral-whiteflower', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Floral, flavor2: FlavorProfile2.WhiteFlower,
    result: "Peru", name: "Peru El Lemon", ratio: "10", note: "데이지 꽃, 청사과, 캐러멜", weight100g: "8,500", blending: "Peru"
  },
  {
    id: 'm-floral-pinkyflower', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Floral, flavor2: FlavorProfile2.PinkyFlower,
    result: "B.H + Ethiopia", name: "White Pansy", ratio: "4:6", note: "흰 팬지 꽃, 열대과일, 풍부한 산미", weight100g: "8,600", blending: "Ethiopia 1 + Ethiopia 2 + Ethiopia 3"
  },
  {
    id: 'm-ff-berry', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.FloralPlusFruit, flavor2: FlavorProfile2.Berry,
    result: "Ethiopia", name: "Ethiopia Guji Uraga", ratio: "10", note: "라임, 라즈베리, 베리류", weight100g: "8,300", blending: "Ethiopia"
  },
  {
    id: 'm-ff-driedfruits', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.FloralPlusFruit, flavor2: FlavorProfile2.DriedFruits,
    result: "Costarica", name: "Costarica Girasoles", ratio: "10", note: "말린과일, 스카치캔디, 탠저린, 밀크쵸콜릿, 너티", weight100g: "8,500", blending: "Costarica"
  },
  {
    id: 'city-nut-Almond', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.Nut, flavor2: FlavorProfile2.Almond,
    result: "Open + Costarica", name: "Cottage", ratio: "6:4", note: "아몬드, 헤이즐넛, 고소한 단맛", weight100g: "7,200", blending: "Ethiopia + Brazil + Kenya Guatemala + Costarica"
  },
  {
    id: 'city-nut-BrazielNut', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.Nut, flavor2: FlavorProfile2.BrazielNut,
    result: "B.H + Costarica", name: "Sunset", ratio: "4:6", note: "헤이즐넛, 실키 바디", weight100g: "8,600", blending: "Ethiopia + Costarica"
  },
  {
    id: 'city-choco-milk', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.Choco, flavor2: FlavorProfile2.Milk,
    result: "Open + B.H", name: "Citrus", ratio: "5:5", note: "귤피차의 약한 산미, 카카오의 쌉사름한 단맛", weight100g: "7,500", blending: "Ethiopia 1, 2 + Brazil Kenya + Guatemala"
  },
  {
    id: 'city-choco-dark', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.Choco, flavor2: FlavorProfile2.Dark,
    result: "Open", name: "Open", ratio: "10", note: "고소하고 우아한 맛", weight100g: "6,300", blending: "Ethiopia + Brazil Kenya + Guatemala"
  },
];

export const STEP1_ROAST_OPTIONS: RoastLevel[] = [
  RoastLevel.MediumLight,
  RoastLevel.Medium,
  RoastLevel.City,
];

export const STEP2_FLAVOR1_OPTIONS: Step2ButtonOptionsType = {
  [RoastLevel.MediumLight]: [FlavorProfile1.FloralPlusFruit, FlavorProfile1.Floral, FlavorProfile1.Fruits],
  [RoastLevel.Medium]: [FlavorProfile1.Floral, FlavorProfile1.FloralPlusFruit],
  [RoastLevel.City]: [FlavorProfile1.Nut, FlavorProfile1.Choco],
};

// 각 로스팅 레벨과 1차 향미 조합에 따른 사용 가능한 2차 향미 옵션
export const STEP3_OPTIONS_BY_COMBINATION: Record<string, FlavorProfile2[]> = {
  // Medium Light + FloralPlusFruit
  [`${RoastLevel.MediumLight}-${FlavorProfile1.FloralPlusFruit}`]: [FlavorProfile2.Seasonal, FlavorProfile2.Balanced],
  
  // Medium Light + Floral
  [`${RoastLevel.MediumLight}-${FlavorProfile1.Floral}`]: [FlavorProfile2.WhiteFlower, FlavorProfile2.PinkyFlower],
  
  // Medium Light + Fruits
  [`${RoastLevel.MediumLight}-${FlavorProfile1.Fruits}`]: [FlavorProfile2.Berry, FlavorProfile2.Peach],
  
  // Medium + Floral
  [`${RoastLevel.Medium}-${FlavorProfile1.Floral}`]: [FlavorProfile2.WhiteFlower, FlavorProfile2.PinkyFlower],
  
  // Medium + FloralPlusFruit
  [`${RoastLevel.Medium}-${FlavorProfile1.FloralPlusFruit}`]: [FlavorProfile2.Berry, FlavorProfile2.DriedFruits],
  
  // City + Nut
  [`${RoastLevel.City}-${FlavorProfile1.Nut}`]: [FlavorProfile2.Almond, FlavorProfile2.BrazielNut],
  
  // City + Choco
  [`${RoastLevel.City}-${FlavorProfile1.Choco}`]: [FlavorProfile2.Milk, FlavorProfile2.Dark],
};

// Details for styling and text of selection circles
interface CircleDetail {
  text: string;
  color: string;
}

export const ROAST_DETAILS: Record<RoastLevel, CircleDetail> = {
  [RoastLevel.MediumLight]: { text: "Medium\nLight", color: "bg-[#D9BFA9]" },
  [RoastLevel.Medium]: { text: "Medium", color: "bg-[#B07E5E]" },
  [RoastLevel.City]: { text: "City", color: "bg-[#5A3A29]" },
};

export const FLAVOR1_DETAILS: Record<FlavorProfile1, Partial<Record<RoastLevel, CircleDetail>> & { defaultText?: string, defaultColor?: string }> = {
  [FlavorProfile1.FloralPlusFruit]: {
    [RoastLevel.MediumLight]: { text: "Floral+Fruit", color: "bg-[#D9BFA9]" },
    [RoastLevel.Medium]: { text: "Floral+Fruit", color: "bg-[#B07E5E]" },
    defaultText: "Floral+Fruit", defaultColor: "bg-[#B07E5E]"
  },
  [FlavorProfile1.Floral]: {
    [RoastLevel.MediumLight]: { text: "Floral", color: "bg-[#D9BFA9]" },
    [RoastLevel.Medium]: { text: "Floral", color: "bg-[#B07E5E]" },
    defaultText: "Floral", defaultColor: "bg-[#B07E5E]"
  },
  [FlavorProfile1.Fruits]: {
    [RoastLevel.MediumLight]: { text: "Fruits", color: "bg-[#D9BFA9]" },
    defaultText: "Fruits", defaultColor: "bg-[#D9BFA9]"
  },
  [FlavorProfile1.Nut]: {
    [RoastLevel.City]: { text: "Nut", color: "bg-[#5A3A29]" },
    defaultText: "Nut", defaultColor: "bg-[#5A3A29]"
  },
  [FlavorProfile1.Choco]: {
    [RoastLevel.City]: { text: "Choco", color: "bg-[#5A3A29]" },
    defaultText: "Choco", defaultColor: "bg-[#5A3A29]"
  },
};

export const FLAVOR2_DETAILS: Record<FlavorProfile2, CircleDetail> = {
  [FlavorProfile2.Seasonal]: { text: "Seasonal", color: "bg-[#B07E5E]" },
  [FlavorProfile2.Balanced]: { text: "Balanced", color: "bg-[#B07E5E]" },
  [FlavorProfile2.WhiteFlower]: { text: "White\nFlower", color: "bg-[#B07E5E]" },
  [FlavorProfile2.PinkyFlower]: { text: "Pinky\nFlower", color: "bg-[#B07E5E]" },
  [FlavorProfile2.Berry]: { text: "Berry", color: "bg-[#B07E5E]" },
  [FlavorProfile2.Peach]: { text: "Peach", color: "bg-[#B07E5E]" },
  [FlavorProfile2.DriedFruits]: { text: "Dried\nFruits", color: "bg-[#B07E5E]" },
  [FlavorProfile2.Almond]: { text: "Almond", color: "bg-[#5A3A29]" },
  [FlavorProfile2.BrazielNut]: { text: "Braziel\nNut", color: "bg-[#5A3A29]" },
  [FlavorProfile2.Milk]: { text: "Milk", color: "bg-[#5A3A29]" },
  [FlavorProfile2.Dark]: { text: "Dark", color: "bg-[#5A3A29]" },
};