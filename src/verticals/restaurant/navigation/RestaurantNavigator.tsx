import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RestaurantDashboard } from '../screens/RestaurantDashboard';

const Stack = createNativeStackNavigator();

export const RestaurantNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RestaurantDashboard" component={RestaurantDashboard} />
        </Stack.Navigator>
    );
};
