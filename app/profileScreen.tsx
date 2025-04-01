import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useMovieContext } from "@/context/MovieContext";
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
    const { language, setLanguage } = useMovieContext();
    const [modalVisible, setModalVisible] = useState(false);

    // Language options
    const languages = [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'zh', name: '中文', flag: '🇨🇳' }
    ];

    // Find current language
    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    // Handle language selection
    const handleLanguageSelect = (l : string) => {
        setLanguage(l);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profil</Text>
            </View>

            <View style={styles.menuSection}>
                <Link href="/PersonalMovies" style={styles.menuItem}>
                    <Text style={styles.menuText}>🎥 Mes films vus</Text>
                </Link>
                <Link href="/PersonalMovies" style={styles.menuItem}>
                    <Text style={styles.menuText}>📌 Watchlist</Text>
                </Link>
                <Link href="/Stats" style={styles.menuItem}>
                    <Text style={styles.menuText}>📊 Stats</Text>
                </Link>
            </View>

            <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Paramètres</Text>
                <TouchableOpacity
                    style={styles.languageSelector}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.menuText}>Langue</Text>
                    <View style={styles.currentLanguage}>
                        <Text>{currentLanguage.flag}</Text>
                        <Text style={styles.languageName}>{currentLanguage.name}</Text>
                        <Ionicons name="chevron-down" size={20} color="#666" />
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choisir une langue</Text>
                        <FlatList
                            data={languages}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.languageOption,
                                        item.code === language && styles.selectedLanguage
                                    ]}
                                    onPress={() => handleLanguageSelect(item.code)}
                                >
                                    <Text style={styles.languageFlag}>{item.flag}</Text>
                                    <Text style={styles.languageText}>{item.name}</Text>
                                    {item.code === language && (
                                        <Ionicons name="checkmark" size={20} color="#FF6347" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    header: {
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    menuSection: {
        marginBottom: 30,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 10,
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    menuText: {
        fontSize: 16,
        color: 'white',
    },
    settingsSection: {
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    languageSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    currentLanguage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    languageName: {
        color: '#888',
        marginRight: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    selectedLanguage: {
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
    },
    languageFlag: {
        fontSize: 20,
        marginRight: 10,
    },
    languageText: {
        fontSize: 16,
        color: 'white',
        flex: 1,
    },
    closeButton: {
        backgroundColor: '#FF6347',
        padding: 12,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default ProfileScreen;