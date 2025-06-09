

import React, { useState, ChangeEvent, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
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

    const originalRule = rules.find(r => r.id === id);
    
    const processedBeanName = editingRuleData.beanName !== undefined 
      ? (editingRuleData.beanName.trim() || originalRule?.beanName || "Unknown Bean") 
      : originalRule?.beanName || "Unknown Bean";

    const processedBeanNameEn = editingRuleData.beanNameEn !== undefined
      ? (editingRuleData.beanNameEn.trim() || originalRule?.beanNameEn || "")
      : originalRule?.beanNameEn || "";

    const processedDescription = editingRuleData.description !== undefined
      ? (editingRuleData.description.trim() || originalRule?.description || "")
      : originalRule?.description || "";

    setRules(prevRules =>
      prevRules.map(rule => {
        if (rule.id === id) {
          return { 
            ...rule, 
            ...editingRuleData, 
            beanName: processedBeanName,
            beanNameEn: processedBeanNameEn, 
            description: processedDescription,
          } as RecommendationRule;
        }
        return rule;
      })
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
        updatedData.flavor2 = undefined;
      } else if (field === 'flavor1') {
         updatedData.flavor2 = undefined;
      }
      
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
    <PageLayout
      mainTitle="관리자 페이지"
      description="커피 추천 규칙 및 옵션 관리"
      showAdminHomeButton={true}
    >
      <div className="space-y-8 sm:space-y-10 md:space-y-12 pb-16 sm:pb-20 md:pb-24 w-full">
        <div className="p-4 sm:p-6 text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">추천 규칙 관리</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            각 조합에 대한 추천 원두 이름, 영어 이름, 상세 설명 및 속성을 수정할 수 있습니다. 규칙 ID는 변경되지 않습니다.
          </p>
          <div className="overflow-x-auto border border-gray-200 sm:border-gray-300"> 
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50 sm:bg-gray-100">
                <tr>
                  <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left text-xs font-normal sm:font-medium text-gray-500 uppercase tracking-wider w-[110px] md:w-[120px]">로스팅</th>
                  <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left text-xs font-normal sm:font-medium text-gray-500 uppercase tracking-wider w-[120px] md:w-[130px]">향미 1</th>
                  <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left text-xs font-normal sm:font-medium text-gray-500 uppercase tracking-wider w-[110px] md:w-[120px]">향미 2</th>
                  <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left text-xs font-normal sm:font-medium text-gray-500 uppercase tracking-wider w-[140px] md:w-[170px]">추천 원두</th>
                  <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left text-xs font-normal sm:font-medium text-gray-500 uppercase tracking-wider w-[140px] md:w-[170px]">영어 이름</th>
                  <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left text-xs font-normal sm:font-medium text-gray-500 uppercase tracking-wider w-[200px] sm:w-[240px] md:w-[280px]">상세 설명</th>
                  <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left text-xs font-normal sm:font-medium text-gray-500 uppercase tracking-wider w-[90px] md:w-[100px]">작업</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                    {editingRuleId === rule.id && editingRuleData ? (
                      <>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm">
                          <select
                            value={editingRuleData.roastLevel || ''}
                            onChange={(e) => handleInputChange('roastLevel', e.target.value as RoastLevel)}
                            className="w-full p-1.5 text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm"
                          >
                            {step1Options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm">
                          <select
                            value={editingRuleData.flavor1 || ''}
                            onChange={(e) => handleInputChange('flavor1', e.target.value as FlavorProfile1)}
                            className="w-full p-1.5 text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm"
                            disabled={!editingRuleData.roastLevel}
                          >
                            {(editingRuleData.roastLevel ? step2Options[editingRuleData.roastLevel] : []).map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm">
                          {isFlavor2Applicable(editingRuleData.roastLevel, editingRuleData.flavor1) ? (
                            <select
                              value={editingRuleData.flavor2 || ''}
                              onChange={(e) => handleInputChange('flavor2', e.target.value as FlavorProfile2)}
                              className="w-full p-1.5 text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm"
                            >
                              <option value="">선택 안함</option>
                              {step3Options.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-gray-400 sm:text-gray-500">해당 없음</span>
                          )}
                        </td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm">
                          <input
                            type="text"
                            value={editingRuleData.beanName || ''}
                            onChange={(e) => handleInputChange('beanName', e.target.value)}
                            className="w-full p-1.5 text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm"
                            placeholder="원두 이름"
                          />
                        </td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm">
                          <input
                            type="text"
                            value={editingRuleData.beanNameEn || ''}
                            onChange={(e) => handleInputChange('beanNameEn', e.target.value)}
                            className="w-full p-1.5 text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm"
                            placeholder="영어 이름"
                          />
                        </td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm">
                          <textarea
                            value={editingRuleData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="w-full p-1.5 text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition shadow-sm min-h-[60px] sm:min-h-[80px]"
                            placeholder="상세 설명 (줄바꿈 가능)"
                            rows={3}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm text-gray-600 sm:text-gray-700 break-words">{rule.roastLevel}</td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm text-gray-600 sm:text-gray-700 break-words">{rule.flavor1}</td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm text-gray-500 sm:text-gray-700 break-words">{rule.flavor2 || '해당 없음'}</td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm text-gray-600 sm:text-gray-700 break-words">{rule.beanName}</td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm text-gray-600 sm:text-gray-700 break-words">{rule.beanNameEn}</td>
                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm text-gray-600 sm:text-gray-700 whitespace-pre-line break-words">{rule.description}</td>
                      </>
                    )}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium">
                      {editingRuleId === rule.id ? (
                        <div className="flex space-x-1 sm:space-x-2">
                          <Button onClick={() => handleSave(rule.id)} size="sm" variant="primary" className="flex items-center !px-2 !py-1 !text-xs sm:!px-2.5 sm:!py-1.5 sm:!text-sm" aria-label="Save changes">
                            <SaveIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 text-white" /> 저장
                          </Button>
                          <Button onClick={handleCancel} size="sm" variant="neutral" className="flex items-center !px-2 !py-1 !text-xs sm:!px-2.5 sm:!py-1.5 sm:!text-sm" aria-label="Cancel editing">
                            <XCircleIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 text-gray-700" /> 취소
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => handleEdit(rule)} size="sm" variant="neutral" className="flex items-center !px-2 !py-1 !text-xs sm:!px-2.5 sm:!py-1.5 sm:!text-sm rounded-none" aria-label={`Edit rule for ${rule.beanName}`}>
                          <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 text-gray-700" /> 수정
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 sm:p-6 text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">선택 버튼 옵션 (읽기 전용)</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            사용자에게 표시되는 선택 옵션입니다. 이 옵션들은 현재 애플리케이션 코드 내에서 관리되며, 이 페이지에서는 조회만 가능합니다.
          </p>
          
          <div className="flex flex-col space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">Step 1: 로스팅</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                {step1Options.map(opt => <li key={`s1-${opt}`}>{opt}</li>)}
              </ul>
            </div>

            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">Step 2: 주요 향미 (로스팅별)</h3>
              {Object.entries(step2Options).map(([roast, flavors]) => (
                <div key={`s2-${roast}`} className="mb-2 sm:mb-3 last:mb-0">
                  <h4 className="font-medium text-gray-600 text-xs sm:text-sm">{roast as RoastLevel}:</h4>
                  <ul className="list-disc list-inside text-gray-600 ml-3 sm:ml-4 space-y-0 sm:space-y-0.5 text-xs sm:text-sm">
                    {(flavors as FlavorProfile1[]).map(flavor => <li key={`s2-${roast}-${flavor}`}>{flavor}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">Step 3: 세부 향미</h3>
              <p className="text-xs text-gray-500 mb-1">(Medium 로스팅 + F+F 주요 향미 선택 시)</p>
              <ul className="list-disc list-inside text-gray-600 space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                {step3Options.map(opt => <li key={`s3-${opt}`}>{opt}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminPage;