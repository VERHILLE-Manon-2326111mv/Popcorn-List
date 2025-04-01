import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { fetchGenres } from "@/services/api";
import { Genre } from "@/type/Genre";

const GenresList = ({ onSelectGenre }: { onSelectGenre: (genreId: number) => void }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const fetchedGenres = await fetchGenres();
                setGenres(fetchedGenres);
            } catch (error) {
                console.error("Erreur de chargement des genres:", error);
            }
        };

        getGenres();
    }, []);

    const handleSelectGenre = (genreId: number) => {
        setSelectedGenre(genreId);
        onSelectGenre(genreId);
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {genres.map((genre) => (
                <TouchableOpacity
                    key={genre.id}
                    style={[
                        styles.genreButton,
                        selectedGenre === genre.id && styles.selectedGenreButton,
                    ]}
                    onPress={() => handleSelectGenre(genre.id)}
                >
                    <Text style={styles.genreText}>{genre.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    genreButton: {
        backgroundColor: "#333",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    selectedGenreButton: {
        backgroundColor: "#FF6347",
    },
    genreText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default GenresList;
