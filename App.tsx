import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SelectionProvider } from './contexts/SelectionContext';
import HomePage from './pages/HomePage';
import Step1RoastPage from './pages/Step1RoastPage';
import Step2FlavorPage from './pages/Step2FlavorPage';
import Step3DetailFlavorPage from './pages/Step3DetailFlavorPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/AdminPage';
import { RecommendationRule } from './types';
import { INITIAL_RECOMMENDATION_RULES, STEP1_ROAST_OPTIONS, STEP2_FLAVOR1_OPTIONS, STEP3_FLAVOR2_OPTIONS } from './constants';

const App: React.FC = () => {
  const [recommendationRules, setRecommendationRules] = useState<RecommendationRule[]>(INITIAL_RECOMMENDATION_RULES);

  return (
    <SelectionProvider>
      <HashRouter>
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
      </HashRouter>
    </SelectionProvider>
  );
};

export default App;