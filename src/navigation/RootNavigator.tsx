import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useVertical } from '../core/VerticalContext';
import { useAuth } from '../core/auth/AuthContext';
import { AuthNavigator } from '../core/auth/AuthNavigator';
import { BusinessSetupScreen } from '../core/onboarding/OnboardingScreen';
import { SalonNavigator } from '../verticals/salon/navigation/SalonNavigator';
import { VerticalNavigator as ClinicNavigator } from '../verticals/clinic/navigation/VerticalNavigator';
import { VerticalNavigator as CoachingNavigator } from '../verticals/coaching/navigation/VerticalNavigator';
import { VerticalNavigator as RestaurantNavigator } from '../verticals/restaurant/navigation/VerticalNavigator';
import { VerticalNavigator as HRNavigator } from '../verticals/hr/navigation/VerticalNavigator';
import { VerticalNavigator as RetailNavigator } from '../verticals/retail/navigation/VerticalNavigator';
import { VerticalNavigator as GymNavigator } from '../verticals/gym/navigation/VerticalNavigator';

export const RootNavigator = () => {
    const { vertical, loading: verticalLoading } = useVertical();
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const isLoading = verticalLoading || authLoading;

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // FLOW:
    // 1. Not logged in -> AuthNavigator
    // 2. Logged in, no vertical -> BusinessSetupScreen
    // 3. Logged in, vertical selected -> Vertical Navigator

    if (!isAuthenticated) {
        return <AuthNavigator />;
    }

    if (!vertical) {
        return <BusinessSetupScreen />;
    }

    // Strict Vertical Logic
    switch (vertical) {
        case 'salon':
            return <SalonNavigator />;
        case 'clinic':
            return <ClinicNavigator />;
        case 'coaching':
            return <CoachingNavigator />;
        case 'restaurant':
            return <RestaurantNavigator />;
        case 'hr':
            return <HRNavigator />;
        case 'retail':
            return <RetailNavigator />;
        case 'gym':
            return <GymNavigator />;
        default:
            return <BusinessSetupScreen />;
    }
};
