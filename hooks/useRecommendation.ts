import { UserSelections, RecommendationRule, RoastLevel, FlavorProfile1 } from '../types';

export const useRecommendation = (
  selections: UserSelections,
  rules: RecommendationRule[]
): RecommendationRule | null => {
  if (!selections.roastLevel || !selections.flavor1) {
    return null;
  }

  const { roastLevel, flavor1, flavor2 } = selections;

  const matchedRule = rules.find(rule => {
    if (rule.roastLevel !== roastLevel || rule.flavor1 !== flavor1) {
      return false;
    }
    // Handle cases that require flavor2 (e.g., Medium + F+F)
    if (roastLevel === RoastLevel.Medium && flavor1 === FlavorProfile1.FPlusF) {
      return rule.flavor2 === flavor2;
    }
    // For other cases, flavor2 should not be set in the rule or is undefined in selections
    return rule.flavor2 === undefined || rule.flavor2 === flavor2;
  });

  return matchedRule || null;
};