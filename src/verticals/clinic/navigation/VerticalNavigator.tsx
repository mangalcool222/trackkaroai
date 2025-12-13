import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClinicDashboard } from '../screens/ClinicDashboard';
import { ClinicSettingsScreen } from '../screens/ClinicSettingsScreen';
import { ComingSoonScreen } from '../../../common/screens/ComingSoonScreen';
import { SettingsNavigator } from '../../../common/settings/SettingsNavigator';
import { useModules } from '../../../core/modules/ModuleContext';
import { getModulesForVertical } from '../../../core/modules/ModuleList';
import { useVertical } from '../../../core/VerticalContext';
import { Home, Settings, Calendar, Users, FileText, CreditCard, Stethoscope } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ClinicTabs = () => {
    const { isModuleEnabled } = useModules();
    const { vertical } = useVertical();
    const modules = getModulesForVertical(vertical);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#999',
                tabBarIcon: ({ color, size }) => {
                    // Primitive matching for icons, in a real app this would be more robust or passed from definition
                    if (route.name === 'Home') return <Home color={color} size={size} />;
                    if (route.name === 'Settings') return <Settings color={color} size={size} />;

                    const mod = modules.find(m => m.label === route.name);
                    const Icon = mod?.icon || Home;
                    return <Icon color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={ClinicDashboard} />

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
            <Stack.Screen name="ClinicTabs" component={ClinicTabs} />
        </Stack.Navigator>
    );
};
