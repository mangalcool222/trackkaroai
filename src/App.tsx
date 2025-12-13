import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VerticalProvider } from './core/VerticalContext';
import { ModuleProvider } from './core/modules/ModuleContext';
import { AuthProvider } from './core/auth/AuthContext';
import { RootNavigator } from './navigation/RootNavigator';

import { LanguageProvider } from './core/i18n/LanguageContext';

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <LanguageProvider>
                    <VerticalProvider>
                        <ModuleProvider>
                            <NavigationContainer>
                                <RootNavigator />
                            </NavigationContainer>
                        </ModuleProvider>
                    </VerticalProvider>
                </LanguageProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
