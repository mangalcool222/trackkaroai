import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

import { useSalon } from '../context/SalonContext';

export const AppointmentDetailsScreen = ({ navigation, route }: any) => {
    const { appointmentId } = route.params || {};
    const { appointments } = useSalon();
    const appt = appointments.find(a => a.id === appointmentId);

    if (!appt) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Appointment Details</Text>
                </View>
                <View style={styles.content}>
                    <Text>Appointment not found.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Details</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.label}>Client</Text>
                    <Text style={styles.value}>{appt.clientName}</Text>

                    <Text style={[styles.label, { marginTop: 16 }]}>Service</Text>
                    <Text style={styles.value}>{appt.service}</Text>

                    <Text style={[styles.label, { marginTop: 16 }]}>Time</Text>
                    <Text style={styles.value}>{appt.date} at {appt.time}</Text>

                    <Text style={[styles.label, { marginTop: 16 }]}>Staff</Text>
                    <Text style={styles.value}>{appt.staffName}</Text>

                    <View style={[styles.statusBadge, { backgroundColor: appt.status === 'Confirmed' ? 'green' : 'orange', marginTop: 24 }]}>
                        <Text style={styles.statusText}>{appt.status}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    backButton: { marginRight: 16 },
    title: { fontSize: 20, fontWeight: 'bold' },
    content: { flex: 1, padding: 20 },
    card: { backgroundColor: '#fff', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    label: { fontSize: 14, color: '#666', fontWeight: '600', marginBottom: 4 },
    value: { fontSize: 18, color: '#111', fontWeight: 'bold' },
    statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    statusText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});
