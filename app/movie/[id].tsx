import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetail } from "@/services/api";

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            router.replace("/");
        }
    }, [id]);

    const { data: movie, loading, error } = useFetch(() => fetchMovieDetail(id as string), !!id);

    if (!id) return null;
    if (loading) return <ActivityIndicator size="large" color="blue" />;
    if (error) return <Text>❌ Erreur : {error.message}</Text>;

    return (
        <View>
            <Text>🎬 {movie?.title}</Text>
            <Text>⭐ {movie?.vote_average} / 10</Text>
            <Text>📝 {movie?.overview}</Text>
        </View>
    );
};

export default MovieDetails;
