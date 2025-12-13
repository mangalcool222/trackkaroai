import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useModules } from '../../../core/modules/ModuleContext';
import { getModulesForVertical } from '../../../core/modules/ModuleList';
import { useVertical } from '../../../core/VerticalContext';

export const GymDashboard = ({ navigation }: any) => {
    const { isModuleEnabled } = useModules();
    const { vertical } = useVertical();
    const modules = getModulesForVertical(vertical);

    const QuickAction = ({ icon: Icon, label, onPress, visible }: any) => {
        if (!visible) return null;
        return (
            <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                <View style={[styles.iconCircle, { backgroundColor: '#f0fff4' }]}>
                    <Icon size={24} color="#00C853" />
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

                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.businessName}>My Gym</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Text style={styles.profileInitials}>MG</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        {modules.map(mod => (
                            <QuickAction
                                key={mod.id}
                                icon={mod.icon}
                                label={mod.label}
                                visible={isModuleEnabled(mod.id)}
                                onPress={() => { }}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <View style={styles.statsGrid}>
                        {modules.map(mod => (
                            <StatCard
                                key={mod.id}
                                title={mod.label}
                                value="--"
                                icon={mod.icon}
                                color="#00C853"
                                visible={isModuleEnabled(mod.id)}
                            />
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    greeting: { fontSize: 14, color: '#666' },
    businessName: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
    profileButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
    profileInitials: { fontSize: 16, fontWeight: '600', color: '#666' },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 16 },
    actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
    actionButton: { width: '47%', backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#eee', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    actionLabel: { fontSize: 14, fontWeight: '600', color: '#333', textAlign: 'center' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    statCard: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', gap: 12 },
    statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
    statLabel: { fontSize: 12, color: '#666' },
});
