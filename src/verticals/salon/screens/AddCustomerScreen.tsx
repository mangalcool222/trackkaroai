import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';

import { useSalon } from '../context/SalonContext';

export const AddCustomerScreen = ({ navigation }: any) => {
    const { addClient } = useSalon();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState<'New' | 'Recurring' | 'VIP'>('New');

    const handleSave = () => {
        if (!name || !phone) {
            Alert.alert('Error', 'Name and Phone are required.');
            return;
        }

        addClient({
            name,
            phone,
            notes,
            status,
            lastService: 'None',
            lastVisit: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        });

        navigation.navigate('Clients');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>New Client</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.label}>Full Name*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Phone Number*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 9876543210"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Allergies, preferences..."
                    multiline
                    numberOfLines={4}
                    value={notes}
                    onChangeText={setNotes}
                />

                <Text style={styles.label}>Status</Text>
                <View style={styles.tagRow}>
                    <TouchableOpacity
                        style={[styles.tag, status === 'New' && styles.activeTag]}
                        onPress={() => setStatus('New')}
                    >
                        <Text style={[styles.tagText, status === 'New' && styles.activeTagText]}>New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tag, status === 'VIP' && styles.activeTag]}
                        onPress={() => setStatus('VIP')}
                    >
                        <Text style={[styles.tagText, status === 'VIP' && styles.activeTagText]}>VIP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tag, status === 'Recurring' && styles.activeTag]}
                        onPress={() => setStatus('Recurring')}
                    >
                        <Text style={[styles.tagText, status === 'Recurring' && styles.activeTagText]}>Recurring</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Add Client</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    title: { fontSize: 20, fontWeight: 'bold' },
    form: { padding: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8, marginTop: 16 },
    input: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
    textArea: { height: 100, textAlignVertical: 'top' },

    tagRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
    tag: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#f0f0f0', borderRadius: 20 },
    tagText: { color: '#333', fontWeight: '600' },
    activeTag: { backgroundColor: '#007AFF' },
    activeTagText: { color: '#fff' },

    saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 40 },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
