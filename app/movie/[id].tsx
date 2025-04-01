import {
    View,
    Text,
    Image,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    StyleSheet, TextStyle,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import useFetch from "@/services/useFetch";
import { fetchMovieDetail } from "@/services/api";

import { useTodoContext } from "@/context/TodoContext";
import {useState} from "react";

import ModalNotation from "@/components/ModalNotation";

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View style={styles.movieInfoContainer}>
        <Text style={styles.movieInfoLabel}>{label}</Text>
        <Text style={styles.movieInfoValue}>
            {value || "N/A"}
        </Text>
    </View>
);


const Details = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(-1);
    const [comment, setComment] = useState("");
    const { watchList, setWatchList, wishList, setWishList , ratingList, commentList} = useTodoContext();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { data: movie, loading } = useFetch(() =>
        fetchMovieDetail(id as string), [id]
    );

    const handleRating = (ratingMovie: number, commentMovie: string, id: number) => {
        if (rating == -1){
            setRating(ratingMovie);
        }
        if (comment == ""){
            setComment(commentMovie);
        }
    }

    const isInWishList = wishList.some(wishListMovie => wishListMovie.id === movie?.id);
    const isInWatchList = watchList.some(watchListMovie => watchListMovie.id === movie?.id);

    const handleAddToWishList = () => {
        if (movie) {
            if (isInWishList) {
                setWishList(wishList.filter(wishListMovie => wishListMovie.id !== movie.id));
            } else {
                setWishList([...wishList, movie]);
            }
        }
    };

    const handleAddToWatchList = () => {
        if (movie) {
            if (isInWatchList) {
                setWatchList(watchList.filter(watchListMovie => watchListMovie.id !== movie.id));
            } else {
                setWatchList([...watchList, movie]);
            }
        }
    };



    if (loading)
        return (
            <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator />
            </SafeAreaView>
        );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                        }}
                        style={styles.posterImage}
                        resizeMode="stretch"
                    />
                </View>

                <View style={styles.movieDetailsContainer}>
                    <Text style={styles.movieTitle}>{movie?.title}</Text>

                    <View style={styles.movieRuntimeContainer}>
                        <Text style={styles.movieRuntimeText}></Text>
                        <Text style={styles.movieRuntimeText}>{movie?.runtime}m</Text>
                    </View>

                    <View style={styles.movieRatingContainer}>
                        <Text style={styles.movieRatingText}>
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>
                        <Text style={styles.movieVoteCountText}>
                            ({movie?.vote_count} votes)
                        </Text>

                    </View>


                    <MovieInfo label="Synopsie" value={movie?.overview} />
                    <MovieInfo
                        label="Genres"
                        value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
                    />

                    <View style={styles.movieBudgetRevenueContainer}>
                        <MovieInfo
                            label="Budget"
                            value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
                        />
                        <MovieInfo
                            label="Revenue"
                            value={`$${Math.round(
                                (movie?.revenue ?? 0) / 1_000_000
                            )} million`}
                        />
                    </View>

                    <MovieInfo
                        label="Production Companies"
                        value={
                            movie?.production_companies?.map((c) => c.name).join(" • ") ||
                            "N/A"
                        }
                    />

                    {ratingList.some(r => r.id === movie?.id) && (
                        <View style={styles.personalRatingContainer}>
                            <Text style={styles.personalRatingText}>
                                Votre note : {ratingList.find(r => r.id === movie?.id)?.rating} / 5
                            </Text>
                        </View>
                    )}

                    {commentList.some(c => c.id === movie?.id) && (
                        <View style={styles.personalCommentContainer}>
                            <Text style={styles.personalCommentText}>
                                Votre commentaire : {commentList.find(c => c.id === movie?.id)?.comment}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.rateButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>⭐ Noter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleAddToWishList}>
                    <Text style={styles.buttonText}>{isInWishList ? "❤️" : "🖤"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleAddToWatchList}>
                    <Text style={styles.buttonText}>{isInWatchList ? "✔️" : "❌"}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.goBackButton}
                onPress={router.back}
            >
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>

            <ModalNotation
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleRating}
                idMovie={movie?.id}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#121212',
        flex: 1,
    },
    container: {
        backgroundColor: '#121212',
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    posterImage: {
        width: '100%',
        height: 550,
    },
    movieDetailsContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    movieTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
    movieRuntimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
    },
    movieRuntimeText: {
        color: '#B0B0B0',
        fontSize: 14,
    },
    movieRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
        marginTop: 8,
    },
    movieRatingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    movieVoteCountText: {
        color: '#B0B0B0',
        fontSize: 14,
    },
    movieInfoContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 20,
    },
    movieInfoLabel: {
        color: '#B0B0B0',
        fontSize: 14,
    },
    movieInfoValue: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 8,
    },
    movieBudgetRevenueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        backgroundColor: '#FF6347',
        borderRadius: 50,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    } as TextStyle,
    goBackButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#FF6347',
        borderRadius: 50,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 50,
    },

    goBackText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },

    rateButton: {
        backgroundColor: '#FF6347',
        borderRadius: 50,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }, personalRatingContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
    },
    personalRatingText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    personalCommentContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
    },
    personalCommentText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }

});

export default Details;