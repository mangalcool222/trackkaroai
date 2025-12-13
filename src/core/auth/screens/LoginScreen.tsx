import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../../core/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = ({ navigation }: any) => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (phone.length < 10) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }
        setLoading(true);
        try {
            await login(phone);
            navigation.navigate('OTP', { phone });
        } catch (e) {
            Alert.alert('Error', 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Enter your phone number to continue</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.prefix}>+91</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        maxLength={10}
                        autoFocus
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Get OTP</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 24,
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#111',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        marginBottom: 24,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
    },
    prefix: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: 56,
        fontSize: 18,
        color: '#333',
    },
    button: {
        backgroundColor: '#000',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
