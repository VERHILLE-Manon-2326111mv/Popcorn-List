import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList } from 'react-native';
import { useTodoContext } from '@/context/TodoContext';
import MovieCard from '@/components/MovieCard';

const PersonalMovies = () => {
    const { watchList, wishList } = useTodoContext();
    const [showWatchList, setShowWatchList] = useState(true);

    const toggleList = () => {
        setShowWatchList(!showWatchList);
    };

    const currentList = showWatchList ? watchList : wishList;
    const listTitle = showWatchList ? 'WatchList' : 'WishList';

    return (
        <View style={styles.container}>
            <Button title={`Switch to ${showWatchList ? 'WishList' : 'WatchList'}`} onPress={toggleList} />
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
    },
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