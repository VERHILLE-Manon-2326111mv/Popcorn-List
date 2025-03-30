import {
    View,
    Text,
    ActivityIndicator,
    Image,
    StyleSheet,
    ScrollView,
    Button,
    TextStyle,
    ImageStyle
} from "react-native";
import React, {useContext} from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetail } from "@/services/api";
import {useTodoContext} from "@/context/TodoContext";

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { watchList, setWatchList, wishList, setWishList } = useTodoContext();

    if (!id) {
        return <Text>❌ Erreur : Aucun identifiant de film trouvé</Text>;
    }

    const { data: movie, loading, error } = useFetch(() => fetchMovieDetail(id as string));

    if (loading) return <ActivityIndicator size="large" color="blue" />;
    if (error) return <Text>❌ Erreur : {error.message}</Text>;

    const handleAddToWishList = () => {
        if (movie) {
            if (wishList.length === 0) {
                setWishList([movie]);
            } else if (wishList.some(wishListMovie => wishListMovie.id === movie.id)) {
                setWishList(wishList.filter(wishListMovie => wishListMovie.id !== movie.id));
            } else {
                setWishList([...wishList, movie]);
            }
        }
        console.log(movie)
    };

    const handleAddToWatchList = () => {
        if (movie) {
            if (watchList.length === 0) {
                setWatchList([movie]);
            } else if (watchList.some(watchListMovie => watchListMovie.id === movie.id)) {
                setWatchList(watchList.filter(watchListMovie => watchListMovie.id !== movie.id));
            } else {
                setWatchList([...watchList, movie]);
            }
        }
        console.log(movie)

    };



    return (
        <ScrollView style={styles.container}>
            {/* Affiche du film */}
            {movie?.poster_path && (
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    style={styles.poster}
                />
            )}


            <Text style={styles.title}>
                {movie?.title} ({new Date(movie?.release_date).getFullYear()})
            </Text>

            <Text style={styles.rating}>⭐ {movie?.vote_average.toFixed(1)} / 10</Text>

            <Text style={styles.genres}>
                {movie?.genres.map((genre) => genre.name).join(", ")}
            </Text>

            <Text style={styles.duration}>⏳ {movie?.runtime} min</Text>

            <Text style={styles.overview}>{movie?.overview || "Résumé non disponible en français."}</Text>

            <View style={styles.actions}>
                <Button title="⭐ Noter" onPress={() => console.log("Noter le film")} />
                <Button title="📌 Ajouter à la wishList" onPress={handleAddToWishList} />
                <Button title="✅ Marquer comme vu" onPress={handleAddToWatchList} />
            </View>
        </ScrollView>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#121212",
    } as TextStyle,
    poster: {
        width: "100%",
        height: 400,
        borderRadius: 10,
        marginBottom: 16,
    } as ImageStyle,
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    } as TextStyle,
    rating: {
        fontSize: 18,
        color: "#ffcc00",
        textAlign: "center",
        marginVertical: 4,
    } as TextStyle,
    genres: {
        fontSize: 16,
        color: "#bbb",
        textAlign: "center",
    }  as TextStyle,
    duration: {
        fontSize: 16,
        color: "#bbb",
        textAlign: "center",
        marginVertical: 4,
    } as TextStyle,
    overview: {
        fontSize: 14,
        color: "#ddd",
        textAlign: "justify",
        marginTop: 12,
    } as TextStyle,
    actions: {
        flexDirection: "column",
        gap: 10,
        marginTop: 16,
    } as TextStyle,
});
