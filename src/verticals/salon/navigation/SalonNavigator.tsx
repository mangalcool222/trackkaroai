import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SalonDashboardScreen } from '../screens/SalonDashboardScreen';
import { SalonAppointmentsScreen } from '../screens/SalonAppointmentsScreen';
import { SalonCustomersScreen } from '../screens/SalonCustomersScreen';
import { SalonBillingScreen } from '../screens/SalonBillingScreen';
import { SettingsNavigator } from '../../../common/settings/SettingsNavigator';
import { Home, Calendar, Users, CreditCard, Settings } from 'lucide-react-native';
import { useModules } from '../../../core/modules/ModuleContext';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppointmentDetailsScreen } from '../screens/AppointmentDetailsScreen';
import { StaffDetailsScreen } from '../screens/StaffDetailsScreen';

import { AddAppointmentScreen } from '../screens/AddAppointmentScreen';
import { AddCustomerScreen } from '../screens/AddCustomerScreen';
import { AddStaffScreen } from '../screens/AddStaffScreen';
import { SalonStaffScreen } from '../screens/SalonStaffScreen';
import { AppointmentsAnalyticsScreen } from '../screens/AppointmentsAnalyticsScreen';
import { RevenueOverviewScreen } from '../screens/RevenueOverviewScreen';
import { ClientDetailScreen } from '../screens/ClientDetailScreen';
import { RetentionInsightsScreen } from '../screens/RetentionInsightsScreen';
import { SalonServicesScreen } from '../screens/SalonServicesScreen';
import { ClientsAnalyticsScreen } from '../screens/ClientsAnalyticsScreen';
import { StaffAnalyticsScreen } from '../screens/StaffAnalyticsScreen';
import { SalonProvider } from '../context/SalonContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SalonTabs = () => {
    const { isModuleEnabled } = useModules();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: {
                    paddingVertical: 8,
                    borderTopWidth: 1,
                    borderTopColor: '#eee',
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarIcon: ({ color, size }) => {
                    switch (route.name) {
                        case 'Home': return <Home color={color} size={size} />;
                        case 'Appointments': return <Calendar color={color} size={size} />;
                        case 'Clients': return <Users color={color} size={size} />;
                        case 'Billing': return <CreditCard color={color} size={size} />;
                        case 'Settings': return <Settings color={color} size={size} />;
                        default: return <Home color={color} size={size} />;
                    }
                },
            })}
        >
            {/* Always show Home */}
            <Tab.Screen name="Home" component={SalonDashboardScreen} />

            {/* Conditional Tabs */}
            {isModuleEnabled('appointments') && (
                <Tab.Screen name="Appointments" component={SalonAppointmentsScreen} />
            )}

            {isModuleEnabled('customers') && (
                <Tab.Screen name="Clients" component={SalonCustomersScreen} />
            )}

            {isModuleEnabled('billing') && (
                <Tab.Screen name="Billing" component={SalonBillingScreen} />
            )}

            {/* Always show Settings */}
            <Tab.Screen name="Settings" component={SettingsNavigator} />
        </Tab.Navigator>
    );
};

const SalonNavigatorStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SalonTabs" component={SalonTabs} />
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
            <Stack.Screen name="StaffDetails" component={StaffDetailsScreen} />
            <Stack.Screen name="AppointmentsAnalytics" component={AppointmentsAnalyticsScreen} />
            <Stack.Screen name="RevenueAnalytics" component={RevenueOverviewScreen} />
            <Stack.Screen name="ClientsAnalytics" component={ClientsAnalyticsScreen} />
            <Stack.Screen name="StaffAnalytics" component={StaffAnalyticsScreen} />
            <Stack.Screen name="ClientDetail" component={ClientDetailScreen} />
            <Stack.Screen name="RetentionInsights" component={RetentionInsightsScreen} />

            {/* New Management Screens */}
            <Stack.Screen name="SalonStaff" component={SalonStaffScreen} />
            <Stack.Screen name="SalonServices" component={SalonServicesScreen} />

            {/* Add Forms (Modals) */}
            <Stack.Screen name="AddAppointment" component={AddAppointmentScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="AddCustomer" component={AddCustomerScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="AddStaff" component={AddStaffScreen} options={{ presentation: 'modal' }} />
        </Stack.Navigator>
    );
};

export const SalonNavigator = () => {
    return (
        <SalonProvider>
            <SalonNavigatorStack />
        </SalonProvider>
    );
};
