
import React, { useState, ChangeEvent, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { RecommendationRule, RoastLevel, FlavorProfile1, FlavorProfile2, Step2ButtonOptionsType, Step3ButtonOptionsType } from '../types';
import { PencilIcon } from '../components/icons/PencilIcon';
import { SaveIcon } from '../components/icons/SaveIcon';
import { XCircleIcon } from '../components/icons/XCircleIcon';

interface AdminPageProps {
  rules: RecommendationRule[];
  setRules: React.Dispatch<React.SetStateAction<RecommendationRule[]>>;
  step1Options: RoastLevel[];
  step2Options: Step2ButtonOptionsType;
  step3Options: Step3ButtonOptionsType;
}

const AdminPage: React.FC<AdminPageProps> = ({ rules, setRules, step1Options, step2Options, step3Options }) => {
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editingRuleData, setEditingRuleData] = useState<Partial<RecommendationRule> | null>(null);

  const handleEdit = (rule: RecommendationRule) => {
    setEditingRuleId(rule.id);
    setEditingRuleData({ ...rule });
  };

  const handleSave = (id: string) => {
    if (!editingRuleData) return;

    // Ensure beanName is not empty, fallback to original if it is.
    const originalRule = rules.find(r => r.id === id);
    const finalBeanName = editingRuleData.beanName?.trim() || originalRule?.beanName || "Unknown Bean";


    setRules(prevRules =>
      prevRules.map(rule =>
        rule.id === id ? { ...rule, ...editingRuleData, beanName: finalBeanName, id: rule.id } as RecommendationRule : rule
      )
    );
    setEditingRuleId(null);
    setEditingRuleData(null);
  };

  const handleCancel = () => {
    setEditingRuleId(null);
    setEditingRuleData(null);
  };

  const handleInputChange = (
    field: keyof RecommendationRule,
    value: string | RoastLevel | FlavorProfile1 | FlavorProfile2 | undefined
  ) => {
    setEditingRuleData(prev => {
      if (!prev) return null;
      const updatedData = { ...prev, [field]: value };

      if (field === 'roastLevel') {
        const newRoastLevel = value as RoastLevel;
        const availableFlavor1Options = step2Options[newRoastLevel] || [];
        updatedData.flavor1 = availableFlavor1Options[0] || undefined;
        updatedData.flavor2 = undefined; // Always reset flavor2 when roast changes
      } else if (field === 'flavor1') {
         updatedData.flavor2 = undefined; // Always reset flavor2 when flavor1 changes
      }
      
      // Ensure flavor2 is undefined if not applicable
      if (updatedData.roastLevel !== RoastLevel.Medium || updatedData.flavor1 !== FlavorProfile1.FPlusF) {
          updatedData.flavor2 = undefined;
      }


      return updatedData;
    });
  };
  
  const isFlavor2Applicable = (roast?: RoastLevel, flavor1?: FlavorProfile1) => {
    return roast === RoastLevel.Medium && flavor1 === FlavorProfile1.FPlusF;
  };


  return (
    <PageLayout title="관리자 페이지" subtitle="커피 추천 규칙 및 옵션 관리">
      {/* Added pb-24 to create space for the footer */}
      <div className="space-y-12 pb-24">
        <Card className="text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">추천 규칙 관리</h2>
          <p className="text-sm text-gray-600 mb-6">
            각 조합에 대한 추천 원두 이름 및 속성을 수정할 수 있습니다. 규칙 ID는 변경되지 않습니다.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-300">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">로스팅</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">향미 1</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">향미 2</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">추천 원두</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                    {editingRuleId === rule.id && editingRuleData ? (
                      <>
                        {/* Roast Level Select */}
                        <td className="px-3 py-3 whitespace-nowrap text-sm">
                          <select
                            value={editingRuleData.roastLevel || ''}
                            onChange={(e) => handleInputChange('roastLevel', e.target.value as RoastLevel)}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm text-sm"
                          >
                            {step1Options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        {/* Flavor 1 Select */}
                        <td className="px-3 py-3 whitespace-nowrap text-sm">
                          <select
                            value={editingRuleData.flavor1 || ''}
                            onChange={(e) => handleInputChange('flavor1', e.target.value as FlavorProfile1)}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm text-sm"
                            disabled={!editingRuleData.roastLevel}
                          >
                            {(editingRuleData.roastLevel ? step2Options[editingRuleData.roastLevel] : []).map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        {/* Flavor 2 Select */}
                        <td className="px-3 py-3 whitespace-nowrap text-sm">
                          {isFlavor2Applicable(editingRuleData.roastLevel, editingRuleData.flavor1) ? (
                            <select
                              value={editingRuleData.flavor2 || ''}
                              onChange={(e) => handleInputChange('flavor2', e.target.value as FlavorProfile2)}
                              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm text-sm"
                            >
                              <option value="">선택 안함</option>
                              {step3Options.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-gray-500">해당 없음</span>
                          )}
                        </td>
                        {/* Bean Name Input */}
                        <td className="px-3 py-3 whitespace-nowrap text-sm">
                          <input
                            type="text"
                            value={editingRuleData.beanName || ''}
                            onChange={(e) => handleInputChange('beanName', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm text-sm"
                            placeholder="원두 이름"
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{rule.roastLevel}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{rule.flavor1}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{rule.flavor2 || '해당 없음'}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{rule.beanName}</td>
                      </>
                    )}
                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                      {editingRuleId === rule.id ? (
                        <div className="flex space-x-2">
                          <Button onClick={() => handleSave(rule.id)} size="sm" variant="primary" className="flex items-center" aria-label="Save changes">
                            <SaveIcon className="h-4 w-4 mr-1 text-white" /> 저장
                          </Button>
                          <Button onClick={handleCancel} size="sm" variant="neutral" className="flex items-center" aria-label="Cancel editing">
                            <XCircleIcon className="h-4 w-4 mr-1 text-gray-700" /> 취소
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => handleEdit(rule)} size="sm" variant="secondary" className="flex items-center" aria-label={`Edit rule for ${rule.beanName}`}>
                          <PencilIcon className="h-4 w-4 mr-1 text-sky-700" /> 수정
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">선택 버튼 옵션 (읽기 전용)</h2>
          <p className="text-sm text-gray-600 mb-6">
            사용자에게 표시되는 선택 옵션입니다. 이 옵션들은 현재 애플리케이션 코드 내에서 관리되며, 이 페이지에서는 조회만 가능합니다.
          </p>
          
          {/* Changed grid to flex flex-col for a vertical stack */}
          <div className="flex flex-col space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Step 1: 로스팅</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {step1Options.map(opt => <li key={`s1-${opt}`}>{opt}</li>)}
              </ul>
            </div>

            {/* Removed md:col-span-2 as it's now in a single column flow */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Step 2: 주요 향미 (로스팅별)</h3>
              {Object.entries(step2Options).map(([roast, flavors]) => (
                <div key={`s2-${roast}`} className="mb-3 last:mb-0">
                  <h4 className="font-medium text-gray-600">{roast as RoastLevel}:</h4>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-0.5">
                    {(flavors as FlavorProfile1[]).map(flavor => <li key={`s2-${roast}-${flavor}`}>{flavor}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Step 3: 세부 향미</h3>
              <p className="text-xs text-gray-500 mb-1">(Medium 로스팅 + F+F 주요 향미 선택 시)</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {step3Options.map(opt => <li key={`s3-${opt}`}>{opt}</li>)}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminPage;
