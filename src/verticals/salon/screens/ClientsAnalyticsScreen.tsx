import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, UserPlus, Users, TrendingUp } from 'lucide-react-native';

export const ClientsAnalyticsScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Clients Analytics</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.periodSelector}>
                    <Text style={styles.periodText}>Last 30 Days</Text>
                </View>

                {/* Key Metrics */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                            <UserPlus size={20} color="#007AFF" />
                        </View>
                        <Text style={styles.statValue}>+24</Text>
                        <Text style={styles.statLabel}>New Clients</Text>
                    </View>
                    <View style={styles.statCard}>
                        <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
                            <TrendingUp size={20} color="#34C759" />
                        </View>
                        <Text style={styles.statValue}>85%</Text>
                        <Text style={styles.statLabel}>Retention</Text>
                    </View>
                </View>

                {/* Growth Chart Placeholder */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Client Growth</Text>
                    <View style={styles.chartPlaceholder}>
                        <View style={styles.bar} />
                        <View style={[styles.bar, { height: '60%' }]} />
                        <View style={[styles.bar, { height: '80%' }]} />
                        <View style={[styles.bar, { height: '50%' }]} />
                        <View style={[styles.bar, { height: '90%' }]} />
                        <View style={[styles.bar, { height: '70%' }]} />
                        <View style={[styles.bar, { height: '100%' }]} />
                    </View>
                </View>

                {/* Top Clients */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Top Clients</Text>
                    {[1, 2, 3].map((i) => (
                        <View key={i} style={styles.listItem}>
                            <View style={styles.avatar}>
                                <Users size={20} color="#666" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.clientName}>Client {i}</Text>
                                <Text style={styles.clientSub}>5 visits this month</Text>
                            </View>
                            <Text style={styles.spend}>₹{(i * 1500).toString()}</Text>
                        </View>
                    ))}
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
    periodSelector: { alignSelf: 'flex-start', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
    periodText: { fontSize: 13, fontWeight: '600', color: '#666' },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    statCard: { flex: 0.48, backgroundColor: '#fff', padding: 16, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
    iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    statValue: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 4 },
    statLabel: { fontSize: 13, color: '#666' },

    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#111' },
    chartPlaceholder: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 150, backgroundColor: '#fff', padding: 20, borderRadius: 16 },
    bar: { width: 30, height: '40%', backgroundColor: '#007AFF', borderRadius: 6 },

    listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    clientName: { fontSize: 16, fontWeight: '600', color: '#111' },
    clientSub: { fontSize: 13, color: '#666' },
    spend: { fontSize: 16, fontWeight: 'bold', color: '#34C759' }
});
