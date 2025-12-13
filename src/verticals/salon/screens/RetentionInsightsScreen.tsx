import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, RefreshCcw, Calendar, MessageCircle, CheckCircle } from 'lucide-react-native';

const MOCK_LAPSED_CLIENTS = [
    { id: '1', name: 'Rohan Das', lastVisit: '45 days ago', phone: '9876543210' },
    { id: '2', name: 'Sneha Gupta', lastVisit: '60 days ago', phone: '8765432109' },
    { id: '3', name: 'Amit Verma', lastVisit: '35 days ago', phone: '7654321098' },
];

export const RetentionInsightsScreen = ({ navigation }: any) => {
    const [remindersSent, setRemindersSent] = useState(false);

    const handleAutoFollowup = () => {
        Alert.alert(
            "Send Reminders?",
            `This will send a WhatsApp reminder to ${MOCK_LAPSED_CLIENTS.length} lapsed clients.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Send All",
                    onPress: () => {
                        setRemindersSent(true);
                        // In production, this would trigger a backend job or open WhatsApp loop
                        Alert.alert("Success", "Reminders queued successfully!");
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Retention Insights</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Hero Metric Card */}
                <View style={styles.heroCard}>
                    <View style={styles.heroHeader}>
                        <RefreshCcw size={24} color="#fff" />
                        <Text style={styles.heroTitle}>Repeat Client Ratio</Text>
                    </View>
                    <Text style={styles.heroValue}>85%</Text>
                    <Text style={styles.heroSub}>Excellent! Most clients are returning.</Text>
                </View>

                {/* Automation Action Section - The "Killer Feature" */}
                <View style={styles.actionSection}>
                    <Text style={styles.sectionTitle}>Win Back Customers</Text>
                    <Text style={styles.sectionSub}>These clients haven't visited in 30+ days.</Text>

                    <TouchableOpacity
                        style={[styles.autoButton, remindersSent && styles.autoButtonDisabled]}
                        onPress={handleAutoFollowup}
                        disabled={remindersSent}
                    >
                        {remindersSent ? (
                            <CheckCircle size={24} color="#fff" style={{ marginRight: 8 }} />
                        ) : (
                            <MessageCircle size={24} color="#fff" style={{ marginRight: 8 }} />
                        )}
                        <Text style={styles.autoButtonText}>
                            {remindersSent ? "Reminders Sent" : "Auto-Followup (WhatsApp)"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Lapsed List */}
                <View style={styles.listSection}>
                    <Text style={styles.listTitle}>Lapsed Clients ({MOCK_LAPSED_CLIENTS.length})</Text>
                    {MOCK_LAPSED_CLIENTS.map((client) => (
                        <View key={client.id} style={styles.clientCard}>
                            <View>
                                <Text style={styles.clientName}>{client.name}</Text>
                                <View style={styles.dateRow}>
                                    <Calendar size={14} color="#FF3B30" style={{ marginRight: 4 }} />
                                    <Text style={styles.lastVisit}>Absent since {client.lastVisit}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.smallBtn}>
                                <MessageCircle size={18} color="#007AFF" />
                            </TouchableOpacity>
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

    heroCard: { backgroundColor: '#AF52DE', borderRadius: 20, padding: 24, marginBottom: 32, shadowColor: '#AF52DE', shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
    heroHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    heroTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 8 },
    heroValue: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
    heroSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 },

    actionSection: { marginBottom: 32 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 4 },
    sectionSub: { fontSize: 14, color: '#666', marginBottom: 16 },

    autoButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#25D366', paddingVertical: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
    autoButtonDisabled: { backgroundColor: '#A5D6A7' },
    autoButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

    listSection: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    listTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 },

    clientCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    clientName: { fontSize: 16, fontWeight: '600', color: '#111' },
    dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    lastVisit: { fontSize: 13, color: '#FF3B30', fontWeight: '500' },
    smallBtn: { padding: 8, backgroundColor: '#E3F2FD', borderRadius: 8 },
});
