import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVertical } from '../../../core/VerticalContext';
import { useAuth } from '../../../core/auth/AuthContext';

export const GymSettingsScreen = ({ navigation }: any) => {
    const { setVertical } = useVertical();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await setVertical(null);
        await logout();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Gym Settings</Text>

            <View style={styles.section}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#007AFF', marginBottom: 12 }]}
                    onPress={() => navigation.navigate('Settings', { screen: 'ModuleSettings' })}
                >
                    <Text style={styles.buttonText}>Module Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
    section: { marginTop: 20 },
    button: {
        backgroundColor: '#ff4444',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
