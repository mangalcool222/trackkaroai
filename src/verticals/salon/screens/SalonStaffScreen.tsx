import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus } from 'lucide-react-native';

import { useSalon } from '../context/SalonContext';

export const SalonStaffScreen = ({ navigation }: any) => {
    const { staff } = useSalon();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Manage Staff</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddStaff')} style={styles.addButton}>
                    <Plus size={24} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={staff}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('StaffDetails', { staffId: item.id })}
                    >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{item.name[0]}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.role}>{item.role}</Text>
                        </View>
                        <View style={styles.statusContainer}>
                            <Text style={[
                                styles.status,
                                { color: item.status === 'Available' ? '#34C759' : item.status === 'Busy' ? '#FF3B30' : '#999' }
                            ]}>{item.status}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
    backButton: { marginRight: 16 },
    addButton: { padding: 4 },
    title: { fontSize: 20, fontWeight: 'bold', flex: 1 },
    listContent: { padding: 20 },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    avatarText: { fontSize: 20, fontWeight: 'bold', color: '#555' },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    role: { fontSize: 14, color: '#666', marginTop: 2 },
    statusContainer: { alignItems: 'flex-end' },
    status: { fontSize: 14, fontWeight: '600' },
});
