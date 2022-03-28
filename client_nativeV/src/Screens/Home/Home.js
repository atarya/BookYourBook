//import liraries

import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import navigationStrings from '../../constants/navigationStrings';

import styles from './styles';

// create a component
const Home = ({ navigation }) => {

    const goToScreen = () => {
        navigation.navigate(navigationStrings.PROFILE, { title: "sent data found here" })
    }
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <HeaderComp
                    goBack={() => alert("u can\'t go back")}
                    text="BOOK YOUR BOOK"
                />
                <View style={styles.content}>
                    <Text>Home</Text>
                    <Button onPress={goToScreen} title="Profile" />
                </View>
            </SafeAreaView>
        </View>
    );
};


export default Home;
