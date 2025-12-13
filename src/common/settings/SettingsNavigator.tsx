import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsMenuScreen } from './screens/SettingsMenuScreen';
import { BusinessProfileScreen } from './screens/BusinessProfileScreen';
import { GSTDetailsScreen } from './screens/GSTDetailsScreen';
import { LanguageSelectorScreen } from './screens/LanguageSelectorScreen';
import { ModuleSettingsScreen } from './screens/ModuleSettingsScreen';

const Stack = createNativeStackNavigator();

export const SettingsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SettingsMenu"
                component={SettingsMenuScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BusinessProfile"
                component={BusinessProfileScreen}
                options={{ title: 'Business Profile' }}
            />
            <Stack.Screen
                name="GSTDetails"
                component={GSTDetailsScreen}
                options={{ title: 'GST Details' }}
            />
            <Stack.Screen
                name="LanguageSelector"
                component={LanguageSelectorScreen}
                options={{ title: 'Language' }}
            />
            <Stack.Screen
                name="ModuleSettings"
                component={ModuleSettingsScreen}
                options={{ title: 'Module Settings' }}
            />
        </Stack.Navigator>
    );
};
