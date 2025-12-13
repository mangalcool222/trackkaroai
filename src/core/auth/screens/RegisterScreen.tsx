import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// This screen is optional if we auto-register on OTP, but good to have
export const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');

    const handleRegister = () => {
        // Logic to update user profile
        // Determine where to go next
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Complete Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Business Name"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
