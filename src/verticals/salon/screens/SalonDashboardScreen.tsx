import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useModules } from '../../../core/modules/ModuleContext';
import { SALON_MODULES } from '../../../core/modules/ModuleList';
import { Plus, Users, Calendar, CreditCard, Grid } from 'lucide-react-native';

export const SalonDashboardScreen = ({ navigation }: any) => {
    const { isModuleEnabled } = useModules();

    const QuickAction = ({ icon: Icon, label, onPress, visible }: any) => {
        if (!visible) return null;
        return (
            <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                <View style={[styles.iconCircle, { backgroundColor: '#e6f0ff' }]}>
                    <Icon size={24} color="#007AFF" />
                </View>
                <Text style={styles.actionLabel}>{label}</Text>
            </TouchableOpacity>
        );
    };

    const StatCard = ({ title, value, icon: Icon, color, visible }: any) => {
        if (!visible) return null;
        return (
            <View style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
                    <Icon size={20} color={color} />
                </View>
                <View>
                    <Text style={styles.statValue}>{value}</Text>
                    <Text style={styles.statLabel}>{title}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.businessName}>Luxe Salon</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Text style={styles.profileInitials}>LS</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions - Dynamic */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        <QuickAction
                            icon={Calendar}
                            label="New Booking"
                            visible={isModuleEnabled('appointments')}
                            onPress={() => navigation.navigate('AddAppointment')}
                        />
                        <QuickAction
                            icon={Users}
                            label="Add Client"
                            visible={isModuleEnabled('customers')}
                            onPress={() => navigation.navigate('AddCustomer')}
                        />
                        <QuickAction
                            icon={CreditCard}
                            label="Quick Bill"
                            visible={isModuleEnabled('billing')}
                            onPress={() => navigation.navigate('Billing')} // Navigate to Billing Tab
                        />
                        <QuickAction
                            icon={Users}
                            label="Add Staff"
                            visible={isModuleEnabled('staff')}
                            onPress={() => navigation.navigate('AddStaff')}
                        />
                        {!isModuleEnabled('appointments') && !isModuleEnabled('customers') && !isModuleEnabled('billing') && !isModuleEnabled('staff') && (
                            <Text style={styles.emptyState}>Enable modules in Settings to see actions.</Text>
                        )}
                    </View>
                </View>

                {/* Overview Stats - Dynamic */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <View style={styles.statsGrid}>
                        <StatCard
                            title="Appointments"
                            value="12"
                            icon={Calendar}
                            color="#007AFF"
                            visible={isModuleEnabled('appointments')}
                        />
                        <StatCard
                            title="Active Clients"
                            value="148"
                            icon={Users}
                            color="#34C759"
                            visible={isModuleEnabled('customers')}
                        />
                        <StatCard
                            title="Today's Sales"
                            value="₹12,450"
                            icon={CreditCard}
                            color="#FF9500"
                            visible={isModuleEnabled('billing')}
                        />
                        <StatCard
                            title="Staff Active"
                            value="5"
                            icon={Users}
                            color="#AF52DE"
                            visible={isModuleEnabled('staff')}
                        />
                    </View>
                    {!isModuleEnabled('appointments') && !isModuleEnabled('customers') && !isModuleEnabled('billing') && !isModuleEnabled('staff') && (
                        <Text style={styles.emptyState}>Enable modules in Settings to see stats.</Text>
                    )}
                </View>

                {/* Active Modules Visualizer (Optional, good for feedback) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Active Modules</Text>
                    <View style={styles.moduleTags}>
                        {SALON_MODULES.map(m => (
                            isModuleEnabled(m.id) && (
                                <View key={m.id} style={styles.moduleTag}>
                                    <Text style={styles.moduleTagText}>{m.label}</Text>
                                </View>
                            )
                        ))}
                        {SALON_MODULES.every(m => !isModuleEnabled(m.id)) && (
                            <Text style={styles.emptyState}>No modules active.</Text>
                        )}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    greeting: {
        fontSize: 14,
        color: '#666',
    },
    businessName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitials: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    actionButton: {
        width: '47%', // Roughly 2 cols
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    emptyState: {
        color: '#999',
        fontStyle: 'italic',
        fontSize: 14,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    statIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    moduleTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    moduleTag: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
    },
    moduleTagText: {
        fontSize: 12,
        color: '#666',
    },
});
