import { Link } from "expo-router";
import {Text, ImageBackground, TouchableOpacity, View, StyleSheet, TextStyle, ImageStyle} from "react-native";

const MovieCard = ({
                       id,
                       poster_path,
                       title,
                       vote_average,
                       release_date,
                   }: Movie) => {
    const getStarRating = (rating: number) => {
        const stars = Math.round(rating / 2);
        return '⭐'.repeat(stars) + ' ★ '.repeat(5 - stars);
    };

    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <ImageBackground
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    style={styles.imageBackground}
                    imageStyle={styles.image}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.title} numberOfLines={1}>
                            {title}
                        </Text>

                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>
                                {getStarRating(vote_average)}
                            </Text>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.releaseDate}>
                                {release_date?.split("-")[0]}
                            </Text>
                            <Text style={styles.movieLabel}>
                                Movie
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '30%',
        marginBottom: 10,
    } as TextStyle,
    imageBackground: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
    },
    image: {
        borderRadius: 10,
    } as ImageStyle,
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
    } as TextStyle,
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    } as TextStyle,
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rating: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    } as TextStyle,
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    releaseDate: {
        fontSize: 12,
        color: '#bbb',
        fontWeight: 'medium',
    }   as TextStyle,
    movieLabel: {
        fontSize: 12,
        color: '#bbb',
        fontWeight: 'medium',
        textTransform: 'uppercase',
    }   as TextStyle,
});

export default MovieCard;