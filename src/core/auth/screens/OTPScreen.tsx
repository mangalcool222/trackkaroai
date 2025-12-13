import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../../core/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export const OTPScreen = ({ route, navigation }: any) => {
    const { phone } = route.params;
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const { verifyOtp } = useAuth();

    const handleVerify = async () => {
        if (otp.length < 4) {
            Alert.alert('Error', 'Please enter a valid OTP');
            return;
        }
        setLoading(true);
        try {
            const success = await verifyOtp(otp);
            if (success) {
                // Navigation will be handled by AuthContext state change in RootNavigator
            } else {
                Alert.alert('Error', 'Invalid OTP');
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.subtitle}>Enter the code sent to +91 {phone}</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="0000"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                        maxLength={6}
                        autoFocus
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleVerify}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Verify</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.resend} onPress={() => Alert.alert('Sent', 'OTP Resent')}>
                    <Text style={styles.resendText}>Resend Code</Text>
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
    input: {
        flex: 1,
        height: 56,
        fontSize: 24,
        textAlign: 'center',
        color: '#333',
        letterSpacing: 8,
    },
    button: {
        backgroundColor: '#000',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    resend: {
        alignItems: 'center',
    },
    resendText: {
        color: '#007AFF',
        fontSize: 16,
    },
});
