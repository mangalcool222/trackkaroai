import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export type VerticalType = 'salon' | 'clinic' | 'coaching' | 'restaurant' | 'hr' | 'retail' | 'gym' | null;

interface VerticalContextType {
  vertical: VerticalType;
  setVertical: (v: VerticalType) => Promise<void>;
  loading: boolean;
}

const VerticalContext = createContext<VerticalContextType>({
  vertical: null,
  setVertical: async () => { },
  loading: true,
});

export const useVertical = () => useContext(VerticalContext);

export const VerticalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vertical, setVerticalState] = useState<VerticalType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVertical();
  }, []);

  const loadVertical = async () => {
    try {
      const stored = await SecureStore.getItemAsync('activeVertical');
      if (stored) {
        setVerticalState(stored as VerticalType);
      }
    } catch (e) {
      console.error('Failed to load vertical', e);
    } finally {
      setLoading(false);
    }
  };

  const setVertical = async (v: VerticalType) => {
    try {
      if (v) {
        await SecureStore.setItemAsync('activeVertical', v);
      } else {
        await SecureStore.deleteItemAsync('activeVertical');
      }
      setVerticalState(v);
    } catch (e) {
      console.error('Failed to set vertical', e);
    }
  };

  return (
    <VerticalContext.Provider value={{ vertical, setVertical, loading }}>
      {children}
    </VerticalContext.Provider>
  );
};
