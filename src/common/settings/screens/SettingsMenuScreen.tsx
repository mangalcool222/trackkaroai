import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, User, FileText, Globe, LogOut } from 'lucide-react-native';
import { useAuth } from '../../../core/auth/AuthContext';
import { useVertical } from '../../../core/VerticalContext';

export const SettingsMenuScreen = ({ navigation }: any) => {
    const { logout } = useAuth();
    const { setVertical } = useVertical(); // Get context to clear vertical explicitly if needed

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        // First clear vertical so we don't end up in an invalid state if we relogin
                        await setVertical(null);
                        await logout();
                    }
                }
            ]
        );
    };

    const MenuItem = ({ icon: Icon, label, onPress, color = '#333' }: any) => (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                    <Icon size={20} color={color} />
                </View>
                <Text style={[styles.itemText, { color }]}>{label}</Text>
            </View>
            <ChevronRight size={20} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>Settings</Text>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionHeader}>Account</Text>
                <View style={styles.section}>
                    <MenuItem
                        icon={User}
                        label="My Business Profile"
                        onPress={() => navigation.navigate('BusinessProfile')}
                        color="#007AFF"
                    />
                    <MenuItem
                        icon={FileText}
                        label="GST Details"
                        onPress={() => navigation.navigate('GSTDetails')}
                        color="#AF52DE"
                    />
                </View>

                <Text style={styles.sectionHeader}>App Settings</Text>
                <View style={styles.section}>
                    <MenuItem
                        icon={Globe}
                        label="Language"
                        onPress={() => navigation.navigate('LanguageSelector')}
                        color="#FF9500"
                    />
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut size={20} color="#FF3B30" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Version 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f7' },
    headerTitle: { fontSize: 32, fontWeight: 'bold', marginHorizontal: 20, marginTop: 16, marginBottom: 8 },
    content: { padding: 20 },
    sectionHeader: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 8, marginTop: 16, textTransform: 'uppercase' },
    section: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
    item: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    itemText: { fontSize: 16, fontWeight: '500' },

    logoutButton: {
        marginTop: 32,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
    version: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 32 },
});
