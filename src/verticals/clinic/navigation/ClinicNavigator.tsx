import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClinicDashboard } from '../screens/ClinicDashboard';

const Stack = createNativeStackNavigator();

export const ClinicNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ClinicDashboard" component={ClinicDashboard} />
        </Stack.Navigator>
    );
};
