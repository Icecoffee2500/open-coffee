export enum RoastLevel {
  MediumLight = "medium light",
  Medium = "medium",
  City = "city",
}

export enum FlavorProfile1 {
  Flower = "flower",
  Fruit = "fruit",
  Nut = "nut",
  DarkChoco = "dark chocolate",
  MilkChoco = "milk chocolate",
  FPlusF = "flower + fruit",
}

export enum FlavorProfile2 {
  Infuse = "인퓨즈",
  Balance = "밸런스",
}

export interface UserSelections {
  roastLevel?: RoastLevel;
  flavor1?: FlavorProfile1;
  flavor2?: FlavorProfile2;
}

export interface RecommendationRule {
  id: string;
  roastLevel: RoastLevel;
  flavor1: FlavorProfile1;
  flavor2?: FlavorProfile2;
  beanName: string; // Korean Name
  beanNameEn: string; // English Name
  description: string; // Korean description, can include \n
}

export type Step2ButtonOptionsType = Record<RoastLevel, FlavorProfile1[]>;
export type Step3ButtonOptionsType = FlavorProfile2[];