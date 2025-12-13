import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, TrendingUp, DollarSign, Clock } from 'lucide-react-native';

const MOCK_SERVICE_Revenue = [
    { service: 'Haircut', percentage: 0.32, value: '32%', color: '#007AFF' },
    { service: 'Spa', percentage: 0.20, value: '20%', color: '#34C759' },
    { service: 'Hair Color', percentage: 0.18, value: '18%', color: '#FF9500' },
    { service: 'Pedicure', percentage: 0.10, value: '10%', color: '#AF52DE' },
];

const MOCK_STAFF_PERFORMANCE = [
    { name: 'Ritu', revenue: '₹15,000' },
    { name: 'Adil', revenue: '₹9,500' },
    { name: 'Nisha', revenue: '₹6,200' },
];

const MOCK_PENDING_PAYMENTS = [
    { customer: 'Amit Verma', amount: '₹1,200', service: 'Full Body Spa' },
    { customer: 'Sneha Gupta', amount: '₹450', service: 'Hair Spa' },
    { customer: 'Rohan Das', amount: '₹800', service: 'Men’s Grooming' },
];

const SummaryCard = ({ label, value, subLabel, color }: any) => (
    <View style={[styles.summaryCard, { borderTopColor: color, borderTopWidth: 4 }]}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
        {subLabel && <Text style={styles.summarySub}>{subLabel}</Text>}
    </View>
);

export const RevenueOverviewScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Revenue Overview</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Top Summary Cards */}
                <View style={styles.summaryRow}>
                    <SummaryCard label="Today's Revenue" value="₹12,450" color="#34C759" />
                    <SummaryCard label="This Week" value="₹54,300" color="#007AFF" />
                </View>

                {/* Service-wise Revenue Split */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <TrendingUp size={20} color="#666" style={{ marginRight: 8 }} />
                        <Text style={styles.sectionTitle}>Service-wise Revenue</Text>
                    </View>
                    <View style={styles.card}>
                        {MOCK_SERVICE_Revenue.map((item, index) => (
                            <View key={index} style={styles.progressRow}>
                                <View style={styles.progressLabelRow}>
                                    <Text style={styles.progressLabel}>{item.service}</Text>
                                    <Text style={styles.progressValue}>{item.value}</Text>
                                </View>
                                <View style={styles.progressBarBg}>
                                    <View style={[styles.progressBarFill, { width: `${item.percentage * 100}%`, backgroundColor: item.color }]} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Staff Performance */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <DollarSign size={20} color="#666" style={{ marginRight: 8 }} />
                        <Text style={styles.sectionTitle}>Top Performers</Text>
                    </View>
                    <View style={styles.card}>
                        {MOCK_STAFF_PERFORMANCE.map((staff, index) => (
                            <View key={index} style={styles.staffRow}>
                                <View style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarText}>{staff.name[0]}</Text>
                                </View>
                                <Text style={styles.staffName}>{staff.name}</Text>
                                <Text style={styles.staffRevenue}>{staff.revenue}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Pending Payments */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Clock size={20} color="#666" style={{ marginRight: 8 }} />
                        <Text style={styles.sectionTitle}>Pending Payments</Text>
                    </View>
                    {MOCK_PENDING_PAYMENTS.map((item, index) => (
                        <View key={index} style={styles.paymentCard}>
                            <View>
                                <Text style={styles.paymentName}>{item.customer}</Text>
                                <Text style={styles.paymentService}>{item.service}</Text>
                            </View>
                            <View style={styles.paymentRight}>
                                <Text style={styles.paymentAmount}>{item.amount}</Text>
                                <Text style={styles.paymentStatus}>Pending</Text>
                            </View>
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

    scrollContent: { padding: 20, paddingBottom: 40 },

    summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    summaryCard: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    summaryLabel: { fontSize: 13, color: '#666', fontWeight: '600', marginBottom: 8 },
    summaryValue: { fontSize: 24, fontWeight: 'bold', color: '#111' },
    summarySub: { fontSize: 12, color: '#34C759', marginTop: 4 },

    section: { marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },

    progressRow: { marginBottom: 16 },
    progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    progressLabel: { fontSize: 14, fontWeight: '500', color: '#333' },
    progressValue: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    progressBarBg: { height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 4 },

    staffRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { fontSize: 16, fontWeight: 'bold', color: '#0288D1' },
    staffName: { flex: 1, fontSize: 16, fontWeight: '500', color: '#111' },
    staffRevenue: { fontSize: 16, fontWeight: 'bold', color: '#34C759' },

    paymentCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    paymentName: { fontSize: 16, fontWeight: '600', color: '#111' },
    paymentService: { fontSize: 13, color: '#666', marginTop: 2 },
    paymentRight: { alignItems: 'flex-end' },
    paymentAmount: { fontSize: 16, fontWeight: 'bold', color: '#FF3B30' },
    paymentStatus: { fontSize: 12, color: '#FF9500', fontWeight: '600', marginTop: 2 },
});
