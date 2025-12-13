import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RetailDashboard } from '../screens/RetailDashboard';
import { RetailSettingsScreen } from '../screens/RetailSettingsScreen';
import { ComingSoonScreen } from '../../../common/screens/ComingSoonScreen';
import { SettingsNavigator } from '../../../common/settings/SettingsNavigator';
import { useModules } from '../../../core/modules/ModuleContext';
import { Home, Settings, ShoppingBag, CreditCard, Users, ClipboardList } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RetailTabs = () => {
    const { isModuleEnabled } = useModules();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#999',
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case 'Home': return <Home color={color} size={size} />;
                        case 'Inventory': return <ShoppingBag color={color} size={size} />;
                        case 'Billing': return <CreditCard color={color} size={size} />;
                        case 'Customers': return <Users color={color} size={size} />;
                        case 'Orders': return <ClipboardList color={color} size={size} />;
                        case 'Settings': return <Settings color={color} size={size} />;
                        default: return <Home color={color} size={size} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={RetailDashboard} />

            {isModuleEnabled('inventory') && (
                <Tab.Screen name="Inventory" component={ComingSoonScreen} />
            )}
            {isModuleEnabled('billing') && (
                <Tab.Screen name="Billing" component={ComingSoonScreen} />
            )}
            {isModuleEnabled('customers') && (
                <Tab.Screen name="Customers" component={ComingSoonScreen} />
            )}
            {isModuleEnabled('orders') && (
                <Tab.Screen name="Orders" component={ComingSoonScreen} />
            )}

            <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
    );
};

export const VerticalNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RetailTabs" component={RetailTabs} />
        </Stack.Navigator>
    );
};
