import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RetailDashboard } from '../screens/RetailDashboard';

const Stack = createNativeStackNavigator();

export const RetailNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RetailDashboard" component={RetailDashboard} />
        </Stack.Navigator>
    );
};
