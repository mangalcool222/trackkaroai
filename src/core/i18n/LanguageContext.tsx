import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, TranslationKey } from './translations';

type Language = keyof typeof translations;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => Promise<void>;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLang = await AsyncStorage.getItem('app_language');
            if (savedLang && translations[savedLang as Language]) {
                setLanguageState(savedLang as Language);
            }
        } catch (error) {
            console.error('Failed to load language', error);
        }
    };

    const setLanguage = async (lang: Language) => {
        try {
            await AsyncStorage.setItem('app_language', lang);
            setLanguageState(lang);
        } catch (error) {
            console.error('Failed to save language', error);
        }
    };

    const t = (key: TranslationKey): string => {
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
