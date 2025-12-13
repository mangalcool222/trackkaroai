import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const BusinessProfileScreen = () => {
    // Mock data - in real app would load from backend/store
    const [profile, setProfile] = useState({
        name: 'My Business',
        address: '123 Market Street, City Center',
        phone: '+91 98765 43210',
        email: 'contact@business.com',
    });

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Business Name</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.name}
                        onChangeText={(t) => setProfile({ ...profile, name: t })}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={profile.address}
                        onChangeText={(t) => setProfile({ ...profile, address: t })}
                        multiline
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.phone}
                        onChangeText={(t) => setProfile({ ...profile, phone: t })}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.email}
                        onChangeText={(t) => setProfile({ ...profile, email: t })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 20 },
    fieldGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fafafa'
    },
    textArea: { height: 80, textAlignVertical: 'top' },
    saveButton: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
