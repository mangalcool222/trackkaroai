import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSalon } from '../context/SalonContext';
import { Plus, Calendar as CalendarIcon, Clock } from 'lucide-react-native';
import { FlatList, TouchableOpacity } from 'react-native';

export const SalonAppointmentsScreen = ({ navigation }: any) => {
    const { appointments } = useSalon();

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: item.id })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.clientName}>{item.clientName}</Text>
                <View style={[styles.statusBadge, {
                    backgroundColor: item.status === 'Confirmed' ? '#E8F5E9' : '#FFF3E0'
                }]}>
                    <Text style={[styles.statusText, {
                        color: item.status === 'Confirmed' ? '#2E7D32' : '#EF6C00'
                    }]}>{item.status}</Text>
                </View>
            </View>

            <Text style={styles.serviceName}>{item.service} with {item.staffName}</Text>

            <View style={styles.timeRow}>
                <CalendarIcon size={14} color="#666" style={{ marginRight: 4 }} />
                <Text style={styles.timeText}>{item.date}</Text>
                <Clock size={14} color="#666" style={{ marginLeft: 12, marginRight: 4 }} />
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Appointments</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddAppointment')}
                >
                    <Plus size={20} color="#fff" />
                    <Text style={styles.addButtonText}>New</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={appointments}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No appointments scheduled.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold' },
    addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    addButtonText: { color: '#fff', fontWeight: '600', marginLeft: 4 },
    listContent: { padding: 20 },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    clientName: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 12, fontWeight: '600' },
    serviceName: { fontSize: 14, color: '#333', marginBottom: 8 },
    timeRow: { flexDirection: 'row', alignItems: 'center' },
    timeText: { fontSize: 13, color: '#666' },
    emptyState: { alignItems: 'center', marginTop: 40 },
    emptyText: { color: '#999', fontSize: 16 },
    subtitle: { fontSize: 16, color: '#666', marginTop: 8 }, // keeping just in case
});
