import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SelectionProvider } from './contexts/SelectionContext';
import HomePage from './pages/HomePage';
import Step1RoastPage from './pages/Step1RoastPage';
import Step2FlavorPage from './pages/Step2FlavorPage';
import Step3DetailFlavorPage from './pages/Step3DetailFlavorPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/AdminPage';
import { INITIAL_RECOMMENDATION_RULES, STEP1_ROAST_OPTIONS, STEP2_FLAVOR1_OPTIONS, STEP3_FLAVOR2_OPTIONS } from './constants';
import { RecommendationRule } from './types';

const LOCAL_STORAGE_KEY = 'coffeeRecommenderRules';

// AppContent is created to use useLocation hook, as HashRouter context is needed.
const AppContent: React.FC = () => {
  const [recommendationRules, setRecommendationRules] = useState<RecommendationRule[]>(() => {
    try {
      const storedRules = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedRules) {
        const parsedRules = JSON.parse(storedRules) as RecommendationRule[];
        // Basic validation: check if it's an array and has expected properties (optional but good)
        if (Array.isArray(parsedRules) && parsedRules.length > 0 && parsedRules[0].id && parsedRules[0].beanName) {
          return parsedRules;
        }
      }
    } catch (error) {
      console.error("Failed to parse recommendation rules from localStorage:", error);
    }
    // If localStorage is empty, not valid, or parsing fails, save initial rules and return them.
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_RECOMMENDATION_RULES));
    } catch (error) {
        console.error("Failed to save initial rules to localStorage:", error);
    }
    return INITIAL_RECOMMENDATION_RULES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recommendationRules));
    } catch (error) {
      console.error("Failed to save recommendation rules to localStorage:", error);
    }
  }, [recommendationRules]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/step1" element={<Step1RoastPage />} />
        <Route path="/step2" element={<Step2FlavorPage />} />
        <Route path="/step3" element={<Step3DetailFlavorPage />} />
        <Route path="/result" element={<ResultPage recommendationRules={recommendationRules} />} />
        <Route 
          path="/admin" 
          element={
            <AdminPage 
              rules={recommendationRules} 
              setRules={setRecommendationRules}
              step1Options={STEP1_ROAST_OPTIONS}
              step2Options={STEP2_FLAVOR1_OPTIONS}
              step3Options={STEP3_FLAVOR2_OPTIONS}
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

const App: React.FC = () => {
  return (
    <SelectionProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </SelectionProvider>
  );
};

export default App;