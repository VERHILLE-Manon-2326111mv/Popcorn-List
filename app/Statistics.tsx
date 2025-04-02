import {Text, StyleSheet, ScrollView, View, TouchableOpacity} from "react-native";
import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const Statistics = () => {
    const { watchList, wishList, ratingList, commentList } = useMovieContext();


    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView style={styles.container}>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push("/profileScreen")}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Statistiques profil</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Nombre de films vus</Text>
                        <Text style={styles.statValue}>
                            {watchList?.length || 0}
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Durée totale des films vus</Text>
                        <Text style={styles.statValue}>
                            {((currentList = watchList) => {
                                let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                                if (minutesSansHeure === 0) {
                                    return "Aucun film vu";
                                }
                                let heures = Math.floor(minutesSansHeure / 60);
                                let minutes = minutesSansHeure % 60;
                                return heures + ' h ' + minutes + ' min';
                            })()}
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Durée moyenne par film vu</Text>
                        <Text style={styles.statValue}>
                            {((currentList = watchList) => {
                                let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                                if (minutesSansHeure === 0) {
                                    return "Aucun film vu";
                                }
                                let moyenne = Math.floor(minutesSansHeure/currentList.length);
                                let heures = Math.floor(moyenne / 60);
                                let minutes = moyenne % 60;
                                return heures + ' h ' + minutes + ' min';
                            })()}
                        </Text>
                    </View>


                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Nombre de films notés</Text>
                        <Text style={styles.statValue}>
                            {ratingList ? Object.keys(ratingList).length : 0}
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Nombre de commentaires</Text>
                        <Text style={styles.statValue}>{Object.keys(commentList).length}</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Nombre de films à voir</Text>
                        <Text style={styles.statValue}>
                            {wishList?.length || 0}
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Durée totale des films à voir</Text>
                        <Text style={styles.statValue}>
                            {((currentList = wishList) => {
                                let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                                if (minutesSansHeure === 0) {
                                    return "Aucun film dans la liste de souhaits";
                                }
                                let heures = Math.floor(minutesSansHeure / 60);
                                let minutes = minutesSansHeure % 60;
                                return heures + ' h ' + minutes + ' min';
                            })()}
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTitle}>Durée moyenne par film à voir</Text>
                        <Text style={styles.statValue}>
                            {((currentList = wishList) => {
                                let minutesSansHeure = currentList.reduce((sommeMinute, item) => sommeMinute + item.runtime, 0);
                                if (minutesSansHeure === 0) {
                                    return "Aucun film dans la liste de souhaits";
                                }
                                let moyenne = Math.floor(minutesSansHeure/currentList.length);
                                let heures = Math.floor(moyenne / 60);
                                let minutes = moyenne % 60;
                                return heures + ' h ' + minutes + ' min';
                            })()}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212',
    },
    container: {
        flex: 1,
    },
    header: {
        top: 15,
        backgroundColor: '#1E1E1E',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    statsContainer: {
        paddingHorizontal: 15,
        paddingBottom: 30,
        marginTop: 20,
    },
    statCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    statTitle: {
        fontSize: 16,
        color: '#8E8E8E',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: '#FF6347',
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    }
});

export default Statistics;