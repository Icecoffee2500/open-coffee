import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SelectionProvider } from './contexts/SelectionContext';
import HomePage from './pages/HomePage';
import Step1RoastPage from './pages/Step1RoastPage';
import Step2FlavorPage from './pages/Step2FlavorPage';
import Step3DetailFlavorPage from './pages/Step3DetailFlavorPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/AdminPage';
import { INITIAL_RECOMMENDATION_RULES, STEP1_ROAST_OPTIONS, STEP2_FLAVOR1_OPTIONS, STEP3_FLAVOR2_OPTIONS } from './constants';

// AppContent is created to use useLocation hook, as HashRouter context is needed.
const AppContent: React.FC = () => {
  // const location = useLocation(); // No longer needed for FixedHeader
  const [recommendationRules, setRecommendationRules] = React.useState(INITIAL_RECOMMENDATION_RULES);
  // const showHeader = location.pathname !== '/'; // No longer needed

  return (
    <>
      {/* FixedHeader removed */}
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