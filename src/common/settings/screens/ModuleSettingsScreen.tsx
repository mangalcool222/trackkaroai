import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useModules } from '../../../core/modules/ModuleContext';
import { getModulesForVertical } from '../../../core/modules/ModuleList';
import { useVertical } from '../../../core/VerticalContext';
import { ChevronRight } from 'lucide-react-native';

export const ModuleSettingsScreen = () => {
    const { modules, toggleModule, loading } = useModules();
    const { vertical } = useVertical();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    // Determine which definitions to use based on vertical
    const moduleDefinitions = getModulesForVertical(vertical);

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.header}>Manage Features</Text>
                <Text style={styles.subHeader}>
                    Enable or disable features to customize your experience.
                </Text>

                <View style={styles.list}>
                    {moduleDefinitions.map((mod) => {
                        const isEnabled = modules[mod.id] ?? mod.defaultEnabled;
                        const Icon = mod.icon;

                        return (
                            <View key={mod.id} style={styles.card}>
                                <View style={styles.cardContent}>
                                    <View style={[styles.iconContainer, { backgroundColor: isEnabled ? '#e6f0ff' : '#f5f5f5' }]}>
                                        <Icon size={24} color={isEnabled ? '#007AFF' : '#999'} />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.label, !isEnabled && styles.disabledText]}>{mod.label}</Text>
                                        <Text style={styles.description} numberOfLines={2}>
                                            {mod.description}
                                        </Text>
                                    </View>
                                    <Switch
                                        value={isEnabled}
                                        onValueChange={() => toggleModule(mod.id)}
                                        trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
                                    />
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    list: {
        gap: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        marginRight: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    disabledText: {
        color: '#999',
    },
    description: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
});
