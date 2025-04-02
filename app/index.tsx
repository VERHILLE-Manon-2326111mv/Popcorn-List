import React, {useEffect, useState} from 'react';
import { Button, TextStyle, Text, View, ActivityIndicator, ScrollView, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { fetchMovies, fetchMoviesByGenre } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import {useMovieContext} from "@/context/MovieContext";

import SearchBar from '@/components/SearchBar';
import GenresList from "@/components/GenreList";

export default function Index() {
    const {language} = useMovieContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [genreId, setGenreId] = useState<number | null>(null);

    const {
        data: movies = [],
        loading,
        error,
        refetch: loadMovies
    } = useFetch(() => fetchMovies({ query: searchQuery, language}));

    const handleGenreChange = (id: number) => {
        console.log("Genre sélectionné:", id);
        setGenreId(id);
    };

    useEffect(() => {
        if (genreId !== null) {
            loadMovies(() => fetchMoviesByGenre(genreId, language));
        }
    }, [genreId]);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies(() => fetchMovies({ query: searchQuery, language }));
            } else {
                loadMovies(() => fetchMovies({ query: "", language }));
            }
        }, 750);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>PopCornList 🍿</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#FF6347"
                        style={styles.activityIndicator}
                    />
                ) : error ? (
                    <Text>Error: {error?.message}</Text>
                ) : (
                    <View style={styles.moviesContainer}>
                        <SearchBar
                            placeholder="🔍 Rechercher un film"
                            value={searchQuery}
                            onChangeText={(text: string) => setSearchQuery(text)}
                        />

                        <GenresList onSelectGenre={handleGenreChange} />

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#FF6347"/>
                        )}

                        {error && (
                            <Text>
                                Error: {error ?? "Une erreur inconnue s'est produite"}
                            </Text>
                        )}

                        {(!loading && !error && searchQuery.trim() && (movies   ?? []).length > 0 && (
                            <Text style={styles.searchResultText}>
                                Résultats pour{' '}
                                <Text style={styles.queryText}>"{searchQuery}"</Text>
                            </Text>
                        )) || (
                            <Text style={styles.latestMoviesText}>📌 Dernières sorties</Text>
                        )}

                        <FlatList
                            data={movies}
                            renderItem={({ item }) => <MovieCard {...item} />}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            columnWrapperStyle={styles.flatListColumn}
                            style={styles.flatList}
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

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
        marginBottom: 10,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    },
    subHeaderText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    } as TextStyle,
    scrollView: {
        flex: 1,
        paddingHorizontal: 12,
    },
    scrollViewContent: {
        minHeight: '100%',
        paddingBottom: 20,
    },
    activityIndicator: {
        marginTop: 20,
        alignSelf: 'center',
    },
    moviesContainer: {
        flex: 1,
        marginTop: 5,
    },
    searchResultText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    queryText: {
        fontWeight: 'bold',
        color: '#FF6347',
    },
    latestMoviesText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    flatList: {
        marginTop: 5,
        paddingBottom: 32,
    },
    flatListColumn: {
        justifyContent: 'flex-start',
        gap: 20,
        paddingRight: 5,
        marginBottom: 15,
    },
});