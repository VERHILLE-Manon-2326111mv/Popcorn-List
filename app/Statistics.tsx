import {View, Text, StyleSheet} from "react-native";

const Statistics = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Statistiques profil:</Text>
            <Text style={styles.numberText}>Durée moyenne films regardées: </Text>
            <Text style={styles.numberText}>Note moyenne: </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10
    },
    numberText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 10
    }
});

export default Statistics;
