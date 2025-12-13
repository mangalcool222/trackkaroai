import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Check } from 'lucide-react-native';

import { useLanguage } from '../../../core/i18n/LanguageContext';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi (हिंदी)' },
    { code: 'sat', label: 'Santhali (Ol Chiki)' },
    { code: 'bn', label: 'Bengali (বাংলা)' },
    { code: 'or', label: 'Odia (ଓଡ଼ିଆ)' },
    { code: 'bho', label: 'Bhojpuri (भोजपुरी)' },
];

export const LanguageSelectorScreen = () => {
    const navigation = useNavigation();
    const { language, setLanguage } = useLanguage();
    // Local state to track selection before saving
    const [selectedLang, setSelectedLang] = useState(language);

    // Sync local state if context changes externally (optional but good practice)
    useEffect(() => {
        setSelectedLang(language);
    }, [language]);

    const handleSave = async () => {
        await setLanguage(selectedLang);
        Alert.alert('Language Updated', 'Your app language preference has been saved.', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.header}>Select App Language</Text>
                <Text style={styles.subtext}>Choose your preferred language for the interface.</Text>

                <View style={styles.list}>
                    {LANGUAGES.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[styles.item, selectedLang === lang.code && styles.selectedItem]}
                            onPress={() => setSelectedLang(lang.code as any)}
                        >
                            <Text style={[styles.langText, selectedLang === lang.code && styles.selectedLangText]}>
                                {lang.label}
                            </Text>
                            {selectedLang === lang.code && <Check size={20} color="#007AFF" />}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Apply Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#111' },
    subtext: { fontSize: 16, color: '#666', marginBottom: 24 },
    list: { backgroundColor: '#f9f9f9', borderRadius: 12, overflow: 'hidden' },
    item: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    selectedItem: { backgroundColor: '#f0f9ff' },
    langText: { fontSize: 16, color: '#333' },
    selectedLangText: { fontWeight: '600', color: '#007AFF' },
    footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
    saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
