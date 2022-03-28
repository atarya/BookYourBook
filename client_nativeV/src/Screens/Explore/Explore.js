//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import styles from './styles';
import navigationStrings from '../../constants/navigationStrings';
import HeaderComp from '../../Components/HeaderComp';

// create a component
const Explore = ({ navigation, route }) => {
    const goToScreen = () => {
        navigation.push(navigationStrings.EXPLORE)
    }
    console.log(navigation)

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <HeaderComp text='Listings' />
                <View style={styles.content}>
                    <Text style={{ color: '#ff0000' }}>Listings</Text>
                    <Button onPress={goToScreen} title='Listings page gone loopy...' />
                    {/* <Button title="Go Home" onPress={() => navigation.navigate(navigationStrings.HOME)} />  another way to write it as popToTop*/}
                    <Button title="Go Home" onPress={() => navigation.popToTop()} />
                </View>
            </SafeAreaView>
        </View >
    );
};


//make this component available to the app
export default Explore;
