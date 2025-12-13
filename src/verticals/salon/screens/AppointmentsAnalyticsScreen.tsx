import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Plus } from 'lucide-react-native';

const MOCK_TIME_HEATMAP = [
    { time: '10 AM', count: 4 },
    { time: '12 PM', count: 2 },
    { time: '2 PM', count: 5 },
    { time: '4 PM', count: 1 },
    { time: '6 PM', count: 3 },
];

const MOCK_STAFF_BREAKDOWN = [
    { name: 'Sarah', count: 5 },
    { name: 'Mike', count: 3 },
    { name: 'Jenny', count: 2 },
    { name: 'David', count: 4 },
];

const StatBox = ({ label, value, color }: any) => (
    <View style={styles.statBox}>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

export const AppointmentsAnalyticsScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appointment Analytics</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Today's Breakdown</Text>

                {/* Breakdown Summary */}
                <View style={styles.breakdownRow}>
                    <StatBox label="Total" value="15" color="#007AFF" />
                    <StatBox label="Done" value="8" color="#34C759" />
                    <StatBox label="Pending" value="5" color="#FF9500" />
                    <StatBox label="Cancel" value="2" color="#FF3B30" />
                </View>

                {/* Time Slot Heatmap */}
                <View style={styles.section}>
                    <Text style={styles.subTitle}>Time Slot Heatmap</Text>
                    <View style={styles.card}>
                        {MOCK_TIME_HEATMAP.map((item, index) => (
                            <View key={index} style={styles.heatmapRow}>
                                <Text style={styles.heatmapLabel}>{item.time}</Text>
                                <View style={styles.barContainer}>
                                    <View style={[styles.bar, { width: `${(item.count / 5) * 100}%` }]} />
                                </View>
                                <Text style={styles.heatmapCount}>{item.count}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Staff-wise Appointments */}
                <View style={styles.section}>
                    <Text style={styles.subTitle}>Staff Performance (Today)</Text>
                    <View style={styles.card}>
                        {MOCK_STAFF_BREAKDOWN.map((staff, index) => (
                            <View key={index} style={styles.staffRow}>
                                <View style={styles.staffAvatar}>
                                    <Text style={styles.avatarText}>{staff.name[0]}</Text>
                                </View>
                                <Text style={styles.staffName}>{staff.name}</Text>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{staff.count} Appts</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Action Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddAppointment')}
                >
                    <Plus size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.addButtonText}>Add Appointment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
    backButton: { marginRight: 16 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },

    scrollContent: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 16 },
    subTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 },

    breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    statBox: { backgroundColor: '#fff', flex: 1, marginHorizontal: 4, padding: 12, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    statValue: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
    statLabel: { fontSize: 12, color: '#666' },

    section: { marginBottom: 24 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },

    heatmapRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    heatmapLabel: { width: 50, fontSize: 14, color: '#666', fontWeight: '500' },
    barContainer: { flex: 1, height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, marginHorizontal: 12 },
    bar: { height: '100%', backgroundColor: '#007AFF', borderRadius: 4 },
    heatmapCount: { width: 20, fontSize: 14, fontWeight: 'bold', textAlign: 'right', color: '#333' },

    staffRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    staffAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { fontSize: 14, fontWeight: 'bold', color: '#555' },
    staffName: { flex: 1, fontSize: 16, fontWeight: '500', color: '#111' },
    badge: { backgroundColor: '#E1F5FE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    badgeText: { color: '#0288D1', fontSize: 12, fontWeight: '600' },

    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
    addButton: { backgroundColor: '#000', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12 },
    addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
