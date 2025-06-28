export enum RoastLevel {
  MediumLight = 'Medium Light',
  Medium = 'Medium',
  City = 'City',
}

export enum FlavorProfile1 {
  FloralPlusFruit = 'Floral+Fruit',
  Floral = 'Floral',
  Fruits = 'Fruits',
  Nut = 'Nut',
  Choco = 'Choco',
}

export enum FlavorProfile2 {
  Seasonal = 'Seasonal',
  Balanced = 'Balanced',
  WhiteFlower = 'White Flower',
  PinkyFlower = 'Pinky Flower',
  Berry = 'Berry',
  Peach = 'Peach',
  DriedFruits = 'Dried Fruits',
  Amond = 'Amond',
  BrazielNut = 'Braziel Nut',
  Milk = 'Milk',
  Dark = 'Dark',
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
  result: string;
  name: string;
  ratio: string;
  note: string;
  weight100g: string;
}

export type Step1ButtonOptionsType = RoastLevel[];

export type Step2ButtonOptionsType = {
  [key in RoastLevel]: FlavorProfile1[];
};

export type Step3ButtonOptionsType = FlavorProfile2[];