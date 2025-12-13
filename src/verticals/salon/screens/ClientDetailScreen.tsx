import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, MessageCircle, Calendar, Clock, Bell } from 'lucide-react-native';

export const ClientDetailScreen = ({ navigation, route }: any) => {
    const { clientId, clientName } = route.params || { clientName: 'Unknown Client' };

    const handleCall = () => {
        Linking.openURL('tel:9876543210');
    };

    const handleWhatsApp = () => {
        const message = "Hello! Aapka last haircut 25 din pehle hua tha. Kya aap next booking karna chahenge?";
        const url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=919876543210`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'WhatsApp not installed');
        });
    };

    const handleReminder = () => {
        Alert.alert("Reminder Set", "Follow-up reminder set for 7 days.");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Client Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{clientName[0]}</Text>
                    </View>
                    <Text style={styles.name}>{clientName}</Text>
                    <Text style={styles.phone}>+91 98765 43210</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>VIP Member</Text></View>

                    {/* Quick Access */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.iconBtn} onPress={handleCall}>
                            <Phone size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: '#25D366' }]} onPress={handleWhatsApp}>
                            <MessageCircle size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: '#FF9500' }]} onPress={handleReminder}>
                            <Bell size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Automation Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Engagement & Actions</Text>

                    <TouchableOpacity style={styles.actionItem} onPress={handleWhatsApp}>
                        <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
                            <MessageCircle size={20} color="#009688" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.actionTitle}>Send WhatsApp Reminder</Text>
                            <Text style={styles.actionSub}>Auto-fill: "Long time no see..."</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AddAppointment')}>
                        <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                            <Calendar size={20} color="#1976D2" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.actionTitle}>Book Next Appointment</Text>
                            <Text style={styles.actionSub}>Schedule a service now</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* History Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Visit History</Text>

                    <View style={styles.historyItem}>
                        <View>
                            <Text style={styles.historyService}>Haircut & Spa</Text>
                            <Text style={styles.historyDate}>10 Dec 2024 • 10:00 AM</Text>
                        </View>
                        <Text style={styles.historyPrice}>₹1,200</Text>
                    </View>

                    <View style={styles.historyItem}>
                        <View>
                            <Text style={styles.historyService}>Beard Trim</Text>
                            <Text style={styles.historyDate}>15 Nov 2024 • 04:30 PM</Text>
                        </View>
                        <Text style={styles.historyPrice}>₹350</Text>
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

    profileCard: { alignItems: 'center', backgroundColor: '#fff', padding: 24, borderRadius: 16, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    avatarText: { fontSize: 32, fontWeight: 'bold', color: '#555' },
    name: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 4 },
    phone: { fontSize: 16, color: '#666', marginBottom: 12 },
    badge: { backgroundColor: '#FFF8E1', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 12, marginBottom: 20 },
    badgeText: { color: '#FBC02D', fontWeight: 'bold', fontSize: 12 },

    actionRow: { flexDirection: 'row', gap: 16 },
    iconBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },

    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 12 },

    actionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    iconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    actionTitle: { fontSize: 16, fontWeight: '600', color: '#111' },
    actionSub: { fontSize: 13, color: '#666' },

    historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    historyService: { fontSize: 16, fontWeight: '600', color: '#111' },
    historyDate: { fontSize: 13, color: '#666', marginTop: 2 },
    historyPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});
