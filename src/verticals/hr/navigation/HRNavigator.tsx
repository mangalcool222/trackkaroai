import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HRDashboard } from '../screens/HRDashboard';

const Stack = createNativeStackNavigator();

export const HRNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HRDashboard" component={HRDashboard} />
        </Stack.Navigator>
    );
};
