import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSalon, Service, Client } from '../context/SalonContext';
import { Plus, Trash2, FileText, CheckCircle, ChevronDown, User } from 'lucide-react-native';

export const SalonBillingScreen = ({ navigation }: any) => {
    const { clients, services, addInvoice, invoices } = useSalon();
    const [activeTab, setActiveTab] = useState<'New' | 'History'>('New');

    // POS State
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [cart, setCart] = useState<Service[]>([]);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const totalAmount = cart.reduce((sum, item) => sum + parseInt(item.price), 0);

    const handleCheckout = () => {
        if (!selectedClient || cart.length === 0) return;

        addInvoice({
            clientName: selectedClient.name,
            items: cart.map(s => ({ name: s.name, price: parseInt(s.price) })),
            total: totalAmount,
            date: new Date().toISOString().split('T')[0],
            status: 'Paid'
        });

        setIsSuccessModalVisible(true);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalVisible(false);
        setCart([]);
        setSelectedClient(null);
        setActiveTab('History');
    };

    const renderNewBill = () => (
        <ScrollView contentContainerStyle={styles.posContainer} showsVerticalScrollIndicator={false}>
            {/* 1. Customer Selection */}
            <Text style={styles.label}>Customer</Text>
            <TouchableOpacity style={styles.inputSelector} onPress={() => setIsClientModalOpen(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <User size={20} color={selectedClient ? "#000" : "#999"} style={{ marginRight: 10 }} />
                    <Text style={[styles.inputText, !selectedClient && { color: '#999' }]}>
                        {selectedClient ? selectedClient.name : 'Select Customer'}
                    </Text>
                </View>
                <ChevronDown size={20} color="#999" />
            </TouchableOpacity>

            {/* 2. Services Section */}
            <View style={styles.sectionRow}>
                <Text style={styles.label}>Services</Text>
                <TouchableOpacity onPress={() => setIsServiceModalOpen(true)} style={styles.addBtnSmall}>
                    <Plus size={16} color="#007AFF" />
                    <Text style={styles.addBtnText}>Add Service</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cartContainer}>
                {cart.length === 0 ? (
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyText}>No services added yet</Text>
                    </View>
                ) : (
                    cart.map((item, index) => (
                        <View key={index} style={styles.cartItem}>
                            <Text style={styles.cartItemName}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                                <TouchableOpacity onPress={() => setCart(cart.filter((_, i) => i !== index))} style={styles.trashBtn}>
                                    <Trash2 size={18} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </View>

            {/* 3. Total & Checkout */}
            <View style={styles.summaryFooter}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Amount</Text>
                    <Text style={styles.summaryValue}>₹{totalAmount}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.payButton, (!selectedClient || cart.length === 0) && { opacity: 0.5 }]}
                    onPress={handleCheckout}
                    disabled={!selectedClient || cart.length === 0}
                >
                    <Text style={styles.payButtonText}>Collect Payment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    const renderHistory = () => (
        <FlatList
            data={invoices}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.historyCard}>
                    <View style={styles.iconBox}>
                        <FileText size={20} color="#007AFF" />
                    </View>
                    <View style={styles.historyInfo}>
                        <Text style={styles.historyName}>{item.clientName}</Text>
                        <Text style={styles.historyItems} numberOfLines={1}>
                            {item.items.map(i => i.name).join(', ')}
                        </Text>
                        <Text style={styles.historyDate}>{item.date}</Text>
                    </View>
                    <View style={styles.historyRight}>
                        <Text style={styles.historyAmount}>₹{item.total}</Text>
                        <View style={styles.paidBadge}>
                            <Text style={styles.paidText}>PAID</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            ListEmptyComponent={
                <View style={styles.emptyState}>
                    <FileText size={48} color="#ccc" />
                    <Text style={styles.emptyStateText}>No billing history yet</Text>
                </View>
            }
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Billing & POS</Text>
            </View>

            {/* Custom Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'New' && styles.activeTab]}
                    onPress={() => setActiveTab('New')}
                >
                    <Text style={[styles.tabText, activeTab === 'New' && styles.activeTabText]}>New Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'History' && styles.activeTab]}
                    onPress={() => setActiveTab('History')}
                >
                    <Text style={[styles.tabText, activeTab === 'History' && styles.activeTabText]}>History</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'New' ? renderNewBill() : renderHistory()}

            {/* Selection Modals */}
            <SelectionModal
                visible={isClientModalOpen}
                title="Select Customer"
                data={clients}
                onSelect={(item: Client) => { setSelectedClient(item); setIsClientModalOpen(false); }}
                onClose={() => setIsClientModalOpen(false)}
                type="client"
            />
            <SelectionModal
                visible={isServiceModalOpen}
                title="Select Service"
                data={services}
                onSelect={(item: Service) => { setCart([...cart, item]); setIsServiceModalOpen(false); }}
                onClose={() => setIsServiceModalOpen(false)}
                type="service"
            />

            {/* Success Modal */}
            <Modal visible={isSuccessModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.successCard}>
                        <View style={styles.successIcon}>
                            <CheckCircle size={40} color="#fff" />
                        </View>
                        <Text style={styles.successTitle}>Payment Collected!</Text>
                        <Text style={styles.successSub}>Invoice has been generated successfully.</Text>
                        <TouchableOpacity style={styles.successBtn} onPress={closeSuccessModal}>
                            <Text style={styles.successBtnText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

// Helper Modal Component
const SelectionModal = ({ visible, title, data, onSelect, onClose, type }: any) => (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.modalItem} onPress={() => onSelect(item)}>
                        <View>
                            <Text style={styles.modalItemTitle}>{item.name}</Text>
                            {type === 'client' && <Text style={styles.modalSub}>{item.phone}</Text>}
                            {type === 'service' && <Text style={styles.modalSub}>₹{item.price}</Text>}
                        </View>
                        {type === 'service' && <Plus size={20} color="#007AFF" />}
                    </TouchableOpacity>
                )}
            />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fb' },
    header: { padding: 20, backgroundColor: '#fff' },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111' },

    tabContainer: { flexDirection: 'row', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
    tab: { paddingVertical: 12, marginRight: 24, borderBottomWidth: 3, borderBottomColor: 'transparent' },
    activeTab: { borderBottomColor: '#000' },
    tabText: { fontSize: 16, color: '#999', fontWeight: '600' },
    activeTabText: { color: '#000' },

    posContainer: { padding: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
    inputSelector: {
        backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee',
        marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    inputText: { fontSize: 16, fontWeight: '500', color: '#111' },

    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    addBtnSmall: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    addBtnText: { color: '#007AFF', fontWeight: '600', fontSize: 14, marginLeft: 4 },

    cartContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 4, minHeight: 100, marginBottom: 24 },
    emptyCart: { padding: 30, alignItems: 'center' },
    emptyText: { color: '#ccc' },
    cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', alignItems: 'center' },
    cartItemName: { fontSize: 16, fontWeight: '500', color: '#111' },
    cartItemPrice: { fontSize: 15, fontWeight: '600', color: '#111', marginRight: 12 },
    trashBtn: { padding: 4 },

    summaryFooter: {},
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
    summaryLabel: { fontSize: 18, fontWeight: 'bold', color: '#666' },
    summaryValue: { fontSize: 28, fontWeight: 'bold', color: '#111' },

    payButton: { backgroundColor: '#000', padding: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

    // History
    listContent: { padding: 20 },
    historyCard: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 4 },
    iconBox: { width: 44, height: 44, backgroundColor: '#E3F2FD', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    historyInfo: { flex: 1 },
    historyName: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    historyItems: { color: '#666', fontSize: 13, marginTop: 2 },
    historyDate: { color: '#999', fontSize: 12, marginTop: 4 },
    historyRight: { alignItems: 'flex-end' },
    historyAmount: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    paidBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginTop: 4 },
    paidText: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold' },
    emptyState: { alignItems: 'center', marginTop: 50 },
    emptyStateText: { marginTop: 16, color: '#999', fontSize: 16 },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    successCard: { backgroundColor: '#fff', width: '80%', padding: 30, borderRadius: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 },
    successIcon: { width: 70, height: 70, backgroundColor: '#34C759', borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    successTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
    successSub: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
    successBtn: { backgroundColor: '#000', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 14 },
    successBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

    modalContainer: { flex: 1, backgroundColor: '#f8f9fb', paddingTop: 20 },
    modalHeader: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
    modalTitle: { fontSize: 20, fontWeight: 'bold' },
    closeText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
    modalItem: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    modalItemTitle: { fontSize: 16, fontWeight: '500' },
    modalSub: { color: '#666', fontSize: 14, marginTop: 2 },
});
