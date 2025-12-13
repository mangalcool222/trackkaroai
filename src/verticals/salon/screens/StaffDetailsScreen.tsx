
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, DollarSign, Wallet, CreditCard, X } from 'lucide-react-native';

import { useSalon } from '../context/SalonContext';

export const StaffDetailsScreen = ({ navigation, route }: any) => {
    const { staffId } = route.params || {};
    const { staff, staffPayments, addStaffPayment } = useSalon();

    // State for Payment Modal
    const [isPayModalVisible, setPayModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [paymentType, setPaymentType] = useState<'Salary' | 'Commission' | 'Bonus' | 'Advance'>('Salary');
    const [notes, setNotes] = useState('');

    const staffMember = staff.find(s => s.id === staffId);
    const history = staffPayments.filter(p => p.staffId === staffId);

    const handleSavePayment = () => {
        if (!amount) {
            Alert.alert('Error', 'Amount is required');
            return;
        }

        addStaffPayment({
            staffId,
            amount: parseInt(amount),
            type: paymentType,
            date: new Date().toISOString().split('T')[0],
            notes
        });

        setPayModalVisible(false);
        setAmount('');
        setNotes('');
        Alert.alert('Success', 'Payment Recorded');
    };

    if (!staffMember) {
        return (
            <SafeAreaView style={styles.container}><Text>Staff not found</Text></SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>{staffMember.name}</Text>

                <TouchableOpacity
                    style={styles.payHeaderBtn}
                    onPress={() => setPayModalVisible(true)}
                >
                    <Text style={styles.payHeaderBtnText}>Pay</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Card */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Role</Text>
                            <Text style={styles.value}>{staffMember.role}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.label}>Status</Text>
                            <Text style={[styles.value, { color: staffMember.status === 'Available' ? '#34C759' : '#FF3B30' }]}>
                                {staffMember.status}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Payment History Section */}
                <Text style={styles.sectionTitle}>Payment History</Text>
                {history.length === 0 ? (
                    <Text style={styles.emptyText}>No payments recorded yet.</Text>
                ) : (
                    history.map((item) => (
                        <View key={item.id} style={styles.historyCard}>
                            <View style={styles.historyIcon}>
                                <DollarSign size={20} color="#007AFF" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.historyType}>{item.type}</Text>
                                <Text style={styles.historyDate}>{item.date}</Text>
                            </View>
                            <Text style={styles.historyAmount}>₹{item.amount}</Text>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Record Payment Modal */}
            <Modal visible={isPayModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Record Payment for {staffMember.name}</Text>
                            <TouchableOpacity onPress={() => setPayModalVisible(false)}>
                                <X size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.label}>Amount (₹)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 15000"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />

                            <Text style={styles.label}>Type</Text>
                            <View style={styles.typeRow}>
                                {['Salary', 'Commission', 'Bonus', 'Advance'].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[styles.typeChip, paymentType === type && styles.activeTypeChip]}
                                        onPress={() => setPaymentType(type as any)}
                                    >
                                        <Text style={[styles.typeText, paymentType === type && styles.activeTypeText]}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Notes</Text>
                            <TextInput
                                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                                placeholder="Optional notes..."
                                multiline
                                value={notes}
                                onChangeText={setNotes}
                            />

                            <TouchableOpacity style={styles.saveButton} onPress={handleSavePayment}>
                                <Text style={styles.saveButtonText}>Confirm Payment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
    backButton: {},
    title: { fontSize: 20, fontWeight: 'bold' },
    payHeaderBtn: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    payHeaderBtnText: { color: '#fff', fontWeight: 'bold' },

    content: { padding: 20 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    label: { fontSize: 13, color: '#666', fontWeight: '600', marginBottom: 4 },
    value: { fontSize: 16, color: '#111', fontWeight: 'bold' },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#111' },
    emptyText: { color: '#999', fontStyle: 'italic' },

    historyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    historyIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
    historyType: { fontSize: 16, fontWeight: '600' },
    historyDate: { fontSize: 13, color: '#999' },
    historyAmount: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32' },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 40 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    modalBody: { padding: 20 },
    input: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 16, fontSize: 16 },

    typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
    typeChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0' },
    activeTypeChip: { backgroundColor: '#007AFF' },
    typeText: { color: '#333', fontWeight: '600' },
    activeTypeText: { color: '#fff' },

    saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

