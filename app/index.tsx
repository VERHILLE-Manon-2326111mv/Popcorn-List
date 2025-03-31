import React, {useEffect, useState} from 'react';
import { Button, Text, View, ActivityIndicator, ScrollView, FlatList, StyleSheet } from "react-native";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import SearchBar from '@/components/SearchBar';

export default function Index() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);

    const {
        data: movies = [],
        loading,
        error,
        refetch: loadMovies
    } = useFetch(() => fetchMovies({ query: searchQuery }));

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                loadMovies();
            }
        }, 750);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Bienvenue sur PopCornList 🍿</Text>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
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

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000FF"/>
                        )}

                        {error && (
                            <Text>
                                Error: {error ?? "Une erreur inconnue s'est produite"}
                            </Text>
                        )}

                        {(!loading && !error && searchQuery.trim() && (movies ?? []).length > 0 && (
                            <Text style={{color:"#FFFFFF"}}>
                                Search Result for{' '}
                                <Text>{searchQuery}</Text>
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
    },
    subHeaderText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10,
    },
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
    },
    flatList: {
        marginTop: 2,
        paddingBottom: 32,
    },
    flatListColumn: {
        justifyContent: 'flex-start',
        gap: 20,
        paddingRight: 5,
        marginBottom: 10,
    }
});