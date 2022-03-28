//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// create a component
const HeaderComp = ({
    goBack,
    text,
}) => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: "row", justifyContent: 'space-between', height: 72, backgroundColor: '#abcdef', alignItems: 'center', paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={!!goBack ? goBack : () => navigation.goBack()}>
                <Text adjustsFontSizeToFit style={{ fontSize: 30 }}>⬅️</Text>
            </TouchableOpacity>
            <Text>{text}</Text>

        </View>
    );
};


//make this component available to the app
export default HeaderComp;
