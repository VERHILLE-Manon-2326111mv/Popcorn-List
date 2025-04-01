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
                    <Text style={styles.text}>Durée totale : {
                        ((currentList = watchList) => {
                            let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                            if (minutesSansHeure === 0) {
                                return "Aucun film vue.";
                            }
                            let heures = Math.floor(minutesSansHeure / 60);
                            let minutes = minutesSansHeure % 60;
                            return heures +  ' h ' + minutes + ' min';
                        })()
                    }
                    </Text>
                    <Text style={styles.text}>Durée moyenne films vues : {
                        ((currentList = watchList) => {
                            let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                            if (minutesSansHeure === 0) {
                                return "Aucun film vue.";
                            }
                            let moyenne = Math.floor(minutesSansHeure/currentList.length);
                            let heures = Math.floor(moyenne / 60);
                            let minutes = moyenne % 60;
                            return heures +  ' h ' + minutes + ' min';
                        })()
                    }
                    </Text>
                    <Text style={styles.text}>Durée totale à regarder : {
                        ((currentList = wishList) => {
                            let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                            if (minutesSansHeure === 0) {
                                return "Aucun film dans la liste de souhaits.";
                            }
                            let heures = Math.floor(minutesSansHeure / 60);
                            let minutes = minutesSansHeure % 60;
                            return heures +  ' h ' + minutes + ' min';
                        })()
                    }
                    </Text>
                    <Text style={styles.text}>Durée moyenne films à regarder : {
                        ((currentList = wishList) => {
                            let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                            if (minutesSansHeure === 0) {
                                return "Aucun film vue.";
                            }
                            let moyenne = Math.floor(minutesSansHeure/currentList.length);
                            let heures = Math.floor(moyenne / 60);
                            let minutes = moyenne % 60;
                            return heures +  ' h ' + minutes + ' min';
                        })()
                    }
                    </Text>
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
