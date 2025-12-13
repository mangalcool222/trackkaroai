import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Settings } from 'lucide-react-native';

export const ComingSoonScreen = ({ route }: any) => {
    return (
        <View style={styles.center}>
            <View style={styles.iconContainer}>
                <Settings size={48} color="#999" />
            </View>
            <Text style={styles.title}>Feature Coming Soon</Text>
            <Text style={styles.subtitle}>
                {route?.name ? `${route.name} is currently under development.` : 'This module is currently under development.'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});
