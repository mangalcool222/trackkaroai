import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, ChevronDown } from 'lucide-react-native';
import { useSalon } from '../context/SalonContext';

export const AddAppointmentScreen = ({ navigation }: any) => {
    const { addAppointment, clients, services, staff } = useSalon();

    const [clientName, setClientName] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [staffName, setStaffName] = useState('');
    const [time, setTime] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'client' | 'service' | 'staff' | null>(null);

    const handleSave = () => {
        if (!clientName || !serviceName || !staffName || !time) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        addAppointment({
            clientName,
            service: serviceName,
            staffName,
            time,
            date: 'Today', // simplified for now
            status: 'Confirmed'
        });

        navigation.navigate('Appointments');
    };

    const openModal = (type: 'client' | 'service' | 'staff') => {
        setModalType(type);
        setModalVisible(true);
    };

    const handleSelect = (item: any) => {
        if (modalType === 'client') setClientName(item.name);
        if (modalType === 'service') setServiceName(item.name);
        if (modalType === 'staff') setStaffName(item.name);
        setModalVisible(false);
    };

    const getDataForModal = () => {
        if (modalType === 'client') return clients;
        if (modalType === 'service') return services;
        if (modalType === 'staff') return staff;
        return [];
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>New Appointment</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <X size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Client Name</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => openModal('client')}>
                    <Text style={clientName ? styles.inputText : styles.placeholder}>{clientName || 'Select Client'}</Text>
                    <ChevronDown size={20} color="#666" />
                </TouchableOpacity>

                <Text style={styles.label}>Service</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => openModal('service')}>
                    <Text style={serviceName ? styles.inputText : styles.placeholder}>{serviceName || 'Select Service'}</Text>
                    <ChevronDown size={20} color="#666" />
                </TouchableOpacity>

                <Text style={styles.label}>Staff Member</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => openModal('staff')}>
                    <Text style={staffName ? styles.inputText : styles.placeholder}>{staffName || 'Select Staff'}</Text>
                    <ChevronDown size={20} color="#666" />
                </TouchableOpacity>

                <Text style={styles.label}>Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 10:00 AM"
                    value={time}
                    onChangeText={setTime}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select {modalType}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={getDataForModal() as any[]}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)}>
                                    <Text style={styles.modalItemText}>{item.name}</Text>
                                    {/* Show role or phone contextually if needed */}
                                    {modalType === 'staff' && <Text style={styles.modalItemSub}>{item.role}</Text>}
                                    {modalType === 'service' && <Text style={styles.modalItemSub}>₹{item.price}</Text>}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    title: { fontSize: 20, fontWeight: 'bold' },
    form: { padding: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8, marginTop: 16 },
    input: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#eee' },

    dropdown: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    inputText: { fontSize: 16, color: '#000' },
    placeholder: { fontSize: 16, color: '#999' },

    saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 32 },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '70%' },
    modalHeader: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    modalItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
    modalItemText: { fontSize: 16, fontWeight: '500' },
    modalItemSub: { fontSize: 14, color: '#666', marginTop: 4 },
});
