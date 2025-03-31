import { View, TextInput } from 'react-native';
import React, { useState } from 'react';

interface Props {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const SearchBar = ({ placeholder, value, onChangeText }: Props) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 9999,
                marginVertical: 15,
                marginHorizontal: 25,
                paddingHorizontal: 20,
                paddingVertical: 5,
                backgroundColor: "#490000"
            }}
        >
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={{ flex: 1, marginLeft: 8, color: "#FFFFFF" }}
            />
        </View>
    );
};

export default SearchBar;