import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, FlatList, TextStyle} from 'react-native';
import { useMovieContext } from '@/context/MovieContext';
import MovieCard from '@/components/MovieCard';
import data_profile from '@/data_profile.json';
console.log(data_profile);

const PersonalMovies = () => {
    const { watchList, wishList } = useMovieContext();
    const [showWatchList, setShowWatchList] = useState(true);

    const toggleList = () => {
        setShowWatchList(!showWatchList);
    };

    const currentList = showWatchList ? watchList : wishList;
    const listTitle = showWatchList ? 'Liste de films vus' : 'Liste de souhait';

    return (
        <View style={styles.container}>
            <Button title={`Afficher la ${showWatchList ? 'liste de souhait' : 'liste de films vus'}`} onPress={toggleList} />
            <Text style={styles.title}>{listTitle}</Text>
            <Text style={styles.numberText}>
                Nombre de films {showWatchList ? 'vues' : 'dans la liste de souhaits'}: {currentList.length}
            </Text>
            {
                showWatchList ? <Text style={styles.numberText}>Durée total : {
                        currentList.length == 0 ? "0 min" : currentList.reduce((sum, item) => sum + item.runtime, 0) + " min"
                    }</Text> :
                    <Text style={styles.numberText}>Durée total à regarder : {
                        currentList.length == 0 ? "0 min" : currentList.reduce((sum, item) => sum + item.runtime, 0) + " min"
                    }</Text>
            };
            {
                showWatchList ? <Text style={styles.numberText}>Durée moyenne films vues : {
                        currentList.length == 0 ? "0 min" : (currentList.reduce((sum, item) => sum + item.runtime, 0))/currentList.length + " min"
                    }</Text> :
                    <Text style={styles.numberText}>Durée moyenne films à regarder : {
                        currentList.length == 0 ? "0 min" : (currentList.reduce((sum, item) => sum + item.runtime, 0))/currentList.length + " min"
                    }</Text>
            };

            <FlatList
                data={currentList}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={styles.flatListColumn}
                style={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    numberText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
    } as TextStyle,
    flatList: {
        marginTop: 10,
    },
    flatListColumn: {
        justifyContent: 'flex-start',
        gap: 20,
        paddingRight: 5,
        marginBottom: 10,
    },
});

export default PersonalMovies;