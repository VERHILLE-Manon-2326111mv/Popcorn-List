import React from 'react';
import {Button, Text, View} from "react-native";
import {router} from "expo-router";

export default function Index() {
    return (
        <View>
            <Text>Bienvenue sur PopCornList 🍿</Text>
            <Text>📌 Dernières sorties</Text>
            <Text>🔍 Rechercher un film</Text>
            <Button title="Voir Le Sixième Sens" onPress={() => router.push("/movie/745")} />
        </View>
    );
}