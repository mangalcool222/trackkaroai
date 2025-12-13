import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GymDashboard } from '../screens/GymDashboard';
import { GymSettingsScreen } from '../screens/GymSettingsScreen';
import { ComingSoonScreen } from '../../../common/screens/ComingSoonScreen';
import { SettingsNavigator } from '../../../common/settings/SettingsNavigator';
import { useModules } from '../../../core/modules/ModuleContext';
import { getModulesForVertical } from '../../../core/modules/ModuleList';
import { useVertical } from '../../../core/VerticalContext';
import { Home, Settings } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const GymTabs = () => {
    const { isModuleEnabled } = useModules();
    const { vertical } = useVertical();
    const modules = getModulesForVertical(vertical);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#00C853',
                tabBarInactiveTintColor: '#999',
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') return <Home color={color} size={size} />;
                    if (route.name === 'Settings') return <Settings color={color} size={size} />;

                    const mod = modules.find(m => m.label === route.name);
                    const Icon = mod?.icon || Home;
                    return <Icon color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={GymDashboard} />

            {modules.map(mod => (
                isModuleEnabled(mod.id) && (
                    <Tab.Screen
                        key={mod.id}
                        name={mod.label}
                        component={ComingSoonScreen}
                    />
                )
            ))}

            <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
    );
};

export const VerticalNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GymTabs" component={GymTabs} />
        </Stack.Navigator>
    );
};
