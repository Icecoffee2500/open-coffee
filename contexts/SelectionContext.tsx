import * as React from 'react';
import { createContext, useState, useContext, ReactNode } from 'react';
import { RoastLevel, FlavorProfile1, FlavorProfile2, UserSelections } from '../types';

interface SelectionContextType {
  selections: UserSelections;
  setRoastLevel: (roast: RoastLevel) => void;
  setFlavor1: (flavor: FlavorProfile1) => void;
  setFlavor2: (flavor: FlavorProfile2) => void;
  resetSelections: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selections, setSelections] = useState<UserSelections>({});

  const setRoastLevel = (roast: RoastLevel) => {
    setSelections({ roastLevel: roast }); // Reset subsequent choices
  };

  const setFlavor1 = (flavor: FlavorProfile1) => {
    setSelections(prev => ({ ...prev, flavor1: flavor, flavor2: undefined })); // Reset flavor2 if flavor1 changes
  };

  const setFlavor2 = (flavor: FlavorProfile2) => {
    setSelections(prev => ({ ...prev, flavor2: flavor }));
  };

  const resetSelections = () => {
    setSelections({});
  };

  return (
    <SelectionContext.Provider value={{ selections, setRoastLevel, setFlavor1, setFlavor2, resetSelections }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelections = (): SelectionContextType => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelections must be used within a SelectionProvider');
  }
  return context;
};