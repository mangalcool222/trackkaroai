import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useVertical, VerticalType } from '../VerticalContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const verticals: { id: VerticalType; label: string }[] = [
    { id: 'salon', label: 'Salon & Spa' },
    { id: 'clinic', label: 'Clinic & Health' },
    { id: 'coaching', label: 'Coaching Institute' },
    { id: 'restaurant', label: 'Restaurant & Cafe' },
    { id: 'hr', label: 'HR & Staffing' },
    { id: 'retail', label: 'Retail Shop' },
];

export const BusinessSetupScreen = () => {
    const { setVertical } = useVertical();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select Your Business Type</Text>
            <Text style={styles.subtitle}>Choose a vertical to get started. Each workspace is completely separate.</Text>

            <ScrollView contentContainerStyle={styles.list}>
                {verticals.map((v) => (
                    v.id === null ? null : (
                        <TouchableOpacity
                            key={v.id}
                            style={styles.card}
                            onPress={() => setVertical(v.id)}
                        >
                            <Text style={styles.cardText}>{v.label}</Text>
                        </TouchableOpacity>
                    )
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#111',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    list: {
        gap: 12,
    },
    card: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
});
