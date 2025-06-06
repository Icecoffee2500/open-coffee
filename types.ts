export enum RoastLevel {
  MediumLight = "Medium Light",
  Medium = "Medium",
  City = "City",
}

export enum FlavorProfile1 {
  Flower = "Flower",
  Fruit = "Fruit",
  Nut = "Nut",
  DarkChoco = "Dark Choco",
  MilkChoco = "Milk Choco",
  FPlusF = "F + F", // Represents "Flower + Fruit"
}

export enum FlavorProfile2 {
  Infuse = "Infuse",
  Balance = "Balance",
}

export interface UserSelections {
  roastLevel?: RoastLevel;
  flavor1?: FlavorProfile1;
  flavor2?: FlavorProfile2;
}

export interface RecommendationRule {
  id: string; // Unique ID for React keys and management
  roastLevel: RoastLevel;
  flavor1: FlavorProfile1;
  flavor2?: FlavorProfile2;
  beanName: string;
}

// For Admin page display of button options (read-only for now)
export type Step2ButtonOptionsType = Record<RoastLevel, FlavorProfile1[]>;
export type Step3ButtonOptionsType = FlavorProfile2[];