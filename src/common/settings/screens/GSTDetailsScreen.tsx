import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const GSTDetailsScreen = () => {
    const [gstData, setGstData] = useState({
        gstin: '27ABCDE1234F1Z5',
        pan: 'ABCDE1234F',
        state: 'Maharashtra',
    });

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Ensure your GST details are correct for accurate invoicing.</Text>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>GSTIN</Text>
                    <TextInput
                        style={styles.input}
                        value={gstData.gstin}
                        onChangeText={(t) => setGstData({ ...gstData, gstin: t })}
                        autoCapitalize="characters"
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Business PAN</Text>
                    <TextInput
                        style={styles.input}
                        value={gstData.pan}
                        onChangeText={(t) => setGstData({ ...gstData, pan: t })}
                        autoCapitalize="characters"
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={styles.input}
                        value={gstData.state}
                        onChangeText={(t) => setGstData({ ...gstData, state: t })}
                    />
                </View>

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Update Details</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 20 },
    infoBox: {
        backgroundColor: '#fff3cd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#ffeeba'
    },
    infoText: { color: '#856404', fontSize: 14 },
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
    saveButton: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
