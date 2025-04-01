import {Text, StyleSheet, ScrollView} from "react-native";
import React from "react";
import {useTodoContext} from "@/context/TodoContext";

const Statistics = () => {
    const { watchList, wishList} = useTodoContext();


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Statistiques profil:</Text>
            {
                <>
                    <Text style={styles.text}>Durée total
                    : {watchList.length == 0 ? "Aucun film vue." : watchList.reduce((sum, item) => sum + item.runtime, 0) + " min"}
                    </Text>
                    <Text style={styles.text}>Durée moyenne films vues
                    : {watchList.length == 0 ? "Aucun film vue." : (watchList.reduce((sum, item) => sum + item.runtime, 0)) / watchList.length + " min"}</Text>
                    <Text style={styles.text}>Durée total à regarder
                    : {wishList.length == 0 ? "Aucun film dans la liste de souhaits." : wishList.reduce((sum, item) => sum + item.runtime, 0) + " min"}</Text>
                    <Text style={styles.text}>Durée moyenne films à regarder
                    : {wishList.length == 0 ? "Aucun film dans la liste de souhaits." : (wishList.reduce((sum, item) => sum + item.runtime, 0)) / wishList.length + " min"}</Text>
                </>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10
    },
    text: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 10,
        textAlign: "center",
        color: 'white',
        backgroundColor: 'black',
        marginTop: 20,
        fontSize: 25
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        backgroundColor: 'rgba(33,150,243,0.9)',
        borderRadius: 8,
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: 'black',
        color: 'white'
    }
});

export default Statistics;
