import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CoachingDashboard } from '../screens/CoachingDashboard';

const Stack = createNativeStackNavigator();

export const CoachingNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CoachingDashboard" component={CoachingDashboard} />
        </Stack.Navigator>
    );
};
