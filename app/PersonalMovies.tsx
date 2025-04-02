import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useMovieContext } from '@/context/MovieContext';
import MovieCard from '@/components/MovieCard';
import { router } from "expo-router";

const PersonalMovies = () => {
    const { watchList, wishList } = useMovieContext();
    const [showWatchList, setShowWatchList] = useState(true);

    const toggleList = () => {
        setShowWatchList(!showWatchList);
    };

    const currentList = showWatchList ? watchList : wishList;
    const listTitle = showWatchList ? 'Films visionnés' : 'Liste de souhaits';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mes Collections</Text>
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push("/profileScreen")}
            >
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, showWatchList && styles.activeToggle]}
                    onPress={() => setShowWatchList(true)}
                >
                    <Ionicons name="checkmark-circle" size={20} color={showWatchList ? "#FF6347" : "#8E8E8E"} />
                    <Text style={[styles.toggleText, showWatchList && styles.activeToggleText]}>Films vus</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleButton, !showWatchList && styles.activeToggle]}
                    onPress={() => setShowWatchList(false)}
                >
                    <Ionicons name="bookmark" size={20} color={!showWatchList ? "#FF6347" : "#8E8E8E"} />
                    <Text style={[styles.toggleText, !showWatchList && styles.activeToggleText]}>À voir</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.listTitle}>{listTitle}</Text>

            <View style={styles.infoBox}>
                <Ionicons
                    name={showWatchList ? "film-outline" : "time-outline"}
                    size={22}
                    color="#FF6347"
                />
                <Text style={styles.numberText}>
                    {currentList.length} film{currentList.length > 1 ? 's' : ''} {showWatchList ? 'visionné' : 'à voir'}
                </Text>
            </View>

            {currentList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name={showWatchList ? "videocam-off" : "add-circle"}
                        size={60}
                        color="#444"
                    />
                    <Text style={styles.emptyText}>
                        {showWatchList
                            ? "Vous n'avez pas encore visionné de films"
                            : "Votre liste de souhaits est vide"}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={currentList}
                    renderItem={({ item }) => <MovieCard {...item} />}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={styles.flatListColumn}
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        backgroundColor: '#1E1E1E',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: '#FF6347',
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    toggleContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        marginHorizontal: 20,
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 4,
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
    },
    activeToggle: {
        backgroundColor: 'rgba(255, 99, 71, 0.15)',
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#8E8E8E',
        marginLeft: 8,
    },
    activeToggleText: {
        color: '#FF6347',
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 10,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 12,
        marginHorizontal: 20,
        marginBottom: 15,
    },
    numberText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60,
    },
    emptyText: {
        color: '#8E8E8E',
        fontSize: 16,
        marginTop: 15,
        textAlign: 'center',
        maxWidth: '70%',
    },
    flatList: {
        marginTop: 5,
        paddingBottom: 20,
    },
    flatListContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    flatListColumn: {
        justifyContent: 'flex-start',
        gap: 20,
        marginBottom: 20,
    },
});

export default PersonalMovies;