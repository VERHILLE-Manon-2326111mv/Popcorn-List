import React from 'react';
import {Button, Text, View, ActivityIndicator, ScrollView, FlatList, StyleSheet, TextStyle} from "react-native";
import { router } from "expo-router";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import {useMovieContext} from "@/context/MovieContext";

export default function Index() {
    const {language} = useMovieContext();

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "", language}));

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Bienvenue sur PopCornList 🍿</Text>
            <Text style={styles.subHeaderText}>📌 Dernières sorties</Text>
            <Text style={styles.subHeaderText}>🔍 Rechercher un film</Text>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {moviesLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        style={styles.activityIndicator}
                    />
                ) : moviesError ? (
                    <Text>Error: {moviesError?.message}</Text>
                ) : (
                    <View style={styles.moviesContainer}>
                        <Text style={styles.latestMoviesText}>Derniers films</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
    } as TextStyle,
    subHeaderText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    } as TextStyle,
    scrollView: {
        flex: 1,
        paddingHorizontal: 5,
    },
    scrollViewContent: {
        minHeight: '100%',
        paddingBottom: 10,
    },
    activityIndicator: {
        marginTop: 10,
        alignSelf: 'center',
    },
    moviesContainer: {
        flex: 1,
        marginTop: 5,
    },
    latestMoviesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 5,
        marginBottom: 3,
    } as TextStyle,
    flatList: {
        marginTop: 2,
        paddingBottom: 32,
    },
    flatListColumn: {
        justifyContent: 'flex-start',
        gap: 20,
        paddingRight: 5,
        marginBottom: 10,
    },
});