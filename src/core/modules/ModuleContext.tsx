import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useVertical } from '../VerticalContext';
import { getModulesForVertical, ModuleDefinition, ModuleId } from './ModuleList';

type ModuleState = Record<string, boolean>;

interface ModuleContextType {
    modules: ModuleState;
    toggleModule: (moduleId: string) => Promise<void>;
    isModuleEnabled: (moduleId: string) => boolean;
    loading: boolean;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { vertical } = useVertical();
    const [modules, setModules] = useState<ModuleState>({});
    const [loading, setLoading] = useState(true);

    // Load modules when vertical changes
    useEffect(() => {
        if (!vertical) return;

        const loadModules = async () => {
            setLoading(true);
            try {
                const storedModules = await AsyncStorage.getItem(`modules_${vertical}`);
                if (storedModules) {
                    setModules(JSON.parse(storedModules));
                } else {
                    // Initialize with defaults based on vertical
                    const defaults: ModuleState = {};
                    const definitions = getModulesForVertical(vertical);

                    definitions.forEach(mod => {
                        defaults[mod.id] = mod.defaultEnabled;
                    });
                    setModules(defaults);
                }
            } catch (error) {
                console.error('Failed to load module settings:', error);
            } finally {
                setLoading(false);
            }
        };

        loadModules();
    }, [vertical]);

    const toggleModule = async (moduleId: string) => {
        if (!vertical) return;

        const newState = {
            ...modules,
            [moduleId]: !modules[moduleId],
        };

        setModules(newState);
        try {
            await AsyncStorage.setItem(`modules_${vertical}`, JSON.stringify(newState));
        } catch (error) {
            console.error('Failed to save module settings:', error);
        }
    };

    const isModuleEnabled = (moduleId: string) => {
        // If the module ID is not in the state (e.g. new feature), fallback to false or check definitions?
        // For safety, checks if explicitly true. 
        // If undefined, we can check default, but state should be populated.
        return !!modules[moduleId];
    };

    return (
        <ModuleContext.Provider value={{ modules, toggleModule, isModuleEnabled, loading }}>
            {children}
        </ModuleContext.Provider>
    );
};

export const useModules = () => {
    const context = useContext(ModuleContext);
    if (!context) {
        throw new Error('useModules must be used within a ModuleProvider');
    }
    return context;
};
