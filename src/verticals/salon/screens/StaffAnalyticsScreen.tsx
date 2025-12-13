import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, UserCheck, Star, Clock } from 'lucide-react-native';

export const StaffAnalyticsScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Staff Analytics</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Performance Cards */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#F3E5F5' }]}>
                            <UserCheck size={20} color="#7B1FA2" />
                        </View>
                        <Text style={styles.statValue}>92%</Text>
                        <Text style={styles.statLabel}>Attendance</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
                            <Star size={20} color="#F57C00" />
                        </View>
                        <Text style={styles.statValue}>4.8</Text>
                        <Text style={styles.statLabel}>Avg Rating</Text>
                    </View>
                </View>

                {/* Staff List & Productivity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Productivity (Today)</Text>
                    {['Sarah', 'Mike', 'Jenny', 'David'].map((name, i) => (
                        <View key={i} style={styles.listItem}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{name[0]}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name}>{name}</Text>
                                <Text style={styles.role}>Stylist</Text>
                            </View>
                            <View style={styles.metrics}>
                                <Text style={styles.metricVal}>{5 - i}</Text>
                                <Text style={styles.metricLabel}>Appts</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Busy Hours */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Peak Hours</Text>
                    <View style={styles.chartPlaceholder}>
                        <Clock size={32} color="#007AFF" style={{ marginBottom: 8 }} />
                        <Text style={styles.chartText}>Most busy between 4 PM - 7 PM</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
    backButton: { marginRight: 16 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
    scrollContent: { padding: 20 },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    statCard: { flex: 0.48, backgroundColor: '#fff', padding: 16, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
    iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    statValue: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 4 },
    statLabel: { fontSize: 13, color: '#666' },

    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#111' },

    listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 3 },
    avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { fontSize: 16, fontWeight: 'bold', color: '#555' },
    name: { fontSize: 16, fontWeight: '600', color: '#111' },
    role: { fontSize: 13, color: '#666' },
    metrics: { alignItems: 'flex-end' },
    metricVal: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    metricLabel: { fontSize: 12, color: '#666' },

    chartPlaceholder: { backgroundColor: '#E3F2FD', padding: 24, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    chartText: { color: '#007AFF', fontWeight: '600', fontSize: 16 }
});
