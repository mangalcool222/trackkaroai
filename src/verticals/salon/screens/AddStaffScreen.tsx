import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { useSalon } from '../context/SalonContext';

export const AddStaffScreen = ({ navigation }: any) => {
    const { addStaff } = useSalon();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSave = () => {
        if (!name || !role) {
            Alert.alert('Error', 'Name and Role are required.');
            return;
        }
        addStaff({
            name,
            role,
            status: 'Available'
        });
        navigation.navigate('SalonStaff');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add Staff Member</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Priya Singh"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Role</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Senior Stylist"
                    value={role}
                    onChangeText={setRole}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Add Staff</Text>
                </TouchableOpacity>
            </View>
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
    saveButton: { backgroundColor: '#34C759', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 32 },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
