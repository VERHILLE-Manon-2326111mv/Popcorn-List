import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('PersonalMovies')}>
                <Text>🎥 Mes films vus</Text>
                <Text>📌 Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
                <Text>📊 Stats</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;