import { useMemo } from 'react';
import { UserSelections, RecommendationRule, RoastLevel, FlavorProfile1 } from '../types';

export const useRecommendation = (selections: UserSelections, rules: RecommendationRule[]): RecommendationRule | null => {
  return useMemo(() => {
    if (!selections.roastLevel || !selections.flavor1) {
      return null;
    }

    // 정확히 일치하는 규칙 찾기
    const exactMatch = rules.find(rule => 
      rule.roastLevel === selections.roastLevel &&
      rule.flavor1 === selections.flavor1 &&
      rule.flavor2 === selections.flavor2
    );

    if (exactMatch) {
      return exactMatch;
    }

    // flavor2가 없는 경우, flavor2가 undefined인 규칙 찾기
    if (!selections.flavor2) {
      const matchWithoutFlavor2 = rules.find(rule =>
        rule.roastLevel === selections.roastLevel &&
        rule.flavor1 === selections.flavor1 &&
        !rule.flavor2
      );
      
      if (matchWithoutFlavor2) {
        return matchWithoutFlavor2;
      }
    }

    return null;
  }, [selections, rules]);
};