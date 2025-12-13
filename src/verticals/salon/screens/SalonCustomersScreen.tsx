import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, User, Phone, MessageCircle } from 'lucide-react-native';

import { useSalon } from '../context/SalonContext';

export const SalonCustomersScreen = ({ navigation, route }: any) => {
    const { clients } = useSalon();
    const { filter } = route.params || {};
    const [searchQuery, setSearchQuery] = useState('');

    // Filter Logic
    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone.includes(searchQuery);

        if (filter === 'new_clients_7_days') {
            return matchesSearch && (client.status === 'New');
        }
        return matchesSearch;
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Clients</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddCustomer')}
                >
                    <Plus size={20} color="#fff" style={{ marginRight: 4 }} />
                    <Text style={styles.addButtonText}>Add Client</Text>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Search size={20} color="#999" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name, phone..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Client List */}
            <FlatList
                data={filteredClients}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ClientDetail', { clientId: item.id, clientName: item.name })}
                    >
                        <View style={styles.cardLeft}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{item.name[0]}</Text>
                            </View>
                            <View>
                                <Text style={styles.cardName}>{item.name}</Text>
                                <Text style={styles.cardSub}>{item.phone} • {item.lastService}</Text>
                                <Text style={styles.lastVisit}>Last visit: {item.lastVisit}</Text>
                            </View>
                        </View>
                        <View style={styles.cardRight}>
                            <View style={[styles.statusBadge, {
                                backgroundColor: item.status === 'New' ? '#E3F2FD' : item.status === 'VIP' ? '#FFF8E1' : '#F1F8E9'
                            }]}>
                                <Text style={[styles.statusText, {
                                    color: item.status === 'New' ? '#1976D2' : item.status === 'VIP' ? '#FBC02D' : '#388E3C'
                                }]}>{item.status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold' },
    addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    addButtonText: { color: '#fff', fontWeight: '600' },

    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, marginTop: 10, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },

    listContent: { padding: 20 },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 },
    cardLeft: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { fontSize: 18, fontWeight: 'bold', color: '#555' },
    cardName: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    cardSub: { fontSize: 13, color: '#666', marginTop: 2 },
    lastVisit: { fontSize: 12, color: '#999', marginTop: 2 },

    cardRight: { alignItems: 'flex-end' },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 12, fontWeight: '600' },
});
