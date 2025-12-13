import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSalon } from '../context/SalonContext';
import { ArrowLeft, Plus } from 'lucide-react-native';

export const SalonServicesScreen = ({ navigation }: any) => {
    const { services, addService } = useSalon();
    const [isAdding, setIsAdding] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');
    const [newServiceDuration, setNewServiceDuration] = useState('');

    const handleSave = () => {
        if (newServiceName && newServicePrice) {
            addService({
                name: newServiceName,
                price: newServicePrice,
                duration: newServiceDuration || '30 mins'
            });
            setNewServiceName('');
            setNewServicePrice('');
            setNewServiceDuration('');
            setIsAdding(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Services Menu</Text>
                <TouchableOpacity onPress={() => setIsAdding(!isAdding)} style={styles.addButton}>
                    <Plus size={24} color={isAdding ? "#ff4444" : "#007AFF"} style={{ transform: [{ rotate: isAdding ? '45deg' : '0deg' }] }} />
                </TouchableOpacity>
            </View>

            {isAdding && (
                <View style={styles.addForm}>
                    <Text style={styles.addTitle}>Add New Service</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Service Name (e.g. Haircut)"
                        value={newServiceName}
                        onChangeText={setNewServiceName}
                    />
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 1, marginRight: 8 }]}
                            placeholder="Price (₹)"
                            keyboardType="numeric"
                            value={newServicePrice}
                            onChangeText={setNewServicePrice}
                        />
                        <TextInput
                            style={[styles.input, { flex: 1, marginLeft: 8 }]}
                            placeholder="Duration (e.g. 30m)"
                            value={newServiceDuration}
                            onChangeText={setNewServiceDuration}
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Service</Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.serviceName}>{item.name}</Text>
                            <Text style={styles.serviceDuration}>{item.duration}</Text>
                        </View>
                        <Text style={styles.servicePrice}>₹{item.price}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
    backButton: { marginRight: 16 },
    addButton: { padding: 4 },
    title: { fontSize: 20, fontWeight: 'bold', flex: 1 },

    listContent: { padding: 20 },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    serviceName: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    serviceDuration: { fontSize: 13, color: '#666', marginTop: 2 },
    servicePrice: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32' },

    addForm: { backgroundColor: '#fff', margin: 20, padding: 16, borderRadius: 12, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    addTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
    input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee', marginBottom: 12 },
    row: { flexDirection: 'row' },
    saveButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
