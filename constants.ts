import { RoastLevel, FlavorProfile1, FlavorProfile2, RecommendationRule, Step2ButtonOptionsType, Step3ButtonOptionsType } from './types';

export const APP_TITLE = "오픈커피 로스터스";

export const INITIAL_RECOMMENDATION_RULES: RecommendationRule[] = [
  { id: 'city-darkchoco', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.DarkChoco, beanName: "Open" },
  { id: 'city-nut', roastLevel: RoastLevel.City, flavor1: FlavorProfile1.Nut, beanName: "Open: Costarica" },
  { id: 'ml-nut', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Nut, beanName: "Costarica" },
  { id: 'ml-fruit', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Fruit, beanName: "Ethiopia" },
  { id: 'ml-flower', roastLevel: RoastLevel.MediumLight, flavor1: FlavorProfile1.Flower, beanName: "Peru" },
  { id: 'm-milkchoco', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.MilkChoco, beanName: "Baekhyeon: Open" },
  { id: 'm-nut', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Nut, beanName: "Baekhyeon: Costarica" },
  { id: 'm-flower', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Flower, beanName: "Baekhyeon: Peru" },
  { id: 'm-fruit', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.Fruit, beanName: "Baekhyeon: Ethiopia" },
  { id: 'm-fpf-infuse', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.FPlusF, flavor2: FlavorProfile2.Infuse, beanName: "Seasonal" },
  { id: 'm-fpf-balance', roastLevel: RoastLevel.Medium, flavor1: FlavorProfile1.FPlusF, flavor2: FlavorProfile2.Balance, beanName: "Baekhyeon" },
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